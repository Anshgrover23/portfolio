'use client';
import { useState } from 'react';
import { CompanyModal } from './CompanyModal';
import Image from 'next/image';
import { experiences } from '@/data/experiences';

export const Experience = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const getExp = (company: string) =>
    experiences.find(e => e.company === company)!;
  const companyData = {
    'CX Linux AI': {
      name: 'CX Linux AI',
      logo: getExp('CX Linux AI').logo,
      contributions: getExp('CX Linux AI').contributions,
    },
    Antiwork: {
      name: 'Antiwork',
      logo: getExp('Antiwork').logo,
      contributions: getExp('Antiwork').contributions,
      reposPrivate: getExp('Antiwork').reposPrivate,
      compensationDetailsImage: getExp('Antiwork').compensationDetailsImage,
    },
    TSCircuit: {
      name: 'TSCircuit',
      logo: getExp('TSCircuit').logo,
      contributions: getExp('TSCircuit').contributions,
    },
    'Mediar-AI': {
      name: 'Mediar-AI',
      logo: getExp('Mediar-AI').logo,
      contributions: getExp('Mediar-AI').contributions,
    },
    Archestra: {
      name: 'Archestra',
      logo: getExp('Archestra').logo,
      contributions: getExp('Archestra').contributions,
    },
    'Sugar Labs': {
      name: 'Sugar Labs',
      logo: getExp('Sugar Labs').logo,
      contributions: getExp('Sugar Labs').contributions,
    },
    TwentyHQ: {
      name: 'TwentyHQ',
      logo: getExp('TwentyHQ').logo,
      contributions: getExp('TwentyHQ').contributions,
    },
    'Algora.io': {
      name: 'Algora.io',
      logo: getExp('Algora.io').logo,
      contributions: getExp('Algora.io').contributions,
    },
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Organizations I've worked with
      </h2>
      <div className="space-y-4 md:space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer relative"
            onClick={() => setSelectedCompany(exp.company)}
          >
            <div className="text-2xl md:text-3xl flex-shrink-0">
              {typeof exp.logo === 'string' &&
              (exp.logo.startsWith('http') ||
                exp.logo.endsWith('.svg') ||
                exp.logo.endsWith('.png')) ? (
                <Image
                  src={exp.logo.startsWith('http') ? exp.logo : `/${exp.logo}`}
                  alt={`${exp.company} logo`}
                  className="rounded-full object-contain inline-block align-middle"
                  height={32}
                  width={32}
                />
              ) : (
                exp.logo
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
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
              {exp.description && (
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                  {exp.description}
                </p>
              )}
              {exp.headline && (
                <p className="text-white text-sm font-semibold mb-4">
                  {exp.headline}
                </p>
              )}
              <div className="flex flex-col items-start gap-2 md:gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold text-sm">
                    PRs Merged:
                  </span>
                  <span className="text-white text-sm font-medium">
                    {exp.totalPRs}
                  </span>
                </div>
                {exp.totalBounties && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-semibold text-sm">
                      Bounties Earned:
                    </span>
                    <span className="text-white text-sm font-medium">
                      {exp.totalBounties}
                    </span>
                  </div>
                )}
                {'reposPrivate' in exp && exp.reposPrivate && (
                  <p className="text-gray-400 text-xs mt-1">
                    Repos now private · Compensation details available
                  </p>
                )}
              </div>
              <p className="text-blue-400 text-sm mt-2">
                Click to view featured contributions →
              </p>
              {/* Language badges bottom right (responsive) */}
              {exp.company === 'CX Linux AI' && (
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-amber-400/30 shadow-lg text-amber-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-amber-700/30">
                    Shell
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-orange-400/30 shadow-lg text-orange-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-orange-700/30">
                    <Image
                      src="/svg-icons/rust.svg"
                      alt="rust-svg"
                      width={15}
                      height={15}
                    />
                    Rust
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    Python
                  </span>
                </div>
              )}
              {exp.company === 'Antiwork' && (
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
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
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
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
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-orange-400/30 shadow-lg text-orange-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-orange-700/30">
                    <Image
                      src="/svg-icons/rust.svg"
                      alt="rust-svg"
                      width={15}
                      height={15}
                    />
                    Rust
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-yellow-400/30 shadow-lg text-yellow-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-yellow-700/30">
                    <Image
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                      alt="python-svg"
                      width={15}
                      height={15}
                    />
                    Python
                  </span>
                </div>
              )}
              {exp.company === 'Archestra' && (
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-purple-400/30 shadow-lg text-purple-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-purple-700/30">
                    <Image
                      src="/svg-icons/terraform.svg"
                      alt="terraform-svg"
                      width={15}
                      height={15}
                    />
                    Terraform
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-cyan-400/30 shadow-lg text-cyan-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-cyan-700/30">
                    <Image
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
                      alt="golang-svg"
                      width={15}
                      height={15}
                    />
                    Go
                  </span>
                </div>
              )}
              {exp.company === 'Sugar Labs' && (
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
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
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
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
