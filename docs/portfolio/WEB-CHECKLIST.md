# Portfolio web checklist

The last measured local production audit on 2026-09-12 passed the then-current **96-page portfolio**. Its results are preserved below and in [HTTP-VERIFICATION.json](./HTTP-VERIFICATION.json).

**Current scope change:** `/portfolio` now introduces Bulachak and its three initiatives. The founder's earlier projects move to `/portfolio/work` in English, Russian and Tatar. The old 96-page result is historical and does not certify this new source. No broad HTTP rerun has been performed for this change.

## Homepage and work discovery implementation

- Home metadata and Markdown now reuse `bulachakHomeCopy` for the initiative vision, branch purposes and development status. Home JSON-LD identifies Bulachak as the umbrella Organization without a registration, legal-status or team-size claim.
- Work metadata matches the distinct directory introduction. Its CollectionPage lists 24 cases attributed to Kamilla; founder and individual case records retain their personal authorship.
- Sitemap source adds `/portfolio/work`, `/ru/portfolio/work` and `/tt/portfolio/work`, for **99 expected portfolio URLs**.
- `slug=home` returns the initiative introduction. `slug=work` returns the founder's work directory and full case records. The endpoint without a slug continues to include all public content. `llms.txt` distinguishes these entry points in all three languages.
- The shared site identity is Bulachak. Home and initiative/story social metadata use the framework's existing generated Open Graph image with the Bulachak name, shared vision and emerald palette. The personal card remains available for founder, work and case pages. No framework or image file was edited.

## Focused homepage/work check on DEV, 2026-09-12

[HOMEPAGE-VERIFICATION.json](./HOMEPAGE-VERIFICATION.json) records **0 failures in the completed focused checks** against the development server. This is not a production certification and did not repeat all 99 routes.

- Nine HTML responses passed: home, work and founder in English, Russian and Tatar. Titles, descriptions, exact canonicals, hreflang and main language agree with visible content and structured data.
- Home mirrors the shared initiative copy, uses Bulachak Organization as its main entity with three branch descriptions, and does not use a Person node as homepage identity. Founder profiles retain Kamilla as their Person/main entity.
- Each work CollectionPage contains 24 cases attributed to Kamilla. Source intentionally starts the visible directory with eight rows plus selected projects; the complete case list was verified in schema and Markdown.
- All nine Markdown requests passed: `slug=home`, `slug=work` and no slug in all three languages. Home contains the initiative introduction without case titles; work contains 24 case titles and founder attribution; no slug combines both. Language and canonical response headers are correct.
- Sitemap contains 99 portfolio URLs and all three work routes. `llms.txt` contains all 18 expected home/work/text/discovery entries checked.
- Home social metadata selects the neutral generated Open Graph route. Image rendering was not tested by this HTTP pass.
- CSP observations are explicitly from DEV, including development allowances. No strict production CSP claim is made.

After the completed HTTP pass, the homepage Markdown alternate was corrected to include `slug=home`; other page alternates now also select their exact slug. The combined source remains available with no slug. Targeted Biome and all 15 homepage/metadata unit tests pass. The DEV reread ended when the server closed its connection for rebuilding. The separate focused production confirmation below subsequently verified the exact alternates.

The parent completed the production build; the focused post-build response/security and exact Markdown-alternate results are recorded below. The historical all-page audit below remains a record of the earlier source and must not be presented as verification of this homepage/work split.

## Focused production confirmation, 2026-09-12

The separate `production` property in [HOMEPAGE-VERIFICATION.json](./HOMEPAGE-VERIFICATION.json) records the post-build run completed at **2026-09-12T19:24:07.164775+00:00**. It checked six home/work pages and three supporting endpoints, without repeating all 99 routes.

- All six EN/RU/TT home/work pages returned 200 with correct canonicals, hreflang and main language.
- All six Markdown alternate links select the exact page. Home uses `slug=home`; work uses `slug=work`. This closes the pending post-edit alternate check recorded above.
- All three homepages identify the Bulachak Organization without a Person node. All three work collections retain 24 cases attributed to founder Kamilla.
- All six HTML responses have strict production CSP and distinct script nonces used in HTML. No `unsafe-eval` or `unsafe-inline` appears in the production script policy.
- Sitemap returned 200 with 99 portfolio URLs. `/opengraph-image` returned a valid 1200 by 630 PNG, and `/health` returned 200 healthy.

**Result: 0 focused production failures.** The DEV findings remain preserved separately. This confirmation does not claim a full new 99-page crawl, browser interaction coverage, public deployment, or visual review of the generated image.

## Prior measured results before the homepage/work split

| Area | Observed result |
| --- | --- |
| Route coverage | All **96 portfolio HTML URLs** from the sitemap returned 200: 32 each in English, Russian and Tatar, covering home, 24 cases, and seven story/policy pages per language. |
| Initial content | All 96 pages have a main heading and readable paragraphs without executing JavaScript. All **72 localized case narratives** match their API records, including summary, role, highlighted result, evidence note, sections and bullets. |
| Language and page identity | All 96 pages have the matching `main lang`, exact canonical URL, English/Russian/Tatar and x-default hreflang links, and a matching Markdown alternate in the HTML head. Canonicals currently use the configured local origin. |
| Structured data | JSON-LD parses on all 96 pages. Each includes Person and WebSite identity plus a page node with the matching canonical identifier and language. This is descriptive metadata, not a claim of search eligibility or ranking. |
| Production CSP | All 96 HTML responses have a distinct nonce used by their HTML scripts, `strict-dynamic`, and `frame-ancestors 'none'`. Production script policy contains neither `unsafe-eval` nor `unsafe-inline`. The user-owned `src/proxy.ts` adapter delegates to the unchanged framework proxy; the result is verified from responses rather than inferred from manifests. |
| Other security headers | All 96 HTML responses contain HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy and Cross-Origin-Resource-Policy. Exact values are recorded per response. This local HTTP check does not prove public HTTPS or HSTS enforcement. |
| Preview indexing | All 96 HTML pages contain noindex metadata. `/robots.txt` returns `Disallow: /`. This intentionally keeps the local preview non-indexable. |
| API | `/api/portfolio` returns 24 records in each of three languages with the matching Content-Language. Slugs agree across all languages. |
| Markdown | All **12** full, home, case and About Markdown requests across three languages pass status, content type, language and canonical-link checks. Full responses include the 24 matching case records. Compact About copy matches its source in the full and individual text routes. |
| Invalid/default requests | All **nine** previously defined checks pass: unsupported/malformed inputs return 400, unknown records/pages return 404, and omitted language defaults to English. |
| Discovery and health | Sitemap, robots, `llms.txt` and `/health` return 200. `llms.txt` lists all language entries, text endpoints, sitemap, robots and Immigrant 4 Immigrant. |
| Compact About | EN/RU/TT pages match all current source text and **nine section IDs**: philosophy, red-ocean, blue-ocean, emerald-pasture, alignment, connections, a4a, p4p and i4i. The earlier four-Cs and Mesh copy is absent. The five contextual destinations point to localized initiative stories, founder and work. |
| Founder footer | Each language displays the eight expected badge images with meaningful alt text and the restored headings. The English footer matches the requested original paragraph. The removed replacement phrases are absent. All eight original WebP files and eight rendered optimized images return 200 and decode successfully. |
| Public copy scan | No former application-target names, personal email addresses or em/en dashes were found in visible HTML copy, metadata descriptions, JSON-LD, API, Markdown or discovery text. The supplied original academic PDF was deliberately excluded from this text scan. |

## Optional observations and launch settings

The HTML responses do **not** include Content-Language or a discovery Link HTTP header. These are optional observations, not failures: language and alternate text discovery are present in initial HTML. A stylesheet-preload Link header, if present, is not described as discovery. API and Markdown language/canonical headers remain verified separately.

Before a public release, configure `NEXT_PUBLIC_APP_URL` with the actual deployment origin and set `SEO_INDEXABLE=true` only when indexing is intended. Recheck canonical URLs, noindex, robots and sitemap on that deployment. Local success does not establish public crawl or index inclusion.

Privacy and terms pages exist in all three languages and are included in the route audit. The privacy text covers theme/filter storage, hosting requests, external links and the platform's optional visitor counter. Framework source enables that counter only when a deployment supplies its analytics slug; it can store a random visitor identifier and send a beacon to Polsia. This HTTP pass did not execute browser storage or beacon behavior and does not certify future deployment settings. Keep the public policy consistent with whichever analytics configuration is enabled.

## Crawlers and AI discovery

Readable source content, ordinary links, consistent metadata, authorship and useful evidence remain the foundation. Google says its AI search features use normal SEO requirements and do not require a special AI text file or special schema. The implemented `llms.txt` and Markdown routes provide optional reading formats; they do not guarantee AI citations. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Robots controls cooperative crawling, not access. Noindex and preview settings do not make a public asset confidential. Private source material must stay out of published assets. [Google robots guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

The proxy convention is documented by Next.js; for this repository the final proof is the measured nonce-bearing production response. No security-policy workaround or framework edit was introduced by this audit. [Next proxy convention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy).

## Original founder badges

Observed on [the original portfolio's About/footer section](https://kamilla-for-quoreka.netlify.app/#about). All eight are plain images, with **no enclosing credential link**. DOM image alt text and visual artwork agree with the names below. Image presence establishes that the user previously displayed them; it does not independently establish issuer validation, award dates or current standing.

All files below are actual WebP returned from the exact observed Cloudinary URLs, 200 pixels wide, downloaded unmodified and opened locally for visual inspection. Total image size: **70,016 bytes**. Complete original URLs, MIME types, dimensions and SHA-256 fingerprints are in [badges-manifest.json](./badges-manifest.json). The manifest's `url` is null for every badge because no individual verification destination was supplied by the original page.

| Local path | Display label | Category shown by artwork | Verification URL |
| --- | --- | --- | --- |
| `/assets/portfolio/badges/salesforce-administrator.webp` | Salesforce Certified Administrator | Certification | None found |
| `/assets/portfolio/badges/salesforce-business-analyst.webp` | Salesforce Certified Business Analyst | Certification | None found |
| `/assets/portfolio/badges/radical-product-thinking-vision-setting.webp` | Radical Product Thinking Vision Setting | Course completed; Pendo / Mind the Product | None found |
| `/assets/portfolio/badges/google-ai-professional.webp` | Google AI Professional Certificate | Certificate completion | None found |
| `/assets/portfolio/badges/google-ai-data-analysis.webp` | Google AI for Data Analysis | Course completion | None found |
| `/assets/portfolio/badges/pmi-member.webp` | Project Management Institute Member | Membership, **not PMP** | None found |
| `/assets/portfolio/badges/product-management-basics.webp` | Product Management Basics Certification | Certified; Pendo / Mind the Product | None found |
| `/assets/portfolio/badges/ai-product-management.webp` | AI for Product Management | Course completed; Google Cloud / Pendo / Mind the Product | None found |

The displayed heading is the user's restored **Certified digital expertise**, translated on Russian and Tatar pages. The footer preserves the original compact treatment and original English paragraph. Meaningful image labels remain; individual verification links were not invented. The badges include memberships and course completions as well as certifications, so this audit makes no claim of eight certifications or current issuer validation.

## Scope limits

This report covers local production HTTP responses, editorial source correspondence, metadata, status behavior and badge asset decoding. The parent performed browser/UI validation separately. This audit does not certify screen-reader behavior, every viewport, public deployment, search inclusion, external-link availability, issuer standing, analytics runtime behavior, legal compliance, penetration testing or full performance measurements. Original remote sites remain unchanged.
