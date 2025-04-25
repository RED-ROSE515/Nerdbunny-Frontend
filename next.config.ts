/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import './src/env.js';

import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['s3.ap-southeast-1.amazonaws.com']
  }
} satisfies NextConfig;

export default nextConfig;
