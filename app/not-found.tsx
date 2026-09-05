import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFoundSeo } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: notFoundSeo.title },
  description: notFoundSeo.description,
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col justify-center">
        <div className="container-x section-y max-w-2xl">
          <p className="section-label">404</p>
          <h1 className="mt-6 text-display font-semibold tracking-tight text-fg">
            This page is not on CoreState.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            The URL may be mistyped or the page may have moved. The homepage and
            Prism product pages are the public site.
          </p>
          <p className="mt-8 flex flex-wrap gap-6 text-sm">
            <a href="/" className="text-fg underline underline-offset-4">
              CoreState home
            </a>
            <a href="/prism" className="text-muted underline underline-offset-4">
              Prism field operations
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
