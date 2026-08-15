import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Ansh Grover',
    default: 'Projects',
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
