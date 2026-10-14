// Trilingual (en, ru, tt) Bulachak editorial view for /audit, /ru/audit, and /tt/audit.
'use client';

import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { apiFetch } from '@/lib/api-client';
import { AuditResult, type AuditSubmission, type BottleneckType } from '@/lib/contracts/audit';

export function AuditView() {
  const { language, t } = usePortfolioLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sportOrNiche, setSportOrNiche] = useState('');
  const [athleteCount, setAthleteCount] = useState<'1-20' | '21-50' | '51-100' | '100+'>('21-50');
  const [weeklyAdminHours, setWeeklyAdminHours] = useState(14);
  const [bottlenecks, setBottlenecks] = useState<BottleneckType[]>([
    'inquiry-leak',
    'manual-billing',
  ]);
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramOrg = params.get('org');
    const paramName = params.get('name');
    const paramEmail = params.get('email');
    const paramPhone = params.get('phone');
    const paramSource = params.get('source') || params.get('utm_source') || params.get('ref');

    if (paramOrg) setOrgName(paramOrg);
    if (paramName) setContactName(paramName);
    if (paramEmail) setEmail(paramEmail);
    if (paramPhone) setPhone(paramPhone);
    if (paramSource) setSource(paramSource);
  }, []);

  const bottleneckOptions: Array<{ id: BottleneckType; label: string; description: string }> = [
    {
      id: 'inquiry-leak',
      label: t(
        'Inquiry & Message Leakage',
        'Потеря заявок и сообщений родителей',
        'Гаризалар һәм ата-аналар хатлары югалу',
      ),
      description: t(
        'Unanswered parent DMs and lost registrations buried in email, Instagram, or WhatsApp.',
        'Неотвеченные сообщения и потерянные записи в почте, Instagram, Telegram или WhatsApp.',
        'Почтада, Instagram, Telegram яки WhatsApp эчендә югалган гаризалар һәм җавапсыз калган хатлар.',
      ),
    },
    {
      id: 'manual-billing',
      label: t(
        'Manual Billing & Payment Chasing',
        'Ручной сбор оплат и сверка переводов',
        'Түләүләрне кулдан җыю һәм тикшерү',
      ),
      description: t(
        'Manually verifying Zelle, Venmo, or checks and chasing overdue tuition.',
        'Ручная проверка переводов Zelle, Venmo или чеков и напоминания об оплате абонементов.',
        'Күчерүләрне кулдан тикшерү һәм абонемент түләүләре турында искә төшерү.',
      ),
    },
    {
      id: 'paper-waivers',
      label: t(
        'Paper Waivers & Lost Forms',
        'Бумажные согласия и анкеты',
        'Кәгазь ризалыклар һәм анкеталар',
      ),
      description: t(
        'Wrestling paper liability forms, medical clearances, and physical binders.',
        'Сбор бумажных согласий об ответственности, медицинских справок и хранение папок.',
        'Җаваплылык турында кәгазь гаризаларны, медицина белешмәләрен һәм папкаларны кулдан тутыру.',
      ),
    },
    {
      id: 'scheduling-friction',
      label: t(
        'Scheduling Friction & Reschedules',
        'Накладки в расписании и переносы',
        'Расписаниедәге өзеклекләр һәм күчерүләр',
      ),
      description: t(
        'Endless back-and-forth messages to coordinate private lessons and camp rosters.',
        'Бесконечные переписки для согласования индивидуальных уроков и списков на сборы.',
        'Индивидуаль дәресләрне һәм лагерь исемлекләрен килештерү өчен очсыз-кырыйсыз язышулар.',
      ),
    },
    {
      id: 'software-fatigue',
      label: t(
        'Software Fatigue & Tool Sprawl',
        'Усталость от сложных программ и таблиц',
        'Катлаулы программалардан һәм таблицалардан ару',
      ),
      description: t(
        'Paying for complex software subscriptions that coaches and parents avoid using.',
        'Оплата неудобных сервисов и таблиц, которыми тренеры и родители не хотят пользоваться.',
        'Тренерлар һәм ата-аналар кулланырга теләмәгән уңайсыз программалар өчен артык түләү.',
      ),
    },
  ];

  const toggleBottleneck = (id: BottleneckType) => {
    setBottlenecks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !email || !sportOrNiche) {
      toast.error(
        t(
          'Please fill in all required fields.',
          'Пожалуйста, заполните все обязательные поля.',
          'Зинһар, барлык мәҗбүри кырларны тутырыгыз.',
        ),
      );
      return;
    }
    if (bottlenecks.length === 0) {
      toast.error(
        t(
          'Please select at least one operational bottleneck.',
          'Выберите хотя бы одну операционную проблему.',
          'Кимендә бер операцион кыенлыкны сайлагыз.',
        ),
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: AuditSubmission = {
        organizationName: orgName,
        contactName,
        email,
        phone: phone || undefined,
        sportOrNiche,
        athleteCount,
        weeklyAdminHours,
        primaryBottlenecks: bottlenecks,
        notes: notes || undefined,
        source: source || `audit-${language}`,
      };

      const response = await apiFetch('/api/audit', {
        method: 'POST',
        body: JSON.stringify(payload),
        schema: AuditResult,
      });

      setResult(response);
      toast.success(
        t(
          'Operational diagnostic generated.',
          'Операционный расчёт готов.',
          'Операцион исәпләү әзер.',
        ),
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error(
        t(
          'Could not generate diagnostic. Please check your inputs.',
          'Не удалось сформировать расчёт. Проверьте введённые данные.',
          'Исәпләүне төзеп булмады. Кертелгән мәгълүматны тикшерегез.',
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              'A4A · OPS DIAGNOSTIC · 2-MINUTE ASSESSMENT',
              'A4A · ОПЕРАЦИОННАЯ ДИАГНОСТИКА · 2 МИНУТЫ',
              'A4A · ОПЕРАЦИОН ДИАГНОСТИКА · 2 МИНУТ',
            )}
          </p>
          <h1>
            {t(
              'The 15-Minute Operational Leak Audit.',
              '15-минутный аудит операционных потерь.',
              '15 минутлык операцион югалтулар аудиты.',
            )}
          </h1>
          <p>
            {t(
              'Identify where your sports academy, club, or venture loses 10 to 15+ hours each week to administrative drag, leaky inquiry forms, and manual billing. Receive an instant Operational Friction Score and a tailored 21-day sprint roadmap.',
              'Определите, где ваш спортивный клуб, академия или\u00A0проект теряет 10–15 часов в\u00A0неделю на\u00A0ручную переписку, потерянные заявки и\u00A0сверку оплат. Получите мгновенный расчёт операционной нагрузки и\u00A0план 21-дневного спринта.',
              'Спорт клубыгыз, академиягез яки проектыгыз атна саен кулдан язышу, югалган гаризалар һәм түләүләрне тикшерү аркасында 10–15 сәгать вакытын кайда югалтканын ачыклагыз. Операцион йөкләнеш исәбен һәм 21 көнлек спринт планын алыгыз.',
            )}
          </p>
        </header>

        {result ? (
          <section className="case-evidence" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <Badge
                variant={result.frictionLevel === 'Critical' ? 'destructive' : 'default'}
                className="font-mono uppercase"
              >
                {result.frictionLevel} ·{' '}
                {t('Operational Friction', 'Операционная нагрузка', 'Операцион йөкләнеш')}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                #{result.id.slice(0, 8)}
              </span>
            </div>

            <h2>
              {t('Diagnostic summary for ', 'Результаты диагностики: ', 'Диагностика нәтиҗәсе: ')}
              {result.organizationName}
            </h2>
            <p>
              {t('Prepared for ', 'Подготовлено для: ', 'Әзерләнде: ')}
              <strong>{result.contactName}</strong> · {sportOrNiche}
            </p>

            <div className="bulachak-branch-cards my-8">
              <article className="bulachak-branch-card">
                <p className="portfolio-eyebrow">
                  {t('FRICTION SCORE', 'ИНДЕКС НАГРУЗКИ', 'ЙӨКЛӘНЕШ ИНДЕКСЫ')}
                </p>
                <p className="text-4xl font-bold text-primary my-2">
                  {result.frictionScore}
                  <span className="text-lg font-normal text-muted-foreground">/100</span>
                </p>
                <p className="bulachak-branch-description">
                  {t(
                    'Current administrative drag index across intake, billing, and scheduling.',
                    'Текущий уровень административной нагрузки на приём заявок, оплаты и расписание.',
                    'Гаризалар кабул итү, түләүләр һәм расписание буенча агымдагы административ йөкләнеш.',
                  )}
                </p>
              </article>

              <article className="bulachak-branch-card">
                <p className="portfolio-eyebrow">
                  {t('HOURS RECOVERABLE', 'РЕЗЕРВ ВРЕМЕНИ', 'КАЙТАРЫП БУЛА ТОРГАН ВАКЫТ')}
                </p>
                <p className="text-4xl font-bold text-foreground my-2">
                  ~{result.estimatedWeeklyHoursWasted}
                  <span className="text-lg font-normal text-muted-foreground">
                    {t(' hrs/wk', ' ч/нед', ' сәг/атна')}
                  </span>
                </p>
                <p className="bulachak-branch-description">
                  {t(
                    'Weekly hours that can be returned to coaching, athlete development, and growth.',
                    'Часы в неделю, которые можно вернуть на тренерскую работу и развитие клуба.',
                    'Атна саен тренерлык эшенә һәм клубны үстерүгә кайтарып була торган сәгатьләр.',
                  )}
                </p>
              </article>

              <article className="bulachak-branch-card">
                <p className="portfolio-eyebrow">
                  {t('ANNUAL DRAG COST', 'ГОДОВЫЕ ПОТЕРИ', 'ЕЛЛЫК ЮГАЛТУЛАР')}
                </p>
                <p className="text-4xl font-bold text-foreground my-2">
                  ${result.estimatedAnnualCostOfDrag.toLocaleString()}
                </p>
                <p className="bulachak-branch-description">
                  {t(
                    'Estimated annual value lost to repetitive manual administration.',
                    'Оценка ежегодных потерь времени и выручки из-за ручной рутины.',
                    'Кабатланучы кул эшләре аркасында ел саен югала торган вакыт һәм керем бәясе.',
                  )}
                </p>
              </article>
            </div>

            <h3>
              {t(
                'Recommended immediate prescriptions',
                'Рекомендуемые первоочередные шаги',
                'Тәкъдим ителгән беренче адымнар',
              )}
            </h3>
            <ul className="space-y-3 my-4">
              {result.priorityPrescriptions.map((prescription, idx) => (
                <li
                  key={prescription}
                  className="flex items-start gap-3 rounded-md border border-border bg-card p-4 text-sm"
                >
                  <span className="font-mono font-bold text-primary">0{idx + 1}</span>
                  <span>{prescription}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-md border border-border bg-card p-6 my-6">
              <p className="portfolio-eyebrow">
                {t(
                  'RECOMMENDED ENGAGEMENT PILLAR',
                  'РЕКОМЕНДУЕМЫЙ ФОРМАТ ВНЕДРЕНИЯ',
                  'ТӘКЪДИМ ИТЕЛГӘН ЭШ ФОРМАТЫ',
                )}
              </p>
              <h4 className="text-xl font-bold mt-1">{result.recommendedPillar}</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  'Delivered as a 21-day turnkey sprint with zero ongoing software maintenance fees, backed by our 10-Hour Operational Relief Guarantee and our 4% gross revenue pledge to Parafencing 4 Progress (P4P).',
                  'Выполняется за\u00A021\u00A0день под\u00A0ключ без\u00A0ежемесячной абонентской платы, с\u00A0гарантией освобождения 10\u00A0часов в\u00A0неделю и\u00A0отчислением 4% выручки в\u00A0Parafencing 4 Progress (P4P).',
                  'Айлык абонент түләүсез 21\u00A0көн эчендә әзер килеш тапшырыла, атнага 10\u00A0сәгать вакытны бушату гарантиясе һәм Parafencing 4 Progress (P4P) файдасына 4% күчерү белән.',
                )}
              </p>
            </div>

            <div className="case-evidence-links">
              <Button asChild size="lg">
                <a href={result.bookingUrl}>
                  {t(
                    'Book 15-Min Walkthrough with Kamilla',
                    'Записаться на 15-мин разбор с Камиллой',
                    'Камилла белән 15 минутлык сөйләшүгә язылу',
                  )}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => setResult(null)}>
                {t(
                  'Adjust Inputs & Recalculate',
                  'Изменить данные и пересчитать',
                  'Мәгълүматны үзгәртеп яңадан исәпләү',
                )}
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/pricing">
                  {t('View Pricing & Pillars', 'Тарифы и форматы', 'Хезмәт форматлары')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        ) : (
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="portfolio-eyebrow">
                    {t(
                      '01 · ORGANIZATION & CONTACT',
                      '01 · ОРГАНИЗАЦИЯ И КОНТАКТЫ',
                      '01 · ОЕШМА ҺӘМ ЭЛЕМТӘ',
                    )}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="orgName">
                        {t(
                          'Club, Academy, or Venture Name *',
                          'Название клуба, академии или проекта *',
                          'Клуб, академия яки проект исеме *',
                        )}
                      </Label>
                      <Input
                        id="orgName"
                        placeholder={t(
                          'e.g. Westside Fencing Academy',
                          'например, Академия фехтования',
                          'мәсәлән, Фехтование академиясе',
                        )}
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="sportOrNiche">
                        {t(
                          'Sport or Discipline *',
                          'Вид спорта или направление *',
                          'Спорт төре яки юнәлеш *',
                        )}
                      </Label>
                      <Input
                        id="sportOrNiche"
                        placeholder={t(
                          'e.g. Fencing, Tennis, Martial Arts',
                          'например, фехтование, теннис, единоборства',
                          'мәсәлән, фехтование, теннис, көрәш',
                        )}
                        value={sportOrNiche}
                        onChange={(e) => setSportOrNiche(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="contactName">
                        {t('Your Name & Role *', 'Ваше имя и роль *', 'Исемегез һәм вазифагыз *')}
                      </Label>
                      <Input
                        id="contactName"
                        placeholder={t(
                          'e.g. Coach Alex, Head Director',
                          'например, старший тренер / руководитель',
                          'мәсәлән, өлкән тренер / җитәкче',
                        )}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">
                        {t('Email Address *', 'Электронная почта *', 'Электрон почта *')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="coach@academy.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone">
                        {t(
                          'Phone / WhatsApp (Optional)',
                          'Телефон / WhatsApp (необязательно)',
                          'Телефон / WhatsApp (мәҗбүри түгел)',
                        )}
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (310) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="athleteCount">
                        {t(
                          'Estimated Athletes / Members',
                          'Количество спортсменов / участников',
                          'Спортчылар / катнашучылар саны',
                        )}
                      </Label>
                      <select
                        id="athleteCount"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={athleteCount}
                        onChange={(e) =>
                          setAthleteCount(e.target.value as '1-20' | '21-50' | '51-100' | '100+')
                        }
                      >
                        <option value="1-20">
                          {t(
                            '1 – 20 Athletes (Starter / Studio)',
                            '1 – 20 спортсменов (малая группа / студия)',
                            '1 – 20 спортчы (башлангыч төркем / студия)',
                          )}
                        </option>
                        <option value="21-50">
                          {t(
                            '21 – 50 Athletes (Growing Academy)',
                            '21 – 50 спортсменов (растущий клуб)',
                            '21 – 50 спортчы (үсеп килүче клуб)',
                          )}
                        </option>
                        <option value="51-100">
                          {t(
                            '51 – 100 Athletes (Established Club)',
                            '51 – 100 спортсменов (устойчивая академия)',
                            '51 – 100 спортчы (ныклы академия)',
                          )}
                        </option>
                        <option value="100+">
                          {t(
                            '100+ Athletes (Multi-Coach / Regional)',
                            '100+ спортсменов (несколько тренеров / регион)',
                            '100+ спортчы (берничә тренер / төбәк үзәге)',
                          )}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-border pt-6">
                  <div className="flex justify-between items-baseline">
                    <p className="portfolio-eyebrow">
                      {t(
                        '02 · WEEKLY ADMINISTRATIVE BURDEN',
                        '02 · ЕЖЕНЕДЕЛЬНАЯ АДМИНИСТРАТИВНАЯ НАГРУЗКА',
                        '02 · АТНАЛЫК АДМИНИСТРАТИВ ЙӨКЛӘНЕШ',
                      )}
                    </p>
                    <span className="font-mono text-2xl font-bold text-primary">
                      {weeklyAdminHours} {t('hrs/week', 'ч/неделю', 'сәг/атна')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      'Estimate total weekly hours spent on parent messages, roster changes, billing inquiries, and manual spreadsheets across your coaching staff.',
                      'Оцените общее число часов в\u00A0неделю, которое уходит у\u00A0вас и\u00A0тренеров на\u00A0переписку с\u00A0родителями, переносы, сверку оплат и\u00A0таблицы.',
                      'Сезнең һәм тренерларның ата-аналар белән язышуга, дәресләрне күчерүгә, түләүләрне тикшерүгә һәм таблицаларга атнага ничә сәгать вакыт сарыф иткәнен бәяләгез.',
                    )}
                  </p>
                  <input
                    type="range"
                    min={2}
                    max={45}
                    step={1}
                    value={weeklyAdminHours}
                    onChange={(e) => setWeeklyAdminHours(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-md"
                  />
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>{t('Light (2–5 hrs)', 'Умеренно (2–5 ч)', 'Аз (2–5 сәг)')}</span>
                    <span>
                      {t('Typical (12–18 hrs)', 'Обычно (12–18 ч)', 'Уртача (12–18 сәг)')}
                    </span>
                    <span>
                      {t('Severe (25–45+ hrs)', 'Критично (25–45+ ч)', 'Күп (25–45+ сәг)')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-border pt-6">
                  <p className="portfolio-eyebrow">
                    {t(
                      '03 · PRIMARY OPERATIONAL CHOKE POINTS',
                      '03 · ОСНОВНЫЕ УЗКИЕ МЕСТА В ПРОЦЕССАХ',
                      '03 · ЭШ БАРЫШЫНДАГЫ ТӨП КЫЕНЛЫКЛАР',
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      'Select all bottlenecks that currently create friction in your program:',
                      'Отметьте все пункты, которые создают потери времени в вашей работе:',
                      'Эшегездә вакыт югалтуга китергән барлык пунктларны билгеләгез:',
                    )}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {bottleneckOptions.map((option) => {
                      const isSelected = bottlenecks.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleBottleneck(option.id)}
                          className={`flex flex-col text-left p-4 rounded-md border transition-colors ${
                            isSelected
                              ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                              : 'border-border bg-background/60 hover:border-primary/40'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-sm text-foreground">
                              {option.label}
                            </span>
                            <span
                              className={`h-4 w-4 rounded-sm border flex items-center justify-center text-[10px] ${
                                isSelected
                                  ? 'bg-primary border-primary text-primary-foreground font-bold'
                                  : 'border-muted-foreground'
                              }`}
                            >
                              {isSelected ? '✓' : ''}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-border pt-6">
                  <Label htmlFor="notes">
                    {t(
                      '04 · Additional Operational Notes (Optional)',
                      '04 · Дополнительные комментарии (необязательно)',
                      '04 · Өстәмә искәрмәләр (мәҗбүри түгел)',
                    )}
                  </Label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder={t(
                      'Upcoming camp launches, seasonal registration deadlines, or specific tools you currently use...',
                      'Расскажите о предстоящем наборе, сезонных сборах или текущих таблицах и сервисах...',
                      'Алдагы җыеннар, сезонлы язылу вакытлары яки хәзер кулланыла торган кораллар турында языгыз...',
                    )}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting
                      ? t(
                          'Calculating Operational Friction…',
                          'Расчёт операционной нагрузки…',
                          'Операцион йөкләнеш исәпләнә…',
                        )
                      : t(
                          'Generate Operational Diagnostic',
                          'Сформировать операционный расчёт',
                          'Операцион диагностиканы төзү',
                        )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
