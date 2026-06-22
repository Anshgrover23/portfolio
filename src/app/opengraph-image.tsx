import {
  generateOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt =
  'Ansh Grover — Founding Engineer at Screenpipe (YC S26). 315+ merged PRs, $45.9k+ open source bounties.';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return generateOgImage();
}
