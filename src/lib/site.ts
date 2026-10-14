// Centralized site identity for SEO metadata routes (robots.ts, sitemap.ts,
// manifest.ts) and the root layout's default Open Graph / Twitter / canonical metadata.
import { env } from '@/lib/env';

// Absolute public origin for SEO (metadataBase, canonical, robots, sitemap, OG).
// Defaults natively to https://bulachak.com even when SKIP_ENV_VALIDATION=1 is set.
export const siteUrl = (env.NEXT_PUBLIC_APP_URL ?? 'https://bulachak.com').replace(/\/+$/, '');

export { siteDescription, siteName } from '@/lib/brand';
