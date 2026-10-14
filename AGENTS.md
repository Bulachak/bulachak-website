# AGENTS.md — Bulachak (`bulachak.com`) Engineering Guide

## Project Overview

This repository powers **Bulachak** (`https://bulachak.com`), a trilingual (`en`, `ru`, `tt`) venture platform, operational diagnostic web application, and founder work archive founded by **Kamilla Gafurzianova, OLY**.

- **Canonical Architecture & Rebuild Changelog:**
  - Read [`docs/ARCHITECTURE_AND_CURRENT_STATE.md`](docs/ARCHITECTURE_AND_CURRENT_STATE.md) for the complete route inventory, 3-layer repository history, and CRM pipeline.
  - Read [`docs/REBUILD_PLAN_AND_CHANGELOG.md`](docs/REBUILD_PLAN_AND_CHANGELOG.md) for the October 14, 2026 `/grill-me` design decisions (D1–D6) and complete file-by-file change log.
- **Production Domain:** `https://bulachak.com` (hosted on **Vercel** under `milamanzareks-projects/a4a-p4p`, GitHub repository `Bulachak/bulachak-website`).
- **Core Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui primitives (`src/components/ui/`), Biome, Vitest.
- **Lead Capture & CRM Backend:** Google Sheets + Google Apps Script Web App (`src/lib/business/sheets-webhook.ts` + `scripts/google-apps-script/Code.gs`), with optional Prisma 6 PostgreSQL persistence (`prisma/schema/`) when `DATABASE_URL` is provided.
- **Note on Historical Template:** This project was originally scaffolded from a Next.js template and has been fully migrated off Polsia onto Vercel + Google Workspace (Google Sheets + Apps Script). Do not reintroduce Polsia dependencies, `POLSIA_API_KEY`, `.polsia/` state files, or `polsia.toml`.

---

## Architecture & Conventions

### 1. Brand & Canonical Contact Identity
- Canonical brand and contact constants live in [`src/lib/portfolio-brand.ts`](src/lib/portfolio-brand.ts) and [`src/lib/brand.ts`](src/lib/brand.ts):
  - `domain`: `'bulachak.com'`
  - `contactEmail`: `'kgafurzianova@gmail.com'`
  - `contactHref`: `'https://www.linkedin.com/in/kamilla-gafurzianova/'`
  - `auditHref`: `'/audit'`
- Site origin (`siteUrl`) is exported from [`src/lib/site.ts`](src/lib/site.ts) and defaults to `'https://bulachak.com'`.

### 2. Flattened Canonical URLs (`38 × 3 = 114` Routes) & Trilingual Editions (`en`, `ru`, `tt`)
- Published languages are managed in [`src/lib/portfolio-locale.ts`](src/lib/portfolio-locale.ts) (`['en', 'ru', 'tt']`).
- **Flattened Canonical Hierarchy:** English routes are served directly at root (`/`, `/about`, `/work`, `/founder`, `/a4a`, `/p4p`, `/i4i`, `/privacy`, `/terms`, `/[case-slug]`, `/audit`, `/pricing`, `/intake/athlete`, `/intake/federation`, `/webinar`). Russian and Tatar routes are served at `/ru/...` and `/tt/...` via [`src/app/(custom)/[language]/[[...path]]/page.tsx`](src/app/(custom)/[language]/[[...path]]/page.tsx).
- **Legacy `/portfolio/*` Redirects:** All `/portfolio`, `/portfolio/*`, and `/[lang]/portfolio/*` paths (excluding `/portfolio/content.md`) permanently redirect (`308`) to their flattened equivalents via [`next.user-config.ts`](next.user-config.ts).
- **Voice Separation & Editorial Guardrails:** Keep Bulachak's organization identity distinct from the founder's personal biography on the homepage (`src/lib/business/bulachak-home.ts`) and branch pages (`src/lib/business/portfolio-pages.ts`), while attributing the 24 historical case studies (`src/lib/business/portfolio-content.ts`) to Kamilla Gafurzianova on `/work` and `/founder`.
- Editorial case study strings (`portfolio-content.*` and `portfolio-pages.ts`) are tested by `tests/unit/portfolio-localization.test.ts` to ensure no raw email addresses, `mailto:` links, or en/em dashes (`–` / `—`) appear inside narrative case data. Keep direct contact emails and `mailto:` links in UI components (`portfolio-home.tsx`, `silent-launch-form.tsx`, `portfolio-nav.tsx`, `athlete-form.tsx`, `federation-form.tsx`) and `portfolio-brand.ts`.

### 3. Data Plane: Client Pages + `/api/*` Route Handlers + Google Sheets Webhook
- Product forms are client components (`'use client'`) that validate and submit via `apiFetch` (`src/lib/api-client.ts`) against shared Zod schemas in `src/lib/contracts/*.ts`.
- API route handlers (`src/app/api/*/route.ts`) validate inputs with Zod and call `forwardLeadToGoogleSheets` from [`src/lib/business/sheets-webhook.ts`](src/lib/business/sheets-webhook.ts), which appends rows to the bound Google Sheet (`19f83qdQCUhe4dWvOLSWmc5_xBNLmfUm8I4_kk-L5r2o`) and sends Gmail notifications via Google Apps Script.
- No Server Actions (`'use server'`).

### 4. UI & Typography Standards
- **Unified Emerald Pasture Root Palette:** `:root` and `.dark` in [`src/app/globals.css`](src/app/globals.css) define the Bulachak Emerald Pasture palette (`#f6faf7` / `#1d332c` / `#1f684c` light; `#111c16` / `#eef1e7` / `#91caa7` dark) and editorial utility classes (`.portfolio-container`, `.story-header`, `.case-evidence`).
- **Strict Ban on Pill-Shaped Elements:** Never use `rounded-full` or `border-radius: 9999px` on buttons, badges, chips, tags, inputs, or step indicators. Use architectural corner radii (`--portfolio-radius-control` / `rounded-md` / `rounded-lg` / `rounded-xl`). Circular 1:1 avatar portraits are the only exception.
- **Multilingual Typography & Zero-Orphan Standard:** Use `text-wrap: balance` on headings, `text-wrap: pretty` on body copy, and non-breaking spaces (`\u00A0`) to bind short prepositions and conjunctions across English, Russian, and Tatar.

---

## Build, Test, and Verification Commands

```bash
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run lint         # Biome check
npm run lint:fix     # Biome auto-fix
npm run test         # Vitest unit tests (13 suites, 94 tests)
npm run build        # Production Next.js build
```
