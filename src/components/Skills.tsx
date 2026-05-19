'use client';

import Image from 'next/image';
import {
  Database,
  FlaskConical,
  Link,
  MonitorSmartphone,
  RefreshCw,
  Route,
  ServerCog,
  Shield,
  Terminal,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

type SkillIcon =
  | { type: 'svg'; src: string }
  | { type: 'lucide'; icon: LucideIcon };

type Skill = {
  name: string;
  icon: SkillIcon;
};

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: MonitorSmartphone,
    skills: [
      {
        name: 'Next.js',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        },
      },
      {
        name: 'JavaScript',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        },
      },
      {
        name: 'React.js',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        },
      },
      {
        name: 'TailwindCSS',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        },
      },
    ],
  },
  {
    title: 'Backend',
    icon: ServerCog,
    skills: [
      {
        name: 'TypeScript',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        },
      },
      {
        name: 'Ruby',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
        },
      },
      {
        name: 'Rust',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
        },
      },
      {
        name: 'Go',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
        },
      },
      {
        name: 'Python',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        },
      },
      {
        name: 'Node.js',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        },
      },
      { name: 'Express.js', icon: { type: 'lucide', icon: Route } },
      {
        name: 'tRPC',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg',
        },
      },
      { name: 'Zod', icon: { type: 'lucide', icon: Shield } },
      { name: 'REST APIs', icon: { type: 'lucide', icon: Link } },
      {
        name: 'GraphQL',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
        },
      },
    ],
  },
  {
    title: 'Databases & ORMs',
    icon: Database,
    skills: [
      {
        name: 'PostgreSQL',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        },
      },
      {
        name: 'MongoDB',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
        },
      },
      { name: 'Drizzle ORM', icon: { type: 'lucide', icon: Database } },
      {
        name: 'Prisma',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
        },
      },
    ],
  },
  {
    title: 'Testing & DevOps',
    icon: FlaskConical,
    skills: [
      {
        name: 'Playwright',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg',
        },
      },
      { name: 'E2E Testing', icon: { type: 'lucide', icon: RefreshCw } },
      {
        name: 'Docker',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        },
      },
      {
        name: 'GitHub Actions',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
        },
      },
      {
        name: 'Homebrew',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/homebrew/homebrew-original.svg',
        },
      },
    ],
  },
  {
    title: 'Infrastructure',
    icon: Terminal,
    skills: [
      {
        name: 'Shell',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
        },
      },
      {
        name: 'Linux',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
        },
      },
      {
        name: 'Debian',
        icon: {
          type: 'svg',
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg',
        },
      },
      { name: 'Make', icon: { type: 'lucide', icon: Wrench } },
    ],
  },
];

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line/80 bg-card px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground/85 transition-colors hover:border-foreground/30 hover:bg-canvas-muted">
      {skill.icon.type === 'svg' ? (
        <Image
          src={skill.icon.src}
          alt=""
          width={14}
          height={14}
          className={`h-3.5 w-3.5 ${skill.name === 'Next.js' ? 'invert' : ''}`}
        />
      ) : (
        <skill.icon.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      )}
      {skill.name}
    </span>
  );
}

export const Skills = () => {
  return (
    <section
      className="mb-16 md:mb-20"
      aria-labelledby="skills-heading"
    >
      <div className="mb-10 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          06
        </span>
        <h2
          id="skills-heading"
          className="font-display flex items-baseline gap-3 text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Stack
          <span className="block h-px flex-1 self-center bg-foreground/15" />
        </h2>
      </div>

      <div className="border-t border-foreground/15">
        {SKILL_CATEGORIES.map((category, idx) => {
          const CategoryIcon = category.icon;
          return (
            <div
              key={category.title}
              className="grid gap-3 border-b border-foreground/15 py-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8 sm:py-7"
            >
              <div className="flex items-center gap-3 text-foreground">
                <span className="type-numeral text-base text-accent">
                  {`0${idx + 1}`.slice(-2)}
                </span>
                <CategoryIcon
                  className="h-3.5 w-3.5 shrink-0 text-foreground/55"
                  strokeWidth={1.5}
                />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                  {category.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map(s => (
                  <SkillPill key={s.name} skill={s} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
