'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface PullRequestLink {
  title: string;
  link: string;
}

interface Contribution {
  title: string;
  description: string;
  bounty?: string;
  badge?: string;
  link?: string;
  pullRequests?: PullRequestLink[];
}

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: {
    name: string;
    logo: string;
    contributions: Contribution[];
    reposPrivate?: boolean;
    compensationDetailsImage?: string;
  };
}

export const CompanyModal = ({
  isOpen,
  onClose,
  company,
}: CompanyModalProps) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`bg-[#111827] border border-gray-600 text-white shadow-xl sm:rounded-xl ${
          company.compensationDetailsImage ? 'max-w-3xl' : 'max-w-2xl'
        }`}
      >
        <DialogHeader className="space-y-1 pb-1">
          <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
            {typeof company.logo === 'string' &&
            (company.logo.startsWith('http') ||
              company.logo.endsWith('.svg') ||
              company.logo.endsWith('.png')) ? (
              <Image
                src={
                  company.logo.startsWith('http')
                    ? company.logo
                    : `/${company.logo}`
                }
                alt={`${company.name} logo`}
                width={32}
                height={32}
                className="rounded-full object-contain"
              />
            ) : (
              <span className="text-2xl">{company.logo}</span>
            )}
            {company.name} Featured Contributions
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 max-h-[85vh] overflow-y-auto pr-2 pb-1 scrollbar-hide">
          {company.reposPrivate && (
            <div className="rounded-xl border border-gray-600/60 bg-gray-800/40 px-4 py-3.5">
              <p className="text-gray-400 text-sm leading-relaxed">
                Work delivered in private repositories. Code is not publicly
                viewable; compensation details below.
              </p>
            </div>
          )}

          {company.compensationDetailsImage && (
            <div className="rounded-xl border border-gray-600/60 bg-gray-800/40 p-5">
              <p className="text-sm font-medium text-gray-300 mb-3">
                Compensation details
              </p>
              <a
                href={company.compensationDetailsImage}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden border border-gray-600/80 bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <img
                  src={company.compensationDetailsImage}
                  alt="Compensation details"
                  className="w-full h-auto max-h-[320px] object-contain object-center"
                  style={{ minHeight: 0 }}
                />
              </a>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Click image to open full size
              </p>
            </div>
          )}

          <div className="space-y-4">
            {company.reposPrivate && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                What I shipped
              </h3>
            )}
            <div className="space-y-4">
              {company.contributions.map((contribution, index) => {
                const hasPullRequests =
                  !company.reposPrivate && contribution.pullRequests?.length;
                const isExpanded = !!expandedCards[index];

                return (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/80 space-y-3.5"
                  >
                    <div className="flex flex-col gap-3">
                      <h4 className="text-base font-semibold leading-snug text-purple-300">
                        {contribution.title}
                      </h4>
                      {(contribution.badge || contribution.bounty) && (
                        <div className="flex flex-wrap gap-2">
                          {contribution.badge && (
                            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-purple-400/40 bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-200">
                              {contribution.badge}
                            </span>
                          )}
                          {contribution.bounty && (
                            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-200">
                              {contribution.bounty}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {contribution.description}
                    </p>

                    {contribution.link && (
                      <a
                        href={contribution.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Contribution
                      </a>
                    )}

                    {hasPullRequests && (
                      <div className="rounded-md bg-gray-900/60 border border-gray-700 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleCard(index)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-200 hover:bg-gray-800/80 transition-colors"
                        >
                          <span>
                            Linked PRs ({contribution.pullRequests?.length ?? 0}
                            )
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <ul className="space-y-2 px-4 py-3 bg-gray-900/80 border-t border-gray-800">
                            {contribution.pullRequests?.map((pr, prIndex) => (
                              <li
                                key={prIndex}
                                className="flex items-start gap-2 text-sm text-gray-300"
                              >
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                <a
                                  href={pr.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-purple-300 transition-colors"
                                >
                                  {pr.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
