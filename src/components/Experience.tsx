'use client';
import { useState } from 'react';
import { CompanyModal } from './CompanyModal';
import Image from 'next/image';
import { experiences } from '@/data/experiences';

export const Experience = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const companyData = {
    antiwork: {
      name: 'antiwork',
      logo: '🛠️',
      contributions: experiences[0].contributions,
    },
    TSCircuit: {
      name: 'TSCircuit',
      logo: '🔌',
      contributions: experiences[1].contributions,
    },
    'Mediar-AI': {
      name: 'Mediar-AI',
      logo: '🤖',
      contributions: experiences[2].contributions,
    },
    'Sugar Labs': {
      name: 'Sugar Labs',
      logo: '🍬',
      contributions: experiences[3].contributions,
    },
    TwentyHQ: {
      name: 'TwentyHQ',
      logo: '📊',
      contributions: experiences[4].contributions,
    },
    'Algora.io': {
      name: 'Algora.io',
      logo: '💰',
      contributions: experiences[5].contributions,
    },
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Cool places I've contributed to
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer relative ${exp.company === 'antiwork' ? 'border-2 border-purple-500 shadow-[0_0_16px_4px_rgba(168,85,247,0.5)]' : ''}`}
            onClick={() => setSelectedCompany(exp.company)}
          >
            <div className="text-3xl">
              {typeof exp.logo === 'string' && exp.logo.endsWith('.svg') ? (
                <Image
                  src={`/${exp.logo}`}
                  alt={`${exp.company} logo`}
                  className="rounded-full object-contain inline-block align-middle"
                  height={32}
                  width={32}
                />
              ) : (
                exp.logo
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-white hover:text-purple-400 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  {exp.company}
                </a>
                <span className="text-gray-400 text-sm">{exp.period}</span>
              </div>
              <p className="text-purple-400 mb-2">{exp.role}</p>
              <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
              {exp.headline && (
                <p className="text-white text-sm font-semibold mb-4">
                  {exp.headline}
                </p>
              )}
              <div className="flex flex-col items-start gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold text-sm sm:text-sm">
                    PRs Merged:
                  </span>
                  <span className="text-white text-sm sm:text-sm font-medium">
                    {exp.totalPRs}
                  </span>
                </div>
                {exp.totalBounties && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-semibold text-sm sm:text-sm">
                      Bounties Earned:
                    </span>
                    <span className="text-white text-sm sm:text-sm font-medium">
                      {exp.totalBounties}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-blue-400 text-sm mt-2">
                Click to view featured contributions →
              </p>
              {/* Language badges bottom right (responsive) */}
              {exp.company === 'antiwork' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <Image
                      src="/svg-icons/typescript.svg"
                      alt="typescript-svg"
                      width={15}
                      height={15}
                    />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-zinc-400/30 shadow-lg text-zinc-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-zinc-700/30">
                    <Image
                      src="/svg-icons/nextjs.svg"
                      alt="nextjs-svg"
                      width={15}
                      height={15}
                      className="invert"
                    />
                    Next.js
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-rose-400/30 shadow-lg text-rose-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-rose-700/30">
                    <Image
                      src="/svg-icons/ruby.svg"
                      alt="ruby-svg"
                      width={15}
                      height={15}
                    />
                    Ruby
                  </span>
                </div>
              )}
              {exp.company === 'TSCircuit' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <Image
                      src="/svg-icons/typescript.svg"
                      alt="typescript-svg"
                      width={15}
                      height={15}
                    />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-cyan-400/30 shadow-lg text-cyan-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-cyan-700/30">
                    <Image
                      src="/svg-icons/reactjs.svg"
                      alt="reactjs-svg"
                      width={15}
                      height={15}
                    />
                    React.js
                  </span>
                </div>
              )}
              {exp.company === 'Mediar-AI' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-orange-400/30 shadow-lg text-orange-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-orange-700/30">
                    <Image
                      src="/svg-icons/rust.svg"
                      alt="rust-svg"
                      width={15}
                      height={15}
                    />
                    Rust
                  </span>
                </div>
              )}
              {exp.company === 'Sugar Labs' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <Image
                      src="/svg-icons/typescript.svg"
                      alt="typescript-svg"
                      width={15}
                      height={15}
                    />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-cyan-400/30 shadow-lg text-cyan-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-cyan-700/30">
                    <Image
                      src="/svg-icons/reactjs.svg"
                      alt="reactjs-svg"
                      width={15}
                      height={15}
                    />
                    React.js
                  </span>
                </div>
              )}
              {exp.company === 'TwentyHQ' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <Image
                      src="/svg-icons/typescript.svg"
                      alt="typescript-svg"
                      width={15}
                      height={15}
                    />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-zinc-400/30 shadow-lg text-zinc-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-zinc-700/30">
                    <Image
                      src="/svg-icons/nextjs.svg"
                      alt="nextjs-svg"
                      width={15}
                      height={15}
                      className="invert"
                    />
                    Next.js
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <CompanyModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={companyData[selectedCompany as keyof typeof companyData]}
        />
      )}
    </section>
  );
};
