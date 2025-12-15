import { BlogPost } from '@/types/blog';

const blogPosts: BlogPost[] = [
  {
    slug: 'building-tscircuit',
    title: 'My Journey Contributing to TSCircuit',
    excerpt:
      'Diving deep into the world of open-source electronics. How I contributed to TSCircuit and what I learned along the way.',
    tags: ['Open Source', 'TypeScript', 'Electronics'],
    author: 'Ansh Grover',
    date: 'Dec 10, 2025',
    readTime: '8 min read',
    content: `## Introduction

It all started with a simple fixing of a typo. I was just browsing through GitHub one evening, looking for some interesting TypeScript projects to which I could contribute, when I came across TSCircuit. Immediately, this project caught my attention—a tool for designing circuits using React components? That's exactly the kind of outside-the-box thinking that gets me excited.

## First Contributions

My first PR was nothing special, just a typo in the documentation. But it got me acquainted with the codebase and how contributions are done. The maintainers were super friendly, which motivated me to seek bigger issues to solve.

## Growing into a Maintainer

Over the next few months, I went from fixing bugs to implementing new features. I worked on the following:

Improving the rendering pipeline for complex circuits

New component types' addition
- Test infrastructure optimization

Each contribution taught me one thing or another about circuit design, React internals, and maintaining open-source projects.

## Lessons Learned

1. **Start small** - Don't try to tackle the biggest issue right away
2. **Be predictable** - Steady contributions establish trust
3. **Communicate** - Let the maintainers know how you are doing
4. **Learn the domain** - Knowing the problem space makes you a better contributor.

Next Steps Nowadays I'm one of the core maintainers in TSCircuit, and my work includes reviewing PRs and guiding new contributors through the same journey I've gone through. It's a tremendous feeling to be part of a project that is pushing the limits of what is possible using Web Technologies.
    `,
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
