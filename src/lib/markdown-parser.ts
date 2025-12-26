import { marked } from 'marked';

export interface ParsedBlock {
  type: 'markdown' | 'tweet';
  content: string;
  tweetId?: string;
}

export function parseMarkdownIntoBlocks(markdown: string): ParsedBlock[] {
  // Split by tweet components first
  const tweetRegex = /<tweet\s+id="(\d+)"\s*\/>/g;
  const parts = markdown.split(tweetRegex);

  const blocks: ParsedBlock[] = [];
  let match;
  let lastIndex = 0;

  while ((match = tweetRegex.exec(markdown)) !== null) {
    // Add markdown content before the tweet
    if (match.index > lastIndex) {
      const markdownContent = markdown.slice(lastIndex, match.index);
      if (markdownContent.trim()) {
        blocks.push({
          type: 'markdown',
          content: markdownContent.trim(),
        });
      }
    }

    // Add the tweet block
    blocks.push({
      type: 'tweet',
      content: match[0],
      tweetId: match[1],
    });

    lastIndex = tweetRegex.lastIndex;
  }

  // Add remaining markdown content
  if (lastIndex < markdown.length) {
    const remainingContent = markdown.slice(lastIndex);
    if (remainingContent.trim()) {
      blocks.push({
        type: 'markdown',
        content: remainingContent.trim(),
      });
    }
  }

  // If no tweets found, parse as regular markdown blocks
  if (blocks.length === 0) {
    const tokens = marked.lexer(markdown);
    return tokens.map(token => ({
      type: 'markdown' as const,
      content: token.raw,
    }));
  }

  return blocks;
}
