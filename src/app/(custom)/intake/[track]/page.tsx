// @polsia:user-owned — intake destinations for both engagement tracks.
// Server Component (export-only `metadata`, no `'use client'`).
// Static copy blocks describing the brief-the-strategist intake for each track.
// Hand-typed build-time `generateStaticParams` keeps both routes prerendered.

import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { siteDescription, siteName } from '@/lib/site';

type Track = 'athlete' | 'federation';

interface TrackCopy {
  readonly code: string;
  readonly title: string;
  readonly sub: string;
  readonly heroLine: string;
  readonly intro: string;
  readonly fields: readonly { label: string; hint: string }[];
  readonly escalationNote: string;
}

const TRACK_COPY: Record<Track, TrackCopy> = {
  athlete: {
    code: 'T//01',
    title: 'Athlete solopreneur intake',
    sub: 'Individual operator track',
    heroLine: 'Post-career venture, in plain language.',
    intro:
      'A 20-minute intake with a strategist to define the operating thesis for the post-career business you are standing up. We assess contracting surface, sourcing load, storefront and CRM needs, and the admin-to-revenue ratio before any engagement starts.',
    fields: [
      { label: 'Name', hint: 'Operating principal (or family-office contact).' },
      { label: 'Sport & career arc', hint: 'Discipline, retirement window, current ventures.' },
      { label: 'Operating thesis', hint: 'One paragraph: what the business is meant to do.' },
      {
        label: 'Admin load',
        hint: 'Rough split of your week across sourcing, CRM, billing, admin.',
      },
      {
        label: 'Contracting surface',
        hint: 'Personal, operating company, family office, or agency.',
      },
    ],
    escalationNote:
      'All athlete-operator engagements are contracted through the operating vehicle, never directly with the athlete as a consumer. Strategists carry the decisions; agents run the operational load under escalation policy.',
  },
  federation: {
    code: 'T//02',
    title: 'Federation & adaptive-program intake',
    sub: 'Enterprise programme track',
    heroLine: 'Programme outcomes, not slide decks.',
    intro:
      'A 30-minute intake with a strategist and a programme director to scope the outcomes against which the engagement will be priced. We pressure-test the adaptive-sport thesis against your NGB or Olympic-committee procurement workflow before licensing scope is offered.',
    fields: [
      {
        label: 'Organisation',
        hint: 'NGB, Olympic committee, federation, or adaptive programme office.',
      },
      {
        label: 'Programme lead',
        hint: 'Director or programme manager who will own the engagement.',
      },
      { label: 'Programme brief', hint: 'What is being stood up, restarted, or licensed in.' },
      {
        label: 'Equipment categories',
        hint: 'Fencing chairs, racing chairs, prostheses, prosthetics, custom gear — anything bespoke.',
      },
      {
        label: 'LA28 window',
        hint: 'Whether the engagement is timed against the LA28 cluster or a longer arc.',
      },
    ],
    escalationNote:
      'Engagements are outcome-priced against the programme, not hour-priced. Playbooks are licensed wholesale across federations; bespoke builds are scoped narrowly, with human strategists holding judgement above the agent escalation threshold.',
  },
};

export function generateStaticParams() {
  return [{ track: 'athlete' }, { track: 'federation' }] as Array<{ track: Track }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const copy = TRACK_COPY[track as Track];
  if (!copy) {
    return {
      title: { absolute: siteName },
      description: siteDescription,
    };
  }
  return {
    title: { absolute: `${copy.title} — ${siteName}` },
    description: copy.heroLine,
    alternates: { canonical: `/intake/${track}` },
  };
}

export default async function IntakeTrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const copy = TRACK_COPY[track as Track];
  if (!copy) {
    return (
      <main className="container-page py-section">
        <h1 className="font-display text-h1 tracking-tight">Unknown intake track</h1>
        <p className="mt-4 text-body text-muted-foreground">
          Return to{' '}
          <Link className="text-brand-600 underline-offset-4 hover:underline" href="/">
            A4A
          </Link>{' '}
          and choose a track.
        </p>
      </main>
    );
  }

  const subject = encodeURIComponent(
    track === 'athlete'
      ? 'A4A · Athlete solopreneur intake'
      : 'A4A · Federation & adaptive programme intake',
  );

  return (
    <main className="bg-background text-foreground">
      {/* ───────────────────── HEADER STRIP ───────────────────── */}
      <section
        aria-label={`${copy.title} header`}
        className="container-page border-b border-border py-section"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="font-mono">{copy.code}</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>{copy.sub}</span>
          </div>
          <h1 className="font-display text-h1 tracking-tight md:text-display">{copy.title}</h1>
          <p className="max-w-2xl text-body-lg text-muted-foreground">{copy.intro}</p>
        </div>
      </section>

      {/* ───────────────────── BRIEF CONTENT ───────────────────── */}
      <section
        aria-label="Brief fields"
        className="container-page grid grid-cols-12 gap-x-6 gap-y-10 py-section"
      >
        <div className="col-span-12 flex flex-col gap-5 md:col-span-7">
          <div className="text-eyebrow font-mono">{'INTAKE · WHAT TO SEND'}</div>
          <h2 className="font-display text-h2 tracking-tight">{copy.heroLine}</h2>
          <p className="max-w-xl text-body text-muted-foreground">
            Send the following to the briefing inbox. A strategist will reply within two working
            days with a 20- or 30-minute intake slot. No obligation; no prep deck required.
          </p>
          <Separator />
          <dl className="flex flex-col gap-5">
            {copy.fields.map((field, i) => (
              <div
                key={field.label}
                className="flex flex-col gap-2 border-l-2 border-brand-600 pl-4"
              >
                <dt className="flex items-center gap-3">
                  <span className="font-mono text-caption font-semibold text-brand-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-h4 tracking-tight">{field.label}</span>
                </dt>
                <dd className="text-body text-muted-foreground">{field.hint}</dd>
              </div>
            ))}
          </dl>
          <Separator />
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-brand">
                <a href={`mailto:a4a-b2b@polsia.app?subject=${subject}`}>Send brief</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#tracks">Back to tracks</Link>
              </Button>
            </div>
            <p className="font-mono text-caption text-muted-foreground">
              Briefing inbox · a4a-b2b@polsia.app · Strictly B2B
            </p>
          </div>
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
              <p className="text-body text-foreground/90">{copy.escalationNote}</p>
              <Separator />
              <div className="flex flex-col gap-2 text-small text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Reply window</span>
                  <span className="font-mono">2 working days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Intake length</span>
                  <span className="font-mono">{track === 'athlete' ? '20 min' : '30 min'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pricing</span>
                  <span className="font-mono">Outcome-based</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}
