import { Pinecone } from '@pinecone-database/pinecone';
import type { CodeChunk } from '@/features/reviews/types/review';

/**
 * The Pinecone index uses a document schema rather than the legacy vector
 * records schema, so all writes and searches go through the documents API.
 *
 * `chunk_text` is the embedded field (llama-text-embed-v2, 1024 dims) and
 * `title` stores the source file path so search hits can be traced back.
 */
export const PINECONE_FIELDS = {
    text: 'chunk_text',
    filePath: 'title',
} as const;

/**
 * Document-schema indexes with an `embed` field accept at most 96 documents
 * per upsert, so batches stay just below that limit.
 */
export const PINECONE_UPSERT_BATCH_SIZE = 90;

let pinecone: Pinecone | null = null;

export function getPineconeIndex() {
    if (!pinecone) {
        pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    }

    return pinecone.index({ name: process.env.PINECONE_INDEX! });
}

/**
 * Maps a code chunk onto the index's document schema.
 *
 * @param chunk - Chunk of source code to store.
 * @returns A document record keyed by the index's declared fields.
 */
export function toPineconeDocument(chunk: CodeChunk) {
    return {
        _id: chunk.id,
        [PINECONE_FIELDS.text]: chunk.text,
        [PINECONE_FIELDS.filePath]: chunk.filePath,
    };
}