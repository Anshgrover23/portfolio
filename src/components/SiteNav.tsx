'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
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
        className,
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
  const [mobileOpen, setMobileOpen] = useState(false);

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

    const sections = HOME_SECTIONS.map(id => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
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
      { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.12, 0.35] },
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isItemActive = useCallback(
    (item: NavItem) => {
      if (matchesRoute(pathname, item)) return true;
      if (onHome && item.sectionId && activeSection === item.sectionId) {
        return true;
      }
      return false;
    },
    [pathname, onHome, activeSection],
  );

  const closeMobile = () => setMobileOpen(false);

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome(pathname)) {
      event.preventDefault();
      closeMobile();
      scrollToSection('contact');
      window.history.replaceState(null, '', '#contact');
      return;
    }

    closeMobile();
  };

  return (
    <>
      <header
        className={cn(
          'group/nav fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,color] duration-300',
          scrolled
            ? 'border-b border-line/90 bg-background/88 shadow-[0_1px_0_rgba(47,52,55,0.03)] backdrop-blur-md'
            : 'border-b border-transparent bg-background/70 backdrop-blur-sm',
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <a
              href="https://github.com/Anshgrover23"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[1.05rem] w-[1.05rem] fill-current"
                aria-hidden
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <Link
              href="/#contact"
              onClick={handleContactClick}
              className="group hidden items-center justify-center gap-1.5 rounded-full border border-foreground/15 bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition-[transform,background-color,color,border-color] hover:-translate-y-px hover:border-foreground hover:bg-background hover:text-foreground active:translate-y-0 active:scale-[0.98] sm:inline-flex"
            >
              Schedule call
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line/90 bg-card/80 text-foreground transition-colors hover:bg-muted md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen(open => !open)}
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-2.5 w-4">
                <span
                  className={cn(
                    'absolute left-0 h-[1.5px] w-full bg-current transition-all duration-200',
                    mobileOpen ? 'top-[5px] rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-[5px] h-[1.5px] w-full bg-current transition-opacity duration-200',
                    mobileOpen ? 'opacity-0' : 'opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-[1.5px] w-full bg-current transition-all duration-200',
                    mobileOpen ? 'top-[5px] -rotate-45' : 'top-[10px]',
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-line/90 bg-background/98 backdrop-blur-md md:hidden"
            >
              <div className="mx-auto max-w-[1200px] space-y-4 px-6 py-5 md:px-10 lg:px-12">
                <p className="type-meta text-muted-foreground normal-case">
                  Founding engineer · YC S26
                </p>
                <ul className="space-y-1">
                  {NAV_ITEMS.map(item => {
                    const active = isItemActive(item);
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={event => {
                            if (item.sectionId && isHome(pathname)) {
                              event.preventDefault();
                              closeMobile();
                              scrollToSection(item.sectionId);
                              window.history.replaceState(
                                null,
                                '',
                                `#${item.sectionId}`,
                              );
                              return;
                            }

                            closeMobile();
                          }}
                          className={cn(
                            'flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors',
                            active
                              ? 'bg-muted text-foreground'
                              : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                          )}
                        >
                          {item.label}
                          {active && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-accent"
                              aria-hidden
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col gap-2 border-t border-line/80 pt-4">
                  <Link
                    href="/#contact"
                    onClick={handleContactClick}
                    className="flex w-full items-center justify-center rounded-md border border-line bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98]"
                  >
                    Schedule call
                  </Link>
                  <a
                    href="https://github.com/Anshgrover23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-line/90 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    GitHub
                    <span aria-hidden className="text-muted-foreground/60">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div aria-hidden className="h-[3.25rem] shrink-0 sm:h-14" />
    </>
  );
}
