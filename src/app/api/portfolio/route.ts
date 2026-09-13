// @polsia:user-owned — read-only, public editorial catalogue.
import 'server-only';
import { NextResponse } from 'next/server';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { PortfolioList } from '@/lib/contracts/portfolio';
import {
  isPortfolioLanguage,
  isPublishedPortfolioLanguage,
  publishedPortfolioLanguages,
} from '@/lib/portfolio-locale';

export async function GET(request: Request) {
  const language = new URL(request.url).searchParams.get('lang') ?? 'en';
  if (!isPortfolioLanguage(language))
    return NextResponse.json(
      { errors: { lang: `Available languages: ${publishedPortfolioLanguages.join(', ')}` } },
      { status: 400 },
    );
  if (!isPublishedPortfolioLanguage(language))
    return NextResponse.json(
      { errors: { lang: 'This language edition is not currently published.' } },
      { status: 404, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } },
    );
  return NextResponse.json(PortfolioList.parse({ items: getLocalizedCases(language) }), {
    headers: { 'Content-Language': language },
  });
}
