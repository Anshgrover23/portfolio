'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MarkdownBlogBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-3xl font-bold mt-12 mb-6 text-white tracking-tight first:mt-0"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-2xl font-semibold mt-10 mb-5 text-gray-100 tracking-tight"
            />
          ),
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="text-gray-300 leading-relaxed text-lg my-6"
            />
          ),
          strong: ({ node, ...props }) => (
            <strong {...props} className="text-white font-semibold" />
          ),
          em: ({ node, ...props }) => (
            <em {...props} className="text-gray-300 italic" />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="space-y-3 my-8 ml-6 list-disc list-outside"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="space-y-4 my-8 ml-6 list-decimal list-outside"
            />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="pl-2 text-gray-300" />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
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
                  className="bg-gray-800/50 text-cyan-400 px-2 py-1 rounded text-base font-mono border border-gray-700/50"
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-gray-900 border border-gray-800 rounded-lg p-6 overflow-x-auto my-8">
                <code {...props} className="text-gray-300 font-mono text-sm">
                  {children}
                </code>
              </pre>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-cyan-400/50 pl-6 my-8 italic text-gray-400"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MarkdownBlogBlock.displayName = 'MarkdownBlogBlock';
