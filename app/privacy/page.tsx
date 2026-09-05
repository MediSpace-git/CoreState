import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata, privacySeo } from "@/lib/seo";

export const metadata = pageMetadata(privacySeo);

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <article className="container-x section-y max-w-2xl">
          <p className="section-label">Legal</p>
          <h1 className="mt-6 text-display font-semibold tracking-tight text-fg">
            Privacy policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated 5 September 2026</p>
          <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted">
            <p>
              This page covers the public CoreState marketing website at
              www.corestateai.com. It is not the privacy notice for a signed-in
              Prism tenant.
            </p>
            <p>
              The site stores a <code className="text-fg">corestate-theme</code>{" "}
              cookie so your light or dark preference can persist. We do not use
              that cookie to identify you across other sites.
            </p>
            <p>
              The homepage inquiry form does not create an account. If a
              CoreState contact email is published, messages you choose to send
              go to that address. Until then, product inquiries should use the{" "}
              <a href="/prism/contact" className="text-fg underline underline-offset-4">
                Prism contact page
              </a>
              .
            </p>
            <p>
              Prism, the field-operations product, is described on this domain
              under /prism. How MediVast Solutions handles Prism website
              inquiries is stated in the{" "}
              <a href="/prism/privacy" className="text-fg underline underline-offset-4">
                Prism privacy policy
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
