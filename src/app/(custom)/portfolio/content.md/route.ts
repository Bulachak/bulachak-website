// @polsia:user-owned: readable portfolio text from the same localized editorial records.
import 'server-only';
import { bulachakHomeCopy } from '@/lib/business/bulachak-home';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { getLocalizedPages } from '@/lib/business/portfolio-editorial';
import type { CaseStudy } from '@/lib/contracts/portfolio';
import type { StoryPage } from '@/lib/contracts/portfolio-pages';
import { portfolioBrand, portfolioLegs } from '@/lib/portfolio-brand';
import {
  categoryName,
  isPortfolioLanguage,
  isPublishedPortfolioLanguage,
  type PortfolioLanguage,
  portfolioHref,
  statusName,
  translate,
} from '@/lib/portfolio-locale';
import { portfolioWorkMetadata } from '@/lib/portfolio-metadata';
import { siteUrl } from '@/lib/site';

function inline(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/([`*_{}[\]<>])/g, '\\$1');
}

function absolute(path: string) {
  return new URL(path, siteUrl).href;
}

function pageUrl(language: PortfolioLanguage, slug?: string) {
  return absolute(portfolioHref(language, slug ? `/${slug}` : ''));
}

function link(label: string, url: string) {
  return `[${inline(label)}](<${absolute(url)}>)`;
}

function renderStory(page: StoryPage, language: PortfolioLanguage, level = 2) {
  const heading = '#'.repeat(level);
  return [
    `${heading} ${inline(page.title)}`,
    inline(page.eyebrow),
    pageUrl(language, page.slug),
    inline(page.description),
    ...page.sections.flatMap((section) => [
      `${heading}# ${inline(section.title)}`,
      ...section.paragraphs.map(inline),
    ]),
  ].join('\n\n');
}

function renderCase(item: CaseStudy, language: PortfolioLanguage, level = 2) {
  const heading = '#'.repeat(level);
  const t = (en: string, ru: string, tt: string) => translate(language, en, ru, tt);
  const lines = [
    `${heading} ${inline(item.title)}`,
    inline(item.subtitle),
    pageUrl(language, item.slug),
    `${t('Author', 'Автор', 'Автор')}: ${inline(portfolioBrand.person)}`,
    inline(item.summary),
    `${t('Category', 'Категория', 'Төркем')}: ${inline(categoryName(item.category, language) ?? item.category)}`,
    `${t('Work status', 'Статус работы', 'Эшнең хәле')}: ${inline(statusName(item.status, language))}`,
    `${t('My role', 'Моя роль', 'Минем катнашым')}: ${inline(item.role)}`,
    `${t('Project detail', 'Ключевая деталь', 'Кыскача')}: ${inline(item.highlight)}`,
    `${t('Tags', 'Темы', 'Темалар')}: ${item.tags.map(inline).join(', ')}`,
    `${heading}# ${t('Evidence and scope', 'Основания и границы утверждений', 'Дәлилләр һәм эшнең күләме')}`,
    inline(item.evidenceNote),
    ...item.sections.flatMap((section) => [
      `${heading}# ${inline(section.title)}`,
      ...section.paragraphs.map(inline),
      ...(section.bullets?.length
        ? [section.bullets.map((text) => `- ${inline(text)}`).join('\n')]
        : []),
    ]),
  ];
  if (item.legs.length) {
    lines.push(
      `${heading}# ${t('Related branches', 'Связанные направления', 'Бәйле юнәлешләр')}`,
      item.legs
        .map((code) => {
          const leg = portfolioLegs.find((entry) => entry.code === code);
          const name = leg?.names[language] ?? code;
          const note = item.legNotes?.[code];
          return `- ${link(`${code}: ${name}`, pageUrl(language, code.toLowerCase()))}${note ? `. ${inline(note)}` : ''}`;
        })
        .join('\n'),
    );
  }
  if (item.links.length) {
    lines.push(
      `${heading}# ${t('Project links', 'Ссылки на материалы проекта', 'Проектка сылтамалар')}`,
      item.links.map((itemLink) => `- ${link(itemLink.label, itemLink.url)}`).join('\n'),
    );
  }
  return lines.join('\n\n');
}

function renderHome(language: PortfolioLanguage) {
  const home = bulachakHomeCopy[language];
  return [
    `# Bulachak · ${inline(home.title)}`,
    inline(home.eyebrow),
    pageUrl(language),
    inline(home.description),
    `## ${inline(home.branchesTitle)}`,
    inline(home.branchesIntro),
    ...portfolioLegs.flatMap((leg) => {
      const branch = home.branches[leg.code];
      return [
        `### ${leg.code}: ${inline(leg.names[language])}`,
        inline(branch.purpose),
        inline(branch.role),
        inline(branch.description),
        link(branch.linkLabel, pageUrl(language, leg.code.toLowerCase())),
      ];
    }),
    inline(home.philosophyEyebrow),
    `## ${inline(home.philosophyTitle)}`,
    inline(home.philosophyText),
    inline(home.alignment),
    link(home.philosophyLink, pageUrl(language, 'about')),
    `## ${inline(home.workTitle)}`,
    inline(home.workText),
    link(home.workLink, pageUrl(language, 'work')),
    link(home.founderLink, pageUrl(language, 'founder')),
  ].join('\n\n');
}

function renderWorkDirectory(language: PortfolioLanguage, cases: CaseStudy[], level = 1) {
  const t = (en: string, ru: string, tt: string) => translate(language, en, ru, tt);
  const heading = '#'.repeat(level);
  const directory = portfolioWorkMetadata(language);
  return [
    `${heading} ${inline(directory.title)}`,
    pageUrl(language, 'work'),
    inline(directory.description),
    inline(portfolioBrand.person),
    link(bulachakHomeCopy[language].founderLink, pageUrl(language, 'founder')),
    `${heading}# ${t('Case study index', 'Список кейсов', 'Проектлар исемлеге')}`,
    cases
      .map((item) => `- ${link(item.title, pageUrl(language, item.slug))}: ${inline(item.summary)}`)
      .join('\n'),
  ].join('\n\n');
}

function markdown(body: string, language: PortfolioLanguage, status = 200, canonical?: string) {
  return new Response(`${body}\n`, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Language': language,
      'X-Content-Type-Options': 'nosniff',
      ...(status >= 400 ? { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } : {}),
      ...(canonical ? { Link: `<${canonical}>; rel="canonical"` } : {}),
    },
  });
}

// No slug returns the Bulachak home, work directory, and all stories/cases.
// slug=home returns only the initiative introduction. slug=work returns the
// founder's work directory and full case records. Other slugs select one page.
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const requestedLanguage = params.get('lang') ?? 'en';
  if (!isPortfolioLanguage(requestedLanguage)) {
    return markdown('# Invalid language\n\nUse lang=en, lang=ru, or lang=tt.', 'en', 400);
  }
  if (!isPublishedPortfolioLanguage(requestedLanguage))
    return markdown(
      '# Language edition unavailable\n\nThis language edition is not currently published.',
      'en',
      404,
    );
  const language = requestedLanguage;
  const slug = params.get('slug');
  const t = (en: string, ru: string, tt: string) => translate(language, en, ru, tt);
  if (slug !== null && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return markdown(
      t('# Invalid slug', '# Некорректный адрес материала', '# Материал адресы дөрес түгел'),
      language,
      400,
    );
  }

  const pages = getLocalizedPages(language);
  const cases = getLocalizedCases(language);
  if (slug === 'home') return markdown(renderHome(language), language, 200, pageUrl(language));
  if (slug === 'work') {
    return markdown(
      [
        renderWorkDirectory(language, cases),
        ...cases.map((item) => renderCase(item, language)),
      ].join('\n\n'),
      language,
      200,
      pageUrl(language, 'work'),
    );
  }
  if (slug) {
    const page = pages.find((entry) => entry.slug === slug);
    if (page)
      return markdown(renderStory(page, language, 1), language, 200, pageUrl(language, slug));
    const item = cases.find((entry) => entry.slug === slug);
    if (item)
      return markdown(renderCase(item, language, 1), language, 200, pageUrl(language, slug));
    return markdown(
      `${t('# Page not found', '# Материал не найден', '# Бит табылмады')}\n\n${link(t('Browse the work', 'Посмотреть проекты', 'Проектларны карау'), pageUrl(language, 'work'))}`,
      language,
      404,
    );
  }

  const body = [
    renderHome(language),
    renderWorkDirectory(language, cases, 2),
    ...pages.map((page) => renderStory(page, language)),
    ...cases.map((item) => renderCase(item, language)),
  ].join('\n\n');
  return markdown(body, language, 200, pageUrl(language));
}
