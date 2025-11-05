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
  // Valid experimental features for Next.js 14.2.33
  experimental: {
    // Enable optimized package imports for better performance
    optimizePackageImports: ['react-bootstrap', 'react-bootstrap-icons'],
  },
};

export default nextConfig;
