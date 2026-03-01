'use client';

import { Trophy, UserRoundSearch } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export const About = () => {
  return (
    <section id="about" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
        <UserRoundSearch className="h-8 w-8 text-accent" />
        About Me
      </h2>
      <div className="space-y-6">
        <div className="text-gray-300 leading-relaxed">
          <div>
            I'm <strong className="text-white">Ansh Grover</strong>, a{' '}
            <strong className="text-white">Software Engineer</strong> with{' '}
            <strong className="text-white">2+ years</strong> of professional
            experience. I specialize in{' '}
            <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-0 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5 h-[1.5em] align-middle font-semibold text-sm leading-none">
              <Image
                src="/svg-icons/typescript.svg"
                alt="TypeScript"
                width={14}
                height={14}
                className="w-3.5 h-3.5 flex-shrink-0"
              />
              <span className="font-semibold">TypeScript</span>
            </Badge>
            , testing infrastructure, and developer experience. Currently, I'm
            shipping across{' '}
            <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-0 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5 h-[1.5em] align-middle font-semibold text-sm leading-none">
              <Image
                src="/svg-icons/nextjs.svg"
                alt="Next.js"
                width={14}
                height={14}
                className="w-3.5 h-3.5 flex-shrink-0"
              />
              <span className="font-semibold">Next.js</span>
            </Badge>
            ,{' '}
            <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-0 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5 h-[1.5em] align-middle font-semibold text-sm leading-none">
              <Image
                src="/svg-icons/rust.svg"
                alt="Rust"
                width={14}
                height={14}
                className="w-3.5 h-3.5 flex-shrink-0"
              />
              <span className="font-semibold">Rust</span>
            </Badge>
            , and{' '}
            <Badge className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-0 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5 h-[1.5em] align-middle font-semibold text-sm leading-none">
              <Image
                src="/svg-icons/ruby.svg"
                alt="Ruby"
                width={14}
                height={14}
                className="w-3.5 h-3.5 flex-shrink-0"
              />
              <span className="font-semibold">Ruby</span>
            </Badge>
            .
          </div>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-accent" />
            Key Achievements
          </h4>
          <ul className="text-gray-300 space-y-2">
            <li>
              <strong className="text-white">2+ years</strong> of software
              engineering experience, shipping production code.
            </li>
            <li>
              Created and led{' '}
              <a
                href="https://github.com/cxlinux-ai/cx-distro"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">CX Linux ISO Builder</strong>
              </a>{' '}
              at <strong className="text-white">CX Linux AI</strong>, an AI
              native Linux distro on Ubuntu and Debian with an embedded LLM.
            </li>
            <li>
              Contract Software Engineer at{' '}
              <strong className="text-white">Antiwork</strong>, recognized with{' '}
              <strong className="text-white">$40,000</strong> in compensation
              from{' '}
              <a
                href="https://flexile.com/"
                className="underline hover:text-accent transition-colors"
              >
                Flexile
              </a>{' '}
              for shipping major product features (work in private repos;
              compensation details available).
            </li>
            <li>
              Shipped the pricing page for{' '}
              <a
                href="https://binary.so"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">binary.so</strong>
              </a>{' '}
              as a Software Engineer.
            </li>
            <li>
              <strong className="text-white">297 PRs</strong> merged across open
              source projects.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
