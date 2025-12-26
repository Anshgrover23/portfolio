'use client';

import {
  parseMarkdownIntoBlocks,
  type ParsedBlock,
} from '@/lib/markdown-parser';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TweetWrapper } from './TweetWrapper';

const MemoizedMarkdownBlock = memo(
  ({ block }: { block: ParsedBlock }) => {
    if (block.type === 'tweet' && block.tweetId) {
      return <TweetWrapper id={block.tweetId} />;
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, ...props }) => {
            const url = props.href || '';
            const isGitHubPR =
              url.includes('github.com') && url.includes('/pull/');
            return (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isGitHubPR ? 'text-blue-600 hover:text-blue-800 font-medium' : 'text-blue-600 hover:text-blue-700'} underline break-words`}
              />
            );
          },
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold text-gray-900" />
          ),
          em: ({ node, ...props }) => (
            <em {...props} className="italic text-gray-900" />
          ),
          u: ({ node, ...props }) => (
            <u
              {...props}
              className="underline decoration-white/60 underline-offset-4"
            />
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-4xl font-bold mt-8 mb-4 text-purple-600"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-3xl font-bold mt-6 mb-3 text-purple-600"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-2xl font-bold mt-4 mb-2 text-purple-600"
            />
          ),
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="mb-2 text-gray-900 leading-relaxed last:mb-0"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="list-disc ml-5 mb-2 space-y-1 last:mb-0"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="list-decimal ml-5 mb-2 space-y-1 last:mb-0"
            />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="text-gray-900 leading-relaxed" />
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
                  className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200"
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                {...props}
                className="block bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono"
              >
                {children}
              </code>
            );
          },
        }}
      >
        {block.content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.block.content !== nextProps.block.content ||
      prevProps.block.type !== nextProps.block.type ||
      prevProps.block.tweetId !== nextProps.block.tweetId
    )
      return false;
    return true;
  }
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return (
      <>
        {blocks.map((block: ParsedBlock, index: number) => (
          <MemoizedMarkdownBlock block={block} key={`${id}-block_${index}`} />
        ))}
      </>
    );
  }
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
