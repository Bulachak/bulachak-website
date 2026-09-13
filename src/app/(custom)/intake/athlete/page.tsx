// @polsia:user-owned — athlete intake destination. Server Component
// (export-only `metadata`, no `'use client'`). Composes the AthleteIntakeForm
// island. Static segment wins over the dynamic `[track]` sibling in Next 16,
// so /intake/athlete lands here and /intake/federation still hits
// `[track]/page.tsx`.

import type { Metadata } from 'next';
import Link from 'next/link';
import { AthleteIntakeForm } from '@/components/custom/intake/athlete-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { siteName } from '@/lib/site';

const TITLE = 'Athlete intake';
const DESCRIPTION =
  'A 20-minute intake with a strategist to define the operating thesis for the post-career business you are standing up.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} — ${siteName}` },
  description: DESCRIPTION,
  alternates: { canonical: '/intake/athlete' },
  openGraph: {
    type: 'website',
    title: `${TITLE} — ${siteName}`,
    description: DESCRIPTION,
    url: '/intake/athlete',
  },
};

export default function AthleteIntakePage() {
  return (
    <main className="bg-background text-foreground">
      {/* ───────────────────── HEADER STRIP ───────────────────── */}
      <section
        aria-label="Athlete intake header"
        className="container-page border-b border-border py-section"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="font-mono">{'T//01 · ATHLETE INTAKE'}</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>Individual operator track</span>
          </div>
          <h1 className="font-display text-h1 tracking-tight md:text-display">
            {TITLE}: a 20-minute strategist intake.
          </h1>
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            We assess your contracting surface, sourcing load, storefront and CRM needs, and the
            admin-to-revenue ratio before any engagement starts. Submit the five fields below; a
            strategist replies within two working days with a 20-minute intake slot.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-caption">
              Strictly B2B
            </Badge>
            <Badge variant="outline" className="font-mono text-caption">
              2 working-day reply
            </Badge>
            <Badge variant="outline" className="font-mono text-caption">
              Outcome-priced
            </Badge>
          </div>
        </div>
      </section>

      {/* ───────────────────── FORM + POLICY ───────────────────── */}
      <section
        aria-label="Athlete intake form"
        className="container-page grid grid-cols-12 gap-x-6 gap-y-10 py-section"
      >
        <div className="col-span-12 md:col-span-7">
          <AthleteIntakeForm />
        </div>

        <aside className="col-span-12 md:col-span-5">
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex items-center justify-between text-eyebrow font-mono">
                <span>ESCALATION POLICY</span>
                <Badge variant="outline" className="font-mono text-caption">
                  Strictly B2B
                </Badge>
              </div>
              <p className="text-body text-foreground/90">
                All athlete-operator engagements are contracted through the operating vehicle, never
                directly with the athlete as a consumer. Strategists carry the decisions; agents run
                the operational load under escalation policy.
              </p>
              <Separator />
              <div className="flex flex-col gap-2 text-small text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Reply window</span>
                  <span className="font-mono">2 working days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Intake length</span>
                  <span className="font-mono">20 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pricing</span>
                  <span className="font-mono">Outcome-based</span>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="/pricing">See pricing tiers</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#tracks">Back to tracks</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}
