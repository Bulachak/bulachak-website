// @polsia:user-owned: navigation for the published Bulachak language editions.
'use client';

import { ArrowUpRight, Menu } from 'lucide-react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { portfolioLegs } from '@/lib/portfolio-brand';
import {
  localizePortfolioHref,
  portfolioLanguageNames,
  publishedPortfolioLanguages,
} from '@/lib/portfolio-locale';

function Wordmark() {
  const { t } = usePortfolioLocale();
  return (
    <Link
      href="/portfolio#portfolio-main"
      aria-label={t('Bulachak home', 'Главная страница Булачак', 'Булачакның баш бите')}
      className="portfolio-wordmark"
    >
      <span>
        bulachak
        <span className="portfolio-dot" aria-hidden="true" />
      </span>
      <small>
        {t(
          'A future we build together',
          'Будущее, которое мы строим вместе',
          'Бергә төзи торган киләчәк',
        )}
      </small>
    </Link>
  );
}
function LanguageSwitch() {
  const { language, pathname, t } = usePortfolioLocale();
  const router = useRouter();
  return (
    <label className="portfolio-language">
      <span className="sr-only">{t('Website language', 'Язык сайта', 'Сайт теле')}</span>
      <select
        value={language}
        onChange={(event) => {
          const selected = publishedPortfolioLanguages.find(
            (value) => value === event.target.value,
          );
          if (selected)
            router.push(
              localizePortfolioHref(pathname, selected) +
                window.location.search +
                window.location.hash,
            );
        }}
      >
        {publishedPortfolioLanguages.map((available) => (
          <option key={available} value={available} lang={available}>
            {portfolioLanguageNames[available]}
          </option>
        ))}
      </select>
    </label>
  );
}
export function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const { language, t } = usePortfolioLocale();
  const links = [
    { label: t('Home', 'Главная', 'Баш бит'), href: '/portfolio' },
    { label: t('Branches', 'Направления', 'Юнәлешләр'), href: '/portfolio#branches' },
    { label: t('About', 'О Bulachak', 'Bulachak турында'), href: '/portfolio/about' },
    { label: t('Work', 'Проекты', 'Проектлар'), href: '/portfolio/work' },
    { label: t('Founder', 'Основательница', 'Нигез салучы'), href: '/portfolio/founder' },
  ];
  return (
    <header
      lang={language}
      className="portfolio-nav sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <a href="#portfolio-main" className="portfolio-skip-link">
        {t('Skip to content', 'Перейти к содержанию', 'Эчтәлеккә күчү')}
      </a>
      <nav
        aria-label={t('Main navigation', 'Основная навигация', 'Төп меню')}
        className="portfolio-nav-inner"
      >
        <Wordmark />
        <div className="portfolio-desktop-links">
          {links.map((item) => (
            <Button key={item.href} asChild variant="ghost">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
        <div className="portfolio-nav-controls">
          <LanguageSwitch />
          <ThemeToggle
            label={t(
              'Toggle light or dark theme',
              'Переключить светлую или тёмную тему',
              'Якты яки караңгы режимга күчү',
            )}
            className="portfolio-theme-toggle size-11 shrink-0 text-foreground"
          />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="portfolio-menu-toggle size-11 shrink-0 lg:hidden"
                aria-label={t('Open menu', 'Открыть меню', 'Менюны ачу')}
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              lang={language}
              side="right"
              closeLabel={t('Close menu', 'Закрыть меню', 'Менюны ябу')}
              className="portfolio-nav flex w-[88vw] max-w-sm flex-col"
            >
              <SheetHeader className="mt-7 text-left">
                <SheetTitle>Bulachak</SheetTitle>
                <SheetDescription>
                  {t(
                    'Projects, people, and ideas',
                    'Проекты, люди и идеи',
                    'Проектлар, кешеләр һәм идеяләр',
                  )}
                </SheetDescription>
              </SheetHeader>
              <nav
                className="mt-6 flex flex-col gap-2"
                aria-label={t('Mobile navigation', 'Мобильная навигация', 'Телефондагы меню')}
              >
                {links.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="min-h-12 justify-start"
                  >
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </Button>
                ))}
                {portfolioLegs.map((leg) => (
                  <Button key={leg.code} asChild variant="ghost" className="min-h-12 justify-start">
                    <Link
                      href={`/portfolio/${leg.code.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                    >
                      {leg.code} · {leg.names[language]}
                    </Link>
                  </Button>
                ))}
              </nav>
              <p className="mt-auto border-t border-border pt-6 text-sm">
                {t(
                  'Value is grown, not extracted.',
                  'Ценность нужно создавать, а не извлекать.',
                  'Кыйммәтне бергә арттыру, үзеңә генә алмау.',
                )}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
export function PortfolioFooter() {
  const { language, t } = usePortfolioLocale();
  const links = [
    { href: '/portfolio/about', label: t('About Bulachak', 'О Булачак', 'Булачак турында') },
    { href: '/portfolio/work', label: t('Project work', 'Проекты', 'Проектлар') },
    {
      href: '/portfolio/founder',
      label: t('About the founder', 'Об основательнице', 'Нигез салучы турында'),
    },
    {
      href: '/portfolio/privacy',
      label: t('Privacy policy', 'Конфиденциальность', 'Шәхси мәгълүмат'),
    },
    {
      href: '/portfolio/terms',
      label: t('Terms of use', 'Условия использования', 'Куллану шартлары'),
    },
  ];
  return (
    <footer lang={language} className="portfolio-footer border-t border-border bg-background">
      <div className="portfolio-container py-12">
        <div className="portfolio-footer-top">
          <div className="portfolio-footer-brand">
            <Wordmark />
            <p className="mt-5 text-sm text-muted-foreground">
              {t(
                'Value is grown, not extracted.',
                'Ценность нужно создавать, а не извлекать.',
                'Кыйммәтне бергә арттыру, үзеңә генә алмау.',
              )}
            </p>
          </div>
          <nav
            aria-label={t('Footer links', 'Ссылки внизу страницы', 'Бит ахырындагы сылтамалар')}
            className="portfolio-footer-links"
          >
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav
            aria-label={t('The three branches', 'Три направления', 'Өч юнәлеш')}
            className="portfolio-footer-links"
          >
            {portfolioLegs.map((leg) => (
              <Link key={leg.code} href={`/portfolio/${leg.code.toLowerCase()}`}>
                {leg.code} · {leg.names[language]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="portfolio-footer-bottom">
          <p>© 2026 Bulachak</p>
          <div>
            <NextLink href="/sitemap.xml">{t('Sitemap', 'Карта сайта', 'Сайт харитасы')}</NextLink>
            <NextLink href={`/portfolio/content.md?lang=${language}`}>
              {t('Text version', 'Текстовая версия', 'Текстны уку')}
            </NextLink>
            <NextLink href="/llms.txt">
              {t('For AI readers', 'Для ИИ-агентов', 'ЯИ агентлары өчен')}
              <ArrowUpRight size={12} aria-hidden="true" />
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
