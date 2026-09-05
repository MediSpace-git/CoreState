import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "corestateai.com" }],
        destination: "https://www.corestateai.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    resolveAlias: {
      "@prism": path.join(__dirname, "Prism/src"),
    },
  },
};

export default nextConfig;
