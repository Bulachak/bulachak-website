// Canonical English Institutional & Track Intake route (`/intake/[track]`, primarily `/intake/federation`).
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type IntakeTrack, IntakeView } from '@/components/custom/intake/intake-view';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

export function generateStaticParams() {
  return [{ track: 'athlete' }, { track: 'federation' }] as Array<{ track: IntakeTrack }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  if (track !== 'athlete' && track !== 'federation') {
    notFound();
  }
  return portfolioMetadata('en', `intake/${track}`);
}

export default async function IntakeTrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  if (track !== 'athlete' && track !== 'federation') {
    notFound();
  }
  return <IntakeView track={track} />;
}
