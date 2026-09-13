// @polsia:user-owned — Medalhaus pricing page. Server Component (no
// `'use client'`): exports `metadata`, renders static tier copy + FAQ
// prose. The Accordion is composed through a client island that only
// imports the Radix accordion primitive.

import type { Metadata } from 'next';
import Link from 'next/link';
import { PricingFaq, type PricingFaqItem } from '@/components/custom/pricing/pricing-faq';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: { absolute: 'Pricing — A4A' },
  description:
    'Three Medalhaus engagement tiers — Solopreneur Sprint, Solopreneur Retainer, Federation Enterprise License. Strictly B2B, outcome-priced.',
  alternates: { canonical: '/pricing' },
};

interface Tier {
  readonly code: string;
  readonly sub: string;
  readonly title: string;
  readonly engagementLength: string;
  readonly pricingShape: string;
  readonly body: string;
  readonly ctaLabel: string;
  readonly ctaHref: '/intake/athlete' | '/intake/federation';
}

const TIERS: readonly Tier[] = [
  {
    code: 'T//01',
    sub: 'Athlete · entry track',
    title: 'Solopreneur Sprint',
    engagementLength: '20 min intake · 6-week arc',
    pricingShape: 'Outcome-priced',
    body: 'Defines the operating thesis, the sourcing / storefront / CRM / billing backbone, and a 6-week delivery arc for an athlete standing up a post-career venture. The minimum commitment that closes the entry posture.',
    ctaLabel: 'Athlete intake',
    ctaHref: '/intake/athlete',
  },
  {
    code: 'T//02',
    sub: 'Athlete · ongoing',
    title: 'Solopreneur Retainer',
    engagementLength: 'Monthly standing capacity',
    pricingShape: 'Outcome-priced',
    body: 'The same intake bucket as the Sprint, but as ongoing operating capacity — agents absorb the admin, sourcing, and storefront load while the athlete-operator runs the venture. Standing, not hourly.',
    ctaLabel: 'Athlete intake',
    ctaHref: '/intake/athlete',
  },
  {
    code: 'T//03',
    sub: 'Operator · programme track',
    title: 'Federation Enterprise License',
    engagementLength: '30 min intake · programme arc',
    pricingShape: 'Outcome-priced · licence',
    body: 'A wholesale licence of the A4A playbook to NGBs, Olympic committees, and adaptive-sport programmes. Pressure-tested against the LA28 procurement windows — engagement is scoped against the programme, not the seat.',
    ctaLabel: 'Federation intake',
    ctaHref: '/intake/federation',
  },
];

const FAQ_ITEMS: readonly PricingFaqItem[] = [
  {
    value: 'pricing-shape',
    question: 'How is pricing structured for procurement?',
    answer:
      'Every tier is priced against the engagement outcome, never against hours or seats. Procurement receives a single statement of work with deliverables named, a budget band, and an escalation policy. Briefings route to a4a-b2b@polsia.app and receive a reply within two working days.',
  },
  {
    value: 'sprint-vs-retainer',
    question: 'Sprint vs. retainer — which one fits?',
    answer:
      'The Sprint is the entry posture: a 20-minute intake plus a 6-week arc to stand up the operating backbone of a post-career venture. The Retainer is what comes after — standing operating capacity for an athlete-operator whose business has cleared the entry arc and now needs to be run, not started.',
  },
  {
    value: 'minimum-length',
    question: 'What is the minimum engagement length?',
    answer:
      'The Sprint is bounded to its 6-week delivery arc; there is no early exit because the deliverables are named up front. The Retainer is monthly standing capacity with a 60-day exit clause. Federation licensing is programme-scoped against procurement — the licence term is part of the statement of work.',
  },
  {
    value: 'licence',
    question: 'Do federations license the playbook wholesale?',
    answer:
      'Yes. The playbook — operating thesis, sourcing backbone, escalation policy, and procurement narrative — is licensed to NGBs, Olympic committees, and adaptive-sport programmes in full. Bespoke builds are scoped narrowly alongside the licence; agents run the operational load under the same escalation policy as the athlete-operator track.',
  },
  {
    value: 'ai-policy',
    question: 'How is the AI escalation policy written into the contract?',
    answer:
      'Agents carry the operating load. Strategists hold judgement above the escalation threshold — pricing decisions, contracting surface changes, and any commitment that touches the operating principal directly. The escalation threshold is named in every statement of work so it is auditable, not implied.',
  },
];

export default function PricingPage() {
  return (
    <main className="bg-background text-foreground">
      {/* ───────────────────── HERO ───────────────────── */}
      <section aria-label="Pricing hero" className="container-page pt-section-lg pb-section">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="font-mono">{'M//03 · PRICING'}</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>Three engagement tiers</span>
          </div>

          <h1 className="font-display text-h1 tracking-tight md:text-display">
            Three tiers, one operating discipline.
          </h1>

          <p className="max-w-2xl text-body-lg text-muted-foreground">
            A4A turns post-career momentum into operating businesses and fragmented procurement into
            coordinated supply chains for the adaptive sport market. Each tier below is priced
            against the engagement outcome — agents carry the operating load, strategists hold the
            decisions above the escalation threshold.
          </p>
        </div>
      </section>

      {/* ───────────────────── TIER GRID ───────────────────── */}
      <section
        id="tiers"
        aria-label="Engagement tiers"
        className="container-page border-t border-border py-section"
      >
        <div className="flex flex-col gap-3 pb-10">
          <div className="text-eyebrow font-mono">{'M//04 · TIERS'}</div>
          <h2 className="font-display text-h1 tracking-tight">
            Three engagement tiers. One operating discipline.
          </h2>
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            The Sprint and Retainer share the athlete intake bucket — entry posture vs. standing
            capacity. The Federation licence is wholesale playbook against the programme. Briefings
            are routed to the same inbox; leads are kept on the right track from the first message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <Card
              key={tier.code}
              className="lift flex flex-col gap-4 border-border bg-card p-8 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <Badge variant="outline" className="font-mono text-caption">
                  {tier.code}
                </Badge>
                <span className="font-mono text-caption text-muted-foreground">{tier.sub}</span>
              </div>

              <h3 className="font-display text-h3 tracking-tight">{tier.title}</h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-caption text-muted-foreground">
                <span>{tier.engagementLength}</span>
                <span aria-hidden className="h-px w-4 bg-border" />
                <span>{tier.pricingShape}</span>
              </div>

              <p className="text-body text-muted-foreground">{tier.body}</p>

              <div className="mt-auto pt-4">
                <Button asChild size="lg" className="shadow-brand">
                  <Link href={tier.ctaHref}>{tier.ctaLabel}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-10 font-mono text-caption text-muted-foreground">
          Briefing inbox · a4a-b2b@polsia.app · Strictly B2B · Outcome-based
        </p>
      </section>

      {/* ───────────────────── FAQ ───────────────────── */}
      <section
        aria-label="Pricing FAQ"
        className="container-page border-t border-border py-section"
      >
        <div className="flex flex-col gap-3 pb-10">
          <div className="text-eyebrow font-mono">{'M//05 · FAQ'}</div>
          <h2 className="font-display text-h1 tracking-tight">
            Procurement, engagement length, and how contracts are written.
          </h2>
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            The five questions procurement and operating principals raise on the first call,
            answered against the statement of work rather than the marketing deck.
          </p>
        </div>

        <PricingFaq items={FAQ_ITEMS} />
      </section>
    </main>
  );
}
