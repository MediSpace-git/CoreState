import type { Metadata } from "next";
import { cookies } from "next/headers";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoreState — Software Products & Solutions",
  description:
    "CoreState designs and builds software products and digital solutions that connect people, processes, data, and operations.",
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
          <style>{`.js [data-reveal],.js [data-stagger],.js [data-field]{opacity:1}`}</style>
        </noscript>
        <div className="page-grid hidden lg:block" aria-hidden="true">
          <span />
        </div>
        {children}
      </body>
    </html>
  );
}
