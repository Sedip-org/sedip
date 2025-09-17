import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Build zamanı ESLint error-ları ignor et
  },
};

export default nextConfig;
