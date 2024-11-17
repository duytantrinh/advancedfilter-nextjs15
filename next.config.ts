import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* enable caching 30s - nextjs 14 , it is default */
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;
