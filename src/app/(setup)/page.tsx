// @polsia:user-owned — Bulachak umbrella landing page served at /.
import type { Metadata } from 'next';
import { PortfolioHome } from '@/components/custom/portfolio/portfolio-home';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { portfolioMetadata } from '@/lib/portfolio-metadata';

export const metadata: Metadata = {
  ...portfolioMetadata('en'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ru: '/ru/portfolio',
      tt: '/tt/portfolio',
      'x-default': '/',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <PortfolioStructuredData language="en" />
      <PortfolioHome />
    </>
  );
}
