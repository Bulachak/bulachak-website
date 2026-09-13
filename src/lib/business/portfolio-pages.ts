// @polsia:user-owned: canonical localized branch and founder copy; provenance in docs/portfolio/STORIES-DRAFT.md.
import { englishAbout } from '@/lib/business/portfolio-about.en';
import { russianAbout } from '@/lib/business/portfolio-about.ru';
import { tatarAbout } from '@/lib/business/portfolio-about.tt';
import type { StoryPage } from '@/lib/contracts/portfolio-pages';
import type { PortfolioLanguage } from '@/lib/portfolio-locale';

function section(
  id: string,
  title: string,
  ...paragraphs: string[]
): StoryPage['sections'][number] {
  return { id, title, paragraphs };
}

export const portfolioStoryPages: Record<PortfolioLanguage, StoryPage[]> = {
  en: [
    englishAbout,
    {
      slug: 'founder',
      title: 'Kamilla Gafurzianova, OLY',
      eyebrow: 'The founder',
      description:
        'Olympic silver medalist in fencing, coach, and systems builder; founder of Bulachak.',
      sections: [
        section(
          'background',
          'The person behind the work',
          "I am Kamilla Gafurzianova, an Olympic silver medalist in fencing, a coach, and a systems builder. I've worked in sport as an athlete, operator, and committee chair. Each role shapes how I approach the practical work behind sport.",
          'I build websites and tools, organize information, and work through the decisions behind them. My portfolio includes youth-sport resources, operations projects, brand tools, and community governance. I like getting the details into a form someone else can understand and use.',
        ),
        section(
          'method',
          'How I work',
          'My method is called PPPP: Past, Present, Possible, Practice. I begin with the history and the actual work, look at what could improve, then turn decisions into something people can repeat. Clear ownership matters throughout.',
        ),
        section(
          'purpose',
          'Why I keep building',
          'Bulachak brings that practice together with my reasons for doing it. I want to help build parafencing, support people working in sport, and create useful partnerships among immigrant communities. My Tatar identity is part of that perspective.',
          'I care about excellence and how people are treated while pursuing it. I want the tools I build to help them keep doing good work with more understanding and less avoidable effort. The projects here show what I have made, what I have learned, and what I am still developing.',
        ),
      ],
    },
    {
      slug: 'a4a',
      title: 'More time for the work of sport',
      eyebrow: 'A4A · Agents 4 Athletes',
      description:
        'Agents 4 Athletes develops AI-supported operations for athletes, clubs, and sports organizations, so more time can go into sport.',
      relatedLeg: 'A4A',
      sections: [
        section(
          'origin',
          'The work around sport',
          'Bookings, payments, equipment, and messages can sit in separate places. A4A addresses the work of connecting them: helping a coach find session information, an athlete organize a business, or a club see who is responsible for the next task.',
          'The commercial branch follows the Emerald Pasture philosophy. Co-opetition allows clubs and businesses to compete while sharing useful knowledge and tools. Clear agreements recognize contributions and make cooperation possible without requiring everyone to work in the same way.',
        ),
        section(
          'approach',
          'Coordinated agents, human responsibility',
          'The design brings coordinated AI agents to equipment sourcing, routine administration, and communications. A coordinating agent connects their work. People set the rules, review consequential decisions, and remain responsible for commitments to athletes and families.',
          'A2A means agent-to-agent: communication between software agents. A4A places the athlete at the center of that relationship. Technology serves the work of sport; its usefulness should be clear without technical expertise.',
        ),
        section(
          'next',
          'Current development',
          'A4A is developing prototypes for its first paid pilots. Adaptive sport is a priority. The funding pledge assigns 4% of future A4A commercial revenue to Parafencing 4 Progress, as revenue is earned.',
        ),
      ],
    },
    {
      slug: 'p4p',
      title: 'Help people start. Give them reasons to stay.',
      eyebrow: 'P4P · Parafencing 4 Progress',
      description:
        'Parafencing 4 Progress is Bulachak’s developing nonprofit branch, focused on access to wheelchair fencing through equipment, coaching, and lasting support.',
      relatedLeg: 'P4P',
      sections: [
        section(
          'origin',
          'Access that continues',
          'Wheelchair fencing needs specialized equipment and people who know how to use it. Before a program begins, a club needs to understand what to obtain, where to find it, and who can coach. Athletes and families need clear information about taking part.',
          'P4P focuses on the conditions that make returning possible. An introductory session can open a door, but continued participation depends on equipment, coaching, and a program that can keep running.',
        ),
        section(
          'support',
          'Shared foundations for the sport',
          'The planned work includes equipment comparisons and sourcing, starter resources for clubs, and practical coaching material. Camps and athlete development belong alongside those foundations. Support should be developed with the athletes, coaches, and clubs who will use it.',
          'The Emerald Pasture principle here is co-opetition: clubs can compete in sport while sharing knowledge and resources that help the sport grow. Useful equipment guidance or coaching material can support more than one program. Clear responsibilities help that shared work continue beyond an introductory event.',
        ),
        section(
          'next',
          'Current development',
          'P4P is Bulachak’s nonprofit branch in development. Its organizational form and funding arrangements are still taking shape. Planned funding includes the pledge of 4% of future A4A commercial revenue.',
        ),
      ],
    },
    {
      slug: 'i4i',
      title: 'Pass the help forward',
      eyebrow: 'I4I · Immigrant 4 Immigrant',
      description:
        'Immigrant 4 Immigrant is Bulachak’s branch for immigrant kinship, mutual support, and cultural continuity across generations.',
      relatedLeg: 'I4I',
      sections: [
        section(
          'name',
          'A name with a different meaning',
          'I4I sounds like “eye for eye.” The name turns a phrase about retaliation into an invitation to help one another. Knowledge, introductions, and practical support can pass between people and across generations.',
          'The branch gives immigrant experience a place within Bulachak beyond sport. Its focus is practical help, relationships, and cultural knowledge, so language and community connections can continue across generations. Business support is one part of that wider purpose.',
        ),
        section(
          'community',
          'Cooperation within competition',
          'I4I applies the Emerald Pasture idea of co-opetition to community life. Independent businesses can compete and still recommend each other, exchange knowledge, or share useful administrative tools. Collaboration can begin within a cultural community and reach beyond it.',
          'Reciprocity needs clear expectations. Knowledge, practical skills, and time are all contributions. Exchanges should be fair, contributions should be recognized, and commitments should respect each person’s capacity.',
        ),
        section(
          'next',
          'Current development',
          'I4I is still developing. The next step is to build useful relationships and practical support around these principles, with clear agreements about what participants can offer. Connections with A4A can also support immigrants who are athletes opening an academy or building a business.',
        ),
      ],
    },
  ],
  ru: [
    russianAbout,
    {
      slug: 'founder',
      title: 'Камилла Гафурзянова, OLY',
      eyebrow: 'Об основательнице',
      description:
        'Серебряный призёр Олимпийских игр по фехтованию, тренер, разработчик рабочих систем и основательница Bulachak.',
      sections: [
        section(
          'background',
          'Человек за проектами',
          'Меня зовут Камилла Гафурзянова. Я серебряный призёр Олимпийских игр по фехтованию, тренер и разработчик рабочих систем. В спорте я была спортсменкой, занималась организационной работой и возглавляла комитет. Каждая из этих ролей влияет на то, как я подхожу к повседневной работе, которая поддерживает спорт.',
          'Я создаю сайты и инструменты, упорядочиваю информацию и разбираюсь с решениями, которые за ними стоят. В портфолио есть ресурсы для детского спорта, операционные проекты, инструменты для работы с брендом и управление общественными организациями. Мне нравится приводить детали в такой вид, чтобы другой человек мог их понять и использовать.',
        ),
        section(
          'method',
          'Как я работаю',
          'Мой метод называется PPPP: Past, Present, Possible, Practice. Прошлое, настоящее, возможное и практика. Сначала я разбираюсь в истории и в том, как работа устроена сейчас, затем ищу, что можно улучшить, и превращаю решения в действия, которые люди смогут повторять. На каждом этапе должно быть понятно, кто за что отвечает.',
        ),
        section(
          'purpose',
          'Почему я продолжаю',
          'Bulachak связывает эту практику с тем, ради чего я работаю. Я хочу помогать развитию парафехтования, поддерживать людей в спорте и создавать полезные партнёрства среди иммигрантских сообществ. Моя татарская идентичность тоже формирует этот взгляд.',
          'Для меня важны и высокое качество работы, и то, как обращаются с людьми на пути к нему. Я хочу, чтобы мои инструменты помогали им продолжать делать своё дело хорошо, лучше понимать происходящее и меньше сил тратить впустую. Здесь можно увидеть, что я создала, чему научилась и что ещё разрабатываю.',
        ),
      ],
    },
    {
      slug: 'a4a',
      title: 'Больше времени на работу в спорте',
      eyebrow: 'A4A · Агенты для спортсменов',
      description:
        'Направление «Агенты для спортсменов» разрабатывает рабочие системы с поддержкой ИИ для спортсменов, клубов и спортивных организаций, чтобы больше времени оставалось на спорт.',
      relatedLeg: 'A4A',
      sections: [
        section(
          'origin',
          'Работа вокруг спорта',
          'Записи на занятия, платежи, сведения об оборудовании и переписка могут храниться в разных местах. A4A помогает связать эту работу: тренеру найти информацию о занятии, спортсмену организовать бизнес, клубу понять, кто отвечает за следующую задачу.',
          'Коммерческое направление опирается на философию Изумрудного пастбища. Коопетиция позволяет клубам и компаниям конкурировать и одновременно делиться полезными знаниями и инструментами. Ясные договорённости помогают признавать вклад каждого и сотрудничать, сохраняя разные способы работы.',
        ),
        section(
          'approach',
          'Согласованная работа агентов, ответственность людей',
          'В основе проекта согласованная работа ИИ-агентов: поиск оборудования, повседневное администрирование и коммуникация. Координирующий агент связывает их задачи. Люди устанавливают правила, проверяют решения с серьёзными последствиями и отвечают за обязательства перед спортсменами и семьями.',
          'A2A означает agent-to-agent, то есть общение программных агентов между собой. A4A ставит в центр этих отношений спортсмена. Технология служит работе в спорте, а её польза должна быть понятна без специальных технических знаний.',
        ),
        section(
          'next',
          'Текущий этап',
          'Сейчас A4A развивает прототипы и готовится к первым платным пилотам. Адаптивный спорт в приоритете. Обязательство по финансированию предусматривает передачу 4% будущей коммерческой выручки A4A направлению «Парафехтование ради развития» по мере получения выручки.',
        ),
      ],
    },
    {
      slug: 'p4p',
      title: 'Помочь начать. Дать возможность продолжать.',
      eyebrow: 'P4P · Парафехтование ради развития',
      description:
        '«Парафехтование ради развития» создаётся как некоммерческое направление Bulachak. Его цель: доступное фехтование на колясках благодаря оборудованию, тренерской работе и постоянной поддержке.',
      relatedLeg: 'P4P',
      sections: [
        section(
          'origin',
          'Доступность с продолжением',
          'Фехтованию на колясках нужны специальное оборудование и люди, умеющие с ним работать. До запуска программы клубу нужно разобраться, что приобрести, где это найти и кто сможет вести занятия. Спортсменам и семьям нужна понятная информация об участии.',
          'P4P сосредоточено на условиях, благодаря которым человек сможет прийти снова. Ознакомительное занятие даёт возможность попробовать, но для продолжения нужны оборудование, тренерская поддержка и программа, которая сможет работать дальше.',
        ),
        section(
          'support',
          'Общая основа для развития спорта',
          'В планах сравнение и поиск оборудования, стартовые ресурсы для клубов и практические тренерские материалы. Сборы и развитие спортсменов должны опираться на эту основу. Поддержку следует разрабатывать вместе со спортсменами, тренерами и клубами, которые будут ею пользоваться.',
          'Принцип Изумрудного пастбища здесь выражается в коопетиции: клубы могут соревноваться и одновременно делиться знаниями и ресурсами, которые помогают развитию спорта. Полезные рекомендации по оборудованию или тренерские материалы могут служить нескольким программам. Ясное распределение ответственности помогает продолжать общую работу после ознакомительного мероприятия.',
        ),
        section(
          'next',
          'Текущий этап',
          'P4P развивается как некоммерческое направление Bulachak. Организационная форма и порядок финансирования ещё складываются. В план финансирования входит обязательство направлять 4% будущей коммерческой выручки A4A на поддержку P4P.',
        ),
      ],
    },
    {
      slug: 'i4i',
      title: 'Передавать помощь дальше',
      eyebrow: 'I4I · Иммигрант для иммигранта',
      description:
        '«Иммигрант для иммигранта» объединяет в Bulachak чувство общности, взаимную поддержку иммигрантов и передачу культуры между поколениями.',
      relatedLeg: 'I4I',
      sections: [
        section(
          'name',
          'Название с другим смыслом',
          'I4I звучит как английское «eye for eye», то есть «око за око». Название превращает выражение о возмездии в приглашение помогать друг другу. Знания, знакомства и практическая поддержка могут передаваться между людьми и поколениями.',
          'Это направление сохраняет в Bulachak место для иммигрантского опыта за пределами спорта. В центре внимания практическая помощь, отношения и культурные знания, благодаря которым язык и связи внутри сообщества могут передаваться между поколениями. Поддержка бизнеса составляет часть этой более широкой цели.',
        ),
        section(
          'community',
          'Сотрудничество внутри конкуренции',
          'I4I применяет идею коопетиции из философии Изумрудного пастбища к жизни сообщества. Независимые компании могут конкурировать и при этом рекомендовать друг друга, обмениваться знаниями или совместно использовать полезные административные инструменты. Сотрудничество может начаться внутри культурного сообщества и выйти за его пределы.',
          'Взаимность требует ясных ожиданий. Знания, практические навыки и время составляют вклад участников. Обмен должен быть справедливым, вклад каждого признанным, а обязательства должны учитывать возможности людей.',
        ),
        section(
          'next',
          'Текущий этап',
          'I4I ещё развивается. Следующий шаг состоит в создании полезных связей и практической поддержки на этих принципах, с понятными договорённостями о вкладе участников. Связь с A4A может также поддержать иммигрантов, которые одновременно являются спортсменами и открывают академию или строят бизнес.',
        ),
      ],
    },
  ],
  tt: [
    tatarAbout,
    {
      slug: 'founder',
      title: 'Камилла Гафурзянова, OLY',
      eyebrow: 'Нигез салучы турында',
      description:
        'Фехтование буенча Олимпия уеннарының көмеш медаль иясе, тренер, эшне оештыру системаларын төзүче һәм Bulachakка нигез салучы.',
      sections: [
        section(
          'background',
          'Минем эш тәҗрибәм',
          'Мин Камилла Гафурзянова. Фехтование буенча Олимпия уеннарының көмеш медаль иясе, тренер һәм эшне оештыру системаларын төзүче. Спортчы, оештыручы һәм комитет рәисе булып эшләдем. Шушы тәҗрибә спорттагы көндәлек эшкә карашымны билгели.',
          'Мин сайтлар һәм кораллар ясыйм, мәгълүматны тәртипкә китерәм, аларга бәйле карарларны җентекләп уйлыйм. Портфолиомда балалар спорты өчен ресурслар, эшне оештыру проектлары, бренд кораллары һәм җәмәгать оешмалары белән идарә итү тәҗрибәсе бар. Детальләрне башка кеше аңлап куллана алырлык итеп тәртипкә китерергә яратам.',
        ),
        section(
          'method',
          'Ничек эшлим',
          'PPPP алымын кулланам: Past, Present, Possible, Practice. Башта эшнең үткәнен һәм хәзер ничек башкарылуын өйрәнәм. Аннары нәрсәне яхшыртып булуын карыйм, карарларны кабат куллана алырлык эш тәртибенә әйләндерәм. Һәр адымда кемнең нәрсә өчен җаваплы булуы аңлашылып торырга тиеш.',
        ),
        section(
          'purpose',
          'Ни өчен дәвам итәм',
          'Bulachakта тәҗрибәм белән максатларым берләшә. Мин парафехтованиене үстерергә, спортта эшләүче кешеләргә ярдәм итәргә һәм иммигрантлар арасында файдалы хезмәттәшлек булдырырга телим. Татар булуым да карашларыма йогынты ясый.',
          'Минем өчен югары нәтиҗәгә ирешү дә, эш барышында кешеләргә хөрмәт белән карау да мөһим. Ясаган коралларым эшне аңлап, яхшы башкарырга, кирәксез мәшәкатьне киметергә ярдәм итсен иде. Мондагы проектлар нәрсә ясаганымны, нәрсәгә өйрәнгәнемне һәм әле нәрсә өстендә эшләгәнемне күрсәтә.',
        ),
      ],
    },
    {
      slug: 'a4a',
      title: 'Спортка күбрәк вакыт',
      eyebrow: 'A4A · Спортчылар өчен агентлар',
      description:
        '«Спортчылар өчен агентлар» спортчыларга, клубларга һәм спорт оешмаларына көндәлек эштә ясалма интеллект (ЯИ) кулланырга ярдәм итә торган системалар әзерли. Максат: спортка күбрәк вакыт калдыру.',
      relatedLeg: 'A4A',
      sections: [
        section(
          'origin',
          'Спорттагы көндәлек эшләр',
          'Дәрескә язылу, түләүләр, җиһазлар турында мәгълүмат һәм хәбәрләр төрле җирдә булырга мөмкин. A4A аларны бәйли торган чишелешләр әзерли: тренерга дәрес мәгълүматын табарга, спортчыга бизнесын оештырырга, клубка эшне кем башкарырга тиешлеген күрергә ярдәм итә.',
          'Бу коммерция юнәлеше Зөбәрҗәт болын фәлсәфәсенә таяна. Клублар һәм компанияләр көндәшлек иткән килеш тә файдалы белем һәм кораллар белән уртаклаша ала. Аңлаешлы килешүләр һәркемнең өлешен танырга ярдәм итә. Хезмәттәшлек өчен барысының да бертөрле эшләве кирәк түгел.',
        ),
        section(
          'approach',
          'Агентлар бергә эшли, кешеләр җавап бирә',
          'Система җиһазлар табуны, көндәлек оештыру эшләрен һәм хәбәрләшүне ЯИ агентлары арасында бүлүгә нигезләнә. Бер агент аларның эшен килештерә. Кагыйдәләрне кешеләр билгели, мөһим карарларны тикшерә һәм спортчылар белән гаиләләр алдындагы йөкләмәләр өчен\u00a0җавап\u00a0бирә.',
          'A2A (agent-to-agent) программа агентларының бер-берсе белән аралашуын аңлата. A4Aда бу эшнең үзәгендә спортчы тора. Технология спорт эшенә ярдәм итәргә, аның файдасы махсус техник белемсез дә аңлашылырга тиеш.',
        ),
        section(
          'next',
          'Хәзерге эшләр',
          'A4A беренче түләүле сынау проектлары өчен прототиплар әзерли. Адаптив спортка өстенлек бирелә. Йөкләмә буенча, киләчәктә A4Aның коммерция кеременең 4 проценты, керем алынган саен, «Үсеш өчен парафехтование» юнәлешенә биреләчәк.',
        ),
      ],
    },
    {
      slug: 'p4p',
      title: 'Башларга да, дәвам итәргә дә ярдәм',
      eyebrow: 'P4P · Үсеш өчен парафехтование',
      description:
        '«Үсеш өчен парафехтование» Bulachakның әле әзерләнә торган коммерцияле булмаган юнәлеше. Максаты: арбада фехтование белән шөгыльләнү өчен җиһаз, тренер ярдәме һәм даими терәк булдыру.',
      relatedLeg: 'P4P',
      sections: [
        section(
          'origin',
          'Даими шөгыльләнү мөмкинлеге',
          'Арбада фехтование өчен махсус җиһаз һәм аны куллана белүче кешеләр кирәк. Программа башланганчы клуб нәрсә алырга, аны кайдан табарга һәм дәресләрне кем алып бара алырын ачыклый. Спортчыларга һәм гаиләләргә ничек катнашырга икәнен аңлатырга кирәк.',
          'P4P кешенең спортны дәвам итә алуына игътибар итә. Танышу дәресендә сынап карарга мөмкин. Әмма даими шөгыльләнү өчен җиһазлар, тренер ярдәме һәм алга таба да эшли торган программа кирәк.',
        ),
        section(
          'support',
          'Спорт үсеше өчен уртак нигез',
          'Планда җиһазларны чагыштыру һәм табу, клубларга эшне башлап җибәрү өчен ресурслар, тренерларга гамәли материаллар әзерләү бар. Уку-күнегү җыеннары һәм спортчыларны үстерү дә шуның белән бергә алып барылырга тиеш. Ярдәмне аннан файдаланачак спортчылар, тренерлар һәм клублар белән бергә әзерләү мөһим.',
          'Зөбәрҗәт болын фәлсәфәсе буенча, клублар ярышларда көндәш булып, спортны үстерүдә хезмәттәшлек итә ала. Алар файдалы белем һәм ресурслар белән уртаклаша. Җиһаз турында киңәшләр һәм тренерлар өчен материаллар берничә программага ярдәм итә ала. Кемнең нәрсә өчен җаваплы булуы ачык булса, уртак эш танышу чарасыннан соң да дәвам итә ала.',
        ),
        section(
          'next',
          'Хәзерге эшләр',
          'P4P әле әзерләнә. Аның оештыру формасы һәм финанслау тәртибе билгеләнә. Планлаштырылган финанслауга A4Aның киләчәктәге коммерция кеременең 4 процентын P4Pга тапшыру йөкләмәсе дә керә.',
        ),
      ],
    },
    {
      slug: 'i4i',
      title: 'Ярдәмне башкаларга\u00a0тапшыру',
      eyebrow: 'I4I · Иммигрант иммигрант өчен',
      description:
        '«Иммигрант иммигрант өчен» иммигрантларны якынайтуга, үзара ярдәмгә һәм мәдәниятне буыннан буынга тапшыруга багышланган Bulachak юнәлеше.',
      relatedLeg: 'I4I',
      sections: [
        section(
          'name',
          'Башка мәгънә алган исем',
          'I4I инглизчә «eye for eye», ягъни «күз өчен күз» гыйбарәсенә охшаш яңгырый. Бу исемдә үч кайтару урынын бер-береңә ярдәм итү ала. Кешеләр белемнәрен уртаклаша, бер-берсен таныштыра, ярдәмне киләсе буыннарга да тапшыра ала.',
          'Иммигрантлар тәҗрибәсе спорт белән генә чикләнми. I4I көндәлек ярдәмгә, кешеләр арасындагы бәйләнешләргә һәм мәдәни белемгә дә урын бирә. Максат: телне, мәдәни белемне һәм арадагы бәйләнешләрне киләсе буыннарга тапшыру. Бизнеска ярдәм итү дә шушы киңрәк максатның бер өлеше.',
        ),
        section(
          'community',
          'Көндәшлек тә, хезмәттәшлек тә',
          'I4I Зөбәрҗәт болын фәлсәфәсен кешеләрнең аралашуында һәм уртак эшендә куллана. Мөстәкыйль компанияләр көндәшлек иткән килеш тә бер-берсен башкаларга тәкъдим итә, белем уртаклаша һәм эшне оештыру коралларын бергә куллана ала. Мәдәнияте уртак кешеләрдән башланган хезмәттәшлек башкаларны да берләштерә ала.',
          'Һәркемнең нәрсә тәкъдим итә алуын алдан килешү мөһим. Белем, күнекмәләр һәм вакыт та уртак эшкә керткән өлеш булып санала. Алмашу гадел булырга, һәркемнең өлеше танылырга тиеш. Йөкләмәләр кешенең мөмкинлегенә туры килергә тиеш.',
        ),
        section(
          'next',
          'Хәзерге эшләр',
          'I4I әле әзерләнә. Алдагы адым: шушы принципларга таянып, файдалы бәйләнешләр булдыру һәм гамәли ярдәм оештыру. Катнашучыларның нәрсә белән ярдәм итә алуын алдан килешергә кирәк. A4A белән хезмәттәшлек академия ачучы яки үз бизнесын оештыручы спортчы иммигрантларга да ярдәм итә ала.',
        ),
      ],
    },
  ],
};
