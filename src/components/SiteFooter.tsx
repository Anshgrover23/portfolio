import Link from 'next/link';

const NAV = [
  { href: '/projects', label: 'Experience' },
  { href: '/blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];

const EXTERNAL = [
  { href: 'https://github.com/Anshgrover23', label: 'GitHub' },
  { href: 'https://twitter.com/Anshgrover23', label: 'X' },
  { href: 'https://www.linkedin.com/in/anshgrover23/', label: 'LinkedIn' },
  { href: 'https://algora.io/Anshgrover23', label: 'Algora' },
  { href: 'https://topmate.io/anshgrover', label: 'Topmate' },
];

const REPO_URL = 'https://github.com/Anshgrover23/portfolio';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-12 border-t border-line/80 bg-canvas-muted/40 pb-32 pt-12 md:mt-16 md:pb-24"
      aria-label="Site footer"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-md">
            <p
              className="font-display text-2xl font-extrabold leading-none text-foreground"
              style={{
                letterSpacing: '-0.035em',
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
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Founding engineer at{' '}
              <a
                href="https://screenpi.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground decoration-accent decoration-2 underline-offset-[5px] hover:underline"
              >
                Screenpipe
              </a>{' '}
              <span className="font-display italic">(YC S26)</span>. Built with
              Next.js, hand-written CSS, and{' '}
              <span className="font-mono tabular-nums">∞</span> coffee.
            </p>
            <a
              href="mailto:anshgrover938@gmail.com"
              className="mt-5 inline-block font-mono text-xs italic text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              anshgrover938@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3 md:gap-x-14">
            <div>
              <p className="type-meta mb-3 text-muted-foreground/70">Site</p>
              <ul className="space-y-1.5">
                {NAV.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="type-meta mb-3 text-muted-foreground/70">Elsewhere</p>
              <ul className="space-y-1.5">
                {EXTERNAL.map(item => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                      <span aria-hidden className="text-muted-foreground/40">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="type-meta mb-3 text-muted-foreground/70">Now</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <span className="font-mono text-xs uppercase tracking-wide text-foreground">
                    Shipping
                  </span>
                  <br />
                  Integrations · desktop
                </li>
                <li>
                  <span className="font-mono text-xs uppercase tracking-wide text-foreground">
                    Reading
                  </span>
                  <br />
                  System architectural designs
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono tabular-nums">
            © {year} Ansh Grover{' '}
            <span className="text-muted-foreground/50" aria-hidden>
              ·
            </span>{' '}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              MIT License
              <span aria-hidden className="text-muted-foreground/40">
                ↗
              </span>
            </a>
          </p>
          <p className="font-mono">
            <Link
              href="/"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              ↑ Back to top
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
