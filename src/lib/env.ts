// Typed environment configuration for Bulachak (bulachak.com) via @t3-oss/env-nextjs.

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // Optional Postgres connection string (when running with Prisma).
    DATABASE_URL: z.string().url().optional(),
    // Google Apps Script Web App URL for appending leads to Google Sheets + sending Gmail alerts.
    GOOGLE_SHEETS_WEBHOOK_URL: z.string().url().optional(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('https://bulachak.com'),
    // Base for @/lib/api-client + proxy.ts connect-src. Default-empty
    // (unset) means same-origin `/api`; set only for an external API origin.
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_SHEETS_WEBHOOK_URL: process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
