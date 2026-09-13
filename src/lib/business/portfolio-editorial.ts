// @polsia:user-owned: public story and policy pages in all three languages.
import { portfolioStoryPages } from '@/lib/business/portfolio-pages';
import { portfolioPolicies } from '@/lib/business/portfolio-policies';
import type { PortfolioLanguage } from '@/lib/portfolio-locale';

export function getLocalizedPages(language: PortfolioLanguage) {
  return [...portfolioStoryPages[language], ...portfolioPolicies[language]];
}
