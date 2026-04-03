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
              Got accepted into{' '}
              <a
                href="https://x.com/Anshgrover23/status/2034579124673814875"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">
                  Y Combinator Startup School
                </strong>
              </a>{' '}
              (India cohort).
            </li>
            <li>
              Won <strong className="text-white">Top 20</strong> in the PR
              category at the Automate Me If You Can Hackathon ($3000 prize
              pool) organized by Accomplish AI and WeMakeDevs —{' '}
              <a
                href="https://drive.google.com/file/d/1idAPCUDdt-lrYPx-Imf3_VaA9164ev6R/view"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                hackathon certificate
              </a>
              .
            </li>
            <li>
              Participated in the{' '}
              <strong className="text-white">
                European Summer of Code 2026
              </strong>
              , contributing to the{' '}
              <a
                href="https://github.com/conda/rattler"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">Rattler</strong>
              </a>{' '}
              repository.
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
              Won around <strong className="text-white">$40,000 USD</strong>{' '}
              from open source bounties; contributed to{' '}
              <strong className="text-white">8+</strong> open source
              organizations, mainly{' '}
              <a
                href="https://github.com/antiwork"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">Antiwork</strong>
              </a>
              ,{' '}
              <a
                href="https://tscircuit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">TSCircuit</strong>
              </a>
              ,{' '}
              <a
                href="https://github.com/mediar-ai/screenpipe"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition-colors"
              >
                <strong className="text-white">Screenpipe</strong>
              </a>
              , and others.
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
