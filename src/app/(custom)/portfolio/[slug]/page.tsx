// @polsia:user-owned: stable English story and case-study routes.
import { notFound } from 'next/navigation';
import { PortfolioCase } from '@/components/custom/portfolio/portfolio-case';
import { PortfolioStory } from '@/components/custom/portfolio/portfolio-story';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { PortfolioWork } from '@/components/custom/portfolio/portfolio-work';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return portfolioMetadata('en', (await params).slug);
}
export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getLocalizedPages('en').find((entry) => entry.slug === slug);
  if (slug !== 'work' && !page && !getLocalizedCases('en').some((item) => item.slug === slug))
    notFound();
  return (
    <>
      <PortfolioStructuredData language="en" slug={slug} />
      {slug === 'work' ? (
        <PortfolioWork />
      ) : page ? (
        <PortfolioStory key={slug} page={page} />
      ) : (
        <PortfolioCase key={slug} slug={slug} />
      )}
    </>
  );
}
