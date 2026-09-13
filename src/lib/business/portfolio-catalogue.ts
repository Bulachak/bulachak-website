// @polsia:user-owned: one complete editorial catalogue per language.
import { caseStudies } from '@/lib/business/portfolio-content';
import { russianCaseCopy } from '@/lib/business/portfolio-content.ru';
import { tatarCaseCopy } from '@/lib/business/portfolio-content.tt';
import type { CaseStudy } from '@/lib/contracts/portfolio';
import type { PortfolioLanguage } from '@/lib/portfolio-locale';

export function getLocalizedCases(language: PortfolioLanguage): CaseStudy[] {
  if (language === 'en') return caseStudies;
  const copy = language === 'ru' ? russianCaseCopy : tatarCaseCopy;
  return caseStudies.map((item) => {
    if (!copy[item.slug])
      throw new Error(`Missing portfolio translation: ${language}/${item.slug}`);
    return { ...item, ...copy[item.slug] };
  });
}
