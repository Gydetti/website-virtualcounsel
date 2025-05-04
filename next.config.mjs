/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    // Redirect legacy placeholder.svg requests to optimized placeholder
    async rewrites() {
        return [{
            source: '/placeholder.svg',
            destination: '/images/placeholders/placeholder.svg',
        }, ];
    },
};

export default nextConfig;