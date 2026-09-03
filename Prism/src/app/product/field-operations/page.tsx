import type { Metadata } from "next";
import { fieldOperationsPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";

export const metadata: Metadata = {
  title: fieldOperationsPage.title,
  description: fieldOperationsPage.description,
};

export default function Page() {
  return (
    <FeaturePage
      hero={fieldOperationsPage.hero}
      features={fieldOperationsPage.features}
      workflow={fieldOperationsPage.workflow}
      note={fieldOperationsPage.note}
    />
  );
}
