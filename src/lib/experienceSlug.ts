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

export function getExperienceBySlug(slug: string) {
  return experiences.find(e => companyToSlug(e.company) === slug);
}
