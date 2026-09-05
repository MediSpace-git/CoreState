import { ContactPage } from "@prism/features/contact/ContactPage";
import { pageMetadata, prismSeo } from "@/lib/seo";

export const metadata = pageMetadata(prismSeo.contact);

export default function Page() {
  return <ContactPage />;
}
