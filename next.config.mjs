// @ts-check

/**
 * Static export targeting GitHub Pages under https://carlosocarvalho.github.io/coca/.
 * BASE_PATH is injected by the deploy workflow. For local dev it's empty.
 */
const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_BUILD_SHA: process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev',
  },
};

export default nextConfig;
