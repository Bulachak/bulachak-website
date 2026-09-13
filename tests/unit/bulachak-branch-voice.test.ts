// @polsia:user-owned: keep branch and philosophy pages distinct from the founder's voice.
import { describe, expect, it, vi } from 'vitest';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import type { StoryPage } from '@/lib/contracts/portfolio-pages';
import { type PortfolioLanguage, portfolioHref, portfolioLanguages } from '@/lib/portfolio-locale';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

vi.mock('@/lib/site', () => ({ siteUrl: 'https://bulachak.example' }));

const projectSlugs = ['about', 'a4a', 'p4p', 'i4i'] as const;
const origin = 'https://bulachak.example';

// Unicode boundaries catch Cyrillic pronouns without treating the I in I4I as
// a word. Singular founder pronouns are excluded; an organization's "we" is not.
const firstPersonWords: Record<PortfolioLanguage, string> = {
  en: "i(?:['’](?:m|ve|d|ll))?|me|my|mine|myself",
  ru: 'я|меня|мне|мной|мною|мой|моя|моё|мое|мои|моего|моей|моему|мою|моим|моими|моих|моем|моём',
  tt: 'мин|минем|миңа|мине|миндә|миннән|минеке',
};

function projectPage(language: PortfolioLanguage, slug: string): StoryPage {
  const page = getLocalizedPages(language).find((item) => item.slug === slug);
  if (!page) throw new Error(`Missing ${language} project page: ${slug}`);
  return page;
}

function publicCopy(page: StoryPage) {
  return [
    page.title,
    page.eyebrow,
    page.description,
    ...page.sections.flatMap((section) => [section.title, ...section.paragraphs]),
  ].join('\n');
}

type IdentityNode = {
  '@type': string | string[];
  '@id': string;
  name?: string;
  description?: string;
};

describe('Bulachak project-page voice', () => {
  it.each(portfolioLanguages)(
    'keeps singular founder pronouns out of %s philosophy and branch copy',
    (language) => {
      const pattern = new RegExp(
        `(?<![\\p{L}\\p{M}\\p{N}_])(?:${firstPersonWords[language]})(?![\\p{L}\\p{M}\\p{N}_])`,
        'giu',
      );
      for (const slug of projectSlugs) {
        const matches = publicCopy(projectPage(language, slug)).match(pattern) ?? [];
        expect(matches, `${language}/${slug}: first-person founder wording`).toEqual([]);
      }
    },
  );

  it.each(portfolioLanguages)(
    'uses the %s public project record in search and social descriptions',
    (language) => {
      for (const slug of projectSlugs) {
        const page = projectPage(language, slug);
        const metadata = portfolioMetadata(language, slug);
        expect(metadata.description, `${language}/${slug}`).toBe(page.description);
        expect(metadata.openGraph?.description, `${language}/${slug} Open Graph`).toBe(
          page.description,
        );
        expect(metadata.twitter?.description, `${language}/${slug} Twitter`).toBe(page.description);
      }
    },
  );

  it.each(portfolioLanguages)(
    'describes %s project pages as web pages within Bulachak, not personal profiles',
    (language) => {
      for (const slug of projectSlugs) {
        const script = PortfolioStructuredData({ language, slug });
        const document: { '@graph': IdentityNode[] } = JSON.parse(
          script.props.dangerouslySetInnerHTML.__html,
        );
        const graph = document['@graph'];
        const types = graph.flatMap((node) => node['@type']);
        const page = graph.find(
          (node) => node['@id'] === origin + portfolioHref(language, `/${slug}`),
        );
        expect(page?.['@type'], `${language}/${slug}`).toBe('WebPage');
        expect(page?.description, `${language}/${slug} structured description`).toBe(
          projectPage(language, slug).description,
        );
        expect(types, `${language}/${slug}`).toContain('Organization');
        expect(types, `${language}/${slug}`).not.toContain('Person');
        expect(types, `${language}/${slug}`).not.toContain('ProfilePage');
      }
    },
  );
});
