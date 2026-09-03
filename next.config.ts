import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@prism": path.join(__dirname, "Prism/src"),
    },
  },
};

export default nextConfig;
