// @polsia:user-owned: Bulachak homepage copy grounded in the founder's supplied philosophy sources.
import type { PortfolioLanguage } from '@/lib/portfolio-locale';

export type BulachakHomeCopy = {
  title: string;
  eyebrow: string;
  description: string;
  branchesTitle: string;
  branchesIntro: string;
  branches: Record<
    'A4A' | 'P4P' | 'I4I',
    {
      purpose: string;
      role: string;
      description: string;
      linkLabel: string;
      pledge: string;
    }
  >;
  reciprocityTitle: string;
  reciprocityIntro: string;
  reciprocitySteps: Array<{
    from: string;
    to: string;
    label: string;
    text: string;
  }>;
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyText: string;
  alignment: string;
  philosophyLink: string;
  comparisons: Array<{
    id: string;
    title: string;
    action: string;
    description: string;
  }>;
  workTitle: string;
  workText: string;
  workLink: string;
  founderLink: string;
  featuredTitle: string;
  featuredSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  contactActionBriefing: string;
  contactActionAthlete: string;
  contactActionAbout: string;
};

export const bulachakHomeCopy: Record<PortfolioLanguage, BulachakHomeCopy> = {
  en: {
    title: 'A\u00A0future we build together',
    eyebrow: 'Sport. Access. Community.',
    description:
      'Bulachak means "the future" in Tatar. It brings together three branches: Agents 4 Athletes for practical support in sport, Parafencing 4 Progress for access to adaptive fencing, and Immigrant 4 Immigrant for community and mutual support.',
    branchesTitle: 'Three branches, one shared future',
    branchesIntro: 'Each has its own purpose. Cooperation\u00A0connects\u00A0them.',
    branches: {
      A4A: {
        purpose: 'More time for\u00A0sport',
        role: 'Commercial engine',
        description:
          'Developing practical tools and operations support for athletes, clubs, and sports organizations.',
        pledge: '4% of revenue pledged unconditionally to\u00A0Parafencing 4\u00A0Progress.',
        linkLabel: 'Explore A4A',
      },
      P4P: {
        purpose: 'Access to\u00A0adaptive fencing',
        role: 'Nonprofit branch in development',
        description:
          'Specialized equipment, coaching frameworks, and sustainable pathways that make participation accessible.',
        pledge:
          'Funded through the A4A revenue pledge to provide specialized wheelchairs and athlete training camps.',
        linkLabel: 'Explore P4P',
      },
      I4I: {
        purpose: 'Community and kinship',
        role: 'Immigrant support',
        description:
          'Mutual support, shared knowledge, and cultural continuity across immigrant communities.',
        pledge: 'Inverting "an eye for an eye" into mutual uplift for businesses and athletes.',
        linkLabel: 'Explore I4I',
      },
    },
    reciprocityTitle: 'Radical reciprocity in\u00A0practice',
    reciprocityIntro:
      'The three branches do not operate in silos. Each reinforces the others to expand total value.',
    reciprocitySteps: [
      {
        from: 'A4A',
        to: 'P4P',
        label: '4% Revenue Pledge',
        text: 'Commercial sports operations unconditionally fund adaptive equipment, coaching frameworks, and athlete camps.',
      },
      {
        from: 'P4P',
        to: 'I4I',
        label: 'Dignity & Access',
        text: 'Adaptive sport opens inclusive pathways, reinforcing community dignity and immigrant mutual support.',
      },
      {
        from: 'I4I',
        to: 'A4A',
        label: 'Co-opetition & Trust',
        text: 'Shared knowledge and cross-pollination among immigrant founders and sport leaders feed sustainable growth.',
      },
    ],
    philosophyEyebrow: 'The philosophy',
    philosophyTitle: 'The\u00A0Emerald Pasture',
    philosophyText:
      'In traditional strategy, markets are framed as oceans: "Red Oceans" of fierce competition for existing demand, or "Blue Oceans" seeking new spaces. Bulachak operates in the Emerald Pasture: cultivating shared ground where people compete with excellence and cooperate with trust, growing total value together.',
    alignment: 'Human alignment first, AI\u00A0second.',
    philosophyLink: 'Explore the philosophy',
    comparisons: [
      {
        id: 'red-ocean',
        title: 'Red Ocean',
        action: 'Extract value',
        description: 'Compete for a share of existing demand in an exhaustive, zero-sum contest.',
      },
      {
        id: 'blue-ocean',
        title: 'Blue Ocean',
        action: 'Discover value',
        description: 'Create new demand and discover untapped, uncontested markets.',
      },
      {
        id: 'emerald-pasture',
        title: 'Emerald Pasture',
        action: 'Grow value together',
        description:
          'Share knowledge and combine strengths within clear agreements. Respect people’s time, energy, and capacity.',
      },
    ],
    workTitle: 'Experience informing what comes next',
    workText:
      'Explore the founder’s earlier projects in sport, operations, and community work: experience that informs Bulachak’s direction.',
    workLink: 'Explore the portfolio',
    founderLink: 'Meet the founder',
    featuredTitle: 'Demonstrated track record behind Bulachak',
    featuredSubtitle:
      'The foundation of Bulachak rests on delivered systems in operations, public platforms, and community access.',
    contactTitle: 'Building the future together',
    contactSubtitle:
      'Whether you are a sports organization looking for operations support, an athlete operator, or exploring community collaboration: let’s connect.',
    contactActionBriefing: 'Start a briefing',
    contactActionAthlete: 'Athlete intake',
    contactActionAbout: 'About Bulachak',
  },
  ru: {
    title: 'Будущее, которое мы\u00A0строим вместе',
    eyebrow: 'Спорт. Доступность. Сообщество.',
    description:
      'Bulachak означает «будущее» на\u00A0татарском. Он\u00A0объединяет три направления: «Агенты для\u00A0спортсменов» для\u00A0практической поддержки в\u00A0спорте, «Парафехтование ради развития» для\u00A0доступа к\u00A0адаптивному фехтованию и\u00A0«Иммигрант для\u00A0иммигранта» для\u00A0развития сообщества и\u00A0взаимопомощи.',
    branchesTitle: 'Три направления, общее будущее',
    branchesIntro: 'У\u00A0каждого своя цель. Их\u00A0связывает\u00A0сотрудничество.',
    branches: {
      A4A: {
        purpose: 'Больше времени для\u00A0спорта',
        role: 'Коммерческая основа',
        description:
          'Разработка прикладных инструментов и\u00A0операционная поддержка повседневной работы спортсменов, клубов и\u00A0спортивных организаций.',
        pledge: '4% выручки безусловно направляются в\u00A0поддержку Parafencing 4\u00A0Progress.',
        linkLabel: 'Об\u00A0A4A',
      },
      P4P: {
        purpose: 'Доступ к\u00A0адаптивному фехтованию',
        role: 'Некоммерческое направление в\u00A0разработке',
        description:
          'Специализированное оборудование, тренерская поддержка и\u00A0создание устойчивых условий для\u00A0занятий адаптивным спортом.',
        pledge:
          'Финансируется через 4% отчислений A4A для\u00A0обеспечения колясками и\u00A0сборами.',
        linkLabel: 'О\u00A0P4P',
      },
      I4I: {
        purpose: 'Сообщество и\u00A0чувство родства',
        role: 'Поддержка сообществ',
        description:
          'Взаимопомощь, обмен прикладным опытом и\u00A0культурная преемственность в\u00A0сообществах иммигрантов.',
        pledge:
          'Превращение правила «око за\u00A0око» во\u00A0взаимную поддержку бизнеса и\u00A0атлетов.',
        linkLabel: 'Об\u00A0I4I',
      },
    },
    reciprocityTitle: 'Принцип взаимного усиления на\u00A0практике',
    reciprocityIntro:
      'Три направления не\u00A0изолированы друг от\u00A0друга: каждое усиливает остальные, увеличивая общую ценность.',
    reciprocitySteps: [
      {
        from: 'A4A',
        to: 'P4P',
        label: '4% отчислений',
        text: 'Коммерческая работа в\u00A0спорте безусловно финансирует адаптивное оборудование и\u00A0тренировочные сборы.',
      },
      {
        from: 'P4P',
        to: 'I4I',
        label: 'Достоинство и\u00A0доступ',
        text: 'Адаптивный спорт открывает инклюзивные возможности, укрепляя взаимную поддержку в\u00A0сообществах.',
      },
      {
        from: 'I4I',
        to: 'A4A',
        label: 'Коопетиция и\u00A0доверие',
        text: 'Обмен знаниями между предпринимателями-иммигрантами и\u00A0лидерами спорта питает устойчивый рост.',
      },
    ],
    philosophyEyebrow: 'Философия',
    philosophyTitle: 'Изумрудное пастбище',
    philosophyText:
      'В\u00A0традиционной стратегии рынки часто делят на\u00A0океаны: «Красные океаны» жесткой конкуренции за\u00A0существующий спрос и\u00A0«Голубые океаны» поиска новых ниш. Bulachak предлагает третий путь: Изумрудное пастбище. Основанное на\u00A0коопетиции, оно\u00A0позволяет соревноваться в\u00A0мастерстве и\u00A0сотрудничать на\u00A0основе прозрачных договорённостей, увеличивая общую ценность.',
    alignment: 'Сначала согласие между людьми, затем\u00A0ИИ.',
    philosophyLink: 'Подробнее о\u00A0философии',
    comparisons: [
      {
        id: 'red-ocean',
        title: 'Красный океан',
        action: 'Извлечение ценности',
        description:
          'Борьба за\u00A0долю существующего спроса в\u00A0условиях истощающей конкуренции с\u00A0нулевой суммой.',
      },
      {
        id: 'blue-ocean',
        title: 'Голубой океан',
        action: 'Открытие ценности',
        description:
          'Формирование нового спроса и\u00A0освоение свободных, незанятых рыночных пространств.',
      },
      {
        id: 'emerald-pasture',
        title: 'Изумрудное пастбище',
        action: 'Преумножение ценности вместе',
        description:
          'Обмен знаниями и\u00A0объединение преимуществ на\u00A0основе ясных договорённостей. Уважение к\u00A0времени и\u00A0возможностям каждого партнёра.',
      },
    ],
    workTitle: 'Опыт, который определяет дальнейшее направление',
    workText:
      'Ранние проекты основательницы в\u00A0спорте, организации работы и\u00A0поддержке сообществ: опыт, на\u00A0который опирается развитие Bulachak.',
    workLink: 'Посмотреть портфолио',
    founderLink: 'Об\u00A0основательнице',
    featuredTitle: 'Проверенный фундамент Bulachak',
    featuredSubtitle:
      'В\u00A0основе Bulachak: реализованные проекты в\u00A0организации процессов, цифровых сервисах и\u00A0поддержке сообществ.',
    contactTitle: 'Строить будущее вместе',
    contactSubtitle:
      'Для\u00A0спортивных организаций, спортсменов-предпринимателей и\u00A0партнёров в\u00A0адаптивном спорте и\u00A0сообществах: давайте строить будущее вместе.',
    contactActionBriefing: 'Начать обсуждение',
    contactActionAthlete: 'Анкета для\u00A0спортсменов',
    contactActionAbout: 'О\u00A0Bulachak',
  },
  tt: {
    title: 'Бергә төзи торган киләчәк',
    eyebrow: 'Спорт. Мөмкинлекләр. Берләшмә.',
    description:
      'Bulachak татарча «киләчәк» дигәнне аңлата. Ул\u00A0өч юнәлешне берләштерә. «Спортчылар өчен\u00A0агентлар» спорттагы көндәлек эшләргә ярдәм итү өчен\u00A0кораллар әзерли. «Үсеш өчен\u00A0парафехтование» адаптив фехтование белән\u00A0шөгыльләнү мөмкинлеген киңәйтү өчен\u00A0әзерләнә. «Иммигрант иммигрант өчен» кешеләрне якынайтуга һәм\u00A0үзара ярдәмгә багышланган.',
    branchesTitle: 'Өч юнәлеш, уртак киләчәк',
    branchesIntro: 'Һәркайсының үз\u00A0максаты бар. Аларны\u00A0хезмәттәшлек\u00A0бәйли.',
    branches: {
      A4A: {
        purpose: 'Спортка күбрәк вакыт',
        role: 'Коммерция нигезе',
        description:
          'Спортчыларга, клубларга һәм\u00A0спорт оешмаларына көндәлек эшләрен оештырырга ярдәм итә\u00A0торган кораллар әзерләү.',
        pledge: 'Керемнең 4% өлеше Parafencing 4\u00A0Progress юнәлешенә җибәрелә.',
        linkLabel: 'A4A турында',
      },
      P4P: {
        purpose: 'Адаптив фехтование белән\u00A0шөгыльләнү мөмкинлеге',
        role: 'Коммерцияле булмаган юнәлеш, әле\u00A0әзерләнә',
        description:
          'Максат: спортта катнашуны җиңеләйтү өчен\u00A0җиһазлар һәм\u00A0тренер ярдәме булдыру.',
        pledge:
          'A4A кертемнәре исәбенә махсус арбалар һәм\u00A0күнегүләр оештыру өчен\u00A0әзерләнә.',
        linkLabel: 'P4P турында',
      },
      I4I: {
        purpose: 'Берләшмә һәм\u00A0туганлык',
        role: 'Иммигрантларга ярдәм',
        description:
          'Иммигрантлар арасында үзара ярдәм, белем уртаклашу, мәдәниятне киләсе буыннарга тапшыру.',
        pledge: 'Үзара ярдәм аша эшмәкәрләр һәм\u00A0спортчылар арасында ныклы бәйләнеш төзү.',
        linkLabel: 'I4I турында',
      },
    },
    reciprocityTitle: 'Гамәлдәге үзара ярдәм',
    reciprocityIntro:
      'Өч юнәлеш аерым гына эшләми. Алар уртак кыйммәтне арттыру өчен\u00A0бер-берсен көчәйтә.',
    reciprocitySteps: [
      {
        from: 'A4A',
        to: 'P4P',
        label: '4% керем бүлешү',
        text: 'Спорттагы эшчәнлек кеременең бер\u00A0өлеше адаптив спорт җиһазларын һәм\u00A0җыеннарын тәэмин итә.',
      },
      {
        from: 'P4P',
        to: 'I4I',
        label: 'Хөрмәт һәм\u00A0мөмкинлек',
        text: 'Адаптив спорт мөмкинлекләре кешеләрне якынайта, берләшмәләрдә үзара терәк булуны ныгыта.',
      },
      {
        from: 'I4I',
        to: 'A4A',
        label: 'Хезмәттәшлек һәм\u00A0ышаныч',
        text: 'Иммигрант-эшмәкәрләр һәм\u00A0спорт лидерлары арасындагы тәҗрибә уртаклашу тотрыклы үсешкә китерә.',
      },
    ],
    philosophyEyebrow: 'Фәлсәфә',
    philosophyTitle: 'Зөбәрҗәт болын',
    philosophyText:
      'Гадәттәге стратегиядә базарларны «океаннар» белән\u00A0чагыштыралар: булган чикле сорау өчен\u00A0көрәшә торган «Кызыл океаннар» һәм\u00A0яңа буш урыннар эзли торган «Зәңгәр океаннар». Bulachak өченче юлны сайлый: Зөбәрҗәт болын. Коопетициягә таянып, оешмалар осталыкта ярыша һәм\u00A0ачык килешүләр нигезендә хезмәттәшлек итә, уртак кыйммәтне арттыра.',
    alignment: 'Башта кешеләр үзара килешә, аннары ясалма интеллект (ЯИ) ярдәмгә килә.',
    philosophyLink: 'Фәлсәфә турында күбрәк',
    comparisons: [
      {
        id: 'red-ocean',
        title: 'Кызыл океан',
        action: 'Кыйммәтне алу',
        description: 'Булган ихтыяҗның бер\u00A0өлеше өчен\u00A0көндәшлек итү.',
      },
      {
        id: 'blue-ocean',
        title: 'Зәңгәр океан',
        action: 'Кыйммәтне ачу',
        description: 'Яңа ихтыяҗ тудыру һәм\u00A0әле үзләштерелмәгән базарлар табу.',
      },
      {
        id: 'emerald-pasture',
        title: 'Зөбәрҗәт болын',
        action: 'Кыйммәтне бергә үстерү',
        description:
          'Белем уртаклашып, көчләрне берләштереп, уртак кыйммәтне арттыру. Кешеләрнең вакытын һәм\u00A0мөмкинлекләрен хөрмәт итү.',
      },
    ],
    workTitle: 'Алга таба эшләргә нигез булган тәҗрибә',
    workText:
      'Нигез салучының спорт, эшне оештыру һәм\u00A0кешеләрне берләштерү өлкәсендәге элеккеге проектлары белән\u00A0танышыгыз. Шушы тәҗрибә Bulachakның алдагы юнәлешен билгеләргә ярдәм итә.',
    workLink: 'Портфолионы карау',
    founderLink: 'Нигез салучы турында',
    featuredTitle: 'Bulachak нигезендәге сыналган тәҗрибә',
    featuredSubtitle:
      'Bulachak спортны оештыру, санлы кораллар һәм\u00A0берләшмәләр өлкәсендәге чын проектларга таяна.',
    contactTitle: 'Киләчәкне бергә төзик',
    contactSubtitle:
      'Спорт оешмалары, спортчы-эшмәкәрләр һәм\u00A0берләшмәләр өчен: киләчәкне бергә төзик.',
    contactActionBriefing: 'Фикер алышуны башлау',
    contactActionAthlete: 'Спортчылар өчен\u00A0гариза',
    contactActionAbout: 'Bulachak турында',
  },
};
