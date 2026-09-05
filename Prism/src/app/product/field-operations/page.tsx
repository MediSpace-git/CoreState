import { fieldOperationsPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.fieldOperations);

export default function Page() {
  return (
    <FeaturePage
      hero={fieldOperationsPage.hero}
      features={fieldOperationsPage.features}
      workflow={fieldOperationsPage.workflow}
      note={fieldOperationsPage.note}
      crumbs={[...prismCrumbs.fieldOperations]}
    />
  );
}
