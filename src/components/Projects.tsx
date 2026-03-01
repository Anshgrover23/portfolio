'use client';

import { ExternalLink, FolderGit2, Play } from 'lucide-react';

const projects = [
  {
    id: 'cx-distro',
    title: 'CX Linux ISO Builder',
    tagline:
      'AI-native Linux distribution. Ubuntu/Debian base with embedded LLM. Download the AI Linux OS.',
    description:
      'Created and initialized the full distro project: reproducible ISO builds, live boot + full installer mode, Debian packaging, branding, and supply-chain tooling (SBOM, signed artifacts).',
    repo: 'https://github.com/cxlinux-ai/cx-distro',
    org: 'cxlinux-ai',
    tech: ['Shell', 'Debian', 'live-build', 'ISO', 'Rust'],
    videoNativeUrl:
      '/videos/WhatsApp%20Video%202026-02-05%20at%207.11.25%20PM.mp4',
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="mb-16 scroll-mt-24">
      <h2 className="text-3xl font-bold mb-6 md:mb-8 text-white flex items-center gap-3">
        <FolderGit2 className="h-7 w-7 md:h-8 md:w-8 text-accent" />
        Projects
      </h2>
      <div className="space-y-8">
        {projects.map(project => (
          <article
            key={project.id}
            className="rounded-xl bg-gray-900/50 border border-gray-700/50 overflow-hidden hover:bg-gray-900/70 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="relative aspect-video w-full bg-gray-900/80 flex items-center justify-center min-h-[200px] overflow-hidden rounded-t-xl">
              {project.videoNativeUrl ? (
                <video
                  src={project.videoNativeUrl}
                  controls
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-contain"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-gray-500 px-4">
                  <div className="rounded-full bg-gray-800 p-4">
                    <Play className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-sm text-center max-w-xs">
                    Demo video placeholder — add your CX Linux distro video URL
                    in the Projects component.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-cyan-400/90 text-sm mt-0.5">
                    {project.tagline}
                  </p>
                </div>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
                >
                  View repo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-400 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
