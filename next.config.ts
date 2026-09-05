import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  trailingSlash: false,
  turbopack: {
    resolveAlias: {
      "@prism": path.join(__dirname, "Prism/src"),
    },
  },
};

export default nextConfig;
