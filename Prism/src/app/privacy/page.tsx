import { companyContact, privacyPage, siteConfig } from "@prism/config/content";
import { LegalPage } from "@prism/features/legal/LegalPage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.privacy);

export default function Page() {
  return (
    <LegalPage
      title={privacyPage.title}
      updated={privacyPage.updated}
      crumbs={[...prismCrumbs.privacy]}
    >
      <p>
        This page covers the public Prism website operated by {siteConfig.company}. It is not a
        substitute for the privacy terms shown inside a customer’s tenant app.
      </p>
      <p>
        If you submit a demo request, we receive the name, company, email, phone, and message you
        enter so we can reply. That message is sent through your email client to{" "}
        {companyContact.email}.
      </p>
      <p>
        The website does not create a Prism user account. Product data (attendance, machines, leads)
        lives in the tenant that signs in to the Prism application, not on this marketing site.
      </p>
      <p>
        Questions: {companyContact.email} or {companyContact.phone}. Office: {companyContact.address}.
      </p>
    </LegalPage>
  );
}
