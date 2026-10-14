'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { apiFetch } from '@/lib/api-client';
import {
  type AttendeeRole,
  WebinarRegistration,
  type WebinarResponse,
} from '@/lib/contracts/webinar';
import { type PortfolioLanguage, portfolioHref } from '@/lib/portfolio-locale';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  actionText: string;
  actionHref: string;
};

type WebinarLocaleCopy = {
  eyebrow: string;
  badgeFormat: string;
  badgeSession: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  auditCta: string;
  metaLabels: {
    schedule: string;
    scheduleValue: string;
    scheduleSub: string;
    duration: string;
    durationValue: string;
    durationSub: string;
    languages: string;
    languagesValue: string;
    languagesSub: string;
  };
  speakersEyebrow: string;
  speakersTitle: string;
  speakers: Array<{
    badge: string;
    name: string;
    role: string;
    bio: string;
    highlights: string[];
  }>;
  agendaEyebrow: string;
  agendaTitle: string;
  agendaLead: string;
  agendaItems: Array<{
    time: string;
    title: string;
    detail: string;
  }>;
  registerEyebrow: string;
  registerTitle: string;
  registerLead: string;
  confirmedBadge: string;
  confirmedTitlePrefix: string;
  confirmedLeadPrefix: string;
  dateLabel: string;
  timeLabel: string;
  downloadIcsLabel: string;
  AuditPrefillLabel: string;
  registerAnotherLabel: string;
  fields: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    roleLabel: string;
    organizationLabel: string;
    organizationPlaceholder: string;
    challengeLabel: string;
    challengePlaceholder: string;
    submitIdle: string;
    submitBusy: string;
  };
  roles: Array<{ value: AttendeeRole; label: string }>;
  faqEyebrow: string;
  faqTitle: string;
  faqLead: string;
  faqSelectedBadge: string;
  faqs: FaqItem[];
};

const webinarCopy: Record<PortfolioLanguage, WebinarLocaleCopy> = {
  en: {
    eyebrow: 'I4I × A4A Live Workshop & Operational Masterclass',
    badgeFormat: 'Evergreen Live Cohort · Zoom + Interactive Q&A',
    badgeSession: 'Next Session · Thursday · 11:00 AM PDT / 2:00 PM EDT / 9:00 PM MSK',
    title:
      'Operational Order Without Headcount Bloat: Eliminating Routine in Sports Academies and Growing Ventures',
    lead: 'A practical 60-minute architectural masterclass for academy founders, club directors, and operating teams on diagnosing workflow bottlenecks before hiring or buying more software.',
    primaryCta: 'Reserve Live Cohort Seat',
    secondaryCta: '60-Minute Curriculum',
    auditCta: 'Take the 3-Minute Operational Audit',
    metaLabels: {
      schedule: 'Cohort Schedule',
      scheduleValue: 'Upcoming Live Cohort Session',
      scheduleSub: '11:00 AM PDT · 2:00 PM EDT · 9:00 PM MSK',
      duration: 'Format',
      durationValue: '60 Minutes Live + .ICS Calendar Invite',
      durationSub: '45 min architectural teardown + 15 min live Q&A',
      languages: 'Working Languages',
      languagesValue: 'English · Russian · Tatar',
      languagesSub: 'Bilingual / trilingual slides & live case walk-throughs',
    },
    speakersEyebrow: 'Workshop Faculty',
    speakersTitle:
      'Two operators bridging enterprise process architecture and Olympic-grade execution.',
    speakers: [
      {
        badge: 'IT Architecture & Process Transformation',
        name: 'Anvar Tuykin',
        role: 'Enterprise IT Process Architect & Transformation Lead',
        bio: 'Specializes in auditing operational workflows, decomposing manual bottlenecks, and designing resilient process systems that scale without bureaucratic overhead.',
        highlights: [
          'Diagnosing where up to 35% of team capacity leaks into invisible coordination overhead',
          'Step-by-step process mapping before selecting CRM, ERP, or automation stacks',
          'Preventing chaotic automation that accelerates broken workflows',
        ],
      },
      {
        badge: 'A4A · Bulachak Founder & AI-Native Back-Office',
        name: 'Kamilla Gafurzianova, OLY',
        role: 'Olympic Medalist (London 2012) · Founder of Bulachak (A4A · P4P · I4I)',
        bio: 'Builds AI-native operational back-offices and automated triage pipelines for sports academies, national federations, and founder-led organizations.',
        highlights: [
          'Replacing fragmented spreadsheets, WhatsApp threads, and manual parent/client follow-ups',
          'Live demonstration of autonomous intake, diagnostic scoring, and instant calendar routing',
          'Translating high-performance athletic discipline into repeatable daily operations',
        ],
      },
    ],
    agendaEyebrow: '60-Minute Curriculum',
    agendaTitle: 'No abstract theory — four concrete operational blocks.',
    agendaLead:
      'Every participant leaves with a clear diagnostic framework for their own academy, club, or business.',
    agendaItems: [
      {
        time: '00–15 min',
        title: '1. Anatomy of Operational Chaos',
        detail:
          'Why growing academies and founder-led businesses hit an invisible ceiling: hidden bottlenecks in lead intake, scheduling, billing, and multi-channel communication.',
      },
      {
        time: '15–30 min',
        title: '2. Process Architecture Before Software (Anvar Tuykin)',
        detail:
          'How to audit and simplify your core operational loop in 48 hours so your team stops acting as human routers between disconnected spreadsheets and chats.',
      },
      {
        time: '30–45 min',
        title: '3. AI-Native Back-Office in Production (Kamilla Gafurzianova, OLY)',
        detail:
          'Live walkthrough of the Bulachak A4A architecture: 3-minute operational diagnostics, automated client triage, and 24/7 bilingual concierge workflows.',
      },
      {
        time: '45–60 min',
        title: '4. Live Diagnostic Teardown & Q&A',
        detail:
          'Real-time review of attendee operational challenges submitted during registration, with concrete next-step recommendations.',
      },
    ],
    registerEyebrow: 'Cohort Registration',
    registerTitle: 'Reserve your seat & download the calendar invitation.',
    registerLead:
      'Registration is free for academy directors, athletes, and business operators. You will immediately receive the Zoom link and an .ics calendar file.',
    confirmedBadge: 'Seat Confirmed',
    confirmedTitlePrefix: 'See you at the workshop,',
    confirmedLeadPrefix: 'We sent a confirmation to',
    dateLabel: 'Session',
    timeLabel: 'Time',
    downloadIcsLabel: 'Download .ics Calendar Invite',
    AuditPrefillLabel: 'Run 3-Minute Operational Audit Now',
    registerAnotherLabel: 'Register another participant',
    fields: {
      nameLabel: 'Your Name *',
      namePlaceholder: 'Alex Rivera',
      emailLabel: 'Email (for Zoom link & materials) *',
      emailPlaceholder: 'alex@academy.org',
      whatsappLabel: 'WhatsApp or Telegram (optional)',
      whatsappPlaceholder: '@username or +1...',
      roleLabel: 'Your Role *',
      organizationLabel: 'Organization / Academy / Club',
      organizationPlaceholder: 'E.g. Fencing Academy, Sports Tech Venture',
      challengeLabel: 'What operational routine drains the most time right now? (optional)',
      challengePlaceholder:
        'Describe the bottleneck you want Anvar and Kamilla to dissect live during the Q&A...',
      submitIdle: 'Confirm Registration & Get .ICS Invite',
      submitBusy: 'Confirming seat & generating .ICS invite...',
    },
    roles: [
      { value: 'club-owner', label: 'Sports Academy / Club Founder or Director' },
      { value: 'athlete-founder', label: 'Athlete / Coach Building a Venture' },
      { value: 'business-owner', label: 'Small / Medium Business Owner or Operator' },
      { value: 'community-member', label: 'I4I Community Member / Professional' },
      { value: 'other', label: 'Other' },
    ],
    faqEyebrow: 'Interactive Workshop Concierge',
    faqTitle: 'Frequently asked questions before you join.',
    faqLead: 'Select any question below to inspect the workshop protocol and next steps.',
    faqSelectedBadge: 'Workshop Protocol Answer',
    faqs: [
      {
        id: 'who-is-it-for',
        question: 'Is this only for sports academies or also for general small businesses?',
        answer:
          'Both. Sports academies and service-based small businesses suffer from the exact same operational friction: fragmented lead capture, manual scheduling, repetitive client messages, and founder overload. We cover universal process architecture and show live examples from both sports and SMB operations.',
        actionText: 'Reserve your seat above',
        actionHref: '#register',
      },
      {
        id: 'recording',
        question: 'Will I receive the recording and checklist if I cannot attend live?',
        answer:
          'Yes. Every registered participant receives the full recording, the 48-hour process audit checklist, and direct access to the 3-minute A4A Operational Audit tool.',
        actionText: 'Register to receive the recording',
        actionHref: '#register',
      },
      {
        id: 'audit-first',
        question: 'Can I benchmark my operations before the live session starts?',
        answer:
          'Yes — we encourage it. You can complete the interactive 3-Minute Operational Audit right now to get your baseline readiness score (0–100) and bring your scorecard to the live Q&A.',
        actionText: 'Launch the 3-Minute Operational Audit',
        actionHref: '/audit',
      },
      {
        id: 'cost',
        question: 'Is there any fee to attend the workshop?',
        answer:
          'No. The masterclass is hosted free of charge as part of the Bulachak I4I (Immigrants 4 Immigrants) × A4A knowledge-sharing initiative.',
        actionText: 'Claim your free registration',
        actionHref: '#register',
      },
    ],
  },
  ru: {
    eyebrow: 'Практический мастер-класс I4I × A4A',
    badgeFormat: 'Регулярный практический поток · Zoom + живой разбор',
    badgeSession: 'Ближайшая сессия · Четверг · 11:00 PDT / 14:00 EDT / 21:00 МСК',
    title:
      'Операционный порядок без раздутого штата: как малому бизнесу и спортивным академиям убрать рутину',
    lead: 'Прикладной 60-минутный разбор для руководителей спортивных клубов, основателей бизнеса и операционных команд: как найти узкие места в процессах до найма новых людей и покупки очередного софта.',
    primaryCta: 'Забронировать место на потоке',
    secondaryCta: 'Программа 60 минут',
    auditCta: 'Пройти 3-минутный операционный аудит',
    metaLabels: {
      schedule: 'Расписание потока',
      scheduleValue: 'Ближайшая живая сессия в Zoom',
      scheduleSub: '11:00 Лос-Анджелес · 14:00 Нью-Йорк · 21:00 МСК / Казань',
      duration: 'Формат',
      durationValue: '60 минут в эфире + .ICS приглашение в календарь',
      durationSub: '45 минут структурного разбора + 15 минут ответов на вопросы',
      languages: 'Рабочие языки',
      languagesValue: 'Русский · Английский · Татарский',
      languagesSub: 'Живые примеры и материалы на трех языках платформы Bulachak',
    },
    speakersEyebrow: 'Спикеры мастер-класса',
    speakersTitle:
      'Два практика на стыке ИТ-архитектуры процессов и олимпийской дисциплины исполнения.',
    speakers: [
      {
        badge: 'ИТ-процессы и операционная трансформация',
        name: 'Анвар Туйкин',
        role: 'Архитектор ИТ-процессов и эксперт по операционной трансформации',
        bio: 'Специализируется на аудите рабочих процессов, устранении ручных узких мест и построении прозрачных систем управления без бюрократии.',
        highlights: [
          'Как найти, где бизнес теряет до 35% времени команды на невидимую координацию',
          'Пошаговая декомпозиция процессов перед выбором CRM, ERP или ИИ-инструментов',
          'Как не автоматизировать хаос и выстроить понятный регламент работы',
        ],
      },
      {
        badge: 'Основатель Bulachak · A4A и AI-native бэк-офис',
        name: 'Камилла Гафурзянова, OLY',
        role: 'Серебряный призер Олимпийских игр (Лондон 2012) · Основатель Bulachak (A4A · P4P · I4I)',
        bio: 'Проектирует ИИ-бэк-офисы и автоматизированные системы приема заявок для спортивных академий, федераций и растущих сервисных компаний.',
        highlights: [
          'Замена разрозненных таблиц, чатов в WhatsApp и ручных напоминаний клиентам и родителям',
          'Живая демонстрация: 3-минутная диагностика, авто-триаж заявок и мгновенное расписание',
          'Перевод спортивной дисциплины высших достижений в стабильную ежедневную операционку',
        ],
      },
    ],
    agendaEyebrow: 'Программа (60 минут)',
    agendaTitle: 'Никакой воды — четыре прикладных блока.',
    agendaLead:
      'Каждый участник уйдет с готовой схемой диагностики процессов своего клуба, академии или бизнеса.',
    agendaItems: [
      {
        time: '00–15 мин',
        title: '1. Анатомия операционного хаоса',
        detail:
          'Почему растущие академии и малый бизнес упираются в потолок: где именно теряются заявки, оплата и время основателя.',
      },
      {
        time: '15–30 мин',
        title: '2. Архитектура процессов до внедрения софта (Анвар Туйкин)',
        detail:
          'Как за 48 часов провести ревизию ключевого цикла работы, чтобы команда перестала работать «живым маршрутизатором» между чатами и таблицами.',
      },
      {
        time: '30–45 мин',
        title: '3. AI-native бэк-офис в реальной работе (Камилла Гафурзянова, OLY)',
        detail:
          'Показ архитектуры Bulachak A4A изнутри: автоматическая диагностика узких мест, квалификация клиентов и работа консьержа 24/7.',
      },
      {
        time: '45–60 мин',
        title: '4. Живой разбор кейсов участников и ответы на вопросы',
        detail:
          'Разбор реальных операционных задач, которые вы укажете при регистрации, с конкретным планом первых шагов.',
      },
    ],
    registerEyebrow: 'Регистрация на мастер-класс',
    registerTitle: 'Забронируйте место и скачайте приглашение в календарь.',
    registerLead:
      'Участие бесплатное по предварительной регистрации. Сразу после отправки формы вы получите ссылку Zoom и файл .ics для календаря.',
    confirmedBadge: 'Регистрация подтверждена',
    confirmedTitlePrefix: 'Ждем вас на мастер-классе,',
    confirmedLeadPrefix: 'Подтверждение отправлено на адрес',
    dateLabel: 'Сессия',
    timeLabel: 'Время',
    downloadIcsLabel: 'Скачать приглашение в календарь (.ics)',
    AuditPrefillLabel: 'Пройти 3-минутный аудит до начала эфира',
    registerAnotherLabel: 'Зарегистрировать еще одного участника',
    fields: {
      nameLabel: 'Ваше имя *',
      namePlaceholder: 'Иван Петров',
      emailLabel: 'Email (для ссылки Zoom и материалов) *',
      emailPlaceholder: 'ivan@example.com',
      whatsappLabel: 'WhatsApp или Telegram (по желанию)',
      whatsappPlaceholder: '@username или +1 / +7...',
      roleLabel: 'Ваша роль *',
      organizationLabel: 'Клуб / Академия / Компания',
      organizationPlaceholder: 'Например: Академия фехтования, сервисный бизнес',
      challengeLabel: 'Какая рутина отнимает у вас больше всего времени сейчас? (по желанию)',
      challengePlaceholder:
        'Опишите узкое место, которое вы хотите разобрать в прямом эфире с Анваром и Камиллой...',
      submitIdle: 'Подтвердить участие и получить .ICS',
      submitBusy: 'Бронируем место и формируем .ICS...',
    },
    roles: [
      { value: 'club-owner', label: 'Владелец / руководитель спортивного клуба или академии' },
      { value: 'athlete-founder', label: 'Спортсмен / тренер, развивающий свой проект' },
      { value: 'business-owner', label: 'Владелец или руководитель малого / среднего бизнеса' },
      { value: 'community-member', label: 'Участник сообщества I4I / специалист' },
      { value: 'other', label: 'Другое' },
    ],
    faqEyebrow: 'Интерактивный гид по мастер-классу',
    faqTitle: 'Частые вопросы перед регистрацией.',
    faqLead: 'Нажмите на любой вопрос ниже, чтобы посмотреть подробности формата.',
    faqSelectedBadge: 'Ответ организаторов',
    faqs: [
      {
        id: 'who-is-it-for',
        question:
          'Мастер-класс подходит только спортивным клубам или обычному малому бизнесу тоже?',
        answer:
          'И тем, и другим. У спортивных академий и сервисного малого бизнеса одинаковые операционные болезни: потеря заявок в мессенджерах, ручное согласование расписания, хаос в таблицах и перегрузка основателя. Мы даем универсальную архитектуру процессов и показываем кейсы из обеих сфер.',
        actionText: 'Забронировать место выше',
        actionHref: '#register',
      },
      {
        id: 'recording',
        question: 'Будет ли запись и чек-лист, если я не смогу подключиться в прямом эфире?',
        answer:
          'Да. Все зарегистрированные участники получат запись эфира, чек-лист 48-часовой ревизии процессов и доступ к 3-минутному операционному аудиту A4A.',
        actionText: 'Зарегистрироваться для получения записи',
        actionHref: '#register',
      },
      {
        id: 'audit-first',
        question: 'Можно ли протестировать диагностику своего бизнеса еще до начала вебинара?',
        answer:
          'Да, более того — этот сайт сам является живым примером нашей архитектуры. Вы можете прямо сейчас пройти бесплатный 3-минутный операционный аудит и прийти на эфир уже со своим баллом готовности (0–100).',
        actionText: 'Запустить 3-минутный операционный аудит',
        actionHref: '/audit',
      },
      {
        id: 'cost',
        question: 'Сколько стоит участие в мастер-классе?',
        answer:
          'Участие полностью бесплатное в рамках образовательной инициативы Bulachak I4I (Immigrants 4 Immigrants) × A4A.',
        actionText: 'Оформить бесплатную регистрацию',
        actionHref: '#register',
      },
    ],
  },
  tt: {
    eyebrow: 'I4I × A4A гамәли осталык дәресе',
    badgeFormat: 'Даими гамәли агым · Zoom + туры эфирда талдау',
    badgeSession: 'Якындагы сессия · Пәнҗешәмбе · 11:00 PDT / 14:00 EDT / 21:00 МСК',
    title:
      'Артык штатсыз операцион тәртип: кече бизнеска һәм спорт академияләренә көндәлек рутинаны ничек бетерергә',
    lead: 'Спорт клублары җитәкчеләре, бизнес нигезләүчеләр һәм операцион командалар өчен 60 минутлык гамәли очрашу: яңа хезмәткәрләр яллау яки яңа программа сатып алу алдыннан процесслардагы тоткарлыкларны ничек табарга.',
    primaryCta: 'Урынны броньлау',
    secondaryCta: '60 минутлык программа',
    auditCta: '3 минутлык операцион аудит узу',
    metaLabels: {
      schedule: 'Агым вакыты',
      scheduleValue: 'Zoom аша якындагы туры эфир',
      scheduleSub: '11:00 Лос-Анджелес · 14:00 Нью-Йорк · 21:00 МСК / Казан',
      duration: 'Формат',
      durationValue: '60 минут туры эфир + .ICS календарь чакыруы',
      durationSub: '45 минут структур талдау + 15 минут сорауларга җаваплар',
      languages: 'Эш телләре',
      languagesValue: 'Татар · Рус · Инглиз',
      languagesSub: 'Bulachak платформасының өч телендәге гамәли мисаллар һәм материаллар',
    },
    speakersEyebrow: 'Осталык дәресе спикерлары',
    speakersTitle:
      'ИТ-процесслар архитектурасын һәм Олимпия дәрәҗәсендәге тәртипне берләштерүче ике практик.',
    speakers: [
      {
        badge: 'ИТ-процесслар һәм операцион трансформация',
        name: 'Әнвәр Туйкин',
        role: 'ИТ-процесслар архитекторы һәм операцион трансформация белгече',
        bio: 'Эш процессларын аудитлауда, кул белән башкарыла торган тоткарлыкларны бетерүдә һәм артык бюрократиясез ачык идарә системаларын төзүдә махсуслаша.',
        highlights: [
          'Команда вакытының 35% ка кадәр өлеше кая югалуын ачыклау',
          'CRM, ERP яки ИИ коралларын сайлаганчы процессларны адымлап тәртипкә китерү',
          'Хаосны автоматлаштырмыйча, аңлаешлы эш регламентын булдыру',
        ],
      },
      {
        badge: 'Bulachak · A4A нигезләүчесе һәм AI-native бэк-офис',
        name: 'Камилла Гафурҗанова, OLY',
        role: 'Олимпия уеннарының көмеш призеры (Лондон 2012) · Bulachak (A4A · P4P · I4I) нигезләүчесе',
        bio: 'Спорт академияләре, федерацияләр һәм үсештәге компанияләр өчен ИИ-нигезле бэк-офислар һәм гаризаларны автомат рәвештә кабул итү системаларын төзи.',
        highlights: [
          'Таралган таблицаларны, WhatsApp чатларын һәм кулдан язылган искәртүләрне бердәм системага алыштыру',
          'Туры эфирда күрсәтү: 3 минутлык диагностика, гаризалар триажы һәм расписание автоматлаштыру',
          'Югары казанышлар спорты тәртибен тотрыклы көндәлек операцияләргә күчерү',
        ],
      },
    ],
    agendaEyebrow: '60 минутлык программа',
    agendaTitle: 'Коры теориясез — дүрт гамәли блок.',
    agendaLead:
      'Һәр катнашучы үз клубы, академиясе яки бизнесы процессларын диагностикалау өчен әзер схема белән китәчәк.',
    agendaItems: [
      {
        time: '00–15 мин',
        title: '1. Операцион хаос анатомиясе',
        detail:
          'Ни өчен үсештәге академияләр һәм кече бизнес күренмәс чиккә килеп терәлә: гаризалар, түләүләр һәм җитәкче вакыты кайда югала.',
      },
      {
        time: '15–30 мин',
        title: '2. Программалар керткәнче процесслар архитектурасы (Әнвәр Туйкин)',
        detail:
          'Командагыз чатлар белән таблицалар арасында «тере маршрутизатор» булып эшләмәсен өчен, 48 сәгать эчендә төп эш циклын ничек тикшерергә.',
      },
      {
        time: '30–45 мин',
        title: '3. Гамәлдәге AI-native бэк-офис (Камилла Гафурҗанова, OLY)',
        detail:
          'Bulachak A4A архитектурасын эчтән күрсәтү: тоткарлыкларны автомат диагностикалау, клиентларны квалификацияләү һәм 24/7 консьерж эше.',
      },
      {
        time: '45–60 мин',
        title: '4. Катнашучыларның реаль очракларын талдау һәм сорауларга җаваплар',
        detail:
          'Теркәлү вакытында язылган операцион бурычларны туры эфирда сүтеп җыю һәм беренче адымнар планы.',
      },
    ],
    registerEyebrow: 'Осталык дәресенә теркәлү',
    registerTitle: 'Урыныгызны раслагыз һәм календарь чакыруын йөкләп алыгыз.',
    registerLead:
      'Алдан теркәлү буенча катнашу бушлай. Форманы җибәрү белән сез Zoom сылтамасын һәм календарь өчен .ics файлын алачаксыз.',
    confirmedBadge: 'Теркәлү расланды',
    confirmedTitlePrefix: 'Сезне осталык дәресендә көтәбез,',
    confirmedLeadPrefix: 'Раслау хаты әлеге адреска җибәрелде:',
    dateLabel: 'Сессия',
    timeLabel: 'Вакыт',
    downloadIcsLabel: 'Календарь чакыруын йөкләп алу (.ics)',
    AuditPrefillLabel: 'Эфирга кадәр 3 минутлык аудит узу',
    registerAnotherLabel: 'Тагын бер катнашучыны теркәү',
    fields: {
      nameLabel: 'Исемегез *',
      namePlaceholder: 'Илдар Кәримов',
      emailLabel: 'Email (Zoom сылтамасы һәм материаллар өчен) *',
      emailPlaceholder: 'ildar@example.com',
      whatsappLabel: 'WhatsApp яки Telegram (теләк буенча)',
      whatsappPlaceholder: '@username яки +1 / +7...',
      roleLabel: 'Сезнең ролегез *',
      organizationLabel: 'Клуб / Академия / Компания',
      organizationPlaceholder: 'Мәсәлән: Фехтование академиясе, сервис бизнесы',
      challengeLabel: 'Хәзерге вакытта нинди рутина иң күп вакытыгызны ала? (теләк буенча)',
      challengePlaceholder:
        'Туры эфирда Әнвәр һәм Камилла белән бергә талдарга теләгән операцион кыенлыкны языгыз...',
      submitIdle: 'Катнашуны раслау һәм .ICS алу',
      submitBusy: 'Урын раслана һәм .ICS әзерләнә...',
    },
    roles: [
      { value: 'club-owner', label: 'Спорт клубы яки академиясе хуҗасы / җитәкчесе' },
      { value: 'athlete-founder', label: 'Үз проектын үстерүче спортчы / тренер' },
      { value: 'business-owner', label: 'Кече яки урта бизнес хуҗасы / җитәкчесе' },
      { value: 'community-member', label: 'I4I берләшмәсе әгъзасы / белгеч' },
      { value: 'other', label: 'Башка' },
    ],
    faqEyebrow: 'Интерактив белешмәлек',
    faqTitle: 'Теркәлү алдыннан еш бирелә торган сораулар.',
    faqLead: 'Формат нечкәлекләрен карау өчен түбәндәге теләсә кайсы сорауга басыгыз.',
    faqSelectedBadge: 'Оештыручылар җавабы',
    faqs: [
      {
        id: 'who-is-it-for',
        question: 'Бу дәрес спорт клублары өчен генәме, әллә гади кече бизнеска да туры киләме?',
        answer:
          'Икесенә дә туры килә. Спорт академияләре һәм хезмәт күрсәтү өлкәсендәге кече бизнес бер үк операцион кыенлыклар белән очраша: мессенджерларда гаризалар югалу, расписаниене кулдан килештерү, таблицалардагы тәртипсезлек. Без универсаль процесслар архитектурасын бирәбез.',
        actionText: 'Югарыда урынны броньлау',
        actionHref: '#register',
      },
      {
        id: 'recording',
        question: 'Туры эфирга кушыла алмасам, язма һәм чек-лист булачакмы?',
        answer:
          'Әйе. Теркәлгән һәр катнашучы эфир язмасын, 48 сәгатьлек процесслар ревизиясе чек-листын һәм 3 минутлык A4A операцион аудитына керү мөмкинлеген алачак.',
        actionText: 'Язманы алу өчен теркәлү',
        actionHref: '#register',
      },
      {
        id: 'audit-first',
        question: 'Вебинарга кадәр үк бизнесымның диагностикасын сынап карый аламмы?',
        answer:
          'Әйе. Сез хәзер үк бушлай 3 минутлык операцион аудитны уза һәм туры эфирга үзегезнең әзерлек баллыгыз (0–100) белән килә аласыз.',
        actionText: '3 минутлык операцион аудитны башлау',
        actionHref: '/audit',
      },
      {
        id: 'cost',
        question: 'Осталык дәресендә катнашу күпме тора?',
        answer:
          'Bulachak I4I (Immigrants 4 Immigrants) × A4A белем уртаклашу инициативасы кысаларында катнашу тулысынча бушлай.',
        actionText: 'Бушлай теркәлү узу',
        actionHref: '#register',
      },
    ],
  },
};

export function WebinarView() {
  const { language } = usePortfolioLocale();
  const copy = webinarCopy[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappOrTelegram, setWhatsappOrTelegram] = useState('');
  const [role, setRole] = useState<AttendeeRole>('club-owner');
  const [organization, setOrganization] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<WebinarResponse | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<string>('who-is-it-for');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const payload = {
      name: name.trim(),
      email: email.trim(),
      whatsappOrTelegram: whatsappOrTelegram.trim() || undefined,
      role,
      organization: organization.trim() || undefined,
      biggestChallenge: biggestChallenge.trim() || undefined,
      source: `webinar-page-${language}`,
    };

    const parsed = WebinarRegistration.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors: Record<string, string> = {};
      for (const [key, messages] of Object.entries(fieldErrors)) {
        const firstMessage = messages?.[0];
        if (firstMessage) nextErrors[key] = firstMessage;
      }
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<WebinarResponse>('/api/webinar/register', {
        method: 'POST',
        body: JSON.stringify(parsed.data),
      });
      setResult(res);
    } catch (err) {
      const cause =
        err instanceof Error && typeof err.cause === 'object' && err.cause !== null
          ? (err.cause as { errors?: Record<string, string> })
          : null;
      if (cause?.errors) {
        setErrors(cause.errors);
      } else {
        setErrors({
          form: err instanceof Error ? err.message : 'Unable to complete registration.',
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleDownloadIcs() {
    if (!result) return;
    const blob = new Blob([result.icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', result.icsFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const activeFaq = copy.faqs.find((f) => f.id === selectedFaq) ?? copy.faqs[0];

  return (
    <div className="portfolio-container">
      {/* Editorial Hero */}
      <header className="story-header">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="case-chip">{copy.badgeFormat}</span>
            <span className="case-chip">{copy.badgeSession}</span>
          </div>
          <h1>{copy.title}</h1>
        </div>
        <div>
          <p className="lead">{copy.lead}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#register">
              {copy.primaryCta}
            </a>
            <a className="button-secondary" href="#agenda">
              {copy.secondaryCta}
            </a>
            <Link className="button-secondary" href={portfolioHref(language, '/audit')}>
              {copy.auditCta}
            </Link>
          </div>
        </div>
      </header>

      {/* Cohort Logistics Strip */}
      <section className="section-block" style={{ paddingTop: '1.5rem' }}>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="case-evidence">
            <p className="eyebrow">{copy.metaLabels.schedule}</p>
            <h2 className="mt-1 font-semibold text-lg">{copy.metaLabels.scheduleValue}</h2>
            <p className="mt-1 text-muted-foreground text-sm">{copy.metaLabels.scheduleSub}</p>
          </article>
          <article className="case-evidence">
            <p className="eyebrow">{copy.metaLabels.duration}</p>
            <h2 className="mt-1 font-semibold text-lg">{copy.metaLabels.durationValue}</h2>
            <p className="mt-1 text-muted-foreground text-sm">{copy.metaLabels.durationSub}</p>
          </article>
          <article className="case-evidence">
            <p className="eyebrow">{copy.metaLabels.languages}</p>
            <h2 className="mt-1 font-semibold text-lg">{copy.metaLabels.languagesValue}</h2>
            <p className="mt-1 text-muted-foreground text-sm">{copy.metaLabels.languagesSub}</p>
          </article>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.speakersEyebrow}</p>
            <h2>{copy.speakersTitle}</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {copy.speakers.map((speaker) => (
            <article key={speaker.name} className="case-evidence flex flex-col justify-between">
              <div>
                <span className="case-chip">{speaker.badge}</span>
                <h3 className="mt-3 font-semibold text-2xl">{speaker.name}</h3>
                <p className="mt-1 font-medium text-primary text-sm">{speaker.role}</p>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{speaker.bio}</p>
              </div>
              <ul className="mt-5 space-y-2 border-border border-t pt-4 text-sm">
                {speaker.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1 font-mono text-primary text-xs">■</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 60-Minute Curriculum */}
      <section id="agenda" className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.agendaEyebrow}</p>
            <h2>{copy.agendaTitle}</h2>
          </div>
          <p>{copy.agendaLead}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {copy.agendaItems.map((item) => (
            <article key={item.time} className="case-evidence">
              <span className="case-chip">{item.time}</span>
              <h3 className="mt-3 font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Registration & Interactive Concierge Grid */}
      <section id="register" className="section-block">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Registration Form (7 cols) */}
          <div className="case-evidence lg:col-span-7">
            <p className="eyebrow">{copy.registerEyebrow}</p>
            <h2 className="mt-1 font-semibold text-2xl">{copy.registerTitle}</h2>
            <p className="mt-2 text-muted-foreground text-sm">{copy.registerLead}</p>

            {result ? (
              <div className="mt-6 space-y-5 rounded-lg border border-primary/30 bg-primary/5 p-6">
                <span className="case-chip">{copy.confirmedBadge}</span>
                <h3 className="font-semibold text-xl">
                  {copy.confirmedTitlePrefix} {result.name}!
                </h3>
                <p className="text-muted-foreground text-sm">
                  {copy.confirmedLeadPrefix}{' '}
                  <strong className="text-foreground">{result.email}</strong>.
                </p>

                <div className="space-y-1.5 rounded-md border border-border bg-background p-4 text-sm">
                  <p>
                    <span className="text-muted-foreground">{copy.dateLabel}:</span>{' '}
                    <strong>{result.eventDate}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">{copy.timeLabel}:</span>{' '}
                    <strong>{result.eventTime}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Zoom:</span>{' '}
                    <a
                      href={result.zoomLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-primary underline"
                    >
                      {result.zoomLink}
                    </a>
                  </p>
                </div>

                <div className="hero-actions">
                  <button type="button" onClick={handleDownloadIcs} className="button-primary">
                    {copy.downloadIcsLabel}
                  </button>
                  <Link
                    href={`${portfolioHref(language, '/audit')}?name=${encodeURIComponent(
                      result.name,
                    )}&email=${encodeURIComponent(result.email)}&org=${encodeURIComponent(
                      organization || result.name,
                    )}`}
                    className="button-secondary"
                  >
                    {copy.AuditPrefillLabel}
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="text-muted-foreground text-xs underline hover:text-foreground"
                >
                  {copy.registerAnotherLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                {errors.form ? (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-destructive text-sm">
                    {errors.form}
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="webinar-name" className="mb-1.5 block font-medium text-xs">
                      {copy.fields.nameLabel}
                    </label>
                    <input
                      id="webinar-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={copy.fields.namePlaceholder}
                      className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                    {errors.name ? (
                      <p className="mt-1 text-destructive text-xs">{errors.name}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="webinar-email" className="mb-1.5 block font-medium text-xs">
                      {copy.fields.emailLabel}
                    </label>
                    <input
                      id="webinar-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.fields.emailPlaceholder}
                      className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                    {errors.email ? (
                      <p className="mt-1 text-destructive text-xs">{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="webinar-whatsapp" className="mb-1.5 block font-medium text-xs">
                      {copy.fields.whatsappLabel}
                    </label>
                    <input
                      id="webinar-whatsapp"
                      type="text"
                      value={whatsappOrTelegram}
                      onChange={(e) => setWhatsappOrTelegram(e.target.value)}
                      placeholder={copy.fields.whatsappPlaceholder}
                      className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="webinar-role" className="mb-1.5 block font-medium text-xs">
                      {copy.fields.roleLabel}
                    </label>
                    <select
                      id="webinar-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as AttendeeRole)}
                      className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                    >
                      {copy.roles.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="webinar-org" className="mb-1.5 block font-medium text-xs">
                    {copy.fields.organizationLabel}
                  </label>
                  <input
                    id="webinar-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={copy.fields.organizationPlaceholder}
                    className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="webinar-challenge" className="mb-1.5 block font-medium text-xs">
                    {copy.fields.challengeLabel}
                  </label>
                  <textarea
                    id="webinar-challenge"
                    rows={3}
                    value={biggestChallenge}
                    onChange={(e) => setBiggestChallenge(e.target.value)}
                    placeholder={copy.fields.challengePlaceholder}
                    className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={submitting} className="button-primary w-full">
                    {submitting ? copy.fields.submitBusy : copy.fields.submitIdle}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive FAQ Concierge (5 cols) */}
          <div className="case-evidence flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="eyebrow">{copy.faqEyebrow}</p>
              <h2 className="mt-1 font-semibold text-xl">{copy.faqTitle}</h2>
              <p className="mt-2 text-muted-foreground text-sm">{copy.faqLead}</p>

              <div className="mt-5 space-y-2">
                {copy.faqs.map((faq) => {
                  const isSelected = faq.id === activeFaq?.id;
                  return (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => setSelectedFaq(faq.id)}
                      className={`w-full rounded-md border px-3.5 py-2.5 text-left text-xs transition ${
                        isSelected
                          ? 'border-primary bg-primary/10 font-semibold text-foreground'
                          : 'border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      {faq.question}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeFaq ? (
              <div className="mt-6 rounded-md border border-border bg-background p-4">
                <span className="case-chip">{copy.faqSelectedBadge}</span>
                <p className="mt-3 text-sm leading-relaxed">{activeFaq.answer}</p>
                <div className="mt-4">
                  <Link
                    href={
                      activeFaq.actionHref.startsWith('/')
                        ? portfolioHref(language, activeFaq.actionHref)
                        : activeFaq.actionHref
                    }
                    className="font-semibold text-primary text-xs underline"
                  >
                    {activeFaq.actionText} →
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
