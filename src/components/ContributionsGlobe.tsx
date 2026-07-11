'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  GLOBE_ARC_COLOR,
  GLOBE_INITIAL_PHI,
  globeArcs,
  globeImageUrls,
  globeMarkers,
  globePolaroids,
} from '@/data/globeContributions';

const CobeGlobe = dynamic(() => import('./CobeGlobe'), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-square w-full rounded-full bg-canvas-muted/60"
      aria-hidden
    />
  ),
});

/**
 * Warm polaroid assets as soon as this island mounts (Experience is
 * still below the fold on first paint, so we preload here instead of
 * competing with the hero). Tiny thumbs + SVG logos, not full logos.
 */
function usePreloadGlobeImages() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of globeImageUrls) {
      const existing = document.querySelector(
        `link[rel="preload"][href="${href}"]`
      );
      if (existing) continue;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) link.remove();
    };
  }, []);
}

/**
 * Experience figure — India-origin arcs to a spread constellation of orgs.
 * Asymmetric editorial split, not a centered demo widget.
 */
export function ContributionsGlobe() {
  usePreloadGlobeImages();

  return (
    <div
      className="contributions-globe mb-12 md:mb-14"
      aria-label="Where open source work shipped from home"
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 lg:gap-12">
        <div className="flex min-w-0 items-center md:pr-4">
          <p
            className="font-display max-w-[15rem] text-[1.35rem] italic leading-[1.35] tracking-tight text-foreground/80 sm:max-w-[16.5rem] sm:text-[1.5rem] md:text-[1.625rem]"
            style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}
          >
            From India to working with global companies across the U.S. Founding
            engineer. Remote. Open source.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[18rem] justify-self-center sm:max-w-[20rem] md:mx-0 md:max-w-[22rem] md:justify-self-end lg:max-w-[24rem]">
          <CobeGlobe
            markers={globeMarkers}
            arcs={globeArcs}
            arcColor={GLOBE_ARC_COLOR}
            initialPhi={GLOBE_INITIAL_PHI}
          />

          {globePolaroids.map(pin => (
            <div
              key={pin.id}
              className="contribution-polaroid"
              style={
                {
                  positionAnchor: `--cobe-${pin.id}`,
                  opacity: `var(--cobe-visible-${pin.id}, 0)`,
                  filter: `blur(calc((1 - var(--cobe-visible-${pin.id}, 0)) * 8px))`,
                  ['--polaroid-rotate' as string]: `${pin.rotate}deg`,
                } as React.CSSProperties
              }
            >
              <Image
                src={pin.image}
                alt=""
                width={40}
                height={40}
                className="contribution-polaroid-img"
                sizes="40px"
                quality={70}
                // Eager: opacity starts at 0 via CSS anchors, so native lazy
                // would defer until "visible" and polaroids pop in late.
                loading="eager"
                decoding="async"
                unoptimized={pin.image.endsWith('.svg')}
              />
              <span className="contribution-polaroid-caption">
                {pin.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
