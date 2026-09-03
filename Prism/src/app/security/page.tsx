import type { Metadata } from "next";
import { securityPage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";

export const metadata: Metadata = {
  title: securityPage.title,
  description: securityPage.description,
};

export default function Page() {
  return (
    <FeaturePage
      hero={securityPage.hero}
      features={securityPage.features}
      workflow={securityPage.workflow}
      note={securityPage.note}
    />
  );
}
