---
title: Portfolio baseline checks and read-only navigation audit
created_by: Codex
date_created: 2026-09-12
status: implementation-in-progress snapshot
---

# Baseline checks

This is an independent snapshot while the parent agent is still implementing the portfolio. Only this report was written for this check; no source or framework files were modified. The parent owns final lint, production build and browser verification after the current changes settle.

## Executed checks

| Check | Result | Meaning |
| --- | --- | --- |
| Existing `npm run test`, sandboxed | Could not start: esbuild access denied reading parent directories/config | Environment restriction, not a failing test assertion. |
| Existing `npm run test`, permitted elevated rerun | **PASS: 6 files, 69 tests**; 19.90s | Ownership map 43; env validation 2; example contract 6; CSP 11; permissions policy 5; sanity 2. |
| `npm run lint` | **FAIL: 13 errors**, 98 files checked, no changes applied | Eight formatting diagnostics in new/edited portfolio files; five new implementation lint diagnostics below. No baseline/framework lint defect appeared in this run. |
| Focused `biome lint` for portfolio/home helpers | **FAIL: 5 errors**, seven files checked | Confirms the five non-formatting diagnostics below. |
| `.git` presence | Absent | Did not block the executed Biome check despite VCS support in configuration. No git initialization needed for the checks performed. |
| Generated Prisma client entrypoint | Not present at snapshot time | Parent had generation running; do not interpret this as final generation failure. |

The environment-validation test deliberately emits missing `DATABASE_URL` and `POLSIA_API_KEY` diagnostics while checking fail-fast behavior. Its test passes; that stderr is expected.

## Build constraints found by reading existing files

- `next.config.ts:68` only permits optimized local images under `/assets/**`. New `next/image` calls in `portfolio-home.tsx` and `case-visual.tsx` initially reference `/portfolio/...`. This mismatch can throw at render time. Fix in user-owned files: package images under `public/assets/portfolio` and update references, or mark these local images `unoptimized`. Do not loosen or edit the framework configuration.
- `src/lib/env.ts` requires `DATABASE_URL` and `POLSIA_API_KEY`; config imports it eagerly. The documented `SKIP_ENV_VALIDATION=1` path is available for an environment-free local build. Do not weaken the schema. `NEXT_PUBLIC_APP_URL` currently has a localhost default in the actual schema.
- Dependencies were installed with scripts disabled, so Prisma generation is a separate required local step. Parent owns it and the subsequent production build.
- Production build was intentionally not run from this agent while parent owned generation/build and `.next` output; concurrent builds would conflict. This report does not claim a build pass.

## Actionable implementation findings

These locations refer to the implementation snapshot before formatting; line numbers can change as parent edits. All affected source files are user-owned.

| Priority | File / location | Finding and suggested fix |
| --- | --- | --- |
| P1 | `src/components/custom/portfolio/portfolio-home.tsx` image calls; `case-visual.tsx:16` | Optimized local image paths conflict with the framework image allowlist. Move packaged images under the permitted `/assets/**` namespace or use `unoptimized`. |
| P2 | `portfolio-home.tsx:87` | Generic `div` uses `aria-label` without a naming-capable role. The leg links naturally fit a named `nav`; alternatively use an appropriate named section. |
| P2 | `portfolio-home.tsx:94` | Decorative skeleton container is another generic `div` with unsupported `aria-label`. Use a proper loading status with text if needed or hide the decorative skeletons; existing results status already announces loading. |
| P2 | `portfolio-home.tsx:107` | Biome requires native `fieldset` for the filter group. Keep its accessible name via legend or label and reset native fieldset styling in user CSS as needed. |
| P2 | `portfolio-home.tsx:110` | Biome requires native `output` rather than `p role="status"`. Preserve polite result-count announcements. |
| P2 | `src/hooks/use-portfolio.ts:14–23` | Biome treats `attempt` as an unnecessary effect dependency, but it intentionally triggers reload. **Do not apply unsafe automatic removal**, which would break retry. Refactor retry/loading around a callback or use a narrowly justified rule suppression. |
| P2 | `portfolio-nav.tsx` | Add a first-focus skip link to `#portfolio-main`; both overview and case-detail pages should expose the same main target. Navigation is repeated across case pages and currently has no explicit keyboard bypass. |

Formatting can be applied only to the known changed user-owned files once the parent and data agent finish writing them. Avoid a blanket formatter that might modify governed files.

## Read-only navigation review

Positive evidence in source: desktop links cover Work/Approach/About; mobile navigation uses the existing accessible Sheet with title and description; drawer links dismiss the drawer; contact uses a real mailto; icons are hidden from accessible names; search has a proper label; category buttons expose pressed state; results have loading/error/empty branches and retry controls. Case cards have descriptive title links; duplicate purely visual links are removed from keyboard and screen-reader navigation. Footer provides a route back to A4A services.

Browser checks still needed after the preview is ready: mobile menu and Escape/focus restoration, hash destinations below sticky navigation, search/category/shareable-URL behavior, return from case detail preserving filters, actual image rendering, focus visibility, contrast and narrow-screen overflow. No browser was opened for this audit; parent requested waiting for a ready local URL. No claim of full accessibility conformance is made from source inspection alone.
