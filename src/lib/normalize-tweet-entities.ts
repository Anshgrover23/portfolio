import type { QuotedTweet, Tweet, TweetEntities } from 'react-tweet/api';

const EMPTY_ENTITIES: TweetEntities = {
  hashtags: [],
  urls: [],
  user_mentions: [],
  symbols: [],
};

type TweetWithEntities = {
  entities: TweetEntities;
  quoted_tweet?: QuotedTweet;
};

export function normalizeTweetEntities<T extends TweetWithEntities>(
  tweet: T
): T {
  return {
    ...tweet,
    entities: {
      ...EMPTY_ENTITIES,
      ...tweet.entities,
    },
    ...(tweet.quoted_tweet
      ? {
          quoted_tweet: normalizeTweetEntities(
            tweet.quoted_tweet
          ) as T['quoted_tweet'],
        }
      : {}),
  };
}

export function normalizeFetchedTweet(tweet: Tweet): Tweet {
  return normalizeTweetEntities(tweet);
}
