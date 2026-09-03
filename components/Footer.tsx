import Logo from "@/components/Logo";
import { nav, products, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-surface" aria-label="Footer">
      <div className="container-x grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Software products and digital solutions that connect people,
            processes, data, and operations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h3 className="section-label">
              Site
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-label">
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.url ?? "#products"}
                    {...(product.url &&
                    (product.newTab || /^https?:\/\//.test(product.url))
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-label">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-8">
          <p className="font-mono text-[11px] tracking-[0.14em] text-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            Software · Products · Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
