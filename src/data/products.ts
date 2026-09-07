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
  /** Case-study primary CTA. Defaults to "Open live app". */
  liveCta?: string;
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
  {
    slug: 'showreel',
    name: 'Showreel',
    tagline: 'The demo-video skill for coding agents',
    summary:
      "Repo in. Film out. Your agent scripts, records, captions, and mixes a launch film from the product's own components — not a screen capture, not a slideshow of screenshots.",
    year: '2026',
    status: 'Live',
    liveUrl: 'https://anshgrover23.github.io/product-demo-playbook/',
    githubUrl: 'https://github.com/Anshgrover23/product-demo-playbook',
    coverImage: '/projects/showreel-cover.jpg',
    liveCta: 'Open live site',
    stack: [
      {
        label: 'Node.js',
        icon: `${DEVICON}/nodejs/nodejs-original.svg`,
      },
      {
        label: 'Playwright',
        icon: `${DEVICON}/playwright/playwright-original.svg`,
      },
      {
        label: 'ffmpeg',
        icon: 'https://cdn.simpleicons.org/ffmpeg/007808',
      },
      {
        label: 'React',
        icon: `${DEVICON}/react/react-original.svg`,
      },
      {
        label: 'HTML',
        icon: `${DEVICON}/html5/html5-original.svg`,
      },
      {
        label: 'ElevenLabs',
        icon: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=64',
      },
    ],
    problem:
      'Agencies charge $5,000–$15,000 for a 60-second product demo. Screen recordings stutter, screenshot slideshows feel fake, and most launch films never touch the actual product.',
    approach:
      "Showreel is an agent skill plus the full manual. One install (`npx skills add`) and a single prompt: the agent runs an eight-step pipeline — script, standalone UI, composition, frame-by-frame record, captions, sound, music, assemble — and only stops for script approval, voiceover audio, and the music file. Films are recorded from the product's own components, tokens, and assets.",
    outcomes: [
      'Live playbook at anshgrover23.github.io/product-demo-playbook — skill, templates, and the full manual',
      'Install once for Claude Code, Cursor, Codex, Gemini CLI, Copilot, Windsurf, OpenCode, and Goose',
      'Four reference films from one pipeline: Vouch, Excalidraw, Asakiri Studio, Colosseum',
      'Deterministic record rig: Node + Playwright + ffmpeg — never a live screen capture',
      'Templates for record.mjs, mix-audio.mjs, voiceover retiming, and a 10-cue sound score',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map(p => p.slug);
}
