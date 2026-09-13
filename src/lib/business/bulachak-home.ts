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
    title: 'A future we build together',
    eyebrow: 'Sport. Access. Community.',
    description:
      'Bulachak means "the future" in Tatar. It brings together three branches: Agents 4 Athletes for practical support in sport, Parafencing 4 Progress for access to adaptive fencing, and Immigrant 4 Immigrant for community and mutual support.',
    branchesTitle: 'Three branches, one shared future',
    branchesIntro: 'Each has its own purpose. Cooperation connects them.',
    branches: {
      A4A: {
        purpose: 'More time for sport',
        role: 'Commercial engine',
        description:
          'Developing practical tools and operations support for athletes, clubs, and sports organizations.',
        pledge: '4% of revenue pledged unconditionally to Parafencing 4 Progress.',
        linkLabel: 'Explore A4A',
      },
      P4P: {
        purpose: 'Access to adaptive fencing',
        role: 'Nonprofit branch in development',
        description:
          'A vision for equipment, coaching, and support that makes participation easier.',
        pledge:
          'Funded through A4A revenue pledge to provide specialized wheelchairs and training.',
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
    reciprocityTitle: 'Radical reciprocity in practice',
    reciprocityIntro:
      'The three branches do not operate in silos. Each reinforces the others to grow total value.',
    reciprocitySteps: [
      {
        from: 'A4A',
        to: 'P4P',
        label: '4% Revenue Pledge',
        text: 'Commercial sports operations unconditionally fund adaptive equipment, coaching, and athlete camps.',
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
    philosophyTitle: 'The Emerald Pasture',
    philosophyText:
      'In traditional strategy, markets are framed as oceans: "Red Oceans" of fierce competition for existing demand, or "Blue Oceans" seeking new spaces. Bulachak operates in the Emerald Pasture: cultivating shared ground where people compete with excellence and cooperate with trust, growing total value together.',
    alignment: 'Human alignment first, AI second.',
    philosophyLink: 'Explore the philosophy',
    comparisons: [
      {
        id: 'red-ocean',
        title: 'Red Ocean',
        action: 'Extract value',
        description: 'Compete for a share of existing demand in a zero-sum contest.',
      },
      {
        id: 'blue-ocean',
        title: 'Blue Ocean',
        action: 'Discover value',
        description: 'Create new demand and find untapped, uncontested markets.',
      },
      {
        id: 'emerald-pasture',
        title: 'Emerald Pasture',
        action: 'Grow value together',
        description:
          'Share knowledge and combine strengths within clear agreements. Respect people’s time and capacity.',
      },
    ],
    workTitle: 'Experience informing what comes next',
    workText:
      'Explore the founder’s earlier projects in sport, operations, and community work: experience that informs Bulachak’s direction.',
    workLink: 'Explore the portfolio',
    founderLink: 'Meet the founder',
    featuredTitle: 'Proven receipts behind Bulachak',
    featuredSubtitle:
      'The foundation of Bulachak rests on delivered systems in operations, public platforms, and community access.',
    contactTitle: 'Building the future together',
    contactSubtitle:
      'Whether you are a sports organization looking for operations support, an athlete operator, or exploring community collaboration — let’s connect.',
    contactActionBriefing: 'Start a briefing',
    contactActionAthlete: 'Athlete intake',
    contactActionAbout: 'About Bulachak',
  },
  ru: {
    title: 'Будущее, которое мы строим вместе',
    eyebrow: 'Спорт. Доступность. Сообщество.',
    description:
      'Bulachak означает «будущее» на татарском. Он объединяет три направления: «Агенты для спортсменов» для практической поддержки в спорте, «Парафехтование ради развития» для доступа к адаптивному фехтованию и «Иммигрант для иммигранта» для развития сообщества и взаимопомощи.',
    branchesTitle: 'Три направления, общее будущее',
    branchesIntro: 'У каждого своя цель. Их связывает сотрудничество.',
    branches: {
      A4A: {
        purpose: 'Больше времени для спорта',
        role: 'Коммерческая основа',
        description:
          'Разработка практических инструментов и поддержка повседневной работы спортсменов, клубов и спортивных организаций.',
        pledge: '4% выручки безусловно направляются в поддержку Parafencing 4 Progress.',
        linkLabel: 'Об A4A',
      },
      P4P: {
        purpose: 'Доступ к адаптивному фехтованию',
        role: 'Некоммерческое направление в разработке',
        description:
          'Замысел: оборудование, тренерская помощь и поддержка, которые облегчают участие в спорте.',
        pledge: 'Финансируется через 4% отчислений A4A для обеспечения колясками и сборами.',
        linkLabel: 'О P4P',
      },
      I4I: {
        purpose: 'Сообщество и чувство родства',
        role: 'Поддержка иммигрантов',
        description:
          'Взаимопомощь, обмен знаниями и культурная преемственность в сообществах иммигрантов.',
        pledge: 'Превращение правила «око за око» во взаимную поддержку бизнеса и атлетов.',
        linkLabel: 'Об I4I',
      },
    },
    reciprocityTitle: 'Радикальная взаимность на практике',
    reciprocityIntro:
      'Три направления не существуют изолированно. Они усиливают друг друга для общего роста.',
    reciprocitySteps: [
      {
        from: 'A4A',
        to: 'P4P',
        label: '4% отчислений',
        text: 'Коммерческая работа в спорте безусловно финансирует адаптивное оборудование и сборы атлетов.',
      },
      {
        from: 'P4P',
        to: 'I4I',
        label: 'Достоинство и доступ',
        text: 'Адаптивный спорт открывает инклюзивные возможности, укрепляя взаимную поддержку в сообществах.',
      },
      {
        from: 'I4I',
        to: 'A4A',
        label: 'Коопетиция и доверие',
        text: 'Обмен знаниями между предпринимателями-иммигрантами и лидерами спорта питает устойчивый рост.',
      },
    ],
    philosophyEyebrow: 'Философия',
    philosophyTitle: 'Изумрудное пастбище',
    philosophyText:
      'В традиционной стратегии рынки часто делят на океаны: «Красные океаны» жесткой конкуренции за существующий спрос и «Голубые океаны» поиска новых ниш. Bulachak предлагает третий путь — Изумрудное пастбище. Основанное на коопетиции, оно позволяет соревноваться в мастерстве и сотрудничать на основе прозрачных договорённостей, увеличивая общую ценность.',
    alignment: 'Сначала согласие между людьми, затем ИИ.',
    philosophyLink: 'Подробнее о философии',
    comparisons: [
      {
        id: 'red-ocean',
        title: 'Красный океан',
        action: 'Извлекать ценность',
        description: 'Конкурировать за долю существующего спроса в игре с нулевой суммой.',
      },
      {
        id: 'blue-ocean',
        title: 'Голубой океан',
        action: 'Открывать ценность',
        description: 'Создавать новый спрос и находить неосвоенные рынки.',
      },
      {
        id: 'emerald-pasture',
        title: 'Изумрудное пастбище',
        action: 'Выращивать ценность вместе',
        description:
          'Делиться знаниями и объединять силы на основе ясных договорённостей. Уважать время и возможности людей.',
      },
    ],
    workTitle: 'Опыт, который определяет дальнейшее направление',
    workText:
      'Ранние проекты основательницы в спорте, организации работы и поддержке сообществ: опыт, на который опирается развитие Bulachak.',
    workLink: 'Посмотреть портфолио',
    founderLink: 'Об основательнице',
    featuredTitle: 'Проверенная основа Bulachak',
    featuredSubtitle:
      'В основе Bulachak — реализованные проекты в организации процессов, цифровых сервисах и поддержке сообществ.',
    contactTitle: 'Строить будущее вместе',
    contactSubtitle:
      'Для спортивных организаций, спортсменов-предпринимателей и партнёров в адаптивном спорте и сообществах — давайте строить будущее вместе.',
    contactActionBriefing: 'Начать обсуждение',
    contactActionAthlete: 'Анкета для спортсменов',
    contactActionAbout: 'О Bulachak',
  },
  tt: {
    title: 'Бергә төзи торган киләчәк',
    eyebrow: 'Спорт. Мөмкинлекләр. Берләшмә.',
    description:
      'Bulachak татарча «киләчәк» дигәнне аңлата. Ул өч юнәлешне берләштерә. «Спортчылар өчен агентлар» спорттагы көндәлек эшләргә ярдәм итү өчен кораллар әзерли. «Үсеш өчен парафехтование» адаптив фехтование белән шөгыльләнү мөмкинлеген киңәйтү өчен әзерләнә. «Иммигрант иммигрант өчен» кешеләрне якынайтуга һәм үзара ярдәмгә багышланган.',
    branchesTitle: 'Өч юнәлеш, уртак киләчәк',
    branchesIntro: 'Һәркайсының үз максаты бар. Аларны хезмәттәшлек бәйли.',
    branches: {
      A4A: {
        purpose: 'Спортка күбрәк вакыт',
        role: 'Коммерция нигезе',
        description:
          'Спортчыларга, клубларга һәм спорт оешмаларына көндәлек эшләрен оештырырга ярдәм итә торган кораллар әзерләү.',
        pledge: 'Керемнең 4% өлеше Parafencing 4 Progress юнәлешенә җибәрелә.',
        linkLabel: 'A4A турында',
      },
      P4P: {
        purpose: 'Адаптив фехтование белән шөгыльләнү мөмкинлеге',
        role: 'Коммерцияле булмаган юнәлеш, әле әзерләнә',
        description: 'Максат: спортта катнашуны җиңеләйтү өчен җиһазлар һәм тренер ярдәме булдыру.',
        pledge: 'A4A кертемнәре исәбенә махсус арбалар һәм күнегүләр оештыру өчен әзерләнә.',
        linkLabel: 'P4P турында',
      },
      I4I: {
        purpose: 'Берләшмә һәм туганлык',
        role: 'Иммигрантларга ярдәм',
        description:
          'Иммигрантлар арасында үзара ярдәм, белем уртаклашу, мәдәниятне киләсе буыннарга тапшыру.',
        pledge: 'Үзара ярдәм аша эшмәкәрләр һәм спортчылар арасында ныклы бәйләнеш төзү.',
        linkLabel: 'I4I турында',
      },
    },
    reciprocityTitle: 'Гамәлдәге үзара ярдәм',
    reciprocityIntro:
      'Өч юнәлеш аерым гына эшләми. Алар уртак кыйммәтне арттыру өчен бер-берсен көчәйтә.',
    reciprocitySteps: [
      {
        from: 'A4A',
        to: 'P4P',
        label: '4% керем бүлешү',
        text: 'Спорттагы эшчәнлек кеременең бер өлеше адаптив спорт җиһазларын һәм җыеннарын тәэмин итә.',
      },
      {
        from: 'P4P',
        to: 'I4I',
        label: 'Хөрмәт һәм мөмкинлек',
        text: 'Адаптив спорт мөмкинлекләре кешеләрне якынайта, берләшмәләрдә үзара терәк булуны ныгыта.',
      },
      {
        from: 'I4I',
        to: 'A4A',
        label: 'Хезмәттәшлек һәм ышаныч',
        text: 'Иммигрант-эшмәкәрләр һәм спорт лидерлары арасындагы тәҗрибә уртаклашу тотрыклы үсешкә китерә.',
      },
    ],
    philosophyEyebrow: 'Фәлсәфә',
    philosophyTitle: 'Зөбәрҗәт болын',
    philosophyText:
      'Гадәттәге стратегиядә базарларны «океаннар» белән чагыштыралар: булган чикле сорау өчен көрәшә торган «Кызыл океаннар» һәм яңа буш урыннар эзли торган «Зәңгәр океаннар». Bulachak өченче юлны — Зөбәрҗәт болынны сайлый. Коопетициягә таянып, оешмалар осталыкта ярыша һәм ачык килешүләр нигезендә хезмәттәшлек итә, уртак кыйммәтне арттыра.',
    alignment: 'Башта кешеләр үзара килешә, аннары ясалма интеллект (ЯИ) ярдәмгә килә.',
    philosophyLink: 'Фәлсәфә турында күбрәк',
    comparisons: [
      {
        id: 'red-ocean',
        title: 'Кызыл океан',
        action: 'Кыйммәтне алу',
        description: 'Булган ихтыяҗның бер өлеше өчен көндәшлек итү.',
      },
      {
        id: 'blue-ocean',
        title: 'Зәңгәр океан',
        action: 'Кыйммәтне ачу',
        description: 'Яңа ихтыяҗ тудыру һәм әле үзләштерелмәгән базарлар табу.',
      },
      {
        id: 'emerald-pasture',
        title: 'Зөбәрҗәт болын',
        action: 'Кыйммәтне бергә үстерү',
        description:
          'Белем уртаклашып, көчләрне берләштереп, уртак кыйммәтне арттыру. Кешеләрнең вакытын һәм мөмкинлекләрен хөрмәт итү.',
      },
    ],
    workTitle: 'Алга таба эшләргә нигез булган тәҗрибә',
    workText:
      'Нигез салучының спорт, эшне оештыру һәм кешеләрне берләштерү өлкәсендәге элеккеге проектлары белән танышыгыз. Шушы тәҗрибә Bulachakның алдагы юнәлешен билгеләргә ярдәм итә.',
    workLink: 'Портфолионы карау',
    founderLink: 'Нигез салучы турында',
    featuredTitle: 'Bulachak нигезендәге сыналган тәҗрибә',
    featuredSubtitle:
      'Bulachak спортны оештыру, санлы кораллар һәм берләшмәләр өлкәсендәге чын проектларга таяна.',
    contactTitle: 'Киләчәкне бергә төзик',
    contactSubtitle:
      'Спорт оешмалары, спортчы-эшмәкәрләр һәм берләшмәләр өчен — киләчәкне бергә төзик.',
    contactActionBriefing: 'Фикер алышуны башлау',
    contactActionAthlete: 'Спортчылар өчен гариза',
    contactActionAbout: 'Bulachak турында',
  },
};
