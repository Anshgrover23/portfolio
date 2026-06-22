import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/provider/providers';
import { PreloadAvatar } from '@/components/PreloadAvatar';
import { SiteNav } from '@/components/SiteNav';
import { JsonLd } from '@/components/JsonLd';
import { fontVariables } from '@/lib/fonts';
import { createOgMetadata, DEFAULT_OG } from '@/lib/og';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_OG.title,
    template: '%s · Ansh Grover',
  },
  description: DEFAULT_OG.description,
  authors: [{ name: 'Ansh Grover', url: SITE_URL }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  ...createOgMetadata(),
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Founding engineer at Screenpipe (YC S26). Software engineer and open source contributor.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: 'Founding Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Screenpipe',
    },
    sameAs: [
      'https://github.com/Anshgrover23',
      'https://www.linkedin.com/in/anshgrover23/',
      'https://x.com/Anshgrover23',
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={structuredData} />
      </head>
      <body
        className={`${fontVariables} paper-grain font-sans antialiased bg-background text-foreground`}
      >
        <PreloadAvatar />
        <SiteNav />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
