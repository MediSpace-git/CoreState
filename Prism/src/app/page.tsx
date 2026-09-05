import { HomePage } from "@prism/features/home";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.home);

export default function Page() {
  return <HomePage />;
}
