import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return []
  },
};

export default nextConfig;
