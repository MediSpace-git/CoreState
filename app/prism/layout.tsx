import type { Metadata } from "next";
import { siteConfig } from "@prism/config/content";
import "./prism.css";
import "../../Prism/src/components/effects/prism/Prism.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.company}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/brand/prism-logo.png",
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
