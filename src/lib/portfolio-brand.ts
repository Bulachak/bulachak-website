// @polsia:user-owned: shared public identity for the general portfolio.
import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
export const portfolioBrand = {
  name: 'Bulachak',
  domain: 'bulachak.com',
  person: 'Kamilla Gafurzianova, OLY',
  contactEmail: 'kgafurzianova@gmail.com',
  contactHref: 'https://www.linkedin.com/in/kamilla-gafurzianova/',
  auditHref: '/audit',
  description: bulachakHomeCopy.en.description,
};

export const portfolioLegs = [
  {
    code: 'A4A',
    name: 'Agents 4 Athletes',
    names: {
      en: 'Agents 4 Athletes',
      ru: 'Агенты для спортсменов',
      tt: 'Спортчылар өчен агентлар',
    },
    descriptions: {
      en: 'Practical tools and support for athletes and sports organizations.',
      ru: 'Рабочие инструменты и поддержка для спортсменов и спортивных организаций.',
      tt: 'Спортчыларның һәм спорт оешмаларының көндәлек эшен җиңеләйтә торган кораллар һәм ярдәм.',
    },
    description:
      'Help athletes and sports leaders spend less time on admin and more on their work.',
  },
  {
    code: 'P4P',
    name: 'Parafencing 4 Progress',
    names: {
      en: 'Parafencing 4 Progress',
      ru: 'Парафехтование ради развития',
      tt: 'Үсеш өчен парафехтование',
    },
    descriptions: {
      en: 'Equipment, coaching, and opportunities to take part in adaptive fencing.',
      ru: 'Инвентарь, тренерская поддержка и возможности заниматься адаптивным фехтованием.',
      tt: 'Адаптив фехтование белән шөгыльләнү өчен җиһазлар һәм тренер ярдәме.',
    },
    description: 'Help more people take part in parafencing and get the support to keep going.',
  },
  {
    code: 'I4I',
    name: 'Immigrant 4 Immigrant',
    names: {
      en: 'Immigrant 4 Immigrant',
      ru: 'Иммигрант для иммигранта',
      tt: 'Иммигрант иммигрант өчен',
    },
    descriptions: {
      en: 'Community, immigrant kinship, and mutual support.',
      ru: 'Сообщество, близость иммигрантского опыта и взаимная поддержка.',
      tt: 'Иммигрантларны якынайту, аралашу һәм бер-берсенә ярдәм итү.',
    },
    description: 'Community, immigrant kinship, and mutual support.',
  },
] as const;
