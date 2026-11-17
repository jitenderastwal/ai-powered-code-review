import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  DatabaseSyncIcon,
  GitPullRequestIcon,
  Layers01Icon,
  LockKeyIcon,
  ShieldKeyIcon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserMenuWithSession } from "@/features/auth/components/user-menu";
import { HeroDemo } from "@/features/landing/components/hero-demo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ChaiCodeAIReview — reviews that understand your whole codebase",
  description:
    "Connect your repository once. Every pull request is reviewed with your indexed codebase in context, then posted as a structured comment your team can act on.",
};

const SIGN_IN_HREF = "/sign-in?callbackUrl=/dashboard/repos";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

const PIPELINE = [
  "pull request webhook",
  "diff chunking",
  "vector retrieval",
  "contextual review",
  "comment on the PR",
];

const STEPS = [
  {
    icon: GitPullRequestIcon,
    title: "Install the GitHub App",
    body: "Choose the repositories you want reviewed. Access is read-only for source and limited to the repos you select.",
  },
  {
    icon: DatabaseSyncIcon,
    title: "Sync the codebase",
    body: "Your branch is chunked and embedded into a namespace scoped to that repository, so reviews can retrieve real context later.",
  },
  {
    icon: CheckmarkCircle02Icon,
    title: "Open a pull request",
    body: "A durable workflow embeds the diff, pulls related code, writes the review and posts it back to the PR thread.",
  },
];

const CAPABILITIES = [
  {
    icon: Layers01Icon,
    title: "Repo-wide context",
    body: "Retrieval across your indexed codebase surfaces the types, call-sites and helpers a diff touches. The review sees the blast radius, not just the patch.",
    span: "lg:col-span-3",
  },
  {
    icon: ShieldKeyIcon,
    title: "A reviewer, not a linter",
    body: "Every pass checks correctness, security, performance, reliability, readability and maintainability — and stays quiet where the code is already fine.",
    span: "lg:col-span-3",
  },
  {
    icon: WorkflowSquare01Icon,
    title: "Durable review runs",
    body: "Each review is a step-based workflow. Slow indexing or a flaky API retries without redoing completed work.",
    span: "lg:col-span-2",
  },
  {
    icon: GitPullRequestIcon,
    title: "Where you already work",
    body: "Findings land as a comment beside the diff, with run status and history in the dashboard.",
    span: "lg:col-span-2",
  },
  {
    icon: LockKeyIcon,
    title: "Scoped by design",
    body: "Vectors are namespaced per repository. Source access comes from your GitHub App installation and ends when you revoke it.",
    span: "lg:col-span-2",
  },
];

const FAQS = [
  {
    question: "Does it read my whole repository?",
    answer:
      "When you sync a repository, its default branch is chunked and embedded into a vector namespace for that repo. During a review, only the pieces relevant to the pull request are retrieved and passed to the model.",
  },
  {
    question: "Where do the reviews appear?",
    answer:
      "Directly on the pull request as a comment, next to the diff your team is already reading. The dashboard also tracks each pull request's review status.",
  },
  {
    question: "What permissions does the GitHub App request?",
    answer:
      "Read access to the repositories you install it on, plus write access to pull request comments so it can post its review. Nothing outside the repositories you select.",
  },
  {
    question: "What happens if a review fails halfway?",
    answer:
      "Reviews run as isolated steps. A failed step retries on its own, and completed work such as embedding the diff is not repeated. The pull request simply stays in processing until a review lands.",
  },
  {
    question: "Can I stop it at any time?",
    answer:
      "Yes. Uninstall the GitHub App or revoke its access from GitHub settings and it can no longer read your repositories or post reviews.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <GridBackdrop />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>Context-aware code review for GitHub</Eyebrow>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                Reviews that understand
                <span className="block text-muted-foreground">
                  the code you didn&apos;t change.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                Connect your repository once. Every pull request is reviewed with
                your indexed codebase in context — then posted as a structured
                comment your team can act on.
              </p>
              <div className="mt-8 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row">
                <Link
                  href={SIGN_IN_HREF}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full gap-2 px-5 text-[13px] sm:w-auto"
                  )}
                >
                  Connect GitHub
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Link>
                <Link
                  href="#how-it-works"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 w-full px-5 text-[13px] sm:w-auto"
                  )}
                >
                  See how it works
                </Link>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                GitHub App · read-only source access · revoke anytime
              </p>
            </div>

            <HeroDemo />
          </div>
        </section>

        {/* Pipeline strip */}
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto w-full max-w-6xl overflow-x-auto px-5 py-3">
            <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {PIPELINE.map((step, index) => (
                <span key={step} className="flex items-center gap-2">
                  {index > 0 ? (
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-3 text-border"
                      aria-hidden
                    />
                  ) : null}
                  <span className={index === PIPELINE.length - 1 ? "text-foreground" : undefined}>
                    {step}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-b border-border scroll-mt-14">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
            <SectionIntro
              eyebrow="How it works"
              title="Three steps to your first reviewed pull request"
              description="No CI configuration, no YAML, no new workflow to maintain. Install once and reviews run on their own."
            />
            <div className="mt-10 grid border border-border sm:grid-cols-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="group flex flex-col border-b border-border p-6 transition-colors last:border-b-0 hover:bg-muted/30 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      0{index + 1}
                    </span>
                    <HugeiconsIcon
                      icon={step.icon}
                      strokeWidth={2}
                      className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                    />
                  </div>
                  <h3 className="mt-8 text-sm font-medium">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="border-b border-border scroll-mt-14">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
            <SectionIntro
              eyebrow="Capabilities"
              title="Built for the pull requests that actually take time"
              description="The hard part of review was never spotting a typo. It is knowing what the change breaks three files away."
            />
            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
              {CAPABILITIES.map((capability) => (
                <article
                  key={capability.title}
                  className={cn(
                    "group bg-background p-6 transition-colors hover:bg-muted/30",
                    capability.span
                  )}
                >
                  <span className="inline-flex size-8 items-center justify-center border border-border bg-card text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    <HugeiconsIcon icon={capability.icon} strokeWidth={2} className="size-4" />
                  </span>
                  <h3 className="mt-5 text-sm font-medium">{capability.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                    {capability.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Review output */}
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <Eyebrow>What lands in the thread</Eyebrow>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] sm:text-4xl">
                  A verdict first.
                  <span className="block text-muted-foreground">
                    Then only what matters.
                  </span>
                </h2>
                <p className="mt-5 max-w-md text-[13px] leading-6 text-muted-foreground sm:text-sm sm:leading-7">
                  Every review opens with a one-line read on the change, then
                  separates blocking issues from non-blocking suggestions. It
                  references the code it is talking about and explains the fix.
                </p>
                <ul className="mt-8 flex flex-col divide-y divide-border border-y border-border">
                  {[
                    "Specific: names the file, function and line context",
                    "Proportional: never nitpicks style over real defects",
                    "Honest: says so plainly when a diff is clean",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 py-3 text-[13px] text-muted-foreground"
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                        className="mt-1 size-3.5 shrink-0 text-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={SIGN_IN_HREF}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "mt-8 h-10 px-4 text-[13px]"
                  )}
                >
                  Review your first PR
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                </Link>
              </div>

              <ReviewTemplate />
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="border-b border-border scroll-mt-14">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
            <SectionIntro
              eyebrow="Security"
              title="Your source stays in your repositories"
              description="Access is granted through a GitHub App installation, scoped to the repositories you choose, and ends the moment you revoke it."
            />
            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
              {[
                {
                  label: "01 / Access",
                  title: "Read-only by default",
                  body: "Source access is read-only. Write access is limited to posting the review comment on the pull request.",
                },
                {
                  label: "02 / Isolation",
                  title: "Per-repository namespaces",
                  body: "Embeddings are stored in a namespace scoped to one repository, so retrieved context never crosses projects.",
                },
                {
                  label: "03 / Control",
                  title: "Revocable at any time",
                  body: "Uninstall the GitHub App from GitHub settings and it immediately loses access to your repositories.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-background p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-sm font-medium">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-border scroll-mt-14">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
              <div>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                  Questions worth asking
                </h2>
                <p className="mt-3 max-w-xs text-[13px] leading-6 text-muted-foreground">
                  Everything else can wait until you see the first review.
                </p>
              </div>
              <div className="border-t border-border">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group border-b border-border">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[13px] font-medium [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                        <span className="absolute h-px w-3 bg-current" />
                        <span className="absolute h-3 w-px bg-current transition-transform duration-200 group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="max-w-xl pb-5 pr-6 text-[13px] leading-6 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative overflow-hidden">
          <GridBackdrop />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-center sm:py-28">
            <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Your next pull request deserves
              <span className="block text-muted-foreground">
                a second pair of eyes.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Install the GitHub App, sync a repository and open a pull request.
              The review will be waiting in the thread.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={SIGN_IN_HREF}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 gap-2 px-5 text-[13px]"
                )}
              >
                Connect GitHub
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden ring-1 ring-border">
            <Image
              src="/logo2.svg"
              alt=""
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </span>
          <span className="text-[13px] font-medium tracking-tight">
            ChaiCodeAIReview
          </span>
          <span className="hidden border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:inline">
            beta
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ModeToggle />
          <UserMenuWithSession variant="compact" />
          <Link
            href={SIGN_IN_HREF}
            className={cn(buttonVariants({ size: "lg" }), "h-9 px-3.5 text-xs")}
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center overflow-hidden ring-1 ring-border">
              <Image src="/logo2.svg" alt="" width={24} height={24} className="object-contain" />
            </span>
            <span className="text-[13px] font-medium tracking-tight">
              ChaiCodeAIReview
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[11px] leading-5 text-muted-foreground">
            AI code review with repository-wide context, delivered as a comment
            on every pull request.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[...NAV_LINKS, { label: "Sign in", href: SIGN_IN_HREF }].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1.5 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ChaiCodeAIReview</span>
          <span>Next.js · Inngest · Pinecone</span>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-[13px] leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-border bg-card/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
      </span>
      {children}
    </span>
  );
}

function GridBackdrop() {
  const gridStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
    backgroundSize: "72px 72px",
    maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
    WebkitMaskImage:
      "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={gridStyle} />
      <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/20 blur-[120px]" />
    </div>
  );
}

const REVIEW_TEMPLATE = [
  {
    index: "01",
    label: "Verdict",
    body: "One line on the overall quality of the change.",
  },
  {
    index: "02",
    label: "What looks good",
    body: "Only when something is genuinely worth calling out.",
  },
  {
    index: "03",
    label: "Suggestions",
    body: "Non-blocking improvements, with the reasoning behind them.",
  },
  {
    index: "04",
    label: "Issues",
    body: "Bugs, security problems and breaking changes that should block.",
  },
];

function ReviewTemplate() {
  return (
    <div className="border border-border bg-card">
      <div className="flex h-9 items-center gap-2 border-b border-border px-3">
        <span className="flex size-5 items-center justify-center bg-primary/15 font-mono text-[10px] font-medium text-primary">
          CR
        </span>
        <span className="text-[11px] font-medium">Review format</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          one comment
        </span>
      </div>
      <ol className="divide-y divide-border">
        {REVIEW_TEMPLATE.map((row) => (
          <li key={row.index} className="flex gap-4 px-4 py-4">
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary/80">
              {row.index}
            </span>
            <div>
              <p className="text-[12px] font-medium">{row.label}</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                {row.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>markdown · posted to the PR</span>
        <span>~40s</span>
      </div>
    </div>
  );
}

