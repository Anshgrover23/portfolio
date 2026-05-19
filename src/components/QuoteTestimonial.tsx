'use client';

/**
 * Port of Framer "Quote testimonial" (https://framer.com/m/Quote-testimonial-BGxY.js@2MkXAfpKIsxFQLmCmCIL)
 * without `framer` runtime (addPropertyControls / RenderTarget are Framer-only).
 */

import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  type Variants,
} from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Caveat } from 'next/font/google';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { TestimonialItem } from '@/components/Testimonials';
import { cn } from '@/lib/utils';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

/** v2: prior key often hid cue forever; bump so layout fixes show again */
const PILL_SKETCH_STORAGE = 'testimonial-pill-sketch-dismissed-v2';

/** Snappy editorial motion — ~250ms quote, spring pill ~320ms settle */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;
const QUOTE_CROSSFADE = 0.26;
const META_CROSSFADE = 0.22;
const META_DELAY = 0.03;
const PILL_SPRING = { type: 'spring' as const, stiffness: 580, damping: 34, mass: 0.62 };
const LAYOUT_SPRING = { type: 'spring' as const, stiffness: 620, damping: 36, mass: 0.58 };
const NAME_SPRING = { type: 'spring' as const, stiffness: 520, damping: 32, mass: 0.55 };

const quoteVariants: Variants = {
  initial: {
    opacity: 0,
    filter: 'blur(4px)',
    y: 6,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: QUOTE_CROSSFADE, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    filter: 'blur(3px)',
    y: -5,
    transition: { duration: QUOTE_CROSSFADE * 0.75, ease: EASE_IN_OUT },
  },
};

const metaVariants: Variants = {
  initial: { opacity: 0, y: 5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: META_CROSSFADE,
      delay: META_DELAY,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: META_CROSSFADE * 0.75, ease: EASE_IN_OUT },
  },
};

/** Avatar + collapsed pill hit target; keeps taps away from neighbors */
const AVATAR = 44;
const AVATAR_PX = `${AVATAR}px`;

type QuoteSlide = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  sourceUrl?: string;
};

/** One slide per person (username or name); keeps first occurrence. */
function dedupeByAuthor(items: TestimonialItem[]): TestimonialItem[] {
  const seen = new Set<string>();
  const out: TestimonialItem[] = [];
  for (const t of items) {
    const key = (t.username ?? t.name ?? '').trim().toLowerCase();
    if (key) {
      if (seen.has(key)) continue;
      seen.add(key);
    }
    out.push(t);
  }
  return out;
}

function toSlides(items: TestimonialItem[]): QuoteSlide[] {
  return items
    .map((t) => {
      const quote = (t.quote ?? t.text ?? '').trim();
      if (!quote) return null;
      return {
        quote,
        author: t.name ?? t.username ?? 'Anonymous',
        role: t.title?.trim() || (t.username ? `@${t.username}` : ''),
        avatar: t.image ?? '',
        sourceUrl: t.sourceUrl,
      } satisfies QuoteSlide;
    })
    .filter(Boolean) as QuoteSlide[];
}

export function QuoteTestimonial({ items }: { items: TestimonialItem[] }) {
  const slides = useMemo(() => toSlides(dedupeByAuthor(items)), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillCueReady, setPillCueReady] = useState(false);
  const [sketchCueDismissed, setSketchCueDismissed] = useState(false);

  useEffect(() => {
    try {
      setSketchCueDismissed(
        sessionStorage.getItem(PILL_SKETCH_STORAGE) === '1'
      );
    } catch {
      setSketchCueDismissed(false);
    }
    setPillCueReady(true);
  }, []);

  useEffect(() => {
    setActiveIndex((i) =>
      slides.length ? Math.min(Math.max(0, i), slides.length - 1) : 0
    );
  }, [slides.length]);

  const dismissSketchCue = useCallback(() => {
    setSketchCueDismissed(true);
    try {
      sessionStorage.setItem(PILL_SKETCH_STORAGE, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const safeIndex = slides.length
    ? Math.min(Math.max(0, activeIndex), slides.length - 1)
    : 0;
  const active = slides[safeIndex];

  const activeIndexRef = useRef(safeIndex);
  const wheelZoneRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skipInitialScrollRef = useRef(true);

  useEffect(() => {
    activeIndexRef.current = safeIndex;
  }, [safeIndex]);

  useEffect(() => {
    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      return;
    }
    avatarRefs.current[safeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [safeIndex]);

  /** Scroll / trackpad over this block cycles quotes (page still scrolls at ends). */
  useEffect(() => {
    const root = wheelZoneRef.current;
    if (!root || slides.length < 2) return;

    let lastStepAt = 0;
    const minGapMs = 360;

    const onWheel = (e: WheelEvent) => {
      const absY = Math.abs(e.deltaY);
      const absX = Math.abs(e.deltaX);
      if (absY < 1 && absX < 1) return;

      const dominant = absY >= absX ? e.deltaY : e.deltaX;
      if (Math.abs(dominant) < 14) return;

      const i = activeIndexRef.current;
      const next =
        dominant > 0
          ? Math.min(i + 1, slides.length - 1)
          : Math.max(i - 1, 0);
      if (next === i) return;

      const now = performance.now();
      if (now - lastStepAt < minGapMs) return;

      lastStepAt = now;
      e.preventDefault();
      activeIndexRef.current = next;
      setActiveIndex(next);
      dismissSketchCue();
    };

    root.addEventListener('wheel', onWheel, { passive: false });
    return () => root.removeEventListener('wheel', onWheel);
  }, [dismissSketchCue, slides.length]);

  if (slides.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground">
        No testimonials to show.
      </p>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={wheelZoneRef}
        role="region"
        aria-label="Testimonials: scroll here or use the faces below to change the quote."
        className="flex w-full flex-col items-stretch justify-center py-8 md:py-10"
      >
        <div className="flex w-full max-w-none flex-col items-center gap-8 md:gap-9">
          {/* Marks are positioned inside this box so they sit near the quote, not at viewport edges */}
          <div className="flex min-h-[7rem] w-full justify-center px-2 pt-1 md:min-h-[8rem] md:px-4">
            <div className="relative w-full max-w-[min(100%,34rem)] px-10 sm:max-w-[38rem] sm:px-12 md:max-w-[42rem] md:px-14">
              <motion.span
                key={`open-${safeIndex}`}
                className="pointer-events-none absolute left-1 top-0 select-none font-serif leading-none text-foreground/[0.18] sm:left-2"
                style={{
                  fontSize: 'clamp(2.75rem, 10vw, 4.25rem)',
                }}
                aria-hidden
                initial={{ opacity: 0.35, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: QUOTE_CROSSFADE * 0.85, ease: EASE_OUT }}
              >
                &ldquo;
              </motion.span>
              <div className="relative min-h-[5.5rem] w-full sm:min-h-[6rem] md:min-h-[6.5rem]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.p
                    key={safeIndex}
                    variants={quoteVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="font-display absolute inset-x-0 top-0 z-[1] m-0 w-full px-1 text-center text-[1.65rem] font-light leading-snug tracking-tight text-foreground will-change-[opacity,filter,transform] sm:px-2 sm:text-3xl md:text-[clamp(1.875rem,2.75vw,2.5rem)] md:leading-[1.42]"
                  >
                    {active.quote}
                  </motion.p>
                </AnimatePresence>
              </div>
              <motion.span
                key={`close-${safeIndex}`}
                className="pointer-events-none absolute bottom-0 right-1 select-none font-serif leading-none text-foreground/[0.18] sm:right-2"
                style={{
                  fontSize: 'clamp(2.75rem, 10vw, 4.25rem)',
                }}
                aria-hidden
                initial={{ opacity: 0.35, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: QUOTE_CROSSFADE * 0.85,
                  delay: META_DELAY * 0.5,
                  ease: EASE_OUT,
                }}
              >
                &rdquo;
              </motion.span>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-6">
            <div className="relative flex min-h-[4.25rem] w-full flex-col items-center justify-center text-center">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={`meta-${safeIndex}`}
                  variants={metaVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-x-0 top-0 flex flex-col items-center gap-3 text-center will-change-[opacity,filter,transform]"
                >
                  {active.role ? (
                    <p className="m-0 w-full max-w-none px-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:px-4">
                      {active.role}
                    </p>
                  ) : (
                    <p className="m-0 h-[1em] w-full max-w-none" aria-hidden />
                  )}
                  <span className="inline-flex min-h-[1.25rem] items-center justify-center">
                    {active.sourceUrl ? (
                      <a
                        href={active.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent underline-offset-4 hover:underline"
                      >
                        View thread
                        <ExternalLink
                          className="h-3 w-3 opacity-70"
                          strokeWidth={1.5}
                        />
                      </a>
                    ) : null}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Cue lives outside overflow-x so it is not clipped (CSS overflow clips abs children). */}
            <div className="relative z-20 w-full pb-1 pt-14">
              {pillCueReady && !sketchCueDismissed && slides.length > 1 ? (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1 z-[60] flex w-max max-w-[min(100%,18rem)] -translate-x-1/2 translate-x-6 flex-col items-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] sm:translate-x-8"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: [0, -5, 0] }}
                  transition={{
                    opacity: { duration: 0.55, ease: EASE_OUT },
                    y: {
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  aria-hidden
                >
                  <p
                    className={cn(
                      caveat.className,
                      'mb-0.5 text-center text-[1.85rem] leading-none tracking-wide text-ink sm:text-[2.1rem]',
                      '-rotate-[8deg]',
                      '[text-shadow:0_0_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(47,52,55,0.12)]'
                    )}
                  >
                    click me!
                  </p>
                  <svg
                    width="72"
                    height="64"
                    viewBox="0 0 72 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-ink/80 -mt-0.5 shrink-0"
                  >
                    <path
                      d="M 38 4 C 34 22 32 36 36 50"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 40 2 C 36 20 34 38 38 48"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      className="opacity-70"
                    />
                    <path
                      d="M 36 52 L 30 44 L 42 44 Z"
                      fill="currentColor"
                    />
                  </svg>
                </motion.div>
              ) : null}
              <div
                className={cn(
                  'relative z-20 flex w-full max-w-full flex-nowrap items-center justify-center gap-3 overflow-x-auto overscroll-x-contain py-2',
                  'scroll-px-6 px-6 sm:scroll-px-8 sm:px-8',
                  '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
                  'sm:gap-4 md:gap-5'
                )}
              >
              <LayoutGroup id="testimonial-avatars">
              {slides.map((t, index) => {
                const isActive = safeIndex === index;
                const isHovered = hoveredIndex === index && !isActive;
                const showName = isActive || isHovered;

                return (
                  <motion.button
                    key={`quote-slide-${index}`}
                    ref={(node) => {
                      avatarRefs.current[index] = node;
                    }}
                    type="button"
                    layout
                    aria-pressed={isActive}
                    aria-label={`Show testimonial from ${t.author}`}
                    onMouseDown={(e) => {
                      if (e.button === 0) e.preventDefault();
                    }}
                    onClick={(e) => {
                      dismissSketchCue();
                      setActiveIndex(index);
                      e.currentTarget.focus({ preventScroll: true });
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ zIndex: isActive ? 30 : isHovered ? 20 : 10 }}
                    transition={{ layout: LAYOUT_SPRING }}
                    className={cn(
                      'relative isolate flex shrink-0 cursor-pointer touch-manipulation select-none items-center overflow-visible rounded-full border-0 bg-transparent outline-none',
                      'p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent/70',
                      isActive && showName && 'pr-4'
                    )}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="testimonial-active-pill"
                        className="absolute inset-0 rounded-full bg-foreground shadow-[0_10px_15px_-3px_rgba(47,52,55,0.12),0_4px_6px_-2px_rgba(47,52,55,0.06)]"
                        transition={PILL_SPRING}
                      />
                    ) : null}
                    {isHovered ? (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.14, ease: EASE_OUT }}
                      />
                    ) : null}
                  <span
                    className={cn(
                      'relative z-10 flex items-center',
                      showName ? 'w-max' : 'min-w-0'
                    )}
                  >
                    {t.avatar ? (
                      <div
                        className="relative shrink-0 overflow-hidden rounded-full"
                        style={{
                          width: AVATAR_PX,
                          height: AVATAR_PX,
                          boxShadow: isActive
                            ? '0 0 0 2px rgba(255, 255, 255, 0.35)'
                            : 'none',
                        }}
                      >
                        <Image
                          src={t.avatar}
                          alt=""
                          width={AVATAR}
                          height={AVATAR}
                          draggable={false}
                          className="pointer-events-none rounded-full object-cover"
                          style={{ width: AVATAR_PX, height: AVATAR_PX }}
                          sizes={`${AVATAR}px`}
                        />
                      </div>
                    ) : (
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground"
                        style={{ width: AVATAR_PX, height: AVATAR_PX }}
                        aria-hidden
                      >
                        {t.author.slice(0, 1)}
                      </div>
                    )}
                    <motion.span
                      aria-hidden={!showName}
                      className={cn(
                        'block shrink-0 overflow-hidden whitespace-nowrap pl-2.5 pr-0.5 text-left text-base font-medium',
                        isActive
                          ? 'text-primary-foreground'
                          : 'text-foreground'
                      )}
                      initial={false}
                      animate={{
                        maxWidth: showName ? 280 : 0,
                        opacity: showName ? 1 : 0,
                      }}
                      transition={{
                        maxWidth: NAME_SPRING,
                        opacity: { duration: 0.16, ease: EASE_OUT },
                      }}
                    >
                      {t.author}
                    </motion.span>
                  </span>
                  </motion.button>
                );
              })}
              </LayoutGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
