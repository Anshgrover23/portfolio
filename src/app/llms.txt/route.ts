import { LLMS_PROFILE } from '@/data/llmsProfile';

export function GET() {
  return new Response(LLMS_PROFILE.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
