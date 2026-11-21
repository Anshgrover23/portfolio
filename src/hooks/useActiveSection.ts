'use client';

import { useEffect, useState } from 'react';

export const HOME_SECTION_IDS = [
  'home',
  'about',
  'experience',
  'projects',
  'testimonials',
  'blog',
  'education',
  'skills',
  'contact',
] as const;

/** Track the section crossing the reading line below the fixed navigation. */
export function useActiveSection(enabled = true) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const sections = HOME_SECTION_IDS.map(id =>
      document.getElementById(id)
    ).filter((element): element is HTMLElement => element !== null);
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      // Vertical percentage root margins resolve against width. Pixels keep
      // this reading band valid on both wide and tall viewports.
      observer = new IntersectionObserver(
        () => {
          const current = sections
            .filter(section => section.getBoundingClientRect().top <= 144)
            .at(-1);
          setActive(current?.id ?? null);
        },
        {
          rootMargin: `-96px 0px -${Math.max(0, window.innerHeight - 144)}px 0px`,
          threshold: 0,
        }
      );
      sections.forEach(section => observer.observe(section));
    };
    observe();
    window.addEventListener('resize', observe);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, [enabled]);

  return active;
}
