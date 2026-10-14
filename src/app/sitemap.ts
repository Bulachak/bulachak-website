// /sitemap.xml — builds canonical trilingual sitemap entries from src/lib/seo-routes.ts.
import type { MetadataRoute } from 'next';
import { seoRoutes } from '@/lib/seo-routes';
import { siteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of await seoRoutes()) {
    if (!route.path.startsWith('/')) continue;
    if (route.path.includes('#')) continue;
    if (seen.has(route.path)) continue;
    seen.add(route.path);
    const { path, ...meta } = route;
    entries.push({ url: `${siteUrl}${path}`, changeFrequency: 'weekly', priority: 0.7, ...meta });
  }

  return entries;
}
