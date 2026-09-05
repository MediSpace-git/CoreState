import { productOverview } from "@prism/config/content";
import { ProductOverviewPage } from "@prism/features/product/ProductOverviewPage";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.product);

export default function Page() {
  return <ProductOverviewPage />;
}
