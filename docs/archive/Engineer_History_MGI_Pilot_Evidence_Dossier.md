# 🏛️ Engineer History («Москва глазами инженера») Flagship Pilot Evidence Dossier
## A4A Operational Implementation Case Study & Proof Inventory
**Project:** A4A (Agents for Athletes) × Athlete365 Business Accelerator  
**Founder:** Kamilla Gafurzianova, OLY  
**Client:** «Москва глазами инженера» (`engineer-history.ru`)  
**Status:** SOW #1 Milestone 2 Complete (Handoff Delivered, Staging Active)  
**Date:** September 2026  

---

## 1. Executive Summary

«Москва глазами инженера» (Engineer History / MGI) is a premier cultural and educational tour company with over 15 years of operational history, welcoming 35,000 to 40,000 monthly website visitors across a dynamic catalog of 100+ events.

As one of the flagship pilot implementations for A4A under the IOC Athlete365 and Alibaba.com Business Accelerator, Kamilla Gafurzianova, OLY delivered a complete, turnkey AI Concierge system ("Инженер-Гид"). The implementation solves severe administrative friction, protects customer privacy under strict data sovereignty laws, and installs a high-margin corporate lead capture pipeline.

### Core Delivery Principles:
1. **Zero Vendor Lock-In (Client Ownership):** Unlike traditional software agencies that trap clients in perpetual monthly software retainers, A4A delivered a complete, self-hosted operational system. All code, Docker orchestration, documentation, and operational playbooks were handed over for client autonomy.
2. **Deterministic Fast-Path Economics:** Local rule-based routing handles roughly 70% of common user clicks (highlights, schedule, rain policies, gift certificates) in under 5 milliseconds at zero token cost ($0.00). Generative reasoning is reserved only for complex, nuanced queries.
3. **Data Sovereignty (152-FZ Compliance):** A Dual-Zone Privacy Router ensures all personally identifiable customer data (names, phones, emails) is captured locally on Moscow servers and routed directly to Bitrix24 and private Telegram channels. External AI models process only anonymized cultural inquiries.
4. **Social Impact Alignment:** Four percent of all gross commercial consulting revenue is pledged unconditionally to Parafencing 4 Progress (P4P) to fund wheelchair fencing equipment and training camps.

---

## 2. The Operational Problem & Friction Audit

Prior to A4A's operational sprint, the organization faced three severe bottlenecks:

| Operational Bottleneck | Baseline Metric | Business Impact |
|:---|:---:|:---|
| **Catalog Choice Overload** | 100+ active events | Roughly 40% of first-time mobile visitors experienced decision paralysis and abandoned the site without booking. |
| **Customer Support Drag** | ~75 hours payroll / month | Dedicated customer care staff were overwhelmed answering repetitive questions regarding meeting points, weather, refunds, and vouchers. |
| **High-Margin B2B Leakage** | 50,000 to 300,000+ RUB / booking | High-value inquiries for private corporate architectural tours were buried in generic email inboxes with slow response times. |
| **Mobile Performance Latency** | 11.2s on mobile 4G | Heavy uncompressed PNG banners (3.9 MB total page weight) and 12 font files slowed initial mobile rendering. |

---

## 3. Delivered Solutions & Architecture

A4A executed a structured, multi-phase operational sprint:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     ENGINEER HISTORY DIGITAL FRONT DOOR                 │
│         engineer-history.ru (Web Widget) + Telegram Bot Channel         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        DUAL-ZONE PRIVACY ROUTER                         │
├────────────────────────────────────┬────────────────────────────────────┤
│       ZONE A: PRIVATE DATA (PII)   │      ZONE B: ANONYMOUS QUERIES     │
│       (152-FZ Sovereign VPS)       │      (Alibaba Cloud Qwen / OpenAI) │
├────────────────────────────────────┼────────────────────────────────────┤
│ • Customer Name, Phone, Email      │ • Architectural lore & history     │
│ • Bitrix24 CRM webhook             │ • Event recommendations            │
│ • Private Telegram lead alerts     │ • Fast-Path scenario engine (<5ms) │
│ • Encrypted local leads.jsonl      │ • $0 token cost on 70% of traffic  │
└────────────────────────────────────┴────────────────────────────────────┘
```

### 3.1 Delivered Components:
1. **AI Concierge Engine:** Multi-turn conversational guide trained on the company's curated cultural knowledge base, guiding visitors from exploration to ticket purchase in 3 to 4 steps.
2. **Automated Nightly Scraper (`scripts/scraper.py`):** Scrapes the live catalog every night to synchronize dates, available seats, pricing, and new events without manual staff intervention.
3. **B2B Corporate Lead Qualifier:** Structured conversational intake capturing company name, headcount, preferred dates, tour format, and budget before alerting dispatch curators.
4. **5 Web Performance Quick Wins:** Zero-cost optimizations reducing page weight by 1.2 MB and cutting initial load time from 11.2s to under 2.5s (WebP/AVIF images, font subsets, Schema.org JSON-LD event markup).
5. **Turnkey Client Handoff Package:** Complete 10-file operational suite in native Russian with zero em-dashes, production Docker Compose configs, and Nginx reverse proxy configs with SSL.

---

## 4. Operational Economics & Infrastructure Benchmarks

Ground truth telemetry verified against Yandex.Metrika Counter `24462029`:

* **Monthly Unique Visitors:** 35,000 to 40,000 visitors.
* **Estimated Bot Engagement:** 3% to 5% initiation rate (~1,200 to 1,800 active sessions/month).
* **Fast-Path Deflection:** ~70% handled locally (7.5ms latency, 0 tokens, 0 RUB cost).
* **LLM Calls:** ~30% requiring generative reasoning (~500 requests/month).
* **Total Monthly AI Compute Cost:** Under 40 RUB/month ($0.40 USD) in peak season using optimized small models, proving extreme operational sustainability for small businesses.

---

## 5. Structured 30 / 60 / 90 Day Measurement Cadence

To verify business return on investment for the Athlete365 Accelerator case study, A4A instituted a rigorous measurement framework:

* **Day 30 (Operational Baseline & Deflection):** Verify 3% to 5% visitor engagement; validate 50% to 60% automated deflection on routine inquiries; capture first cohort of corporate leads in CRM.
* **Day 60 (Conversion Uplift & Prompt Tuning):** Measure ticket sales conversion uplift among bot users versus unassisted site baseline (~3.75%); expand deflection to 75%+.
* **Day 90 (Commercial ROI & Regional Expansion):** Sustained 80%+ support deflection during peak surges; quantify net incremental revenue; evaluate rollout to regional branches (St. Petersburg, Kazan, Ekaterinburg) under SOW #2.

---

## 6. Project Artifacts & Verified Access Matrix

| Asset Description | Format | Storage Location | Clickable Access Link |
|:---|:---:|:---:|:---|
| **Master Working Directory** | Drive Folder | Drive Root | [☁️ Open Drive Folder](https://drive.google.com/drive/folders/1KwHEJLfCaB2HhRmZ3fXJv0zJXaU_57jY) |
| **Local Pilot Repository** | Git Repo | Local C: Drive | [📁 Open Local Repository](file:///C:/Users/kamil/PROJECTS/moskva-glazami-ingenera) |
| **Accelerator Pitch Deck** | Google Slides | Drive | [📄 Open Pitch Deck](https://docs.google.com/presentation/d/10imv28CDWNONzWGH-uLy3F_kEJ4CfIlgNqHhzshKIfE/edit) |
| **Executive Brief Document** | Google Doc | Drive | [📄 Open Executive Brief](https://docs.google.com/document/d/1qma4uPVDssFOwunIdUcoe31Xs7pgmlHYEdWFYqGM_Cs/edit) |
| **Master Status Tracker** | Google Sheet | Drive | [📊 Open Master Checklist](https://docs.google.com/spreadsheets/d/1b90HQ3yCCE4OREX8X00rKcn3ybZ5la8z4Rhw4OC7sao/edit) |
| **Bilateral Mutual NDA** | Google Doc | Drive | [📜 Open Mutual NDA](https://docs.google.com/document/d/1ag1XsQGdEtaWvGu8RiLckAH8ig605c02qg4lnQg8R8c/edit) |
| **Pilot SOW #1 Agreement** | Google Doc | Drive | [📄 Open SOW #1](https://docs.google.com/document/d/1cBRc_7l6LOZyV11MXrUbDqkHsXjU9VNRgKPqY19y0iA/edit) |
| **5 Quick Wins Audit** | Google Doc | Drive | [📄 Open Quick Wins](https://docs.google.com/document/d/1zRaiSgK0NgeTSKOJ8hMzJsZImIiXgAPWNkK11L-eHY4/edit) |
| **Turnkey Handoff ZIP Bundle** | ZIP Archive | Drive | [📦 Open Handoff ZIP](https://drive.google.com/file/d/1DOAo1QgD-BW8KIqLmFxfOu72aFcxCYcS/view) |
| **System Architecture Diagram** | PNG Image | Drive | [🖼️ Open Architecture Diagram](https://drive.google.com/file/d/1ZYtSmDbzLgrTuuSsNaoDE1-yQ2-GeX9S/view) |
| **One-Shot Factory Notebook** | Google Colab | Colab / Drive | [🚀 Open Colab Notebook](https://colab.research.google.com/drive/1P6xmui3WDTem0tNaD_JpKwJQ7_v7lVrF) |
| **Milestone 2 Session Report** | Baza Report | Local Baza | [📁 Open Session Report](file:///C:/Users/kamil/PROJECTS/Baza/09-SYSTEM/Baza_Reports/Session_Reports/2026-09-07-mgi-ai-concierge-milestone-2-handoff-and-commercial-roadmap.md) |