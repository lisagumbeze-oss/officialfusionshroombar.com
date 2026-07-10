import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/api/products-feed',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.officialfusionshroombars.com',
      },
      {
        protocol: 'http',
        hostname: 'www.officialfusionshroombars.com',
      },
      {
        protocol: 'https',
        hostname: 'officialfusionshroombars.com',
      },
      {
        protocol: 'http',
        hostname: 'officialfusionshroombars.com',
      },
      {
        protocol: 'https',
        hostname: 'officialfusionshroombar.com',
      },
      {
        protocol: 'http',
        hostname: 'officialfusionshroombar.com',
      },
      {
        protocol: 'https',
        hostname: 'myfusionbar.com',
      },
      {
        protocol: 'http',
        hostname: 'myfusionbar.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'http',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'http',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
      },
      {
        protocol: 'http',
        hostname: 'i2.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i3.wp.com',
      },
      {
        protocol: 'http',
        hostname: 'i3.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'fusionchocolatestore.com',
      },
      {
        protocol: 'http',
        hostname: 'fusionchocolatestore.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
