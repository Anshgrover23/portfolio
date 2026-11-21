import { getChatGptAskUrl, getClaudeAskUrl } from '@/data/llmsProfile';

function OpenAiMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 5.99 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.76a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.01l.142.085 4.783 2.762a.771.771 0 0 0 .78 0l5.843-3.373v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.499 4.499 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function AnthropicMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13.827 3.52h3.603L24 20.48h-3.603l-1.586-3.893h-7.458L9.767 20.48H6.163L13.827 3.52zm.53 4.588-2.545 6.27h5.09l-2.545-6.27zM6.9 3.52h3.72l-6.9 16.96H0L6.9 3.52z" />
    </svg>
  );
}

const LINKS = [
  {
    href: getChatGptAskUrl(),
    label: 'ChatGPT',
    Icon: OpenAiMark,
  },
  {
    href: getClaudeAskUrl(),
    label: 'Claude',
    Icon: AnthropicMark,
  },
] as const;

type AskAiAboutMeProps = {
  className?: string;
  /** Center label + buttons (e.g. contact section). */
  align?: 'start' | 'center';
};

/**
 * Opens ChatGPT / Claude with Ansh's llms.txt profile prefilled,
 * so visitors can ask an assistant that only uses that context.
 */
export function AskAiAboutMe({
  className = '',
  align = 'start',
}: AskAiAboutMeProps) {
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${centered ? 'justify-center' : ''} ${className}`}
    >
      <p className="text-xs text-muted-foreground">Ask about me</p>
      <div className="flex items-center gap-1">
        {LINKS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask ${label} about Ansh`}
            className="group inline-flex min-h-10 items-center gap-2 rounded-md px-2.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-background/80 hover:text-foreground"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {label}
            <span aria-hidden className="text-muted-foreground">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
