import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence multi-lockfile monorepo warning when BA lives inside a larger workspace
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
