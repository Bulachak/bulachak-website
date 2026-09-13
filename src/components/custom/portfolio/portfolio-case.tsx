// @polsia:user-owned: reusable case-study reading experience.
'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CaseVisual, caseArtifacts } from '@/components/custom/portfolio/case-visual';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { usePortfolio } from '@/hooks/use-portfolio';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { portfolioBrand, portfolioLegs } from '@/lib/portfolio-brand';
import {
  categoryName,
  localizePortfolioHref,
  portfolioHref,
  statusName,
} from '@/lib/portfolio-locale';

export function PortfolioCase({ slug }: { slug: string }) {
  const { language, t } = usePortfolioLocale();
  const { items, loading, error, retry } = usePortfolio();
  const [backHref, setBackHref] = useState('/portfolio/work#work');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setBackHref(portfolioHref(language, '/work#work'));
    try {
      const saved = sessionStorage.getItem('bulachak-portfolio-return');
      if (saved && /^\/(?:ru\/|tt\/)?portfolio(?:\/work)?(?:\?|#|$)/.test(saved))
        setBackHref(
          localizePortfolioHref(saved.replace(/(\/portfolio)(?=\?|#|$)/, '$1/work'), language),
        );
    } catch {
      /* The catalogue is still reachable when browser storage is unavailable. */
    }
  }, [language]);
  const item = items.find((entry) => entry.slug === slug);
  const related = items
    .filter(
      (entry) =>
        entry.slug !== slug &&
        (entry.category === item?.category || entry.legs.some((leg) => item?.legs.includes(leg))),
    )
    .slice(0, 3);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + portfolioHref(language, `/${slug}`),
      );
      setCopied(true);
      toast.success(
        t('Case study link copied', 'Ссылка на кейс скопирована', 'Проектка сылтама күчерелде'),
      );
    } catch {
      toast.error(
        t(
          'Could not copy the link. Copy the address from your browser.',
          'Не удалось скопировать ссылку. Скопируйте адрес из браузера.',
          'Сылтаманы күчереп булмады. Адресны браузердан күчерегез.',
        ),
      );
    }
  }

  if (loading)
    return (
      <main
        id="portfolio-main"
        className="portfolio portfolio-container portfolio-case-loading"
        aria-label={t('Loading case study', 'Загрузка кейса', 'Проект турында мәгълүмат йөкләнә')}
      >
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-12 h-28 w-full max-w-3xl" />
        <Skeleton className="mt-8 h-64 w-full" />
      </main>
    );
  if (error || !item)
    return (
      <main id="portfolio-main" className="portfolio portfolio-container portfolio-empty">
        <h1>
          {t(
            'This case study is unavailable.',
            'Этот кейс недоступен.',
            'Бу проектның бите ачылмый.',
          )}
        </h1>
        <p>
          {t(
            'Try again or browse the other projects.',
            'Попробуйте ещё раз или посмотрите другие проекты.',
            'Яңадан карагыз яки башка проектны ачыгыз.',
          )}
        </p>
        {error && <Button onClick={retry}>{t('Try again', 'Повторить', 'Яңадан карау')}</Button>}
        <Button asChild variant="outline">
          <Link href="/portfolio/work#work">
            {t('All projects', 'Все проекты', 'Барлык проектлар')}
          </Link>
        </Button>
      </main>
    );
  const wordCount = [
    item.summary,
    ...item.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])]),
  ]
    .join(' ')
    .split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const hasArtifact = Boolean(caseArtifacts[item.slug]);

  return (
    <main
      id="portfolio-main"
      lang={language}
      className="portfolio portfolio-case"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className="portfolio-container">
        <div className="case-toolbar">
          <Button asChild variant="ghost" className="pl-0">
            <Link href={backHref}>
              <ArrowLeft size={16} aria-hidden="true" />
              {t('Back to the work', 'К списку проектов', 'Проектлар исемлегенә')}
            </Link>
          </Button>
          <div>
            <Button variant="ghost" size="sm" onClick={copyLink}>
              {copied ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              {copied
                ? t('Link copied', 'Ссылка скопирована', 'Сылтама күчерелде')
                : t('Copy link', 'Копировать ссылку', 'Сылтаманы күчерү')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.print()}>
              <Printer size={15} aria-hidden="true" />
              {t('Print', 'Печать', 'Бастыру')}
            </Button>
          </div>
        </div>
        <header className="case-heading">
          <p className="portfolio-eyebrow">
            {categoryName(item.category, language)} ·{' '}
            <span className="whitespace-nowrap">
              {readingTime} {t('MIN READ', 'МИН. ЧТЕНИЯ', 'МИНУТТА УКЫЛА')}
            </span>
          </p>
          <h1 itemProp="name">{item.title}</h1>
          <p className="case-subtitle">{item.subtitle}</p>
          <p className="case-summary" itemProp="description">
            {item.summary}
          </p>
          <div className="case-facts">
            <div>
              <span>{t('MY ROLE', 'МОЯ РОЛЬ', 'МИНЕМ КАТНАШЫМ')}</span>
              <p>{item.role}</p>
            </div>
            <div>
              <span>{t('WORK STATUS', 'СТАТУС РАБОТЫ', 'ЭШНЕҢ ХӘЛЕ')}</span>
              <Badge variant="outline">{statusName(item.status, language)}</Badge>
            </div>
            <div>
              <span>{t('RELATED BRANCHES', 'СВЯЗАННЫЕ НАПРАВЛЕНИЯ', 'БӘЙЛЕ ЮНӘЛЕШЛӘР')}</span>
              <div className="flex flex-wrap gap-2">
                {item.legs.map((leg) => (
                  <Link key={leg} href={`/portfolio/${leg.toLowerCase()}`}>
                    <Badge variant="outline">{leg}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>
        {hasArtifact && (
          <figure className="case-hero-artifact">
            <CaseVisual item={item} large />
            <figcaption>
              {t(
                'An image from the project. The case study below explains the work and its results.',
                'Изображение из проекта. Ниже описаны работа и её результаты.',
                'Проекттан алынган рәсем. Эшнең барышы һәм нәтиҗәләре түбәндә аңлатыла.',
              )}
            </figcaption>
          </figure>
        )}
        <div className="case-reading-layout">
          <aside className="case-outline">
            <nav aria-label={t('On this page', 'На этой странице', 'Бу биттә')}>
              <p className="portfolio-eyebrow">{t('IN THIS CASE', 'В ЭТОМ КЕЙСЕ', 'БУ БИТТӘ')}</p>
              {item.sections.map((section, index) => (
                <Link key={section.id} href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </Link>
              ))}
              <Link href="#evidence">
                <span>↗</span>
                {t(
                  'Sources & project notes',
                  'Источники и примечания',
                  'Чыганаклар һәм искәрмәләр',
                )}
              </Link>
            </nav>
            <div className="case-sidebar-note">
              <span className="portfolio-eyebrow">{t('AT A GLANCE', 'КРАТКО', 'КЫСКАЧА')}</span>
              <p>{item.highlight}</p>
            </div>
          </aside>
          <article className="case-body">
            {item.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section id="evidence" className="case-evidence">
              <p className="portfolio-eyebrow">
                {t(
                  'SOURCES & PROJECT NOTES',
                  'ИСТОЧНИКИ И ПРИМЕЧАНИЯ',
                  'ЧЫГАНАКЛАР ҺӘМ ИСКӘРМӘЛӘР',
                )}
              </p>
              <h2>{t('A note on the results.', 'О результатах.', 'Нәтиҗәләр турында.')}</h2>
              <p>{item.evidenceNote}</p>
              {item.links.length > 0 && (
                <div className="case-evidence-links">
                  {item.links.map((link) => (
                    <Button key={link.url} asChild variant="outline">
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
              <p className="case-evidence-caption">
                {t(
                  'This account draws on my project records. I’ve linked the materials I can share publicly.',
                  'Описание основано на моих материалах проекта. Я добавила ссылки на то, чем могу поделиться открыто.',
                  'Бу тасвирламаны проект материалларыма таянып яздым. Башкалар белән уртаклашырга мөмкин булганнарына сылтамалар бирдем.',
                )}
              </p>
            </section>
            {item.legs.length > 0 && (
              <section className="case-connections">
                <p className="portfolio-eyebrow">
                  {t('RELATED WORK', 'СВЯЗЬ С ДРУГИМИ ПРОЕКТАМИ', 'БӘЙЛЕ ПРОЕКТЛАР')}
                </p>
                <h2>
                  {t(
                    'How it connects to Bulachak.',
                    'Связь с Булачак.',
                    'Булачак белән бәйләнеше.',
                  )}
                </h2>
                {portfolioLegs
                  .filter((leg) => item.legs.includes(leg.code))
                  .map((leg) => (
                    <p key={leg.code}>
                      <strong>
                        {leg.code} · {leg.names[language]}.
                      </strong>{' '}
                      {item.legNotes?.[leg.code] ?? leg.descriptions[language]}
                    </p>
                  ))}
                <p>
                  {t(
                    'These notes explain the connection to A4A, P4P, or I4I. They don’t mean the branch commissioned the project.',
                    'Эти примечания объясняют связь с A4A, P4P или I4I. Они не означают, что направление выступало заказчиком проекта.',
                    'Бу искәрмәләр проектның A4A, P4P яки I4I белән ничек бәйле булуын аңлата. Бу бәйләнеш әлеге юнәлеш проектка заказ биргән дигән сүз түгел.',
                  )}
                </p>
              </section>
            )}
          </article>
        </div>
        {related.length > 0 && (
          <section className="case-related" aria-labelledby="related-title">
            <div className="portfolio-section-heading">
              <h2 id="related-title">
                {t('More projects to explore.', 'Другие проекты.', 'Башка проектлар.')}
              </h2>
              <Button asChild variant="ghost">
                <Link href={backHref}>
                  {t('All projects', 'Все проекты', 'Барлык проектлар')}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="case-related-grid">
              {related.map((entry) => (
                <article key={entry.slug}>
                  <p className="portfolio-eyebrow">{categoryName(entry.category, language)}</p>
                  <h3>
                    <Link href={`/portfolio/${entry.slug}`}>
                      {entry.title}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </h3>
                  <p>{entry.subtitle}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className="case-contact">
          <h2>
            {t(
              'Working on something similar?',
              'Работаете над похожей задачей?',
              'Охшаш мәсьәлә өстендә эшлисезме?',
            )}
          </h2>
          <Button asChild size="lg">
            <Link href={portfolioBrand.contactHref} target="_blank" rel="noopener noreferrer">
              {t('Connect on LinkedIn', 'Связаться в LinkedIn', 'LinkedIn аша языгыз')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
