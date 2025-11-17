'use client';

import { InfiniteMovingCards } from './InfiniteMovingCards';
import { MessageSquare } from 'lucide-react';

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
    <section id="testimonials" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-accent" />
        Testimonials
      </h2>
      <div className="rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};
