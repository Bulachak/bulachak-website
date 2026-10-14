# Bulachak — `bulachak.com`

**A future we build together · Будущее, которое мы строим вместе · Бергә төзи торган киләчәк**

Production website, operational diagnostic platform, and founder work archive for **Bulachak** (`https://bulachak.com`), founded by **Kamilla Gafurzianova, OLY**.

> 📖 **Architecture & Rebuild Documentation:**
> - **[`docs/ARCHITECTURE_AND_CURRENT_STATE.md`](./docs/ARCHITECTURE_AND_CURRENT_STATE.md)** — Complete architectural map, flattened canonical route/API inventory, Google Sheets CRM schema, and design guardrails.
> - **[`docs/REBUILD_PLAN_AND_CHANGELOG.md`](./docs/REBUILD_PLAN_AND_CHANGELOG.md)** — Detailed `/grill-me` design decisions (D1–D6) and complete file-by-file change log of the October 2026 platform rebuild.

Bulachak connects three mutually reinforcing branches grounded in the **Emerald Pasture** philosophy of co-opetition:

1. **A4A · Agents 4 Athletes** — Practical digital operations, AI-native back-office workflows, and venture support for sports clubs, academies, coaches, and transitioning athletes.
2. **P4P · Parafencing 4 Progress** — Adaptive-fencing nonprofit initiative in development, expanding access to equipment, specialized coaching, and competitive pathways (supported by an unconditional 4% gross revenue pledge from A4A).
3. **I4I · Immigrant 4 Immigrant** — Community kinship, cultural continuity, and practical operational support for immigrant founders and families.

---

## Architecture & Tech Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack), React 19, TypeScript 5.5, Tailwind CSS 4.
- **Hosting & Deployment:** Vercel (`https://bulachak.com`, project `milamanzareks-projects/a4a-p4p`, GitHub repo `Bulachak/bulachak-website`).
- **Full Trilingual Editions (`114` Canonical Routes):** Published in **English (`en`)**, **Russian (`ru`)**, and **Tatar (`tt`)** across all 38 routes (`38 × 3 = 114` URLs in `/sitemap.xml`): homepage (`/`, `/ru`, `/tt`), branch stories (`/a4a`, `/p4p`, `/i4i`), About (`/about`), Founder profile (`/founder`), Privacy/Terms (`/privacy`, `/terms`), 24 case studies (`/work` & `/[slug]`), and all 5 action & intake portals (`/audit`, `/pricing`, `/intake/athlete`, `/intake/federation`, `/webinar`).
- **Permanent `308` Legacy Redirects:** All historical `/portfolio`, `/portfolio/*`, and `/[lang]/portfolio/*` URLs permanently redirect (`308`) to their flattened root equivalents (`/` and `/[lang]/*`), while `/portfolio/content.md` remains active for machine-readable Markdown discovery.
- **Lead Capture & CRM Pipeline (Google Sheets + Apps Script):**
  - All five interactive forms forward structured rows and dispatch automated Gmail founder alerts + visitor confirmation emails via a bound Google Apps Script Web App (`GOOGLE_SHEETS_WEBHOOK_URL`):
    1. **YC Silent Launch Lead Capture (`POST /api/launch-leads`)** → `Silent_Launch_Leads` tab
    2. **Federation & Adaptive Program Briefing (`POST /api/launch-leads` from `/intake/federation`)** → `Silent_Launch_Leads` tab
    3. **3-Minute Operational Leak Audit (`POST /api/audit` from `/audit`)** → `Audit_Diagnostics` tab
    4. **I4I × A4A Live Masterclass Registration (`POST /api/webinar/register` from `/webinar`)** → `Webinar_Registrations` tab
    5. **Athlete & Coach Venture Intake (`POST /api/athlete-leads` from `/intake/athlete`)** → `Athlete_Intake` tab
  - Bound Google Spreadsheet: [Bulachak — Silent Launch & Intake CRM (bulachak.com)](https://docs.google.com/spreadsheets/d/19f83qdQCUhe4dWvOLSWmc5_xBNLmfUm8I4_kk-L5r2o/edit) (Apps Script source tracked in [`scripts/google-apps-script/`](./scripts/google-apps-script/)).
  - Optional Postgres persistence via Prisma 6 (`prisma/schema/`) is also supported whenever `DATABASE_URL` is configured.

---

## Key Routes (Flattened Canonical Hierarchy)

Every route below is served in English at `/<slug>`, Russian at `/ru/<slug>`, and Tatar at `/tt/<slug>`:

| Canonical Route (`EN` / `RU` / `TT`) | Purpose |
|---|---|
| `/`, `/ru`, `/tt` | **Bulachak Homepage (YC Silent Launch)** — Trilingual hero, 3 branch cards (`A4A`, `P4P`, `I4I`), 4% reciprocity flywheel, selected founder projects, inline 10-second Early Access & Partner Capture Form, and direct contact strip (`kgafurzianova@gmail.com` + Founder LinkedIn). |
| `/about`, `/founder`, `/a4a`, `/p4p`, `/i4i` | **Trilingual Story & Branch Pages** — Emerald Pasture philosophy, Founder biography & verified credentials, and dedicated branch narratives with tailored `#branch-actions` diagnostic/intake panels at the bottom of `/a4a`, `/p4p`, and `/i4i`. |
| `/work` & `/[case-slug]` | **Founder Case Catalogue** — 24 documented case studies in English, Russian, and Tatar with capability filtering and search. |
| `/audit` (`/ru/audit`, `/tt/audit`) | **3-Minute Operational Leak Audit** — Trilingual interactive diagnostic calculator scoring operational readiness (0–100), primary bottleneck, and recommended implementation tier, with URL query pre-filling (`?name=...&email=...&org=...`). |
| `/pricing` (`/ru/pricing`, `/tt/pricing`) | **A4A Service Delivery Pillars** — Trilingual engagement architecture (*15-Min Ops Leak Audit*, *48-Hour Quick-Fix Sprint*, and *AI-Native Back-Office Retainer*), 6-vertical playbooks, 10-Hour Operational Relief Guarantee, and 4% P4P pledge. |
| `/intake/athlete` (`/ru/intake/athlete`, `/tt/intake/athlete`) | **Athlete & Coach Venture Intake (`A4A`)** — Trilingual 5-field operational intake form for athlete-founders, head coaches, and academy directors (`AthleteIntakeForm`). |
| `/intake/federation` (`/ru/intake/federation`, `/tt/intake/federation`) | **Federation & Adaptive Program Briefing (`A4A × P4P`)** — Trilingual 5-field institutional briefing form for NGBs, municipal departments, and adaptive parafencing programs (`FederationIntakeForm`). |
| `/webinar` (`/ru/webinar`, `/tt/webinar`) | **Evergreen I4I × A4A Operational Masterclass** — Trilingual workshop portal featuring Anvar Tuykin & Kamilla Gafurzianova, OLY, live cohort registration, instant `.ics` calendar file download, and interactive FAQ concierge. |
| `/portfolio/content.md` & `/llms.txt` | **AI & Plain-Text Discovery** — Machine-readable Markdown editions (`?lang=en\|ru\|tt&slug=...`) and LLM index. |

---

## Documentation Suite

- **[`docs/ARCHITECTURE_AND_CURRENT_STATE.md`](./docs/ARCHITECTURE_AND_CURRENT_STATE.md)** — **Start here.** Canonical baseline of current production architecture, route & API inventory, editorial guardrails, and CRM schema.
- **[`docs/REBUILD_PLAN_AND_CHANGELOG.md`](./docs/REBUILD_PLAN_AND_CHANGELOG.md)** — Detailed `/grill-me` design decisions (D1–D6) and complete file-by-file change log of the October 2026 rebuild.
- **[`AGENTS.md`](./AGENTS.md)** — Engineering conventions, brand identity constants, trilingual localization rules, and UI/typography invariants.
- **[`docs/drafts/A4A_PRODUCT_DEVELOPMENT_PLAYBOOK.md`](./docs/drafts/A4A_PRODUCT_DEVELOPMENT_PLAYBOOK.md)** — Commercial 3-pillar framework, risk reversal guarantee, and silent launch log.
- **[`docs/portfolio/BUILD-REPORT.md`](./docs/portfolio/BUILD-REPORT.md)** — Historical verification report for the trilingual portfolio and case study catalogue.
- **[`docs/archive/`](./docs/archive/)** — Archived September 2026 strategy blueprints, pitch deck assessments, and pilot evidence dossiers.

---

## Environment Variables

Defined and validated in [`src/lib/env.ts`](./src/lib/env.ts):

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | No | `https://bulachak.com` | Public canonical origin for SEO metadata, OpenGraph, `robots.txt`, and `sitemap.xml`. |
| `GOOGLE_SHEETS_WEBHOOK_URL` | No (Configured in Prod) | — | Deployed Google Apps Script Web App `/exec` URL that appends leads to Google Sheets and sends Gmail notifications. |
| `DATABASE_URL` | No | — | Optional PostgreSQL connection string for Prisma persistence. |
| `SEO_INDEXABLE` | No | — | Set to `true` in production to allow search engine indexing in `robots.txt`. |

---

## Local Development & Verification

```bash
npm install
npm run dev          # Starts local dev server at http://localhost:3000
npm run typecheck    # TypeScript strict check (tsc --noEmit)
npm run lint         # Biome lint & import boundary check
npm run test         # Vitest unit & integration test suite (13 suites, 94 tests)
npm run build        # Production Next.js build
```

### Updating the Google Apps Script Webhook

The Google Apps Script project ([`scripts/google-apps-script/Code.gs`](./scripts/google-apps-script/Code.gs) and [`appsscript.json`](./scripts/google-apps-script/appsscript.json)) is bound to the Bulachak CRM Google Sheet. To push updates via the Google Workspace CLI (`gws`):

```bash
gws script +push --script 1i8zZqaDxLUd8VIr1uo42jtqkvN_JXZxQ-Q7RdVlk-ZZPl7Q-rsWX8Fb5 --dir ./scripts/google-apps-script
```

---

## License

MIT. See [LICENSE](./LICENSE).
