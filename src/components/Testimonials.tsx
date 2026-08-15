'use client';

import { QuoteTestimonial } from './QuoteTestimonial';

export interface TestimonialItem {
  quote?: string;
  name?: string;
  title?: string;
  image?: string;
  text?: string;
  source?: 'twitter' | 'discord' | 'github' | 'other';
  sourceUrl?: string;
  username?: string;
}

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

export const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  return (
    <section
      className="mb-16 md:mb-20 section-rise section-rise-delayed"
      aria-labelledby="testimonials-heading"
    >
      <div className="mb-10 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          04
        </span>
        <div className="min-w-0 flex-1">
          <h2
            id="testimonials-heading"
            className="font-display flex items-baseline gap-3 text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Testimonials
          </h2>
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">
            What founders and engineers I&apos;ve worked with say — in their
            words, not mine.
          </p>
        </div>
      </div>
      <QuoteTestimonial items={testimonials} />
    </section>
  );
};
