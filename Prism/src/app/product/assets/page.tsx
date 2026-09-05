import { assetsPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.assets);

export default function Page() {
  return (
    <FeaturePage
      hero={assetsPage.hero}
      features={assetsPage.features}
      workflow={assetsPage.workflow}
      note={assetsPage.note}
      crumbs={[...prismCrumbs.assets]}
    />
  );
}
