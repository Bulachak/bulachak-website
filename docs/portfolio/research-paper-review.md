# Research paper source review

Reviewed by Codex on 2026-09-12. Scope: read the two user-supplied PDFs, establish the article identity and location, and assess what the article supports for the portfolio. Original files were read only. No PDF was published or copied into the app, and no portfolio dataset fields were changed in this review.

## Main finding

The four-page PDF contains a complete, coauthored Russian-language conference paper about Meraki Tennis. It is documentary evidence of Kamilla's research authorship. It should **not** be used to override Kamilla's explicit clarification that Meraki was research inspiration, not a client engagement.

There is a substantive discrepancy to preserve: the paper itself describes an implementation in past tense, says the authors participated in implementation, and reports numerical outcomes. Those statements conflict with the user's clarification. Keep the portfolio entry under research; do not turn the paper's figures into delivered-client results. Do not characterize the article itself as only a proposal: its text makes stronger claims, whose underlying measurements are not supplied here.

## Files and exact page mapping

| Supplied source | Observed contents | Relevant location |
| --- | --- | --- |
| `C:/Users/kamil/Downloads/sbornik-na-sayt - 2025-1-45-37-40.pdf` | Four pages containing the complete Meraki article, ending with its references | PDF pages 1–4; zero-based indices **0–3**; printed pages **36–39** |
| `C:/Users/kamil/Downloads/sbornik-na-sayt - 2025-1-45.pdf` | 45-page proceedings extract: cover, title page, colophon, and articles through printed page 44 | Meraki: PDF pages **37–40**; zero-based indices **36–39**; printed pages **36–39** |

All four excerpt pages have exactly equal extracted text **and decoded PDF page-content bytes** to the larger file's pages at indices 36–39. This establishes that these are the same article pages, not two drafts. The next page in the larger file (index 40, printed page 40) starts a different article by other authors.

The 45-page file is **not the complete proceedings volume**: its colophon states that the volume has **185 pages**. It ends at the beginning of another article. Avoid labeling this attachment “full proceedings.”

SHA-256 fingerprints:

- Four-page excerpt: `3707b180e4183f494526d66cd6a344593468acde8b0689c5ec70eff90c923f9a`
- 45-page extract: `8701d93ffe15298c4b0c6f6671d659b37c77224d7446d115a0aff4db30cbf058`

Both files identify iLovePDF as producer, with modification timestamps on 2026-09-12. Those describe the supplied PDF processing, not publication dates.

## Verified identity and citation

**Title as printed:** «Использование искусственного интеллекта для автоматизации и оптимизации процессов в спортивных организациях: кейс Meraki Tennis».

**Authors as printed:** Гафурзянова К.Ю.; Мустафин А.С. The source supplies initials, not full given names. The existing Academia page identifies Kamilla Gafurzianova; the second author must remain credited in any citation. A useful English rendering of the title is “Use of Artificial Intelligence for Process Automation and Optimization in Sports Organizations: Meraki Tennis Case Study.”

**Affiliations on article page 36:**

- Гафурзянова К.Ю.: Российский международный олимпийский университет, Сочи, Россия (Russian International Olympic University, Sochi, Russia).
- Мустафин А.С.: Университет Иннополис, Иннополис, Россия (Innopolis University, Innopolis, Russia).

**Publication type:** conference proceedings, not a journal article. No journal issue or article-specific DOI is present in the supplied article.

**Proceedings title:** *SMART SPORT & TOURISM: цифровая трансформация в сфере физической культуры, спорта и туризма*.

The cover, title page, and colophon establish:

- IV Всероссийская научно-практическая конференция с международным участием, within KAZAN DIGITAL WEEK-2025.
- Kazan, **19 September 2025**.
- Publisher: **ФГБОУ ВО «Поволжский ГУФКСиТ»**, Kazan, **2025**. The title page expands the institution to Поволжский государственный университет физической культуры, спорта и туризма.
- Stated volume extent: **185 pages**.
- Editorial board: Р.Ф. Мифтахов, О.А. Любягина.
- Colophon says materials are presented in the authors' own editing. This does not establish a peer-review process; avoid adding a “peer-reviewed” badge.

**Suggested citation grounded in the front matter:**

Гафурзянова К.Ю., Мустафин А.С. Использование искусственного интеллекта для автоматизации и оптимизации процессов в спортивных организациях: кейс Meraki Tennis // SMART SPORT & TOURISM: цифровая трансформация в сфере физической культуры, спорта и туризма: материалы IV Всероссийской научно-практической конференции с международным участием в рамках KAZAN DIGITAL WEEK-2025, Казань, 19 сентября 2025 г. Казань: ФГБОУ ВО «Поволжский ГУФКСиТ», 2025. С. 36–39.

### Internal date/header inconsistency

Every article page inspected, including the Meraki article, has a running header naming the **II** conference, **KAZAN DIGITAL WEEK-2024**, and **11 September 2024**. This contradicts all three front-matter pages, which name the IV conference and 2025. The paper's references include access dates 7 September 2025 and a 2025 publication, further supporting the 2025 context.

Use **2025 according to the proceedings cover and colophon**, and retain this discrepancy in the provenance record. A carried-over header is a plausible explanation, not independently verified fact. Do not silently present the conflicting 2024 header as a second event the author attended.

**DOI/ISBN:** No DOI belonging to the Meraki article, and no volume ISBN, were found in the supplied article/front matter. The DOI `10.3390/socsci14030174` on printed page 39 belongs to cited reference 5, Moustakas's *Game Changer: Harnessing Artificial Intelligence in Sport for Development*. It is **not this paper's DOI**. The appearance of ISBNs/DOIs in other authors' bibliographies does not identify this proceedings volume.

## Claims and evidentiary limits

| Article statement | Exact source location | What it supports for the portfolio |
| --- | --- | --- |
| Meraki Tennis is the study object, described as a Silicon Valley club with about 80 athletes aged 6–18 | Printed page 37; excerpt index 1; larger file index 37 | The paper's research context. Does not establish a client relationship or independently verify enrollment. |
| Authors participated in implementation and assessed their direct experience | Printed page 37, research aim | An explicit statement made in the paper; it conflicts with the user's clarification and must not be treated as resolved proof of delivered work. |
| Case study, document analysis, interviews, observation, quantitative analysis | Printed page 37, methods | The methods claimed by the paper. No underlying records, interview sample, measurement protocol, control comparison, or dataset are included. |
| GoHighLevel, Stripe, Google Workspace, Gmail/Forms, Airtable, n8n form the described system | Printed page 37 | The operational model discussed in the paper. Attribution of each implemented component to either author is not specified. |
| Administrative time fell by more than 40% | Sentence begins at end of printed page 37 and continues on page 38; excerpt indices 1–2 | A paper-reported result, not an independently verified performance metric. Baseline hours, evaluation period, denominator and calculation are absent. Do not reuse as a personal/client delivery metric. |
| Reminder/campaign response increased by 23% | Printed page 38; excerpt index 2 | A paper-reported result. No raw counts, starting response rate, timeframe, or clarification of relative percent versus percentage points. Do not translate into retention/revenue or imply audited causation. |
| Scheduling errors nearly disappeared; payments automated; coaches more satisfied | Printed page 38 | Qualitative results claimed by the paper without supporting records or quantified instruments. |
| The model could scale to other sports and adapt to Russian organizations | Printed page 39; excerpt index 3 | A proposed extension/recommendation, not evidence that broader deployment occurred. |

The paper contains no named athlete/parent records, contact details, screenshots of internal systems, or confidentiality markings. It is text and references. Its main reuse concern for this portfolio is the unresolved mismatch between implementation claims and the user's clarified relationship to Meraki, rather than visible private operational data. Affiliation in a paper is not proof of a current role or institutional endorsement.

## Recommended integration decision

- Retain the existing **Strategy & research** classification and Meraki-inspiration clarification.
- Strengthen factual authorship attribution to **coauthor of a 2025 conference paper**, with exact title, coauthor and printed pages.
- An attachment label, if the parent chooses to publish it, should be **“Read the original paper (Russian, 4 pages)”**. Do not label the 45-page extract as the full proceedings.
- Do not import the >40% or 23% claims as portfolio outcomes, change the entry to a completed client engagement, or rewrite the historical PDF.
- A source note can truthfully say publication identity was verified from the supplied proceedings; implementation outcomes remain unverified and the user's relationship clarification governs portfolio framing.
- The source does not independently establish acceptance process, peer review, presentation attendance, or the division of work between the coauthors.

The existing public Academia link is the same Meraki title in English and remains a research access point: [Academia paper page](https://www.academia.edu/167900290/Use_of_Artificial_Intelligence_for_Process_Automation_and_Optimization_in_Sports_Organizations_Meraki_Tennis_Case_Study). Its availability was verified in the earlier `web-source-review.md` pass. This review's stronger citation evidence is the supplied PDF front matter and article itself.

## Visual verification record

Used `pypdf` for text/structure and `pypdfium2` for unmodified page renders. Visually checked larger-file indices **0** (cover), **1** (title page), **2** (colophon) and **36** (article first page). The front matter at indices 1–2 is image-only to the text extractor, so visual inspection was necessary to confirm publisher, year and 185-page extent.

Temporary reference renders are outside the public app at:

- `C:/Users/kamil/AppData/Local/Temp/portfolio-paper-page-0.png`
- `C:/Users/kamil/AppData/Local/Temp/portfolio-paper-page-1.png`
- `C:/Users/kamil/AppData/Local/Temp/portfolio-paper-page-2.png`
- `C:/Users/kamil/AppData/Local/Temp/portfolio-paper-page-36.png`

These are reading aids, not publication assets. Only this report was added to the project during this review.
