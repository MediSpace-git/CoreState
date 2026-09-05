import type { MetadataRoute } from "next";
import { absoluteUrl, indexableRoutes } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-09-05");

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: LAST_MODIFIED,
    priority: route.priority,
  }));
}
