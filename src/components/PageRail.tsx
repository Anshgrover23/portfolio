'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type RailLink = { id: string; label: string };

const SECTIONS: RailLink[] = [
  { id: 'about', label: 'History' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'blog', label: 'Writing' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Desktop-only left rail with sticky metadata + a contents table.
 * On <lg screens it is hidden — the SiteNav already covers small viewports.
 */
export function PageRail() {
  const [active, setActive] = useState<string>('about');

  useEffect(() => {
    const elements = SECTIONS.map(s => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.1, 0.3, 0.6] }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="relative hidden lg:block" aria-label="Section index">
      <div className="sticky top-20 flex flex-col gap-9">
        {/* Status header — no name repeat. The SiteNav and hero already
            carry identity; the rail's job is "where you are + what's
            current", not another nameplate. */}
        <div>
          <p className="type-meta text-accent">
            <span className="inline-flex items-center gap-2 align-middle">
              <span
                className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Currently shipping
            </span>
          </p>
          <p
            className="font-display mt-3 text-[1.0625rem] leading-snug text-foreground/85"
            style={{
              letterSpacing: '-0.01em',
              fontVariationSettings: "'opsz' 36, 'SOFT' 60",
            }}
          >
            <a
              href="https://screenpi.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold decoration-accent decoration-2 underline-offset-[5px] hover:underline"
            >
              Screenpipe
            </a>{' '}
            <span className="italic font-light text-muted-foreground">
              local-first
            </span>{' '}
            context for AI agents.
          </p>
          <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/85">
            YC S26 · IST
          </p>
        </div>

        <nav aria-label="Sections">
          <p className="type-meta mb-3 text-muted-foreground/70">
            <span className="type-numeral mr-2 not-italic text-accent">§</span>
            Contents
          </p>
          <ul className="space-y-0.5 border-l border-foreground/15">
            {SECTIONS.map((s, idx) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className={cn(
                      '-ml-px flex items-baseline gap-3 border-l py-1.5 pl-4 text-sm transition-colors',
                      isActive
                        ? 'border-accent text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'type-numeral text-[11px]',
                        isActive ? 'text-accent' : 'text-muted-foreground/55'
                      )}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{s.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="type-meta normal-case text-muted-foreground/70">
            Connect with me
          </p>
          <ul className="space-y-1.5">
            <li>
              <a
                href="https://github.com/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  GitHub
                </span>
                <span aria-hidden className="text-muted-foreground/50">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  X / Twitter
                </span>
                <span aria-hidden className="text-muted-foreground/50">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/anshgrover23/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  LinkedIn
                </span>
                <span aria-hidden className="text-muted-foreground/50">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://algora.io/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  Algora.io
                </span>
                <span aria-hidden className="text-muted-foreground/50">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:anshgrover938@gmail.com"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  Email
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
