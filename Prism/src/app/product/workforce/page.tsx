import { workforcePage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";
import { prismCrumbs } from "@/lib/json-ld";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.workforce);

export default function Page() {
  return (
    <FeaturePage
      hero={workforcePage.hero}
      features={workforcePage.features}
      workflow={workforcePage.workflow}
      note={workforcePage.note}
      crumbs={[...prismCrumbs.workforce]}
    />
  );
}
