// @polsia:user-owned: canonical and language metadata for public editorial pages.
import type { Metadata } from 'next';
import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import {
  isPublishedPortfolioLanguage,
  type PortfolioLanguage,
  portfolioHref,
  publishedPortfolioLanguages,
  translate,
} from '@/lib/portfolio-locale';

// Matches the distinct heading and introduction on the founder's work directory.
export function portfolioWorkMetadata(language: PortfolioLanguage) {
  return {
    title: translate(
      language,
      'Experience behind Bulachak.',
      'Опыт, на котором строится Bulachak.',
      'Bulachakка нигез булган тәҗрибә.',
    ),
    description: translate(
      language,
      'Projects by Bulachak founder Kamilla Gafurzianova. Each case explains her role, the work’s status, and the evidence available.',
      'Проекты основательницы Bulachak Камиллы Гафурзяновой. В каждом кейсе указаны её роль, статус работы и доступные подтверждения.',
      'Bulachakка нигез салучы Камилла Гафурзянованың проектлары. Һәр тасвирламада аның катнашы, эшнең хәзерге хәле һәм раслаучы материаллар күрсәтелә.',
    ),
  };
}

export function portfolioMetadata(language: PortfolioLanguage, slug = ''): Metadata {
  const home = bulachakHomeCopy[language];
  const directory = portfolioWorkMetadata(language);
  const item =
    getLocalizedPages(language).find((page) => page.slug === slug) ??
    getLocalizedCases(language).find((entry) => entry.slug === slug);
  const title = slug === 'work' ? directory.title : (item?.title ?? home.title);
  const description =
    (item && 'description' in item ? item.description : undefined) ??
    (item && 'summary' in item ? item.summary : undefined) ??
    (slug === 'work' ? directory.description : home.description);
  const suffix = slug ? `/${slug}` : '';
  const personalWork =
    slug === 'work' ||
    slug === 'founder' ||
    getLocalizedCases(language).some((entry) => entry.slug === slug);
  const socialImage = personalWork ? '/assets/portfolio/social.png' : '/opengraph-image';
  return {
    robots: {
      index: isPublishedPortfolioLanguage(language) && process.env.SEO_INDEXABLE === 'true',
      follow: isPublishedPortfolioLanguage(language) && process.env.SEO_INDEXABLE === 'true',
    },
    title: { absolute: `${title} · Bulachak` },
    description,
    alternates: {
      canonical: portfolioHref(language, suffix),
      languages: {
        ...Object.fromEntries(
          publishedPortfolioLanguages.map((available) => [
            available,
            portfolioHref(available, suffix),
          ]),
        ),
        'x-default': portfolioHref('en', suffix),
      },
      types: {
        'text/markdown': `/portfolio/content.md?lang=${language}&slug=${slug || 'home'}`,
      },
    },
    openGraph: {
      title,
      description,
      siteName: 'Bulachak',
      url: portfolioHref(language, suffix),
      locale: { en: 'en_US', ru: 'ru_RU', tt: 'tt_RU' }[language],
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  };
}
