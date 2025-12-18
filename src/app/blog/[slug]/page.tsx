import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { AnimatedSocialLinks } from '@/components/AnimatedSocialLinks';
import { Chatbot } from '@/components/Chatbot';
import { getBlogPost } from '@/data/blogPosts';
import ShareButton from '@/components/ShareButton';
import BlogFooter from '@/components/BlogFooter';

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
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
            {post.content.split('\n\n').map((paragraph, index) => {
              // Handle headings
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold mt-12 mb-6 text-white tracking-tight first:mt-0"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-semibold mt-10 mb-5 text-gray-100 tracking-tight"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }

              // Handle lists
              if (paragraph.match(/^\d\./m)) {
                const items = paragraph.split('\n').filter(line => line.trim());
                return (
                  <ol
                    key={index}
                    className="space-y-4 my-8 ml-6 list-decimal list-outside"
                  >
                    {items.map((item, i) => {
                      const match = item.match(
                        /^\d+\.\s*\*\*(.+?)\*\*\s*-\s*(.+)$/
                      );
                      if (match) {
                        return (
                          <li key={i} className="pl-3 text-gray-300">
                            <strong className="text-cyan-400 font-semibold">
                              {match[1]}
                            </strong>
                            <span className="text-gray-400"> — </span>
                            <span>{match[2]}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="pl-3 text-gray-300">
                          {item.replace(/^\d+\.\s*/, '')}
                        </li>
                      );
                    })}
                  </ol>
                );
              }

              if (paragraph.match(/^-\s/m)) {
                const items = paragraph.split('\n').filter(line => line.trim());
                return (
                  <ul
                    key={index}
                    className="space-y-3 my-8 ml-6 list-disc list-outside"
                  >
                    {items.map((item, i) => (
                      <li key={i} className="pl-2 text-gray-300">
                        {item.replace(/^-\s*/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Handle regular paragraphs
              if (paragraph.trim()) {
                return (
                  <p
                    key={index}
                    className="text-gray-300 leading-relaxed text-lg my-6"
                  >
                    {paragraph.split(/\*\*(.+?)\*\*/).map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-white font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return null;
            })}
          </div>
          <BlogFooter className="mt-12" />
        </article>
      </main>
    </div>
  );
}
