/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@demo/shared'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
