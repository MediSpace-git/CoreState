import { companyContact, siteConfig, termsPage } from "@prism/config/content";
import { LegalPage } from "@prism/features/legal/LegalPage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.terms);

export default function Page() {
  return (
    <LegalPage
      title={termsPage.title}
      updated={termsPage.updated}
      crumbs={[...prismCrumbs.terms]}
    >
      <p>
        The public website describes Prism, the field-operations product of {siteConfig.company}.
        Use of a tenant (mobile app or console) is governed by that customer’s agreement, not this
        page alone.
      </p>
      <p>
        Information on this site is limited to capabilities that exist in the shipping product. It
        is not a warranty of uptime, certifications, or features that are still marked as coming
        soon inside the application.
      </p>
      <p>
        Demo requests are inquiries, not an order. {siteConfig.company} may decline or reschedule a
        walkthrough.
      </p>
      <p>
        Contact: {companyContact.email}, {companyContact.phone}. {companyContact.address}.
      </p>
    </LegalPage>
  );
}
