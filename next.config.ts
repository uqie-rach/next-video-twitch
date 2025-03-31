import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'img.clerk.com',
      },
      {
        protocol: "https",
        hostname: '4ln9zhfl7y.ufs.sh'
      }
    ]
  }
};

export default nextConfig;
