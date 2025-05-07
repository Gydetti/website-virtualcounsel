/** @type {import('next').NextConfig} */

import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
const __dirname = dirname(fileURLToPath(
    import.meta.url));

// Use 'main' field first to load CJS entry for framer-motion
// so that export * is transformed and avoids client boundary errors
// via resolving CJS before ESM module
// No createRequire needed here

const nextConfig = {
    // We alias 'framer-motion' to a lightweight stub that strips all animations
    // and prevents runtime crashes in the app/router SSR.
    transpilePackages: [],
    webpack: (config, { isServer }) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'framer-motion': path.resolve(__dirname, 'lib/stub-framer-motion.tsx'),
        };
        // Inject React automatically in all bundles to ensure React is defined everywhere
        config.plugins.push(
            new webpack.ProvidePlugin({ React: 'react' })
        );
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    async rewrites() {
        return [{ source: '/placeholder.svg', destination: '/images/placeholders/placeholder.svg' }];
    },
};

export default nextConfig;