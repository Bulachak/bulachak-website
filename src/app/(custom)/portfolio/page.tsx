// @polsia:user-owned: English portfolio shell and public metadata.
import { PortfolioHome } from '@/components/custom/portfolio/portfolio-home';
import { PortfolioStructuredData } from '@/components/custom/portfolio/portfolio-structured-data';
import { portfolioMetadata } from '@/lib/portfolio-metadata';
export const metadata = portfolioMetadata('en');
export default function PortfolioPage() {
  return (
    <>
      <PortfolioStructuredData language="en" />
      <PortfolioHome />
    </>
  );
}
