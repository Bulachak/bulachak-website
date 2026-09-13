// @polsia:user-owned: language follows the page URL.
'use client';
import { usePathname } from 'next/navigation';
import {
  localizePortfolioHref,
  publishedLanguageFromPath,
  translate,
} from '@/lib/portfolio-locale';

export function usePortfolioLocale() {
  const pathname = usePathname();
  const language = publishedLanguageFromPath(pathname);
  return {
    language,
    pathname,
    t: (en: string, ru: string, tt: string) => translate(language, en, ru, tt),
    href: (path: string) => localizePortfolioHref(path, language),
  };
}
