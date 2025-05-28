/** @type {import('next').NextConfig} */

import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Use separate output directory for production builds locally to avoid clobbering the dev server cache, but Vercel expects .next
const isProdBuild = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const distDir = isProdBuild && !isVercel ? '.next-prod' : '.next';
const nextConfig = withBundleAnalyzer({
  // Transpile framer-motion so its ESM export * is transformed for client components
  distDir,
  transpilePackages: ['framer-motion'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  experimental: {
    esmExternals: true,
    // Enable CSS optimization for better performance
    optimizeCss: true,
    // Enable CSS code splitting for better loading
    cssChunking: true,
  },
  // Optimize CSS delivery and loading performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Improve performance with proper headers
  async headers() {
    return [
      {
        // Add performance headers for CSS resources
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/placeholder.svg',
        destination: '/images/placeholders/placeholder.svg',
      },
    ];
  },
  // Instruct webpack to assume modern browser environment and skip legacy transpilation
  webpack(config, { isServer }) {
    if (!isServer) {
      config.output.environment = {
        arrowFunction: true,
        bigIntLiteral: true,
        const: true,
        destructuring: true,
        forOf: true,
        dynamicImport: true,
        module: true,
      };
    }
    return config;
  },
});

export default nextConfig;
