import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "crests.football-data.org",
      },
      {
        hostname: "crests.football-data.org",
      },
    ],
  },
};

export default nextConfig;
