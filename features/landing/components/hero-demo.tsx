"use client";

/**
 * Interactive hero panel for the landing page.
 *
 * Renders a pull request window with three views — the diff, the review that
 * was posted on it, and the state of the repository sync — so visitors can see
 * what the product actually produces instead of a static screenshot.
 */

import { useState, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  CodeSimpleIcon,
  Comment01Icon,
  DatabaseSyncIcon,
  GitPullRequestIcon,
  Time04Icon,
} from "@hugeicons/core-free-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type DemoTab = "diff" | "review" | "sync";

const TAB_STATUS: Record<DemoTab, { label: string; className: string }> = {
  diff: {
    label: "+4 −1",
    className: "border-border text-muted-foreground",
  },
  review: {
    label: "reviewed in 48s",
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  sync: {
    label: "codebase synced",
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
};

const DIFF_LINES = [
  { marker: " ", tone: "plain", code: "const installation = await getInstallation(installationId)" },
  { marker: " ", tone: "plain", code: "const token = await createToken(installationId)" },
  { marker: "-", tone: "removed", code: "if (!token) return null" },
  { marker: "+", tone: "added", code: "if (!token) throw new InstallationError(installationId)" },
  { marker: "+", tone: "added", code: "await assertSignature(payload, signature)" },
  { marker: " ", tone: "plain", code: "return postReview({ token, prNumber })" },
] as const;

const SYNC_STEPS = [
  {
    title: "Source chunked",
    meta: "412 files · main@4f2c1a9",
  },
  {
    title: "Embeddings upserted",
    meta: "1,284 vectors · namespace acme__api",
  },
  {
    title: "Ready for review",
    meta: "retrieval enabled on pull requests",
  },
];

export function HeroDemo() {
  const [tab, setTab] = useState<DemoTab>("diff");
  const status = TAB_STATUS[tab];

  return (
    <div className="relative mx-auto mt-14 w-full max-w-4xl">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as DemoTab)}
        className="gap-0 border border-border bg-card"
      >
        {/* Toolbar: pull request identity, view switcher, live status */}
        <div className="flex h-10 items-center gap-2 border-b border-border px-3">
          <HugeiconsIcon
            icon={GitPullRequestIcon}
            strokeWidth={2}
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:inline">
            acme/api · #184
          </span>

          <TabsList className="mx-auto gap-0">
            <TabsTrigger value="diff" className="gap-1 px-2.5 text-[11px]">
              <HugeiconsIcon icon={CodeSimpleIcon} strokeWidth={2} className="size-3.5" />
              Diff
            </TabsTrigger>
            <TabsTrigger value="review" className="gap-1 px-2.5 text-[11px]">
              <HugeiconsIcon icon={Comment01Icon} strokeWidth={2} className="size-3.5" />
              Review
            </TabsTrigger>
            <TabsTrigger value="sync" className="gap-1 px-2.5 text-[11px]">
              <HugeiconsIcon icon={DatabaseSyncIcon} strokeWidth={2} className="size-3.5" />
              Sync
            </TabsTrigger>
          </TabsList>

          <span
            className={cn(
              "shrink-0 border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
              status.className
            )}
          >
            {status.label}
          </span>
        </div>

        {/* Diff view */}
        <TabsContent value="diff" className="animate-in fade-in-0 duration-300">
          <div className="flex min-h-[17rem] flex-col gap-3 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-medium">
                  Harden installation token refresh
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  features/github/server/installation.ts
                </p>
              </div>
              <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                1 file changed
              </span>
            </div>

            <div className="overflow-hidden border border-border bg-background">
              {DIFF_LINES.map((line, index) => (
                <div
                  key={line.code}
                  className={cn(
                    "flex gap-2 px-2 py-1 font-mono text-[11px] leading-5",
                    line.tone === "added" && "bg-emerald-500/[0.08]",
                    line.tone === "removed" && "bg-rose-500/[0.08]"
                  )}
                >
                  <span className="w-4 shrink-0 select-none text-right text-muted-foreground/60">
                    {index + 38}
                  </span>
                  <span
                    className={cn(
                      "shrink-0",
                      line.tone === "added" && "text-emerald-600 dark:text-emerald-400",
                      line.tone === "removed" && "text-rose-600 dark:text-rose-400",
                      line.tone === "plain" && "text-muted-foreground"
                    )}
                  >
                    {line.marker}
                  </span>
                  <span className="min-w-0 overflow-x-auto whitespace-pre text-foreground/90">
                    {line.code}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              <Chip tone="issue">1 issue</Chip>
              <Chip tone="warn">2 suggestions</Chip>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                <HugeiconsIcon icon={Time04Icon} strokeWidth={2} className="size-3" />
                reviewed 48s after open
              </span>
            </div>
          </div>
        </TabsContent>

        {/* Review view */}
        <TabsContent value="review" className="animate-in fade-in-0 duration-300">
          <div className="flex min-h-[17rem] flex-col">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="flex size-5 items-center justify-center bg-primary/15 font-mono text-[10px] font-medium text-primary">
                CR
              </span>
              <span className="text-[11px] font-medium">chai-review[bot]</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                commented
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                48s
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3.5 p-4">
              <p className="border-l-2 border-primary pl-3 text-[12px] leading-6">
                Solid change overall: the diff removes a silent failure path and
                adds signature verification where it belongs.
              </p>

              <Finding tone="ok" label="What looks good">
                `assertSignature` runs before any installation lookup, so an
                unauthenticated delivery cannot reach the token exchange.
              </Finding>
              <Finding tone="warn" label="Suggestions">
                `getRepos` awaits each installation in sequence — `Promise.all`
                keeps p95 under 400ms on larger accounts.
              </Finding>
              <Finding tone="issue" label="Issues">
                Dropping the null check makes a revoked installation throw where
                it used to no-op, and `sync-repo.ts` does not catch it.
              </Finding>
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <span>repo-wide context: 12 chunks</span>
              <span>posted to #184</span>
            </div>
          </div>
        </TabsContent>

        {/* Sync view */}
        <TabsContent value="sync" className="animate-in fade-in-0 duration-300">
          <div className="flex min-h-[17rem] flex-col gap-4 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-medium">acme/api</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  default branch · main
                </p>
              </div>
              <span className="inline-flex items-center gap-1 border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-emerald-600 dark:text-emerald-400">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-3" />
                synced
              </span>
            </div>

            <div>
              <div className="h-1 w-full bg-muted">
                <div className="h-full w-full bg-primary" />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                1,284 of 1,284 chunks embedded
              </p>
            </div>

            <ol className="flex flex-col divide-y divide-border border-y border-border">
              {SYNC_STEPS.map((step) => (
                <li key={step.title} className="flex items-center gap-2.5 py-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    strokeWidth={2}
                    className="size-3.5 shrink-0 text-primary"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="text-[11px] font-medium">{step.title}</p>
                    <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                      {step.meta}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <HugeiconsIcon icon={Time04Icon} strokeWidth={2} className="size-3" />
              last synced 2 minutes ago
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating sync proof, hidden while the sync view is open */}
      {tab === "sync" ? null : (
        <div className="pointer-events-none absolute -bottom-5 left-4 hidden animate-in fade-in-0 items-center gap-2.5 border border-border bg-background px-3 py-2 shadow-lg shadow-foreground/5 duration-300 sm:flex">
          <HugeiconsIcon
            icon={DatabaseSyncIcon}
            strokeWidth={2}
            className="size-3.5 text-primary"
          />
          <div className="leading-tight">
            <p className="text-[11px] font-medium">Codebase synced</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
              1,284 chunks · main@4f2c1a9
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
  tone,
  children,
}: {
  tone: "issue" | "warn";
  children: ReactNode;
}) {
  const toneStyles = {
    issue: "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    warn: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  }[tone];

  return (
    <span
      className={cn(
        "border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
        toneStyles
      )}
    >
      {children}
    </span>
  );
}

function Finding({
  tone,
  label,
  children,
}: {
  tone: "ok" | "warn" | "issue";
  label: string;
  children: ReactNode;
}) {
  const toneStyles = {
    ok: "text-emerald-600 dark:text-emerald-400",
    warn: "text-amber-600 dark:text-amber-400",
    issue: "text-rose-600 dark:text-rose-400",
  }[tone];

  return (
    <div>
      <p className={cn("font-mono text-[10px] uppercase tracking-[0.12em]", toneStyles)}>
        {label}
      </p>
      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{children}</p>
    </div>
  );
}
