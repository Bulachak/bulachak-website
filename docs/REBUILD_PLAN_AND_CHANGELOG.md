---
title: "Bulachak (bulachak.com) — Rebuild Plan, Design Decisions & Detailed Change Log"
created_by: Antigravity
date_created: 2026-10-14
updated_by: Antigravity
last_updated_on: 2026-10-14
status: completed
---

# Bulachak (`bulachak.com`) — Rebuild Plan, Design Decisions & Detailed Change Log

> **Purpose:** This document records the architectural decisions agreed upon during the October 14, 2026 `/grill-me` design review and provides a complete, file-by-file change log of every modification, addition, move, and deletion performed during the platform rebuild.

---

## 1. Agreed Design Decisions (`/grill-me` Specification)

| ID | Topic | Decision & Rationale |
|---|---|---|
| **D1** | **Canonical URL Hierarchy & Redirects** | **Flatten canonical URLs to the root:** `/`, `/about`, `/work`, `/founder`, `/a4a`, `/p4p`, `/i4i`, `/privacy`, `/terms`, `/[case-slug]`, plus localized `/ru/...` and `/tt/...` editions.<br>**Permanent 308 Redirects:** Redirect all legacy `/portfolio`, `/portfolio/*`, and `/[lang]/portfolio/*` paths (excluding `/portfolio/content.md` for LLM discovery) to their flattened canonical equivalents so no existing links, bookmarks, or search indices break. |
| **D2** | **Trilingual Parity (`EN / RU / TT`) Across Action & Intake Pages** | Localize `/audit`, `/pricing`, `/intake/athlete`, `/intake/federation`, and `/webinar` into all three published languages (`en`, `ru`, `tt` under `/ru/audit`, `/tt/audit`, etc.) and update `localizePortfolioHref()` so the header `EN / RU / TT` selector seamlessly switches the language of the current page everywhere on the site. |
| **D3** | **Branch Page (`/a4a`, `/p4p`, `/i4i`) Funnel Integration** | Keep `/a4a`, `/p4p`, and `/i4i` as clean editorial story pages and add a tailored editorial action panel (`#branch-actions`) at the bottom of each branch:<br>• **A4A** → `/audit` (*15-Min Ops Leak Audit*), `/intake/athlete` (*Athlete & Coach Venture Intake*), `/pricing` (*3 Engagement Pillars*)<br>• **P4P** → `/intake/federation` (*Federation & Adaptive Program Briefing*), `/audit` (*Operational Diagnostic*)<br>• **I4I** → `/webinar` (*I4I × A4A Operational Masterclass*), `/#connect` (*Direct Inquiry*) |
| **D4** | **Visual Design Unification & Root CSS Consolidation** | Restyle `/pricing`, `/audit`, `/intake/athlete`, `/intake/federation`, and `/webinar` into the Bulachak editorial design system (`.portfolio-container`, `.story-header`, `.case-evidence`, warm paper surfaces, architectural 3px/6px/10px corners) and promote the Emerald Pasture palette to the root `:root` / `.dark` theme in `src/app/globals.css`. |
| **D5** | **Evergreen Trilingual `/webinar` Portal** | Convert `/webinar` (and `/ru/webinar`, `/tt/webinar`) from a Russian-only hardcoded Oct 15 page into a trilingual (`en`, `ru`, `tt`) evergreen **I4I × A4A Operational Masterclass & Workshop** page supporting session/cohort registration, `.ics` calendar downloads, and interactive FAQ concierge via `POST /api/webinar/register`. |
| **D6** | **Repository Cleanup & Legacy Scaffolding Removal** | • Delete `/example` (`src/app/(custom)/example/page.tsx`, `src/app/api/example/route.ts`, `src/lib/contracts/example.ts`, `tests/unit/example/contract.test.ts`).<br>• Remove dead `SiteNav` (`src/lib/nav.ts` and `src/components/custom/site-nav.tsx`) so `PortfolioNav` and `PortfolioFooter` are the single canonical header/footer.<br>• Move the 6 loose September 2026 `.md` strategy dossiers from the repository root into `docs/archive/`.<br>• Keep optional Prisma isolated as-is while Google Sheets + Apps Script remains the primary CRM. |

---

## 2. Detailed File-by-File Change Log

### Phase 1 — Repository Cleanup, Archive Organization & Dead Code Removal

1. **Moved 6 historical September 2026 strategy & pilot dossiers from root into `docs/archive/` (`git mv`):**
   - `A365_PHASE_3_APPLICATION_PACKAGE.md` → [`docs/archive/A365_PHASE_3_APPLICATION_PACKAGE.md`](archive/A365_PHASE_3_APPLICATION_PACKAGE.md)
   - `A4A_Client_Facing_Launch_Blueprint.md` → [`docs/archive/A4A_Client_Facing_Launch_Blueprint.md`](archive/A4A_Client_Facing_Launch_Blueprint.md)
   - `A4A_Pitch_Deck_Creative_Assessment_and_Storytelling_Blueprint_2026.md` → [`docs/archive/A4A_Pitch_Deck_Creative_Assessment_and_Storytelling_Blueprint_2026.md`](archive/A4A_Pitch_Deck_Creative_Assessment_and_Storytelling_Blueprint_2026.md)
   - `A4A_Revenue_and_Payment_Model_Blueprint_2026.md` → [`docs/archive/A4A_Revenue_and_Payment_Model_Blueprint_2026.md`](archive/A4A_Revenue_and_Payment_Model_Blueprint_2026.md)
   - `Engineer_History_MGI_Pilot_Evidence_Dossier.md` → [`docs/archive/Engineer_History_MGI_Pilot_Evidence_Dossier.md`](archive/Engineer_History_MGI_Pilot_Evidence_Dossier.md)
   - `PlayLA_Flag_Football_Pilot_Evidence_Dossier.md` → [`docs/archive/PlayLA_Flag_Football_Pilot_Evidence_Dossier.md`](archive/PlayLA_Flag_Football_Pilot_Evidence_Dossier.md)
2. **Deleted legacy template scaffolding & unused navigation components (`git rm`):**
   - `src/app/(custom)/example/page.tsx` — removed template demo page.
   - `src/app/api/example/route.ts` — removed template demo API route.
   - `src/lib/contracts/example.ts` — removed template demo Zod schema.
   - `tests/unit/example/contract.test.ts` — removed template demo unit test.
   - `src/components/custom/site-nav.tsx` — removed dead wrapper around `PortfolioNav`.
   - `src/lib/nav.ts` — removed dead navigation array pointing to `/example`.
3. **Updated Root Layout & Sitemap Generation:**
   - [`src/app/layout.tsx`](../src/app/layout.tsx): Mounted `<PortfolioNav />` and `<PortfolioFooter />` directly in the root layout (removing `<SiteNav />`).
   - [`src/app/sitemap.ts`](../src/app/sitemap.ts): Replaced `navItems` dependency with direct `seoRoutes()` generation so `/sitemap.xml` emits all 114 localized canonical routes.

---

### Phase 2 — Root CSS Consolidation (`src/app/globals.css`)

1. **Updated [`src/app/globals.css`](../src/app/globals.css):**
   - Promoted the **Bulachak Emerald Pasture** palette directly to `:root` and `.dark` (`--background: #f6faf7`, `--foreground: #1d332c`, `--primary: #1f684c` in light mode; `--background: #111c16`, `--foreground: #eef1e7`, `--primary: #91caa7` in dark mode), eliminating the unused intermediate gray/zinc root overrides.
   - Set `--radius: 6px` (`--portfolio-radius-badge: 3px`, `--portfolio-radius-control: 6px`, `--portfolio-radius-surface: 10px`) across `:root` to enforce the strict architectural corner standard and zero-pill invariant site-wide.

---

### Phase 3 — Flattened Canonical URLs, 308 Redirects & Unified Dynamic Routing

1. **Updated [`src/lib/portfolio-locale.ts`](../src/lib/portfolio-locale.ts):**
   - Changed `portfolioHref(language, suffix)` to generate flattened canonical paths:
     - `portfolioHref('en')` → `'/'`, `portfolioHref('en', '/about')` → `'/about'`
     - `portfolioHref('ru')` → `'/ru'`, `portfolioHref('ru', '/about')` → `'/ru/about'`
     - `portfolioHref('tt')` → `'/tt'`, `portfolioHref('tt', '/about')` → `'/tt/about'`
   - Updated `isPortfolioPath(path)` to validate all editorial, case study, and action slugs (`audit`, `pricing`, `webinar`, `intake/athlete`, `intake/federation`) across flattened and legacy `/portfolio/*` paths while rejecting unrelated paths (`/health`, `/api/*`, `/fr/portfolio`, `/en/portfolio`).
   - Updated `localizePortfolioHref(href, language)` so switching languages in `<PortfolioNav>` preserves the current page, query string, and hash fragment across every page on `bulachak.com`.
2. **Configured Permanent HTTP `308` Redirects in [`next.user-config.ts`](../next.user-config.ts):**
   - `/portfolio` → `/` (`permanent: true`)
   - `/portfolio/:slug((?!content\\.md$).*)` → `/:slug` (`permanent: true`, preserving `/portfolio/content.md` for LLM markdown discovery)
   - `/:lang(ru|tt)/portfolio` → `/:lang` (`permanent: true`)
   - `/:lang(ru|tt)/portfolio/:slug*` → `/:lang/:slug*` (`permanent: true`)
3. **Created Unified Route Handler [`src/app/(custom)/[language]/[[...path]]/page.tsx`](../src/app/(custom)/[language]/[[...path]]/page.tsx) and removed `src/app/(custom)/[language]/portfolio/[[...path]]/page.tsx`:**
   - Serves flattened English root editorial and case-study routes (`/work`, `/about`, `/founder`, `/a4a`, `/p4p`, `/i4i`, `/privacy`, `/terms`, `/[case-slug]`).
   - Serves localized Russian (`/ru/...`) and Tatar (`/tt/...`) home, editorial, case study, and action/intake routes (`/ru/audit`, `/tt/audit`, `/ru/pricing`, `/tt/pricing`, `/ru/webinar`, `/tt/webinar`, `/ru/intake/athlete`, `/tt/intake/athlete`, `/ru/intake/federation`, `/tt/intake/federation`).
   - Updated [`src/app/(custom)/portfolio/page.tsx`](../src/app/(custom)/portfolio/page.tsx) and [`src/app/(custom)/portfolio/[slug]/page.tsx`](../src/app/(custom)/portfolio/[slug]/page.tsx) to invoke `permanentRedirect('/')` and `permanentRedirect('/' + slug)` as server-level defense-in-depth alongside the `next.user-config.ts` redirects.
4. **Updated Metadata, Sitemap & Structured Data:**
   - [`src/lib/portfolio-metadata.ts`](../src/lib/portfolio-metadata.ts): Added localized metadata definitions (`actionPageMetadataCopy`) for `pricing`, `audit`, `intake/athlete`, `intake/federation`, and `webinar` across `en`, `ru`, and `tt`, and updated `x-default` alternates to flattened canonical URLs.
   - [`src/lib/seo-routes.ts`](../src/lib/seo-routes.ts): Added the 5 action routes to the trilingual sitemap matrix (**38 routes × 3 languages = 114 canonical URLs**).
   - [`src/components/custom/portfolio/portfolio-structured-data.tsx`](../src/components/custom/portfolio/portfolio-structured-data.tsx): Updated JSON-LD `@id` and `url` fields to flattened canonical URLs and handled action route titles/descriptions.
   - [`public/llms.txt`](../public/llms.txt): Updated all English, Russian, and Tatar discovery URLs to flattened canonical paths while preserving `/portfolio/content.md?lang={en|ru|tt}`.
5. **Updated All Internal Navigation Links to Flattened Canonical Paths:**
   - [`src/components/custom/portfolio/portfolio-nav.tsx`](../src/components/custom/portfolio/portfolio-nav.tsx)
   - [`src/components/custom/portfolio/portfolio-home.tsx`](../src/components/custom/portfolio/portfolio-home.tsx)
   - [`src/components/custom/portfolio/portfolio-about.tsx`](../src/components/custom/portfolio/portfolio-about.tsx)
   - [`src/components/custom/portfolio/portfolio-work.tsx`](../src/components/custom/portfolio/portfolio-work.tsx)
   - [`src/components/custom/portfolio/portfolio-case.tsx`](../src/components/custom/portfolio/portfolio-case.tsx)

---

### Phase 4 — Branch Pages (`/a4a`, `/p4p`, `/i4i`) Funnel Integration

1. **Updated [`src/components/custom/portfolio/portfolio-story.tsx`](../src/components/custom/portfolio/portfolio-story.tsx):**
   - Added a trilingual (`en`, `ru`, `tt`) `#branch-actions` editorial diagnostic & intake section at the bottom of `/a4a`, `/p4p`, and `/i4i` (above the filtered case studies):
     - **A4A (`/a4a`, `/ru/a4a`, `/tt/a4a`):** Links to `/audit` (*3-Minute Operational Audit*), `/intake/athlete` (*Athlete & Coach Venture Intake*), and `/pricing` (*3 Engagement Pillars*).
     - **P4P (`/p4p`, `/ru/p4p`, `/tt/p4p`):** Links to `/intake/federation` (*Federation & Adaptive Program Briefing*) and `/audit` (*Operational Readiness Diagnostic*).
     - **I4I (`/i4i`, `/ru/i4i`, `/tt/i4i`):** Links to `/webinar` (*I4I × A4A Operational Masterclass*) and `/#connect` (*Direct Inquiry*).

---

### Phase 5 — Visual Design Unification & Full Trilingual Parity Across Action Pages

1. **Pricing Page (`/pricing`, `/ru/pricing`, `/tt/pricing`):**
   - Created [`src/components/custom/pricing/pricing-view.tsx`](../src/components/custom/pricing/pricing-view.tsx): Trilingual (`en`, `ru`, `tt`) client view built in the Bulachak editorial design system (`.portfolio-container`, `.story-header`, `.case-evidence`) showcasing the 3 Engagement Pillars ($0 15-Min Ops Leak Audit, $500–$1,500 48-Hour Quick-Fix Sprint, $1,500–$5,000+ AI-Native Back-Office Retainer) and 6-vertical tabs.
   - Updated [`src/app/(custom)/pricing/page.tsx`](../src/app/(custom)/pricing/page.tsx) to use `portfolioMetadata('en', 'pricing')` and render `<PricingView />`.
2. **Interactive Operational Audit (`/audit`, `/ru/audit`, `/tt/audit`):**
   - Created [`src/components/custom/audit/audit-view.tsx`](../src/components/custom/audit/audit-view.tsx): Trilingual (`en`, `ru`, `tt`) interactive 5-dimension operational diagnostic wizard with query-parameter prefill (`?name=...&email=...&org=...`), editorial `.case-evidence` cards, and `POST /api/audit` submission.
   - Updated [`src/app/(custom)/audit/page.tsx`](../src/app/(custom)/audit/page.tsx) to use `portfolioMetadata('en', 'audit')` and wrap `<AuditView />` in `<Suspense>`.
3. **Athlete & Federation Intake Pages (`/intake/athlete`, `/intake/federation`, `/ru/intake/*`, `/tt/intake/*`):**
   - Updated [`src/components/custom/intake/athlete-form.tsx`](../src/components/custom/intake/athlete-form.tsx) and [`src/components/custom/intake/federation-form.tsx`](../src/components/custom/intake/federation-form.tsx) with full English, Russian, and Tatar translations via `usePortfolioLocale()`.
   - Created [`src/components/custom/intake/intake-view.tsx`](../src/components/custom/intake/intake-view.tsx) providing the unified editorial header, track switcher, and trust indicators across `en`, `ru`, and `tt`.
   - Updated [`src/app/(custom)/intake/athlete/page.tsx`](../src/app/(custom)/intake/athlete/page.tsx) and [`src/app/(custom)/intake/[track]/page.tsx`](../src/app/(custom)/intake/[track]/page.tsx).
4. **Evergreen I4I × A4A Operational Masterclass (`/webinar`, `/ru/webinar`, `/tt/webinar`):**
   - Created [`src/components/custom/webinar/webinar-view.tsx`](../src/components/custom/webinar/webinar-view.tsx): Trilingual (`en`, `ru`, `tt`) evergreen workshop portal featuring Anvar Tuykin and Kamilla Gafurzianova, OLY, 60-minute curriculum, live cohort registration (`POST /api/webinar/register`), `.ics` calendar file download, pre-filled `/audit` handoff link, and interactive FAQ concierge.
   - Updated [`src/app/(custom)/webinar/page.tsx`](../src/app/(custom)/webinar/page.tsx) to use `portfolioMetadata('en', 'webinar')` and render `<WebinarView />`.

---

### Phase 6 — Unit Tests, Documentation & Production Verification

1. **Updated Unit Test Suites:**
   - [`tests/unit/bulachak-home.test.ts`](../tests/unit/bulachak-home.test.ts): Updated canonical work paths to `/work`, `/ru/work`, and `/tt/work`.
   - [`tests/unit/portfolio-localization.test.ts`](../tests/unit/portfolio-localization.test.ts): Updated language navigation tests to verify flattened canonical URLs, action page localization (`/ru/audit`, `/tt/intake/athlete`), and legacy `/portfolio/*` path normalization.
   - [`tests/unit/portfolio-link.test.tsx`](../tests/unit/portfolio-link.test.tsx): Updated fragment replacement and Tatar locale retention tests for flattened canonical paths and action routes.
   - [`tests/unit/portfolio-publication.test.ts`](../tests/unit/portfolio-publication.test.ts): Updated route handler tests to target `@/app/(custom)/[language]/[[...path]]/page`, assert all **114** SEO routes (38 slugs × 3 languages), and verify flattened English and localized Russian/Tatar serving.
2. **Updated Project Documentation:**
   - [`docs/REBUILD_PLAN_AND_CHANGELOG.md`](REBUILD_PLAN_AND_CHANGELOG.md) (this file)
   - [`docs/ARCHITECTURE_AND_CURRENT_STATE.md`](ARCHITECTURE_AND_CURRENT_STATE.md)
   - [`README.md`](../README.md)
   - [`AGENTS.md`](../AGENTS.md)
