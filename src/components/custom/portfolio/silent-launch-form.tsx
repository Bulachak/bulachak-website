// @polsia:user-owned — Inline 10-second YC Silent Launch capture form for bulachak.com (EN / RU / TT).
'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { apiFetch } from '@/lib/api-client';
import {
  LAUNCH_BRANCHES,
  type LaunchBranch,
  type LaunchLeadCreate,
  LaunchLeadItem,
} from '@/lib/contracts/launch-leads';
import { portfolioBrand } from '@/lib/portfolio-brand';
import type { PortfolioLanguage } from '@/lib/portfolio-locale';

type FormCopy = {
  eyebrow: string;
  heading: string;
  subheading: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  branchLabel: string;
  branchOptions: Record<LaunchBranch, string>;
  noteLabel: string;
  notePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  privacyNote: string;
  toastSuccess: string;
  toastError: string;
  confirmedEyebrow: string;
  confirmedHeading: (name: string) => string;
  confirmedBody: string;
  auditCtaLabel: string;
  resetLabel: string;
};

const FORM_COPY: Record<PortfolioLanguage, FormCopy> = {
  en: {
    eyebrow: 'Early Access & Partner Inquiry · 10\u00A0Seconds',
    heading: 'Request early access or\u00A0start a\u00A0conversation',
    subheading:
      'Leave your contact details and select your focus area. We\u00A0log every inquiry directly and follow\u00A0up within two working days.',
    nameLabel: 'Your name *',
    namePlaceholder: 'Alex Morgan',
    emailLabel: 'Email address *',
    emailPlaceholder: 'you@organization.com',
    branchLabel: 'Focus branch *',
    branchOptions: {
      A4A: 'A4A · Agents 4 Athletes (Sport Ops & Tools)',
      P4P: 'P4P · Parafencing 4 Progress (Adaptive Fencing)',
      I4I: 'I4I · Immigrant 4 Immigrant (Community & Venture Support)',
      GENERAL: 'Bulachak · General Partnership',
    },
    noteLabel: 'Short note (optional)',
    notePlaceholder: 'Club, venture, or how we can collaborate...',
    submitLabel: 'Connect with Bulachak',
    submittingLabel: 'Sending...',
    privacyNote: 'Direct founder review · Zero spam · bulachak.com',
    toastSuccess: 'Received — thank you for connecting with Bulachak.',
    toastError: 'Please check your name and email address.',
    confirmedEyebrow: 'INQUIRY LOGGED · BULACHAK.COM',
    confirmedHeading: (name) => `Thank you, ${name} — we have your details.`,
    confirmedBody:
      'Your inquiry is saved. If you run a sports club, academy, or athlete venture, you can also run our interactive 15-Minute Operational Leak Audit right now with your details pre-filled.',
    auditCtaLabel: 'Launch 15-Min Ops Audit',
    resetLabel: 'Send another note',
  },
  ru: {
    eyebrow: 'Ранний доступ и\u00A0партнёрство · 10\u00A0секунд',
    heading: 'Запросить ранний доступ или\u00A0начать диалог',
    subheading:
      'Оставьте контакты и\u00A0выберите направление. Мы\u00A0фиксируем каждое обращение напрямую и\u00A0отвечаем в\u00A0течение двух рабочих дней.',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Алексей Смирнов',
    emailLabel: 'Электронная почта *',
    emailPlaceholder: 'you@organization.com',
    branchLabel: 'Направление *',
    branchOptions: {
      A4A: 'A4A · Агенты для спортсменов (Операционка и ИИ)',
      P4P: 'P4P · Парафехтование ради развития (Адаптивный спорт)',
      I4I: 'I4I · Иммигрант для иммигранта (Сообщество и бизнес)',
      GENERAL: 'Bulachak · Общее партнёрство',
    },
    noteLabel: 'Короткий комментарий (необязательно)',
    notePlaceholder: 'Клуб, проект или формат сотрудничества...',
    submitLabel: 'Связаться с Bulachak',
    submittingLabel: 'Отправка...',
    privacyNote: 'Прямая связь с\u00A0основательницей · Без\u00A0спама · bulachak.com',
    toastSuccess: 'Запрос получен — спасибо за обращение в Bulachak.',
    toastError: 'Пожалуйста, проверьте имя и корректность email.',
    confirmedEyebrow: 'ЗАПРОС ПРИНЯТ · BULACHAK.COM',
    confirmedHeading: (name) => `Спасибо, ${name} — мы получили ваш запрос.`,
    confirmedBody:
      'Ваши контакты сохранены. Если вы руководите спортивным клубом, академией или проектом, вы можете прямо сейчас пройти интерактивный 15-минутный аудит операционных потерь.',
    auditCtaLabel: 'Пройти 15-минутный аудит',
    resetLabel: 'Отправить ещё одно сообщение',
  },
  tt: {
    eyebrow: 'Иртә керү һәм\u00A0хезмәттәшлек · 10\u00A0секунд',
    heading: 'Иртә керү сорарга яки\u00A0элемтәгә чыгарга',
    subheading:
      'Элемтә өчен\u00A0мәгълүмат калдырыгыз һәм\u00A0юнәлешне сайлагыз. Без\u00A0һәр мөрәҗәгатьне теркибез һәм\u00A0ике эш көне эчендә җавап бирәбез.',
    nameLabel: 'Исемегез *',
    namePlaceholder: 'Илдар Хәкимов',
    emailLabel: 'Электрон почта *',
    emailPlaceholder: 'you@organization.com',
    branchLabel: 'Юнәлеш *',
    branchOptions: {
      A4A: 'A4A · Спортчылар өчен агентлар (Спорт кораллары)',
      P4P: 'P4P · Үсеш өчен парафехтование (Адаптив спорт)',
      I4I: 'I4I · Иммигрант иммигрант өчен (Берләшмә һәм ярдәм)',
      GENERAL: 'Bulachak · Гомуми хезмәттәшлек',
    },
    noteLabel: 'Кыскача искәрмә (мәҗбүри түгел)',
    notePlaceholder: 'Клуб, проект яки хезмәттәшлек темасы...',
    submitLabel: 'Bulachak белән бәйләнешкә керү',
    submittingLabel: 'Җибәрелә...',
    privacyNote: 'Нигез салучы белән\u00A0туры элемтә · Спамсыз · bulachak.com',
    toastSuccess: 'Рәхмәт — мөрәҗәгатегез кабул ителде.',
    toastError: 'Зинһар, исемегезне һәм электрон почтагызны тикшерегез.',
    confirmedEyebrow: 'КАБУЛ ИТЕЛДЕ · BULACHAK.COM',
    confirmedHeading: (name) => `Рәхмәт, ${name} — мәгълүматыгыз теркәлде.`,
    confirmedBody:
      'Спорт клубы яки оешма белән эшләсәгез, хәзер үк 15 минутлык эшчәнлек аудитын да үтә аласыз.',
    auditCtaLabel: '15 минутлык аудитны башлау',
    resetLabel: 'Яңа хәбәр җибәрү',
  },
};

export function SilentLaunchForm() {
  const { language } = usePortfolioLocale();
  const copy = FORM_COPY[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState<LaunchBranch>('A4A');
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('bulachak-home');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<LaunchLeadItem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = params.get('utm_source') || params.get('ref') || params.get('source');
    if (utm) {
      setSource(utm.slice(0, 100));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    if (!name.trim() || !email.trim()) {
      toast.error(copy.toastError);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: LaunchLeadCreate = {
        name: name.trim(),
        email: email.trim(),
        branch,
        message: message.trim() || undefined,
        locale: language,
        source,
      };

      const created = await apiFetch('/api/launch-leads', {
        method: 'POST',
        body: JSON.stringify(payload),
        schema: LaunchLeadItem,
      });

      setSubmitted(created);
      toast.success(copy.toastSuccess);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      const cause = (err as Error & { cause?: { errors?: Record<string, string> } }).cause;
      if (cause?.errors && typeof cause.errors === 'object') {
        setFieldErrors(cause.errors);
      }
      toast.error(copy.toastError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bulachak-launch-card is-confirmed" aria-live="polite">
        <div className="bulachak-launch-badge">
          <Check size={14} aria-hidden="true" />
          <span>{copy.confirmedEyebrow}</span>
        </div>
        <h3>{copy.confirmedHeading(submitted.name)}</h3>
        <p className="bulachak-launch-sub">{copy.confirmedBody}</p>
        <div className="bulachak-home-connect-actions mt-5">
          <Button asChild size="lg" className="shadow-brand">
            <NextLink href={submitted.auditPrefillUrl}>
              {copy.auditCtaLabel}
              <ArrowUpRight size={17} aria-hidden="true" />
            </NextLink>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setSubmitted(null)}>
            {copy.resetLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bulachak-launch-card">
      <div className="bulachak-launch-header">
        <p className="portfolio-eyebrow">{copy.eyebrow}</p>
        <h3>{copy.heading}</h3>
        <p className="bulachak-launch-sub">{copy.subheading}</p>
      </div>

      <div className="bulachak-launch-grid">
        <div className="bulachak-launch-field">
          <Label htmlFor="silent-launch-name">{copy.nameLabel}</Label>
          <Input
            id="silent-launch-name"
            name="name"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {fieldErrors.name ? (
            <p className="bulachak-launch-error" role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="bulachak-launch-field">
          <Label htmlFor="silent-launch-email">{copy.emailLabel}</Label>
          <Input
            id="silent-launch-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {fieldErrors.email ? (
            <p className="bulachak-launch-error" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="bulachak-launch-field">
          <Label htmlFor="silent-launch-branch">{copy.branchLabel}</Label>
          <select
            id="silent-launch-branch"
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value as LaunchBranch)}
            className="bulachak-launch-select"
          >
            {LAUNCH_BRANCHES.map((code) => (
              <option key={code} value={code}>
                {copy.branchOptions[code]}
              </option>
            ))}
          </select>
        </div>

        <div className="bulachak-launch-field">
          <Label htmlFor="silent-launch-note">{copy.noteLabel}</Label>
          <Input
            id="silent-launch-note"
            name="message"
            placeholder={copy.notePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="bulachak-launch-footer">
        <p className="bulachak-launch-meta">
          {copy.privacyNote} ·{' '}
          <a href={`mailto:${portfolioBrand.contactEmail}`}>{portfolioBrand.contactEmail}</a>
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="shadow-brand">
          {isSubmitting ? copy.submittingLabel : copy.submitLabel}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
