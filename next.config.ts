import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "wp-cms.local",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
