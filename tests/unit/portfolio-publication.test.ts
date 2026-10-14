import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement, isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import UnifiedPortfolioAndLocalePage, {
  generateMetadata,
} from '@/app/(custom)/[language]/[[...path]]/page';
import { PortfolioNav } from '@/components/custom/portfolio/portfolio-nav';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import {
  isPortfolioLanguage,
  isPublishedPortfolioLanguage,
  portfolioLanguages,
  publishedPortfolioLanguages,
} from '@/lib/portfolio-locale';
import { portfolioMetadata } from '@/lib/portfolio-metadata';
import { seoRoutes } from '@/lib/seo-routes';

const { pathname } = vi.hoisted(() => ({ pathname: vi.fn(() => '/') }));

vi.mock('@/lib/site', () => ({ siteUrl: 'https://bulachak.example' }));
vi.mock('next/navigation', () => ({
  usePathname: pathname,
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  redirect: (url: string): never => {
    throw new Error(`REDIRECT:${url}`);
  },
  notFound: (): never => {
    throw new Error('NOT_FOUND');
  },
}));

const representativeSlugs = [
  '',
  'work',
  'about',
  'playla-family-resource-app',
  'audit',
  'pricing',
  'webinar',
  'intake/athlete',
];
const unsupportedLink = /\/zz\/|[?&]lang=zz/;

function routeProps(language: string, slug = '') {
  return {
    params: Promise.resolve({ language, path: slug ? slug.split('/') : [] }),
    searchParams: Promise.resolve({
      q: 'sport & access',
      tag: ['operations', 'community'],
      empty: '',
      absent: undefined,
    }),
  };
}

describe('portfolio language publication boundary', () => {
  it('publishes all three complete language editions', () => {
    expect(portfolioLanguages).toEqual(['en', 'ru', 'tt']);
    expect(publishedPortfolioLanguages).toEqual(['en', 'ru', 'tt']);
    expect(isPortfolioLanguage('tt')).toBe(true);
    expect(isPublishedPortfolioLanguage('tt')).toBe(true);
    expect(getLocalizedCases('tt')).toHaveLength(24);
    expect(getLocalizedCases('tt').map((item) => item.slug)).toEqual(
      getLocalizedCases('en').map((item) => item.slug),
    );
    expect(getLocalizedPages('tt').map((page) => page.slug)).toEqual(
      getLocalizedPages('en').map((page) => page.slug),
    );
    expect(bulachakHomeCopy.tt.description).not.toBe(bulachakHomeCopy.en.description);
  });

  it('offers every published language choice on all three editions', () => {
    for (const path of ['/', '/ru/work', '/tt/a4a', '/ru/audit']) {
      pathname.mockReturnValue(path);
      const html = renderToStaticMarkup(createElement(PortfolioNav));
      const document = new DOMParser().parseFromString(html, 'text/html');
      const options = Array.from(document.querySelectorAll('select option'));
      expect(options.map((option) => option.getAttribute('value'))).toEqual(['en', 'ru', 'tt']);
      expect(document.querySelector('option[value="tt"]')?.textContent).toBe('Татарча');
      expect(html).not.toMatch(unsupportedLink);
    }
  });

  it('advertises all 114 localized editorial and action routes across en, ru, and tt', async () => {
    const routes = await seoRoutes();
    expect(routes).toHaveLength(114);
    expect(new Set(routes.map((route) => route.path)).size).toBe(114);
    for (const route of routes) {
      expect(Object.keys(route.alternates?.languages ?? {}).sort()).toEqual(['en', 'ru', 'tt']);
      expect(JSON.stringify(route)).not.toMatch(unsupportedLink);
    }
    for (const language of publishedPortfolioLanguages) {
      for (const slug of representativeSlugs) {
        const metadata = portfolioMetadata(language, slug);
        expect(Object.keys(metadata.alternates?.languages ?? {}).sort()).toEqual([
          'en',
          'ru',
          'tt',
          'x-default',
        ]);
        expect(JSON.stringify(metadata)).not.toMatch(unsupportedLink);
        const script = PortfolioStructuredData({ language, slug });
        const source = script.props.dangerouslySetInnerHTML.__html;
        const document: {
          '@graph': Array<{ '@type': string; inLanguage?: string | string[] }>;
        } = JSON.parse(source);
        expect(document['@graph'].find((node) => node['@type'] === 'WebSite')?.inLanguage).toEqual([
          'en',
          'ru',
          'tt',
        ]);
        expect(source).not.toMatch(unsupportedLink);
      }
    }
    const discovery = readFileSync(join(process.cwd(), 'public', 'llms.txt'), 'utf8');
    expect(discovery).not.toMatch(unsupportedLink);
    expect(discovery).toContain('/portfolio/content.md?lang=en');
    expect(discovery).toContain('/portfolio/content.md?lang=ru');
    expect(discovery).toContain('/portfolio/content.md?lang=tt');
  });

  it('rejects unsupported languages before serving pages or metadata', async () => {
    for (const slug of representativeSlugs) {
      for (const handler of [UnifiedPortfolioAndLocalePage, generateMetadata]) {
        await expect(handler(routeProps('zz', slug))).rejects.toThrow('NOT_FOUND');
      }
    }
  });

  it.each(['ru', 'tt'])(
    'serves valid %s pages and metadata at flattened canonical URLs without redirecting them',
    async (language) => {
      for (const slug of representativeSlugs) {
        expect(
          isValidElement(await UnifiedPortfolioAndLocalePage(routeProps(language, slug))),
        ).toBe(true);
        const metadata = await generateMetadata(routeProps(language, slug));
        expect(metadata.alternates?.canonical).toBe(`/${language}${slug ? `/${slug}` : ''}`);
        expect(metadata.description).toBe(
          portfolioMetadata(language as 'ru' | 'tt', slug).description,
        );
      }
    },
  );

  it('serves flattened English root editorial and case study routes directly', async () => {
    for (const enSlug of ['work', 'about', 'a4a', 'playla-family-resource-app']) {
      expect(isValidElement(await UnifiedPortfolioAndLocalePage(routeProps(enSlug, '')))).toBe(
        true,
      );
      const metadata = await generateMetadata(routeProps(enSlug, ''));
      expect(metadata.alternates?.canonical).toBe(`/${enSlug}`);
    }
  });
});
