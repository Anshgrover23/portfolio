'use client';

import { Tweet } from 'react-tweet';

interface TweetWrapperProps {
  id: string;
}

export function TweetWrapper({ id }: TweetWrapperProps) {
  return (
    <div className="my-8 flex justify-center">
      <Tweet id={id} />
    </div>
  );
}
