import type { MetadataRoute } from "next";
import { absoluteUrl, getCanonicalOrigin, shouldIndex } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!shouldIndex()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: new URL(getCanonicalOrigin()).host,
  };
}
