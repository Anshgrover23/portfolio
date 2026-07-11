'use client';

import { useCallback, useEffect, useRef } from 'react';
import createGlobe, { type Arc, type Globe, type Marker } from 'cobe';

const AUTO_PHI_STEP = 0.003;
const THETA_BASE = 0.22;
const THETA_MIN = -0.4;
const THETA_MAX = 0.4;

type CobeGlobeProps = {
  markers?: Marker[];
  arcs?: Arc[];
  arcColor?: [number, number, number];
  /** Initial horizontal rotation (radians). */
  initialPhi?: number;
  className?: string;
};

/**
 * Interactive COBE globe — drag to rotate, momentum on release,
 * soft auto-spin when idle. Marker `id`s enable CSS Anchor polaroids.
 */
export default function CobeGlobe({
  markers = [],
  arcs = [],
  arcColor = [0.72, 0.32, 0.18],
  initialPhi = 0.4,
  className,
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markersRef = useRef(markers);
  const arcsRef = useRef(arcs);
  const arcColorRef = useRef(arcColor);
  markersRef.current = markers;
  arcsRef.current = arcs;
  arcColorRef.current = arcColor;

  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    lastPointer.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    isDraggingRef.current = true;
    velocity.current = { phi: 0, theta: 0 };
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let phi = initialPhi;
    let globe: Globe | null = null;
    let rafId = 0;
    let visible = false;
    let pageVisible = document.visibilityState === 'visible';
    let running = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const syncSize = () => {
      width = parent.clientWidth;
      if (!width) return;
      const size = width * dpr;
      canvas.width = size;
      canvas.height = size;
      globe?.update({ width: size, height: size });
    };

    const tick = () => {
      if (!globe || !running) return;

      if (!reduceMotion && !isDraggingRef.current) {
        phi += AUTO_PHI_STEP;

        if (
          Math.abs(velocity.current.phi) > 0.0001 ||
          Math.abs(velocity.current.theta) > 0.0001
        ) {
          phiOffsetRef.current += velocity.current.phi;
          thetaOffsetRef.current += velocity.current.theta;
          velocity.current.phi *= 0.95;
          velocity.current.theta *= 0.95;
        }

        if (thetaOffsetRef.current < THETA_MIN) {
          thetaOffsetRef.current += (THETA_MIN - thetaOffsetRef.current) * 0.1;
        } else if (thetaOffsetRef.current > THETA_MAX) {
          thetaOffsetRef.current += (THETA_MAX - thetaOffsetRef.current) * 0.1;
        }
      }

      globe.update({
        phi: phi + phiOffsetRef.current + dragOffset.current.phi,
        theta: THETA_BASE + thetaOffsetRef.current + dragOffset.current.theta,
        markers: markersRef.current,
        arcs: arcsRef.current,
        arcColor: arcColorRef.current,
      });

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !globe) return;
      if (!visible || !pageVisible) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const onVisibility = () => {
      pageVisible = document.visibilityState === 'visible';
      if (pageVisible) start();
      else stop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current === null) return;

      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };

      const now = Date.now();
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1);
        const maxVelocity = 0.15;
        velocity.current = {
          phi: Math.max(
            -maxVelocity,
            Math.min(
              maxVelocity,
              ((e.clientX - lastPointer.current.x) / dt) * 0.3
            )
          ),
          theta: Math.max(
            -maxVelocity,
            Math.min(
              maxVelocity,
              ((e.clientY - lastPointer.current.y) / dt) * 0.08
            )
          ),
        };
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    };

    const onPointerUp = () => {
      if (pointerInteracting.current !== null) {
        phiOffsetRef.current += dragOffset.current.phi;
        thetaOffsetRef.current += dragOffset.current.theta;
        dragOffset.current = { phi: 0, theta: 0 };
        lastPointer.current = null;
      }
      pointerInteracting.current = null;
      isDraggingRef.current = false;
      canvas.style.cursor = 'grab';
    };

    syncSize();

    globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: initialPhi,
      theta: THETA_BASE,
      dark: 0,
      diffuse: 1.5,
      mapSamples: 16000,
      mapBrightness: 10,
      mapBaseBrightness: 0.02,
      baseColor: [1, 1, 1],
      markerColor: [0.72, 0.32, 0.18],
      glowColor: [0.94, 0.93, 0.91],
      markers: markersRef.current,
      arcs: arcsRef.current,
      arcColor: arcColorRef.current,
      arcWidth: 0.45,
      arcHeight: 0.28,
      markerElevation: 0.01,
      scale: 1.05,
      opacity: 0.85,
    });

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
    });
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (visible) start();
        else stop();
      },
      { rootMargin: '80px', threshold: 0 }
    );
    intersectionObserver.observe(parent);

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      globe?.destroy();
      globe = null;
    };
  }, [initialPhi]);

  return (
    <canvas
      ref={canvasRef}
      className={
        className ??
        'h-full w-full cursor-grab touch-none active:cursor-grabbing'
      }
      style={{ contain: 'layout paint size' }}
      onPointerDown={handlePointerDown}
      aria-label="Interactive contributions globe — drag to rotate"
      role="img"
    />
  );
}
