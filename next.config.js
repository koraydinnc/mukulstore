/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: [
      'www.mukulstore.com', 
      'mukulstore.com', 
      'localhost',
      'koraydincc.s3.amazonaws.com' // Add S3 bucket hostname
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  /* config options here */
}
 
module.exports = nextConfig