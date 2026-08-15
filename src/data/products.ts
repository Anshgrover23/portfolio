export type ProductStackItem = {
  label: string;
  icon?: string;
  /** Invert monochrome logos (e.g. Next.js, Vercel) on light backgrounds. */
  invert?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  coverImage: string;
  stack: ProductStackItem[];
  problem: string;
  approach: string;
  outcomes: string[];
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const products: Product[] = [
  {
    slug: 'vouch',
    name: 'Vouch',
    tagline: 'The anti-Splitwise',
    summary:
      'Roommate and trip splits that cite the paper. Snap a receipt, housemates tap what they owe, everyone vouches — nobody argues about organic blueberries.',
    year: '2026',
    status: 'Live',
    liveUrl: 'https://vouch.anshgrover.com/',
    githubUrl: 'https://github.com/Anshgrover23/vouch',
    coverImage: '/projects/vouch-cover.jpg',
    stack: [
      {
        label: 'Next.js',
        icon: `${DEVICON}/nextjs/nextjs-original.svg`,
        invert: true,
      },
      {
        label: 'Postgres',
        icon: `${DEVICON}/postgresql/postgresql-original.svg`,
      },
      {
        label: 'Supabase',
        icon: `${DEVICON}/supabase/supabase-original.svg`,
      },
      {
        label: 'Vercel',
        icon: '/svg-icons/vercel.svg',
      },
      {
        label: 'Playwright',
        icon: `${DEVICON}/playwright/playwright-original.svg`,
      },
      {
        label: 'Drizzle',
        icon: 'https://cdn.simpleicons.org/drizzle/C5F74F',
      },
      {
        label: 'Interfaze',
        icon: 'https://www.google.com/s2/favicons?domain=interfaze.ai&sz=64',
      },
    ],
    problem:
      'Splitwise makes housemates retype every line from a crumpled receipt. Even splits feel unfair, Venmo threads turn into fights, and nobody trusts the total because the paper never made it into the app.',
    approach:
      'Vouch keeps the receipt as proof. Upload a photo (or type the lines); Interfaze pulls merchant, date, total, and priced items. Housemates open a share link and tap I owe this or Not mine. Groups track who owes whom after people have vouched.',
    outcomes: [
      'Live product at vouch.anshgrover.com — signup, OCR upload, review canvas, groups, and share links',
      'Three-tap flow: snap the receipt → tap what you owe → see pairwise balances',
      'AI reads the paper via Interfaze; owners can skip junk lines and rename items so the total recomputes',
      'Groups for households and trips with activity, balances, and CSV export',
      'Monorepo: Next.js 15 web app, Drizzle Postgres, Supabase Storage, unit + Playwright CI',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map(p => p.slug);
}
