'use client';

import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

export type ContributionPR = { title: string; link: string };

export type ExperienceContribution = {
  title: string;
  description: string;
  bounty?: string;
  badge?: string;
  link?: string;
  pullRequests?: ContributionPR[];
};

export type ExperienceOrgContributionsProps = {
  contributions: ExperienceContribution[];
  reposPrivate?: boolean;
  compensationDetailsImage?: string;
};

export function ExperienceOrgContributions({
  contributions,
  reposPrivate,
  compensationDetailsImage,
}: ExperienceOrgContributionsProps) {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      {reposPrivate && (
        <div className="rounded-lg border border-line bg-muted/50 px-4 py-3.5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Work delivered in private repositories. Code is not publicly
            viewable; compensation details below.
          </p>
        </div>
      )}

      {compensationDetailsImage && (
        <div className="rounded-lg border border-line bg-muted/40 p-5">
          <p className="mb-3 text-sm font-medium text-foreground">
            Compensation details
          </p>
          <a
            href={compensationDetailsImage}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-md border border-line bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background"
          >
            <img
              src={compensationDetailsImage}
              alt="Compensation details"
              className="h-auto max-h-[320px] w-full object-contain object-center"
              style={{ minHeight: 0 }}
            />
          </a>
          <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
            Open image for full size
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reposPrivate && (
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What I shipped
          </h2>
        )}
        <div className="space-y-4">
          {contributions.map((contribution, index) => {
            const hasPullRequests =
              !reposPrivate && contribution.pullRequests?.length;
            const isExpanded = !!expandedCards[index];

            return (
              <article
                key={index}
                className="space-y-3.5 rounded-lg border border-line bg-canvas-muted/50 p-5"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {contribution.title}
                  </h3>
                  {(contribution.badge || contribution.bounty) && (
                    <div className="flex flex-wrap gap-2">
                      {contribution.badge && (
                        <span className="inline-flex items-center whitespace-nowrap rounded-md border border-line bg-spot-teal px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-spot-teal-fg">
                          {contribution.badge}
                        </span>
                      )}
                      {contribution.bounty && (
                        <span className="inline-flex items-center whitespace-nowrap rounded-md border border-line bg-muted px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground">
                          {contribution.bounty}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {contribution.description}
                </p>

                {contribution.link && (
                  <a
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                    View contribution
                  </a>
                )}

                {hasPullRequests && (
                  <div className="overflow-hidden rounded-md border border-line bg-background">
                    <button
                      type="button"
                      onClick={() => toggleCard(index)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
                    >
                      <span>
                        Linked PRs ({contribution.pullRequests?.length ?? 0})
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="space-y-2 border-t border-line bg-muted/30 px-4 py-3">
                        {contribution.pullRequests?.map((pr, prIndex) => (
                          <li
                            key={prIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <a
                              href={pr.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground underline-offset-2 hover:underline"
                            >
                              {pr.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
