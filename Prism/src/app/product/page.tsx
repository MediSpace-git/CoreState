import type { Metadata } from "next";
import { productOverview } from "@prism/config/content";
import { ProductOverviewPage } from "@prism/features/product/ProductOverviewPage";

export const metadata: Metadata = {
  title: productOverview.title,
  description: productOverview.description,
};

export default function Page() {
  return <ProductOverviewPage />;
}
