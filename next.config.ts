import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/og-image.png',
        destination: '/opengraph-image',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'anshgrover.me' }],
        destination: 'https://anshgrover.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.anshgrover.me' }],
        destination: 'https://anshgrover.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.anshgrover.com' }],
        destination: 'https://anshgrover.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon@latest/icons/**',
      },
      {
        protocol: 'https',
        hostname: 'unavatar.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
