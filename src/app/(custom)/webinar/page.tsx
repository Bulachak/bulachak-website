import type { Metadata } from 'next';
import { WebinarView } from '@/components/custom/webinar/webinar-view';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

export const metadata: Metadata = portfolioMetadata('en', 'webinar');

export default function WebinarPage() {
  return <WebinarView />;
}
