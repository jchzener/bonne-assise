import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Native Node runtime on Render (`npm start` → `next start`).
  // Do NOT set output: 'export' or 'standalone' unless you switch to Docker.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
