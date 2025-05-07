/** @type {import('next').NextConfig} */

const nextConfig = {
  // Transpile framer-motion so its ESM export * is transformed for client components
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
  async rewrites() {
    return [
      {
        source: "/placeholder.svg",
        destination: "/images/placeholders/placeholder.svg",
      },
    ];
  },
};

export default nextConfig;
