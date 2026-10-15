---
title: "Bulachak (bulachak.com) — Rebuild Plan, Design Decisions & Detailed Change Log"
created_by: Antigravity
date_created: 2026-10-14
updated_by: Antigravity
last_updated_on: 2026-10-15
status: completed
---

# Bulachak (`bulachak.com`) — Rebuild Plan, Design Decisions & Detailed Change Log

> **Purpose:** This document records:
> 1. All architectural decisions agreed upon during the `/grill-me` design review (**D1–D6**).
> 2. The phase-by-phase engineering log across the YC Silent Launch, Polsia-to-Google-Workspace CRM migration, and Full Platform Rebuild.
> 3. The **Complete 90-File Commit Manifest (`ee938f8`)** accounting for every single file created, modified, moved, or deleted in the repository.
> 4. Production deployment & live HTTP verification logs on `https://bulachak.com`.

---

## 1. Agreed Design Decisions (`/grill-me` Specification)

| ID | Topic | Decision & Rationale |
|---|---|---|
| **D1** | **Canonical URL Hierarchy & Redirects** | **Flatten canonical URLs to the root:** `/`, `/about`, `/work`, `/founder`, `/a4a`, `/p4p`, `/i4i`, `/privacy`, `/terms`, `/[case-slug]`, plus localized `/ru/...` and `/tt/...` editions.<br>**Permanent 308 Redirects:** Redirect all legacy `/portfolio`, `/portfolio/*`, and `/[lang]/portfolio/*` paths (excluding `/portfolio/content.md` for LLM discovery) to their flattened canonical equivalents so no existing links, bookmarks, or search indices break. |
| **D2** | **Trilingual Parity (`EN / RU / TT`) Across Action & Intake Pages** | Localize `/audit`, `/pricing`, `/intake/athlete`, `/intake/federation`, and `/webinar` into all three published languages (`en`, `ru`, `tt` under `/ru/audit`, `/tt/audit`, etc.) and update `localizePortfolioHref()` so the header `EN / RU / TT` selector seamlessly switches the language of the current page everywhere on the site. |
| **D3** | **Branch Page (`/a4a`, `/p4p`, `/i4i`) Funnel Integration** | Keep `/a4a`, `/p4p`, and `/i4i` as clean editorial story pages and add a tailored editorial action panel (`#branch-actions`) at the bottom of each branch:<br>• **A4A** → `/audit` (*3-Min Operational Audit*), `/intake/athlete` (*Athlete & Coach Venture Intake*), `/pricing` (*3 Engagement Pillars*)<br>• **P4P** → `/intake/federation` (*Federation & Adaptive Program Briefing*), `/audit` (*Operational Diagnostic*)<br>• **I4I** → `/webinar` (*I4I × A4A Operational Masterclass*), `/#connect` (*Direct Inquiry*) |
| **D4** | **Visual Design Unification & Root CSS Consolidation** | Restyle `/pricing`, `/audit`, `/intake/athlete`, `/intake/federation`, and `/webinar` into the Bulachak editorial design system (`.portfolio-container`, `.story-header`, `.case-evidence`, warm paper surfaces, architectural 3px/6px/10px corners) and promote the Emerald Pasture palette to the root `:root` / `.dark` theme in `src/app/globals.css`. |
| **D5** | **Evergreen Trilingual `/webinar` Portal** | Convert `/webinar` (and `/ru/webinar`, `/tt/webinar`) from a Russian-only hardcoded Oct 15 page into a trilingual (`en`, `ru`, `tt`) evergreen **I4I × A4A Operational Masterclass & Workshop** page supporting session/cohort registration, `.ics` calendar downloads, and interactive FAQ concierge via `POST /api/webinar/register`. |
| **D6** | **Repository Cleanup & Legacy Scaffolding Removal** | • Delete `/example` (`src/app/(custom)/example/page.tsx`, `src/app/api/example/route.ts`, `src/lib/contracts/example.ts`, `tests/unit/example/contract.test.ts`).<br>• Remove dead `SiteNav` (`src/lib/nav.ts` and `src/components/custom/site-nav.tsx`) so `PortfolioNav` and `PortfolioFooter` are the single canonical header/footer.<br>• Move the 6 loose September 2026 `.md` strategy dossiers from the repository root into `docs/archive/`.<br>• Keep optional Prisma isolated as-is while Google Sheets + Apps Script remains the primary CRM. |

---

## 2. Detailed Phase-by-Phase Engineering Log

### Phase 0 — Polsia Decommissioning, YC Silent Launch & Google Sheets + Apps Script CRM
1. **Complete Polsia Removal:**
   - Deleted `.polsia/installed.json`, `.polsia/overrides.json`, `.polsia/ownership.json`, `polsia.toml`, `src/components/polsia-analytics.tsx`, and `tests/unit/ownership-map.test.ts`.
   - Removed `POLSIA_API_KEY` and Polsia environment variables from [`src/lib/env.ts`](../src/lib/env.ts), [`src/lib/site.ts`](../src/lib/site.ts), [`tests/unit/env-validation.test.ts`](../tests/unit/env-validation.test.ts), and Vercel project environment settings (`production`, `preview`, `development`).
2. **Google Sheets + Apps Script Webhook Backend:**
   - Provisioned Google Sheet [`19f83qdQCUhe4dWvOLSWmc5_xBNLmfUm8I4_kk-L5r2o`](https://docs.google.com/spreadsheets/d/19f83qdQCUhe4dWvOLSWmc5_xBNLmfUm8I4_kk-L5r2o/edit) (*Bulachak — Silent Launch & Intake CRM (bulachak.com)*) with 4 tabs (`Silent_Launch_Leads`, `Audit_Diagnostics`, `Webinar_Registrations`, `Athlete_Intake`).
   - Created bound Google Apps Script project (`1i8zZqaDxLUd8VIr1uo42jtqkvN_JXZxQ-Q7RdVlk-ZZPl7Q-rsWX8Fb5`) tracked in [`scripts/google-apps-script/Code.gs`](../scripts/google-apps-script/Code.gs) and [`scripts/google-apps-script/appsscript.json`](../scripts/google-apps-script/appsscript.json).
   - Created [`src/lib/business/sheets-webhook.ts`](../src/lib/business/sheets-webhook.ts) (`forwardLeadToGoogleSheets`, `escapeHtml`) and wired all 4 write API endpoints (`POST /api/launch-leads`, `POST /api/audit`, `POST /api/webinar/register`, `POST /api/athlete-leads`).
3. **YC Silent Launch Capture & Direct Contact Visibility:**
   - Created [`src/lib/contracts/launch-leads.ts`](../src/lib/contracts/launch-leads.ts), [`src/app/api/launch-leads/route.ts`](../src/app/api/launch-leads/route.ts), and [`src/components/custom/portfolio/silent-launch-form.tsx`](../src/components/custom/portfolio/silent-launch-form.tsx).
   - Added `contactEmail: 'kgafurzianova@gmail.com'` and `auditHref: '/audit'` to [`src/lib/portfolio-brand.ts`](../src/lib/portfolio-brand.ts) and surfaced direct email + LinkedIn links in [`portfolio-home.tsx`](../src/components/custom/portfolio/portfolio-home.tsx) and [`portfolio-nav.tsx`](../src/components/custom/portfolio/portfolio-nav.tsx).

### Phase 1 — Repository Cleanup, Archive Organization & Dead Code Removal (`D6`)
1. **Moved 6 historical September 2026 strategy & pilot dossiers from root into `docs/archive/` (`git mv`):**
   - [`docs/archive/A365_PHASE_3_APPLICATION_PACKAGE.md`](archive/A365_PHASE_3_APPLICATION_PACKAGE.md)
   - [`docs/archive/A4A_Client_Facing_Launch_Blueprint.md`](archive/A4A_Client_Facing_Launch_Blueprint.md)
   - [`docs/archive/A4A_Pitch_Deck_Creative_Assessment_and_Storytelling_Blueprint_2026.md`](archive/A4A_Pitch_Deck_Creative_Assessment_and_Storytelling_Blueprint_2026.md)
   - [`docs/archive/A4A_Revenue_and_Payment_Model_Blueprint_2026.md`](archive/A4A_Revenue_and_Payment_Model_Blueprint_2026.md)
   - [`docs/archive/Engineer_History_MGI_Pilot_Evidence_Dossier.md`](archive/Engineer_History_MGI_Pilot_Evidence_Dossier.md)
   - [`docs/archive/PlayLA_Flag_Football_Pilot_Evidence_Dossier.md`](archive/PlayLA_Flag_Football_Pilot_Evidence_Dossier.md)
2. **Deleted legacy template scaffolding & unused navigation components (`git rm`):**
   - `src/app/(custom)/example/page.tsx`
   - `src/app/api/example/route.ts`
   - `src/lib/contracts/example.ts`
   - `tests/unit/example/contract.test.ts`
   - `src/components/custom/site-nav.tsx`
   - `src/lib/nav.ts`
3. **Updated Root Layout & Sitemap Generation:**
   - [`src/app/layout.tsx`](../src/app/layout.tsx): Mounted `<PortfolioNav />` and `<PortfolioFooter />` directly in the root layout.
   - [`src/app/sitemap.ts`](../src/app/sitemap.ts): Replaced `navItems` dependency with direct `seoRoutes()` generation so `/sitemap.xml` emits all 114 localized canonical routes.

### Phase 2 — Root CSS Consolidation (`D4`)
1. **Updated [`src/app/globals.css`](../src/app/globals.css) and [`src/app/custom-style.css`](../src/app/custom-style.css):**
   - Promoted the **Bulachak Emerald Pasture** palette directly to `:root` and `.dark` (`--background: #f6faf7`, `--foreground: #1d332c`, `--primary: #1f684c` in light mode; `--background: #111c16`, `--foreground: #eef1e7`, `--primary: #91caa7` in dark mode).
   - Set `--radius: 6px` (`--portfolio-radius-badge: 3px`, `--portfolio-radius-control: 6px`, `--portfolio-radius-surface: 10px`) across `:root` to enforce the strict architectural corner standard and zero-pill invariant site-wide.
   - Added `.silent-launch-*` editorial form styling in [`src/app/custom-style.css`](../src/app/custom-style.css).

### Phase 3 — Flattened Canonical URLs, 308 Redirects & Unified Dynamic Routing (`D1`, `D2`)
1. **Updated [`src/lib/portfolio-locale.ts`](../src/lib/portfolio-locale.ts):**
   - Changed `portfolioHref(language, suffix)` to generate flattened canonical paths (`/` and `/about` for `en`; `/ru` and `/ru/about` for `ru`; `/tt` and `/tt/about` for `tt`).
   - Updated `isPortfolioPath(path)` to validate all 38 route slugs across flattened and legacy `/portfolio/*` paths while rejecting unrelated paths (`/health`, `/api/*`, `/fr/portfolio`, `/en/portfolio`).
   - Updated `localizePortfolioHref(href, language)` so switching languages in `<PortfolioNav>` preserves the current page, query string, and hash fragment across every page on `bulachak.com`.
2. **Configured Permanent HTTP `308` Redirects in [`next.user-config.ts`](../next.user-config.ts):**
   - `/portfolio` → `/` (`permanent: true`)
   - `/portfolio/:slug((?!content\\.md$).*)` → `/:slug` (`permanent: true`, preserving `/portfolio/content.md`)
   - `/:lang(ru|tt)/portfolio` → `/:lang` (`permanent: true`)
   - `/:lang(ru|tt)/portfolio/:slug*` → `/:lang/:slug*` (`permanent: true`)
3. **Created Unified Route Handler [`src/app/(custom)/[language]/[[...path]]/page.tsx`](../src/app/(custom)/[language]/[[...path]]/page.tsx) and removed `src/app/(custom)/[language]/portfolio/[[...path]]/page.tsx`:**
   - Serves flattened English root editorial and case-study routes (`/work`, `/about`, `/founder`, `/a4a`, `/p4p`, `/i4i`, `/privacy`, `/terms`, `/[case-slug]`).
   - Serves localized Russian (`/ru/...`) and Tatar (`/tt/...`) home, editorial, case study, and action/intake routes (`/ru/audit`, `/tt/audit`, `/ru/pricing`, `/tt/pricing`, `/ru/webinar`, `/tt/webinar`, `/ru/intake/athlete`, `/tt/intake/athlete`, `/ru/intake/federation`, `/tt/intake/federation`).
   - Updated [`src/app/(custom)/portfolio/page.tsx`](../src/app/(custom)/portfolio/page.tsx) and [`src/app/(custom)/portfolio/[slug]/page.tsx`](../src/app/(custom)/portfolio/[slug]/page.tsx) to invoke `permanentRedirect('/')` and `permanentRedirect('/' + slug)` as server-level defense-in-depth.
4. **Updated Metadata, Sitemap & Structured Data:**
   - [`src/lib/portfolio-metadata.ts`](../src/lib/portfolio-metadata.ts): Added localized metadata definitions (`actionPageMetadataCopy`) for `pricing`, `audit`, `intake/athlete`, `intake/federation`, and `webinar` across `en`, `ru`, and `tt`.
   - [`src/lib/seo-routes.ts`](../src/lib/seo-routes.ts): Added the 5 action routes to the trilingual sitemap matrix (**38 routes × 3 languages = 114 canonical URLs**).
   - [`src/components/custom/portfolio/portfolio-structured-data.tsx`](../src/components/custom/portfolio/portfolio-structured-data.tsx): Updated JSON-LD `@id` and `url` fields to flattened canonical URLs.
   - [`public/llms.txt`](../public/llms.txt): Updated all English, Russian, and Tatar discovery URLs to flattened canonical paths while preserving `/portfolio/content.md?lang={en|ru|tt}`.

### Phase 4 — Branch Pages (`/a4a`, `/p4p`, `/i4i`) Funnel Integration (`D3`)
1. **Updated [`src/components/custom/portfolio/portfolio-story.tsx`](../src/components/custom/portfolio/portfolio-story.tsx):**
   - Added a trilingual (`en`, `ru`, `tt`) `#branch-actions` editorial diagnostic & intake section at the bottom of `/a4a`, `/p4p`, and `/i4i` (above the filtered case studies):
     - **A4A (`/a4a`, `/ru/a4a`, `/tt/a4a`):** Links to `/audit`, `/intake/athlete`, and `/pricing`.
     - **P4P (`/p4p`, `/ru/p4p`, `/tt/p4p`):** Links to `/intake/federation` and `/audit`.
     - **I4I (`/i4i`, `/ru/i4i`, `/tt/i4i`):** Links to `/webinar` and `/#connect`.

### Phase 5 — Visual Design Unification & Full Trilingual Parity Across Action Pages (`D2`, `D4`, `D5`)
1. **Pricing Page (`/pricing`, `/ru/pricing`, `/tt/pricing`):**
   - Created [`src/components/custom/pricing/pricing-view.tsx`](../src/components/custom/pricing/pricing-view.tsx) and updated [`src/app/(custom)/pricing/page.tsx`](../src/app/(custom)/pricing/page.tsx).
2. **Interactive Operational Audit (`/audit`, `/ru/audit`, `/tt/audit`):**
   - Created [`src/components/custom/audit/audit-view.tsx`](../src/components/custom/audit/audit-view.tsx) and updated [`src/app/(custom)/audit/page.tsx`](../src/app/(custom)/audit/page.tsx).
3. **Athlete & Federation Intake Pages (`/intake/athlete`, `/intake/federation`, `/ru/intake/*`, `/tt/intake/*`):**
   - Updated [`src/components/custom/intake/athlete-form.tsx`](../src/components/custom/intake/athlete-form.tsx) and [`src/components/custom/intake/federation-form.tsx`](../src/components/custom/intake/federation-form.tsx), created [`src/components/custom/intake/intake-view.tsx`](../src/components/custom/intake/intake-view.tsx), and updated [`src/app/(custom)/intake/athlete/page.tsx`](../src/app/(custom)/intake/athlete/page.tsx) and [`src/app/(custom)/intake/[track]/page.tsx`](../src/app/(custom)/intake/[track]/page.tsx).
4. **Evergreen I4I × A4A Operational Masterclass (`/webinar`, `/ru/webinar`, `/tt/webinar`):**
   - Created [`src/components/custom/webinar/webinar-view.tsx`](../src/components/custom/webinar/webinar-view.tsx) and updated [`src/app/(custom)/webinar/page.tsx`](../src/app/(custom)/webinar/page.tsx).

---

## 3. Complete 90-File Commit Manifest (`ee938f8`)

Every single file in commit `ee938f80c868f3bd77d85d3068e69a7ac5b68b15` (`90 files changed, 7,216 insertions(+), 3,141 deletions(-)`) is itemized below:

| # | File Path | Action | Category | Summary of Change |
|---:|---|---|---|---|
| 1 | `.polsia/installed.json` | Deleted | Polsia Purge | Removed legacy Polsia template manifest. |
| 2 | `.polsia/overrides.json` | Deleted | Polsia Purge | Removed legacy Polsia override state. |
| 3 | `.polsia/ownership.json` | Deleted | Polsia Purge | Removed legacy Polsia file ownership map. |
| 4 | `polsia.toml` | Deleted | Polsia Purge | Removed legacy Polsia deployment config. |
| 5 | `src/components/polsia-analytics.tsx` | Deleted | Polsia Purge | Removed legacy Polsia analytics script component. |
| 6 | `tests/unit/ownership-map.test.ts` | Deleted | Polsia Purge | Removed legacy Polsia ownership map test. |
| 7 | `src/app/(custom)/example/page.tsx` | Deleted | D6 Cleanup | Removed template `/example` demo page. |
| 8 | `src/app/api/example/route.ts` | Deleted | D6 Cleanup | Removed template `/api/example` demo endpoint. |
| 9 | `src/lib/contracts/example.ts` | Deleted | D6 Cleanup | Removed template `example` Zod contract. |
| 10 | `tests/unit/example/contract.test.ts` | Deleted | D6 Cleanup | Removed template `example` unit test. |
| 11 | `src/components/custom/site-nav.tsx` | Deleted | D6 Cleanup | Removed dead `SiteNav` wrapper in favor of `<PortfolioNav />`. |
| 12 | `src/lib/nav.ts` | Deleted | D6 Cleanup | Removed dead `navItems` array pointing to `/example`. |
| 13 | `src/app/(custom)/[language]/portfolio/[[...path]]/page.tsx` | Deleted | D1 Routing | Replaced by unified `src/app/(custom)/[language]/[[...path]]/page.tsx`. |
| 14 | `docs/archive/A365_PHASE_3_APPLICATION_PACKAGE.md` | Moved (`git mv`) | D6 Archive | Moved from repository root into `docs/archive/`. |
| 15 | `docs/archive/A4A_Client_Facing_Launch_Blueprint.md` | Moved (`git mv`) | D6 Archive | Moved from repository root into `docs/archive/`. |
| 16 | `docs/archive/A4A_Pitch_Deck_Creative_Assessment_and_Storytelling_Blueprint_2026.md` | Moved (`git mv`) | D6 Archive | Moved from repository root into `docs/archive/`. |
| 17 | `docs/archive/A4A_Revenue_and_Payment_Model_Blueprint_2026.md` | Moved (`git mv`) | D6 Archive | Moved from repository root into `docs/archive/`. |
| 18 | `docs/archive/Engineer_History_MGI_Pilot_Evidence_Dossier.md` | Moved (`git mv`) | D6 Archive | Moved from repository root into `docs/archive/`. |
| 19 | `docs/archive/PlayLA_Flag_Football_Pilot_Evidence_Dossier.md` | Moved (`git mv`) | D6 Archive | Moved from repository root into `docs/archive/`. |
| 20 | `docs/ARCHITECTURE_AND_CURRENT_STATE.md` | Created | Documentation | Canonical architecture map, 114-route inventory, CRM schema, and guardrails. |
| 21 | `docs/REBUILD_PLAN_AND_CHANGELOG.md` | Created | Documentation | `/grill-me` design decisions (`D1–D6`) and complete 90-file change log. |
| 22 | `docs/drafts/A4A_PRODUCT_DEVELOPMENT_PLAYBOOK.md` | Created | Documentation | 3-Pillar A4A product playbook, 10-Hour Guarantee, and QA checklist. |
| 23 | `docs/drafts/ANVAR_QUESTIONS_STRATEGIC_RESPONSES.md` | Created | Documentation | Co-hosting alignment notes with Anvar Tuykin. |
| 24 | `docs/drafts/OCTOBER_WEBINAR_END_TO_END_PLAYBOOK.md` | Created | Documentation | End-to-end operational masterclass script and runbook. |
| 25 | `docs/drafts/a4a-cycle-state.json` | Created | Documentation | Machine-readable product cycle and deployment state ledger. |
| 26 | `docs/portfolio/RUSSIAN-LANGUAGE-REVIEW.md` | Created | Documentation | Native-speaker Russian editorial review and terminology log. |
| 27 | `README.md` | Modified | Documentation | Updated with flattened canonical URLs, 114-route sitemap, and Google Sheets CRM docs. |
| 28 | `AGENTS.md` | Modified | Documentation | Updated engineering guide with flattened routing, anti-pill rules, and CRM architecture. |
| 29 | `scripts/google-apps-script/Code.gs` | Created | CRM Backend | Bound Google Apps Script Web App (`doPost`, `appendRow`, `MailApp.sendEmail`). |
| 30 | `scripts/google-apps-script/appsscript.json` | Created | CRM Backend | Google Apps Script manifest (`ANYONE_ANONYMOUS` Web App execution as `USER_DEPLOYING`). |
| 31 | `src/lib/business/sheets-webhook.ts` | Created | CRM Backend | `forwardLeadToGoogleSheets()` and `escapeHtml()` helper for all 4 write API routes. |
| 32 | `prisma/schema/silent-launch.prisma` | Created | CRM Backend | Optional Prisma models (`LaunchLead`, `OperationalAudit`, `WebinarAttendee`). |
| 33 | `src/lib/contracts/launch-leads.ts` | Created | Contracts | Zod schema (`LaunchLeadCreate`, `LaunchLeadItem`, `LaunchBranch`) for silent launch & federation intake. |
| 34 | `src/lib/contracts/audit.ts` | Created | Contracts | Zod schema (`AuditSubmission`, `AuditResponse`, `BottleneckCategory`) for `/audit`. |
| 35 | `src/lib/contracts/webinar.ts` | Created | Contracts | Zod schema (`WebinarRegistration`, `WebinarResponse`, `AttendeeRole`) for `/webinar`. |
| 36 | `src/app/api/launch-leads/route.ts` | Created | API Routes | `POST /api/launch-leads` handler writing to `Silent_Launch_Leads` + sending Gmail alerts. |
| 37 | `src/app/api/audit/route.ts` | Created | API Routes | `POST /api/audit` diagnostic scoring engine writing to `Audit_Diagnostics` + sending Gmail summary. |
| 38 | `src/app/api/webinar/register/route.ts` | Created | API Routes | `POST /api/webinar/register` `.ics` generator writing to `Webinar_Registrations` + sending Gmail invite. |
| 39 | `src/app/api/athlete-leads/route.ts` | Modified | API Routes | Wired `POST /api/athlete-leads` to `Athlete_Intake` tab in Google Sheets + Gmail confirmation. |
| 40 | `src/app/(custom)/[language]/[[...path]]/page.tsx` | Created | D1/D2 Routing | Unified dynamic route serving flattened English slugs and localized `ru`/`tt` editorial, case, and action pages. |
| 41 | `src/app/(custom)/portfolio/page.tsx` | Modified | D1 Routing | Updated to `permanentRedirect('/')`. |
| 42 | `src/app/(custom)/portfolio/[slug]/page.tsx` | Modified | D1 Routing | Updated to `permanentRedirect('/' + slug)`. |
| 43 | `next.user-config.ts` | Modified | D1 Routing | Added permanent HTTP `308` redirects for `/portfolio`, `/portfolio/*`, and `/[lang]/portfolio/*`. |
| 44 | `src/app/(custom)/audit/page.tsx` | Created | D2/D4 Pages | Server wrapper with `portfolioMetadata('en', 'audit')` rendering `<AuditView />` in `<Suspense>`. |
| 45 | `src/components/custom/audit/audit-view.tsx` | Created | D2/D4 Views | Trilingual (`en`, `ru`, `tt`) 5-dimension operational diagnostic wizard in Bulachak editorial design system. |
| 46 | `src/app/(custom)/pricing/page.tsx` | Modified | D2/D4 Pages | Server wrapper with `portfolioMetadata('en', 'pricing')` rendering `<PricingView />`. |
| 47 | `src/components/custom/pricing/pricing-view.tsx` | Created | D2/D4 Views | Trilingual (`en`, `ru`, `tt`) 3-pillar engagement architecture & 6-vertical playbook view. |
| 48 | `src/app/(custom)/intake/athlete/page.tsx` | Modified | D2/D4 Pages | Server wrapper with `portfolioMetadata('en', 'intake/athlete')` rendering `<IntakeView track="athlete" />`. |
| 49 | `src/app/(custom)/intake/[track]/page.tsx` | Modified | D2/D4 Pages | Server wrapper with `portfolioMetadata('en', 'intake/federation')` rendering `<IntakeView track="federation" />`. |
| 50 | `src/components/custom/intake/intake-view.tsx` | Created | D2/D4 Views | Shared trilingual (`en`, `ru`, `tt`) editorial shell and track switcher for `/intake/athlete` and `/intake/federation`. |
| 51 | `src/components/custom/intake/athlete-form.tsx` | Modified | D2/D4 Views | Rebuilt 5-field A4A athlete/coach venture intake form with full `en`, `ru`, and `tt` localization. |
| 52 | `src/components/custom/intake/federation-form.tsx` | Created | D2/D4 Views | Built 5-field A4A × P4P federation & adaptive program briefing form with full `en`, `ru`, and `tt` localization. |
| 53 | `src/app/(custom)/webinar/page.tsx` | Created | D2/D5 Pages | Server wrapper with `portfolioMetadata('en', 'webinar')` rendering `<WebinarView />`. |
| 54 | `src/components/custom/webinar/webinar-view.tsx` | Created | D2/D5 Views | Trilingual (`en`, `ru`, `tt`) evergreen I4I × A4A Operational Masterclass portal with `.ics` download & FAQ concierge. |
| 55 | `src/components/custom/portfolio/silent-launch-form.tsx` | Created | Silent Launch | Trilingual (`en`, `ru`, `tt`) inline 10-second Early Access & Partner Capture Form on the homepage. |
| 56 | `src/app/layout.tsx` | Modified | D6 Layout | Mounted `<PortfolioNav />` and `<PortfolioFooter />` directly; removed `<PolsiaAnalytics />` and `<SiteNav />`. |
| 57 | `src/app/sitemap.ts` | Modified | D1/D2 SEO | Generates `/sitemap.xml` directly from `seoRoutes()` (`114` localized canonical routes). |
| 58 | `src/app/globals.css` | Modified | D4 Styling | Promoted Bulachak Emerald Pasture palette and `3px`/`6px`/`10px` architectural corner radii to `:root` and `.dark`. |
| 59 | `src/app/custom-style.css` | Modified | D4 Styling | Added `.silent-launch-*` editorial form styling and responsive grid rules. |
| 60 | `src/components/custom/portfolio/portfolio-nav.tsx` | Modified | D1/D2 Nav | Updated header links to flattened canonical paths and added `/audit` + `#connect` action links. |
| 61 | `src/components/custom/portfolio/portfolio-home.tsx` | Modified | D1/Silent Launch | Integrated `<SilentLaunchForm />`, direct email/LinkedIn contact strip, and flattened canonical links. |
| 62 | `src/components/custom/portfolio/portfolio-about.tsx` | Modified | D1 Routing | Updated About page branch and work links to flattened canonical paths. |
| 63 | `src/components/custom/portfolio/portfolio-story.tsx` | Modified | D1/D3 Funnel | Added trilingual `#branch-actions` diagnostic/intake panels to `/a4a`, `/p4p`, and `/i4i` + flattened links. |
| 64 | `src/components/custom/portfolio/portfolio-work.tsx` | Modified | D1 Routing | Updated work catalogue filter and case card links to flattened canonical paths. |
| 65 | `src/components/custom/portfolio/portfolio-case.tsx` | Modified | D1 Routing | Updated case study back-links and branch tags to flattened canonical paths. |
| 66 | `src/components/custom/portfolio/founder-credentials.tsx` | Modified | Editorial | Refined Russian localization labels for verified founder credentials on `/founder`. |
| 67 | `src/components/custom/portfolio/portfolio-structured-data.tsx` | Modified | D1/D2 SEO | Updated JSON-LD `@id` and `url` fields to flattened canonical URLs across all 38 routes × 3 languages. |
| 68 | `src/lib/portfolio-brand.ts` | Modified | Brand Identity | Added `contactEmail: 'kgafurzianova@gmail.com'` and `auditHref: '/audit'`. |
| 69 | `src/lib/portfolio-locale.ts` | Modified | D1/D2 Locale | Flattened `portfolioHref()`, expanded `isPortfolioPath()` to all 38 slugs, and updated `localizePortfolioHref()`. |
| 70 | `src/lib/portfolio-metadata.ts` | Modified | D1/D2 SEO | Added trilingual metadata for `pricing`, `audit`, `intake/athlete`, `intake/federation`, and `webinar`. |
| 71 | `src/lib/seo-routes.ts` | Modified | D1/D2 SEO | Added the 5 action routes to the trilingual sitemap matrix (`38 × 3 = 114` routes). |
| 72 | `src/lib/env.ts` | Modified | Config | Removed Polsia env vars; added optional `GOOGLE_SHEETS_WEBHOOK_URL` validation; defaulted `NEXT_PUBLIC_APP_URL` to `https://bulachak.com`. |
| 73 | `src/lib/site.ts` | Modified | Config | Defaulted `siteUrl` to `https://bulachak.com` and removed Polsia fallback headers. |
| 74 | `public/llms.txt` | Modified | D1 Discovery | Updated LLM discovery links to flattened canonical URLs across `en`, `ru`, and `tt`. |
| 75 | `src/lib/business/bulachak-home.ts` | Modified | Editorial | Refined Russian and Tatar homepage copy and added direct contact strip labels. |
| 76 | `src/lib/business/portfolio-about.en.ts` | Modified | Editorial | Typographic non-breaking space (`\u00A0`) and zero-orphan refinements on English About copy. |
| 77 | `src/lib/business/portfolio-about.ru.ts` | Modified | Editorial | Native Russian editorial refinements and typographic gluing on About copy. |
| 78 | `src/lib/business/portfolio-about.tt.ts` | Modified | Editorial | Literary Tatar editorial refinements and typographic gluing on About copy. |
| 79 | `src/lib/business/portfolio-pages.ts` | Modified | Editorial | Russian & Tatar editorial refinements across `founder`, `a4a`, `p4p`, and `i4i` story pages. |
| 80 | `src/lib/business/portfolio-content.ts` | Modified | Editorial | Typographic non-breaking space (`\u00A0`) refinements in English case studies. |
| 81 | `src/lib/business/portfolio-content.ru.ts` | Modified | Editorial | Native Russian editorial review improvements across all 24 case studies. |
| 82 | `src/lib/business/portfolio-content.tt.ts` | Modified | Editorial | Literary Tatar editorial review improvements across case studies. |
| 83 | `tests/unit/launch-leads.test.ts` | Created | Unit Tests | 6 integration tests verifying YC Silent Launch checklist and Google Sheets webhook forwarding across all 4 tabs. |
| 84 | `tests/unit/audit.test.ts` | Created | Unit Tests | 3 unit tests for `POST /api/audit` validation and diagnostic calculation. |
| 85 | `tests/unit/webinar.test.ts` | Created | Unit Tests | 3 unit tests for `POST /api/webinar/register` validation and `.ics` generation. |
| 86 | `tests/unit/env-validation.test.ts` | Modified | Unit Tests | Updated environment validation tests for `https://bulachak.com` and `GOOGLE_SHEETS_WEBHOOK_URL`. |
| 87 | `tests/unit/bulachak-home.test.ts` | Modified | Unit Tests | Updated canonical work paths to flattened `/work`, `/ru/work`, and `/tt/work`. |
| 88 | `tests/unit/portfolio-link.test.tsx` | Modified | Unit Tests | Updated fragment replacement and Tatar locale retention tests for flattened canonical paths and `/tt/audit`. |
| 89 | `tests/unit/portfolio-localization.test.ts` | Modified | Unit Tests | Updated language navigation tests for flattened canonical URLs, action pages, and legacy `/portfolio/*` normalization. |
| 90 | `tests/unit/portfolio-publication.test.ts` | Modified | Unit Tests | Updated route handler tests to target `@/app/(custom)/[language]/[[...path]]/page` and assert all **114** SEO routes. |

---

## 4. Verification & Live Production Log (`2026-10-14` / `2026-10-15`)

- **Automated Verification Suite (`Exit Code 0`):**
  - `npm run lint`: `Checked 145 files in 86ms. No fixes applied.`
  - `npm run typecheck`: `tsc --noEmit` — `0 errors`.
  - `npm run test`: `13 passed (13 test files) | 94 passed (94 tests)`.
  - `npm run build`: `Next.js 16.2.6 (Turbopack)` — compiled and generated static/dynamic routes cleanly.
- **Git & Vercel Production Deployment:**
  - Commit: `ee938f80c868f3bd77d85d3068e69a7ac5b68b15` pushed to `https://github.com/Bulachak/bulachak-website.git` (`main`).
  - Vercel Deployment ID: `dpl_Gqb8crJoPFxjcDzJbqcLdTscwqvb` (`READY`, aliased to `https://bulachak.com`).
- **Live HTTP Endpoint & Redirect Verification:**
  - `200 OK`: `https://bulachak.com/`, `/about`, `/work`, `/a4a`, `/audit`, `/pricing`, `/intake/athlete`, `/intake/federation`, `/webinar`, `/ru`, `/ru/audit`, `/tt/a4a`, `/tt/intake/athlete`, `/portfolio/content.md?lang=en`
  - `308 Permanent Redirect`:
    - `https://bulachak.com/portfolio` $\rightarrow$ `/`
    - `https://bulachak.com/portfolio/work` $\rightarrow$ `/work`
    - `https://bulachak.com/ru/portfolio/a4a` $\rightarrow$ `/ru/a4a`
  - `404 Not Found`: `https://bulachak.com/example` (legacy template route removed)
