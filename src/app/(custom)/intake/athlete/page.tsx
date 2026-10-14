// Canonical English Athlete & Coach Venture Intake route (`/intake/athlete`).
import { IntakeView } from '@/components/custom/intake/intake-view';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

export const metadata = portfolioMetadata('en', 'intake/athlete');

export default function AthleteIntakePage() {
  return <IntakeView track="athlete" />;
}
