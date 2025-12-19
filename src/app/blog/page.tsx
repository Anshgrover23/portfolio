'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { getBlogPosts } from '@/data/blogPosts';
import BlogSocials from '@/components/BlogSocials';

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      <main className="relative z-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
          {/* Header */}
          <header className="mt-16 md:mt-0 mb-12 sm:mb-16">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <Link href="/" className="mb-4 text-white text-left">
                    Ansh Grover
                  </Link>
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Founder · Developer · Open Source
                </p>
              </div>
              <BlogSocials />
            </div>
          </header>

          {/* Blog Posts List */}
          <div className="mt-4 sm:mt-8 md:mt-16">
            <section className="space-y-4 sm:space-y-6">
              {blogPosts.map(post => (
                <article key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 gap-y-1"
                  >
                    <span className="text-base sm:text-lg font-medium underline underline-offset-4 decoration-muted-foreground/40 group-hover:decoration-foreground transition-colors">
                      {post.title}
                    </span>
                    {post.id === 1 && (
                      <span className="rounded-full border border-muted-foreground/30 px-2 py-0.5 text-xs text-muted-foreground">
                        NEW
                      </span>
                    )}
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {post.date}
                    </span>
                  </Link>
                </article>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
