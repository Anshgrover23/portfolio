import type { Metadata } from 'next';
import { Chatbot } from '@/components/Chatbot';
import { SHOW_FLOATING_CHROME } from '@/lib/featureFlags';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Software engineer at River AI (YC F26), previously founding engineer at Screenpipe (YC S26), plus contract and open source work at CX Linux, Antiwork, TSCircuit, and others.',
};

export default function ProjectsLayout({
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
