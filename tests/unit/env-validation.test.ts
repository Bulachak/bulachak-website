// @vitest-environment node
import { afterEach, expect, test, vi } from 'vitest';

afterEach(() => vi.resetModules());

test('next.config loads cleanly with default https://bulachak.com origin and no required Polsia/DB vars', async () => {
  const prevDb = process.env.DATABASE_URL;
  const prevWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const prevSkip = process.env.SKIP_ENV_VALIDATION;
  delete process.env.DATABASE_URL;
  delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  delete process.env.SKIP_ENV_VALIDATION;
  vi.resetModules();
  try {
    await expect(import('../../next.config')).resolves.toBeDefined();
    const { siteUrl } = await import('@/lib/site');
    expect(siteUrl).toBe('https://bulachak.com');
  } finally {
    if (prevDb !== undefined) process.env.DATABASE_URL = prevDb;
    if (prevWebhook !== undefined) process.env.GOOGLE_SHEETS_WEBHOOK_URL = prevWebhook;
    if (prevSkip !== undefined) process.env.SKIP_ENV_VALIDATION = prevSkip;
  }
});

test('next.config wires env validation (throws on an invalid GOOGLE_SHEETS_WEBHOOK_URL)', async () => {
  const prevWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const prevSkip = process.env.SKIP_ENV_VALIDATION;
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'not-a-valid-url';
  delete process.env.SKIP_ENV_VALIDATION;
  vi.resetModules();
  try {
    await expect(import('../../next.config')).rejects.toThrow(/Invalid environment variables/);
  } finally {
    if (prevWebhook === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = prevWebhook;
    if (prevSkip !== undefined) process.env.SKIP_ENV_VALIDATION = prevSkip;
  }
});

test('SKIP_ENV_VALIDATION bypasses validation', async () => {
  const prevWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const prevSkip = process.env.SKIP_ENV_VALIDATION;
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'not-a-valid-url';
  process.env.SKIP_ENV_VALIDATION = '1';
  vi.resetModules();
  try {
    await expect(import('../../next.config')).resolves.toBeDefined();
  } finally {
    if (prevWebhook === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = prevWebhook;
    if (prevSkip === undefined) delete process.env.SKIP_ENV_VALIDATION;
    else process.env.SKIP_ENV_VALIDATION = prevSkip;
  }
});
