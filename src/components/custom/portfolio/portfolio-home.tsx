// @polsia:user-owned: Bulachak's shared vision and three-branch homepage.
'use client';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Button } from '@/components/ui/button';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { portfolioLegs } from '@/lib/portfolio-brand';
import { portfolioHref } from '@/lib/portfolio-locale';

export function PortfolioHome() {
  const { language, t } = usePortfolioLocale();
  const copy = bulachakHomeCopy[language];
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (['q', 'category', 'all'].some((key) => params.has(key))) {
      router.replace(`${portfolioHref(language, '/work')}?${params.toString()}#work`);
    }
  }, [language, router]);

  const featuredCases = getLocalizedCases(language)
    .filter((item) => item.featured)
    .slice(0, 3);

  return (
    <main id="portfolio-main" lang={language} className="portfolio bulachak-home">
      <div className="portfolio-container">
        <header className="bulachak-home-hero">
          <h1>{copy.title}</h1>
          <div className="bulachak-home-intro">
            <p className="portfolio-eyebrow">{copy.eyebrow}</p>
            <p className="bulachak-home-description">{copy.description}</p>
            <div className="bulachak-home-actions">
              <Button asChild>
                <Link href="#branches">
                  {t('Explore the three branches', 'Три направления', 'Өч юнәлешне карау')}
                  <ArrowDown size={17} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/portfolio/about">
                  {t('About Bulachak', 'О Bulachak', 'Bulachak турында')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section id="branches" className="bulachak-home-branches" aria-labelledby="branches-title">
          <div className="bulachak-home-heading">
            <h2 id="branches-title">{copy.branchesTitle}</h2>
            <p>{copy.branchesIntro}</p>
          </div>
          <div className="bulachak-branch-cards">
            {portfolioLegs.map((leg) => {
              const branch = copy.branches[leg.code];
              return (
                <article
                  className="bulachak-branch-card"
                  key={leg.code}
                  id={`leg-${leg.code.toLowerCase()}`}
                >
                  <p className="portfolio-eyebrow">{branch.purpose}</p>
                  <p className="bulachak-branch-code" aria-hidden="true">
                    {leg.code}
                  </p>
                  <h3>{leg.names[language]}</h3>
                  <p className="bulachak-branch-role">{branch.role}</p>
                  <p className="bulachak-branch-description">{branch.description}</p>
                  {branch.pledge ? <p className="bulachak-branch-pledge">{branch.pledge}</p> : null}
                  <Button asChild variant="link">
                    <Link href={`/portfolio/${leg.code.toLowerCase()}`}>
                      {branch.linkLabel}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>

          {copy.reciprocitySteps?.length ? (
            <section className="bulachak-reciprocity" aria-labelledby="home-reciprocity-title">
              <div className="bulachak-reciprocity-header">
                <p className="portfolio-eyebrow">
                  {t('Co-opetition in practice', 'Коопетиция на практике', 'Гамәлдәге коопетиция')}
                </p>
                <h3 id="home-reciprocity-title">{copy.reciprocityTitle}</h3>
                <p>{copy.reciprocityIntro}</p>
              </div>
              <div className="bulachak-reciprocity-grid">
                {copy.reciprocitySteps.map((step) => (
                  <div key={step.label} className="bulachak-reciprocity-step">
                    <div className="bulachak-reciprocity-step-tag">
                      <span>{step.from}</span>
                      <span aria-hidden="true">→</span>
                      <span>{step.to}</span>
                    </div>
                    <h4>{step.label}</h4>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </section>

        <section
          id="philosophy"
          className="bulachak-home-philosophy-section"
          aria-labelledby="home-philosophy-title"
        >
          <div className="bulachak-home-philosophy">
            <div>
              <p className="portfolio-eyebrow">{copy.philosophyEyebrow}</p>
              <h2 id="home-philosophy-title">{copy.philosophyTitle}</h2>
            </div>
            <div>
              <p>{copy.philosophyText}</p>
              <p className="bulachak-home-alignment">{copy.alignment}</p>
              <Button asChild variant="link">
                <Link href="/portfolio/about">
                  {copy.philosophyLink}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {copy.comparisons?.length ? (
            <div className="bulachak-comparison mt-8">
              {copy.comparisons.map((item) => (
                <article
                  key={item.id}
                  id={`home-${item.id}`}
                  className={item.id === 'emerald-pasture' ? 'is-pasture' : undefined}
                >
                  <h3>{item.title}</h3>
                  <p className="bulachak-comparison-action">{item.action}</p>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          ) : null}
        </section>

        <section id="work" className="bulachak-home-work-section" aria-labelledby="home-work-title">
          <div className="bulachak-home-work">
            <h2 id="home-work-title">{copy.workTitle}</h2>
            <div>
              <p>{copy.workText}</p>
              <div className="bulachak-home-actions">
                <Button asChild variant="outline">
                  <Link href="/portfolio/work">
                    {copy.workLink}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="link">
                  <Link href="/portfolio/founder">
                    {copy.founderLink}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {featuredCases.length > 0 ? (
            <div className="bulachak-home-cases-wrap">
              <div className="bulachak-home-cases-header">
                <p className="portfolio-eyebrow">
                  {t('Delivered Work', 'Реализованные проекты', 'Гамәлгә ашырылган проектлар')}
                </p>
                <h3>{copy.featuredTitle}</h3>
                <p>{copy.featuredSubtitle}</p>
              </div>
              <div className="bulachak-home-cases-grid">
                {featuredCases.map((cs) => (
                  <article key={cs.slug} className="bulachak-home-case-card">
                    <div className="bulachak-home-case-meta">
                      <span className="bulachak-home-case-category">{cs.category}</span>
                      <span className="bulachak-home-case-legs">{cs.legs.join(' · ')}</span>
                    </div>
                    <h3>{cs.title}</h3>
                    <p className="bulachak-home-case-subtitle">{cs.subtitle}</p>
                    <div className="bulachak-home-case-highlight">
                      <span className="bulachak-home-case-metric">{cs.highlight}</span>
                    </div>
                    <p className="bulachak-home-case-summary">{cs.summary}</p>
                    <Button asChild variant="link" className="bulachak-home-case-link">
                      <Link href={`/portfolio/${cs.slug}`}>
                        {t('Read case study', 'Читать кейс', 'Кейсны уку')}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section id="connect" className="bulachak-home-connect" aria-labelledby="connect-title">
          <div className="bulachak-home-connect-inner">
            <p className="portfolio-eyebrow">
              {t('Collaboration & Intake', 'Сотрудничество и анкета', 'Хезмәттәшлек һәм гариза')}
            </p>
            <h2 id="connect-title">{copy.contactTitle}</h2>
            <p className="bulachak-home-connect-subtitle">{copy.contactSubtitle}</p>
            <div className="bulachak-home-connect-actions">
              <Button asChild size="lg" className="shadow-brand">
                <Link href="/intake/federation">
                  {copy.contactActionBriefing}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/intake/athlete">
                  {copy.contactActionAthlete}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/portfolio/about">
                  {copy.contactActionAbout}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
