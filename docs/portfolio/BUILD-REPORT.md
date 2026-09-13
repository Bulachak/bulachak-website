---
title: Bulachak website implementation and verification
created_by: Codex
date_created: 2026-09-12
updated_by: Codex
last_updated_on: 2026-09-12
status: complete_local_build
---

# Bulachak website implementation and verification

The Bulachak website is available locally at <http://localhost:3000/portfolio>. Its homepage introduces the shared vision and three branches. The founder's 24 case studies are now a separate Work page at <http://localhost:3000/portfolio/work>, with the founder's story at `/portfolio/founder`. Public deployment has not been performed.

## Delivered experience

- A Bulachak homepage led by the approved shared-future motto, equal introductions to A4A, P4P, and I4I, and a short Emerald Pasture section. The founder's projects and biography are secondary destinations, not the homepage identity.
- Consistent names throughout the app: **Agents 4 Athletes**, **Parafencing 4 Progress**, and **Immigrant 4 Immigrant**. The portfolio header, mission sections, and footer share one naming source. Historical quotations in internal source reviews retain their original spelling.
- A separate Work page with selected projects, four capability filters, search, a concise initial list, and an option to reveal all 24 cases. Projects are explicitly attributed to the founder. Search and filters are reflected in the URL; returning from a case preserves the previous list context. Older homepage search links redirect to the new Work page with their filters.
- Individual case pages with role, status, narrative, evidence, relevant initiative connections, related work, copy-link and print controls. Connections describe specific relevance and distinguish future transfer from delivered initiative results.
- Desktop and mobile navigation, light and dark themes, a skip link, labelled search and filter controls, loading/retry/empty states, and responsive imagery.
- Portfolio metadata, social image, and sitemap entries using the existing framework seams. The existing A4A home links to the portfolio.
- English, Russian, and Tatar versions of all 24 cases, About, Founder, the three initiative stories, Privacy, Terms, navigation, and metadata. Language changes preserve the current destination.
- A concise About page with a short introduction, three philosophy comparison cards, one human-alignment statement, and links into each initiative's story. Source documents inform the copy; their detailed arguments and internal roadmap sections are not reproduced on the page.
- The approved emerald/mint palette, saturated ruby accent (#c8102e in both themes), prominent Bulachak wordmark, and the motto “A future we build together” underneath. The theme switch remains visible alongside the language control.
- A subtle corner hierarchy: 3px controls, 6px content surfaces, and 10px large panels. Decorative dots and portraits retain circular shapes.
- The original compact founder footer: eight badges, “Certified Digital Expertise,” “The Discipline to Scale,” and the original English paragraph. No extra badge captions or résumé-style learning categories.

## Content and source handling

Reviewed both supplied Drive archives and all four application sites. The editorial content reuses substantive work while removing target-employer sections, hiring pitches, and links to those former application sites. Empty placeholders, duplicates, and ambiguous proposal/result claims were excluded.

Actual project names remain where supported by the source record. Research, prototypes, plans, and delivered work have distinct labels. Evidence notes qualify author-reported results; the site does not imply independent measurement or official endorsement.

Public assets live under `public/assets/portfolio/`. They include the existing portrait, selected public project images, a new social preview, and the four-page research paper supplied by Kamilla. The larger 45-page proceedings extract remains outside the site. The paper is credited as coauthored research, with the 2025 citation and printed pages 36–39. Its reported implementation metrics are not adopted as client outcomes.

Private working records and source reviews remain in `docs/portfolio/`, outside the public asset directory and catalogue API. Confidential governance records, private pilot identities, unsupported traction claims, and sensitive operational screenshots are not exposed by the portfolio.

## Earlier production verification

The following comprehensive audit predates the Bulachak homepage and separate Work page. It is retained as a dated record, not evidence that the later revision was tested. Current revision checks are recorded below and in `HOMEPAGE-VERIFICATION.json`.

| Check | Result |
| --- | --- |
| Unit and existing framework checks | **96 tests passed across 8 files**, including catalogue, complete translations, publication boundaries, and language navigation checks. |
| Type checking | Passed. |
| Biome lint and formatting | Passed after the final HTTP report update; 125 files checked with no diagnostics. |
| Production build | Passed after the concise About redesign and its Russian/Tatar translations. Proxy middleware is included. Local build used the documented environment-validation skip; the framework schema remains intact. |
| Catalogue and case routes | All 96 localized HTML routes return 200; all 72 localized case narratives match the API. Each language API returns 24 cases. Invalid/default request checks pass. |
| Existing public routes | Home, pricing, athlete intake, federation intake, and health return HTTP 200. No intake submission or email send was performed. |
| Sitemap and assets | Sitemap, social PNG, and paper PDF return HTTP 200 with the expected content types. The PDF is 993,246 bytes and matches the supplied excerpt. |
| Search and navigation in browser | Search plus capability filtering, zero-results/reset, reveal-all, direct case access, and return to the filtered list verified. |
| Responsive presentation | Desktop and 375px/320px viewports inspected. No horizontal overflow in the tested narrow layouts. Mobile navigation opens and closes through its links. Light and dark themes inspected. |
| Final wording | All three names visibly use **4** in the refreshed home, initiative sections, and footer. Independent public-source scan found no former application-target branding. |

The latest About review checked the actual narrow mobile layout at 320 CSS pixels in all three languages, with no horizontal overflow and 44px story-link targets. The three-column comparison and initiative layout were inspected at wider widths. Both themes were inspected, and the temporary viewport override was reset. The About page uses the same content records as its metadata and Markdown version.

The final HTTP details are in [HTTP-VERIFICATION.json](HTTP-VERIFICATION.json) and [WEB-CHECKLIST.md](WEB-CHECKLIST.md). HTML exposes semantic headings, localized content regions, canonical and language alternates, structured data, and a Markdown alternate. Custom HTTP Content-Language and discovery Link headers are not added to HTML; Markdown and API responses expose their own language headers. The optional llms.txt is a discovery aid, not a guarantee of AI citations. Local robots and page metadata remain non-indexable until an explicitly configured public deployment.

The final production HTTP audit had zero required failures: all 96 pages carried strict production CSP with distinct script nonces, all three About editions matched the concise source, and all founder footer checks passed. Twelve Markdown responses and nine error/default cases passed. Eight original and eight optimized badge images returned 200 and decoded successfully. No public deployment was performed.

The browser review was a practical interaction and visual check, not a full screen-reader accessibility audit. Print styling and retry controls are implemented; actual printer output and network-failure injection were not tested. The local server can be restarted using the instructions in the root README. It is a local review URL, not a publicly shareable deployment.

## Implementation notes

The implementation stays in user-owned routes, components, content, contracts, hooks, styling, and configuration companions. Framework security, ownership manifests, layout, and environment schema were preserved. A user configuration setting anchors the Next.js development workspace to this project, avoiding accidental discovery of a parent lockfile.

Earlier findings in [BASELINE-CHECKS.md](BASELINE-CHECKS.md) are an implementation-time snapshot. Their image-path, semantic-markup, retry-dependency, skip-link, and formatting issues were resolved before the final successful checks above.

Source records: [Drive review](drive-source-review.md), [website review](web-source-review.md), [brand review](brand-source-review.md), and [paper review](research-paper-review.md). These documents retain provenance and editorial decisions for future updates.

## Durable editorial corrections

Use **Emerald Pasture** as the public philosophy name. Do not reintroduce the removed Broken Wheel/Mesh section, the three meanings of emerald section, internal roadmap titles or slogans, or “immigrant enterprise.” Use the founder's approved “immigrant experience” wording. The Google Docs are context for concise public copy, not material to paste wholesale. Humanizing edits must preserve source facts and the founder's expert positioning.

### Subsequent footer and name layout correction

The shared footer now places page/policy links and initiative links in two columns below the full-width brand block, including on mobile. The founder heading scales to its container and keeps the full name on one line. English, Russian, and Tatar were checked at 320 CSS pixels with no heading or page overflow; the footer retained two columns. Scoped formatting checks passed. The earlier production audit remains a point-in-time record; the local preview is running in development mode for continued visual review.

Kamilla rejected placing the ruby dot inside the final k. The previous wordmark is restored with the original 0.52rem dot beside the k and a 0.3rem gap. Palette values were not changed. The founder portrait is 128px on desktop and 96px in the compact layout. Grouped section links sit beside the portrait on smaller screens, removing the tall blank area caused by the previous wrapping row. The single-line name and two-column footer are preserved.

## Bulachak homepage revision (2026-09-12)

The homepage now represents Bulachak's vision and three initiatives. It does not lead with Kamilla's portrait, name, biography, personal process, or case catalogue. A4A, P4P, and I4I receive equal cards with a purpose, short description, and link to the initiative's story. The approved motto and a brief Emerald Pasture statement connect the page. Founder experience is a supporting section near the bottom.

All 24 existing cases remain on the separate localized Work page, explicitly attributed to the founder. Home, Branches, About, Work, and Founder are the primary navigation. Search, category filters, and return-to-results state remain functional. Old homepage query links redirect to Work. A same-page anchor correction also prevents the wordmark from appending a second fragment to the address.

Home metadata, social preview, structured data, Markdown, and `llms.txt` now identify Bulachak and its initiatives. Founder pages identify the person; Work and individual cases retain her authorship. The sitemap includes 99 localized site pages after adding the three Work URLs. Public deployment has not been performed.

Current verification:

- **114 tests passed across 10 files**, including new homepage identity, authorship, localized Work URLs, and same-page anchor regressions.
- Type checking and Biome passed; the final lint run checked 130 files.
- The optimized production build passed, with the existing proxy and security configuration preserved. The local preview is running the new production build on port 3000.
- Browser checks covered the English desktop home, all three languages at a narrow 320px target, Russian navigation at a 1024px target, and Tatar mobile menu navigation to Work. No horizontal overflow was found in these checks; both language and theme controls remain visible. Temporary viewport changes were reset.
- Search for Everest, case opening, return to the filtered results, and legacy homepage search-link migration worked. The corrected wordmark link returned from the branch section with one `#portfolio-main` fragment.
- The production homepage loaded without browser console errors. Detailed focused HTTP checks are recorded in [HOMEPAGE-VERIFICATION.json](HOMEPAGE-VERIFICATION.json), separately from the earlier comprehensive audit.

The approved wordmark, emerald/mint/ruby colors, compact founder badge footer, single-line founder name, smaller portrait, and two-column shared footer were preserved.

### Homepage copy and branch terminology correction

Kamilla rejected “initiatives” as the collective label and asked for each branch to be introduced before being referenced collectively. The introduction now names Agents 4 Athletes, Parafencing 4 Progress, and Immigrant 4 Immigrant with their practical focus. Related public labels use branches / направления / юнәлешләр. The correction also reaches About copy, case context labels, Markdown, metadata, and `llms.txt`; development status and evidence limits remain unchanged. Historical source documents and unrelated self-initiated project wording are not rewritten.

The active `baza-skills` copywriting and copy-editing skills informed this focused correction. The English introduction was verified in the local browser; 34 existing homepage and localization checks and the 130-file Biome check passed. The preview now runs in development mode for continued copy review. The preceding production build and HTTP audit remain the record for the prior wording, not a claim of rebuilding after this text-only revision.

### Stacked hero and co-opetition restoration

The homepage hero now places its larger title first, followed by the supporting text and links in one column. The title can use the full available width while the paragraph retains a readable line length. The layout was inspected at 1280px and at a 320px target in English, Russian, and Tatar; all supporting content sits below the title and no horizontal overflow was found. Temporary viewport settings were reset.

Co-opetition is explicit in the homepage philosophy and About section: people can compete and cooperate simultaneously, share knowledge, and combine strengths to grow total value. Russian names and explains коопетиция; Tatar explains the coexistence of competition and cooperation directly. The About comparison still respects people's time and capacity. No new sections were added.

All six localized home/About HTML pages and all three home Markdown versions returned 200 with the updated concept present. The About wording was also checked in the browser. The 34 existing homepage/localization tests and 130-file Biome check passed. The local development preview remains active; the prior production audit is historical.

### Project-led branch pages (2026-09-12)

All nine A4A, P4P, and I4I pages now describe each branch's purpose, approach, and development in English, Russian, and Tatar. The first-person founder narratives and personal project lists were removed from branch copy. Co-opetition is explained on every branch page. I4I leads with immigrant kinship, mutual support, and cultural continuity; business support is one part of that broader purpose. Its eye-for-eye wordplay remains explained. A4A retains the coordinated agent design and human responsibility. P4P retains equipment, coaching, sustained participation, and its developing nonprofit status. Funding remains a pledge against future revenue.

The branch pages' main closing link now leads to the Bulachak philosophy. A secondary link identifies the founder's related work accurately. The policy introductions describe the Bulachak website, and the root site's navigation labels its link Bulachak. Founder biographies, the exact badge footer, and actual case authorship remain intact. The source draft now explicitly marks its earlier first-person branch copy as superseded.

Verification for this development-preview revision:

- All 123 tests passed across 11 files. Nine new checks guard against singular founder narration on project pages and verify project metadata and Organization identity; existing founder/case authorship checks remain in place.
- Type checking and Biome passed; Biome checked 131 files.
- All nine localized branch HTML pages and nine corresponding Markdown responses returned 200, with descriptions and co-opetition present.
- The revised Russian A4A page was inspected in the browser. Its philosophy link opened Russian About correctly. Tatar I4I was inspected at a 320px target; no horizontal page or action overflow was found. Temporary viewport settings were reset and the temporary review tab was closed.

The local server remains in development mode on port 3000. No production rebuild or public deployment was performed for this copy revision.

### Tatar publication hold and media reading (2026-09-12)

Kamilla requested that Tatar be hidden until its phrasing has been reviewed. All Tatar translations remain in the project, but only English and Russian are published. The language selector, metadata alternates, sitemap, site language declarations, and llms discovery links omit Tatar. Valid Tatar page URLs temporarily redirect to the matching English page with query values preserved. API and Markdown requests for Tatar return 404, no-store, and noindex without the draft content. Client navigation uses English if a previously open Tatar URL remains during the transition. This is a publication hold, not an access-control boundary around source code.

Verification: all 128 automated tests passed across 12 files, type checking passed, and Biome checked 132 files successfully. Five publication tests cover draft retention, selector/discovery, valid Russian routes, and both page and metadata redirects. Live HTTP checks confirmed the redirects, omitted Tatar discovery links, and 66 published portfolio sitemap routes. Fifteen catalogue/Markdown requests covered all three language values and the aggregate, home, work, and single-page text modes: English and Russian returned 200; Tatar returned 404. The existing browser preview moved from Tatar A4A to English A4A and showed only English/Russian choices.

Eight full articles were read from Tatar-Inform, Söyembikä, and Intertat to inform a later language pass. [The review record](TATAR-LANGUAGE-REVIEW.md) links the exact source notes and separates observed wording from editorial inference. These readings and the structural tests do not validate conversational Tatar. No Tatar prose was rewritten or approved in this task. The draft remains hidden pending language review; the local development server remains active and no public deployment was performed.


### Tatar rewrite and restoration (2026-09-12)

Kamilla requested the Tatar edition be rewritten using the collected media references and made visible again. This supersedes the preceding publication hold. The edit covers the homepage, About, A4A/P4P/I4I, Founder, all 24 case studies, policies, interface labels, metadata, and readable text. English and Russian copy was preserved. Canonical names, co-opetition, human responsibility, development status, the future 4% pledge, case metrics, and evidence limits remain intact. The editors performed meaning and source-fidelity checks; no native-human review or fluency certification is claimed. See [Tatar review record](TATAR-LANGUAGE-REVIEW.md) and [case rewrite notes](tatar-case-rewrite-notes.md).

Tatar is restored in the selector, direct routes, catalogue, Markdown, metadata alternates, sitemap, structured-data language declarations, and llms discovery links. Unsupported-language guards remain in place. The current sitemap contains 99 localized portfolio URLs.

Verification for this revision:

- All 129 tests passed across 12 files. Type checking and the 133-file Biome check passed. The test runner required normal filesystem access after its configuration loader was blocked by the sandbox.
- All 33 Tatar HTML pages returned 200 with a heading and without a redirect. Fifteen catalogue/Markdown requests across English, Russian and Tatar returned 200 with the corresponding Content-Language header. Details are in [TATAR-RESTORATION-CHECKS.json](TATAR-RESTORATION-CHECKS.json).
- All 33 Tatar pages were opened in the browser at a 320px target after language initialization. No page or inspected text/link overflow was found.
- Rendered screenshots were inspected at phone portrait (390x844 and 320x780), phone landscape (844x390), tablet portrait (768x1024), tablet landscape (1024x768), desktop portrait (1080x1920), and desktop landscape (1440x900). The sampled views covered Home, About, all three branch introductions, Founder, the compact badge section, Work, and a case study. This is representative visual review, not a claim that every paragraph was inspected at every possible size.
- Narrow Tatar case and story headings now scale to the available width. Short comparison headings and introductory/card text balance their lines. Meaningful ending phrases and reading-time labels stay together; ordinary words are not split. The resulting title, label, paragraph and comparison fixes were checked in rendered views.
- The I4I language selector navigated to the equivalent English page and back to Tatar. The original compact eight-badge layout, single-line founder name, two-column footer, colors, and wordmark were retained.

The revised site is available in the local development preview. No public deployment or new production build was performed for this editorial revision.
