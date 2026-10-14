// Trilingual (en, ru, tt) Federation, NGB & Adaptive Program briefing form island (`src/components/custom/intake/federation-form.tsx`).
// Submits via `POST /api/launch-leads` to the Google Sheets CRM (`Silent_Launch_Leads`).

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { apiFetch } from '@/lib/api-client';
import {
  type LaunchBranch,
  type LaunchLeadCreate,
  LaunchLeadItem,
} from '@/lib/contracts/launch-leads';
import { portfolioBrand } from '@/lib/portfolio-brand';

const FEDERATION_TRACK_IDS = [
  'cohort_accelerator',
  'p4p_club_launch',
  'la28_municipal',
  'coach_education',
] as const;

type FederationTrackId = (typeof FEDERATION_TRACK_IDS)[number];

export function FederationIntakeForm() {
  const { language, t } = usePortfolioLocale();
  const [organization, setOrganization] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trackId, setTrackId] = useState<FederationTrackId>('cohort_accelerator');
  const [programBrief, setProgramBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<LaunchLeadItem | null>(null);

  const federationTracks: Record<
    FederationTrackId,
    { readonly label: string; readonly branch: LaunchBranch }
  > = {
    cohort_accelerator: {
      label: t(
        'A4A Sponsored Cohort Accelerator (6–8 Member Clubs Digital Modernization)',
        'A4A · Когортный акселератор для федерации (модернизация 6–8 клубов)',
        'A4A · Федерация клублары өчен когорта акселераторы (6–8 клубны яңарту)',
      ),
      branch: 'A4A',
    },
    p4p_club_launch: {
      label: t(
        'P4P · Parafencing Club Launch, Wheelchair Frames & Starter Toolkit',
        'P4P · Запуск секции парафехтования, коляски, рамы и стартовый комплект',
        'P4P · Парафехтование бүлеген башлау, коляскалар, рамалар һәм башлангыч җыелма',
      ),
      branch: 'P4P',
    },
    la28_municipal: {
      label: t(
        'LA28 Legacy & Municipal Youth / Adaptive Sport Partnership (PlayLA Model)',
        'Партнёрство к LA28 и муниципальные детские / адаптивные программы (модель PlayLA)',
        'LA28 мирасы һәм муниципаль балалар / адаптив спорт программалары (PlayLA моделе)',
      ),
      branch: 'P4P',
    },
    coach_education: {
      label: t(
        'Adaptive Coach Education, Regional Clinic, or Joint Grant Initiative',
        'Обучение тренеров по парафехтованию, региональный сбор или совместный грант',
        'Парафехтование тренерларын укыту, төбәк семинары яки уртак грант проекты',
      ),
      branch: 'P4P',
    },
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!organization.trim() || !name.trim() || !email.trim() || !programBrief.trim()) {
      toast.error(
        t(
          'Please complete all five briefing fields.',
          'Пожалуйста, заполните все пять полей брифинга.',
          'Зинһар, брифингның барлык биш кырын да тутырыгыз.',
        ),
      );
      return;
    }

    const selectedTrack = federationTracks[trackId];

    const composedMessage = [
      `Organization: ${organization.trim()}`,
      `Track: ${selectedTrack.label}`,
      `Brief: ${programBrief.trim()}`,
    ]
      .join(' | ')
      .slice(0, 1000);

    setIsSubmitting(true);
    try {
      const payload: LaunchLeadCreate = {
        name: `${name.trim()} (${organization.trim()})`.slice(0, 120),
        email: email.trim(),
        branch: selectedTrack.branch,
        message: composedMessage,
        locale: language,
        source: 'federation-intake',
      };

      const created = await apiFetch('/api/launch-leads', {
        method: 'POST',
        body: JSON.stringify(payload),
        schema: LaunchLeadItem,
      });

      setSubmitted(created);
      toast.success(
        t(
          'Received — your federation & adaptive program brief is logged.',
          'Заявка на брифинг получена и сохранена.',
          'Брифинг гаризасы кабул ителде һәм теркәлде.',
        ),
      );
    } catch {
      toast.error(
        t(
          'Could not submit brief. Please verify your email address and try again.',
          'Не удалось отправить брифинг. Проверьте адрес почты и попробуйте снова.',
          'Брифингны җибәреп булмады. Почта адресын тикшереп кабат карагыз.',
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="flex flex-col gap-5 p-6 md:p-10">
          <p className="portfolio-eyebrow">
            {t(
              'BRIEFING LOGGED · REPLY WITHIN 2 WORKING DAYS',
              'БРИФИНГ ПРИНЯТ · ОТВЕТ В ТЕЧЕНИЕ 2 РАБОЧИХ ДНЕЙ',
              'БРИФИНГ КАБУЛ ИТЕЛДЕ · 2 ЭШ КӨНЕНДӘ ҖАВАП',
            )}
          </p>
          <h2 className="text-2xl font-bold">
            {t(
              'Thank you — we have your federation & program brief.',
              'Спасибо — мы получили ваш брифинг.',
              'Рәхмәт — программагыз буенча брифинг кабул ителде.',
            )}
          </h2>
          <p className="text-muted-foreground">
            {t(
              `Kamilla Gafurzianova and the Bulachak team have logged your briefing for ${organization} and will reply within two working days with a 30-minute scoping slot.`,
              `Камилла Гафурзянова и команда Bulachak получили заявку от ${organization} и свяжутся с вами в течение двух рабочих дней для согласования 30-минутного брифинга.`,
              `Камилла Гафурзянова һәм Bulachak командасы ${organization} гаризасын алды һәм ике эш көне эчендә 30 минутлык сөйләшү вакытын билгеләү өчен элемтәгә керәчәк.`,
            )}
          </p>
          <Separator />
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>{t('Reference ID', 'Номер заявки', 'Гариза номеры')}</span>
              <span className="font-mono text-foreground">{submitted.id.slice(0, 8)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('Reply window', 'Срок ответа', 'Җавап вакыты')}</span>
              <span className="font-mono">
                {t('Within 2 working days', 'До 2 рабочих дней', '2 эш көне эчендә')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('Briefing length', 'Длительность брифинга', 'Брифинг вакыты')}</span>
              <span className="font-mono">{t('30 minutes', '30 минут', '30 минут')}</span>
            </div>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/pricing">
                {t('See Cohort & Pillar Pricing', 'Тарифы и форматы', 'Хезмәт форматлары')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/p4p">{t('Read About P4P', 'О направлении P4P', 'P4P турында уку')}</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                setSubmitted(null);
                setProgramBrief('');
              }}
            >
              {t('Submit Another Brief', 'Отправить ещё одну заявку', 'Тагын бер гариза җибәрү')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="flex flex-col gap-6 p-6 md:p-10">
        <p className="portfolio-eyebrow">
          {t(
            'A4A × P4P · INSTITUTIONAL BRIEFING · 5 FIELDS',
            'A4A × P4P · ИНСТИТУЦИОНАЛЬНЫЙ БРИФИНГ · 5 ПОЛЕЙ',
            'A4A × P4P · ИНСТИТУЦИОНАЛЬ БРИФИНГ · 5 КЫР',
          )}
        </p>

        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="fed-organization">
              {t(
                '01 · Organization, Federation, or Department *',
                '01 · Организация, федерация или департамент *',
                '01 · Оешма, федерация яки департамент *',
              )}
            </Label>
            <p className="text-xs text-muted-foreground">
              {t(
                'National Governing Body (NGB), municipal recreation department, Paralympic committee, or regional sports foundation.',
                'Спортивная федерация, муниципальный департамент спорта, паралимпийский комитет или региональный фонд.',
                'Спорт федерациясе, муниципаль спорт бүлеге, паралимпия комитеты яки төбәк фонды.',
              )}
            </p>
            <Input
              id="fed-organization"
              name="organization"
              placeholder={t(
                'e.g. USA Fencing Regional Division / City Adaptive Sports Office',
                'например, Региональная федерация фехтования / Департамент адаптивного спорта',
                'мәсәлән, Фехтование федерациясе / Адаптив спорт бүлеге',
              )}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fed-name">
                {t(
                  '02 · Program Lead Name & Title *',
                  '02 · Имя и должность руководителя *',
                  '02 · Җитәкченең исеме һәм вазифасы *',
                )}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t(
                  'Director or program manager leading the initiative.',
                  'Директор или координатор программы.',
                  'Программа директоры яки координаторы.',
                )}
              </p>
              <Input
                id="fed-name"
                name="name"
                autoComplete="name"
                placeholder={t(
                  'e.g. Jordan Taylor, Program Director',
                  'например, координатор программ развития',
                  'мәсәлән, үсеш программалары директоры',
                )}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fed-email">
                {t('03 · Work Email *', '03 · Рабочая почта *', '03 · Эш почтасы *')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t(
                  'Where we send the confirmation and 30-minute briefing invite.',
                  'Куда мы отправим подтверждение и приглашение на 30-минутный брифинг.',
                  'Раслау һәм 30 минутлык брифингка чакыру җибәрелә торган адрес.',
                )}
              </p>
              <Input
                id="fed-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="director@federation.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fed-track">
              {t(
                '04 · Primary Program Track *',
                '04 · Основное направление партнёрства *',
                '04 · Хезмәттәшлекнең төп юнәлеше *',
              )}
            </Label>
            <p className="text-xs text-muted-foreground">
              {t(
                'Select the partnership or cohort model that best fits your current objective.',
                'Выберите формат партнёрства или когортной программы.',
                'Партнёрлык яки когорта программасы форматын сайлагыз.',
              )}
            </p>
            <select
              id="fed-track"
              name="track"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value as FederationTrackId)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {FEDERATION_TRACK_IDS.map((id) => (
                <option key={id} value={id}>
                  {federationTracks[id].label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fed-brief">
              {t(
                '05 · Program Scope, Equipment Needs & LA28 Timeline *',
                '05 · Масштаб программы, потребности в оборудовании и сроки *',
                '05 · Программа күләме, җиһаз ихтыяҗы һәм сроклар *',
              )}
            </Label>
            <p className="text-xs text-muted-foreground">
              {t(
                'Outline what you are launching or scaling: number of participating clubs, adaptive equipment needs (wheelchair fencing frames, mounting rigs, starter toolkits), coach certification goals, or target timeline.',
                'Опишите задачи программы: число клубов в когорте, потребность в колясках и рамах для парафехтования, обучение тренеров и желаемые сроки запуска.',
                'Программа бурычларын языгыз: когортадагы клублар саны, парафехтование коляскалары һәм рамаларына ихтыяҗ, тренерларны укыту максатлары һәм сроклар.',
              )}
            </p>
            <Textarea
              id="fed-brief"
              name="programBrief"
              rows={5}
              placeholder={t(
                'e.g. Sponsoring a 6-club operational modernization cohort ahead of the 2026–2028 Paralympic cycle, plus equipping 3 regional salles with wheelchair fencing frames and adaptive coach onboarding.',
                'например, запуск когорты из 6 клубов для модернизации процессов в цикле 2026–2028, а также оснащение 3 региональных залов рамами для парафехтования и обучение тренеров.',
                'мәсәлән, 2026–2028 циклында 6 клубтан торган когортаны яңарту, шулай ук 3 төбәк залын парафехтование рамалары белән җиһазлау һәм тренерларны әзерләү.',
              )}
              value={programBrief}
              onChange={(e) => setProgramBrief(e.target.value)}
              required
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {t(
                'Direct briefing inbox',
                'Прямая почта для брифингов',
                'Брифинглар өчен туры почта',
              )}{' '}
              ·{' '}
              <a
                href={`mailto:${portfolioBrand.contactEmail}`}
                className="font-mono text-foreground hover:text-primary hover:underline"
              >
                {portfolioBrand.contactEmail}
              </a>
            </p>
            <Button type="submit" size="lg" className="sm:w-auto" disabled={isSubmitting}>
              {isSubmitting
                ? t('Sending Brief…', 'Отправка…', 'Җибәрелә…')
                : t(
                    'Submit Program Brief',
                    'Отправить заявку на брифинг',
                    'Брифинг гаризасын җибәрү',
                  )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
