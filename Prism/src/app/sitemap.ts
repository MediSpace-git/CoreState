import type { MetadataRoute } from "next";
import { getSiteUrl, routes } from "@prism/config/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const paths = Object.values(routes);
  return paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date("2026-08-29"),
  }));
}
