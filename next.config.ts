import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // unoptimized: true, // Disabled to allow Next.js image optimization (WebP/AVIF) for better SEO performance
    remotePatterns: [
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
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
