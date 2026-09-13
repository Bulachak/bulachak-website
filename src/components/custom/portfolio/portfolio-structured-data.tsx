// biome-ignore-all lint/security/noDangerouslySetInnerHtml: This component renders only static JSON-LD, serialized with < escaped to prevent script termination.
// @polsia:user-owned: public identities and page context, without private contact data.

import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import { portfolioBrand, portfolioLegs } from '@/lib/portfolio-brand';
import {
  type PortfolioLanguage,
  portfolioHref,
  publishedPortfolioLanguages,
} from '@/lib/portfolio-locale';
import { portfolioWorkMetadata } from '@/lib/portfolio-metadata';
import { siteUrl } from '@/lib/site';

export function PortfolioStructuredData({
  language,
  slug = '',
}: {
  language: PortfolioLanguage;
  slug?: string;
}) {
  const home = bulachakHomeCopy[language];
  const directory = portfolioWorkMetadata(language);
  const story = getLocalizedPages(language).find((page) => page.slug === slug);
  const cases = getLocalizedCases(language);
  const work = cases.find((item) => item.slug === slug);
  const isWorkDirectory = slug === 'work';
  const includePerson = Boolean(work) || isWorkDirectory || slug === 'founder';
  const personId = `${siteUrl}/portfolio/founder#person`;
  const organizationId = `${siteUrl}/portfolio#bulachak`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      ...(includePerson
        ? [
            {
              '@type': 'Person',
              '@id': personId,
              name: 'Kamilla Gafurzianova',
              url: siteUrl + portfolioHref(language, '/founder'),
              image: `${siteUrl}/assets/portfolio/kamilla.webp`,
              sameAs: [portfolioBrand.contactHref],
            },
          ]
        : []),
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Bulachak',
        description: home.description,
        url: siteUrl + portfolioHref(language),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/portfolio#website`,
        name: 'Bulachak',
        description: home.description,
        url: `${siteUrl}/portfolio`,
        inLanguage: publishedPortfolioLanguages,
      },
      {
        '@type': work
          ? 'CreativeWork'
          : isWorkDirectory
            ? 'CollectionPage'
            : slug === 'founder'
              ? 'ProfilePage'
              : 'WebPage',
        '@id': siteUrl + portfolioHref(language, slug ? `/${slug}` : ''),
        name: story?.title ?? work?.title ?? (isWorkDirectory ? directory.title : home.title),
        description:
          story?.description ??
          work?.summary ??
          (isWorkDirectory ? directory.description : home.description),
        inLanguage: language,
        isPartOf: { '@id': `${siteUrl}/portfolio#website` },
        ...(work
          ? { author: { '@id': personId } }
          : isWorkDirectory
            ? {
                mainEntity: {
                  '@type': 'ItemList',
                  numberOfItems: cases.length,
                  itemListElement: cases.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                      '@type': 'CreativeWork',
                      '@id': siteUrl + portfolioHref(language, `/${item.slug}`),
                      name: item.title,
                      url: siteUrl + portfolioHref(language, `/${item.slug}`),
                      author: { '@id': personId },
                    },
                  })),
                },
              }
            : slug === 'founder'
              ? { mainEntity: { '@id': personId } }
              : !slug
                ? {
                    mainEntity: { '@id': organizationId },
                    about: portfolioLegs.map((leg) => ({
                      '@type': 'Thing',
                      name: leg.names[language],
                      description: home.branches[leg.code].description,
                      url: siteUrl + portfolioHref(language, `/${leg.code.toLowerCase()}`),
                    })),
                  }
                : {}),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
