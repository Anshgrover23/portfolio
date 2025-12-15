'use client';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSocialLinks } from '@/components/AnimatedSocialLinks';
import { Chatbot } from '@/components/Chatbot';
import { getBlogPosts } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';

export default function BlogPage() {
  const blogPosts = getBlogPosts();
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-8 pt-24 relative z-10">
        {/* Header Section with Stats */}
        <div className="mb-16">
          <h1 className="mt-2 text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Ansh Blogs
            <span className="text-primary">.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Sharing my journey in open source, development insights, and lessons
            learned while building the future of web development.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/30 border border-white/20">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">{blogPosts.length}</div>
                <div className="text-muted-foreground">Articles</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div className="font-bold text-white">Regular</div>
                <div className="text-muted-foreground">Updates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Featured Post
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="relative bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    Latest
                  </Badge>

                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4 group-hover:text-blue-900 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                      {featuredPost.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      )}
                    </div>
                  </div>

                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-background/50 backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    Read full article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="text-sm font-medium text-muted-foreground">
                All Articles
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {regularPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <article className="relative h-full bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
                    {/* Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="space-y-3 mt-auto">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 2).map(tag => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon for exciting content!
            </p>
          </div>
        )}
      </div>

      <AnimatedSocialLinks />
      <Chatbot />
    </div>
  );
}
