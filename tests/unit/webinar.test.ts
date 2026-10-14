// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { WebinarRegistration } from '@/lib/contracts/webinar';

// Neutralize server-only so the route handler can be unit-tested directly.
vi.mock('server-only', () => ({}));

describe('Webinar Contract', () => {
  it('WebinarRegistration validates required fields and roles', () => {
    const invalid = WebinarRegistration.safeParse({
      name: '',
      email: 'not-an-email',
      role: 'invalid-role',
    });
    expect(invalid.success).toBe(false);

    const valid = WebinarRegistration.safeParse({
      name: 'Anvar',
      email: 'anvar@example.com',
      role: 'business-owner',
      organization: 'Consulting',
    });
    expect(valid.success).toBe(true);
  });
});

describe('Webinar Registration Route Handler', () => {
  const post = (body: unknown) =>
    import('@/app/api/webinar/register/route').then(({ POST }) =>
      POST(
        new Request('http://test/api/webinar/register', {
          method: 'POST',
          body: JSON.stringify(body),
        }),
      ),
    );

  it('returns 400 when missing required fields', async () => {
    const res = await post({ name: '' });
    expect(res.status).toBe(400);
  });

  it('returns 201 with confirmed registration and generated .ics content', async () => {
    const res = await post({
      name: 'Rustam',
      email: 'rustam@example.com',
      role: 'club-owner',
      organization: 'Tatar Business Circle',
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.confirmed).toBe(true);
    expect(body.icsContent).toContain('BEGIN:VCALENDAR');
    expect(body.icsContent).toContain('BEGIN:VEVENT');
    expect(body.icsContent).toContain('END:VCALENDAR');
    expect(body.icsFileName).toBe('a4a-october-masterclass.ics');
  });
});
