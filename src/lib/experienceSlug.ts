import { experiences } from '@/data/experiences';

export function companyToSlug(company: string): string {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getExperienceSlugs(): string[] {
  return experiences.map(e => companyToSlug(e.company));
}

const SLUG_ALIASES: Record<string, string> = {
  'mediar-ai': 'screenpipe',
};

export function getExperienceBySlug(slug: string) {
  const resolved = SLUG_ALIASES[slug] ?? slug;
  return experiences.find(e => companyToSlug(e.company) === resolved);
}
