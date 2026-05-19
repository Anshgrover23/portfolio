import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/provider/providers';
import { PreloadAvatar } from '@/components/PreloadAvatar';
import { SiteNav } from '@/components/SiteNav';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://anshgrover.me'),
  title: {
    default: 'Ansh Grover — founding engineer, YC S26',
    template: '%s · Ansh Grover',
  },
  description:
    'Founding engineer at Screenpipe (YC S26). 2.5+ years in TypeScript and Rust — product, OSS bounties, and contract work across Antiwork, TSCircuit, and others.',
  authors: [{ name: 'Ansh Grover', url: 'https://anshgrover.me/' }],
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
    url: 'https://anshgrover.me/',
    images: [
      {
        url: '/avatar.jpeg',
        width: 800,
        height: 600,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
