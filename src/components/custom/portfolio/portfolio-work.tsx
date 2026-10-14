// @polsia:user-owned: searchable founder project catalogue for the Bulachak website.
'use client';
import { ArrowDown, ArrowUpRight, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CaseVisual } from '@/components/custom/portfolio/case-visual';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { usePortfolio } from '@/hooks/use-portfolio';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { filterPortfolio } from '@/lib/business/portfolio-filter';
import { categoryName, categoryNames, statusName } from '@/lib/portfolio-locale';

export function PortfolioWork() {
  const { language, t } = usePortfolioLocale();
  const { items, loading, error, retry } = usePortfolio();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All work');
  const [showAll, setShowAll] = useState(false);
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    function restore() {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get('q') ?? '');
      const value = params.get('category') ?? 'All work';
      setCategory((categoryNames.en as readonly string[]).includes(value) ? value : 'All work');
      setShowAll(params.get('all') === '1');
      setRestored(true);
    }
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  useEffect(() => {
    if (!restored) return;
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (category !== 'All work') url.searchParams.set('category', category);
    else url.searchParams.delete('category');
    if (showAll) url.searchParams.set('all', '1');
    else url.searchParams.delete('all');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    try {
      sessionStorage.setItem('bulachak-portfolio-return', `${url.pathname + url.search}#work`);
    } catch {
      /* Storage is optional. */
    }
  }, [query, category, showAll, restored]);
  const filtered = useMemo(() => filterPortfolio(items, query, category), [items, query, category]);
  const visible =
    showAll || query.trim() || category !== 'All work' ? filtered : filtered.slice(0, 8);
  const featured = [
    'playla-family-resource-app',
    'sffa-brand-and-campaign-tools',
    'everest-digital-experience',
  ].flatMap((slug) => items.filter((item) => item.slug === slug));
  function reset() {
    setQuery('');
    setCategory('All work');
    setShowAll(false);
  }
  return (
    <main id="portfolio-main" lang={language} className="portfolio portfolio-story">
      <header className="portfolio-container story-header">
        <p className="portfolio-eyebrow">
          {t('THE FOUNDER’S PROJECT WORK', 'ПРОЕКТЫ ОСНОВАТЕЛЬНИЦЫ', 'НИГЕЗ САЛУЧЫНЫҢ ПРОЕКТЛАРЫ')}
        </p>
        <h1>
          {t(
            'Experience behind Bulachak.',
            'Опыт, на котором строится Bulachak.',
            'Bulachakка нигез булган тәҗрибә.',
          )}
        </h1>
        <p>
          {t(
            'Projects by Bulachak founder Kamilla Gafurzianova. Each case explains her role, the work’s status, and the evidence available.',
            'Проекты основательницы Bulachak Камиллы Гафурзяновой. В каждом кейсе указаны её роль, статус работы и доступные подтверждения.',
            'Bulachakка нигез салучы Камилла Гафурзянованың проектлары. Һәр тасвирламада аның катнашы, эшнең хәзерге хәле һәм раслаучы материаллар күрсәтелә.',
          )}
        </p>
      </header>
      <section className="portfolio-container portfolio-featured" aria-labelledby="selected-title">
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-eyebrow">
              {t('A FEW PLACES TO START', 'С ЧЕГО НАЧАТЬ', 'НӘРСӘДӘН БАШЛАРГА')}
            </p>
            <h2 id="selected-title">
              {t('Selected projects.', 'Несколько проектов.', 'Сайланган проектлар.')}
            </h2>
          </div>
          <p>
            {t(
              'A closer look at three websites and tools, and the problems they help solve.',
              'Три примера сайтов и инструментов и задачи, которые они помогают решать.',
              'Өч мисал: сайтлар, кораллар һәм алар хәл итәргә булышкан мәсьәләләр.',
            )}
          </p>
        </div>
        {loading ? (
          <div className="portfolio-featured-grid" aria-hidden="true">
            {[1, 2, 3].map((key) => (
              <Skeleton key={key} className="h-80 rounded-sm" />
            ))}
          </div>
        ) : error ? (
          <div className="portfolio-load-error" role="alert">
            <p>
              {t(
                'The case studies couldn’t load.',
                'Не удалось загрузить проекты.',
                'Проектларны йөкләп булмады.',
              )}
            </p>
            <Button onClick={retry}>{t('Try again', 'Повторить', 'Яңадан карау')}</Button>
          </div>
        ) : (
          <div className="portfolio-featured-grid">
            {featured.map((item, index) => (
              <article className="portfolio-feature-card" key={item.slug}>
                <Link
                  href={`/${item.slug}`}
                  className="portfolio-visual-link"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <CaseVisual item={item} />
                </Link>
                <div className="portfolio-card-meta">
                  <span>
                    0{index + 1} / {categoryName(item.category, language)}
                  </span>
                  <Badge variant="outline">{statusName(item.status, language)}</Badge>
                </div>
                <p className="portfolio-card-project">{item.subtitle.split(' · ')[0]}</p>
                <h3>
                  <Link href={`/${item.slug}`}>
                    {item.title}
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                </h3>
                <p>{item.summary}</p>
                <div className="portfolio-highlight">{item.highlight}</div>
              </article>
            ))}
          </div>
        )}
      </section>
      <section id="work" className="portfolio-work" aria-labelledby="work-title">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div>
              <p className="portfolio-eyebrow">{t('CASE STUDIES', 'КЕЙСЫ', 'ПРОЕКТЛАР ТУРЫНДА')}</p>
              <h2 id="work-title">
                {t('Explore the work.', 'Посмотрите проекты.', 'Проектлар белән танышыгыз.')}
              </h2>
            </div>
            <p>
              {t(
                'Search for a project or choose the kind of work you’re interested in.',
                'Найдите проект или выберите интересующее направление работы.',
                'Проект исемен языгыз яки кызыксындырган эш төрен сайлагыз.',
              )}
            </p>
          </div>
          <div className="portfolio-catalogue-controls">
            <fieldset
              className="portfolio-filters"
              aria-label={t('Filter projects', 'Фильтр проектов', 'Эш төре буенча сайлау')}
            >
              {categoryNames.en.map((name) => (
                <Button
                  key={name}
                  variant={category === name ? 'default' : 'ghost'}
                  size="sm"
                  aria-pressed={category === name}
                  onClick={() => {
                    setCategory(name);
                    setShowAll(false);
                  }}
                >
                  {categoryName(name, language)}
                </Button>
              ))}
            </fieldset>
            <div className="portfolio-search">
              <Search size={17} aria-hidden="true" />
              <label className="sr-only" htmlFor="portfolio-search">
                {t('Search case studies', 'Поиск проектов', 'Проектларны эзләү')}
              </label>
              <Input
                id="portfolio-search"
                type="search"
                placeholder={t(
                  'Project, skill, A4A…',
                  'Проект, навык, A4A…',
                  'Проект, күнекмә, A4A…',
                )}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="portfolio-results-meta">
            <output aria-live="polite">
              {loading
                ? t('Loading projects…', 'Загрузка проектов…', 'Проектлар йөкләнә…')
                : error
                  ? t('Projects unavailable', 'Проекты недоступны', 'Проектлар ачылмый')
                  : t('Projects found: ', 'Найдено проектов: ', 'Табылган проектлар: ') +
                    filtered.length}
              {!loading && query.trim() ? ` · ${query.trim()}` : ''}
            </output>
            {query || category !== 'All work' ? (
              <Button size="sm" variant="ghost" onClick={reset}>
                {t('Clear filters', 'Сбросить фильтры', 'Фильтрларны чистарту')}
                <X size={14} aria-hidden="true" />
              </Button>
            ) : (
              <span>
                {t(
                  'Completed projects, prototypes, and research.',
                  'Выполненные проекты, прототипы и исследования.',
                  'Башкарылган проектлар, прототиплар һәм тикшеренүләр.',
                )}
              </span>
            )}
          </div>
          {error ? (
            <div role="alert" className="portfolio-empty">
              <h3>
                {t(
                  'The projects couldn’t load.',
                  'Не удалось загрузить проекты.',
                  'Проектларны йөкләп булмады.',
                )}
              </h3>
              <Button onClick={retry}>{t('Try again', 'Повторить', 'Яңадан карау')}</Button>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((key) => (
                <Skeleton key={key} className="h-28 rounded-sm" />
              ))}
            </div>
          ) : visible.length ? (
            <div className="portfolio-work-list">
              {visible.map((item, index) => (
                <article key={item.slug} className="portfolio-work-row">
                  <span className="portfolio-work-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="portfolio-work-description">
                    <div className="portfolio-work-category">
                      {categoryName(item.category, language)}
                      <span> / </span>
                      {statusName(item.status, language)}
                    </div>
                    <h3>
                      <Link href={`/${item.slug}`}>
                        {item.title}
                        <ArrowUpRight size={20} aria-hidden="true" />
                      </Link>
                    </h3>
                    <p>{item.subtitle}</p>
                  </div>
                  <div className="portfolio-work-tags">
                    {item.legs.map((leg) => (
                      <Badge key={leg} variant="outline">
                        {leg}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="ghost" size="icon" className="portfolio-row-arrow">
                    <Link
                      href={`/${item.slug}`}
                      aria-label={t('Read: ', 'Читать: ', 'Уку: ') + item.title}
                    >
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          ) : (
            <div className="portfolio-empty">
              <Search size={28} aria-hidden="true" />
              <h3>
                {t(
                  'No matching projects.',
                  'Подходящих проектов нет.',
                  'Туры килгән проектлар юк.',
                )}
              </h3>
              <p>
                {t(
                  'Try another word or choose a broader category.',
                  'Попробуйте другое слово или выберите более широкую категорию.',
                  'Башка сүз белән эзләгез яки фильтрны үзгәртегез.',
                )}
              </p>
              <Button onClick={reset}>
                {t('Show all work', 'Все проекты', 'Барлык проектлар')}
              </Button>
            </div>
          )}
          {!loading && !error && visible.length < filtered.length && (
            <div className="portfolio-show-all">
              <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
                {t('Show all ', 'Показать все: ', 'Барысын күрсәтү: ')}
                {filtered.length}
                <ArrowDown size={16} aria-hidden="true" />
              </Button>
            </div>
          )}
          <p className="portfolio-context-note">
            {t(
              'A4A, P4P, and I4I tags describe relevance to Bulachak’s branches. Each case explains its original context. Some projects came before these branches.',
              'Метки A4A, P4P и I4I показывают связь с направлениями Bulachak. В каждом кейсе описан исходный контекст. Некоторые проекты появились раньше этих направлений.',
              'A4A, P4P һәм I4I билгеләре проектның Bulachak юнәлешләре белән бәйләнешен күрсәтә. Һәр тасвирламада эшнең шартлары аңлатыла. Кайбер проектлар әлеге юнәлешләрдән алда башланды.',
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
