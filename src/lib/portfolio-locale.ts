// @polsia:user-owned: supported translations, publication status, and stable URLs.
export const portfolioLanguages = ['en', 'ru', 'tt'] as const;
export type PortfolioLanguage = (typeof portfolioLanguages)[number];
// Kamilla requested all three editions after the Tatar editorial revision.
export const publishedPortfolioLanguages: readonly PortfolioLanguage[] = ['en', 'ru', 'tt'];
export const portfolioLanguageNames: Record<PortfolioLanguage, string> = {
  en: 'English',
  ru: 'Русский',
  tt: 'Татарча',
};
export function isPublishedPortfolioLanguage(value: string): value is PortfolioLanguage {
  return publishedPortfolioLanguages.some((language) => language === value);
}
export function isPortfolioLanguage(value: string): value is PortfolioLanguage {
  return portfolioLanguages.some((language) => language === value);
}
export function languageFromPath(path: string): PortfolioLanguage {
  const prefix = path.split('/')[1];
  return prefix === 'ru' || prefix === 'tt' ? prefix : 'en';
}
export function publishedLanguageFromPath(path: string): PortfolioLanguage {
  const language = languageFromPath(path);
  return isPublishedPortfolioLanguage(language) ? language : 'en';
}
export function isPortfolioPath(path: string) {
  return path === '/' || /^\/(?:ru\/|tt\/)?portfolio(?:\/|$)/.test(path);
}
export function portfolioHref(language: PortfolioLanguage, suffix = '') {
  return `${language === 'en' ? '' : `/${language}`}/portfolio${suffix}`;
}
export function localizePortfolioHref(href: string, language: PortfolioLanguage) {
  if (href === '/' || href === '') {
    return language === 'en' ? '/' : `/${language}/portfolio`;
  }
  return href.replace(/^\/(?:ru\/|tt\/)?portfolio(?=\/|\?|#|$)/, portfolioHref(language));
}
export function translate(language: PortfolioLanguage, en: string, ru: string, tt: string) {
  return { en, ru, tt }[language];
}
export const categoryNames = {
  en: [
    'All work',
    'Operations & automation',
    'Web & product',
    'Strategy & storytelling',
    'Community & access',
  ],
  ru: [
    'Все проекты',
    'Процессы и автоматизация',
    'Сайты и продукты',
    'Стратегия и коммуникация',
    'Сообщество и доступность',
  ],
  tt: [
    'Барлык проектлар',
    'Оештыру һәм автоматлаштыру',
    'Сайтлар һәм кушымталар',
    'Стратегия һәм таныту',
    'Аралашу һәм ярдәм',
  ],
} as const;
export function categoryName(value: string, language: PortfolioLanguage) {
  const index = (categoryNames.en as readonly string[]).indexOf(value);
  return index < 0 ? value : categoryNames[language][index];
}
export function statusName(value: string, language: PortfolioLanguage) {
  const statuses: Record<string, readonly [string, string, string]> = {
    'Delivered work': ['Completed work', 'Выполненная работа', 'Башкарылган эш'],
    'Live product': ['Live product', 'Работающий продукт', 'Эшли торган продукт'],
    Prototype: ['Prototype', 'Прототип', 'Прототип'],
    'Strategy & research': [
      'Strategy & research',
      'Стратегия и исследования',
      'Стратегия һәм тикшеренүләр',
    ],
  };
  return statuses[value]?.[portfolioLanguages.indexOf(language)] ?? value;
}
