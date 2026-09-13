// @polsia:user-owned — brand identity. Edit freely. `site.ts` re-exports
// siteName/siteDescription; `manifest.ts` + `opengraph-image.tsx` read `brandVisual`.

import { bulachakHomeCopy } from '@/lib/business/bulachak-home';

export const siteName = 'Bulachak';
export const siteDescription = bulachakHomeCopy.en.description;

// PWA + social-share colors. HEX only (the oklch() tokens in globals.css aren't
// readable here) — set to match your brand seed.
export const brandVisual = {
  /** PWA browser-UI / status-bar color. */
  themeColor: '#1f684c',
  /** PWA splash + install background. */
  backgroundColor: '#f6faf7',
  /** Social-share (OG/Twitter) image. */
  og: {
    background: '#1d332c',
    foreground: '#f6faf7',
    /** Second line under the site name; '' hides it. */
    tagline: bulachakHomeCopy.en.title,
  },
} as const;
