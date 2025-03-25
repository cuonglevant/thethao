/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "crests.football-data.org",
      "upload.wikimedia.org",
      "tmssl.akamaized.net",
      "api.football-data.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tmssl.akamaized.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.football-data.org",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
