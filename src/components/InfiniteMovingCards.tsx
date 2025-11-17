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
        'scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
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
        {items.map((item, idx) => (
          <li
            className="w-[380px] max-w-full relative rounded-2xl border border-gray-800 bg-gray-900/50 px-8 py-6 md:w-[520px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(17, 24, 39, 0.4) 100%)',
            }}
            key={`item-${idx}`}
          >
            <blockquote>
              {item.image && (
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name || 'Testimonial'}
                    className="h-12 w-12 rounded-full object-cover border-2 border-accent/50"
                  />
                  {item.name && (
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">
                        {item.name}
                      </div>
                      {item.title && (
                        <div className="text-xs text-gray-400">
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
              {/* Source badge */}
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
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    View original
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
