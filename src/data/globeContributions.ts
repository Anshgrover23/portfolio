import type { Arc, Marker } from 'cobe';

export type GlobeContribution = {
  id: string;
  location: [number, number];
  image: string;
  caption: string;
  href?: string;
  rotate: number;
  markerSize?: number;
};

/** Rajasthan — home base for arcs (marker + arcs only, no polaroid). */
export const GLOBE_HOME: [number, number] = [26.9, 75.8];

/**
 * Pin constellation for readable polaroids.
 * Screenpipe alone owns exact SF (primary role). Other orgs are
 * spread across continents so nothing stacks on the Bay Area.
 * Images are small thumbs (~4–12KB) so first scroll isn’t a 200KB hit.
 */
export const globeContributions: GlobeContribution[] = [
  {
    id: 'screenpipe',
    location: [37.7749, -122.4194], // exact San Francisco
    image: '/globe-screenpipe.png',
    caption: 'Screenpipe',
    href: '/projects/screenpipe',
    rotate: -6,
    markerSize: 0.065,
  },
  {
    id: 'antiwork',
    location: [40.7128, -74.006],
    image: '/antiwork.svg',
    caption: 'Antiwork',
    href: '/projects/antiwork',
    rotate: 5,
    markerSize: 0.045,
  },
  {
    id: 'twenty',
    location: [48.8566, 2.3522],
    image: '/twentyhq.svg',
    caption: 'Twenty',
    href: '/projects/twentyhq',
    rotate: -4,
    markerSize: 0.045,
  },
  {
    id: 'algora',
    location: [52.52, 13.405],
    image: '/algora.svg',
    caption: 'Algora',
    href: '/projects/algora-io',
    rotate: 3,
    markerSize: 0.04,
  },
  {
    id: 'tscircuit',
    location: [1.3521, 103.8198],
    image: '/tscircuit.svg',
    caption: 'TSCircuit',
    href: '/projects/tscircuit',
    rotate: -5,
    markerSize: 0.04,
  },
  {
    id: 'sugarlabs',
    location: [-23.5505, -46.6333],
    image: '/sugarlabs.svg',
    caption: 'Sugar Labs',
    href: '/projects/sugar-labs',
    rotate: 6,
    markerSize: 0.04,
  },
];

/** Org polaroids only (no home photo). */
export const globePolaroids: GlobeContribution[] = globeContributions;

/** URLs to warm in cache before the Experience section is visible. */
export const globeImageUrls: string[] = globePolaroids.map(p => p.image);

/** Home pin + org pins for the WebGL markers. */
export const globeMarkers: Marker[] = [
  {
    id: 'home',
    location: GLOBE_HOME,
    size: 0.06,
    color: [0.72, 0.32, 0.18],
  },
  ...globeContributions.map(c => ({
    id: c.id,
    location: c.location,
    size: c.markerSize ?? 0.04,
  })),
];

/** Arcs from India home to each org pin. */
export const globeArcs: Arc[] = globeContributions.map(c => ({
  id: `home-${c.id}`,
  from: GLOBE_HOME,
  to: c.location,
}));

/** Orient so India faces the camera on first paint. */
export const GLOBE_INITIAL_PHI = (90 + GLOBE_HOME[1]) * (Math.PI / 180);

/** Rust accent for arcs — matches site accent. */
export const GLOBE_ARC_COLOR: [number, number, number] = [0.72, 0.32, 0.18];
