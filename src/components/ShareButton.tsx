'use client';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => {
        const fullUrl = `${process.env.NEXT_PUBLIC_HOST_URL ?? ''}${url}`;
        navigator.clipboard
          .writeText(fullUrl)
          .then(() => toast.success('Link copied to clipboard!'))
          .catch(() => toast.error('Failed to copy link'));
      }}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}
