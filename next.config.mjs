/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for faster development builds
  typescript: {
    // Ignore type errors during build for faster development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    // Ignore eslint errors during build for faster development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Experimental features for faster builds
  experimental: {
    // Reduce memory usage
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
