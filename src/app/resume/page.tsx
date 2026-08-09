import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ResumeActions, ResumePreview } from '@/components/ResumeViewer';

export default function ResumePage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(40 25% 94%), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, hsl(172 15% 94% / 0.5), transparent)',
        }}
      />

      <main className="mx-auto max-w-[880px] px-4 pb-10 pt-3 sm:px-6 sm:pt-4">
        <h1 className="sr-only">Resume</h1>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3 shrink-0" strokeWidth={1.5} />
            Home
          </Link>
          <ResumeActions />
        </div>

        <ResumePreview />
      </main>
    </div>
  );
}
