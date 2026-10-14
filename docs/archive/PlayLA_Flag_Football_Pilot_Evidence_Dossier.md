---
title: "PlayLA Flag Football Pilot Evidence Dossier"
created_by: Antigravity
date_created: 2026-09-10
status: active
project: A365 Business Accelerator
category: Pilot Proof & Case Study
---

# PlayLA Flag Football Pilot Evidence Dossier

## 1. Executive Summary

The PlayLA Flag Football web application is a production-grade digital infrastructure project delivered for the City of Los Angeles Department of Recreation and Parks in collaboration with Girls Play Los Angeles (GPLA). 

It demonstrates how practical digital operations and AI-accelerated workflows solve real community access barriers in municipal sports. Because Flag Football is an official new Olympic sport for the **Los Angeles 2028 Olympic Games (LA28)**, this pilot establishes direct strategic alignment with the Olympic movement and the Athlete365 mission.

```
+-------------------------------------------------------------------------+
|                    PLAYLA PILOT AT A GLANCE                             |
|                                                                         |
|  * Partner Authority: City of Los Angeles Recreation & Parks / GPLA     |
|  * Civic Foundation:  1,939 mapped entities (1,520 schools + 419 parks) |
|  * Active Sites:      15 municipal recreation centers across LA         |
|  * Accessibility:     100% Bilingual parity (English and Spanish)       |
|  * Live URL:          https://playla-flagfootball.netlify.app/          |
|  * Movement Context:  Official new Olympic sport for LA28               |
+-------------------------------------------------------------------------+
```

---

## 2. Technical Architecture & Implementation

### Core Stack
- Frontend: React 19 with TypeScript and Vite
- Styling: Tailwind CSS 4.1 with Radix UI primitives and shadcn/ui components
- Routing: Wouter client-side router
- Geolocation & Mapping: Google Maps JavaScript API with geocoded coordinates
- Animations: Framer Motion
- Form Systems: Modal-hosted embedded intake workflows for players, coaches, referees, and volunteers
- Deployment: Netlify SPA architecture with automated continuous delivery

### Bilingual Architecture (English and Spanish)
Managed centrally through `client/src/contexts/LanguageContext.tsx` with full parity across:
- Primary navigation and hero copy
- Rules glossary and visual penalty guide
- Interactive playbook and drill diagrams
- Practice planner and gameday checklists
- Equipment guides and safety protocols
- Recreation center directory search and driving directions

---

## 3. Geographic Data Infrastructure (1,700+ Locations vs 15 Active Sites)

### Civic Entity Foundation (1,939 Mapped Records)
The operational backend links **1,520 schools** and **419 parks** across Los Angeles County using proximity logic to create feeder pathways for youth sports leagues. This extensive dataset is cited in the A365 pitch deck and case studies as the "1,700+ mapped location foundation".

### 15 Active Recreation Centers
The public application serves families across 15 active program locations:
1. Algin Sutton Recreation Center (Metro, 8800 S Hoover St)
2. Baldwin Hills Recreation Center (Metro, 5401 Highlight Pl)
3. Denker Recreation Center (Metro, 1550 W 35th Pl)
4. Echo Park Recreation Center (Metro, 1632 Bellevue Ave)
5. Glassell Recreation Center (Metro, 3650 Verdugo Rd)
6. Granada Hills Recreation Center / Petit Park (Valley, 16730 Chatsworth St)
7. Jackie Tatum / Harvard Recreation Center (Metro, 6250 Harvard Blvd)
8. Mar Vista Recreation Center (West, 11430 Woodbine St)
9. Penmar Recreation Center (Pacific, 1341 Lake St)
10. Queen Anne Recreation Center (Metro, 1240 W Boulevard)
11. Saint Andrews Recreation Center (Metro, 8701 S St Andrews Pl)
12. Valley Plaza Recreation Center (Valley, 12240 Archwood St)
13. Van Ness Recreation Center (Metro, 5720 2nd Ave)
14. Westchester Recreation Center (Pacific, 7000 W Manchester Ave)
15. Westwood Recreation Center (West, 1350 S Sepulveda Blvd)

Each card integrates one-click turn-by-turn Google Maps routing, eliminating friction for parents navigating Los Angeles transit.

---

## 4. Visual Assets & Media Receipts

The following production media assets are hosted on Cloudinary DAM (`dp9lnazkj`) and available for slide deck embeds, web showcases, and marketing materials:

### Visual Case Studies & Interface Screenshots
- Primary Work Sample (JSON database next to public program card):
  `https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto,q_auto/playla-flagfootball-json-and-frontend-side-by-side_p6tzsk`
- Geographic Mapping Dashboard (Feeder-school proximity visualization):
  `https://res.cloudinary.com/dp9lnazkj/image/upload/f_webp/q_auto:best/geogrpaphic-mapping-playla-os_tkttok.png`
- Operations Airtable Dashboard:
  `https://res.cloudinary.com/dp9lnazkj/image/upload/v1776231377/ops-dashboard-playla-ops_vpq6gk.png`
- Automated Data Flow & Workflow Architecture:
  `https://res.cloudinary.com/dp9lnazkj/image/upload/f_webp/q_auto:best/automated-workflow-playla-os_nwsuoa.png`

### Screen Recording Demonstrations (WebM)
- Locations Search & Google Maps Route:
  `https://res.cloudinary.com/dp9lnazkj/video/upload/Playla-flagfootball-locations_vw34nc`
- Parent Resource Guide:
  `https://res.cloudinary.com/dp9lnazkj/video/upload/playla-flagfootball-parent-guide_jtklfa`
- Bilingual Equipment Guide:
  `https://res.cloudinary.com/dp9lnazkj/video/upload/Playla-flagfootball-equipment-bilingual_cgcfov`
- Game-Day Checklist & Emergency Protocols:
  `https://res.cloudinary.com/dp9lnazkj/video/upload/Playla-flagfootball-gameday-checklist-emergency_zlqmb6`
- Partner Ecosystem & Civic Directory:
  `https://res.cloudinary.com/dp9lnazkj/video/upload/Playla-flagfootball-partners_mh3xyj`

---

## 5. Slide 6 Pitch Deck Integration

This pilot provides concrete community proof on Slide 6 ("Product & Validation"):

> **Slide 6 Copy Placement:**
> 
> *Proof by Circle (All Public Record):*
> - **Club Level:** Published case study of the operations stack built for an 80-athlete youth tennis academy.
> - **Federation Level:** USA Fencing Hall of Fame governance system built as committee Chair (rubric rules, automated ballot pipeline, live election).
> - **Community Level:** Bilingual youth-sports web application delivered for a City of Los Angeles municipal program, live across 15 active sites with a 1,700+ mapped location foundation.
> 
> *Live Link:* https://playla-flagfootball.netlify.app/

---

## 6. Strategic Role in A4A Client-Facing Positioning

When speaking to prospective clients, sports clubs, or city recreation departments, PlayLA serves as the definitive reference implementation:
1. It proves that A4A builds usable, real-world tools rather than speculative tech demos.
2. It demonstrates full accessibility and multi-lingual community inclusion.
3. It ties directly to the momentum of the LA28 Olympic and Paralympic Games.
