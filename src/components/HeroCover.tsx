import Image from 'next/image';
import { Baby, Target } from 'lucide-react';

/**
 * HeroCover — full-bleed magazine-cover first view.
 *
 * Sits before the editorial scroll. A warm bone / cream paper backdrop
 * with a soft prismatic light leak streaming from the upper-left,
 * portrait composited on the right, meta strip up top, mission card +
 * headline on the left, and a thin stats strip pinned to the bottom.
 * Same palette and type as the editorial body — this is the front
 * cover of the same print issue, not a separate dark hero.
 */
export function HeroCover() {
  return (
    <section
      id="home"
      aria-labelledby="hero-cover-name"
      // Negative margin pulls the cover up under the floating SiteNav so
      // the cover photo reads edge-to-edge from the top of the viewport.
      // The nav itself stays mounted and floats over the cover.
      className="relative isolate -mt-[3.25rem] flex min-h-screen min-h-[100svh] flex-col overflow-hidden text-foreground sm:-mt-14"
      style={{
        backgroundImage: "url('/hero-cover.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'hsl(38 32% 96%)',
      }}
    >
      {/* Faint warm cream tint — reinforces the bone-canvas reading even
          when the photo's light leak is strong, so text on top sits on
          a unified paper plane instead of competing with the rays. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] bg-[hsl(38_32%_96%/0.35)]"
      />
      {/* Rust + amber whisper — kept very low opacity so it lifts the
          photo's actual light leak rather than overwriting it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-br from-[hsl(15_68%_55%/0.06)] via-transparent to-[hsl(38_50%_70%/0.06)]"
      />
      {/* Bottom-edge bone dissolve — takes the cover's last band of pixels
          and ramps them into the body's hsl(var(--background)) so the eye
          reads one continuous warm canvas across the seam. Sits above the
          photo + prismatic overlays but below the relative content wrapper,
          so the stats strip and scroll cue stay fully legible on top. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background"
      />

      {/* Cover content — top padding clears the floating SiteNav
          (h-[3.25rem] / sm:h-14) plus a touch of breathing room. */}
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-6 pb-24 pt-[4.5rem] md:px-10 md:pb-28 md:pt-[5.25rem] lg:px-12">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4">
          <p className="type-meta text-accent">
            <span className="inline-flex items-center gap-2 align-middle">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span>Founding engineer</span>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-muted-foreground">Contract</span>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-muted-foreground">Open source</span>
            </span>
          </p>
          <p className="type-meta hidden text-muted-foreground sm:block">
            India · IST · 2026
          </p>
        </div>

        {/* Main row */}
        <div className="mt-12 grid flex-1 grid-cols-1 items-center gap-12 md:mt-16 lg:mt-0 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: editorial text */}
          <div className="order-2 min-w-0 lg:order-1">
            <p className="type-meta text-accent">
              <span className="inline-flex items-center gap-2 align-middle">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
                <span className="text-muted-foreground">About me</span>
              </span>
            </p>

            <h1
              id="hero-cover-name"
              className="font-display mt-4 max-w-[14ch] text-balance text-[3rem] font-extrabold leading-[0.94] text-foreground sm:text-[3.75rem] lg:text-[5rem]"
              style={{
                letterSpacing: '-0.04em',
                fontVariationSettings: "'opsz' 144, 'SOFT' 30",
              }}
            >
              hey, I&apos;m{' '}
              <span
                className="font-light italic text-foreground"
                style={{
                  fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                }}
              >
                Ansh
              </span>{' '}
              <span aria-hidden className="font-light not-italic text-foreground/85">
                👋
              </span>
            </h1>

            <div className="mt-6 max-w-[40rem] border-l-2 border-accent pl-5 md:mt-7">
              <ul className="space-y-2.5 text-base leading-snug text-foreground/85 sm:text-[1.05rem] sm:leading-[1.6]">
                <li className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>
                    Founding engineer at{' '}
                    <a
                      href="https://screenpi.pe/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground decoration-accent decoration-2 underline-offset-[5px] hover:underline"
                    >
                      Screenpipe
                    </a>{' '}
                    (YC&nbsp;S26)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="min-w-0 max-w-[34rem] text-pretty">
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      2.5
                    </span>{' '}
                    years across contract engineering and open source.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="min-w-0 max-w-[34rem] text-pretty">
                    More than{' '}
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      315
                    </span>{' '}
                    merged pull requests at{' '}
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      8
                    </span>{' '}
                    organizations.
                  </span>
                </li>
              </ul>
            </div>

            {/* Mission card — quiet warm pane sitting on the cream paper. */}
            <div className="mt-8 max-w-[34rem] rounded-xl border border-foreground/10 bg-background/60 p-5 backdrop-blur-sm md:p-6">
              <p className="type-meta text-accent">
                <span className="inline-flex items-center gap-2 align-middle">
                  <Target
                    aria-hidden
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    strokeWidth={1.5}
                  />
                  <span>My mission</span>
                </span>
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.55] text-foreground/85 sm:text-base">
                Local-first software is the next interface. Building Screenpipe
                so AI agents finally have real context — without the
                surveillance trade-off.
              </p>
              <p
                className="font-display mt-3 text-[1.05rem] italic leading-snug text-foreground/75 sm:text-[1.125rem]"
                style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 100" }}
              >
                &ldquo;Keep moving, don&apos;t settle.&rdquo;
              </p>
            </div>

            <p className="type-meta mt-10 hidden text-muted-foreground lg:block">
              <span aria-hidden className="text-accent">
                ↓
              </span>
              &nbsp;&nbsp;Scroll for the rest
            </p>
          </div>

          {/* Right: portrait */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative aspect-[4/5] w-[14rem] overflow-hidden rounded-2xl ring-1 ring-foreground/10 sm:w-[16rem] md:w-[18rem] lg:w-[22rem] xl:w-[24rem]">
              <Image
                src="/avatar.jpg"
                alt="Portrait of Ansh Grover"
                fill
                priority
                sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, (max-width: 1280px) 22rem, 24rem"
                className="object-cover object-[center_28%]"
              />
              {/* Bottom fade — blends the portrait into the warm cream
                  cover so it doesn't sit like a pasted sticker. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
              />
              {/* Soft top-right amber wash so the portrait's right edge
                  picks up the cover's late-afternoon light. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 80% 10%, hsl(28 90% 55% / 0.30), transparent 65%)',
                }}
              />
              <span
                aria-hidden
                className="type-meta pointer-events-none absolute bottom-3 left-3 rounded bg-background/75 px-2 py-0.5 text-foreground/75"
              >
                India · IST
              </span>
            </div>
          </div>
        </div>

        {/* Bottom stats strip — pinned to the bottom of the cover */}
        <div className="mt-auto pt-10">
          <div className="border-t border-foreground/15 pt-4">
            <ul className="type-meta grid grid-cols-2 gap-y-3 text-muted-foreground lg:grid-cols-4 lg:gap-0">
              <li className="flex items-baseline gap-2 lg:justify-start">
                <Baby
                  aria-hidden
                  className="h-3 w-3 shrink-0 text-accent"
                  strokeWidth={1.5}
                />
                <span className="text-foreground normal-case">
                  God&apos;s child
                </span>
              </li>
              <li className="flex items-baseline gap-2 lg:justify-center">
                <span aria-hidden className="text-accent">
                  ↗
                </span>
                <span className="tabular-nums text-foreground">315+</span>
                <span>merged PRs</span>
              </li>
              <li className="flex items-baseline gap-2 lg:justify-center">
                <span aria-hidden className="text-accent">
                  ⌥
                </span>
                <span className="tabular-nums text-foreground">8+</span>
                <span>orgs</span>
              </li>
              <li className="flex items-baseline gap-2 lg:justify-end">
                <span aria-hidden className="text-accent">
                  ◎
                </span>
                <span className="tabular-nums text-foreground">45.9k</span>
                <span>bounties · USD</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
