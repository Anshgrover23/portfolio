import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { getBlogPost } from '@/data/blogPosts';
import ShareButton from '@/components/ShareButton';
import BlogSocials from '@/components/BlogSocials';
import { parseMarkdownIntoBlocks } from '@/lib/markdown-parser';
import { MarkdownBlogBlock } from '@/components/MarkdownBlogBlock';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const blocks = parseMarkdownIntoBlocks(post.content);

  return (
    <div className="min-h-screen text-gray-100">
      <div className="mb-10">
        <Navigation />
      </div>

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-400 border border-cyan-400/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-tight">
            {post.title}
          </h1>
          <p className="mb-8 text-xl text-gray-400 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between border-t border-b border-gray-800/50 py-6 my-8">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            {/* To Maintain SSR on this for better crawlability */}
            <ShareButton title={post.title} url={`/blog/${post.slug}`} />
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {blocks.map((block, index) => (
              <MarkdownBlogBlock content={block} key={`block-${index}`} />
            ))}
          </div>
          <BlogSocials className="mt-8" />
        </article>
      </main>
    </div>
  );
}
