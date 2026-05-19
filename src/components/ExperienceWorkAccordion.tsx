'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import type { Experience } from '@/data/experiences';
import { companyToSlug } from '@/lib/experienceSlug';

function getWorkBullets(exp: Experience): string[] {
  if (exp.highlights?.length) {
    return exp.highlights.slice(0, 4);
  }
  if (exp.description) {
    return [exp.description];
  }
  return exp.contributions
    .filter(c => !('section' in c) || c.section !== 'prior-oss')
    .slice(0, 3)
    .map(c => c.title);
}

type ExperienceWorkAccordionProps = {
  items: readonly Experience[];
};

export function ExperienceWorkAccordion({ items }: ExperienceWorkAccordionProps) {
  return (
    <div className="border-t border-line">
      {items.map(exp => {
        const slug = companyToSlug(exp.company);
        const bullets = getWorkBullets(exp);
        const isCurrent = exp.isCurrent === true;
        const location = exp.location;

        return (
          <details
            key={exp.company}
            className="group border-b border-line [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="cursor-pointer list-none py-5 transition-colors hover:bg-canvas-muted/30 motion-safe:duration-150 -mx-3 px-3 sm:-mx-4 sm:px-4">
              <div className="flex items-start justify-between gap-4">
                <span className="min-w-0 flex-1 text-left">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {exp.company}
                    </span>
                    {isCurrent && (
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
                  </span>
                  <span className="mt-1 block text-sm font-medium text-muted-foreground">
                    {exp.role}
                  </span>
                </span>
                <span className="flex shrink-0 items-start gap-2 text-right">
                  <span className="hidden flex-col gap-0.5 sm:flex">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      {exp.period}
                    </span>
                    {location && (
                      <span className="font-mono text-[11px] text-muted-foreground/80">
                        {location}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className="mt-1 h-4 w-4 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
              </div>
              <span className="mt-1 block font-mono text-xs text-muted-foreground tabular-nums sm:hidden">
                {exp.period}
              </span>
            </summary>

            <div className="pb-6 pl-0 pr-0 sm:pl-0">
              {exp.techStack.length > 0 && (
                <div className="mb-5">
                  <h3 className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Technologies & tools
                  </h3>
                  <ul className="flex list-none flex-wrap gap-2">
                    {exp.techStack.map(t => (
                      <li
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas-muted px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground/90"
                      >
                        {t.icon && (
                          <Image
                            src={
                              t.icon.startsWith('http')
                                ? t.icon
                                : t.icon.startsWith('/')
                                  ? t.icon
                                  : `/${t.icon}`
                            }
                            alt=""
                            width={14}
                            height={14}
                            className={`h-3.5 w-3.5 shrink-0 ${
                              t.label === 'Next.js' ? 'invert opacity-75' : ''
                            }`}
                            unoptimized={t.icon.startsWith('http')}
                          />
                        )}
                        {t.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {bullets.length > 0 && (
                <div className="mb-5">
                  <h3 className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    What I&apos;ve done
                  </h3>
                  <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {bullets.map(item => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={`/projects/${slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                onClick={e => e.stopPropagation()}
              >
                Full page — contributions & PRs
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </details>
        );
      })}
    </div>
  );
}
