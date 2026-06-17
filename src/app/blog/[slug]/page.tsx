import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/data/blogPosts';
import ShareButton from '@/components/ShareButton';
import BlogSocials from '@/components/BlogSocials';
import {
  parseMarkdownIntoBlocks,
  type ParsedBlock,
} from '@/lib/markdown-parser';
import { MarkdownBlogBlock } from '@/components/MarkdownBlogBlock';
import { TweetEmbed } from '@/components/TweetEmbed';
import { JsonLd } from '@/components/JsonLd';

import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const post = getBlogPost(slug);

  if (post)
    return {
      title: `${post.title} - Ansh Grover`,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: ['Ansh Grover'],
        url: `/blog/${slug}`,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  else {
    return {
      title: 'Blog Post Not Found',
    };
  }
}

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

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={articleStructuredData} />
      <main className="mx-auto max-w-3xl px-6 pb-12 pt-8 md:py-14 md:pt-10">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <header className="mb-12">
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="rounded-md border border-line bg-muted px-3 py-1 font-mono text-xs font-medium uppercase tracking-wide text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display mb-6 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="my-8 flex items-center justify-between border-y border-line py-6">
            <div className="flex items-center gap-6 font-mono text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <ShareButton url={`/blog/${post.slug}`} />
          </div>
        </header>

        <article className="prose prose-neutral max-w-none prose-lg">
          <div className="space-y-6 leading-relaxed text-muted-foreground">
            {blocks.map((block: ParsedBlock, index: number) =>
              block.type === 'tweet' && block.tweetId ? (
                <TweetEmbed id={block.tweetId} key={`block-${index}`} />
              ) : (
                <MarkdownBlogBlock block={block} key={`block-${index}`} />
              )
            )}
          </div>
          <BlogSocials className="mt-8" />
        </article>
      </main>
    </div>
  );
}
