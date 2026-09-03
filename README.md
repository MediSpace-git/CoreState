# CoreState — Corporate Website

Single-page corporate website for CoreState, a software products & solutions
company. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and
GSAP (ScrollTrigger + DrawSVG).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — layout, page assembly, global styles / design tokens
- `components/` — one component per section (Navbar, Hero, Products, …)
- `lib/data.ts` — all site content (products, solutions, industries, contact)
- `lib/gsap.ts` — shared GSAP setup and plugin registration
- `lib/useReveal.ts` — shared scroll-reveal motion hook

## Editing content

All copy and lists live in `lib/data.ts`:

- **Add a product** — add an object to the `products` array; the Products
  section and footer render it automatically. Set `url` to the product's
  external site (the Prism URL is currently a placeholder — set it there).
- **Contact details** — fill in `site.contact`; fields left `null` are not
  rendered anywhere.

## Motion & accessibility

- All animation respects `prefers-reduced-motion`; the pinned scroll
  experience falls back to a static layout.
- Content is visible without JavaScript (reveal styles are gated on a `js`
  class set at runtime).
