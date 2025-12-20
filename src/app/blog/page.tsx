import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { getBlogPosts } from '@/data/blogPosts';
import BlogSocials from '@/components/BlogSocials';

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      <main className="relative z-10 px-6 md:px-0">
        <div className="mx-auto max-w-2xl pt-9 pb-12 md:py-24">
          <header className="md:mt-0 mb-12 sm:mb-16">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <Link href="/" className="mb-4 text-white text-left">
                    Ansh Grover
                  </Link>
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                  Founder · Developer · Open Source
                </p>
              </div>
              <BlogSocials />
            </div>
          </header>

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
                    {post.isNew && (
                      <span className="rounded-full border border-white bg-gray-600/40 px-2 py-0.5 text-xs text-white">
                        NEW
                      </span>
                    )}
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
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
