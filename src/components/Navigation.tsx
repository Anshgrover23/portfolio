'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import type React from 'react';

import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  SquarePen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      if (pathname !== '/') {
        router.push('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      router.push(href);
    }

    setIsOpen(false);
  };

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Experience', href: '#experience' },
    { icon: GraduationCap, label: 'Education', href: '#education' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: SquarePen, label: 'Blog', href: '/blog' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  useLayoutEffect(() => {
    if (hoveredIndex !== null && navRefs.current[hoveredIndex]) {
      const el = navRefs.current[hoveredIndex];
      const parent = el?.parentElement;
      if (el && parent) {
        const elRect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        setHighlightStyle({
          left: elRect.left - parentRect.left,
          width: elRect.width,
          opacity: 1,
        });
      }
    } else {
      setHighlightStyle({ left: 0, width: 0, opacity: 0 });
    }
  }, [hoveredIndex]);

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-gray-900/80 backdrop-blur-md rounded-full px-3 py-1.5 border border-gray-700 relative">
          <div className="flex items-center gap-4 relative">
            <div
              className="absolute top-0 h-full bg-white/10 rounded-full transition-all duration-300 ease-out"
              style={{
                left: highlightStyle.left,
                width: highlightStyle.width,
                opacity: highlightStyle.opacity,
                pointerEvents: 'none',
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  ref={el => {
                    navRefs.current[index] = el;
                  }}
                  onClick={e => handleNavClick(e, item.href)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 relative z-10 px-2 py-1 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'md:hidden fixed top-4 right-4 mt-6 z-50',
          'w-12 h-12 flex items-center justify-center',
          'bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700',
          'text-gray-300 hover:text-white hover:bg-gray-800/90',
          'transition-all duration-300 active:scale-95'
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="relative w-[18px] h-[14px] flex flex-col justify-between">
          <span
            className={cn(
              'absolute left-0 right-0 h-[2px] bg-current rounded-full transition-all duration-300 ease-out origin-center',
              isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 rotate-0'
            )}
          />
          <span
            className={cn(
              'absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-current rounded-full transition-all duration-300 ease-out',
              isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            )}
          />
          <span
            className={cn(
              'absolute left-0 right-0 h-[2px] bg-current rounded-full transition-all duration-300 ease-out origin-center',
              isOpen
                ? 'top-1/2 -translate-y-1/2 -rotate-45'
                : 'bottom-0 rotate-0'
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 transition-all duration-300',
          isOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={cn(
            'fixed top-0 right-0 h-full w-72 bg-gray-900/95 backdrop-blur-md shadow-2xl',
            'transition-transform duration-300 ease-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="h-20" />

            <div className="flex-1 px-6">
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      onClick={e => handleNavClick(e, item.href)}
                      className={cn(
                        'flex items-center gap-4 text-gray-300 hover:text-white',
                        'py-4 px-3 rounded-lg',
                        'hover:bg-white/5 active:bg-white/10',
                        'transition-all duration-200 cursor-pointer',
                        'border-b border-gray-700/50 last:border-b-0'
                      )}
                      style={{
                        transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen
                          ? 'translateX(0)'
                          : 'translateX(20px)',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
