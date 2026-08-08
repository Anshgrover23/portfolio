import {
  generateOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt = 'Writing — Ansh Grover';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function BlogOpenGraphImage() {
  return generateOgImage({
    eyebrow: 'Writing',
    title: 'Thoughts',
    titleItalic: '& learnings',
    subtitle: 'Open source, developer tools, and lessons from the field.',
    body: 'Essays and notes from Screenpipe, TSCircuit, Antiwork, and beyond.',
    stats: [
      { value: '463+', label: 'Merged PRs' },
      { value: '8+', label: 'Orgs' },
      { value: '3y', label: 'Shipping' },
    ],
    showPortrait: false,
    footer: 'anshgrover.com/blog',
  });
}
