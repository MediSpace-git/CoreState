import { securityPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.security);

export default function Page() {
  return (
    <FeaturePage
      hero={securityPage.hero}
      features={securityPage.features}
      workflow={securityPage.workflow}
      note={securityPage.note}
      crumbs={[...prismCrumbs.security]}
    />
  );
}
