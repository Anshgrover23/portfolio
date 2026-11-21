import {
  generateOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt =
  'Ansh Grover — 2x YC engineer · 3x remote startup. Software Engineer at River AI (YC F26), previously Screenpipe (YC S26).';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TwitterImage() {
  return generateOgImage();
}
