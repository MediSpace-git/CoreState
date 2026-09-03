# Prism marketing site

## Overview

Public Next.js site that describes the Prism product. Prism is the product name for the existing field-operations system (mobile + console). MediSpace is not a second product.

The site is tenant-free and public. It does not authenticate users or accept `tenantId` from the browser for authorization.

## Pages

| Route | Feature module | Purpose |
|-------|----------------|---------|
| `/` | `features/home/HomePage` | Conversion homepage |
| `/product` | `ProductOverviewPage` | Two surfaces + four pillars |
| `/product/*` | `FeaturePage` | Operations, workforce, assets, sales |
| `/security` | `FeaturePage` | Tenancy and roles |
| `/request-demo` | `DemoPage` + `DemoRequestForm` | Lead form |
| `/contact` | `ContactPage` | Company details |
| `/privacy`, `/terms` | `LegalPage` | Legal |

## Components

| Component | Purpose | Props |
|-----------|---------|-------|
| SiteShell | Header + main + footer | children |
| FeaturePage | Shared product-page layout | hero, features, workflow, note |
| DemoRequestForm | Validated demo mailto | none |
| ConsoleMockup / PhoneMockup | UI chrome of real modules | none |

## Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| useSectionTimeline | GSAP scroll-in for sections | none (side effect) |

## State flow

Homepage is static copy from `src/config/content.ts`. Demo form validates locally, then opens `mailto:` to the company inbox. No product API is called.

## API calls

None. This site does not call the MediSpace/Prism backend.

## Edge cases handled

- Empty / oversized demo fields
- Invalid email
- Mobile navigation
- `prefers-reduced-motion` on GSAP and hero CSS
- Claims that must not appear: customer portal, dedicated instance, web dispatch console, in-app QR camera scan, analytics BI, certifications

## How to use

```tsx
import { HomePage } from "@/features/home";
<HomePage />
```
