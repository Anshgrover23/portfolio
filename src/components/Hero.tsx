import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section
      className="relative mb-20 pt-2 sm:pt-3 md:mb-24 md:pt-4"
      aria-labelledby="hero-name"
    >
      {/* Oversized editorial issue mark — sits behind the hero
          like a chapter folio in a print magazine. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 -top-2 select-none font-display text-[10rem] font-light italic leading-none text-foreground/[0.04] sm:-top-4 sm:text-[14rem] lg:-left-3 lg:-top-6 lg:text-[18rem]"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
      >
        00
      </span>

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-12 lg:gap-16">
        <div
          className="hero-stagger order-2 min-w-0 md:order-1"
          style={
            {
              ['--i' as never]: 0,
            } as React.CSSProperties
          }
        >
          <p
            className="type-meta mb-4 text-accent"
            style={{ ['--i' as never]: 0 } as React.CSSProperties}
          >
            <span className="inline-flex items-center gap-2 align-middle">
              <span
                className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Founding engineer · YC S26 · Available
            </span>
          </p>

          <h1
            id="hero-name"
            className="font-display max-w-[12ch] text-balance text-[3rem] font-extrabold leading-[0.94] text-foreground sm:text-[3.75rem] md:text-[4.75rem] lg:text-[5.5rem]"
            style={
              {
                letterSpacing: '-0.045em',
                fontVariationSettings: "'opsz' 144, 'SOFT' 30",
                ['--i' as never]: 1,
              } as React.CSSProperties
            }
          >
            Ansh{' '}
            <span
              className="font-light italic text-foreground/85"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              Grover
            </span>
          </h1>

          <p
            className="type-body-lg mt-6 max-w-[40rem] border-l-2 border-accent pl-5 text-pretty font-normal text-foreground/85 sm:text-[1.125rem] md:mt-7"
            style={{ ['--i' as never]: 2 } as React.CSSProperties}
          >
            Founding engineer at{' '}
            <a
              href="https://screenpi.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground decoration-accent decoration-2 underline-offset-[6px] hover:underline"
            >
              Screenpipe
            </a>
            . Before that,{' '}
            <span className="font-mono text-[0.95em] tabular-nums">2.5</span>{' '}
            years of contract and OSS work —{' '}
            <span className="font-mono text-[0.95em] tabular-nums">315+</span>{' '}
            merged PRs career-wide (60+ to the Screenpipe product repo), mostly
            TypeScript and Rust.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6 md:mt-8"
            style={{ ['--i' as never]: 3 } as React.CSSProperties}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
            >
              Schedule a call
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/projects"
              className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:text-accent"
            >
              Experience{' '}
              <span aria-hidden className="text-accent/80">
                →
              </span>
            </Link>
            <a
              href="mailto:anshgrover938@gmail.com"
              className="font-mono text-xs italic text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              anshgrover938@gmail.com
            </a>
          </div>
        </div>

        <div
          className="hero-stagger order-1 flex justify-center md:order-2 md:mt-2 md:justify-end"
          style={{ ['--i' as never]: 0 } as React.CSSProperties}
        >
          <div
            className="relative aspect-[4/5] w-[9rem] shrink-0 overflow-hidden rounded-sm border border-foreground/10 bg-muted shadow-[0_10px_30px_-12px_rgba(20,16,12,0.18),0_2px_4px_-2px_rgba(20,16,12,0.06)] sm:w-[10rem] md:w-[12rem] lg:w-[16rem] xl:w-[17rem]"
            style={{ ['--i' as never]: 0 } as React.CSSProperties}
          >
            <Image
              src="/avatar.jpg"
              alt="Portrait of Ansh Grover"
              fill
              sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 256px, 272px"
              className="object-cover object-[center_28%]"
              priority
            />
            {/* Hairline rust accent stripe — a print-design move,
                not a Tailwind ring. */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-full mt-2 h-px w-full bg-accent/60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2 left-2 type-meta text-background/90 mix-blend-difference"
            >
              India · IST
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
