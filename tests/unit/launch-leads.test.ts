// @vitest-environment node
// Unit tests for the YC Silent Launch lead capture and Google Sheets + Apps Script CRM pipeline.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LaunchLeadCreate, LaunchLeadItem } from '@/lib/contracts/launch-leads';
import { portfolioBrand } from '@/lib/portfolio-brand';

vi.mock('server-only', () => ({}));

const { mockForwardToSheets } = vi.hoisted(() => ({
  mockForwardToSheets: vi.fn(() => Promise.resolve(true)),
}));

vi.mock('@/lib/business/sheets-webhook', () => ({
  forwardLeadToGoogleSheets: mockForwardToSheets,
  escapeHtml: (value: string) => value,
}));

const postLaunchLead = (body: unknown) =>
  import('@/app/api/launch-leads/route').then(({ POST }) =>
    POST(
      new Request('https://bulachak.com/api/launch-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    ),
  );

const postAudit = (body: unknown) =>
  import('@/app/api/audit/route').then(({ POST }) =>
    POST(
      new Request('https://bulachak.com/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    ),
  );

const postWebinar = (body: unknown) =>
  import('@/app/api/webinar/register/route').then(({ POST }) =>
    POST(
      new Request('https://bulachak.com/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    ),
  );

const postAthleteLead = (body: unknown) =>
  import('@/app/api/athlete-leads/route').then(({ POST }) =>
    POST(
      new Request('https://bulachak.com/api/athlete-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    ),
  );

describe('YC Silent Launch checklist & Google Sheets + Apps Script CRM pipeline', () => {
  beforeEach(() => {
    delete process.env.DATABASE_URL;
    mockForwardToSheets.mockClear();
  });

  it('defines the 5 core YC Silent Launch brand and contact properties on bulachak.com', () => {
    expect(portfolioBrand.domain).toBe('bulachak.com');
    expect(portfolioBrand.name).toBe('Bulachak');
    expect(portfolioBrand.contactEmail).toBe('kgafurzianova@gmail.com');
    expect(portfolioBrand.contactHref).toBe('https://www.linkedin.com/in/kamilla-gafurzianova/');
    expect(portfolioBrand.auditHref).toBe('/audit');
  });

  it('validates LaunchLeadCreate inputs and applies defaults', () => {
    const parsed = LaunchLeadCreate.parse({
      name: 'Coach Alex',
      email: 'alex@westsidefencing.com',
      branch: 'A4A',
      message: 'Manual billing and missed parent DMs',
    });

    expect(parsed.branch).toBe('A4A');
    expect(parsed.locale).toBe('en');
  });

  it('returns 400 with field errors when POST /api/launch-leads receives invalid input', async () => {
    const response = await postLaunchLead({
      name: '',
      email: 'not-an-email',
    });

    expect(response.status).toBe(400);
    const body = (await response.json()) as { errors: Record<string, string> };
    expect(body.errors.name).toBeDefined();
    expect(body.errors.email).toBeDefined();
  });

  it('forwards a silent launch lead to Google Sheets (Silent_Launch_Leads) and returns a pre-filled /audit URL', async () => {
    const response = await postLaunchLead({
      name: 'Coach Alex',
      email: 'alex@westsidefencing.com',
      branch: 'A4A',
      message: 'Too many manual spreadsheets',
      source: 'bulachak-silent-launch',
      locale: 'en',
    });

    expect(response.status).toBe(201);

    const payload = LaunchLeadItem.parse(await response.json());
    expect(payload.branch).toBe('A4A');
    expect(payload.auditPrefillUrl).toContain('/audit?');
    expect(payload.auditPrefillUrl).toContain('name=Coach+Alex');
    expect(payload.auditPrefillUrl).toContain('email=alex%40westsidefencing.com');
    expect(mockForwardToSheets).toHaveBeenCalledTimes(1);
    expect(mockForwardToSheets).toHaveBeenCalledWith(
      expect.objectContaining({
        sheet: 'Silent_Launch_Leads',
      }),
    );
  });

  it('forwards audit diagnostics, webinar registrations, and athlete intakes to their Google Sheet tabs', async () => {
    const auditRes = await postAudit({
      organizationName: 'Golden Gate Salle',
      contactName: 'Coach Elena',
      email: 'elena@goldengatesalle.com',
      sportOrNiche: 'Fencing',
      athleteCount: '51-100',
      weeklyAdminHours: 16,
      primaryBottlenecks: ['inquiry-leak', 'manual-billing'],
      source: 'silent-launch',
    });

    expect(auditRes.status).toBe(201);
    const auditBody = (await auditRes.json()) as { id: string; frictionScore: number };
    expect(auditBody.frictionScore).toBeGreaterThan(0);
    expect(mockForwardToSheets).toHaveBeenCalledWith(
      expect.objectContaining({
        sheet: 'Audit_Diagnostics',
      }),
    );

    const webinarRes = await postWebinar({
      name: 'Timur',
      email: 'timur@academy.org',
      role: 'club-owner',
      organization: 'Kazan Fencing Club',
      source: 'telegram-outreach',
    });

    expect(webinarRes.status).toBe(201);
    const webinarBody = (await webinarRes.json()) as { id: string; icsContent: string };
    expect(webinarBody.icsContent).toContain('BEGIN:VCALENDAR');
    expect(mockForwardToSheets).toHaveBeenCalledWith(
      expect.objectContaining({
        sheet: 'Webinar_Registrations',
      }),
    );

    const athleteRes = await postAthleteLead({
      name: 'Daria',
      email: 'daria@fencing.org',
      sport: 'Fencing',
      transitionStage: 'early',
      targetVenture: 'Private fencing performance clinic and youth camps.',
    });

    expect(athleteRes.status).toBe(201);
    expect(mockForwardToSheets).toHaveBeenCalledWith(
      expect.objectContaining({
        sheet: 'Athlete_Intake',
      }),
    );
  });

  it('keeps /intake/athlete and /intake/federation free of legacy Polsia placeholders and broken #tracks links', async () => {
    const { readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const files = [
      'src/app/(custom)/intake/athlete/page.tsx',
      'src/app/(custom)/intake/[track]/page.tsx',
      'src/components/custom/intake/athlete-form.tsx',
      'src/components/custom/intake/federation-form.tsx',
    ];

    for (const relPath of files) {
      const content = readFileSync(join(process.cwd(), relPath), 'utf8');
      expect(content, relPath).not.toMatch(/polsia\.app/i);
      expect(content, relPath).not.toContain('/#tracks');
      expect(content, relPath).not.toMatch(/custom-cervical collar/i);
      expect(content, relPath).not.toMatch(/M\. Dupont/);
      expect(content, relPath).not.toMatch(/Athens cycle/i);
    }
  });
});
