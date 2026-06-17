import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ExperienceEntry } from '@/lib/experienceMeta';
import { companyToSlug } from '@/lib/experienceSlug';
import { ExperienceOrgLogo } from '@/components/ExperienceOrgLogo';

type ExperienceRoleCardProps = {
  exp: ExperienceEntry;
  variant?: 'default' | 'featured';
};

export function ExperienceRoleCard({
  exp,
  variant = 'default',
}: ExperienceRoleCardProps) {
  const slug = companyToSlug(exp.company);
  const isFeatured = variant === 'featured';
  const badge = 'badge' in exp ? exp.badge : undefined;
  const highlights = 'highlights' in exp ? exp.highlights : undefined;
  const isCurrent = 'isCurrent' in exp && exp.isCurrent;

  if (isFeatured) {
    return (
      <Link
        href={`/projects/${slug}`}
        className="group relative block overflow-hidden rounded-xl border border-line bg-card p-6 shadow-[0_2px_12px_rgba(47,52,55,0.06)] transition-[box-shadow,transform] motion-safe:duration-200 hover:shadow-[0_4px_20px_rgba(47,52,55,0.08)] motion-safe:active:scale-[0.995] md:p-8"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 60% at 100% 0%, hsl(172 18% 92% / 0.9), transparent 55%)',
          }}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <ExperienceOrgLogo
            logo={exp.logo}
            company={exp.company}
            size="lg"
            framed
          />
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {isCurrent && (
                <span className="inline-flex items-center rounded-md border border-line bg-spot-teal px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-spot-teal-fg">
                  Current
                </span>
              )}
              {badge && (
                <span className="inline-flex items-center rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">
                  {badge}
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground underline-offset-4 group-hover:underline md:text-3xl">
              {exp.company}
            </h2>
            <p className="mt-1.5 text-base font-medium text-accent">
              {exp.role}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums md:text-sm">
              {exp.period}
            </p>
            {exp.description && (
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                {exp.description}
              </p>
            )}
            {highlights && highlights.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-line/80 pt-5">
                {highlights.map(item => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              View role details
              <ArrowRight
                className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex gap-4 rounded-lg border border-line bg-card p-4 transition-[box-shadow,transform] motion-safe:duration-200 hover:shadow-[0_2px_8px_rgba(47,52,55,0.06)] motion-safe:active:scale-[0.99] md:p-5"
    >
      <ExperienceOrgLogo logo={exp.logo} company={exp.company} size="md" />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground underline-offset-4 group-hover:underline">
            {exp.company}
          </span>
          {badge && (
            <span className="inline-flex rounded-md border border-accent/20 bg-accent/8 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-accent">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-1 block text-sm font-medium text-accent">
          {exp.role}
        </span>
        <span className="mt-1 block font-mono text-xs text-muted-foreground tabular-nums">
          {exp.period}
        </span>
        {exp.description && (
          <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
            {exp.description}
          </span>
        )}
      </span>
    </Link>
  );
}
