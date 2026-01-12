/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Generate a static export
  trailingSlash: true,
  // Optional: Add basePath if deploying to a subdirectory
  // basePath: '/your-base-path',
  // Optional: Add assetPrefix if assets are hosted on a CDN
  // assetPrefix: 'https://your-cdn-url.com',
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
