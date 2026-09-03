# Prism website

Public marketing site for **Prism**, the field-operations product (same application formerly referred to as MediSpace). The product is the mobile app plus the web console. This folder is only the public website.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Path | Purpose |
|------|---------|
| `/` | Homepage: problem, two surfaces, capabilities, workflow, tenancy |
| `/product` | Product overview |
| `/product/field-operations` | Intake, assignment, digital close-out |
| `/product/workforce` | Attendance, map, expenses |
| `/product/assets` | Install base, PM/CMC/AMC |
| `/product/field-sales` | Self-visit, leads, quotes |
| `/security` | Tenant isolation and roles |
| `/request-demo` | Demo form (opens email to the company inbox) |
| `/contact` | Company contact |
| `/privacy` · `/terms` | Legal |

Copy lives in `src/config/content.ts`. Claims are limited to capabilities that exist in the shared product.

## Tests

```bash
npm test
npm run lint
npm run build
```
