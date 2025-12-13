import { BlogPost } from '@/types/blog';

const blogPosts: BlogPost[] = [
  {
    slug: 'building-tscircuit',
    title: 'My Journey Contributing to TSCircuit',
    excerpt:
      'Diving deep into the world of open-source electronics. How I contributed to TSCircuit and what I learned along the way.',
    content: '',
    date: '2025-12-05',
    readTime: '6 min read',
    tags: ['Open Source', 'TypeScript', 'Electronics'],
    author: 'Ansh Grover',
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  const posts = getBlogPosts();
  return posts.map(post => post.slug);
}
