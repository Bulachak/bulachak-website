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

export const actionRouteSlugs = [
  'pricing',
  'audit',
  'intake/athlete',
  'intake/federation',
  'webinar',
] as const;

export type ActionRouteSlug = (typeof actionRouteSlugs)[number];

export function isActionRouteSlug(value: string): value is ActionRouteSlug {
  return (actionRouteSlugs as readonly string[]).includes(value);
}

export function actionPageMetadataCopy(language: PortfolioLanguage, slug: ActionRouteSlug) {
  switch (slug) {
    case 'pricing':
      return {
        title: translate(
          language,
          'Pricing & Engagement Pillars',
          'Тарифы и форматы работы A4A',
          'A4A хезмәт форматлары һәм бәяләр',
        ),
        description: translate(
          language,
          'Three productized A4A engagement pillars: Turnkey Sport Ops Sprint, Seasonal Camp Value-Share, and Sponsored Cohort Accelerator, backed by a 10-hour operational relief guarantee and a 4% pledge to Parafencing 4 Progress (P4P).',
          'Три продуктовых формата A4A без абонентской платы: 21-дневный спринт под ключ, запуск сезонных лагерей и когортный акселератор для федераций с гарантией экономии 10 часов в неделю и отчислением 4% в P4P.',
          'Абонент түләүсез өч A4A эш форматы: 21 көнлек әзер спринт, сезонлы лагерьларны башлау һәм федерацияләр өчен когорта акселераторы, атнага 10 сәгать вакытны янга калдыру гарантиясе һәм P4P файдасына 4% күчерү белән.',
        ),
      };
    case 'audit':
      return {
        title: translate(
          language,
          '15-Minute Operational Leak Audit',
          '15-минутный аудит операционных потерь',
          '15 минутлык операцион югалтулар аудиты',
        ),
        description: translate(
          language,
          'Identify where your sports academy or venture loses 10 to 15+ hours each week to administrative drag, leaky inquiry forms, and manual billing.',
          'Определите, где ваша спортивная академия или проект теряет 10–15 часов в неделю на ручную переписку, сбор оплат и бумажные согласия.',
          'Спорт академиягез яки проектыгыз атна саен кулдан язышу, түләүләр җыю һәм кәгазь гаризалар аркасында 10–15 сәгать вакытын кайда югалтканын ачыклагыз.',
        ),
      };
    case 'intake/athlete':
      return {
        title: translate(
          language,
          'Athlete & Coach Venture Intake',
          'Анкета для спортсменов и тренеров',
          'Спортчылар һәм тренерлар өчен анкета',
        ),
        description: translate(
          language,
          'A 20-minute operational intake for athletes, coaches, and sports operators launching or scaling an academy, seasonal camp, or training studio with Agents 4 Athletes (A4A).',
          'Операционная анкета для спортсменов, тренеров и руководителей клубов, запускающих или масштабирующих академию, сезонный лагерь или студию вместе с A4A.',
          'A4A белән берлектә спорт академиясен, сезонлы лагерьны яки күнегүләр студиясен башлап җибәрүче яки үстерүче спортчылар, тренерлар һәм клуб җитәкчеләре өчен анкета.',
        ),
      };
    case 'intake/federation':
      return {
        title: translate(
          language,
          'Federation & Adaptive Program Briefing',
          'Брифинг для федераций и программ парафехтования',
          'Федерацияләр һәм парафехтование программалары өчен брифинг',
        ),
        description: translate(
          language,
          'A 30-minute scoping briefing with Kamilla Gafurzianova, OLY, for sports federations, municipal departments, and adaptive sport leaders ahead of LA28.',
          '30-минутный брифинг с Камиллой Гафурзяновой, OLY для спортивных федераций, муниципальных департаментов и руководителей адаптивных программ к циклу LA28.',
          'LA28 циклы алдыннан спорт федерацияләре, муниципаль бүлекләр һәм адаптив спорт җитәкчеләре өчен Камилла Гафурзянова, OLY белән 30 минутлык брифинг.',
        ),
      };
    case 'webinar':
      return {
        title: translate(
          language,
          'Operational Masterclass & Workshop',
          'Операционный практикум для спортивных академий и малого бизнеса',
          'Спорт академияләре һәм кече бизнес өчен оештыру остаханәсе',
        ),
        description: translate(
          language,
          'Practical 60-minute operational workshop with Anvar Tuykin and Kamilla Gafurzianova, OLY: reclaim 10–15 hours a week and deploy an AI-assisted back office without bloated overhead.',
          'Практический онлайн-воркшоп Анвара Туйкина и Камиллы Гафурзяновой, OLY: как освободить 10–15 часов в неделю, автоматизировать запись и навести порядок в процессах.',
          'Анвар Туйкин һәм Камилла Гафурзянова, OLY белән гамәли онлайн-остаханә: атнага 10–15 сәгать вакытны ничек бушатырга, язылуны автоматлаштырырга һәм эш тәртибен җайга салырга.',
        ),
      };
  }
}

export function portfolioMetadata(language: PortfolioLanguage, slug = ''): Metadata {
  const home = bulachakHomeCopy[language];
  const directory = portfolioWorkMetadata(language);
  const actionCopy = isActionRouteSlug(slug) ? actionPageMetadataCopy(language, slug) : undefined;
  const item =
    getLocalizedPages(language).find((page) => page.slug === slug) ??
    getLocalizedCases(language).find((entry) => entry.slug === slug);
  const title = actionCopy
    ? actionCopy.title
    : slug === 'work'
      ? directory.title
      : (item?.title ?? home.title);
  const description =
    actionCopy?.description ??
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
      ...(!actionCopy
        ? {
            types: {
              'text/markdown': `/portfolio/content.md?lang=${language}&slug=${slug || 'home'}`,
            },
          }
        : {}),
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
