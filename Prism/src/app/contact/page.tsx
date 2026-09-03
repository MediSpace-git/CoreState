import type { Metadata } from "next";
import { contactPage } from "@prism/config/content";
import { ContactPage } from "@prism/features/contact/ContactPage";

export const metadata: Metadata = {
  title: contactPage.title,
  description: contactPage.description,
};

export default function Page() {
  return <ContactPage />;
}
