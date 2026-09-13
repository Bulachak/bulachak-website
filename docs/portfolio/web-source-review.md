---
title: Public portfolio source review
created_by: Codex
date_created: 2026-09-12
scope: Read-only review of user-supplied public portfolio sites
---

# Public portfolio source review

The broad case-study archive is reusable. The application framing should be replaced at page, navigation, footer, metadata, and URL levels. Several home-page summaries overstate or contradict the detailed cases; migrate detailed evidence and avoid copying summary claims automatically.

## Sources and review method

All four supplied sites were observed in the browser on 2026-09-12. The web text extractor could not open them, but the browser loaded their visible content. Review included all four homepages, the Quoreka portfolio index, PPPP, and the detailed cases cited below. Asset URLs were read from the rendered pages. This review establishes what the portfolios claim and show; it is not independent verification of employment, credentials, performance metrics, client authorization, or production status.

| Source | Observed reuse opportunity | Remove or rewrite |
| --- | --- | --- |
| [Quoreka portfolio](https://kamilla-for-quoreka.netlify.app/) | Most complete general systems archive: index lists 21 case-study pages, PPPP, and three publications. | Quoreka footer; repeated “How I would apply this at Quoreka” sections; employer-specific relevance arguments; old hostname. |
| [Fencing Hub portfolio](https://fwncing-hub-by-kamilla.netlify.app/) | Same underlying archive with sport/community emphasis and extra distribution cases. | Consulting proposal to Fencing Hub, proposal page for Pierre Loisel, sports-tech-only hero, target-specific footer. |
| [FamBot portfolio](https://fambot-by-kamilla.vercel.app/) | Reuses strong public-service, family-access, content and brand-tooling cases. | Entire homepage pitch; FamBot nav labels; Marina pitch; “Why this matters for FamBot”; promised future acquisition outcomes; target-specific footer, resume and metadata. |
| [Luxiomer proposal](https://luxiomer.netlify.app/) | Russian-language explanation of systems-first consulting; LA28, PlayLA and anonymous PR agency stories; knowledge-tree metaphor. | Yorkin/Юркин/Йоркин personal address; private company-system diagram; bespoke scope/pricing; “your inventory”; proposed quest framing; April 2026 recipient footer. |

The user asked to remove companies applied to, not erase legitimate project subjects. Retain genuine case subjects such as PlayLA, SFFA and Everest Tower where supported. Preserve anonymous client treatment for the PR agency. Luxiomer is both a proposal recipient and an asserted case subject: do not present its implementation claims as established without checking primary artifacts.

## Detailed cases and migration guidance

| Case | Observed deliverable and evidence | Claim/status handling |
| --- | --- | --- |
| [Everest Tower](https://kamilla-for-quoreka.netlify.app/case-study-everest-tower) | Local appliance-repair website rebuild; Netlify; Cloud Run server-side GTM/GA4; before/after performance screenshot, trust-logo comparison, realtime event image, Vimeo verification. Detailed page reports mobile performance 46→92, LCP 27.5s→2.4s, TBT 370ms→0ms and phone-call-click tracking. | Use this detailed version. Homepage cards incorrectly call it luxury real estate and claim 18s→sub-2s / score 96. Do not infer sales lift or conversion-rate increase from tracking implementation. |
| [PR agency BizOps](https://kamilla-for-quoreka.netlify.app/case-study-pr-agency-bizops) | Anonymous international sport PR agency; custom Airtable CRM, Risk & Vulnerability Matrix, n8n, iPhone Shortcuts and multilingual proposal workflow. Shows generator, funnel and risk-audit images. Reports 90-day implementation and proposal preparation reduced from days to hours. | Keep agency unnamed. Risk review is semi-automated with human reviewers. Fencing Hub preview incorrectly tags Salesforce; detail explicitly confirms Airtable/n8n/Shortcuts. Timing outcomes are portfolio-reported, not externally audited. |
| [AiSA generator](https://kamilla-for-quoreka.netlify.app/case-study-aisa-generator-app) | Internal React/TypeScript branded marketing-asset tool; approved format/layout/theme choices; channel-specific copy; exports; Google sign-in. Shows launch preview, team announcement, demonstrations, source excerpts and access screen. | Present as internal tool with demonstrated features. “130KB of output” is an implementation detail, not a meaningful impact metric. Do not equate the client-side domain-check excerpt with verified enterprise security. No quantified time savings or adoption counts observed. |
| [SFFA brand system](https://kamilla-for-quoreka.netlify.app/case-study-sffa-brand-generator) | Inclusive “Fencing for All” identity; warm cream/red/gold/blue tie-dye system; brand book and React campaign generator for summer camps. Before/after hero and two animated work samples. | Built brand system and working generator are supported by work samples. Avoid invented enrollment, revenue or conversion gains. Strong broadly relevant story about making inclusive intent visible and repeatable. |
| [PlayLA public webapp](https://kamilla-for-quoreka.netlify.app/case-study-playla-flag-football-webapp) | Bilingual mobile-first public resource; location search, 15 active program locations, loaded map directions, parent guide, equipment, game-day and emergency resources. Data-to-interface image and multiple walkthrough videos. | Keep distinction between citywide data foundation and 15 active locations. Detailed page says 1,700+ mapped facilities while ops page enumerates 1,520 schools + 419 parks. Do not repeat preview claims of league registration, standings and score entry: detailed evidence is a public resource portal. |
| [PlayLA operations](https://kamilla-for-quoreka.netlify.app/case-study-playla-flag-football-ops) | Airtable relational map connecting 1,520 schools, 419 parks and 15 active sites; geographic dashboard, operations dashboard and workflow diagram. | Describe connected data and coverage visibility. No before dashboard exists; page explicitly says none is invented. Do not infer citywide participation impact from record counts. |
| [LA28 inventory](https://kamilla-for-quoreka.netlify.app/case-study-la28-inventory-distribution) | Smartsheet inventory/distribution dashboard with Workday, Salesforce and Agiloft context. Dashboard shows reported $1.1M inventory and $295K+ distributed; storage-room photo supplies human context. | Precise detail version is stronger than rounded $1M/$300K proposal version. $0 means extra tool spend, not zero labor or total operating cost. Avoid claiming completed LA28 Games event delivery: this is equipment-distribution work. |
| [Hall of Fame governance](https://kamilla-for-quoreka.netlify.app/case-study-usa-fencing-hof) | Chair-led process design; six-entity model, 36 rubric-rule rows, Neon, Node.js ballot pipeline and review portal. Several interface/database/code screenshots. | Text says election “Live,” but inspected portal screenshot says “Official governance — confidential”; its database notice says in development/not active for Class of 2027. Use cautious “governance system and review tooling” wording; omit confidential screenshots from new public covers; do not assert all layers are live. |
| [Organic content](https://fambot-by-kamilla.vercel.app/case-study-viral-content.html) | Full-cycle short-form production and public Instagram examples. One reel reported at 191,719 views, 367 shares and 228 saves; other items have separate counts and partnership context. | Treat counts as historical snapshots. Fencing Hub homepage claims 4.4M+ views/1.5M+ engagements with no aggregation proof reviewed. Do not label this “zero CAC”: no customer-acquisition denominator established, and unpaid distribution still uses labor. Remove the FamBot promise to acquire first 1,000 parents. |
| [Luxiomer diagnostic](https://kamilla-for-quoreka.netlify.app/case-study-luxiomer-ical) | Text-only “evidence” descriptions for diagnostic, scheduling integration and modular sprint architecture. Claims resolved friction and $5K–$15K sprints. | Hold implementation/outcome claims. Original proposal has different pricing ($3,500 audit / $5,500 integration / $3,000 personal OS) and names ICAL Construction as a business. Possible confusion between ICAL company and iCalendar protocol needs source review. Use only clearly labeled diagnostic/proposal if included. |
| [PPPP framework](https://kamilla-for-quoreka.netlify.app/pppp-framework) | Past, Present, Possible, Practice; Protocol as continuous supporting layer. Outputs: clarity, coherence, capacity, continuity. Cross-domain methodology for governance, AI adoption, small business and public/community programs. | Strong general-audience bridge. Remove Quoreka footer and unverified scale claim about programs for 10–10,000 people unless independently supported. Frame as Kamilla's working methodology, not validated universal causal law. |

## Archive index observed

[Quoreka portfolio index](https://kamilla-for-quoreka.netlify.app/portfolio) provides the following routes. Cases not discussed above were observed as index entries only; their implementation/results have not been reviewed here.

- AI/product: AiSA generator; serverless cloud visualization.
- Brand/GTM: social brand identity; SFFA brand generator; ArtDesignStory market entry.
- Operations/CRM: PPPP; Luxiomer; Everest Tower; PR agency; Electrome; AiSA master operations plan; AiSA course funnel; FV Partners; Tuganlyq; workforce nonprofit CMS; dermatology; Hall of Fame.
- Sport: Meraki Tennis research; PlayLA public webapp; PlayLA operations; LA28 inventory; school activation.
- Fencing Hub homepage also links organic content, creator ecosystem, and its bespoke strategic proposal.

The source count is 21 cases + one methodology. The page's category totals add to 22 because PPPP sits inside operations. Avoid hard-coding 21+/25+ until the new published dataset determines its count.

Research links observed (links/title/year verified in portfolio, papers not opened here):

- [AI process automation in sports / Meraki Tennis (2025)](https://www.academia.edu/167900290/Use_of_Artificial_Intelligence_for_Process_Automation_and_Optimization_in_Sports_Organizations_Meraki_Tennis_Case_Study)
- [AR fan engagement / Paris 2024 (2024)](https://www.academia.edu/126023036/Use_of_Augmented_Reality_in_Fan_Engagement_Paris_2024_Olympic_Games_Case_Study)
- [VR for new sport audiences (2023)](https://www.academia.edu/120297121/Virtual_Reality_as_a_Tool_for_Attracting_New_Audiences_to_a_Sport_Discipline)

## Reusable media references

Direct assets below are observed source URLs, not newly generated artwork. “Visually checked” means opened full-size in browser; other entries were read from the rendered case DOM. They contain genuine project branding, not application-site chrome. Three verified assets were subsequently packaged locally for the portfolio build; see provenance below.

| Asset | Review | URL |
| --- | --- | --- |
| Kamilla portrait, lavender blazer, circular crop, 384×384 | Visually checked; no target-company wording | [Portrait](https://res.cloudinary.com/dp9lnazkj/image/upload/v1772235120/Kamilla_-_Personal_Brand_Board_3_kwhcca.webp) |
| SFFA before/after homepage, 1600×1673 | Visually checked; genuine SFFA identity, no employer targeting | [SFFA comparison](https://res.cloudinary.com/dp9lnazkj/image/upload/w_1600,f_auto,q_auto:best/v1778920665/sffa-hero-section-before-after_oo4mir.png) |
| SFFA brand-book flipthrough | DOM reference, animated WebP | [Brand book](https://res.cloudinary.com/dp9lnazkj/image/upload/v1778919621/sffa-brandbook-flipthrough-video-to-webp_zbgcij.webp) |
| SFFA asset generator | DOM reference, animated WebP | [Generator](https://res.cloudinary.com/dp9lnazkj/image/upload/v1778920597/sffa-marketing-branded-assets-generator-app-recording_jdovox.webp) |
| PlayLA database/program-card comparison, 1905×1181 | Visually checked; public recreation-center data; right side is parent-facing UI | [PlayLA comparison](https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto,q_auto/playla-flagfootball-json-and-frontend-side-by-side_p6tzsk) |
| PlayLA location directions demo | DOM video reference | [Locations video](https://res.cloudinary.com/dp9lnazkj/video/upload/Playla-flagfootball-locations_vw34nc) |
| PlayLA parent-guide demo | DOM video reference | [Parent guide](https://res.cloudinary.com/dp9lnazkj/video/upload/playla-flagfootball-parent-guide_jtklfa) |
| PlayLA bilingual equipment demo | DOM video reference | [Bilingual demo](https://res.cloudinary.com/dp9lnazkj/video/upload/Playla-flagfootball-equipment-bilingual_cgcfov) |
| AiSA launch preview | Observed case link; no full-size visual inspection | [AiSA launch](https://res.cloudinary.com/dp9lnazkj/image/upload/v1779109018/stay-on-brand-aisa-app_p8rqhx.png) |
| Everest performance comparison | DOM reference | [Performance evidence](https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto/q_auto/v1778900349/everest-pagespeed-before-after-mobile-2026-02-22_boisvd.png) |
| Everest visual comparison | DOM reference | [Website comparison](https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto/q_auto/everest-webpage-before-after_gcllkq.png) |
| Everest GA4 event image | DOM reference | [Event evidence](https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto/q_auto/everest-ga4-realtime-phone-call-click-thumbnail_qa53nx.png) |
| Everest event verification video | DOM iframe reference | [Vimeo](https://player.vimeo.com/video/1192757293?badge=0&autopause=0&player_id=0&app_id=58479) |
| LA28 inventory dashboard | DOM reference; inspect details before public reuse | [Dashboard](https://res.cloudinary.com/dp9lnazkj/image/upload/w_1600,f_auto,q_auto:best/v1778904826/inventory-distribution-dashboard-la28-case-study_jgdmbe.webp) |
| Kamilla in inventory storage room | DOM reference; potential human-context cover | [Storage-room photograph](https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto,q_auto/v1778906126/before-la28-case-study_pksows.png) |

Do not reuse [Hall of Fame portal screenshot](https://res.cloudinary.com/dp9lnazkj/image/upload/w_1600,f_auto,q_auto/v1776874949/usa-fencing-hof-committee-review-portal_e0emqz.webp) as a public cover: visually inspected and prominently marked confidential. Prefer an original, clearly labeled process illustration or a public artifact approved for sharing.

### Local asset provenance

Downloaded on 2026-09-12 from the exact portrait, SFFA comparison and PlayLA comparison URLs in the media table for use in the site build. Files are unchanged response bytes, not edited screenshots. File signatures were checked (RIFF/WEBP for portrait; PNG for both case images), and all three local files were visually reopened. No Quoreka, FamBot, Fencing Hub application wording or private personal data appears. PlayLA contains public recreation-center address, telephone and coordinates plus non-secret record identifiers; no credentials or private participant data are visible. The SFFA image depicts the actual client site. These assets were already publicly embedded in the user-supplied portfolios.

| Site path | Format / dimensions / size | SHA-256 |
| --- | --- | --- |
| `/portfolio/kamilla.webp` | WebP, 384×384, 12,962 bytes | `8761BEEDC888484B5D1497EAAE9B9058654D4A7C82CF8B037FC5132D8520C16D` |
| `/portfolio/sffa.png` | PNG, 1600×1673, 738,153 bytes | `5483D73D258BDAD774099EFF42EA95C49CCB0117013704E6E30F327D1A9C74B9` |
| `/portfolio/playla.png` | PNG, 1905×1181, 188,283 bytes | `8B4E5450EFC744BEF742E5447B2509F4F5B943BD94BE29FE694CBAE60E0FF37A` |

Storage paths are under `C:/Users/kamil/PROJECTS/a4a-p4p/public/portfolio/` with the filenames above. A card may position the PlayLA image toward the right to emphasize the parent-facing product rather than the data receipt; preserve the full image in the case-study evidence view.

## Proposed general-audience format

This section is a proposal, not a claim about existing outcomes. Give each case one primary leg and optional cross-links after the canonical A4A/B4P/I4I definitions are established. A reader should choose a practical need, inspect the work, and see the broader philosophy without learning all the internal labels first.

Use a consistent short sequence: challenge → role and scope → what was built → work samples → documented result → transferable principle. Put tools and expanded technical detail lower on the page. Replace recipient-specific relevance with the practical lesson; remove future promises written for one company. Offer clear artifact/status labels such as implemented system, internal tool, research, or proposal. Keep a complete searchable/filterable archive and a small selected-work path. Avoid duplicate next/previous navigation, repeated credential walls, and hard-coded archive totals that drift.

A sound universal principle already appears in the PPPP source: values become credible when they are expressed in the operating system. Cases can demonstrate this through access (bilingual directions), inclusion (SFFA), continuity (shared records), trust (human-reviewed risk/governance), and capacity (reusable tools). The brand researcher should supply the exact canonical leg names and meanings.

## Public project-action verification

Checked on 2026-09-12 in the browser. Existing user-owned Everest and SFFA tabs were read without changing their pages; a temporary task tab was used for PlayLA home and its visible program-finder link. No forms, contact actions, registration, location permission requests or third-party communications were submitted. This is a point-in-time destination check, not a production-status or ongoing-availability guarantee.

| Destination | Observed result | Portfolio action |
| --- | --- | --- |
| [Everest Tower public website](https://everest-tower.com/) | Appliance-repair homepage with public services, brand expertise, service areas, contact and booking links. No old application-company framing or private operational records in the observed homepage. | Added “Explore the website” to `everest-digital-experience`; evidence note records check date while retaining historical-performance caveat. |
| [PlayLA public app](https://playla-flagfootball.netlify.app/) | Public coach/player/parent resource with rules, playbook, practice, game-day and location navigation; Spanish switch; civic partner context. No old application-company framing or private participant data in the observed homepage. | Added “Explore the public app” to `playla-family-resource-app`. |
| [PlayLA program finder](https://playla-flagfootball.netlify.app/locations) | Followed visible “Find a Program” link. Page displays 15 public recreation-center cards, address/telephone information, region/search controls and direct Google Maps directions. No private participant information observed. | Added “Try the program finder” to family-app case and “Explore the public program finder” to operations case. Family-app evidence note records observed date and retains outcome limits. No geolocation button was activated. |
| [SFFA full brand book](https://sffa-brandbook.netlify.app/) | Repeated explicit draft, proprietary/confidential and unauthorized-use notices. Contains internal strategic/commercial planning, rather than only a public visual guide. | **Not linked from the broad public portfolio.** Prior browser accessibility capture of the whole page is evidence for this exclusion, not authorization to republish its contents. |
| [SFFA strategic marketing playbook](https://sffa-strategic-marketing-by-kamilla.netlify.app/) | Explicit proprietary/confidential draft notices and sections marked locked pending payment. Client strategy and planned campaigns appear in the document. | **Not linked from the broad public portfolio.** No attempt made to defeat locking, export the document or use restricted sections. |
| [Selected SFFA before/after sample](https://res.cloudinary.com/dp9lnazkj/image/upload/w_1600,f_auto,q_auto:best/v1778920665/sffa-hero-section-before-after_oo4mir.png) | Previously inspected full-size and packaged locally; shows only the two public-facing hero designs without confidential notices or internal strategy. | Added “View the before-and-after design” to `sffa-brand-and-campaign-tools` as the public work sample. |

Only `links` arrays and two `evidenceNote` strings were edited in `src/lib/business/portfolio-content.ts` for this pass. Status, narrative, metrics, classifications and all unrelated cases were preserved. In particular, no SFFA brand-book link was added solely because its URL is reachable: the observed confidentiality labels conflict with the public-safe selection requirement.

### Featured numerical evidence and research check

Additional direct inspection on 2026-09-12:

- Opened the original Everest mobile PageSpeed before/after image in browser and locally. It visibly shows February 22, 2026 reports; performance 46→92, LCP 27.5s→2.4s and TBT 370ms→0ms. The tested domains are the original public business URL and its rebuilt Netlify site. No private records, confidential markings or application-target wording appear. Added a direct image link to the Everest case. These are historical lab reports, not an independent rerun or current performance guarantee.
- Opened the LA28 inventory dashboard full-size. It visibly supports total inventory value $1,100,699.66 and donation value $295,613.66, with an April 25, 2024 label. The same image contains internal warehouse, contract and payment-status notes and a child photograph. **The full dashboard was not added to public links or packaged for public display.** Existing narrative/metric fields were not edited in this pass. The image supports the recorded values, without converting them into audited financial outcomes.
- Opened the storage-room photograph in browser and locally. It depicts Kamilla among equipment, boxes and storage bins. No readable private record details, confidential markers or old application targeting appear. Added the direct photograph link to the distribution case; it is human context, not proof of a distribution total.
- Opened the [Academia.edu research page](https://www.academia.edu/167900290/Use_of_Artificial_Intelligence_for_Process_Automation_and_Optimization_in_Sports_Organizations_Meraki_Tennis_Case_Study) after the web extractor failed. The browser page displays the full paper title, Kamilla as author, 2025 conference context, Russian abstract, publisher details and a PDF filename. The inline PDF area said conversion was pending; no download or paid package was requested. Added the paper-page link to `grassroots-sport-ai-research`. It remains classified as research, and Meraki remains research inspiration rather than a client claim. The paper page's presence does not independently establish peer review or deployment outcomes.

Two unchanged image responses were packaged for case-detail display. Magic bytes and visual inspection confirm PNG for Everest and JPEG for the storage photograph; despite the source URL ending in `.png`, Cloudinary returned JPEG for the latter, so its local filename uses `.jpg`.

| Site path | Format / dimensions / size | SHA-256 |
| --- | --- | --- |
| `/assets/portfolio/everest-performance.png` | PNG, 1484×724, 69,391 bytes | `9BBC40F627A4A4749721653A109557C767C6F5B51826488058CDC15AF531E936` |
| `/assets/portfolio/la28-storage.jpg` | JPEG, 536×690, 41,451 bytes | `F475138C837749C246591676163EB97DE1827071C5BF2B20940AFCE2B18CF9F0` |

Files reside in `C:/Users/kamil/PROJECTS/a4a-p4p/public/assets/portfolio/`. For this additional pass, only the three corresponding `links` arrays were changed in the dataset; all evidence notes, statuses, metrics, classifications and narratives were preserved.
