/** @type {import('next').NextConfig} */

import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
    // Transpile framer-motion so its ESM export * is transformed for client components
    transpilePackages: ["framer-motion"],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: false,
    },
    async rewrites() {
        return [{
            source: "/placeholder.svg",
            destination: "/images/placeholders/placeholder.svg",
        }, ];
    },
});

export default nextConfig;