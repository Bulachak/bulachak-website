// Trilingual (en, ru, tt) Athlete-founder & academy operator intake form island (`src/components/custom/intake/athlete-form.tsx`).
// Submits to `POST /api/athlete-leads` (Google Sheets `Athlete_Intake` tab + Gmail alerts via Google Apps Script).

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PortfolioLink as Link } from '@/components/custom/portfolio/portfolio-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { apiFetch } from '@/lib/api-client';
import {
  AthleteLeadCreate,
  AthleteLeadItem,
  TRANSITION_STAGES,
  type TransitionStage,
} from '@/lib/contracts/athlete-leads';
import { applyServerErrors } from '@/lib/forms';
import { portfolioBrand } from '@/lib/portfolio-brand';

export function AthleteIntakeForm() {
  const { t } = usePortfolioLocale();
  const [success, setSuccess] = useState<AthleteLeadItem | null>(null);

  const transitionLabels: Record<TransitionStage, string> = {
    pre_retirement: t(
      'Active Athlete · Planning Academy or Post-Career Venture',
      'Действующий спортсмен · Запуск академии или проекта',
      'Гамәлдәге спортчы · Академия яки проект планлаштыру',
    ),
    early: t(
      'Early Launch · First 1–20 Athletes or Clients',
      'Ранний запуск · Первые 1–20 спортсменов или учеников',
      'Башлангыч этап · Беренче 1–20 спортчы яки укучы',
    ),
    mid: t(
      'Growing Club or Studio · 21–100 Athletes',
      'Растущий клуб или студия · 21–100 спортсменов',
      'Үсеп килүче клуб яки студия · 21–100 спортчы',
    ),
    late: t(
      'Established Academy · Scaling Multi-Coach Ops & Camps',
      'Устойчивая академия · Масштабирование тренеров и сборов',
      'Ныклы академия · Тренерлар һәм лагерьларны киңәйтү',
    ),
  };

  const form = useForm<AthleteLeadCreate>({
    resolver: zodResolver(AthleteLeadCreate),
    defaultValues: {
      name: '',
      email: '',
      sport: '',
      transitionStage: undefined,
      targetVenture: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(values: AthleteLeadCreate) {
    try {
      const created = await apiFetch('/api/athlete-leads', {
        method: 'POST',
        body: JSON.stringify(values),
        schema: AthleteLeadItem,
      });
      setSuccess(created);
      toast.success(
        t(
          'Received — your athlete & coach venture intake is logged.',
          'Анкета получена и сохранена.',
          'Анкетагыз кабул ителде һәм теркәлде.',
        ),
      );
      form.reset({
        name: '',
        email: '',
        sport: '',
        transitionStage: undefined,
        targetVenture: '',
      });
    } catch (err) {
      const applied = applyServerErrors((err as Error & { cause?: unknown }).cause, form.setError);
      if (!applied) {
        toast.error(
          t(
            'Something went wrong. Please check your inputs and try again.',
            'Не удалось отправить анкету. Проверьте введённые данные.',
            'Анкетаны җибәреп булмады. Мәгълүматны тикшереп кабат карагыз.',
          ),
        );
      }
    }
  }

  if (success) {
    const auditParams = new URLSearchParams({
      name: success.name,
      email: success.email,
      source: 'athlete-intake',
    });

    return (
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="flex flex-col gap-5 p-6 md:p-10">
          <p className="portfolio-eyebrow">
            {t(
              'INTAKE LOGGED · REPLY WITHIN 2 WORKING DAYS',
              'АНКЕТА ПРИНЯТА · ОТВЕТ В ТЕЧЕНИЕ 2 РАБОЧИХ ДНЕЙ',
              'АНКЕТА КАБУЛ ИТЕЛДЕ · 2 ЭШ КӨНЕНДӘ ҖАВАП',
            )}
          </p>
          <h2 className="text-2xl font-bold">
            {t(
              `Thank you, ${success.name} — we have your intake.`,
              `Спасибо, ${success.name} — ваша анкета принята.`,
              `Рәхмәт, ${success.name} — анкетагыз кабул ителде.`,
            )}
          </h2>
          <p className="text-muted-foreground">
            {t(
              'Kamilla Gafurzianova and the A4A team have logged your details and will reply within two working days with a 20-minute walkthrough slot. While you wait, you can also run our interactive 15-Minute Operational Leak Audit with your details pre-filled.',
              'Камилла Гафурзянова и\u00A0команда A4A получили ваши данные и\u00A0ответят в\u00A0течение двух рабочих дней для\u00A0согласования 20-минутной встречи. Пока вы ждёте, можно пройти интерактивный 15-минутный аудит операционных потерь.',
              'Камилла Гафурзянова һәм A4A командасы мәгълүматыгызны алды һәм ике эш көне эчендә 20 минутлык очрашу вакытын тәкъдим итәчәк. Шулай ук 15 минутлык операцион аудитны да уза аласыз.',
            )}
          </p>
          <Separator />
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>{t('Reference ID', 'Номер заявки', 'Гариза номеры')}</span>
              <span className="font-mono text-foreground">{success.id.slice(0, 8)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('Reply window', 'Срок ответа', 'Җавап вакыты')}</span>
              <span className="font-mono">
                {t('Within 2 working days', 'До 2 рабочих дней', '2 эш көне эчендә')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('Walkthrough length', 'Длительность встречи', 'Очрашу вакыты')}</span>
              <span className="font-mono">{t('20 minutes', '20 минут', '20 минут')}</span>
            </div>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={`/audit?${auditParams.toString()}`}>
                {t('Run 15-Min Ops Leak Audit', 'Пройти 15-мин аудит', '15 мин аудит узу')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">
                {t('See Engagement Pillars', 'Тарифы и форматы', 'Хезмәт форматлары')}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/a4a">{t('About A4A', 'О направлении A4A', 'A4A турында')}</Link>
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
            'A4A · ATHLETE & COACH INTAKE · 5 FIELDS',
            'A4A · АНКЕТА СПОРТСМЕНА И ТРЕНЕРА · 5 ПОЛЕЙ',
            'A4A · СПОРТЧЫ ҺӘМ ТРЕНЕР АНКЕТАСЫ · 5 КЫР',
          )}
        </p>

        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('Your name & role', 'Ваше имя и роль', 'Исемегез һәм вазифагыз')}
                  </FormLabel>
                  <FormDescription>
                    {t(
                      'Athlete-founder, head coach, or academy director.',
                      'Спортсмен-основатель, главный тренер или руководитель академии.',
                      'Проект башлаучы спортчы, баш тренер яки академия җитәкчесе.',
                    )}
                  </FormDescription>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder={t(
                        'e.g. Alex Morgan, Head Coach & Founder',
                        'например, Алексей Морозов, главный тренер и основатель',
                        'мәсәлән, Айрат Вәлиев, баш тренер һәм нигез салучы',
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Email address', 'Электронная почта', 'Электрон почта')}</FormLabel>
                  <FormDescription>
                    {t(
                      'Where we send your intake confirmation and 20-minute walkthrough slot.',
                      'Куда мы отправим подтверждение и приглашение на 20-минутный разбор.',
                      'Раслау хаты һәм 20 минутлык очрашуга сылтама җибәрелә торган адрес.',
                    )}
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@youracademy.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(
                      'Sport, discipline & background',
                      'Вид спорта, дисциплина и опыт',
                      'Спорт төре, дисциплина һәм тәҗрибә',
                    )}
                  </FormLabel>
                  <FormDescription>
                    {t(
                      'Your sport and the academy, club, camp, or coaching practice you run or are launching.',
                      'Ваш вид спорта и клуб, академия, лагерь или тренерская практика.',
                      'Спорт төрегез һәм сез җитәкләгән яки башлап җибәрә торган клуб, академия яки лагерь.',
                    )}
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder={t(
                        'e.g. Fencing (Foil), Olympic team / Youth Academy Director',
                        'например, фехтование на рапирах, сборная / директор детской академии',
                        'мәсәлән, рапирада фехтование, җыелма команда / балалар академиясе директоры',
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transitionStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(
                      'Current operating stage',
                      'Текущий этап проекта',
                      'Проектның хәзерге этабы',
                    )}
                  </FormLabel>
                  <FormDescription>
                    {t(
                      'Where your academy, camp, or athlete-led venture currently sits.',
                      'На какой стадии сейчас находится ваш клуб, лагерь или проект.',
                      'Клубыгыз, лагерегыз яки проектыгыз хәзер кайсы баскычта тора.',
                    )}
                  </FormDescription>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            'Choose your current stage',
                            'Выберите текущий этап',
                            'Хәзерге этапны сайлагыз',
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSITION_STAGES.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {transitionLabels[stage]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetVenture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(
                      'What you are building & biggest admin bottleneck',
                      'Что вы развиваете и главная операционная проблема',
                      'Нәрсә төзисез һәм төп административ кыенлык',
                    )}
                  </FormLabel>
                  <FormDescription>
                    {t(
                      'One short paragraph on your club, camp, or venture and what currently consumes most of your weekly admin hours.',
                      'Коротко опишите ваш клуб, сборы или проект и то, на что сейчас уходит больше всего ручного времени.',
                      'Клубыгыз, җыеннарыгыз яки проектыгыз һәм хәзер иң күп вакытны ала торган кул эшләре турында кыскача языгыз.',
                    )}
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder={t(
                        'e.g. Launching a youth fencing academy and summer camp series; currently spending 12+ hours a week answering parent messages on WhatsApp, chasing tuition payments, and managing paper waivers.',
                        'например, запускаем детскую академию фехтования и летние сборы; сейчас тратим более 12 часов в неделю на ответы родителям в мессенджерах, сверку оплат и бумажные согласия.',
                        'мәсәлән, балалар фехтование академиясен һәм җәйге җыеннарны башлыйбыз; хәзер атнага 12 сәгатьтән артык вакыт ата-аналарга җавап бирүгә, түләүләрне тикшерүгә һәм кәгазь гаризаларга китә.',
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {t(
                  'Direct founder review',
                  'Прямой разбор основательницей',
                  'Нигез салучы белән туры элемтә',
                )}{' '}
                ·{' '}
                <a
                  href={`mailto:${portfolioBrand.contactEmail}`}
                  className="font-mono text-foreground hover:text-primary hover:underline"
                >
                  {portfolioBrand.contactEmail}
                </a>
              </p>
              <Button
                type="submit"
                size="lg"
                className="sm:w-auto"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? t('Submitting…', 'Отправка…', 'Җибәрелә…')
                  : t('Submit Athlete Intake', 'Отправить анкету', 'Анкетаны җибәрү')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
