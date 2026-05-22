import Link from 'next/link';
import { getBlogPosts } from '@/data/blogPosts';
import BlogSocials from '@/components/BlogSocials';

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <main className="relative z-10 px-6 md:px-0">
        <div className="mx-auto max-w-2xl pb-12 pt-8 md:pb-16 md:pt-12">
          <header className="md:mt-0 mb-12 sm:mb-16">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  <Link
                    href="/"
                    className="mb-4 text-left text-foreground underline-offset-4 hover:underline"
                  >
                    Ansh Grover
                  </Link>
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Engineer · Open source · Contracts
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
                      <span className="rounded-md border border-line bg-spot-teal px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-spot-teal-fg">
                        New
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted-foreground sm:text-sm tabular-nums">
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
