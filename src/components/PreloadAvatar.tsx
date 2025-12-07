'use client';

import { useEffect } from 'react';

export const PreloadAvatar = () => {
  useEffect(() => {
    // Check if link already exists
    const existingLink = document.querySelector(
      'link[rel="preload"][href="/avatar.png"]'
    );

    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/avatar.png';
      link.as = 'image';
      link.type = 'image/png';
      document.head.appendChild(link);
    }
  }, []);

  return null;
};
