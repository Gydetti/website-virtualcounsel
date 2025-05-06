/** @type {import('next').NextConfig} */

// Use 'main' field first to load CJS entry for framer-motion
// so that export * is transformed and avoids client boundary errors
// via resolving CJS before ESM modules
// No createRequire needed here

const nextConfig = {
    // (removed experimental.esmExternals override to allow Next.js default ESM handling)
    // Transpile framer-motion to support export * in client boundaries
    transpilePackages: ["framer-motion"],
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
            source: "/placeholder.svg",
            destination: "/images/placeholders/placeholder.svg",
        }, ];
    },
    webpack: (config) => {
        // prefer CommonJS 'main' over ESM 'module' entrypoints
        config.resolve.mainFields = ['main', 'module', 'browser'];
        return config;
    },
};

export default nextConfig;