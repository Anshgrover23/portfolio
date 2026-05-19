'use client';

import { Button } from '@/components/ui/button';
import { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const BookCall = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'meeting' });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section className="mb-16" aria-labelledby="contact-heading">
      <div className="mb-10 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          07
        </span>
        <h2
          id="contact-heading"
          className="font-display flex items-baseline gap-3 text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Open to the{' '}
          <span
            className="font-light italic text-foreground/80"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
          >
            right
          </span>{' '}
          work
          <span className="block h-px flex-1 self-center bg-foreground/15" />
        </h2>
      </div>

      <div className="grid gap-8 border-t border-line/80 pt-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12">
        <div className="min-w-0 space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            I am at{' '}
            <a
              href="https://screenpi.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Screenpipe
            </a>{' '}
            full time (YC S26). I still take selective consulting and will talk
            to strong teams about full-time roles.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Thirty minutes is enough. I read every note you leave on the
            booking, so be specific about what you are trying to ship.
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line/80 pt-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-meta text-muted-foreground">
                Response time
              </dt>
              <dd className="mt-1 font-display text-base font-semibold tracking-tight text-foreground">
                under 24h
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-meta text-muted-foreground">
                Time zone
              </dt>
              <dd className="mt-1 font-display text-base font-semibold tracking-tight text-foreground">
                IST · UTC+5:30
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-meta text-muted-foreground">
                Best for
              </dt>
              <dd className="mt-1 text-sm leading-snug text-foreground">
                Founding eng, contract, OSS-shaped work
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-meta text-muted-foreground">
                Stack
              </dt>
              <dd className="mt-1 text-sm leading-snug text-foreground">
                TypeScript, Rust, Ruby, Next.js
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-line bg-card/70 p-6 md:p-7">
          <p className="type-meta text-muted-foreground/70">Book a 30 minute call</p>
          <p className="font-display text-xl font-semibold leading-tight tracking-display-tight text-foreground">
            Tell me what you are shipping.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Founders | Engineers | HRs
          </p>
          <Button
            data-cal-namespace="meeting"
            data-cal-link="anshgrover/meeting"
            data-cal-config='{"layout":"month_view"}'
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-line bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_1px_2px_rgba(47,52,55,0.06)] transition hover:opacity-95 active:scale-[0.98]"
          >
            Pick a time
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Button>
          <div className="mt-2 border-t border-line/80 pt-3 font-mono text-[11px] text-muted-foreground">
            Prefer email?{' '}
            <a
              href="mailto:anshgrover938@gmail.com"
              className="text-foreground underline-offset-4 hover:underline"
            >
              anshgrover938@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
