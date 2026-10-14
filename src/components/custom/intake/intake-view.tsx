// Trilingual (en, ru, tt) Bulachak editorial view for /intake/athlete and /intake/federation.
'use client';

import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AthleteIntakeForm } from '@/components/custom/intake/athlete-form';
import { FederationIntakeForm } from '@/components/custom/intake/federation-form';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';

export type IntakeTrack = 'athlete' | 'federation';

export function IntakeView({ track }: { track: IntakeTrack }) {
  const { language, t } = usePortfolioLocale();
  const isAthlete = track === 'athlete';

  const eyebrow = isAthlete
    ? t(
        'A4A · AGENTS 4 ATHLETES · ATHLETE & ACADEMY TRACK',
        'A4A · AGENTS 4 ATHLETES · СПОРТСМЕНЫ И АКАДЕМИИ',
        'A4A · AGENTS 4 ATHLETES · СПОРТЧЫЛАР ҺӘМ АКАДЕМИЯЛӘР',
      )
    : t(
        'A4A × P4P · INSTITUTIONAL & FEDERATION TRACK',
        'A4A × P4P · ФЕДЕРАЦИИ, ГОРОДА И ПРОГРАММЫ ПАРАФЕХТОВАНИЯ',
        'A4A × P4P · ФЕДЕРАЦИЯЛӘР, ШӘҺӘРЛӘР ҺӘМ ПАРАФЕХТОВАНИЕ ПРОГРАММАЛАРЫ',
      );

  const title = isAthlete
    ? t(
        'Athlete & Coach Venture Intake: reclaim 10+ hours a\u00A0week for\u00A0the work of\u00A0sport.',
        'Анкета для\u00A0спортсменов и\u00A0тренеров: верните 10+ часов в\u00A0неделю на\u00A0работу в\u00A0зале.',
        'Спортчылар һәм тренерлар анкетасы: атнага 10+ сәгать вакытыгызны спорт эшенә кайтарыгыз.',
      )
    : t(
        'Federation & Adaptive Program Briefing.',
        'Брифинг для\u00A0федераций и\u00A0программ адаптивного фехтования.',
        'Федерацияләр һәм адаптив фехтование программалары өчен брифинг.',
      );

  const description = isAthlete
    ? t(
        'Launching or scaling a sports academy, private training studio, seasonal camp, or post-career venture? Share your focus below. We review your registration, billing, and parent-communication bottlenecks and reply within two working days with a 20-minute walkthrough and a concrete 21-day sprint plan.',
        'Запускаете или\u00A0развиваете спортивную академию, студию, сезонные сборы или\u00A0собственный проект? Расскажите о\u00A0ваших задачах ниже. Мы изучим узкие места в\u00A0записи, оплатах и\u00A0общении с\u00A0родителями и\u00A0ответим в\u00A0течение двух рабочих дней с\u00A0планом 21-дневного спринта.',
        'Спорт академиясен, шәхси студияне, сезонлы җыеннарны яки үз проектыгызны башлыйсызмы яки үстерәсезме? Бурычларыгыз турында түбәндә языгыз. Без язылу, түләүләр һәм ата-аналар белән аралашудагы кыенлыкларны өйрәнеп, ике эш көне эчендә 21\u00A0көнлек спринт планы белән җавап бирәбез.',
      )
    : t(
        'A 30-minute scoping briefing with Kamilla Gafurzianova, OLY, for sports federations, municipal departments, and adaptive sport leaders. Scope a 6-week Sponsored Cohort Accelerator (6 to 8 member clubs) or a Parafencing 4 Progress (P4P) adaptive equipment and coach-certification rollout ahead of LA28.',
        '30-минутный установочный брифинг с\u00A0Камиллой Гафурзяновой, OLY для\u00A0спортивных федераций, муниципальных ведомств и\u00A0руководителей адаптивных программ. Обсудите 6-недельный когортный акселератор (для\u00A06–8 клубов) или\u00A0оснащение залов колясками и\u00A0рамами Parafencing 4 Progress (P4P) к\u00A0циклу LA28.',
        'Спорт федерацияләре, муниципаль бүлекләр һәм адаптив спорт җитәкчеләре өчен Камилла Гафурзянова, OLY белән 30 минутлык брифинг. 6–8 клуб өчен 6 атналык когорта акселераторын яки LA28 циклы алдыннан Parafencing 4 Progress (P4P) коляскалары һәм рамалары белән тәэмин итү программасын планлаштырыгыз.',
      );

  const badges = isAthlete
    ? [
        t('21-Day Turnkey Sprint', '21-дневный спринт под ключ', '21 көнлек әзер спринт'),
        t('10-Hr Weekly Relief Guarantee', 'Гарантия 10+ ч/нед', 'Атнага 10+ сәгать гарантиясе'),
        t('4% P4P Social Pledge', '4% выручки в P4P', 'Тулай керемнең 4% P4P фондына'),
      ]
    : [
        t(
          'Sponsored Cohort Accelerator (6–8 Clubs)',
          'Когортный акселератор (6–8 клубов)',
          'Когорта акселераторы (6–8 клуб)',
        ),
        t(
          'P4P Adaptive Equipment & Coaching',
          'P4P · Коляски, рамы и обучение тренеров',
          'P4P · Коляскалар, рамалар һәм тренерлар укыту',
        ),
        t('LA28 Paralympic Readiness', 'Подготовка к циклу LA28', 'LA28 циклына әзерлек'),
      ];

  return (
    <main id="portfolio-main" lang={language} className="portfolio portfolio-story">
      <div className="portfolio-container">
        <Button asChild variant="ghost" className="mb-7 pl-0">
          <Link href="/">
            <ArrowLeft size={16} aria-hidden="true" />
            {t('Back to Bulachak', 'На главную Bulachak', 'Bulachak баш битенә')}
          </Link>
        </Button>

        <header className="story-header">
          <p className="portfolio-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {badges.map((badge) => (
              <Badge key={badge} variant="outline" className="font-mono text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            {isAthlete ? <AthleteIntakeForm /> : <FederationIntakeForm />}
          </div>

          <aside className="lg:col-span-5">
            <section className="case-evidence m-0">
              <p className="portfolio-eyebrow">
                {isAthlete
                  ? t(
                      'THE A4A SPRINT MODEL · SERVICE-AS-SOFTWARE',
                      'МОДЕЛЬ СПРИНТА A4A · SERVICE-AS-SOFTWARE',
                      'A4A СПРИНТ МОДЕЛЕ · SERVICE-AS-SOFTWARE',
                    )
                  : t(
                      'INSTITUTIONAL & P4P MODEL · EMERALD PASTURE',
                      'ИНСТИТУЦИОНАЛЬНАЯ МОДЕЛЬ A4A × P4P',
                      'A4A × P4P ИНСТИТУЦИОНАЛЬ МОДЕЛЕ',
                    )}
              </p>
              <h2 className="text-xl font-bold mt-1">
                {isAthlete
                  ? t(
                      'Sovereign digital operations in 21 days.',
                      'Собственный цифровой бэк-офис за 21 день.',
                      '21 көн эчендә үз цифрлы бэк-офисыгыз.',
                    )
                  : t(
                      'Cohort scale and adaptive sport infrastructure.',
                      'Масштаб когорты и инфраструктура парафехтования.',
                      'Когорта масштабы һәм парафехтование инфраструктурасы.',
                    )}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAthlete
                  ? t(
                      'A4A builds and hands over a sovereign digital back office: mobile-first registration, automated waivers, tuition routing, and a custom AI concierge trained on your schedule and policies. You own 100% of your assets with zero recurring retainer fees.',
                      'A4A собирает и\u00A0передаёт клубу собственный цифровой бэк-офис: мобильную запись, автоматические согласия, приём оплат и\u00A0ИИ-консьержа по\u00A0вашему расписанию и\u00A0правилам. Вы владеете 100% активов без\u00A0ежемесячной абонентской платы.',
                      'A4A клубка үз цифрлы бэк-офисын җыеп тапшыра: мобиль язылу, электрон ризалыклар, түләүләр кабул итү һәм расписаниегез буенча көйләнгән ЯИ-ярдәмче. Барлык кораллар абонент түләүсез тулысынча сезнең милектә кала.',
                    )
                  : t(
                      'Sponsored Cohort Accelerators ($15,000–$18,000 for 6 to 8 clubs) modernize registration, waivers, billing, and parent communications across an entire division in 6 weeks. Through Parafencing 4 Progress (P4P), we also equip clubs with standardized wheelchair fencing frames, mounting rigs, and adaptive coaching curricula.',
                      'Когортный акселератор ($15,000–$18,000 для\u00A06–8 клубов) за\u00A06 недель модернизирует запись, согласия, биллинг и\u00A0коммуникацию с\u00A0родителями для\u00A0целого региона. Через Parafencing 4 Progress (P4P) мы также помогаем оснастить залы колясками, рамами крепления и\u00A0методиками адаптивного фехтования.',
                      'Когорта акселераторы (6–8 клуб өчен $15,000–$18,000) 6 атна эчендә язылу, ризалыклар, түләүләр һәм ата-аналар белән аралашуны яңарта. Parafencing 4 Progress (P4P) аша без залларга махсус коляскалар, беркетү рамалары һәм тренерлар өчен методикалар белән ярдәм итәбез.',
                    )}
              </p>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>{t('Reply window', 'Срок ответа', 'Җавап вакыты')}</span>
                  <span className="font-mono text-foreground">
                    {t('Within 2 working days', 'До 2 рабочих дней', '2 эш көне эчендә')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('Scoping call', 'Длительность звонка', 'Сөйләшү вакыты')}</span>
                  <span className="font-mono text-foreground">
                    {isAthlete
                      ? t('20 minutes', '20 минут', '20 минут')
                      : t('30 minutes', '30 минут', '30 минут')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('Delivery scope', 'Формат внедрения', 'Тапшыру форматы')}</span>
                  <span className="font-mono text-foreground">
                    {isAthlete
                      ? t('21-day sprint', 'Спринт 21 день', '21 көнлек спринт')
                      : t('6–8 clubs · 6 weeks', '6–8 клубов · 6 недель', '6–8 клуб · 6 атна')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('Adaptive sport pledge', 'Отчисление в P4P', 'P4P фондына өлеш')}</span>
                  <span className="font-mono text-primary">
                    {t('4% gross to P4P', '4% выручки в P4P', 'Керемнең 4% P4P фондына')}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="case-evidence-links">
                <Button asChild size="sm">
                  <Link href="/audit">
                    {t('15-Min Ops Leak Audit', '15-минутный аудит', '15 минутлык аудит')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/pricing">
                    {t('Pricing & Pillars', 'Тарифы и форматы', 'Хезмәт форматлары')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href={isAthlete ? '/a4a' : '/p4p'}>
                    {isAthlete
                      ? t('About A4A', 'О направлении A4A', 'A4A турында')
                      : t('About P4P', 'О направлении P4P', 'P4P турында')}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
