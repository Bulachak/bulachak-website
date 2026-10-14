// @polsia:user-owned: complete translations, stable navigation and publication boundaries.
import { describe, expect, it } from 'vitest';

import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { caseStudies } from '@/lib/business/portfolio-content';
import { russianCaseCopy } from '@/lib/business/portfolio-content.ru';
import { tatarCaseCopy } from '@/lib/business/portfolio-content.tt';
import { portfolioStoryPages } from '@/lib/business/portfolio-pages';
import { PortfolioList } from '@/lib/contracts/portfolio';
import { StoryPage } from '@/lib/contracts/portfolio-pages';
import {
  isPortfolioLanguage,
  isPortfolioPath,
  languageFromPath,
  localizePortfolioHref,
  portfolioHref,
  portfolioLanguages,
} from '@/lib/portfolio-locale';

const narrativeFields = [
  'title',
  'subtitle',
  'summary',
  'role',
  'highlight',
  'evidenceNote',
] as const;
const translatedFields = [...narrativeFields, 'tags', 'sections', 'links'] as const;
const expectedStorySlugs = ['about', 'founder', 'a4a', 'p4p', 'i4i'];
const cyrillic = /[\u0400-\u04ff]/;

describe('complete portfolio translations', () => {
  it('provides English, Russian and Tatar with a complete translation record for every case', () => {
    expect([...portfolioLanguages]).toEqual(['en', 'ru', 'tt']);
    expect(caseStudies).toHaveLength(24);
    const sourceSlugs = caseStudies.map((item) => item.slug).sort();

    for (const copy of [russianCaseCopy, tatarCaseCopy]) {
      expect(Object.keys(copy).sort()).toEqual(sourceSlugs);
      for (const slug of sourceSlugs) {
        const entry = copy[slug];
        if (!entry) throw new Error(`Missing translated case: ${slug}`);
        for (const field of translatedFields) {
          expect(Object.hasOwn(entry, field), `${slug}: ${field}`).toBe(true);
        }
      }
    }
  });

  it.each(portfolioLanguages)(
    'validates all 24 cases in %s through the public API contract',
    (language) => {
      const items = getLocalizedCases(language);
      expect(items).toHaveLength(24);
      expect(PortfolioList.parse({ items })).toEqual({ items });
      expect(new Set(items.map((item) => item.slug)).size).toBe(24);
    },
  );

  it.each(['ru', 'tt'] as const)(
    'supplies %s narrative text instead of falling back to English',
    (language) => {
      const items = getLocalizedCases(language);
      for (const item of items) {
        const original = caseStudies.find((source) => source.slug === item.slug);
        if (!original) throw new Error(`Missing source case: ${item.slug}`);
        for (const field of narrativeFields) {
          expect(item[field].trim(), `${item.slug}: ${field}`).not.toBe('');
          expect(item[field], `${item.slug}: ${field}`).not.toBe(original[field]);
          expect(item[field], `${item.slug}: ${field}`).toMatch(cyrillic);
        }
        expect(item.tags.length, item.slug).toBe(original.tags.length);
        expect(item.tags, item.slug).not.toEqual(original.tags);
        for (const tag of item.tags) expect(tag.trim(), item.slug).not.toBe('');
        for (const section of item.sections) {
          expect(section.title, item.slug).toMatch(cyrillic);
          expect(section.paragraphs.length, item.slug).toBeGreaterThan(0);
          for (const paragraph of section.paragraphs)
            expect(paragraph, item.slug).toMatch(cyrillic);
        }
        for (const note of Object.values(item.legNotes ?? {}))
          expect(note, item.slug).toMatch(cyrillic);
        for (const link of item.links) expect(link.label.trim(), item.slug).not.toBe('');
      }
    },
  );

  it.each(portfolioLanguages)(
    'preserves routes, evidence links and project scope in %s',
    (language) => {
      const items = getLocalizedCases(language);
      expect(items.map((item) => item.slug)).toEqual(caseStudies.map((item) => item.slug));

      for (const [index, item] of items.entries()) {
        const original = caseStudies[index];
        if (!original) throw new Error(`Missing source case at index ${index}: ${item.slug}`);
        expect(item.category, item.slug).toBe(original.category);
        expect(item.status, item.slug).toBe(original.status);
        expect(item.featured, item.slug).toBe(original.featured);
        expect(item.legs, item.slug).toEqual(original.legs);
        expect(Object.keys(item.legNotes ?? {}).sort(), item.slug).toEqual(
          Object.keys(original.legNotes ?? {}).sort(),
        );
        expect(
          item.links.map((link) => link.url),
          item.slug,
        ).toEqual(original.links.map((link) => link.url));
        expect(
          item.sections.map((section) => section.id),
          item.slug,
        ).toEqual(original.sections.map((section) => section.id));
        for (const leg of Object.keys(item.legNotes ?? {}))
          expect(item.legs, item.slug).toContain(leg);
      }
    },
  );
});

describe('localized public story pages', () => {
  it.each(portfolioLanguages)(
    'provides separate About, Founder and venture pages in %s',
    (language) => {
      const pages = portfolioStoryPages[language];
      expect(pages.map((page) => page.slug).sort()).toEqual([...expectedStorySlugs].sort());
      for (const page of pages) {
        expect(StoryPage.parse(page)).toEqual(page);
        const original = portfolioStoryPages.en.find((source) => source.slug === page.slug);
        if (!original) throw new Error(`Missing source story: ${page.slug}`);
        expect(page.relatedLeg, page.slug).toBe(original.relatedLeg);
        expect(
          page.sections.map((section) => section.id),
          page.slug,
        ).toEqual(original.sections.map((section) => section.id));
        if (language !== 'en') {
          expect(page.description, page.slug).not.toBe(original.description);
          expect(page.description, page.slug).toMatch(cyrillic);
          for (const section of page.sections) {
            expect(section.title, page.slug).toMatch(cyrillic);
            for (const paragraph of section.paragraphs)
              expect(paragraph, page.slug).toMatch(cyrillic);
          }
        }
      }
    },
  );

  it.each(portfolioLanguages)(
    'keeps prohibited copy and contact details out of the %s public payload',
    (language) => {
      const payload = JSON.stringify({
        cases: getLocalizedCases(language),
        pages: portfolioStoryPages[language],
      });
      expect(payload).not.toMatch(/[\u2013\u2014]/);
      expect(payload).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      expect(payload).not.toMatch(/mailto:/i);
      expect(payload).not.toMatch(/quoreka|fam[\s-]?bot|f[ew]ncing[\s-]?hub|luxiomer/i);
      expect(payload).not.toMatch(/beverly[\s-]+hills[\s-]+fencers[\s-]+club/i);
      expect(payload).not.toMatch(
        /dare-dashboard-for-open-ai|dare\s+dashboard\s+for\s+andrey|marina-pitch/i,
      );
      expect(payload).not.toMatch(/committee-review|04_portal|nominee-record/i);
    },
  );
});

describe('portfolio language navigation', () => {
  it('switches languages without losing the case, query or section anchor', () => {
    const detail = '/playla-family-resource-app?from=search#delivery';
    const russian = localizePortfolioHref(detail, 'ru');
    expect(russian).toBe('/ru/playla-family-resource-app?from=search#delivery');
    const tatar = localizePortfolioHref(russian, 'tt');
    expect(tatar).toBe('/tt/playla-family-resource-app?from=search#delivery');
    expect(localizePortfolioHref(tatar, 'en')).toBe(detail);
    // Also normalizes legacy /portfolio/* links to flattened canonical paths
    expect(
      localizePortfolioHref('/portfolio/playla-family-resource-app?from=search#delivery', 'ru'),
    ).toBe('/ru/playla-family-resource-app?from=search#delivery');
  });

  it('uses one canonical home per language for catalogue, policy, and action pages', () => {
    expect(portfolioHref('en')).toBe('/');
    expect(portfolioHref('ru')).toBe('/ru');
    expect(portfolioHref('tt', '/privacy')).toBe('/tt/privacy');
    expect(localizePortfolioHref('/ru/terms', 'en')).toBe('/terms');
    expect(localizePortfolioHref('/?category=web#work', 'tt')).toBe('/tt?category=web#work');
    expect(localizePortfolioHref('/audit', 'ru')).toBe('/ru/audit');
    expect(localizePortfolioHref('/ru/intake/athlete', 'tt')).toBe('/tt/intake/athlete');
  });

  it('recognizes only supported language prefixes and real portfolio paths', () => {
    for (const language of portfolioLanguages) expect(isPortfolioLanguage(language)).toBe(true);
    for (const invalid of ['', 'fr', 'EN', 'en-US', 'constructor']) {
      expect(isPortfolioLanguage(invalid)).toBe(false);
    }
    for (const path of [
      '/',
      '/about',
      '/ru/about',
      '/tt/founder',
      '/audit',
      '/ru/audit',
      '/tt/intake/athlete',
      '/portfolio',
      '/ru/portfolio/about',
    ]) {
      expect(isPortfolioPath(path), path).toBe(true);
    }
    for (const path of [
      '/fr/portfolio',
      '/en/portfolio',
      '/en/about',
      '/russian/portfolio',
      '/portfolio-old',
      '/ru/portfolio-copy',
      '/health',
    ]) {
      expect(isPortfolioPath(path), path).toBe(false);
    }
    expect(languageFromPath('/ru/about')).toBe('ru');
    expect(languageFromPath('/tt/founder')).toBe('tt');
    expect(languageFromPath('/about')).toBe('en');
    expect(languageFromPath('/fr/portfolio')).toBe('en');
  });

  it('leaves unrelated paths and external links unchanged', () => {
    for (const href of [
      '/health',
      '/portfolio-old',
      '/fr/portfolio',
      'https://example.com/portfolio',
    ]) {
      expect(localizePortfolioHref(href, 'ru'), href).toBe(href);
    }
  });
});
