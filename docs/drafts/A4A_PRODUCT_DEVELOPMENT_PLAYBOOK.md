---
title: "A4A Product Development Playbook & Cycle 1 Spec (YC Framework)"
created_by: Antigravity
updated_by: Antigravity
date_created: 2026-10-13
last_updated_on: 2026-10-13
status: active
---

# A4A Product Development Playbook & Cycle 1 Spec

**Framework Source:** [Y Combinator — Guide to Product Development (Michael Seibel)](https://www.ycombinator.com/library/4e-guide-to-product-development)  
**Applied To:** **Agents 4 Athletes (A4A)** within the [a4a-p4p](file:///c:/Users/kamil/PROJECTS/a4a-p4p) codebase  
**Product Lead:** Kamilla Gafurzianova, OLY  
**Execution Team:** Founder + Baza Engineering & Operations Agents (*"Human alignment first, AI second"*)

---

## 1. Why This Framework Governs A4A Now

Michael Seibel's YC product development framework is designed specifically for the **post-MVP iteration phase**—once the initial surface is live and the team must figure out how to rapidly iterate, measure, test, and improve without burning out or getting lost in multi-month roadmaps.

A4A's initial MVP surface is already live in this repository:
- Umbrella & branch positioning at [`src/app/(setup)/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28setup%29/page.tsx) and [`src/lib/business/bulachak-home.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/lib/business/bulachak-home.ts)
- Three productized commercial pillars at [`src/app/(custom)/pricing/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/pricing/page.tsx)
- Interactive 15-Minute Operational Leak Audit at [`src/app/(custom)/audit/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx) (`POST` [`src/app/api/audit/route.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/api/audit/route.ts))
- October Live Masterclass registration & `.ics` generator at [`src/app/(custom)/webinar/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx) (`POST` [`src/app/api/webinar/register/route.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/api/webinar/register/route.ts))
- Athlete & Federation intake tracks at [`src/app/(custom)/intake/athlete/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/intake/athlete/page.tsx) (`POST` [`src/app/api/athlete-leads/route.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/api/athlete-leads/route.ts)) and [`src/app/(custom)/intake/[track]/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/intake/%5Btrack%5D/page.tsx)

### The Specific Failure Modes We Are Eliminating
 Applying Seibel's audit to A4A reveals four immediate traps that this playbook eliminates:
1. **Shipping features without persistent analytics:** Ensure all four conversion endpoints (`/api/launch-leads`, `/api/audit`, `/api/webinar/register`, and `/api/athlete-leads`) persist leads to the bound **Google Sheets + Apps Script CRM** (`src/lib/business/sheets-webhook.ts`) and send instant Gmail notifications.
2. **Unbounded roadmaps vs. Founder time cap:** A4A's economic model caps founder operations at **14–18 hours/week** alongside national coaching. A rolling multi-month backlog creates decision fatigue; a fixed 2-week cycle with a wiped board at the end keeps execution sharp.
3. **Unwritten specs across human + AI agents:** When specs are not explicit about *Need-to-Have* vs. *Nice-to-Have*, AI agents over-engineer UI polish while missing core data-plane persistence.
4. **Ad-hoc testing:** Skipping a structured end-of-cycle manual + automated verification pass risks breaking form round-trips, mobile layouts, or strict CSP nonces right before live outreach campaigns.

---

## 2. A4A Development Cycle Rules (Adapted from YC)

### Rule 1: Define the Development Cycle Length → **14 Days (2 Weeks)**
- Why 14 days: As a Next.js 16 web application deployed on Vercel (`bulachak.com`), code can ship daily, but A4A's B2B/club-owner funnel requires a 2-week window to run outreach sequences (WhatsApp/Telegram, diaspora channels, cold club outreach) and measure real conversion impact.
- **Day 1 (Monday):** The **single** Cycle Product Meeting. Choose one goal, review last cycle's numbers, brainstorm across 3 buckets, grade engineering effort (`Easy` / `Medium` / `Hard`), select via consensus, write specs + metric definitions, then clear the rest of the board.
- **Days 2–11 (Tuesday – Second Thursday):** Silent, focused execution.
  - *Engineering Agents:* Implement only the specced items (`src/app/(custom)/**`, `src/app/api/**`, `src/lib/contracts/**`, `src/lib/business/**`).
  - *Product Lead (Kamilla):* Execute partner outreach, run diagnostics with club owners, inspect funnel conversion data, and conduct 1 monthly live user observation session.
- **Days 12–14 (Final Friday – Sunday):** **Feature Freeze & Shared Double-Pass QA.** Stop building new features. Run the A4A Master Testing Checklist twice.

### Rule 2: Every Cycle Targets Strictly ONE of Three Evergreen Goals
Every Day-1 Product Meeting must pick **one** overarching metric goal for the entire 2-week cycle:

| Goal ID | YC / Socialcam Equivalent | A4A Funnel Stage | Primary Measurable KPIs |
| :--- | :--- | :--- | :--- |
| **Goal 1** | **Increasing New Users / Core Action** | **Top-of-Funnel Acquisition & Diagnostic Completion** | • Completed 15-Min Ops Audits (`POST /api/audit`)<br>• Confirmed Webinar Registrations (`POST /api/webinar/register`) + `.ics` downloads<br>• Channel attribution split (Warm DM vs. Diaspora Broadcast vs. Cold Club Outreach) |
| **Goal 2** | **Increasing Activation / Conversion** | **Diagnostic-to-Walkthrough & Sprint Close** | • Audit-to-Walkthrough click/booking rate (`bookingUrl` conversions)<br>• Completed Athlete & Federation Intakes (`POST /api/athlete-leads`, `/intake/federation`)<br>• Closed Turnkey Sport Ops Sprints ($2,800–$3,000) or Camp Value-Share deals |
| **Goal 3** | **Increasing Retention** | **21-Day Sprint Delivery Velocity & I4I Referrals** | • Client sprint hand-off cycle time (target ≤ 21 days)<br>• Verified weekly admin hours saved per club (target ≥ 10 hrs/wk guarantee)<br>• Peer referrals generated per completed club via I4I network |

### Rule 3: Three-Bucket Brainstorm & Objective Effort Grading
All ideas proposed on Day 1 are placed into one of three categories—**New Features / Iterations**, **Maintenance**, or **A/B Tests**—without debate or criticism during brainstorming. Each item is then graded by engineering complexity:
- **HARD (Max 1 per cycle):** Takes multiple days or touches schema + API + UI + external webhook wiring. If an item spans more than one 2-week cycle, it **must** be broken into smaller chunks before it can be selected.
- **MEDIUM (2–3 per cycle):** Takes half a day to one full session for one agent/engineer (e.g., a new route handler, cross-page state handoff, or form upgrade).
- **EASY (several per day):** Copy updates, CTA link wiring, query-param capture, or small UI friction fixes.

### Rule 4: Clear Spec, Need-to-Have vs. Nice-to-Have, & Mandatory Analytics
- **Never ship a feature without its analytics:** Every selected item must specify the exact Google Sheet tab, database field, API counter, or event that proves whether it moved the cycle goal.
- **Need-to-Have vs. Nice-to-Have:** Every spec explicitly separates mandatory scope from optional polish. If cycle time gets tight before Day 12, *Nice-to-Haves* are cut automatically without discussion.
- **No Backlog Hoarding:** Once the cycle items are locked and photographed/committed, all unselected brainstorm items are deleted. Good ideas will resurface naturally in the next cycle's brainstorm if they still matter.

---

## 3. Cycle 1 Active Plan (Oct 13 – Oct 27, 2026)

### Cycle 1 Header
- **Cycle Window:** Tuesday, October 13, 2026 – Tuesday, October 27, 2026
- **Product Lead:** Kamilla Gafurzianova, OLY
- **Single Cycle Goal:** **Goal 1 — Maximize 15-Min Ops Audit Completions (`/audit`) & October Masterclass Registrations (`/webinar`)**
- **Target Cycle 1 Measurable Outcomes:**
  1. **100% persistence of funnel actions** (0 lost leads from `/`, `/audit`, `/webinar`, or `/intake/athlete`).
  2. **25–35 confirmed registrants** on [`/webinar`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx).
  3. **10+ completed Operational Leak Audits** on [`/audit`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx).
  4. **≥ 30% conversion** from Webinar Registration confirmation screen to starting the 15-Min Ops Audit.

---

### Step A: Cycle 1 Brainstorm & Effort Grading Matrix

#### Category 1: New Features & Feature Iterations
| ID | Idea / Feature | Grade | Impact on Goal 1 | Selected for Cycle 1? |
| :--- | :--- | :--- | :--- | :--- |
| **F-01** | **Persist Silent Launch, Audit, Webinar & Athlete Intake submissions to Google Sheets + Apps Script (with Gmail notifications)** | **HARD** | **Critical.** Ensures every lead on `bulachak.com` is logged to Google Sheets (`Silent_Launch_Leads`, `Audit_Diagnostics`, `Webinar_Registrations`, `Athlete_Intake`) and triggers instant founder + lead emails. | **YES (Cycle's 1 Hard Item — DONE)** |
| **F-02** | **1-Click Webinar → Audit Pre-fill Handoff** (when a user registers on [`/webinar`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx) and clicks *"Пройти 15-мин аудит операционки"*, pre-populate Name, Email, Phone, and Org on [`/audit`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx)) | **MEDIUM** | **High.** Eliminates double data entry for warm webinar registrants immediately after they sign up. | **YES (DONE)** |
| **F-03** | **Channel & UTM Attribution Capture (`source` / `utm_source`)** across `/`, `/webinar`, and `/audit` contracts | **EASY** | **High.** Lets us see whether Direct WhatsApp/Telegram (Channel 1), Diaspora Broadcasts (Channel 2), or Instagram/LinkedIn (Channel 3) drives actual audit completions. | **YES (DONE)** |
| **F-04** | **Shareable / Printable Diagnostic Scorecard URL (`/audit?id=...`)** so a club director can share their Friction Score with a co-owner or board | **MEDIUM** | **Moderate.** Useful for multi-partner clubs, but secondary to initial capture. | Deferred (Cleared at end of Day 1) |

#### Category 2: Maintenance & Operational Hygiene
| ID | Idea / Maintenance Item | Grade | Impact on Goal 1 | Selected for Cycle 1? |
| :--- | :--- | :--- | :--- | :--- |
| **M-01** | **Externalize Webinar Zoom URL & Booking Calendar Link** (replace hardcoded `https://zoom.us/j/a4a-masterclass-2026` in [`src/app/api/webinar/register/route.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/api/webinar/register/route.ts#L69) and `mailto:` fallback in [`src/app/api/audit/route.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/api/audit/route.ts#L105) with clean config constants) | **EASY** | **High.** Prevents broken join links on live webinar day and tracks walkthrough booking intent cleanly. | **YES** |
| **M-02** | **Inline Field-Level Error Mapping (`applyServerErrors`) on `/audit` and `/webinar`** (currently [`src/app/(custom)/audit/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx#L100-L102) and [`src/app/(custom)/webinar/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx#L88-L90) catch errors with a generic toast instead of mapping 400 field errors inline) | **EASY** | **Moderate-High.** Prevents mobile users from losing form progress when a single field fails validation. | **YES** |
| **M-03** | **Upgrade `/intake/federation` from static `mailto:` to a persisted API form** | **MEDIUM** | **Low for Goal 1** (supports Goal 2 Institutional conversion; save for a Goal 2 cycle). | Deferred (Cleared at end of Day 1) |

#### Category 3: A/B Tests & Funnel Experiments
| ID | Experiment Hypothesis | Grade | Metric to Compare | Selected for Cycle 1? |
| :--- | :--- | :--- | :--- | :--- |
| **E-01** | **Interactive Calculator First vs. Contact Fields First on `/audit`:** Reordering [`src/app/(custom)/audit/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx) so club owners select *Weekly Admin Hours + Operational Bottlenecks* (Section 1) **before** typing *Name + Email* (Section 2) will increase audit completion rate by ≥ 20% via sunk-cost engagement. | **MEDIUM** | Audit submit conversion rate (`POST /api/audit` completions per `/audit` page view) | **YES** |
| **E-02** | **Bilingual EN/RU Quick-Toggle on `/webinar`:** Adding an English summary toggle on [`/webinar`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx) so non-Russian-speaking US fencing/sport contacts can register for the English diagnostic track. | **EASY** | Share of `/webinar` registrations from English-speaking club directors | Deferred (Cleared at end of Day 1) |

---

### Step B: Detailed Cycle 1 Specifications (Consensus Selection)

Below are the locked specifications for Cycle 1 (`1 Hard`, `2 Medium`, `3 Easy`).

#### 1. `[HARD]` F-01: Persistent Funnel Telemetry & Lead Capture via Google Sheets + Apps Script
- **Owner:** Engineering Agent
- **Problem:** Previously, `/api/audit` and `/api/webinar/register` calculated scores and `.ics` files in memory without persisting leads or emailing confirmations.
- **Need to Have (Mandatory Scope):**
  1. Provision the bound Google Spreadsheet (`Bulachak — Silent Launch & Intake CRM (bulachak.com)`) with 4 tabs (`Silent_Launch_Leads`, `Audit_Diagnostics`, `Webinar_Registrations`, `Athlete_Intake`) and Google Apps Script Web App (`scripts/google-apps-script/Code.gs`).
  2. Forward every valid `POST /api/launch-leads`, `POST /api/audit`, `POST /api/webinar/register`, and `POST /api/athlete-leads` submission via `forwardLeadToGoogleSheets` (`src/lib/business/sheets-webhook.ts`).
  3. Dispatch automated Gmail founder alerts to `kgafurzianova@gmail.com` and confirmation emails to leads via `MailApp.sendEmail`.
- **Nice to Have (Cut if short on time):**
  - Read-only `GET /api/cycle-metrics` summary endpoint returning aggregate counts of `athleteLeads`, `auditDiagnostics` (with average `frictionScore`), and `webinarAttendees` by role and source channel.
- **Success Measurement / Analytics Spec:**
  - `COUNT(webinar_attendees)` grouped by `role` and `source`
  - `COUNT(audit_diagnostics)` grouped by `frictionLevel` (`Low` | `Moderate` | `Severe` | `Critical`) and `recommendedPillar`

#### 2. `[MEDIUM]` F-02: 1-Click Webinar → Audit Pre-fill Bridge
- **Owner:** Engineering Agent
- **Need to Have (Mandatory Scope):**
  1. In [`src/app/(custom)/webinar/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx#L194), update the post-registration CTA link (`/audit`) to pass `name`, `email`, `phone`, `org`, and `source=webinar-confirmation` via URL search params.
  2. In [`src/app/(custom)/audit/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx), read initial search params on mount to pre-fill `contactName`, `email`, `phone`, and `orgName`.
- **Nice to Have (Cut if short on time):**
  - Auto-scroll directly to the Operational Bottlenecks section when contact fields are already pre-filled from `/webinar`.
- **Success Measurement / Analytics Spec:**
  - Percentage of `audit_diagnostics` rows with `source = 'webinar-confirmation'` divided by total `webinar_attendees` rows (Target: `≥ 30%`).

#### 3. `[MEDIUM]` E-01: Interactive Workload & Bottlenecks First on `/audit`
- **Owner:** Engineering Agent + Product Lead
- **Need to Have (Mandatory Scope):**
  1. Reorder the form sections inside [`src/app/(custom)/audit/page.tsx`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx#L246-L420) so **Step 1 is "Your Operational Load & Primary Bottlenecks"** (interactive athlete count buttons, weekly admin hours slider, and clickable bottleneck cards) and **Step 2 is "Where to Send Your Diagnostic Summary"** (Organization, Name, Email, Sport/Niche).
- **Nice to Have (Cut if short on time):**
  - Live preview badge showing how many bottlenecks are selected before hitting *"Generate My 15-Minute Diagnostic"*.
- **Success Measurement / Analytics Spec:**
  - Audit submission rate before vs. after section swap.

#### 4. `[EASY]` F-03: Channel & UTM Attribution (`source`) on `/webinar` and `/audit`
- **Owner:** Engineering Agent
- **Need to Have (Mandatory Scope):**
  1. Add optional `source?: z.string().max(100)` to `AuditSubmission` in [`src/lib/contracts/audit.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/lib/contracts/audit.ts) and `WebinarRegistration` in [`src/lib/contracts/webinar.ts`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/lib/contracts/webinar.ts).
  2. Capture `?utm_source=` or `?ref=` from the page URL on `/webinar` and `/audit` and submit it with the payload.
- **Nice to Have:** None (keep strictly minimal).
- **Success Measurement / Analytics Spec:**
  - Conversion breakdown across `tg-dm`, `whatsapp-dm`, `diaspora-chat`, `linkedin`, and `webinar-confirmation`.

#### 5. `[EASY]` M-01 & M-02: Config Hygiene & Inline Form Validation Polish
- **Owner:** Engineering Agent
- **Need to Have (Mandatory Scope):**
  1. Centralize the webinar Zoom join link and audit walkthrough booking URL into a single user-owned config module (`src/lib/business/a4a-config.ts`).
  2. Wire field-level `400` validation errors on `/audit` and `/webinar` so any server-side Zod field error highlights clearly to the user alongside the toast.
- **Success Measurement / Analytics Spec:**
  - Zero `400` validation drop-offs where users fail to retry.

---

## 4. Shared End-of-Cycle QA Checklist (Days 12–14 Double-Pass)

Per Seibel's guide: *"During the last three days of every development cycle we would all stop building and test. We had a testing list that included manual tests for all of our basic functionality. Every cycle we added tests for new features built in that cycle and we tested all items on our testing list twice."*

Before closing any 2-week cycle, run this checklist **twice** (Pass 1: Engineering Agent automated + local HTTP check; Pass 2: Founder/User flow walkthrough on desktop & mobile viewport):

### Part A: Automated Gate Checks (100% Green — Verified 2026-10-14 / 2026-10-15)
- [x] `npm run typecheck` passes with 0 TypeScript errors.
- [x] `npm run lint` (Biome) passes with 0 errors and preserves client/server import boundaries.
- [x] `npm run test` (Vitest unit suite in [`tests/unit/`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/tests/unit)) passes 100% (13 suites, 94 tests), including CSP posture, env validation, silent launch, audit, webinar, athlete-leads, and trilingual portfolio tests.
- [x] `npm run build` completes a clean production build with zero route conflicts (`114` localized canonical routes).

### Part B: Core A4A Revenue & Funnel Surface (Manual Double-Pass)
| Test ID | Surface / Route | Verification Action | Pass 1 | Pass 2 |
| :--- | :--- | :--- | :---: | :---: |
| **QA-01** | **Home & Navigation** (`/`, `/ru`, `/tt` and [`PortfolioNav`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/components/custom/portfolio/portfolio-nav.tsx)) | Verify vertical hero sequence, Bulachak motto, all 3 named branches (Agents 4 Athletes, Parafencing 4 Progress, Immigrant 4 Immigrant), co-opetition copy, and top-nav CTAs (`15-Min Audit` → `/audit`, `Contact` → `/#connect`). | [x] | [x] |
| **QA-02** | **Pricing Pillars** ([`/pricing`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/pricing/page.tsx), `/ru/pricing`, `/tt/pricing`) | Verify all 3 engagement pillars, 6-vertical playbooks, 4% P4P reciprocity banner, and editorial design unification across EN, RU, and TT. | [x] | [x] |
| **QA-03** | **Operational Leak Audit** ([`/audit`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/audit/page.tsx), `/ru/audit`, `/tt/audit` → `POST /api/audit`) | Submit valid inputs; verify instant Readiness/Friction Score (`0–100`), primary bottleneck, recommended tier, and Google Sheets persistence. | [x] | [x] |
| **QA-04** | **Evergreen Masterclass Portal** ([`/webinar`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/webinar/page.tsx), `/ru/webinar`, `/tt/webinar` → `POST /api/webinar/register`) | Submit attendee registration; verify confirmation card renders, `.ics` calendar file downloads cleanly, Concierge FAQ toggles work, and CTA to `/audit` pre-fills registrant details. | [x] | [x] |
| **QA-05** | **Athlete & Coach Venture Intake** ([`/intake/athlete`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/intake/athlete/page.tsx), `/ru/intake/athlete`, `/tt/intake/athlete` → `POST /api/athlete-leads`) | Submit 5-field trilingual athlete form; verify field-level `400` validation on invalid input and `201` confirmation state + `Athlete_Intake` sheet row on valid input. | [x] | [x] |
| **QA-06** | **Federation & Adaptive Program Intake** ([`/intake/federation`](file:///c:/Users/kamil/PROJECTS/a4a-p4p/src/app/%28custom%29/intake/%5Btrack%5D/page.tsx), `/ru/intake/federation`, `/tt/intake/federation` → `POST /api/launch-leads`) | Verify 5-field trilingual Federation & adaptive-program intake form, track switcher, and `Silent_Launch_Leads` sheet persistence. | [x] | [x] |
| **QA-07** | **Flattened Trilingual Routes, 308 Redirects & Health** (`/`, `/about`, `/work`, `/ru/*`, `/tt/*`, `/portfolio` → `308`, `/health`) | Verify EN/RU/TT switcher across all 38 routes (`114` URLs), `/portfolio/*` `308` redirects, `/health` returns `200`, and no pill-shaped UI buttons/badges (`rounded-full` banned except 1:1 circular avatars) or narrow text orphans exist. | [x] | [x] |

---

## 5. Monthly Live User Testing Protocol

Once per month (between Cycle 1 and Cycle 2), Kamilla runs a **20-minute live observation session** with 2–3 target users (one independent club owner/coach, one transitioning athlete, one immigrant business owner):
1. **Prompt:** Send them the link to `/audit` or `/webinar` on their smartphone while on Zoom screen-share or in person at the salle.
2. **Rule:** Do **not** explain the page or guide their clicks. Ask them to think out loud for 3 minutes while completing the diagnostic or registration.
3. **Output:** Log the top 3 moments of hesitation or wording confusion and bring them directly into the next Cycle Day-1 Brainstorm as `Easy` or `Medium` iterations.
