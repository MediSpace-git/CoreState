import { SiteFooter } from "@prism/components/layout/SiteFooter";
import { SiteHeader } from "@prism/components/layout/SiteHeader";

type Props = {
  children: React.ReactNode;
};

export function SiteShell({ children }: Props) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
