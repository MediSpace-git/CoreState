import type { Metadata } from "next";
import { fieldSalesPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";

export const metadata: Metadata = {
  title: fieldSalesPage.title,
  description: fieldSalesPage.description,
};

export default function Page() {
  return (
    <FeaturePage
      hero={fieldSalesPage.hero}
      features={fieldSalesPage.features}
      workflow={fieldSalesPage.workflow}
      note={fieldSalesPage.note}
    />
  );
}
