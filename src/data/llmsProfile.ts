const SITE_URL = 'https://anshgrover.com';

/**
 * User-facing deep-link prompt only — keep it short.
 * Profile truth lives at /public/llms.txt (served as https://anshgrover.com/llms.txt).
 */
export function getAskAiPrompt(): string {
  return `1. Who is Ansh Grover?\n2. ${SITE_URL}`;
}

export function getChatGptAskUrl(): string {
  return `https://chatgpt.com/?prompt=${encodeURIComponent(getAskAiPrompt())}`;
}

export function getClaudeAskUrl(): string {
  return `https://claude.ai/new?q=${encodeURIComponent(getAskAiPrompt())}`;
}
