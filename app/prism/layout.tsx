import type { Metadata } from "next";
import { siteConfig } from "@prism/config/content";
import { prismSeo } from "@/lib/seo";
import "./prism.css";
import "../../Prism/src/components/effects/prism/Prism.css";

export const metadata: Metadata = {
  title: {
    default: prismSeo.home.title,
    template: "%s | CoreState",
  },
  description: prismSeo.home.description,
  applicationName: `${siteConfig.name} · ${siteConfig.company}`,
  icons: {
    icon: [{ url: "/brand/prism-logo.png", type: "image/png" }],
    apple: "/brand/prism-logo.png",
  },
};

export default function PrismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prism-site flex-1">{children}</div>;
}
