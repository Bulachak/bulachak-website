// @polsia:user-owned — the agent OWNS this file (edit freely).
// Writable home for root/global UI (Cmd+K palette, global keyboard listeners,
// app-wide overlays/dialogs), mounted once at the app root by layout.tsx.
// Put root mounts here, NOT in framework-owned layout.tsx. Returns null by default.

'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { publishedLanguageFromPath } from '@/lib/portfolio-locale';

export function GlobalMounts() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = publishedLanguageFromPath(pathname);
  }, [pathname]);
  return null;
}
