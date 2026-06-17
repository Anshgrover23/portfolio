import Link from 'next/link';

export function TweetLink({ id }: { id: string }) {
  return (
    <div className="my-8 flex justify-center">
      <Link
        href={`https://x.com/i/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-line bg-muted px-4 py-3 text-sm text-foreground transition-colors hover:bg-canvas-muted"
      >
        View tweet on X
      </Link>
    </div>
  );
}
