'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TweetWrapper } from './TweetWrapper';
import type { ParsedBlock } from '@/lib/markdown-parser';

export const MarkdownBlogBlock = memo(
  ({ block }: { block: ParsedBlock }) => {
    if (block.type === 'tweet' && block.tweetId) {
      return <TweetWrapper id={block.tweetId} />;
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="font-display mt-12 mb-6 text-3xl font-semibold tracking-tight text-foreground first:mt-0"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="mt-10 mb-5 text-2xl font-semibold tracking-tight text-foreground"
            />
          ),
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="my-6 text-lg leading-relaxed text-muted-foreground"
            />
          ),
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold text-foreground" />
          ),
          em: ({ node, ...props }) => (
            <em {...props} className="italic text-muted-foreground" />
          ),
          u: ({ node, ...props }) => (
            <u
              {...props}
              className="underline decoration-foreground/30 underline-offset-4"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="my-8 ml-6 list-outside list-disc space-y-3"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="my-8 ml-6 list-outside list-decimal space-y-4"
            />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="pl-2 text-muted-foreground" />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 transition-colors hover:opacity-90"
            />
          ),
          code: ({
            node,
            className,
            children,
            ...props
          }: {
            node?: unknown;
            className?: string;
            children?: React.ReactNode;
          } & React.ComponentProps<'code'>) => {
            const isInline = !className?.includes('language-');
            if (isInline) {
              return (
                <code
                  {...props}
                  className="rounded border border-line bg-muted px-2 py-0.5 font-mono text-base text-foreground"
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-8 overflow-x-auto rounded-lg border border-line bg-canvas-muted p-6">
                <code {...props} className="font-mono text-sm text-foreground">
                  {children}
                </code>
              </pre>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="my-8 border-l-4 border-accent/40 pl-6 italic text-muted-foreground"
            />
          ),
        }}
      >
        {block.content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) =>
    prevProps.block.content === nextProps.block.content &&
    prevProps.block.type === nextProps.block.type &&
    prevProps.block.tweetId === nextProps.block.tweetId
);

MarkdownBlogBlock.displayName = 'MarkdownBlogBlock';
