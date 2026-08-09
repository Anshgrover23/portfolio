import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume for Ansh Grover — founding engineer, TypeScript, Rust, and open source.',
  openGraph: {
    title: 'Resume · Ansh Grover',
    description:
      'One-page resume — Screenpipe, CX Linux, Antiwork, TSCircuit, and open source.',
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
