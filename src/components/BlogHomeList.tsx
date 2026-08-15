import Link from 'next/link';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/data/blogPosts';

const HOME_BLOG_COUNT = 3;

export function BlogHomeList() {
  const posts = getBlogPosts().slice(0, HOME_BLOG_COUNT);
  const total = getBlogPosts().length;
  const hasMore = total > HOME_BLOG_COUNT;

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mb-16 md:mb-20" aria-labelledby="blog-heading">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-baseline gap-4">
          <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
            05
          </span>
          <div className="min-w-0">
            <h2
              id="blog-heading"
              className="font-display text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Writing
            </h2>
            <p className="mt-3 max-w-prose text-sm text-muted-foreground">
              Things I&apos;ve read before starting open source contributions.
            </p>
          </div>
        </div>
        {hasMore && (
          <Link
            href="/blog"
            className="hidden items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
          >
            All posts
            <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          </Link>
        )}
      </div>

      <ul className="list-none border-t border-line/80">
        {posts.map(post => (
          <li key={post.slug} className="border-b border-line/80">
            <Link
              href={`/blog/${post.slug}`}
              className="group -mx-3 flex flex-col gap-3 px-3 py-5 transition-colors hover:bg-canvas-muted/40 motion-safe:duration-150 sm:-mx-4 sm:flex-row sm:items-start sm:justify-between sm:px-4"
            >
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-lg font-semibold tracking-tight text-foreground underline-offset-4 group-hover:underline sm:text-xl">
                    {post.title}
                  </span>
                  {post.isNew && (
                    <span className="rounded-full border border-line bg-spot-teal px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-spot-teal-fg">
                      New
                    </span>
                  )}
                </span>
                {post.excerpt && (
                  <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </span>
                )}
                <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground tabular-nums">
                  <Calendar
                    className="h-3.5 w-3.5 shrink-0"
                    strokeWidth={1.5}
                  />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:mt-1">
                Read
                <ChevronRight
                  className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-line bg-card px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-canvas-muted motion-safe:active:scale-[0.98]"
          >
            Show all posts
          </Link>
        </div>
      )}
    </section>
  );
}
