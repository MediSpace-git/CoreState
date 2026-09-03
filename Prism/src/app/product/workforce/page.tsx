import type { Metadata } from "next";
import { workforcePage } from "@prism/config/content";
import { FeaturePage } from "@prism/features/product/FeaturePage";

export const metadata: Metadata = {
  title: workforcePage.title,
  description: workforcePage.description,
};

export default function Page() {
  return (
    <FeaturePage
      hero={workforcePage.hero}
      features={workforcePage.features}
      workflow={workforcePage.workflow}
      note={workforcePage.note}
    />
  );
}
