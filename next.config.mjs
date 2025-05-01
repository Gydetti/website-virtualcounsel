import MiniCssExtractPlugin from 'mini-css-extract-plugin'

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
    webpack: (config, { dev, isServer }) => {
        // Ensure CSS extraction plugin is applied
        config.plugins.push(new MiniCssExtractPlugin())
        return config
    }
}

export default nextConfig