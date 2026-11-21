'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';

type RailLink = { id: string; label: string };

const SECTIONS: RailLink[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Selected work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'blog', label: 'Writing' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Desktop-only left rail with sticky metadata + a contents table.
 * Smaller screens use the page's linear reading order and inline hero links.
 */
export function PageRail() {
  const active = useActiveSection();

  return (
    <aside className="relative hidden lg:block" aria-label="Section index">
      <div className="sticky top-24 flex flex-col gap-9">
        {/* Status header — no name repeat. The SiteNav and hero already
            carry identity; the rail's job is "where you are + what's
            current", not another nameplate. */}
        <div>
          <p className="mb-4 text-xs font-medium text-muted-foreground">
            Currently at
          </p>
          <a
            href="https://meetriver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-sm"
          >
            <Image
              src="/river.png"
              alt=""
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span>
              <span className="block text-base font-semibold tracking-tight text-foreground group-hover:underline underline-offset-4">
                River AI
              </span>
              <span className="block text-xs text-muted-foreground">
                Software engineer · YC F26
              </span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-foreground/85">
            Building the AI computer.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Remote from India · IST
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
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  Resume
                </span>
                <span aria-hidden className="text-muted-foreground/50">
                  ↗
                </span>
              </a>
            </li>
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
