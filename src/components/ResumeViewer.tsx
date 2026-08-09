'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const RESUME_PDF = '/ansh-resume.pdf';
const RESUME_PREVIEW = '/ansh-resume-preview.png';
const RESUME_FILENAME = 'Ansh-Grover-Resume.pdf';

export function ResumeActions({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex shrink-0 flex-wrap items-center gap-2', className)}
    >
      <a
        href={RESUME_PDF}
        download={RESUME_FILENAME}
        className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-[transform,background-color,color,border-color] hover:-translate-y-px hover:border-foreground hover:bg-background hover:text-foreground active:translate-y-0 active:scale-[0.98] sm:px-3.5 sm:text-sm"
      >
        <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Download
      </a>
      <a
        href={RESUME_PDF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-line/90 bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-[transform,background-color,border-color] hover:-translate-y-px hover:border-foreground/30 hover:bg-muted active:translate-y-0 active:scale-[0.98] sm:px-3.5 sm:text-sm"
      >
        <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Open
      </a>
    </div>
  );
}

export function ResumePreview() {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="mx-auto w-full">
      <div
        className={cn(
          'relative overflow-hidden rounded-sm border border-line/70 bg-background',
          'shadow-[0_1px_0_rgba(47,52,55,0.04),0_18px_50px_-28px_rgba(47,52,55,0.35)]'
        )}
      >
        {!loaded && (
          <div
            className="absolute inset-0 z-[1] animate-pulse bg-canvas-muted"
            aria-hidden
          />
        )}
        <Image
          src={RESUME_PREVIEW}
          alt="Ansh Grover resume — one page PDF preview"
          width={1600}
          height={2070}
          priority
          sizes="(max-width: 880px) 100vw, 880px"
          className={cn(
            'h-auto w-full transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </figure>
  );
}

/** Compound export for page usage */
export const ResumeViewer = {
  Actions: ResumeActions,
  Preview: ResumePreview,
};
