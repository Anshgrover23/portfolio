import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AskAiAboutMe } from '@/components/AskAiAboutMe';
import { EXPERIENCE_STATS } from '@/lib/experienceMeta';

export function HeroCover() {
  return (
    <section
      id="home"
      aria-labelledby="hero-cover-name"
      className="relative isolate overflow-hidden bg-background text-foreground md:-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/hero-cover.svg')] bg-cover bg-left-top opacity-50 [mask-image:linear-gradient(to_bottom,black_calc(100%_-_12rem),transparent)] lg:bg-center"
      />
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 pt-7 md:px-10 md:pt-28 lg:px-12 lg:pt-32">
        <p className="mb-8 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground md:hidden">
          <span className="font-semibold text-accent">2x YC engineer</span>
          <span aria-hidden>·</span>
          <span>3x remote startup</span>
        </p>
        <div className="mx-auto grid max-w-[34rem] grid-cols-1 items-center gap-y-7 md:max-w-none md:grid-cols-[minmax(0,1fr)_clamp(14rem,28vw,18rem)] md:gap-x-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-x-20">
          <div className="row-start-2 min-w-0 md:col-start-1 md:row-start-1 md:self-end">
            <p className="mb-4 hidden text-sm text-muted-foreground md:block">
              Hey, I&apos;m
            </p>
            <h1
              id="hero-cover-name"
              className="font-display text-[clamp(2.25rem,10vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.045em] md:text-[clamp(3rem,6vw,4rem)] lg:text-[5rem]"
            >
              <span className="md:hidden">
                hey, I&apos;m <em className="font-light">Ansh</em>
                <span className="sr-only"> Grover</span>
                <span className="text-accent">.</span>
              </span>
              <span className="hidden md:inline">
                Ansh Grover<span className="text-accent">.</span>
              </span>
            </h1>
          </div>

          <figure className="row-start-1 mx-auto w-56 max-w-full sm:w-64 md:col-start-2 md:row-span-2 md:w-full md:self-center">
            <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/avatar.jpg"
                  alt="Ansh Grover"
                  fill
                  priority
                  sizes="(max-width: 639px) 224px, (max-width: 767px) 256px, (max-width: 1023px) clamp(224px, 28vw, 288px), 336px"
                  className="object-cover object-[center_28%]"
                />
                <span className="absolute bottom-3 left-3 rounded bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/80">
                  India · IST
                </span>
              </div>
              <figcaption className="hidden bg-background/70 px-4 py-4 md:block">
                <p className="font-display text-lg italic text-foreground/80">
                  Keep moving, don&apos;t settle.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  God&apos;s child.
                </p>
              </figcaption>
            </div>
          </figure>

          <div className="min-w-0 md:col-start-1 md:row-start-2">
            <p className="hidden font-semibold leading-[1.3] tracking-[-0.035em] md:block md:text-[1.75rem] lg:text-[2.25rem]">
              2x YC engineer<span className="hidden sm:inline">.</span>
              <span className="mt-1 block font-normal text-foreground/65">
                3x remote startup.
              </span>
            </p>

            <div className="max-w-[34rem] border-l-2 border-accent/65 pl-4 sm:pl-5 md:mt-6 lg:mt-7">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                Software engineer at
                <a
                  href="https://meetriver.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  <Image
                    src="/river.png"
                    alt=""
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  River AI <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                </a>
                <span className="rounded border border-accent/20 bg-background/60 px-1.5 py-0.5 text-[11px] font-medium text-accent">
                  YC F26
                </span>
              </p>
              <p className="mt-2.5 text-xl font-medium tracking-tight sm:text-2xl">
                Building the AI computer.
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                3 years across contract engineering and open source. More than
                750 merged pull requests at 9 organizations.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-6">
              <a
                href="#projects"
                className="group inline-flex min-h-11 items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-foreground px-4 py-3 sm:px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 active:bg-foreground/75"
              >
                View my work{' '}
                <ArrowDown
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-accent"
              >
                Book a call
              </a>
              <Link
                href="/resume"
                className="hidden min-h-11 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline md:inline-flex"
              >
                Resume <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 md:hidden">
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Writing <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Resume <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://github.com/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                GitHub <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-9 max-w-[34rem] border-t border-foreground/15 pt-5 md:max-w-none lg:mt-12">
          <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:justify-between lg:flex-nowrap lg:gap-8">
            <dl className="grid grid-cols-3 gap-5 sm:gap-9">
              {[
                { value: '3', label: 'Years experience' },
                { value: EXPERIENCE_STATS.mergedPRs, label: 'Merged PRs' },
                {
                  value: EXPERIENCE_STATS.orgCount,
                  label: 'Organizations',
                },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2"
                >
                  <dd className="text-xl font-semibold tabular-nums tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
            <AskAiAboutMe />
          </div>
        </div>
      </div>
    </section>
  );
}
