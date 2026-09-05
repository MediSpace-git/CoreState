import type { Metadata } from "next";
import { cookies } from "next/headers";
import { fontVariables } from "@/lib/fonts";
import {
  SITE_NAME,
  getCanonicalOrigin,
  homeSeo,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getCanonicalOrigin()),
  title: {
    default: homeSeo.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: homeSeo.description,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/brand/corestateLogoLight.png", type: "image/png" }],
    apple: "/brand/corestateLogoLight.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: homeSeo.title,
    description: homeSeo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const saved = (await cookies()).get("corestate-theme")?.value;
  const themeClass = saved === "dark" ? "dark" : saved === "light" ? "light" : "";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} js h-full antialiased${themeClass ? ` ${themeClass}` : ""}`}
      {...(saved === "dark" || saved === "light"
        ? { style: { colorScheme: saved } }
        : {})}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <noscript>
          <style>
            {`.js [data-reveal],.js [data-stagger],.js [data-field],.js [data-eco-phase],.js [data-hero-copy]{opacity:1!important;transform:none!important}`}
          </style>
        </noscript>
        <div className="page-grid hidden lg:block" aria-hidden="true">
          <span />
        </div>
        {children}
      </body>
    </html>
  );
}
