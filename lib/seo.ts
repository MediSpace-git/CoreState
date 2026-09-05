import type { Metadata } from "next";

/** Public production origin. Override with NEXT_PUBLIC_SITE_URL (no trailing slash). */
export const PRODUCTION_ORIGIN = "https://corestateai.com";

export const SITE_NAME = "CoreState";
export const SITE_TAGLINE = "Software products and solutions";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
};

function trimSlash(url: string) {
  return url.replace(/\/$/, "");
}

/** Canonical origin for metadata, sitemap, robots, and JSON-LD. */
export function getCanonicalOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return trimSlash(fromEnv);
  return PRODUCTION_ORIGIN;
}

export function absoluteUrl(path = "/"): string {
  const origin = getCanonicalOrigin();
  if (!path || path === "/") return origin;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${trimSlash(normalized)}`;
}

/**
 * Index production. Keep preview/staging out of Google with meta robots
 * (and robots.txt disallow on non-production). Set SEO_NOINDEX=true to force.
 */
export function shouldIndex(): boolean {
  if (process.env.SEO_NOINDEX === "true") return false;
  if (process.env.VERCEL_ENV === "preview") return false;
  return true;
}

export function indexRobots(): NonNullable<Metadata["robots"]> {
  if (!shouldIndex()) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageSeo & { noIndex?: boolean }): Metadata {
  const url = absoluteUrl(path);
  const robots = noIndex
    ? {
        index: false as const,
        follow: false as const,
        googleBot: { index: false as const, follow: false as const },
      }
    : indexRobots();
  const ogImagePath = path.startsWith("/prism")
    ? "/prism/opengraph-image"
    : "/opengraph-image";

  return {
    title: { absolute: title },
    description,
    alternates: noIndex ? undefined : { canonical: url },
    robots,
    openGraph: {
      title,
      description,
      url: noIndex ? undefined : url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: absoluteUrl(ogImagePath),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const homeSeo: PageSeo = {
  path: "/",
  title: "Custom Software & Field Operations | CoreState",
  description:
    "CoreState designs custom software and products that connect people, processes, data, and operations, including Prism for equipment-service companies.",
};

export const privacySeo: PageSeo = {
  path: "/privacy",
  title: "Website Privacy Policy | CoreState",
  description:
    "How the CoreState marketing website uses a theme cookie, what we collect from inquiries, and where Prism product privacy terms live.",
};

export const termsSeo: PageSeo = {
  path: "/terms",
  title: "Website Terms of Use | CoreState",
  description:
    "Terms for using the CoreState marketing website. Prism product use is covered separately by MediVast Solutions on the Prism pages.",
};

export const notFoundSeo: PageSeo = {
  path: "/",
  title: "Page not found | CoreState",
  description: "That URL is not a page on CoreState. Return home or open the Prism product site.",
};

export const prismSeo = {
  home: {
    path: "/prism",
    title: "Prism Field Operations Platform | CoreState",
    description:
      "Prism is a field-operations system for equipment-service companies. Engineers work from a phone; HQ runs jobs, assets, and quotes from a console.",
  },
  product: {
    path: "/prism/product",
    title: "Prism Product: App & Console | CoreState",
    description:
      "See how Prism’s mobile app and web console cover field operations, workforce, assets, and field sales for equipment-service companies in one tenant.",
  },
  fieldOperations: {
    path: "/prism/product/field-operations",
    title: "Prism Field Operations Software | CoreState",
    description:
      "Turn a customer request into a signed Prism service record: WhatsApp or QR intake, mobile assignment, timers, photos, signatures, and PDF history.",
  },
  workforce: {
    path: "/prism/product/workforce",
    title: "Prism Workforce & Attendance | CoreState",
    description:
      "Prism workforce tools show who punched in, GPS-backed location while on duty, travel history, and expense claims waiting for finance review.",
  },
  assets: {
    path: "/prism/product/assets",
    title: "Prism Asset & Contract Tracking | CoreState",
    description:
      "Keep serials, sites, and PM, CMC, and AMC dates in one Prism install base, with due-date tickets and QR labels for equipment-service teams.",
  },
  fieldSales: {
    path: "/prism/product/field-sales",
    title: "Prism Field Sales & Quotes | CoreState",
    description:
      "Capture field leads, competitor equipment, and machine quotes in Prism during the same site visit—then run the pipeline and approvals from HQ.",
  },
  security: {
    path: "/prism/security",
    title: "Prism Security & Tenant Isolation | CoreState",
    description:
      "How Prism isolates each company as a tenant: session-scoped data, role gates, engineer device sessions, and no shared inbox between customers.",
  },
  requestDemo: {
    path: "/prism/request-demo",
    title: "Request a Prism Product Demo | CoreState",
    description:
      "Request a Prism walkthrough on the same mobile app and console your team would use—attendance, job close-out, install base, and a field lead.",
  },
  contact: {
    path: "/prism/contact",
    title: "Contact MediVast about Prism | CoreState",
    description:
      "Contact MediVast Solutions about Prism—email, phone, and the Jaipur office—to request a walkthrough or ask about a tenant for your service team.",
  },
  privacy: {
    path: "/prism/privacy",
    title: "Prism Website Privacy Policy | CoreState",
    description:
      "How MediVast Solutions handles information collected on the public Prism website, including demo and contact inquiries. Tenant app privacy is separate.",
  },
  terms: {
    path: "/prism/terms",
    title: "Prism Website Terms of Use | CoreState",
    description:
      "Terms for using the public Prism website operated by MediVast Solutions. Tenant app use is governed by that customer’s agreement, not this page alone.",
  },
} as const satisfies Record<string, PageSeo>;

export const indexableRoutes: { path: string; priority: number }[] = [
  { path: homeSeo.path, priority: 1 },
  { path: prismSeo.home.path, priority: 0.9 },
  { path: prismSeo.product.path, priority: 0.8 },
  { path: prismSeo.fieldOperations.path, priority: 0.8 },
  { path: prismSeo.workforce.path, priority: 0.8 },
  { path: prismSeo.assets.path, priority: 0.8 },
  { path: prismSeo.fieldSales.path, priority: 0.8 },
  { path: prismSeo.security.path, priority: 0.7 },
  { path: prismSeo.requestDemo.path, priority: 0.6 },
  { path: prismSeo.contact.path, priority: 0.6 },
  { path: privacySeo.path, priority: 0.3 },
  { path: termsSeo.path, priority: 0.3 },
  { path: prismSeo.privacy.path, priority: 0.3 },
  { path: prismSeo.terms.path, priority: 0.3 },
];
