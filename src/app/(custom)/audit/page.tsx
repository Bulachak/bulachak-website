// Canonical English 15-Minute Operational Leak Audit route (`/audit`).
import { AuditView } from '@/components/custom/audit/audit-view';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

export const metadata = portfolioMetadata('en', 'audit');

export default function AuditPage() {
  return <AuditView />;
}
