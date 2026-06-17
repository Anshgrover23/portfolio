import { Suspense } from 'react';
import { getTweet } from 'react-tweet/api';
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'react-tweet';
import { normalizeFetchedTweet } from '@/lib/normalize-tweet-entities';
import 'react-tweet/theme.css';

async function TweetContent({ id }: { id: string }) {
  const raw = await getTweet(id);

  if (!raw) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={normalizeFetchedTweet(raw)} />;
}

export function TweetEmbed({ id }: { id: string }) {
  return (
    <div className="my-8 flex justify-center">
      <Suspense fallback={<TweetSkeleton />}>
        <TweetContent id={id} />
      </Suspense>
    </div>
  );
}
