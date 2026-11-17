import type { CodeChunk } from "@/features/reviews/types/review";
import {
    getPineconeIndex,
    PINECONE_FIELDS,
    PINECONE_UPSERT_BATCH_SIZE,
    toPineconeDocument,
} from "@/features/pinecone/client";

const CONTEXT_RESULTS = 10;

export function buildPrNamespace(repoFullName: string, prNumber: number) {
    return `${repoFullName.replace("/", "--")}--pr-${prNumber}`;
}

export async function saveChunksToPinecone(
    namespace: string,
    chunks: CodeChunk[]
) {
    const index = getPineconeIndex();

    // namespace() scopes documents so this PR never mixes with repo-wide sync data.
    // Batched because document-schema indexes cap embedded writes at 96 per call.
    for (
        let start = 0;
        start < chunks.length;
        start += PINECONE_UPSERT_BATCH_SIZE
    ) {
        const batch = chunks.slice(start, start + PINECONE_UPSERT_BATCH_SIZE);

        await index.namespace(namespace).documents.upsert({
            documents: batch.map(toPineconeDocument),
        });
    }
}


export async function searchPrContext(namespace: string, query: string) {
    const index = getPineconeIndex();

    // `embed` scores the query with the field's own embedding model, which
    // matches how the chunks were embedded on write.
    const response = await index.namespace(namespace).documents.search({
        scoreBy: [{ type: "embed", field: PINECONE_FIELDS.text, query }],
        topK: CONTEXT_RESULTS,
        includeFields: [PINECONE_FIELDS.text, PINECONE_FIELDS.filePath],
    });

    const snippets: string[] = [];

    for (const match of response.matches) {
        const text = match[PINECONE_FIELDS.text] as string | undefined;
        if (!text) {
            continue;
        }

        const filePath = match[PINECONE_FIELDS.filePath] as string | undefined;
        snippets.push(`File: ${filePath ?? "unknown"}\n${text}`);
    }

    return snippets;
}