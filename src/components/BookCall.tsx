'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

const CAL_LINK = 'anshgrover/meeting';
const CAL_NAMESPACE = 'meeting';

export const BookCall = () => {
  const [calendarError, setCalendarError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (!active) return;
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#2b2520' },
          dark: { 'cal-brand': '#fafafa' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })().catch(() => {
      if (active) setCalendarError(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mb-16" aria-labelledby="contact-heading">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          08
        </span>
        <h2
          id="contact-heading"
          className="font-display text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
        >
          Let&apos;s talk.
        </h2>
      </div>

      <div className="border-t border-line/80 pt-6">
        <p className="text-xl font-medium tracking-tight sm:text-2xl">
          Tell me what you are shipping.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Founders · Engineers · HRs
        </p>
        <a
          href="mailto:anshgrover938@gmail.com"
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-accent"
        >
          <Mail aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          anshgrover938@gmail.com
        </a>

        <div
          className="mt-7 overflow-hidden rounded-xl border border-line bg-card p-2 sm:p-3"
          aria-label="Book a call with Ansh"
        >
          {calendarError ? (
            <p role="status" className="p-6 text-sm text-muted-foreground">
              The calendar could not load. Use the booking link below to choose
              a time.
            </p>
          ) : (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              className="cal-embed min-h-[420px] w-full"
              style={{ width: '100%' }}
              config={{
                layout: 'month_view',
                useSlotsViewOnSmallScreen: 'true',
                theme: 'light',
              }}
            />
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Based in India. Times shown in your timezone.</span>
          <a
            href="https://cal.com/anshgrover/meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
          >
            Open booking page{' '}
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
