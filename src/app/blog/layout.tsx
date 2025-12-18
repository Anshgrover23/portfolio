import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ansh Grover — Blog',
  description:
    'Thoughts on open source, developer tools, and lessons learned from contributing to projects like TSCircuit and Antiwork.',
  authors: [{ name: 'Ansh Grover', url: 'https://anshgrover.me/' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
