// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { AuditSubmission } from '@/lib/contracts/audit';

// Neutralize server-only so the route handler can be unit-tested directly.
vi.mock('server-only', () => ({}));

describe('Audit Contract', () => {
  it('AuditSubmission validates required fields and rejects invalid email', () => {
    const invalid = AuditSubmission.safeParse({
      organizationName: 'Fencing Salle',
      contactName: 'Coach',
      email: 'not-an-email',
      sportOrNiche: 'Fencing',
      athleteCount: '21-50',
      weeklyAdminHours: 10,
      primaryBottlenecks: ['inquiry-leak'],
    });
    expect(invalid.success).toBe(false);

    const valid = AuditSubmission.safeParse({
      organizationName: 'Fencing Salle',
      contactName: 'Coach',
      email: 'coach@example.com',
      sportOrNiche: 'Fencing',
      athleteCount: '21-50',
      weeklyAdminHours: 15,
      primaryBottlenecks: ['inquiry-leak', 'manual-billing'],
    });
    expect(valid.success).toBe(true);
  });
});

describe('Audit Route Handler', () => {
  const post = (body: unknown) =>
    import('@/app/api/audit/route').then(({ POST }) =>
      POST(new Request('http://test/api/audit', { method: 'POST', body: JSON.stringify(body) })),
    );

  it('returns 400 on invalid input', async () => {
    const res = await post({ organizationName: '' });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.errors).toBeDefined();
  });

  it('returns 201 with calculated friction score, recoverable hours, and prescriptions', async () => {
    const res = await post({
      organizationName: 'Bay Area Fencing Club',
      contactName: 'Elena',
      email: 'elena@bayareafencing.com',
      sportOrNiche: 'Fencing',
      athleteCount: '51-100',
      weeklyAdminHours: 20,
      primaryBottlenecks: ['inquiry-leak', 'manual-billing', 'paper-waivers'],
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.frictionScore).toBeGreaterThanOrEqual(60);
    expect(body.estimatedWeeklyHoursWasted).toBeGreaterThanOrEqual(10);
    expect(body.priorityPrescriptions.length).toBeGreaterThanOrEqual(3);
    expect(body.bookingUrl).toContain('mailto:kgafurzianova@gmail.com');
  });
});
