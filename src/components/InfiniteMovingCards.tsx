'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Twitter, MessageCircle, Github, ExternalLink } from 'lucide-react';

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

/** Only link to a primary source (PR/issue/thread). Never fall back to profile URLs — those hide the testimonial context. */
function getTestimonialHref(item: TestimonialItem): string | undefined {
  return item.sourceUrl?.trim() || undefined;
}

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: TestimonialItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animation: start
            ? `scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite`
            : 'none',
        }}
      >
        {items.map((item, idx) => {
          const href = getTestimonialHref(item);
          const cardStyle = {
            background:
              'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(17, 24, 39, 0.4) 100%)',
          } as const;
          const cardShellClass =
            'relative rounded-2xl border border-gray-800 bg-gray-900/50 px-5 py-5 sm:px-8 sm:py-6 h-full block text-left no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950';
          const cardHoverClass = href
            ? 'hover:border-accent/50 hover:bg-gray-900/70 cursor-pointer'
            : '';

          const body = (
            <>
              {item.image && (
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover border-2 border-accent/50 pointer-events-none"
                  />
                  {item.name && (
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white break-words">
                        {item.name}
                      </div>
                      {item.title && (
                        <div className="text-xs text-gray-400 break-words">
                          {item.title}
                        </div>
                      )}
                      {item.username && (
                        <div className="text-xs text-gray-500">
                          @{item.username}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {item.quote && (
                <span className="relative z-20 text-sm leading-[1.6] text-gray-300 font-normal block mb-4">
                  {item.quote}
                </span>
              )}
              {item.text && (
                <span className="relative z-20 text-sm leading-[1.6] text-gray-300 font-normal block mb-4">
                  {item.text}
                </span>
              )}
              {!item.image && item.name && (
                <div className="relative z-20 mt-6 flex flex-row items-center justify-between">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-white font-normal">
                      {item.name}
                    </span>
                    {item.title && (
                      <span className="text-xs leading-[1.6] text-gray-400 font-normal">
                        {item.title}
                      </span>
                    )}
                    {item.username && (
                      <span className="text-xs leading-[1.6] text-gray-500 font-normal">
                        @{item.username}
                      </span>
                    )}
                  </span>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.source === 'twitter' && (
                    <>
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Twitter</span>
                    </>
                  )}
                  {item.source === 'discord' && (
                    <>
                      <MessageCircle className="h-4 w-4 text-indigo-400" />
                      <span className="text-xs text-gray-400">Discord</span>
                    </>
                  )}
                  {item.source === 'github' && (
                    <>
                      <Github className="h-4 w-4 text-gray-300" />
                      <span className="text-xs text-gray-400">GitHub</span>
                    </>
                  )}
                </div>
                {href && (
                  <span className="flex items-center gap-1 text-xs text-accent shrink-0">
                    View original
                    <ExternalLink className="h-3 w-3" />
                  </span>
                )}
              </div>
            </>
          );

          return (
            <li
              className="shrink-0 w-[min(22rem,calc(100vw-2.5rem))] sm:w-[380px] md:w-[520px]"
              key={`item-${idx}`}
            >
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={cardStyle}
                  className={`${cardShellClass} ${cardHoverClass}`}
                  aria-label={
                    item.name
                      ? `Open testimonial source for ${item.name}`
                      : 'Open testimonial source'
                  }
                >
                  <blockquote className="m-0">{body}</blockquote>
                </a>
              ) : (
                <div
                  style={cardStyle}
                  className={`${cardShellClass} ${cardHoverClass}`}
                >
                  <blockquote className="m-0">{body}</blockquote>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
