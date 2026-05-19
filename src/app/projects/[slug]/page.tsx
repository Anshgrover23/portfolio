import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExperienceOrgContributions } from '@/components/ExperienceOrgContributions';
import { ExperienceOrgLogo } from '@/components/ExperienceOrgLogo';
import { getExperienceBySlug, getExperienceSlugs } from '@/lib/experienceSlug';
import { EXPERIENCE_STATS } from '@/lib/experienceMeta';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getExperienceSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const exp = getExperienceBySlug(slug);

  if (!exp) {
    return { title: 'Experience not found' };
  }

  return {
    title: `${exp.company} — experience`,
    description: exp.description ?? `${exp.role}. ${exp.period}.`,
  };
}

export default async function ProjectOrgPage({ params }: Props) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);

  if (!exp) {
    notFound();
  }

  const stack = exp.techStack ?? [];
  const badge = 'badge' in exp ? exp.badge : undefined;
  const highlights = 'highlights' in exp ? exp.highlights : undefined;
  const isCurrent = 'isCurrent' in exp && exp.isCurrent;
  const mergedPRsRepo =
    'mergedPRsRepo' in exp ? exp.mergedPRsRepo : undefined;
  const careerMergedPRs =
    'careerMergedPRs' in exp
      ? exp.careerMergedPRs
      : undefined;
  const priorOssNote = 'priorOssNote' in exp ? exp.priorOssNote : undefined;

  const priorContributions = exp.contributions.filter(
    c => 'section' in c && c.section === 'prior-oss'
  );
  const featuredContributions = exp.contributions.filter(
    c => !('section' in c) || c.section !== 'prior-oss'
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(40 25% 94%), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, hsl(172 15% 94% / 0.5), transparent)',
        }}
      />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-8 md:pb-14 md:pt-12">
        <nav className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Experience
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{exp.company}</span>
        </nav>

        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          All experience
        </Link>

        <article>
          <header className="mb-8 border-b border-line pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <ExperienceOrgLogo
                logo={exp.logo}
                company={exp.company}
                size="lg"
                framed
              />
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {isCurrent && (
                    <span className="inline-flex items-center rounded-md border border-line bg-spot-teal px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-spot-teal-fg">
                      Current
                    </span>
                  )}
                  {badge && (
                    <span className="inline-flex items-center rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">
                      {badge}
                    </span>
                  )}
                </div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {exp.company}
                </h1>
                <p className="mt-2 text-sm font-medium text-accent md:text-base">
                  {exp.role}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums md:text-sm">
                  {exp.period}
                </p>
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {exp.company === 'Screenpipe' ? 'screenpi.pe' : 'Organization'}
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {exp.description && (
              <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                {exp.description}
              </p>
            )}

            {stack.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies & tools
                </h2>
                <ul className="flex list-none flex-wrap gap-2">
                  {stack.map(t => (
                    <li
                      key={t.label}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas-muted px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground/90"
                    >
                      {t.icon && (
                        <img
                          src={
                            t.icon.startsWith('http')
                              ? t.icon
                              : t.icon.startsWith('/')
                                ? t.icon
                                : `/${t.icon}`
                          }
                          alt=""
                          width={14}
                          height={14}
                          className={`h-3.5 w-3.5 shrink-0 ${
                            t.label === 'Next.js' ? 'invert opacity-75' : ''
                          }`}
                        />
                      )}
                      {t.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {highlights && highlights.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  What I&apos;ve done
                </h2>
                <ul className="space-y-2.5 rounded-lg border border-line bg-canvas-muted/40 p-5">
                {highlights.map(item => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              </div>
            )}

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {careerMergedPRs && mergedPRsRepo ? (
                <>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      PRs merged ({mergedPRsRepo})
                    </dt>
                    <dd className="mt-0.5 font-mono font-medium tabular-nums text-foreground">
                      {exp.totalPRs}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Career total (all orgs)
                    </dt>
                    <dd className="mt-0.5 font-mono font-medium tabular-nums text-foreground">
                      {careerMergedPRs ?? EXPERIENCE_STATS.mergedPRs}
                    </dd>
                  </div>
                </>
              ) : (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    PRs merged
                  </dt>
                  <dd className="mt-0.5 font-mono font-medium tabular-nums text-foreground">
                    {exp.totalPRs}
                  </dd>
                </div>
              )}
              {exp.totalBounties && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    Bounties
                  </dt>
                  <dd className="mt-0.5 font-mono font-medium tabular-nums text-foreground">
                    {exp.totalBounties}
                  </dd>
                </div>
              )}
            </dl>
          </header>

          {featuredContributions.length > 0 && (
            <section className="mb-10" aria-labelledby="contrib-heading">
              <h2
                id="contrib-heading"
                className="mb-5 font-display text-xl font-semibold tracking-tight text-foreground"
              >
                Featured contributions
              </h2>
              <ExperienceOrgContributions
                contributions={featuredContributions}
                reposPrivate={exp.reposPrivate}
                compensationDetailsImage={exp.compensationDetailsImage}
              />
            </section>
          )}

          {priorContributions.length > 0 && (
            <section aria-labelledby="prior-oss-heading">
              <h2
                id="prior-oss-heading"
                className="mb-2 font-display text-xl font-semibold tracking-tight text-foreground"
              >
                Open source before full-time
              </h2>
              <p className="mb-5 max-w-prose text-sm text-muted-foreground">
                {priorOssNote ??
                  'Public PRs and bounties that led into the founding engineer role.'}
              </p>
              <ExperienceOrgContributions contributions={priorContributions} />
            </section>
          )}

          {featuredContributions.length === 0 && priorContributions.length === 0 && (
            <section aria-labelledby="contrib-heading">
              <h2
                id="contrib-heading"
                className="mb-5 font-display text-xl font-semibold tracking-tight text-foreground"
              >
                Featured contributions
              </h2>
              <ExperienceOrgContributions
                contributions={exp.contributions}
                reposPrivate={exp.reposPrivate}
                compensationDetailsImage={exp.compensationDetailsImage}
              />
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
