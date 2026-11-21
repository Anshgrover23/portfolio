import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Experience } from '@/data/experiences';
import { companyToSlug } from '@/lib/experienceSlug';
import { ExperienceOrgLogo } from '@/components/ExperienceOrgLogo';

type ExperienceListRowProps = {
  exp: Experience;
  showChevron?: boolean;
  className?: string;
};

export function ExperienceListRow({
  exp,
  showChevron = true,
  className = '',
}: ExperienceListRowProps) {
  const slug = companyToSlug(exp.company);

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group -mx-3 block border-b border-line/80 px-3 py-5 transition-colors hover:bg-canvas-muted/40 motion-safe:duration-150 sm:-mx-4 sm:px-4 ${className}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="mt-0.5 shrink-0">
          <ExperienceOrgLogo
            logo={exp.logo}
            company={exp.company}
            size="sm"
            framed
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground underline-offset-4 group-hover:underline sm:text-xl">
              {exp.company}
            </span>
            {exp.isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-spot-teal px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-spot-teal-fg">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden
                />
                Current
              </span>
            )}
            {exp.badge && (
              <span className="rounded-full border border-accent/20 bg-accent/8 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-accent">
                {exp.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {exp.role}
          </p>
          <p className="mt-1.5 font-mono text-xs tabular-nums text-muted-foreground sm:hidden">
            {exp.period}
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-2 text-right">
          <div className="hidden flex-col gap-0.5 sm:flex">
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {exp.period}
            </span>
            {exp.location && (
              <span className="font-mono text-[11px] text-muted-foreground/80">
                {exp.location}
              </span>
            )}
          </div>
          {showChevron && (
            <ChevronRight
              className="mt-1 h-4 w-4 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
              strokeWidth={1.5}
              aria-hidden
            />
          )}
        </div>
      </div>
      {exp.description && (
        <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted-foreground sm:ml-14">
          {exp.description}
        </p>
      )}
    </Link>
  );
}
