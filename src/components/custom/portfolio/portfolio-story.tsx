// @polsia:user-owned: readable philosophy, initiative, founder, and policy pages.
'use client';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { FounderCredentials } from '@/components/custom/portfolio/founder-credentials';
import { PortfolioAbout } from '@/components/custom/portfolio/portfolio-about';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Button } from '@/components/ui/button';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import type { StoryPage } from '@/lib/contracts/portfolio-pages';
import { portfolioBrand, portfolioLegs } from '@/lib/portfolio-brand';

export function PortfolioStory({ page }: { page: StoryPage }) {
  const { language, t } = usePortfolioLocale();
  const founder = page.slug === 'founder';
  const policy = page.slug === 'privacy' || page.slug === 'terms';
  if (page.slug === 'about') return <PortfolioAbout page={page} />;
  return (
    <main
      id="portfolio-main"
      lang={language}
      className="portfolio portfolio-story"
      itemScope
      itemType={founder ? 'https://schema.org/ProfilePage' : 'https://schema.org/WebPage'}
    >
      <div className="portfolio-container">
        <Button asChild variant="ghost" className="mb-7 pl-0">
          <Link href="/portfolio">
            <ArrowLeft size={16} aria-hidden="true" />
            {t('Back to Bulachak', 'На главную Bulachak', 'Bulachak баш битенә')}
          </Link>
        </Button>
        <header className={founder ? 'story-header founder-header' : 'story-header'}>
          <p className="portfolio-eyebrow">{page.eyebrow}</p>
          <h1 itemProp="name">{page.title}</h1>
          <p itemProp="description">{page.description}</p>
        </header>
        <div className="story-layout">
          <nav
            className={founder ? 'story-outline founder-outline' : 'story-outline'}
            aria-label={t('On this page', 'На этой странице', 'Бу биттә')}
          >
            {founder && (
              <Image
                className="founder-portrait"
                src="/assets/portfolio/kamilla.webp"
                alt={t('Kamilla Gafurzianova', 'Камилла Гафурзянова', 'Камилла Гафурзянова')}
                width={208}
                height={208}
                priority
              />
            )}
            <div className="story-outline-links">
              {page.sections.map((section) => (
                <Link key={section.id} href={`#${section.id}`}>
                  {section.title}
                </Link>
              ))}
              {founder && (
                <Link href="#credentials">
                  {t(
                    'Certified digital expertise',
                    'Подтверждённая цифровая экспертиза',
                    'Сертификатлар белән расланган цифрлы осталык',
                  )}
                </Link>
              )}
            </div>
          </nav>
          <article className="story-body">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <div className="story-next">
              {page.relatedLeg && (
                <Button asChild>
                  <Link href="/portfolio/about">
                    {t('The Bulachak philosophy', 'Философия Bulachak', 'Bulachak фәлсәфәсе')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              )}
              {(founder || policy) && (
                <Button asChild variant="outline">
                  <Link href={portfolioBrand.contactHref} target="_blank" rel="noopener noreferrer">
                    {t('Contact on LinkedIn', 'Связаться в LinkedIn', 'LinkedIn аша языгыз')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              )}
              {!policy && (
                <Button asChild variant="outline">
                  <Link
                    href={
                      page.relatedLeg
                        ? `/portfolio/work?q=${page.relatedLeg}#work`
                        : '/portfolio/work#work'
                    }
                  >
                    {page.relatedLeg
                      ? t(
                          'Related founder work',
                          'Связанные работы основательницы',
                          'Нигез салучының бу өлкәдәге эшләре',
                        )
                      : t('All projects', 'Все проекты', 'Барлык проектлар')}
                  </Link>
                </Button>
              )}
            </div>
          </article>
        </div>
        {!policy && (
          <section
            className="portfolio-legs"
            aria-label={t('The three branches', 'Три направления', 'Өч юнәлеш')}
          >
            {portfolioLegs.map((leg) => (
              <article key={leg.code}>
                <span>{leg.code}</span>
                <h3>{leg.names[language]}</h3>
                <p>{leg.descriptions[language]}</p>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/portfolio/${leg.code.toLowerCase()}`}>
                    {t('Read the story', 'Прочитать историю', 'Тулырак уку')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            ))}
          </section>
        )}
      </div>
      {founder && <FounderCredentials />}
    </main>
  );
}
