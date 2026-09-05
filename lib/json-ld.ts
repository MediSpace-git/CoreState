import { companyContact, siteConfig } from "@prism/config/content";
import {
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  getCanonicalOrigin,
  homeSeo,
} from "@/lib/seo";

export type Crumb = { name: string; href: string };

const coreStateHome: Crumb = { name: "CoreState", href: "/" };
const prismHome: Crumb = { name: "Prism", href: "/prism" };
const prismProduct: Crumb = { name: "Product", href: "/prism/product" };

export const prismCrumbs = {
  home: [coreStateHome, prismHome],
  product: [coreStateHome, prismHome, prismProduct],
  fieldOperations: [
    coreStateHome,
    prismHome,
    prismProduct,
    { name: "Field operations", href: "/prism/product/field-operations" },
  ],
  workforce: [
    coreStateHome,
    prismHome,
    prismProduct,
    { name: "Workforce", href: "/prism/product/workforce" },
  ],
  assets: [
    coreStateHome,
    prismHome,
    prismProduct,
    { name: "Assets", href: "/prism/product/assets" },
  ],
  fieldSales: [
    coreStateHome,
    prismHome,
    prismProduct,
    { name: "Field sales", href: "/prism/product/field-sales" },
  ],
  security: [
    coreStateHome,
    prismHome,
    { name: "Security", href: "/prism/security" },
  ],
  requestDemo: [
    coreStateHome,
    prismHome,
    { name: "Request a demo", href: "/prism/request-demo" },
  ],
  contact: [
    coreStateHome,
    prismHome,
    { name: "Contact", href: "/prism/contact" },
  ],
  privacy: [
    coreStateHome,
    prismHome,
    { name: "Privacy", href: "/prism/privacy" },
  ],
  terms: [
    coreStateHome,
    prismHome,
    { name: "Terms", href: "/prism/terms" },
  ],
} as const satisfies Record<string, Crumb[]>;

function orgId() {
  return `${getCanonicalOrigin()}/#organization`;
}

function websiteId() {
  return `${getCanonicalOrigin()}/#website`;
}

export function coreStateGraph() {
  const origin = getCanonicalOrigin();
  const logo = `${origin}/brand/corestateLogoLight.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId(),
        name: SITE_NAME,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: logo,
        },
        description: homeSeo.description,
        slogan: SITE_TAGLINE,
      },
      {
        "@type": "WebSite",
        "@id": websiteId(),
        name: SITE_NAME,
        url: origin,
        description: homeSeo.description,
        inLanguage: "en",
        publisher: { "@id": orgId() },
      },
    ],
  };
}

export function prismSoftwareJsonLd() {
  const url = absoluteUrl("/prism");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android",
    url,
    description: siteConfig.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.company,
      url,
    },
  };
}

export function mediVastOrganizationJsonLd() {
  const url = absoluteUrl("/prism/contact");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company,
    url: absoluteUrl("/prism"),
    email: companyContact.email,
    telephone: companyContact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "151 Ground Floor, Road No 01, Shanti Nagar, Near CK Birla Hospital",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302018",
      addressCountry: "IN",
    },
    areaServed: companyContact.region,
    contactPoint: {
      "@type": "ContactPoint",
      email: companyContact.email,
      telephone: companyContact.phone,
      contactType: "sales",
      url,
    },
  };
}

export function breadcrumbListJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : absoluteUrl(item.href),
    })),
  };
}
