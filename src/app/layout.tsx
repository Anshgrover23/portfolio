import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/provider/providers';
import { PreloadAvatar } from '@/components/PreloadAvatar';
import { SiteNav } from '@/components/SiteNav';
import { JsonLd } from '@/components/JsonLd';
import { fontVariables } from '@/lib/fonts';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ansh Grover — founding engineer, YC S26',
    template: '%s · Ansh Grover',
  },
  description:
    'Founding engineer at Screenpipe (YC S26). 2.5+ years in TypeScript and Rust — product, OSS bounties, and contract work across Antiwork, TSCircuit, and others.',
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
  openGraph: {
    title: 'Ansh Grover — founding engineer, YC S26',
    description:
      'Founding engineer at Screenpipe (YC S26). OSS and contract work — 315+ merged PRs in TypeScript, Rust, and platform tooling.',
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: '/avatar.jpeg',
        width: 800,
        height: 600,
        alt: 'Ansh Grover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansh Grover — software engineer & open source',
    description:
      'Software engineer and open source contributor. Contracts, bounties, and distro/platform work.',
    images: ['/avatar.jpeg'],
  },
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
