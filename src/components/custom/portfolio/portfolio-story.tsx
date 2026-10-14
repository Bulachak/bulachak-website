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
  const isBranch = page.slug === 'a4a' || page.slug === 'p4p' || page.slug === 'i4i';
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
          <Link href="/">
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
              {isBranch && (
                <Link href="#branch-actions">
                  {t('Diagnostics & intake', 'Диагностика и участие', 'Диагностика һәм катнашу')}
                </Link>
              )}
              {founder && (
                <Link href="#credentials">
                  {t(
                    'Certified digital expertise',
                    'Квалификация и\u00A0сертификаты',
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

            {page.slug === 'a4a' && (
              <section id="branch-actions" className="case-evidence mt-10">
                <p className="portfolio-eyebrow">
                  {t(
                    'A4A · DIAGNOSTIC & INTAKE',
                    'A4A · ДИАГНОСТИКА И АНКЕТА',
                    'A4A · ДИАГНОСТИКА ҺӘМ ГАРИЗА',
                  )}
                </p>
                <h2>
                  {t(
                    'Put A4A to work in your club or academy.',
                    'Внедрите A4A в\u00A0работу вашего клуба или\u00A0академии.',
                    'A4A коралларын клубыгызда яки академиягездә эшкә җигегез.',
                  )}
                </h2>
                <p>
                  {t(
                    'Start with a 2-minute operational diagnostic to quantify weekly admin leaks, submit an athlete-founder & coach venture intake, or review our three productized engagement pillars.',
                    'Начните с\u00A0двухминутной диагностики операционных потерь, заполните анкету для\u00A0тренеров и\u00A0основателей спортивных проектов или\u00A0изучите три формата работы без\u00A0абонентской платы.',
                    'Ике минутлык операцион диагностикадан башлагыз, тренерлар һәм спорт проектларын башлаучылар өчен анкета тутырыгыз яки өч эш форматы белән танышыгыз.',
                  )}
                </p>
                <div className="case-evidence-links">
                  <Button asChild>
                    <Link href="/audit">
                      {t('15-Min Ops Leak Audit', '15-минутный аудит', '15 минутлык аудит')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/intake/athlete">
                      {t('Athlete & Coach Intake', 'Анкета для спортсменов', 'Спортчылар анкетасы')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/pricing">
                      {t('Pricing & Pillars', 'Тарифы и форматы', 'Хезмәт форматлары')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </section>
            )}

            {page.slug === 'p4p' && (
              <section id="branch-actions" className="case-evidence mt-10">
                <p className="portfolio-eyebrow">
                  {t(
                    'P4P · INSTITUTIONAL & ADAPTIVE SPORT BRIEFING',
                    'P4P · БРИФИНГ ДЛЯ ФЕДЕРАЦИЙ И КЛУБОВ',
                    'P4P · ФЕДЕРАЦИЯЛӘР ҺӘМ КЛУБЛАР ӨЧЕН БРИФИНГ',
                  )}
                </p>
                <h2>
                  {t(
                    'Launch or equip an adaptive fencing program ahead of LA28.',
                    'Запустите или\u00A0оснастите программу парафехтования к\u00A0циклу LA28.',
                    'LA28 циклына парафехтование программасын башлагыз яки җиһазлагыз.',
                  )}
                </h2>
                <p>
                  {t(
                    'Scope a federation cohort, wheelchair fencing frame and mounting-rig rollout, or adaptive coach education clinic with Kamilla Gafurzianova, OLY.',
                    'Обсудите запуск когорты клубов, поставку колясок и\u00A0креплений для\u00A0парафехтования или\u00A0обучение тренеров вместе с\u00A0Камиллой Гафурзяновой, OLY.',
                    'Камилла Гафурзянова, OLY белән клублар когортасын башлау, парафехтование коляскалары һәм беркеткечләре белән тәэмин итү яки тренерларны укыту турында сөйләшегез.',
                  )}
                </p>
                <div className="case-evidence-links">
                  <Button asChild>
                    <Link href="/intake/federation">
                      {t(
                        'Federation & P4P Briefing',
                        'Брифинг для федераций и P4P',
                        'Федерацияләр һәм P4P брифингы',
                      )}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/audit">
                      {t('15-Min Ops Leak Audit', '15-минутный аудит', '15 минутлык аудит')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </section>
            )}

            {page.slug === 'i4i' && (
              <section id="branch-actions" className="case-evidence mt-10">
                <p className="portfolio-eyebrow">
                  {t(
                    'I4I · COMMUNITY & OPERATIONAL WORKSHOPS',
                    'I4I · СООБЩЕСТВО И ПРАКТИКУМЫ',
                    'I4I · ҖӘМГЫЯТЬ ҺӘМ ОСТАХАНӘЛӘР',
                  )}
                </p>
                <h2>
                  {t(
                    'Join a practical workshop or start a community conversation.',
                    'Присоединяйтесь к\u00A0практикуму или\u00A0начните диалог о\u00A0сотрудничестве.',
                    'Практик остаханәгә кушылыгыз яки хезмәттәшлек турында сөйләшү башлагыз.',
                  )}
                </h2>
                <p>
                  {t(
                    'Register for our operational masterclass for immigrant founders and academy operators, or connect directly with the Bulachak team.',
                    'Зарегистрируйтесь на\u00A0практический воркшоп по\u00A0операционной системе для\u00A0предпринимателей-иммигрантов и\u00A0руководителей академий или\u00A0напишите команде Bulachak напрямую.',
                    'Иммигрант эшмәкәрләр һәм академия җитәкчеләре өчен гамәли остаханәгә язылыгыз яки Bulachak командасы белән турыдан-туры элемтәгә керегез.',
                  )}
                </p>
                <div className="case-evidence-links">
                  <Button asChild>
                    <Link href="/webinar">
                      {t('Operational Masterclass', 'Операционный практикум', 'Оештыру остаханәсе')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/#connect">
                      {t(
                        'Direct Collaboration Inquiry',
                        'Написать о сотрудничестве',
                        'Хезмәттәшлек турында язу',
                      )}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </section>
            )}

            <div className="story-next">
              {page.relatedLeg && (
                <Button asChild>
                  <Link href="/about">
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
                  <Link href={page.relatedLeg ? `/work?q=${page.relatedLeg}#work` : '/work#work'}>
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
                  <Link href={`/${leg.code.toLowerCase()}`}>
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
