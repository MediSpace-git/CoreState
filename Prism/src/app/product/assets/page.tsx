import type { Metadata } from "next";
import { assetsPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";

export const metadata: Metadata = {
  title: assetsPage.title,
  description: assetsPage.description,
};

export default function Page() {
  return (
    <FeaturePage
      hero={assetsPage.hero}
      features={assetsPage.features}
      workflow={assetsPage.workflow}
      note={assetsPage.note}
    />
  );
}
