import { DemoPage } from "@prism/features/demo/DemoPage";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.requestDemo);

export default function Page() {
  return <DemoPage />;
}
