# A4A × P4P: Revenue Model and Payment Structure Blueprint (September 2026)

**Document Type:** Durable Strategic & Operational Brief  
**Author:** Kamilla Gafurzianova, OLY & Antigravity  
**Principal Role:** Founder & Systems Architect, Interim National Parafencing Coach for Team USA  
**Project:** A4A (Agents for Athletes) × P4P (Parafencing for Progress)  
**Parent Venture:** Bulachak  
**Drive Folder:** Bulachak Documentation (`1qemS3P9lJI_f4dh8yUPnP8nzIVHwj8RG`)  
**Status:** Canonical Strategic Direction  

---

## 1. Executive Summary & Philosophy

This document formally establishes the commercial payment and revenue architecture for **A4A (Agents for Athletes)**. 

### Core Operating Principles
1. **No Monthly Retainer Trap:** Low-ticket monthly retainers ($300 to $500/month) force solo founders into an exhausting cycle of being on-call 24/7 for minor tech support tickets, creating administrative drag without financial sovereignty. A4A operates on bounded, high-value, productized engagements with clean hand-offs.
2. **Sport-Native Alignment:** Sports organizations do not budget like SaaS corporations. They operate on distinct seasonal cycles (registration seasons, summer/winter camps, clinics, tournaments) and institutional grants. The revenue model mirrors how sports money actually flows.
3. **Founder Financial Sustainability:** The business model is engineered to reliably generate **over $5,000 to $6,500/month net cash flow** to sustain founder Kamilla Gafurzianova, OLY in Los Angeles, while strictly capping client delivery workload at **14 to 18 hours per week**. This protects essential time for Team USA national coaching, training, and leadership.
4. **Reciprocal Social Purpose:** A4A is the commercial engine that powers **Parafencing for Progress (P4P)**. An unconditional **4% of gross commercial revenue** is pledged directly to P4P to fund fair adaptive coach pay, $5,000 specialized competition wheelchairs, travel logistics, and personal-care assistant support.

---

## 2. The 3-Pillar Revenue & Payment Portfolio

```
+---------------------------------------------------------------------------------------------------------+
|                                      A4A COMMERCIAL SERVICE PORTFOLIO                                   |
|                                                                                                         |
|   PILLAR 1: TURNKEY SPRINT               PILLAR 2: CAMP VALUE-SHARE          PILLAR 3: SPONSORED COHORT |
|   Target: Established Clubs & Founders   Target: Seasonal Camps & Clinics    Target: Federations & City |
|   Fee: $2,800 to $3,000 flat             Fee: $1,000 base + 8% tuition       Fee: $15,000 to $18,000    |
|   Structure: 50% upfront / 50% done      Structure: $1,000 + per-student     Structure: 40% / 30% / 30% |
|   Delivery: 21-day clean hand-off        Delivery: Event launch lifecycle    Delivery: 6-week cohort    |
|   Ongoing: 0 hours (Client owned)        Ongoing: Seasonal campaign          Ongoing: Program reports   |
+---------------------------------------------------------------------------------------------------------+
```

### Pillar 1: The Turnkey Sport Ops Sprint (The Core Foundation)

* **Target Audience:** Established sports clubs (fencing salles, martial arts dojos, gymnastics academies, youth tennis clubs) and dual-career/retiring athlete-founders launching academies or consulting practices.
* **Price Point:** **$2,800 to $3,000** flat project fee.
* **Payment Terms & Schedule:**
  * **50% Upfront Commitment Deposit ($1,400 to $1,500):** Due upon signing prior to project kickoff. Reserves the delivery window.
  * **50% Completion Milestone ($1,400 to $1,500):** Due upon final system deployment, founder training session, and delivery of standard operating procedures (SOPs).
* **Delivery Scope (21 Days Total):**
  * **Days 1 to 5 (Audit & Strategy):** Operational bottleneck diagnostic, domain configuration, and brand asset review.
  * **Days 6 to 14 (System Build):** Responsive mobile-first website / inquiry landing page, automated parent/student intake forms, scheduling calendar integration, and automated payment routing.
  * **Days 15 to 18 (AI Workflow Setup):** Custom AI prompt templates for repetitive communication (inquiry triage, payment reminder drafts, sponsor inquiry responses).
  * **Days 19 to 21 (Handoff & Sovereignty):** 60-minute video recorded walkthrough with the coach/director, complete SOP documentation, and transfer of credentials.
* **Post-Project Relationship:** 14-day bug warranty included. No ongoing monthly fees. The client owns 100% of their digital assets and infrastructure.

---

### Pillar 2: Seasonal Camp & Event Value-Share (The Aligned Partner)

* **Target Audience:** Cash-conscious youth clubs, seasonal sports programs, summer/winter fencing clinics, and tournament organizers who hesitate to commit large upfront cash.
* **Price Point:** **$1,000 base setup fee** plus **$15 to $25 per registered student** (or **6% to 8% of gross camp tuition** processed through the system).
* **Payment Terms & Schedule:**
  * **$1,000 Base Deposit:** Due upon agreement to cover initial registration page build, payment processor setup, and automated notification sequences.
  * **Value-Share Payouts:** Reconciled and paid either automatically via Stripe Connect split-payments or invoiced bi-weekly as student registrations clear.
* **Delivery Scope:**
  * High-converting, mobile-friendly camp registration landing page.
  * Automated digital liability waivers, medical intake, and parent contact forms.
  * Automated confirmation, reminder, and packing-list messaging sequences.
  * Live roster tracking dashboard for coaching staff.
* **Why Clubs Love It:** Low upfront financial barrier. If a camp brings in 40 participants at $500 tuition ($20,000 gross), the club pays $1,000 base + $1,600 value-share ($2,600 total), happily paying out of newfound revenue while saving 40+ hours of manual administrative chaos.

---

### Pillar 3: Sponsored Cohort Accelerator (The Institutional Scale)

* **Target Audience:** National Governing Bodies (e.g., USA Fencing), municipal departments (e.g., City of Los Angeles Department of Recreation and Parks / PlayLA model), corporate sponsors (e.g., Alibaba.com, Google Cloud initiatives), and sports foundations.
* **Price Point:** **$15,000 to $18,000** per cohort contract (covering 6 to 8 participating clubs or athlete-founders).
* **Payment Terms & Schedule:**
  * **40% Mobilization Advance ($6,000 to $7,200):** Paid upon contract execution to initiate cohort onboarding and curriculum customization.
  * **30% Midterm Milestone ($4,500 to $5,400):** Paid at Week 3 upon completion of individual operational audits and intake automation builds.
  * **30% Final Delivery ($4,500 to $5,400):** Paid at Week 6 upon final cohort showcase, documentation transfer, and delivery of the executive impact report.
* **Delivery Scope (6 Weeks):**
  * Group operational workshops tailored to sport management.
  * 1-on-1 digital optimization sprints for each participating organization.
  * Turnkey deployment of intake, scheduling, and communication pipelines for all participants.
  * Executive impact report measuring collective hours saved, new revenue capacity, and community participation gains.
* **Strategic Alignment:** Gives federations and civic agencies a proven, measurable way to invest passive athlete welfare budgets into active digital infrastructure.

---

## 3. Payment Infrastructure & Rails

1. **Invoicing & Collection Platform:**
   * **Stripe Invoicing & Billing:** Primary rail for credit card and ACH payments.
   * **Direct ACH / Wire Transfer:** Mandatory for transactions exceeding $2,500 to cap processing fees at 1% (or bank flat fee) rather than standard 2.9% credit card merchant fees.
2. **Payment Terms:**
   * Private client sprints: Due upon receipt (work starts only after deposit clears).
   * Institutional/Federation contracts: Net-15 terms from invoice issue date.
3. **Refund & Guarantee Policy:**
   * Clear milestone gates: Work progresses in defined phases. Deposits are non-refundable once discovery audit commences, protecting founder time and IP.

---

## 4. Financial Economics: The Path to $5,000+ Net Monthly Survival

### A. Monthly Operating Cost Overhead (Grounded & Verified)
Based on founder voice notes and verified actual usage (superseding the rejected $60 estimate):

| Expense Category | Actual Monthly Cost | A4A Business Share | Monthly Allocated Cost |
|:---|:---:|:---:|:---:|
| **Google AI Ultra** | $199.00 | 70% | $139.30 |
| **Anthropic (Claude API & Pro)** | $20.00 | 50% | $10.00 |
| **ChatGPT Plus / Team** | $200.00 | 50% | $100.00 |
| **Hermes / Specialized AI Agents** | $20.00 | 50% | $10.00 |
| **Google Cloud Platform (GCP)** | $35.00 | 100% | $35.00 |
| **Amazon Web Services (AWS)** | $7.00 | 100% | $7.00 |
| **Alibaba Cloud & Sourcing Tools** | $10.00 | 100% | $10.00 |
| **USA Fencing Membership ($150/yr)** | $12.50 | 15% | $1.88 |
| **PMI & Professional Orgs ($200/yr)** | $16.67 | 20% | $3.33 |
| **Local Travel & Gas (Client site visits)** | $500.00 | 15% | $75.00 |
| **Professional Training ($800/yr)** | $66.67 | 50% | $33.33 |
| **Total Monthly Operating Overhead** | | | **~$424.84 / month** (Budgeted: **$450.00**) |

---

### B. Monthly Revenue & Cash Flow Scenarios

#### Scenario 1: Pure Turnkey Sprints (Baseline Predictability)
* **Delivery:** 2 Turnkey Sprints per month @ $3,000 each.
* **Gross Revenue:** $6,000.00
* Less 4% Unconditional P4P Social Pledge: -$240.00
* Less Operating Overhead: -$450.00
* Less Payment Processing (Stripe/ACH blend ~2.9%): -$174.00
* **Net Cash Flow to Founder:** **$5,136.00 / month**
* **Workload:** 15 to 18 hours per week (7 to 9 hours per client sprint).

#### Scenario 2: Blended Private Sprints + Camp Value-Share
* **Delivery:** 1 Turnkey Sprint ($3,000) + 1 Seasonal Camp Launch ($2,500 total fee).
* **Gross Revenue:** $5,500.00
* Less 4% P4P Pledge: -$220.00
* Less Operating Overhead: -$450.00
* Less Payment Processing: -$160.00
* **Net Cash Flow to Founder:** **$4,670.00 / month**
* **Workload:** 12 to 15 hours per week.

#### Scenario 3: Institutional Boost (Quarter with Federation Cohort)
* **Delivery:** 1 Turnkey Sprint ($3,000) + 1 Sponsored Cohort Milestone ($6,000 of an $18,000 contract).
* **Gross Revenue:** $9,000.00
* Less 4% P4P Pledge: -$360.00
* Less Operating Overhead: -$450.00
* Less Payment Processing: -$240.00
* **Net Cash Flow to Founder:** **$7,950.00 / month**
* **Workload:** 16 to 20 hours per week.

#### Annual Baseline Target:
* 16 Turnkey Sprints ($48,000) + 8 Camp Launches ($20,000) + 2 Institutional Cohorts ($32,000) = **$100,000 Gross Annual Revenue**.
* Total P4P Social Contribution: **$4,000.00 / year**.
* Operating Expenses: **$5,400.00 / year**.
* **Net Annual Cash Flow to Founder:** **~$88,000 / year (~$7,330 / month)**.

---

## 5. Reciprocal Social Impact: Parafencing for Progress (P4P)

The connection between commercial revenue and community impact is structural, not ornamental:

1. **4% Unconditional Revenue Pledge:** Four percent of every dollar collected by A4A is transferred directly to P4P, an adaptive fencing initiative in formation (California grassroots to national US to global).
2. **First Funding Wave Priorities:**
   * **Fair Compensation for Adaptive Coaches:** Ending the reliance on unpaid volunteer labor so qualified coaches can afford to teach parafencing.
   * **Specialized Wheelchair Fencing Equipment:** Standard fencing wheelchairs cost up to $5,000 each plus specialized mounting frames.
   * **Travel & Support Assistance:** Subsidizing the high logistical costs of wheelchair air travel and personal-care assistant (PCA) travel requirements.
3. **Operational Backbone:** A4A provides P4P with its digital intake, tournament registration, and donor reporting systems free of charge, ensuring complete operational efficiency and transparency.

---

## 6. Official Application Texts (Aligned to Phase 3 Limits)

### Task 2.4: How will you generate revenue? (Revenue Streams)
*Official Cap: Max 150 words | Current Word Count: 142 words*

A4A generates revenue through three productized service streams aligned with sports budgeting cycles, avoiding hourly consulting and monthly retainers:

1. Turnkey Sport Ops Sprint: Fixed-scope 21-day digital modernizations for clubs and athlete-founders, delivering websites, intake automation, and custom AI communication templates with complete ownership ($2,800 to $3,000).

2. Seasonal Camp and Event Launches: Performance-aligned operational launches for summer camps, clinics, and tournaments with a $1,000 base fee plus value-share per registered athlete.

3. Sponsored Cohort Accelerators: Six-week structured digital modernizations sponsored by sports federations, city recreation departments, and corporate partners for cohorts of 6 to 8 athlete-founders or adaptive clubs ($15,000 to $18,000).

Sequencing prioritizes individual club sprints to build immediate cash flow before expanding institutional contracts. Four percent of all gross revenue is pledged unconditionally to Parafencing for Progress, directly funding wheelchair fencing access and fair coach pay.

---

### Task 2.3: What are the main activities of your business? (Main Activities)
*Official Cap: Max 150 words | Current Word Count: 135 words*

My core activity is delivering focused, done-for-you operational sprints and structured cohort programs rather than selling software licenses:

Operational diagnostics: Auditing a sports organization's inquiry pathways, website responsiveness, scheduling friction, and recurring administrative bottlenecks.

System implementation: Building mobile-first web pages, automating registration and digital liability waivers, configuring payment routing, and deploying practical AI workflow templates for parent communications, scheduling follow-ups, and sponsor proposals.

Seasonal event operations: Setting up high-converting registration funnels, automated reminder sequences, and roster management for sports camps and tournaments.

Cohort delivery: Facilitating 6-week operational accelerators for federation-sponsored cohorts, providing group workshops and 1-on-1 implementation sprints.

Adaptive equipment sourcing: Connecting adaptive sport programs with compliant wholesale manufacturers via Alibaba.com.

Case study synthesis: Documenting measurable outcomes, including hours saved and enrollment growth, validating repeatable models across the sports ecosystem.

---

### Pitch Deck Slide 7 Specification (Business Model & 4% Pledge)
* **Title:** Business Model & Social Reciprocity
* **Subtitle:** High-value productized services aligned with sports budgeting cycles. Zero monthly retainers.
* **Three Revenue Pillars:**
  * **Turnkey Sport Ops Sprint ($2,800 - $3,000):** Fixed 21-day delivery of digital front doors, automated intake, and AI workflow templates. 50% deposit / 50% completion. Client retains 100% ownership.
  * **Seasonal Camp Launches ($1,000 base + 8% tuition share):** Performance-aligned registration launches for seasonal clinics and tournaments. Zero off-season financial risk for clubs.
  * **Sponsored Cohorts ($15,000 - $18,000):** 6-week digital modernizations funded by federations, city departments (PlayLA model), and corporate partners for 6-8 clubs.
* **The 4% Social Pledge:**
  * Unconditional 4% gross revenue contribution to Parafencing for Progress (P4P).
  * Direct impact: fairly paid adaptive coaches, $5,000 specialized competition wheelchairs, and athlete travel subsidies ahead of LA28.
