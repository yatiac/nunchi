import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['stevens.com.pa', 'felix.com.pa', 'arrocha.com', '*'],
  },
};

export default nextConfig;
