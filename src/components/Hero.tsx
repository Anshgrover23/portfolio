'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mb-12 pt-5 sm:pt-6 md:pt-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
        <div className="flex-shrink-0 md:order-2">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-white/20 mx-auto md:mx-0">
            <AvatarImage src="/avatar.png" alt="Ansh Grover" />
            <AvatarFallback className="text-2xl font-bold bg-muted text-foreground">
              AG
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0 md:pr-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-3 text-white text-left tracking-tight leading-tight">
            Hi I'm Ansh
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-400 mb-6">
            21, Open Source Engineer
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {mounted ? (
              <a
                href="/ansh-resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Download Resume"
              >
                <FileText className="w-4 h-4" />
                Resume / CV
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg opacity-90"
                aria-label="Download Resume"
              >
                <FileText className="w-4 h-4" />
                Resume / CV
              </span>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Get in touch
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 animate-ping opacity-75" />
              </span>
              Open to work
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
