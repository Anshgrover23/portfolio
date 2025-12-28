'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

export const Hero = () => {
  return (
    <section className="mb-12">
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white text-left tracking-tight">
            Hi, Ansh here
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Building open-source dev tools & automations{' '}
            <span className="text-red-500">📍</span>Rajasthan, India
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-400/40 px-4 py-2 text-sm font-medium text-white self-start">
              <span className=" relative inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping opacity-75" />
              Open to work
            </span>
            <div className="flex items-center gap-2">
              <a
                href="/ansh-resume.pdf"
                download
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-800/50 hover:bg-gray-700/70 rounded-full transition-all duration-300 hover:scale-105"
                aria-label="Download Resume"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
              <a
                href="https://www.linkedin.com/in/anshgrover23/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-sky-900 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-gray-300 hover:text-white" />
              </a>
              <a
                href="https://twitter.com/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-blue-900 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
        <Avatar className="w-20 h-20 md:w-28 md:h-28 border-2 border-border">
          <AvatarImage src="/avatar.png" alt="Ansh Grover" />
          <AvatarFallback className="text-2xl font-bold bg-muted text-foreground">
            AG
          </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};
