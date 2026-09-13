// @polsia:user-owned: distinguish Bulachak's identity from its founder and her earlier work.
import { describe, expect, it, vi } from 'vitest';

import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
import { caseStudies } from '@/lib/business/portfolio-content';
import { type PortfolioLanguage, portfolioLanguages } from '@/lib/portfolio-locale';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

vi.mock('@/lib/site', () => ({ siteUrl: 'https://bulachak.example' }));

const origin = 'https://bulachak.example';
const workPaths = {
  en: '/portfolio/work',
  ru: '/ru/portfolio/work',
  tt: '/tt/portfolio/work',
} as const;

type JsonLdNode = {
  '@type': string;
  '@id': string;
  name?: string;
  description?: string;
  mainEntity?: {
    '@id'?: string;
    '@type'?: string;
    numberOfItems?: number;
    itemListElement?: Array<{
      item: {
        '@id': string;
        author?: { '@id': string };
      };
    }>;
  };
};

function structuredGraph(language: PortfolioLanguage, slug = ''): JsonLdNode[] {
  const script = PortfolioStructuredData({ language, slug });
  const document: { '@graph': JsonLdNode[] } = JSON.parse(
    script.props.dangerouslySetInnerHTML.__html,
  );
  return document['@graph'];
}

function nodeOfType(graph: JsonLdNode[], type: string): JsonLdNode {
  const node = graph.find((entry) => entry['@type'] === type);
  if (!node) throw new Error(`Missing structured-data ${type}`);
  return node;
}

describe('Bulachak homepage positioning', () => {
  it.each(portfolioLanguages)(
    'uses the %s Bulachak home description across search and social metadata',
    (language) => {
      const metadata = portfolioMetadata(language);
      const description = bulachakHomeCopy[language].description;
      expect(metadata.description).toBe(description);
      expect(metadata.openGraph?.description).toBe(description);
      expect(metadata.twitter?.description).toBe(description);
      expect(description).not.toMatch(/kamilla|камилл|portfolio|портфолио/iu);
    },
  );

  it.each(portfolioLanguages)(
    'identifies the %s homepage with the Bulachak organization',
    (language) => {
      const graph = structuredGraph(language);
      const organization = nodeOfType(graph, 'Organization');
      const homepage = nodeOfType(graph, 'WebPage');
      expect(organization.name).toBe('Bulachak');
      expect(organization.description).toBe(bulachakHomeCopy[language].description);
      expect(homepage.mainEntity).toEqual({ '@id': organization['@id'] });
      expect(graph.some((node) => ['Person', 'ProfilePage'].includes(node['@type']))).toBe(false);
    },
  );

  it.each(portfolioLanguages)(
    'retains the founder as the person described by her %s profile',
    (language) => {
      const graph = structuredGraph(language, 'founder');
      const founder = nodeOfType(graph, 'Person');
      const profile = nodeOfType(graph, 'ProfilePage');
      expect(founder.name).toBe('Kamilla Gafurzianova');
      expect(profile.mainEntity).toEqual({ '@id': founder['@id'] });
    },
  );

  it.each(portfolioLanguages)(
    'lists all 24 earlier projects in the %s work collection with founder authorship',
    (language) => {
      const graph = structuredGraph(language, 'work');
      const founder = nodeOfType(graph, 'Person');
      const collection = nodeOfType(graph, 'CollectionPage');
      const list = collection.mainEntity;
      const entries = list?.itemListElement ?? [];
      expect(collection['@id']).toBe(origin + workPaths[language]);
      expect(list?.['@type']).toBe('ItemList');
      expect(list?.numberOfItems).toBe(24);
      expect(entries).toHaveLength(24);
      expect(new Set(entries.map(({ item }) => item['@id'])).size).toBe(24);
      const caseRoot = origin + workPaths[language].replace(/\/work$/, '');
      expect(entries.map(({ item }) => item['@id']).sort()).toEqual(
        caseStudies.map((item) => `${caseRoot}/${item.slug}`).sort(),
      );
      for (const { item } of entries) {
        expect(item.author).toEqual({ '@id': founder['@id'] });
      }
    },
  );

  it.each(portfolioLanguages)(
    'keeps the %s work canonical and language alternatives on the work directory',
    (language) => {
      const metadata = portfolioMetadata(language, 'work');
      expect(metadata.alternates?.canonical).toBe(workPaths[language]);
      expect(metadata.alternates?.languages).toEqual({
        en: workPaths.en,
        ru: workPaths.ru,
        tt: workPaths.tt,
        'x-default': '/portfolio/work',
      });
      expect(metadata.openGraph?.url).toBe(workPaths[language]);
    },
  );
});
