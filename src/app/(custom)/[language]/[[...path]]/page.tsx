import { notFound, redirect } from 'next/navigation';
import { AuditView } from '@/components/custom/audit/audit-view';
import { IntakeView } from '@/components/custom/intake/intake-view';
import { PortfolioCase } from '@/components/custom/portfolio/portfolio-case';
import { PortfolioHome } from '@/components/custom/portfolio/portfolio-home';
import { PortfolioStory } from '@/components/custom/portfolio/portfolio-story';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { PortfolioWork } from '@/components/custom/portfolio/portfolio-work';
import { PricingView } from '@/components/custom/pricing/pricing-view';
import { WebinarView } from '@/components/custom/webinar/webinar-view';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import {
  isPortfolioLanguage,
  isPublishedPortfolioLanguage,
  type PortfolioLanguage,
  portfolioHref,
} from '@/lib/portfolio-locale';
import { isActionRouteSlug, portfolioMetadata } from '@/lib/portfolio-metadata';

type Props = {
  params: Promise<{ language: string; path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function buildQuerySuffix(
  searchParamsPromise: Promise<Record<string, string | string[] | undefined>>,
) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParamsPromise)) {
    if (Array.isArray(value)) {
      for (const item of value) query.append(key, item);
    } else if (value !== undefined) {
      query.set(key, value);
    }
  }
  return query.size ? `?${query}` : '';
}

async function resolveRoute({ params, searchParams }: Props): Promise<{
  language: PortfolioLanguage;
  slug: string;
  page: ReturnType<typeof getLocalizedPages>[number] | undefined;
}> {
  const { language: firstSegment, path = [] } = await params;

  // Case 1: First segment is a recognized language code ('ru', 'tt', or 'en')
  if (isPortfolioLanguage(firstSegment)) {
    if (firstSegment === 'en') {
      notFound();
    }

    // Legacy `/ru/portfolio/...` or `/tt/portfolio/...` -> redirect to flattened `/ru/...` or `/tt/...`
    if (path[0] === 'portfolio') {
      const rest = path.slice(1).join('/');
      const suffix = await buildQuerySuffix(searchParams);
      redirect(portfolioHref(firstSegment, rest ? `/${rest}` : '') + suffix);
    }

    const slug = path.join('/');
    const page =
      path.length === 1
        ? getLocalizedPages(firstSegment).find((entry) => entry.slug === slug)
        : undefined;
    const isCase =
      path.length === 1 && getLocalizedCases(firstSegment).some((item) => item.slug === slug);
    const isAction = isActionRouteSlug(slug);

    if (slug && slug !== 'work' && !page && !isCase && !isAction) {
      notFound();
    }

    if (!isPublishedPortfolioLanguage(firstSegment)) {
      const suffix = await buildQuerySuffix(searchParams);
      redirect(portfolioHref('en', slug ? `/${slug}` : '') + suffix);
    }

    return { language: firstSegment, slug, page };
  }

  // Case 2: Flattened English root route (`/about`, `/work`, `/founder`, `/a4a`, `/p4p`, `/i4i`, `/privacy`, `/terms`, `/[case-slug]`)
  if (path.length === 0) {
    const enSlug = firstSegment;
    const page = getLocalizedPages('en').find((entry) => entry.slug === enSlug);
    const isCase = getLocalizedCases('en').some((item) => item.slug === enSlug);

    if (enSlug === 'work' || page || isCase) {
      return { language: 'en', slug: enSlug, page };
    }
  }

  notFound();
}

export async function generateMetadata(props: Props) {
  const { language, slug } = await resolveRoute(props);
  return portfolioMetadata(language, slug);
}

export default async function UnifiedPortfolioAndLocalePage(props: Props) {
  const { language, slug, page } = await resolveRoute(props);

  return (
    <>
      <PortfolioStructuredData language={language} slug={slug} />
      {!slug ? (
        <PortfolioHome key={language} />
      ) : slug === 'work' ? (
        <PortfolioWork key={language} />
      ) : slug === 'audit' ? (
        <AuditView key={language} />
      ) : slug === 'pricing' ? (
        <PricingView key={language} />
      ) : slug === 'webinar' ? (
        <WebinarView key={language} />
      ) : slug === 'intake/athlete' ? (
        <IntakeView key={`${language}-athlete`} track="athlete" />
      ) : slug === 'intake/federation' ? (
        <IntakeView key={`${language}-federation`} track="federation" />
      ) : page ? (
        <PortfolioStory key={language + slug} page={page} />
      ) : (
        <PortfolioCase key={language + slug} slug={slug} />
      )}
    </>
  );
}
