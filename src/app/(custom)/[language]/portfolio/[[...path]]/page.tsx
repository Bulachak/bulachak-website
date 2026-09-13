// @polsia:user-owned: Russian and Tatar portfolio routes.
import { notFound, redirect } from 'next/navigation';
import { PortfolioCase } from '@/components/custom/portfolio/portfolio-case';
import { PortfolioHome } from '@/components/custom/portfolio/portfolio-home';
import { PortfolioStory } from '@/components/custom/portfolio/portfolio-story';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { PortfolioWork } from '@/components/custom/portfolio/portfolio-work';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import {
  isPortfolioLanguage,
  isPublishedPortfolioLanguage,
  portfolioHref,
} from '@/lib/portfolio-locale';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

type Props = {
  params: Promise<{ language: string; path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
async function resolveRoute({ params, searchParams }: Props) {
  const { language, path = [] } = await params;
  if (!isPortfolioLanguage(language) || language === 'en' || path.length > 1) notFound();
  const slug = path[0] ?? '';
  const page = getLocalizedPages(language).find((entry) => entry.slug === slug);
  if (
    slug &&
    slug !== 'work' &&
    !page &&
    !getLocalizedCases(language).some((item) => item.slug === slug)
  )
    notFound();
  if (!isPublishedPortfolioLanguage(language)) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(await searchParams)) {
      if (Array.isArray(value)) {
        for (const item of value) query.append(key, item);
      } else if (value !== undefined) query.set(key, value);
    }
    const suffix = query.size ? `?${query}` : '';
    redirect(portfolioHref('en', slug ? `/${slug}` : '') + suffix);
  }
  return { language, slug, page };
}
export async function generateMetadata(props: Props) {
  const { language, slug } = await resolveRoute(props);
  return portfolioMetadata(language, slug);
}
export default async function TranslatedPortfolioPage(props: Props) {
  const { language, slug, page } = await resolveRoute(props);
  return (
    <>
      <PortfolioStructuredData language={language} slug={slug} />
      {!slug ? (
        <PortfolioHome key={language} />
      ) : slug === 'work' ? (
        <PortfolioWork key={language} />
      ) : page ? (
        <PortfolioStory key={language + slug} page={page} />
      ) : (
        <PortfolioCase key={language + slug} slug={slug} />
      )}
    </>
  );
}
