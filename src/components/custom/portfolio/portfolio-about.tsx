// @polsia:user-owned: a concise public introduction with links into the initiative stories.
'use client';

import { ArrowUpRight } from 'lucide-react';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Button } from '@/components/ui/button';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import type { StoryPage } from '@/lib/contracts/portfolio-pages';

export function PortfolioAbout({ page }: { page: StoryPage }) {
  const { language, t } = usePortfolioLocale();
  const section = (id: string) => {
    const match = page.sections.find((item) => item.id === id);
    if (!match) throw new Error(`Missing About section: ${id}`);
    return match;
  };
  const philosophy = section('philosophy');
  const alignment = section('alignment');
  const connections = section('connections');
  const comparisons = ['red-ocean', 'blue-ocean', 'emerald-pasture'].map(section);
  const initiatives = ['a4a', 'p4p', 'i4i'].map(section);

  return (
    <main
      id="portfolio-main"
      lang={language}
      className="portfolio bulachak-about"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="portfolio-container">
        <header className="bulachak-about-header">
          <p className="portfolio-eyebrow">{page.eyebrow}</p>
          <h1 itemProp="name">{page.title}</h1>
          <p itemProp="description" className="bulachak-about-lead">
            {page.description}
          </p>
        </header>

        <section
          className="bulachak-philosophy"
          id={philosophy.id}
          aria-labelledby="philosophy-title"
        >
          <div className="bulachak-philosophy-intro">
            <p className="portfolio-eyebrow">{t('The Philosophy', 'Философия', 'Фәлсәфә')}</p>
            <h2 id="philosophy-title">{philosophy.title}</h2>
            <div className="bulachak-philosophy-lead">
              {philosophy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="bulachak-comparison">
            {comparisons.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className={item.id === 'emerald-pasture' ? 'is-pasture' : undefined}
              >
                <h3>{item.title}</h3>
                <p className="bulachak-comparison-action">{item.paragraphs[0]}</p>
                <p>{item.paragraphs[1]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bulachak-alignment" id={alignment.id} aria-labelledby="alignment-title">
          <h2 id="alignment-title">{alignment.title}</h2>
          <p>{alignment.paragraphs[0]}</p>
        </section>

        <section
          className="bulachak-initiatives"
          id={connections.id}
          aria-labelledby="connections-title"
        >
          <h2 id="connections-title">{connections.title}</h2>
          <div className="bulachak-initiative-grid">
            {initiatives.map((item) => (
              <article key={item.id} id={item.id}>
                <p className="bulachak-initiative-code" aria-hidden="true">
                  {item.id.toUpperCase()}
                </p>
                <h3>{item.title}</h3>
                <p>{item.paragraphs[0]}</p>
                <Button asChild variant="link">
                  <Link
                    href={`/portfolio/${item.id}`}
                    aria-label={`${item.id.toUpperCase()}: ${t('Read the story', 'Прочитать историю', 'Тулырак уку')}`}
                  >
                    {t('Read the story', 'Прочитать историю', 'Тулырак уку')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <nav
          className="bulachak-about-next"
          aria-label={t('Explore Bulachak', 'Узнать больше о Bulachak', 'Bulachak белән танышу')}
        >
          <Button asChild variant="outline">
            <Link href="/portfolio/founder">
              {t('About the founder', 'Об основательнице', 'Нигез салучы турында')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/portfolio/work#work">
              {t('Explore the projects', 'Посмотреть проекты', 'Проектларны карау')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </nav>
      </div>
    </main>
  );
}
