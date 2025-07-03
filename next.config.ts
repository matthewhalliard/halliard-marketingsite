import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: isDev ? { allowDevelopmentBuild: true } : {},
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
