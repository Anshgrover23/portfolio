import { experiences } from '@/data/experiences';

export const EXPERIENCE_STATS = {
  mergedPRs: '315+',
  bountyTotal: '$45.9k+',
  orgCount: '8+',
} as const;

export type ExperienceEntry = (typeof experiences)[number];

export function isCurrentRole(exp: ExperienceEntry) {
  return 'isCurrent' in exp && exp.isCurrent === true;
}

export function isFeaturedRole(exp: ExperienceEntry) {
  return 'featured' in exp && exp.featured === true;
}

export function partitionExperiences() {
  const current = experiences.filter(isCurrentRole);
  const recent = experiences.filter(
    exp => !isCurrentRole(exp) && exp.period.includes('2025') && !exp.period.includes('Contributing')
  );
  const openSource = experiences.filter(
    exp => !isCurrentRole(exp) && !recent.includes(exp)
  );

  return { current, recent, openSource };
}
