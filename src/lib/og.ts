import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const OG_IMAGE_PATH = '/opengraph-image';
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const DEFAULT_OG = {
  title: 'Ansh Grover — founding engineer, YC S26',
  description:
    'Founding engineer at Screenpipe (YC S26). OSS and contract work — 315+ merged PRs in TypeScript, Rust, and platform tooling.',
  siteName: SITE_NAME,
  url: SITE_URL,
} as const;

type OgMetadataOptions = {
  title?: string;
  description?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  imagePath?: string;
};

export function createOgMetadata(options: OgMetadataOptions = {}): Metadata {
  const title = options.title ?? DEFAULT_OG.title;
  const description = options.description ?? DEFAULT_OG.description;
  const url = options.url ?? DEFAULT_OG.url;
  const imagePath = options.imagePath ?? OG_IMAGE_PATH;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: options.type ?? 'website',
      url,
      siteName: DEFAULT_OG.siteName,
      locale: 'en_US',
      ...(options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
      ...(options.authors ? { authors: options.authors } : {}),
      ...(options.tags ? { tags: options.tags } : {}),
      images: [
        {
          url: imagePath,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imagePath],
    },
  };
}
