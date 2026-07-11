import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { experiences } from '@/data/experiences';
import { isCurrentRole } from '@/lib/experienceMeta';
import { ExperienceListRow } from '@/components/ExperienceListRow';
import { ContributionsGlobe } from '@/components/ContributionsGlobe';

const HOME_PREVIEW_COUNT = 4;

export function ExperienceHomeList() {
  const sorted = [
    ...experiences.filter(isCurrentRole),
    ...experiences.filter(exp => !isCurrentRole(exp)),
  ];
  const preview = sorted.slice(0, HOME_PREVIEW_COUNT);
  const hasMore = sorted.length > HOME_PREVIEW_COUNT;

  return (
    <section className="mb-16 md:mb-20" aria-labelledby="experience-heading">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-baseline gap-4">
          <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
            02
          </span>
          <div className="min-w-0">
            <h2
              id="experience-heading"
              className="font-display text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Experience
            </h2>
            <p className="mt-3 max-w-prose text-sm text-muted-foreground">
              Founding, contract, and open-source work — what shipped at each
              stop.
            </p>
          </div>
        </div>
        {hasMore && (
          <Link
            href="/projects"
            className="hidden items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
          >
            All experience
            <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          </Link>
        )}
      </div>

      <ContributionsGlobe />

      <div className="border-t border-line/80">
        {preview.map(exp => (
          <ExperienceListRow key={exp.company} exp={exp} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md border border-line bg-card px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-canvas-muted motion-safe:active:scale-[0.98]"
          >
            Show all experience
          </Link>
        </div>
      )}
    </section>
  );
}
