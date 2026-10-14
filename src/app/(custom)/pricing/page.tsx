// Canonical English Pricing & Engagement Pillars route (`/pricing`).
import { PricingView } from '@/components/custom/pricing/pricing-view';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

export const metadata = portfolioMetadata('en', 'pricing');

export default function PricingPage() {
  return <PricingView />;
}
