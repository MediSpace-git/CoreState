import { SiteShell } from "@prism/components/layout/SiteShell";
import { Capabilities } from "@prism/components/sections/capabilities/Capabilities";
import { Cta } from "@prism/components/sections/cta/Cta";
import { Hero } from "@prism/components/sections/hero";
import { Platform } from "@prism/components/sections/platform/Platform";
import { Problem } from "@prism/components/sections/problem/Problem";
import { Surfaces } from "@prism/components/sections/surfaces/Surfaces";
import { ProductPreview } from "@prism/components/sections/product-preview/ProductPreview";
import { Trust } from "@prism/components/sections/trust/Trust";
import { Workflow } from "@prism/components/sections/workflow/Workflow";

export function HomePage() {
  return (
    <SiteShell>
      <div id="home-sections">
        <Hero />
        <Trust />
        <Problem />
        <Surfaces />
        <ProductPreview />
        <Capabilities />
        <Workflow />
        <Platform />
        <Cta />
      </div>
    </SiteShell>
  );
}
