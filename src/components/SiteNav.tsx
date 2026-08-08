'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGroup, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
  matchPath?: string;
};

/** Founder-style nav: few links, writing not "blog", experience as primary proof */
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Experience',
    href: '/projects',
    sectionId: 'experience',
    matchPath: '/projects',
  },
  { label: 'Writing', href: '/blog', sectionId: 'blog', matchPath: '/blog' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
];

const HOME_SECTIONS = ['experience', 'blog', 'contact'] as const;

function isHome(pathname: string) {
  return pathname === '/';
}

function matchesRoute(pathname: string, item: NavItem) {
  if (!item.matchPath) return false;
  return (
    pathname === item.matchPath || pathname.startsWith(`${item.matchPath}/`)
  );
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function NavLink({
  item,
  active,
  pathname,
  onNavigate,
  className,
}: {
  item: NavItem;
  active: boolean;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.sectionId && isHome(pathname)) {
      event.preventDefault();
      onNavigate?.();
      scrollToSection(item.sectionId);
      window.history.replaceState(null, '', `#${item.sectionId}`);
      return;
    }

    onNavigate?.();
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={cn(
        'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200',
        active
          ? 'text-background'
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      <span className="relative z-[1]">{item.label}</span>
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-foreground"
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        />
      )}
      {active && <span className="sr-only"> (current)</span>}
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const onHome = isHome(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActiveSection(null);
      return;
    }

    const sections = HOME_SECTIONS.map(id =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.12, 0.35] }
    );

    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, pathname]);

  useEffect(() => {
    if (!onHome) return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, [onHome, pathname]);

  const isItemActive = useCallback(
    (item: NavItem) => {
      if (matchesRoute(pathname, item)) return true;
      if (onHome && item.sectionId && activeSection === item.sectionId) {
        return true;
      }
      return false;
    },
    [pathname, onHome, activeSection]
  );

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome(pathname)) {
      event.preventDefault();
      scrollToSection('contact');
      window.history.replaceState(null, '', '#contact');
    }
  };

  return (
    <>
      <header
        className={cn(
          'group/nav fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,color] duration-300',
          scrolled
            ? 'border-b border-line/90 bg-background/88 shadow-[0_1px_0_rgba(47,52,55,0.03)] backdrop-blur-md'
            : 'border-b border-transparent bg-background/70 backdrop-blur-sm'
        )}
      >
        <nav
          className="mx-auto flex h-[3.25rem] max-w-[1200px] items-center justify-between gap-3 px-6 sm:h-14 md:px-10 lg:px-12"
          aria-label="Main"
        >
          <Link
            href="/"
            className="group min-w-0 shrink-0 transition-opacity hover:opacity-80"
          >
            <span
              className="font-display block text-[1.1rem] font-extrabold leading-none text-foreground sm:text-[1.2rem]"
              style={{
                letterSpacing: '-0.03em',
                fontVariationSettings: "'opsz' 60, 'SOFT' 40",
              }}
            >
              Ansh{' '}
              <span
                className="font-light italic text-foreground/80"
                style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 100" }}
              >
                Grover
              </span>
            </span>
            <span className="type-meta mt-1 hidden text-muted-foreground normal-case sm:block">
              Founding engineer{' '}
              <span className="font-display italic text-muted-foreground/80">
                ·
              </span>{' '}
              YC S26
            </span>
          </Link>

          {/* Desktop: editorial segmented control — pill outlined with a
              warm hairline so it sits inside the page palette, not a generic
              shadcn segmented control */}
          <div className="hidden items-center gap-0.5 rounded-full border border-foreground/12 bg-background/70 px-1 py-1 backdrop-blur-sm md:flex">
            <LayoutGroup id={pathname}>
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.label}
                  item={item}
                  active={isItemActive(item)}
                  pathname={pathname}
                />
              ))}
            </LayoutGroup>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <div
              className="flex items-center gap-0.5"
              aria-label="Social links"
            >
              <a
                href="https://x.com/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-7 sm:w-7"
                aria-label="X"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[0.9rem] w-[0.9rem] fill-current sm:h-[0.95rem] sm:w-[0.95rem]"
                  aria-hidden
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/anshgrover23/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[0.9rem] w-[0.9rem] fill-current sm:h-[0.95rem] sm:w-[0.95rem]"
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[0.9rem] w-[0.9rem] fill-current sm:h-[0.95rem] sm:w-[0.95rem]"
                  aria-hidden
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>

            <Link
              href="/#contact"
              onClick={handleContactClick}
              className="group inline-flex items-center justify-center gap-1 rounded-full border border-foreground/15 bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-[transform,background-color,color,border-color] hover:-translate-y-px hover:border-foreground hover:bg-background hover:text-foreground active:translate-y-0 active:scale-[0.98] sm:gap-1.5 sm:px-4 sm:text-sm"
            >
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">Schedule call</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </nav>
      </header>

      <div aria-hidden className="h-[3.25rem] shrink-0 sm:h-14" />
    </>
  );
}
