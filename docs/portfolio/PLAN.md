---
title: General portfolio rebuild
created_by: Codex
date_created: 2026-09-12
status: complete
updated_by: Codex (web_case_studies)
last_updated_on: 2026-09-12
---

# General portfolio rebuild

Build one employer-neutral body of work that serves prospective collaborators, clients, community partners, and application reviewers. Reuse the existing case-study narratives and evidence; replace application pitches and fragmented navigation.

## Scope correction: Bulachak site and vision (2026-09-12)

Tatar restoration: Kamilla's latest instruction authorized rewriting the whole Tatar edition using the saved media references and restoring it alongside English and Russian. This supersedes the earlier hold, during which Tatar page requests redirected to English and Tatar data/text requests returned 404. The edition has been edited while preserving agreed names, project facts, authorship, evidence limits, and policy substance. The language review was an agent editorial meaning check, with no native-human validation; the media readings remain research, not fluency certification. The publication configuration now includes all three languages. See [TATAR-LANGUAGE-REVIEW.md](TATAR-LANGUAGE-REVIEW.md) for the decision and review limits, and [BUILD-REPORT.md](BUILD-REPORT.md) for final implementation and visual checks.

This positioning governs every public project page, including A4A, P4P, and I4I in English, Russian, and Tatar. Describe each branch's purpose, approach, philosophy, and development. Do not narrate the founder's work with first-person pronouns or replace those pronouns with repeated mentions of Kamilla. Bulachak is larger than a personal portfolio. AI agents are part of the founder's current team; this does not establish deployed customer capabilities or a larger human team. Personal biography belongs on Founder; earlier case results retain their actual authorship. Keep project status concise and separate from the introductory purpose. Policy and navigation labels must identify the Bulachak website.

Preserve **co-opetition** as a core Emerald Pasture concept. Kamilla specifically corrected its omission: competition and cooperation coexist; shared knowledge and complementary strengths grow total value instead of only reallocating a fixed pool. Plain-language edits must explain that distinction rather than reduce the philosophy to generic cooperation. Keep this concise in the homepage and About copy, with equivalent Russian and Tatar explanations.

The homepage hero must be a vertical sequence: prominent title, supporting copy, then links below. Avoid the earlier split-column title/paragraph arrangement. The approved wording and colors remain the source of truth.

Latest terminology correction: call A4A, P4P, and I4I **branches** in English, **направления** in Russian, and **юнәлешләр** in Tatar. Kamilla rejected “initiatives.” Introduce all three by their full names and practical focus before referring to them collectively. This supersedes earlier initiative wording in this planning record. The homepage introduction now names Agents 4 Athletes (practical support in sport), Parafencing 4 Progress (access to adaptive fencing), and Immigrant 4 Immigrant (community and mutual support). These are purposes, not invented claims of delivered outcomes.

For this correction, the active `baza-skills/skills/copywriting` and `copy-editing` skills were applied for clarity, specificity, and preservation of the source message. `brand-perception-psychologist` and `product-marketing-context` were reviewed as available positioning resources. No new philosophy, branding system, or strategy document was invented.

Kamilla clarified that the homepage belongs to Bulachak and its vision, which is larger than the founder's personal portfolio. This correction supersedes the portfolio-first homepage framing in the original delivery plan below. The homepage now leads with the approved motto, "A future we build together," and the three connected initiatives. The existing Russian and Tatar motto translations are preserved. The emerald, mint, white, and ruby design continues; a founder portrait or personal biography does not lead the hero.

The three branches carry the main explanation: A4A develops commercial tools and operations support for athletes and sport; P4P is an adaptive-fencing nonprofit initiative in development; I4I concerns immigrant community, kinship, and mutual support. A brief Emerald Pasture statement and "Human alignment first, AI second" connect them. Full initiative names come from the existing canonical branch data, without repetition inside card descriptions.

The founder's earlier projects appear as experience informing Bulachak's direction. Their outcomes must not be relabeled as Bulachak delivery or initiative traction. The portfolio and founder page remain supporting destinations. Home copy must not introduce personal first-person stories, registration claims, numbers, a Mesh section, the three meanings of emerald, or historical variants of the philosophy's public name. Use community and immigrant kinship language.

Copy is maintained in `src/lib/business/bulachak-home.ts` as `bulachakHomeCopy`, with parallel English, Russian, and Tatar fields and the exported `BulachakHomeCopy` contract. Keep the English homepage concise, with enough context to introduce the named branches and define co-opetition. This note records the homepage correction and copy handoff; final implementation and validation belong in the build report.

Provenance: Kamilla's direct September 12 homepage correction controls the presentation. Content draws on the supplied [founding vision and three-legs architecture](https://docs.google.com/document/d/1-ONrDF4pZd-9fql3-CCpBMufcDQJHh-_yAv_AUXYKMw/edit), the [Emerald Pasture Article Draft V5](https://docs.google.com/document/d/1kSCX35ux1jH6KZaBq1U1r69pgfSHZqcZSnYDxoLcyQU/edit), and the concise About copy reviewed during this session. The sources are context, not public text to reproduce in full. Detailed source limits, historical wording, and the durable rule against invented first-person principles remain in [STORIES-DRAFT.md](STORIES-DRAFT.md).

## Delivery plan

1. Review both Drive archives and the four supplied sites. Reconcile duplicates against detailed case evidence. Keep an internal source register.
2. Use Bulachak's principle of growing value rather than extracting it. Present A4A, P4P, and I4I as connected expressions of the work, following the founder's recorded preference for an integrated portfolio matrix.
3. Create a dedicated `/portfolio` home with selected work, search, capability filters, an approach section, a short founder introduction, and a contact action. Preserve the A4A service website while making the portfolio reachable from it. Implemented at `/portfolio`, where Kamilla reviewed the naming.
4. Give every retained case a stable, shareable page with problem, role, approach, delivered work, results, and evidence limits. Remove company-specific application sections, pitches, footers, links, metadata, and labels. Preserve actual project/client context where supported.
5. Use clear status labels for delivered work, live products, prototypes, and strategy. Do not turn targets, simulated data, or portfolio-reported results into independently verified impact claims.
6. Test navigation, search, filters, direct case links, unavailable-content states, mobile layout, keyboard access, and existing application checks. Produce a locally reviewable working site.

## Content decisions

- Use Bulachak / P4P naming supported by source materials, subject to Kamilla's current correction.
- I4I uses the singular Immigrant. On September 12 Kamilla requested consistent spelling across all three names; the new display standard uses **4**: **Agents 4 Athletes / Parafencing 4 Progress / Immigrant 4 Immigrant**. Historical source quotations retain their original spelling.
- Exclude empty case placeholders and redundant employer-targeted proposals. Reframe reusable underlying methods where substantive evidence exists.
- Keep research notes and raw source material out of public assets and API responses.
- Treat the four percent contribution as a stated pledge, not evidence of completed transfers. Do not describe P4P as a registered nonprofit.
- Kamilla supplied the original research PDFs during implementation. The four-page paper excerpt is included as a direct public reading asset; the larger partial proceedings volume remains outside the public site. Publication authorship and the 2025 citation are verified against the supplied files; the article's reported implementation metrics are not adopted as portfolio results.

## Completion evidence

Completed and locally verified on September 12, 2026. See [BUILD-REPORT.md](BUILD-REPORT.md) for the delivered scope, checks, and evidence limits. Public deployment is separate from the completed local build.

## Review revisions completed

The portfolio now has English, Russian, and Tatar editions; separate About/Founder/initiative pages; visible Privacy/Terms; source-based metadata and text discovery; and the approved emerald, mint, white, and ruby palette. The founder footer reuses the original compact badge row and expert positioning. Theme controls remain visible, with a consistent subtle corner hierarchy.

The latest About revision replaces the document-like essay and sidebar outline with a concise introduction, three comparison cards, a human-alignment statement, and three initiative links. Removed sections remain removed. The philosophy documents serve as editorial context, with public naming fixed to Emerald Pasture. The latest source copy and durable corrections are recorded in STORIES-DRAFT.md.
