// Trilingual (en, ru, tt) Bulachak editorial view for /pricing, /ru/pricing, and /tt/pricing.
'use client';

import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { PricingFaq, type PricingFaqItem } from '@/components/custom/pricing/pricing-faq';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { portfolioLegs } from '@/lib/portfolio-brand';

interface Tier {
  readonly code: string;
  readonly sub: string;
  readonly title: string;
  readonly engagementLength: string;
  readonly price: string;
  readonly pricingShape: string;
  readonly body: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly highlight?: boolean;
}

export function PricingView() {
  const { language, t } = usePortfolioLocale();

  const tiers: readonly Tier[] = [
    {
      code: 'P//01',
      sub: t(
        'Clubs & Founders · Primary Entry',
        'Клубы и основатели · Основной формат',
        'Клублар һәм нигез салучылар · Төп формат',
      ),
      title: t(
        'Turnkey Sport Ops Sprint',
        'Операционный спринт под\u00A0ключ',
        'Әзер операцион спринт',
      ),
      engagementLength: t(
        '21-day clean hand-off',
        '21\u00A0день до полной передачи',
        'Тулы тапшыруга 21\u00A0көн',
      ),
      price: '$2,800 – $3,000',
      pricingShape: t(
        'Flat fee · 50% upfront / 50% on hand-off',
        'Фиксированная стоимость · 50% старт / 50% сдача',
        'Билгеләнгән бәя · 50% башта / 50% тапшырганда',
      ),
      body: t(
        'Complete operational spine modernization for sports clubs (20–100 athletes) and athlete-founders. Includes a mobile-first registration front door, automated intake and liability waivers, payment routing, and a custom AI concierge handling 70% of repetitive parent inquiries. Client owns 100% of all assets with zero ongoing vendor fees.',
        'Полное обновление операционного контура для\u00A0спортивных клубов (20–100 спортсменов) и\u00A0проектов спортсменов. Включает мобильную витрину и\u00A0запись, электронные согласия, маршрутизацию оплат и\u00A0ИИ-консьержа, который закрывает до\u00A070% типовых вопросов родителей. Все наработки полностью переходят клубу без\u00A0ежемесячной абонентской платы.',
        'Спорт клублары (20–100 спортчы) һәм спортчылар башлаган проектлар өчен эш системасын тулысынча яңарту. Мобиль язылу бите, электрон ризалыклар, түләүләрне кабул итү һәм ата-аналарның гадәти сорауларына җавап бирүче ЯИ-ярдәмче керә. Барлык кораллар абонент түләүсез тулысынча клуб милкенә тапшырыла.',
      ),
      ctaLabel: t('Book 15-Min Ops Audit', 'Пройти 15-мин аудит', '15 мин аудит узу'),
      ctaHref: '/audit',
      highlight: true,
    },
    {
      code: 'P//02',
      sub: t(
        'Camps & Tournaments · Aligned Partner',
        'Лагеря и турниры · Партнёрский запуск',
        'Лагерьлар һәм турнирлар · Партнёрлык',
      ),
      title: t(
        'Seasonal Camp Value-Share',
        'Запуск сезонного лагеря',
        'Сезонлы лагерьны эшләтеп җибәрү',
      ),
      engagementLength: t(
        'Event launch lifecycle',
        'Полный цикл набора смены',
        'Смена җыюның тулы циклы',
      ),
      price: '$1,000 + 8%',
      pricingShape: t(
        '$1,000 base + 6–8% camp tuition',
        '$1,000 база + 6–8% от набора',
        '$1,000 база + җыелган түләүдән 6–8%',
      ),
      body: t(
        'Performance-aligned operational launch for seasonal sports camps, summer/winter clinics, and tournaments. Low upfront barrier ($1,000 base) plus value-share per registered athlete ($15–$25/athlete). Covers high-converting registration funnels, digital waivers, automated messaging, and live roster tracking.',
        'Операционный запуск сезонных сборов, летних и\u00A0зимних интенсивов и\u00A0турниров с\u00A0привязкой к\u00A0результату. Низкий порог входа ($1,000 база) плюс доля с\u00A0каждой путёвки ($15–$25 за\u00A0участника). Включает страницу набора, цифровые согласия, автоматические уведомления и\u00A0живую ведомость участников.',
        'Сезонлы спорт җыеннарын, җәйге һәм кышкы интенсивларны һәм турнирларны нәтиҗәгә бәйләп башлап җибәрү. Түбән башлангыч түләү ($1,000 база) һәм теркәлгән һәр катнашучыдан өлеш ($15–$25). Язылу бите, цифрлы ризалыклар, автомат хәбәрләр һәм катнашучылар исемлеге керә.',
      ),
      ctaLabel: t('Plan Camp Launch', 'Запланировать запуск сбора', 'Лагерь башлауны планлаштыру'),
      ctaHref: '/audit',
    },
    {
      code: 'P//03',
      sub: t(
        'Federations & Cities · Institutional',
        'Федерации и города · Институциональный',
        'Федерацияләр һәм шәһәрләр · Институциональ',
      ),
      title: t(
        'Sponsored Cohort Accelerator',
        'Когортный акселератор клубов',
        'Клублар өчен когорта акселераторы',
      ),
      engagementLength: t(
        '6-week structured cohort',
        '6-недельная программа для 6–8 клубов',
        '6–8 клуб өчен 6 атналык программа',
      ),
      price: '$15,000 – $18,000',
      pricingShape: t(
        'Fixed cohort contract · 40/30/30 milestones',
        'Договор на когорту · этапы 40/30/30',
        'Когорта килешүе · 40/30/30 этаплары',
      ),
      body: t(
        'Wholesale digital modernization for 6 to 8 participating clubs or transitioning athlete-founders, sponsored by sports federations (e.g., USA Fencing), municipal departments (PlayLA model), or corporate partners. Combines group operational workshops, 1-on-1 implementation sprints, and an executive impact report.',
        'Комплексная модернизация для\u00A06–8 клубов или\u00A0проектов спортсменов при\u00A0поддержке спортивных федераций, муниципальных департаментов (модель PlayLA) или\u00A0партнёров. Объединяет групповые практикумы, индивидуальные спринты внедрения и\u00A0итоговый отчёт о\u00A0результатах.',
        'Спорт федерацияләре, муниципаль бүлекләр (PlayLA моделе) яки партнёрлар ярдәмендә 6–8 клуб яки спортчы проекты өчен комплекслы цифрлы яңарту. Төркемле остаханәләрне, индивидуаль спринтларны һәм йомгаклау хисабын берләштерә.',
      ),
      ctaLabel: t('Federation Briefing', 'Брифинг для федераций', 'Федерацияләр өчен брифинг'),
      ctaHref: '/intake/federation',
    },
  ];

  const faqItems: readonly PricingFaqItem[] = [
    {
      value: 'no-retainers',
      question: t(
        'Why does A4A refuse monthly retainer fees?',
        'Почему A4A работает без ежемесячной абонентской платы?',
        'Ни өчен A4A айлык абонент түләвеннән баш тарта?',
      ),
      answer: t(
        'Low-ticket monthly retainers ($300 to $500/month) trap founders in an exhausting 24/7 tech support cycle and leave clubs dependent on third-party agencies. A4A operates on bounded, high-value productized engagements. In 21 days, we build and transfer a sovereign operational back office that your club owns outright, with zero ongoing maintenance tax.',
        'Ежемесячные ретейнеры привязывают клуб к\u00A0внешнему подрядчику и\u00A0размывают ответственность за\u00A0результат. A4A работает короткими продуктовыми спринтами: за\u00A021\u00A0день мы собираем, настраиваем и\u00A0полностью передаём клубу готовую операционную систему без\u00A0скрытого налога на\u00A0обслуживание.',
        'Айлык түләүләр клубны чит подрядчыга бәйли. A4A кыска һәм ачык спринтлар белән эшли: 21\u00A0көн эчендә без әзер операцион системаны җыябыз, көйлибез һәм өстәмә айлык салымсыз тулысынча клубка тапшырабыз.',
      ),
    },
    {
      value: 'guarantee',
      question: t(
        'How does the 10-Hour Operational Relief Guarantee work?',
        'Как работает гарантия освобождения 10 часов в неделю?',
        'Атнага 10 сәгать вакытны бушату гарантиясе ничек эшли?',
      ),
      answer: t(
        'If your A4A Sport Ops Sprint does not uncover at least 10 hours of weekly administrative time savings and establish a clear path to recover your investment within 60 days, we continue working with your team for free until it does, or refund your sprint fee in full.',
        'Если по\u00A0итогам спринта A4A мы не\u00A0освобождаем минимум 10\u00A0часов рутинной административной работы в\u00A0неделю и\u00A0не\u00A0выстраиваем понятный путь окупаемости за\u00A060\u00A0дней, мы продолжаем доработку бесплатно до\u00A0результата или\u00A0возвращаем оплату полностью.',
        'Әгәр A4A спринты нәтиҗәсендә атнага кимендә 10\u00A0сәгать административ вакыт янга калмаса һәм 60\u00A0көн эчендә чыгымнарны каплау юлы төзелмәсә, без нәтиҗәгә кадәр бушлай эшләүне дәвам итәбез яки түләүне тулысынча кайтарабыз.',
      ),
    },
    {
      value: 'deliverables',
      question: t(
        'What are the exact deliverables in the 21-day sprint?',
        'Что именно входит в результаты 21-дневного спринта?',
        '21 көнлек спринт нәтиҗәсенә төгәл нәрсәләр керә?',
      ),
      answer: t(
        'Days 1–5: Operational diagnostic and domain/brand audit. Days 6–14: Mobile-first web front door, automated parent intake, digital liability waivers, and Stripe/ACH payment routing. Days 15–18: Custom AI prompt templates and concierge workflows trained on your club rules and schedule. Days 19–21: 60-minute recorded walkthrough, standard operating procedures (SOPs), and complete credential transfer.',
        'Дни 1–5: диагностика процессов и\u00A0аудит цифровых точек входа. Дни 6–14: мобильная страница записи, анкета родителей, цифровые согласия и\u00A0приём оплат (Stripe/ACH). Дни 15–18: настройка ИИ-консьержа и\u00A0шаблонов по\u00A0расписанию и\u00A0правилам клуба. Дни 19–21: 60-минутное обучение под\u00A0запись, регламенты (SOP) и\u00A0полная передача доступов.',
        '1–5 көннәр: эш барышын тикшерү һәм цифрлы керү нокталарын аудитлау. 6–14 көннәр: мобиль язылу бите, ата-аналар анкетасы, цифрлы ризалыклар һәм түләүләрне (Stripe/ACH) көйләү. 15–18 көннәр: клуб кагыйдәләре һәм расписаниесе буенча ЯИ-ярдәмчене көйләү. 19–21 көннәр: 60 минутлык видео-өйрәтү, эш кагыйдәләре (SOP) һәм барлык ачкычларны тапшыру.',
      ),
    },
    {
      value: 'p4p-pledge',
      question: t(
        'How does the 4% Parafencing 4 Progress (P4P) pledge work?',
        'Как устроено отчисление 4% в Parafencing 4 Progress (P4P)?',
        'Parafencing 4 Progress (P4P) файдасына 4% күчерү ничек эшли?',
      ),
      answer: t(
        'An unconditional four percent (4%) of all gross commercial revenue collected by A4A is transferred directly to Parafencing 4 Progress (P4P). This funds specialized $5,000 competition wheelchairs, mounting frames, and fair compensation for adaptive coaches ahead of the LA28 Paralympic Games.',
        'Безусловные 4% всей валовой выручки A4A направляются напрямую в\u00A0некоммерческое направление Parafencing 4 Progress (P4P). Эти средства идут на\u00A0специализированные фехтовальные коляски, рамы крепления и\u00A0достойную оплату труда тренеров по\u00A0адаптивному спорту в\u00A0преддверии Паралимпиады LA28.',
        'A4A алган барлык тулай керемнең 4 проценты турыдан-туры Parafencing 4 Progress (P4P) коммерциячел булмаган юнәлешенә күчерелә. Бу акчалар LA28 Паралимпиадасы алдыннан махсус фехтование коляскалары, беркетү рамалары алуга һәм адаптив спорт тренерларының хезмәтенә лаеклы түләүгә тотыла.',
      ),
    },
    {
      value: 'software-vs-service',
      question: t(
        'Is A4A a software app (SaaS) or a service?',
        'A4A — это программа по подписке или внедрение под ключ?',
        'A4A — язылу буенча программамы әллә әзер хезмәтме?',
      ),
      answer: t(
        'A4A is Service-as-Software. You do not buy a login to an empty software tool that you have to spend hours configuring yourself. Coordinated AI agents and automation pipelines run behind one plain-language interface, and our team does the heavy lifting to deliver a completed operational outcome.',
        'A4A работает по\u00A0модели Service-as-Software. Вы не\u00A0покупаете пустой личный кабинет, в\u00A0котором нужно разбираться ночами после тренировок. Наша команда сама собирает и\u00A0настраивает рабочие сценарии и\u00A0ИИ-помощников, передавая вам готовый результат.',
        'A4A Service-as-Software моделе буенча эшли. Сезгә күнегүләрдән соң төнлә утырып өйрәнәсе буш программа сатылмый. Безнең команда барлык эш чылбырларын һәм ЯИ-ярдәмчеләрне үзе җыя һәм сезгә әзер нәтиҗә тапшыра.',
      ),
    },
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
          <p className="portfolio-eyebrow">
            {t(
              'A4A · COMMERCIAL ENGINE & SERVICE PILLARS',
              'A4A · КОММЕРЧЕСКОЕ ЯДРО И ФОРМАТЫ РАБОТЫ',
              'A4A · КОММЕРЦИЯ ЮНӘЛЕШЕ ҺӘМ ЭШ ФОРМАТЛАРЫ',
            )}
          </p>
          <h1>
            {t(
              'Three productized pillars. Zero retainer traps.',
              'Три продуктовых формата. Никаких абонентских ловушек.',
              'Өч ачык эш форматы. Бернинди абонент тозагы юк.',
            )}
          </h1>
          <p>
            {t(
              'A4A builds practical digital back offices for grassroots clubs, academies, and athlete-founders. We deliver completed outcomes, not software you have to struggle to learn. Every sprint carries our 10-hour weekly relief guarantee and unconditionally pledges 4% of gross revenue to Parafencing 4 Progress (P4P).',
              'A4A выстраивает практичный цифровой бэк-офис для\u00A0спортивных клубов, академий и\u00A0проектов спортсменов. Мы передаём готовый результат, а\u00A0не\u00A0очередную сложную программу. Каждый спринт защищён гарантией экономии 10\u00A0часов в\u00A0неделю и\u00A0включает прямое отчисление 4% валовой выручки в\u00A0Parafencing 4 Progress (P4P).',
              'A4A спорт клублары, академияләр һәм спортчыларның проектлары өчен уңайлы цифрлы бэк-офис төзи. Без катлаулы программа түгел, ә\u00A0әзер эш нәтиҗәсе тапшырабыз. Һәр спринт атнага 10\u00A0сәгать вакытны янга калдыру гарантиясе белән ныгытылган һәм тулай керемнең 4 процентын Parafencing 4 Progress (P4P) юнәлешенә күчерә.',
            )}
          </p>
        </header>

        <section id="tiers" aria-label={t('Engagement pillars', 'Форматы работы', 'Эш форматлары')}>
          <div className="bulachak-branch-cards">
            {tiers.map((tier) => (
              <article
                key={tier.code}
                className="bulachak-branch-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={tier.highlight ? 'default' : 'outline'} className="font-mono">
                      {tier.code}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">{tier.sub}</span>
                  </div>
                  <h3>{tier.title}</h3>
                  <p className="text-2xl font-bold text-primary my-2">{tier.price}</p>
                  <p className="bulachak-branch-role font-mono text-xs">
                    {tier.engagementLength} · {tier.pricingShape}
                  </p>
                  <p className="bulachak-branch-description mt-3">{tier.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <Button
                    asChild
                    variant={tier.highlight ? 'default' : 'outline'}
                    className="w-full justify-between"
                  >
                    <Link href={tier.ctaHref}>
                      {tier.ctaLabel}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="case-evidence mt-12" aria-labelledby="guarantee-heading">
          <p className="portfolio-eyebrow">
            {t(
              'RISK REVERSAL · THE A4A PROMISE & 4% P4P PLEDGE',
              'ГАРАНТИЯ РЕЗУЛЬТАТА · ОБЯЗАТЕЛЬСТВО A4A И 4% В P4P',
              'НӘТИҖӘ ГАРАНТИЯСЕ · A4A ЙӨКЛӘМӘСЕ ҺӘМ P4P ФАЙДАСЫНА 4%',
            )}
          </p>
          <h2 id="guarantee-heading">
            {t(
              'The 10-Hour Operational Relief Guarantee.',
              'Гарантия освобождения 10 часов в\u00A0неделю.',
              'Атнага 10 сәгать вакытны бушату гарантиясе.',
            )}
          </h2>
          <p>
            {t(
              'If your A4A Sport Ops Sprint does not uncover at least 10 hours of weekly administrative time savings and establish a clear path to recover your investment within 60 days, we continue working for free until it does, or refund your fee in full. Every engagement also transfers 4% of gross revenue directly to Parafencing 4 Progress (P4P) for adaptive wheelchairs and coaching ahead of LA28.',
              'Если ваш спринт A4A не\u00A0высвобождает минимум 10\u00A0часов административной работы в\u00A0неделю и\u00A0не\u00A0создаёт понятный план возврата вложений за\u00A060\u00A0дней, мы продолжаем работу бесплатно до\u00A0результата или\u00A0возвращаем оплату полностью. Кроме того, 4% валовой выручки каждого проекта перечисляются в\u00A0Parafencing 4 Progress (P4P) на\u00A0коляски и\u00A0подготовку тренеров к\u00A0LA28.',
              'Әгәр A4A спринты атнага кимендә 10\u00A0сәгать административ эшне киметмәсә һәм 60\u00A0көн эчендә чыгымнарны каплау юлын булдырмаса, без нәтиҗәгә кадәр бушлай эшлибез яки түләүне тулысынча кайтарабыз. Һәр килешүдән тулай керемнең 4 проценты LA28 алдыннан махсус коляскалар һәм тренерлар әзерләү өчен Parafencing 4 Progress (P4P) фондына күчерелә.',
            )}
          </p>
          <div className="case-evidence-links">
            <Button asChild>
              <Link href="/audit">
                {t('Take 15-Min Ops Audit', 'Пройти 15-минутный аудит', '15 минутлык аудит узу')}
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
              <Link href="/intake/federation">
                {t('Federation Briefing', 'Брифинг для федераций', 'Федерацияләр өчен брифинг')}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-14 pt-10 border-t border-border" aria-labelledby="pricing-faq-title">
          <div className="portfolio-section-heading mb-8">
            <div>
              <p className="portfolio-eyebrow">
                {t('A4A · FAQ', 'A4A · ВОПРОСЫ И ОТВЕТЫ', 'A4A · СОРАУЛАР ҺӘМ ҖАВАПЛАР')}
              </p>
              <h2 id="pricing-faq-title">
                {t(
                  'Questions on scope, ownership, and hand-off.',
                  'Вопросы о\u00A0сроках, передаче прав и\u00A0гарантиях.',
                  'Вакыт, милек хокукы һәм гарантияләр турында сораулар.',
                )}
              </h2>
            </div>
            <p>
              {t(
                'How we structure agreements, transfer 100% of assets, and protect coach time without agency lock-in.',
                'Как мы строим договоры, передаём 100% наработок клубу и\u00A0бережем время тренеров.',
                'Килешүләрне ничек төзибез, барлык коралларны клубка ничек тапшырабыз һәм тренерлар вакытын ничек саклыйбыз.',
              )}
            </p>
          </div>
          <PricingFaq items={faqItems} />
        </section>

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
      </div>
    </main>
  );
}
