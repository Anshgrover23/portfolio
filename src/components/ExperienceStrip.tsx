import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { experiences } from '@/data/experiences';
import { companyToSlug } from '@/lib/experienceSlug';
import { isCurrentRole } from '@/lib/experienceMeta';
import { ExperienceOrgLogo } from '@/components/ExperienceOrgLogo';

function OrgTile({
  company,
  logo,
  role,
  isCurrent,
}: {
  company: string;
  logo: string;
  role?: string;
  isCurrent?: boolean;
}) {
  const slug = companyToSlug(company);

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group flex min-w-[8rem] shrink-0 snap-start flex-col items-center gap-2 rounded-lg border bg-card px-3 py-3 transition-[box-shadow,transform] motion-safe:duration-200 hover:shadow-[0_2px_8px_rgba(47,52,55,0.06)] motion-safe:active:scale-[0.98] md:min-w-[9rem] md:px-4 md:py-4 ${
        isCurrent ? 'border-accent/30 ring-1 ring-accent/15' : 'border-line'
      }`}
    >
      <ExperienceOrgLogo logo={logo} company={company} size="sm" />
      <span className="max-w-[9.5rem] text-center">
        {isCurrent && (
          <span className="mb-1 block font-mono text-[9px] font-semibold uppercase tracking-wide text-accent">
            Current
          </span>
        )}
        <span className="block font-medium text-xs leading-tight text-foreground underline-offset-4 group-hover:underline md:text-sm">
          {company}
        </span>
        {role && (
          <span className="mt-0.5 block text-[10px] leading-tight text-muted-foreground md:text-[11px]">
            {role}
          </span>
        )}
      </span>
    </Link>
  );
}

export function ExperienceStrip() {
  const sorted = [
    ...experiences.filter(isCurrentRole),
    ...experiences.filter(exp => !isCurrentRole(exp)),
  ];

  return (
    <section className="mb-16 md:mb-20" aria-labelledby="experience-heading">
      <div className="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <h2
            id="experience-heading"
            className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            Experience
          </h2>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            Founding engineer at{' '}
            <span className="font-medium text-foreground">Screenpipe</span> (YC
            S26), plus contract and OSS work.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          All experience
          <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="-mx-1 flex justify-start gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] snap-x snap-mandatory md:flex-wrap md:justify-center md:overflow-x-visible md:snap-none">
        {sorted.map(exp => (
          <OrgTile
            key={exp.company}
            company={exp.company}
            logo={exp.logo}
            role={exp.role}
            isCurrent={isCurrentRole(exp)}
          />
        ))}
      </div>
    </section>
  );
}
