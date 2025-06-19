import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Turbopack configuration for path aliases
  experimental: {
    turbo: {
      resolveAlias: {
        '@shared': path.resolve(__dirname, '../shared/src'),
      },
    },
  },
  // Webpack configuration (fallback for non-turbo builds)
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': path.resolve(__dirname, '../shared/src'),
    };
    return config;
  },
};

export default nextConfig;
