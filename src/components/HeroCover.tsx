import Image from 'next/image';
import { Baby } from 'lucide-react';
import { AskAiAboutMe } from '@/components/AskAiAboutMe';

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
              <span
                aria-hidden
                className="font-light not-italic text-foreground/85"
              >
                👋
              </span>
            </h1>

            {/* Proof points — primary scan path under the name. Sized as
                supporting display, not body copy, so they read as the
                hero story once the mission card is gone. */}
            <div className="mt-7 max-w-[42rem] border-l-2 border-accent pl-5 md:mt-8 md:pl-6">
              <ul className="space-y-3.5 text-[1.125rem] leading-[1.45] text-foreground/90 sm:space-y-4 sm:text-[1.25rem] sm:leading-[1.5] md:text-[1.35rem] md:leading-[1.45]">
                <li className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-pretty">
                    Founding engineer at{' '}
                    <a
                      href="https://screenpi.pe/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground decoration-accent decoration-2 underline-offset-[6px] hover:underline"
                    >
                      Screenpipe&nbsp;|&nbsp;YC&nbsp;S26
                    </a>
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="min-w-0 text-pretty">
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      3
                    </span>{' '}
                    years across contract engineering and open source.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="min-w-0 text-pretty">
                    More than{' '}
                    <span className="font-mono text-[0.95em] tabular-nums text-foreground">
                      463
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

            <AskAiAboutMe className="mt-9 max-w-[34rem]" />

            {/* Spacer only — keeps bullets / Ask AI where they are, restores
                the lower scroll cue position the mission card used to create.
                Visible on mobile too so the cover still signals continuation. */}
            <p className="type-meta mt-16 text-muted-foreground sm:mt-20 lg:mt-24">
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
                <span className="tabular-nums text-foreground">463+</span>
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
