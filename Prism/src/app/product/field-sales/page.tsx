import { fieldSalesPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.fieldSales);

export default function Page() {
  return (
    <FeaturePage
      hero={fieldSalesPage.hero}
      features={fieldSalesPage.features}
      workflow={fieldSalesPage.workflow}
      note={fieldSalesPage.note}
      crumbs={[...prismCrumbs.fieldSales]}
    />
  );
}
