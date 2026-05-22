import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { experiences } from '@/data/experiences';
import { ExperienceWorkAccordion } from '@/components/ExperienceWorkAccordion';
import { EXPERIENCE_STATS, isCurrentRole } from '@/lib/experienceMeta';

export default function ProjectsIndexPage() {
  const sorted = [
    ...experiences.filter(isCurrentRole),
    ...experiences.filter(exp => !isCurrentRole(exp)),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(40 25% 94%), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, hsl(172 15% 94% / 0.5), transparent)',
        }}
      />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-8 md:pb-14 md:pt-12">
        <Link
          href="/#experience"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          Back to home
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Work experience
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
            Expand a role for a preview, or open the full page for contributions,
            PRs, and references.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            <span className="font-medium tabular-nums text-foreground">
              {EXPERIENCE_STATS.mergedPRs}
            </span>{' '}
            merged PRs career-wide ·{' '}
            <span className="font-medium text-foreground">
              {EXPERIENCE_STATS.bountyTotal}
            </span>{' '}
            OSS bounties · Screenpipe role: 60+ to{' '}
            <span className="text-foreground/80">screenpipe/screenpipe</span>
          </p>
        </header>

        <ExperienceWorkAccordion items={sorted} />

        <div className="mt-10 flex justify-center border-t border-line pt-8">
          <Link
            href="/blog"
            className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground underline-offset-4 transition-colors hover:text-foreground"
          >
            Read the blog →
          </Link>
        </div>
      </main>
    </div>
  );
}
