import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata, termsSeo } from "@/lib/seo";

export const metadata = pageMetadata(termsSeo);

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <article className="container-x section-y max-w-2xl">
          <p className="section-label">Legal</p>
          <h1 className="mt-6 text-display font-semibold tracking-tight text-fg">
            Terms of use
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated 5 September 2026</p>
          <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted">
            <p>
              These terms apply to the public CoreState marketing website. They
              do not replace a customer agreement for Prism or any other product
              tenant.
            </p>
            <p>
              The site describes software products and custom work. Copy here is
              not a warranty of uptime, certifications, pricing, or features that
              are not shown as shipping.
            </p>
            <p>
              Prism is a field-operations product operated by MediVast Solutions.
              Use of the public Prism pages, demo requests, and tenant software
              is covered on the{" "}
              <a href="/prism/terms" className="text-fg underline underline-offset-4">
                Prism terms of use
              </a>
              .
            </p>
            <p>
              Questions about this website can start from the{" "}
              <a href="/#contact" className="text-fg underline underline-offset-4">
                CoreState contact section
              </a>{" "}
              or the{" "}
              <a href="/prism/contact" className="text-fg underline underline-offset-4">
                Prism contact page
              </a>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
