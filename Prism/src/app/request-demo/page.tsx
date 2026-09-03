import type { Metadata } from "next";
import { demoPage } from "@prism/config/content";
import { DemoPage } from "@prism/features/demo/DemoPage";

export const metadata: Metadata = {
  title: demoPage.title,
  description: demoPage.description,
};

export default function Page() {
  return <DemoPage />;
}
