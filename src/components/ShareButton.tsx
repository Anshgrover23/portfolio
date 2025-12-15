'use client';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButton({
  title,
  url,
  children,
}: {
  title: string;
  url: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_HOST_URL}${url}`
        );
        toast.success('Link copied to clipboard!');
      }}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}
