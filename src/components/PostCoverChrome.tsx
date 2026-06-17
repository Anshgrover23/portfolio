'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * PostCoverChrome — gates the floating UI (social dock, chatbot, etc.)
 * so it only renders while the magazine cover is OUT of view.
 *
 * Strategy:
 *   - We resolve the cover via `getElementById('home')`.
 *   - An IntersectionObserver watches when the cover intersects the
 *     viewport. While intersecting (beyond a small hysteresis band)
 *     the chrome is hidden; once the cover scrolls away the chrome
 *     reveals. The behaviour is reactive both ways so scrolling back
 *     to the top hides the chrome again.
 *   - A scroll fallback (rAF-throttled) keeps the gate deterministic
 *     even when IO callbacks fire infrequently.
 *   - prefers-reduced-motion is honoured — we simply skip transitions
 *     (the gate is mount/unmount, not animated, so this is trivially
 *     compliant).
 */
export function PostCoverChrome({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cover = document.getElementById('home');
    if (!cover) {
      // Cover missing — fail open so the chrome still appears.
      setRevealed(true);
      return;
    }

    const evaluate = () => {
      const rect = cover.getBoundingClientRect();
      const vh = window.innerHeight;
      // Reveal when the cover's bottom is at the top 40% of viewport
      // (i.e. mostly scrolled out), hide when bottom drops back below
      // the 55% line. Hysteresis prevents flicker right at the seam.
      setRevealed(prev => {
        if (rect.bottom < vh * 0.4) return true;
        if (rect.bottom > vh * 0.55) return false;
        return prev;
      });
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        evaluate();
      });
    };

    const observer = new IntersectionObserver(
      () => {
        evaluate();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(cover);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    evaluate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  if (!revealed) return null;
  return <>{children}</>;
}
