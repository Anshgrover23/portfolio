import { Chatbot } from '@/components/Chatbot';
import { SHOW_FLOATING_CHROME } from '@/lib/featureFlags';
import { createOgMetadata } from '@/lib/og';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog - Thoughts & Learnings',
  description:
    'Thoughts on open source, developer tools, and lessons learned from contributing to projects like TSCircuit and Antiwork.',
  authors: [{ name: 'Ansh Grover', url: SITE_URL }],
  alternates: {
    canonical: '/blog',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  ...createOgMetadata({
    title: 'Blog — Thoughts & Learnings',
    description:
      'Thoughts on open source, developer tools, and lessons learned from contributing to projects like TSCircuit and Antiwork.',
    url: '/blog',
    imagePath: '/blog/opengraph-image',
  }),
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {SHOW_FLOATING_CHROME && <Chatbot />}
    </>
  );
}
