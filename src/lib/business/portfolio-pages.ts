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
      title: 'More time for\u00A0the work of\u00A0sport',
      eyebrow: 'A4A · Agents 4\u00A0Athletes',
      description:
        'Agents 4\u00A0Athletes builds AI-agent operations for\u00A0athletes, clubs, and sports organizations, reclaiming vital hours for\u00A0training and competition.',
      relatedLeg: 'A4A',
      sections: [
        section(
          'origin',
          'The work around sport',
          'Schedules, payments, equipment rosters, and messages frequently scatter across disconnected channels. A4A unifies that back office into a\u00A0coherent operational engine: enabling coaches to\u00A0retrieve session details instantly, athlete operators to\u00A0run sustainable businesses, and clubs to\u00A0clarify accountability across every workflow.',
          'As Bulachak’s commercial engine, A4A operates on\u00A0the Emerald Pasture philosophy. Co-opetition allows clubs and sporting ventures to\u00A0compete vigorously while sharing useful knowledge, infrastructure, and tools. Transparent agreements recognize individual contributions and build compound value without forcing organizations into a\u00A0rigid mold.',
        ),
        section(
          'approach',
          'Coordinated agents, human responsibility',
          'A4A deploys specialized AI\u00A0agents across equipment sourcing, operational scheduling, routine administration, and communications, linked through an\u00A0executive coordinator. Human judgment remains sovereign: operators set governing policies, review consequential decisions, and maintain direct responsibility to\u00A0athletes and families.',
          'While A2A (agent-to-agent) engineering defines communication protocols between software systems, A4A anchors that intelligence directly to\u00A0athlete needs. Technology serves athletic craft, delivering immediate operational leverage without requiring engineering expertise.',
        ),
        section(
          'next',
          'Current development',
          'A4A is advancing core prototypes toward inaugural commercial pilots, with adaptive sport as an\u00A0anchor priority. In\u00A0direct practice of\u00A0radical reciprocity, A4A commits an\u00A0unconditional pledge of\u00A04% of\u00A0commercial revenue to\u00A0Parafencing 4\u00A0Progress as revenue is earned.',
        ),
      ],
    },
    {
      slug: 'p4p',
      title: 'Help people start. Give them reasons to\u00A0stay.',
      eyebrow: 'P4P · Parafencing 4\u00A0Progress',
      description:
        'Parafencing 4\u00A0Progress is Bulachak’s nonprofit initiative advancing access to\u00A0wheelchair fencing through specialized equipment, coach education, and sustainable club programs.',
      relatedLeg: 'P4P',
      sections: [
        section(
          'origin',
          'Access that continues',
          'Wheelchair fencing demands specialized frames, tailored gear, and coaches skilled in\u00A0adaptive mechanics. Launching a\u00A0viable program requires clear answers before athletes arrive: sourcing certified equipment, training instructors, and providing transparent onboarding for\u00A0families.',
          'P4P focuses on\u00A0the structural conditions that turn initial interest into sustained participation. An\u00A0introductory clinic opens the door, but long-term athletic development relies on\u00A0dedicated equipment, structured coaching pathways, and resilient club programming.',
        ),
        section(
          'support',
          'Shared foundations for\u00A0the sport',
          'The initiative provides standardized equipment benchmarks, starter toolkits for\u00A0clubs, and practical coaching curricula. Training camps and athlete development pipelines build directly on\u00A0these foundations, designed in\u00A0continuous collaboration with parafencers, coaches, and host venues.',
          'In\u00A0the spirit of\u00A0the Emerald Pasture, P4P operationalizes co-opetition across the fencing community: clubs rival each other in\u00A0competition while pooling logistical know-how and educational assets to\u00A0expand the sport. Standardized sourcing and shared coaching playbooks multiply the reach of\u00A0every participating program.',
        ),
        section(
          'next',
          'Current development',
          'P4P is establishing its governance and program footprint as Bulachak’s dedicated nonprofit initiative. Its capitalization model is anchored by an\u00A0unconditional pledge of\u00A04% of\u00A0A4A commercial revenue, directly channeling enterprise growth into adaptive frames, specialized training, and athlete grants.',
        ),
      ],
    },
    {
      slug: 'i4i',
      title: 'Pass the help forward',
      eyebrow: 'I4I · Immigrant 4\u00A0Immigrant',
      description:
        'Immigrant 4\u00A0Immigrant cultivates immigrant kinship, reciprocal venture support, and cultural continuity across generations.',
      relatedLeg: 'I4I',
      sections: [
        section(
          'name',
          'A\u00A0name with a\u00A0different meaning',
          'I4I echoes the phrase “an eye for an eye,” deliberately inverting an\u00A0ancient doctrine of\u00A0retribution into an\u00A0open invitation for\u00A0mutual uplift. Tactical knowledge, commercial introductions, and peer support flow forward between founders and across generations.',
          'The initiative anchors immigrant resilience at\u00A0the core of\u00A0Bulachak beyond athletics. By\u00A0combining practical business enablement with cultural continuity, I4I ensures that language, community memory, and intergenerational trust thrive alongside enterprise.',
        ),
        section(
          'community',
          'Cooperation within competition',
          'I4I applies the Emerald Pasture model of\u00A0co-opetition to\u00A0community enterprise. Independent operators can compete in\u00A0the open market while actively referring clients, sharing operational playbooks, and pooling back-office tools. Collaborative density begins within heritage networks and expands across broader markets.',
          'Radical reciprocity operates through clear commitments. Specialized expertise, operational labor, and relational capital are all recognized as vital contributions. Exchanges are structured with transparency, honoring the value each partner brings while respecting real operational capacity.',
        ),
        section(
          'next',
          'Current development',
          'I4I is expanding its coalition of\u00A0founders and cultural organizations, formalizing mutual-support frameworks and shared infrastructure. In\u00A0synergy with A4A, the initiative equips immigrant athletes and operators to\u00A0launch academies, establish sustainable businesses, and reinvest success back into the community.',
        ),
      ],
    },
  ],
  ru: [
    russianAbout,
    {
      slug: 'founder',
      title: 'Камилла Гафурзянова, OLY',
      eyebrow: 'Об\u00A0основательнице',
      description:
        'Серебряный призёр Олимпийских игр по\u00A0фехтованию, тренер, архитектор операционных систем и\u00A0основательница Bulachak.',
      sections: [
        section(
          'background',
          'Обо\u00A0мне',
          'Я\u00A0Камилла Гафурзянова: серебряный призёр Олимпийских игр по\u00A0фехтованию, тренер и\u00A0архитектор операционных систем.',
          'В\u00A0спорте я\u00A0прошла весь путь: выступала на\u00A0высшем уровне, тренировала, организовывала работу федераций и\u00A0возглавляла комитет. Этот опыт помогает мне видеть спорт со\u00A0всех сторон и\u00A0выстраивать за\u00A0кулисами процессы, которые снимают со\u00A0спортсменов и\u00A0тренеров лишнюю рутину.',
          'Я\u00A0проектирую цифровые сервисы, упорядочиваю хаос в\u00A0данных и\u00A0настраиваю автоматизацию. В\u00A0моём портфолио: платформы для\u00A0детского спорта, оптимизация внутренних операций, цифровые бренд-инструменты и\u00A0системы управления организациями. Мне важно делать сложные вещи простыми: упаковывать детали так, чтобы любой человек мог сразу взять инструмент и\u00A0работать без\u00A0лишних вопросов.',
        ),
        section(
          'method',
          'Как я\u00A0работаю',
          'Мой метод называется PPPP: Past, Present, Possible, Practice (Прошлое, Настоящее, Возможное, Практика). Сначала я\u00A0исследую предысторию задачи и\u00A0текущие процессы, затем нахожу точки роста и\u00A0превращаю решения в\u00A0чёткие алгоритмы, которые команда может легко повторять каждый день. На\u00A0каждом шаге ключевой принцип один: ясная и\u00A0прозрачная ответственность.',
        ),
        section(
          'purpose',
          'Что мной движет',
          'Bulachak объединяет мой практический опыт и\u00A0главные жизненные ориентиры. Я\u00A0стремлюсь развивать парафехтование, поддерживать людей в\u00A0спорте и\u00A0выстраивать надёжные партнёрства внутри иммигрантских сообществ. Моя татарская культура и\u00A0идентичность: неотъемлемая часть этого взгляда.',
          'Для\u00A0меня одинаково важны и\u00A0результат высочайшего уровня, и\u00A0уважение к\u00A0людям, которые к\u00A0нему идут. Моя цель: создавать инструменты, которые помогают делать своё дело профессионально, с\u00A0глубоким пониманием процессов и\u00A0без\u00A0напрасной траты сил. В\u00A0этом портфолио собрано то, что я\u00A0уже создала, чему научилась и\u00A0над\u00A0чем продолжаю работать.',
        ),
      ],
    },
    {
      slug: 'a4a',
      title: 'Больше времени для\u00A0спорта',
      eyebrow: 'A4A · Агенты для\u00A0спортсменов',
      description:
        'A4A создает операционную инфраструктуру на\u00A0базе ИИ-агентов для\u00A0атлетов, клубов и\u00A0спортивных организаций, возвращая время для\u00A0тренировок и\u00A0высоких результатов.',
      relatedLeg: 'A4A',
      sections: [
        section(
          'origin',
          'Операционная опора спорта',
          'Расписания тренировок, платежи, учет экипировки и\u00A0сообщения часто разрознены по\u00A0разным каналам. A4A объединяет эти процессы в\u00A0единый слаженный контур: тренер мгновенно находит детали занятия, спортсмен-предприниматель уверенно ведет собственное дело, а\u00A0клуб четко видит зоны ответственности и\u00A0статус каждой задачи.',
          'Коммерческое направление A4A воплощает философию Изумрудного пастбища. Коопетиция позволяет клубам и\u00A0проектам честно конкурировать на\u00A0соревнованиях и\u00A0одновременно делиться практическими знаниями, опытом и\u00A0цифровыми инструментами. Прозрачные соглашения признают вклад каждого участника, развивая сотрудничество без\u00A0попыток навязать всем одинаковый шаблон.',
        ),
        section(
          'approach',
          'Согласованная работа агентов, ответственность людей',
          'Архитектура A4A координирует специализированных ИИ-агентов: подбор экипировки, текущий календарь, регулярное администрирование и\u00A0коммуникации. Главный связующий агент объединяет эти потоки. При\u00A0этом базовые правила, ключевые решения и\u00A0этические обязательства перед атлетами и\u00A0семьями неизменно остаются за\u00A0людьми.',
          'В\u00A0инженерии принцип A2A (agent-to-agent) означает протоколы взаимодействия между автономными программами. A4A ставит во\u00A0главу угла спортсмена. ИИ-агенты берут на\u00A0себя рутину и\u00A0приносят ощутимую пользу без\u00A0необходимости разбираться в\u00A0технических тонкостях.',
        ),
        section(
          'next',
          'Текущий этап',
          'A4A развивает и\u00A0тестирует рабочие прототипы, готовясь к\u00A0первым коммерческим пилотам. Безусловный приоритет: доступность адаптивного фехтования. Венчурное обязательство закрепляет отчисление 4% коммерческой выручки A4A направлению «Парафехтование ради\u00A0развития» по\u00A0мере поступления средств.',
        ),
      ],
    },
    {
      slug: 'p4p',
      title: 'Помочь начать. Дать возможность продолжать.',
      eyebrow: 'P4P · Парафехтование ради\u00A0развития',
      description:
        '«Парафехтование ради\u00A0развития» (P4P) - некоммерческая инициатива Bulachak: доступность адаптивного фехтования через\u00A0специализированную экипировку, подготовку тренеров и\u00A0системную поддержку клубов.',
      relatedLeg: 'P4P',
      sections: [
        section(
          'origin',
          'Доступность с\u00A0продолжением',
          'Фехтование на\u00A0колясках требует специализированных платформ, экипировки и\u00A0квалифицированных наставников. Клубам, открывающим адаптивную группу, необходимы надежные ориентиры: как выбрать и\u00A0доставить оборудование, как подготовить тренеров и\u00A0как организовать безопасный тренировочный процесс. Атлетам и\u00A0семьям нужна ясная информация и\u00A0уверенность в\u00A0завтрашнем дне.',
          'Главный фокус P4P: создать условия, при\u00A0которых человек приходит в\u00A0зал снова и\u00A0снова. Открытый мастер-класс лишь показывает возможность. Долгосрочное участие в\u00A0спорте опирается на\u00A0экипировку, профессиональное тренерское сопровождение и\u00A0программы, которые продолжают действовать сезон за\u00A0сезоном.',
        ),
        section(
          'support',
          'Общая основа для\u00A0развития спорта',
          'Инициатива формирует открытые каталоги и\u00A0сравнение оборудования, стартовые методические пакеты для\u00A0клубов и\u00A0прикладные курсы для\u00A0тренеров. На\u00A0этом фундаменте строятся сборы и\u00A0системная подготовка атлетов. Каждое решение создается в\u00A0прямом диалоге со\u00A0спортсменами, наставниками и\u00A0руководителями залов.',
          'Принцип Изумрудного пастбища здесь находит прямое выражение в\u00A0коопетиции: клубы соревнуются за\u00A0медали на\u00A0дорожках, но\u00A0объединяют ресурсы ради\u00A0роста всего вида спорта. Проверенные рекомендации по\u00A0оборудованию и\u00A0тренерские методики усиливают сразу множество секций. Четкое распределение обязанностей помогает продолжать совместную работу за\u00A0пределами разовых событий.',
        ),
        section(
          'next',
          'Текущий этап',
          'P4P разворачивает программную основу как целевое некоммерческое направление Bulachak. Структура финансирования опирается на\u00A0стратегическое обязательство A4A: 4% коммерческой выручки технологического крыла безусловно резервируются на\u00A0специализированные коляски, тренировочные сборы и\u00A0гранты для\u00A0атлетов.',
        ),
      ],
    },
    {
      slug: 'i4i',
      title: 'Передавать помощь дальше',
      eyebrow: 'I4I · Иммигрант для\u00A0иммигранта',
      description:
        '«Иммигрант для\u00A0иммигранта» (I4I) объединяет взаимную поддержку предпринимателей, солидарность сообществ и\u00A0преемственность поколений.',
      relatedLeg: 'I4I',
      sections: [
        section(
          'name',
          'Новый смысл названия',
          'Название I4I звучит как английское выражение «eye for eye» («око за\u00A0око»). Проект решительно переосмысляет ветхий принцип возмездия, превращая его\u00A0в\u00A0культуру деятельной взаимопомощи. Профессиональный опыт, полезные контакты и\u00A0практические ресурсы передаются от\u00A0человека к\u00A0человеку, укрепляя преемственность поколений.',
          'I4I создает в\u00A0экосистеме Bulachak пространство для\u00A0иммигрантского опыта за\u00A0пределами чисто спортивных задач. В\u00A0центре внимания: крепкие деловые связи, прикладная взаимовыручка и\u00A0сохранение культурной памяти, родного языка и\u00A0традиций. Поддержка независимых предприятий служит органичной частью этой широкой миссии.',
        ),
        section(
          'community',
          'Сотрудничество внутри конкуренции',
          'I4I применяет принципы Изумрудного пастбища и\u00A0коопетиции к\u00A0жизни локальных сообществ. Независимые компании могут честно конкурировать на\u00A0рынке и\u00A0одновременно рекомендовать друг\u00A0друга, обмениваться практическими наработками и\u00A0сообща использовать цифровую инфраструктуру. Сотрудничество зарождается внутри культурной среды и\u00A0открывает новые горизонты во\u00A0внешнем мире.',
          'Культура взаимности строится на\u00A0прозрачных договоренностях. Прикладные знания, навыки и\u00A0личное время признаются равноценным вкладом. Обмен ресурсами остается честным, ценность работы каждого участника видима, а\u00A0принятые обязательства учитывают реальные возможности людей.',
        ),
        section(
          'next',
          'Текущий этап',
          'I4I формирует практическую партнерскую сеть на\u00A0основе этих ориентиров, закрепляя понятные правила взаимного участия. Тесная связка с\u00A0A4A помогает атлетам-иммигрантам открывать спортивные академии, запускать устойчивые предприятия и\u00A0передавать успех дальше.',
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
        'Фехтование буенча Олимпия уеннарының көмеш медаль иясе, тренер, эшне оештыру системаларын төзүче һәм\u00A0Bulachakка нигез салучы.',
      sections: [
        section(
          'background',
          'Минем эш тәҗрибәм',
          'Мин\u00A0Камилла Гафурзянова. Фехтование буенча Олимпия уеннарының көмеш медаль иясе, тренер һәм\u00A0эшне оештыру системаларын төзүче. Спортчы, оештыручы һәм\u00A0комитет рәисе булып эшләдем. Шушы тәҗрибә спорттагы көндәлек эшкә карашымны билгели.',
          'Мин\u00A0сайтлар һәм\u00A0кораллар ясыйм, мәгълүматны тәртипкә китерәм, аларга бәйле карарларны җентекләп уйлыйм. Портфолиомда балалар спорты өчен\u00A0ресурслар, эшне оештыру проектлары, бренд кораллары һәм\u00A0җәмәгать оешмалары белән\u00A0идарә итү тәҗрибәсе бар. Детальләрне башка кеше аңлап куллана алырлык итеп тәртипкә китерергә яратам.',
        ),
        section(
          'method',
          'Ничек эшлим',
          'PPPP алымын кулланам: Past, Present, Possible, Practice. Башта эшнең үткәнен һәм\u00A0хәзер ничек башкарылуын өйрәнәм. Аннары нәрсәне яхшыртып булуын карыйм, карарларны кабат куллана алырлык эш тәртибенә әйләндерәм. Һәр\u00A0адымда кемнең нәрсә өчен\u00A0җаваплы булуы аңлашылып торырга тиеш.',
        ),
        section(
          'purpose',
          'Ни өчен дәвам итәм',
          'Bulachakта тәҗрибәм белән\u00A0максатларым берләшә. Мин\u00A0парафехтованиене үстерергә, спортта эшләүче кешеләргә ярдәм итәргә һәм\u00A0иммигрантлар арасында файдалы хезмәттәшлек булдырырга телим. Татар булуым да\u00A0карашларыма йогынты ясый.',
          'Минем өчен\u00A0югары нәтиҗәгә ирешү дә, эш барышында кешеләргә хөрмәт белән\u00A0карау да\u00A0мөһим. Ясаган коралларым эшне аңлап, яхшы башкарырга, кирәксез мәшәкатьне киметергә ярдәм итсен иде. Мондагы проектлар нәрсә ясаганымны, нәрсәгә өйрәнгәнемне һәм\u00A0әле нәрсә өстендә эшләгәнемне күрсәтә.',
        ),
      ],
    },
    {
      slug: 'a4a',
      title: 'Спортка күбрәк вакыт',
      eyebrow: 'A4A · Спортчылар өчен\u00A0агентлар',
      description:
        '«Спортчылар өчен\u00A0агентлар» спортчыларга, клубларга һәм\u00A0спорт оешмаларына көндәлек эштә ясалма интеллект (ЯИ) кулланырга ярдәм итә\u00A0торган системалар әзерли. Максат: спортка күбрәк вакыт калдыру.',
      relatedLeg: 'A4A',
      sections: [
        section(
          'origin',
          'Спорттагы көндәлек эшләр',
          'Дәрескә язылу, түләүләр, җиһазлар турында мәгълүмат һәм\u00A0хәбәрләр төрле җирдә булырга мөмкин. A4A аларны бәйли торган чишелешләр әзерли: тренерга дәрес мәгълүматын табарга, спортчыга бизнесын оештырырга, клубка эшне кем башкарырга тиешлеген күрергә ярдәм итә.',
          'Бу\u00A0коммерция юнәлеше Зөбәрҗәт болын фәлсәфәсенә таяна. Клублар һәм\u00A0компанияләр көндәшлек иткән килеш тә\u00A0файдалы белем һәм\u00A0кораллар белән\u00A0уртаклаша ала. Аңлаешлы килешүләр һәркемнең өлешен танырга ярдәм итә. Хезмәттәшлек өчен\u00A0барысының да\u00A0бертөрле эшләве кирәк түгел.',
        ),
        section(
          'approach',
          'Агентлар бергә эшли, кешеләр җавап бирә',
          'Система җиһазлар табуны, көндәлек оештыру эшләрен һәм\u00A0хәбәрләшүне ЯИ агентлары арасында бүлүгә нигезләнә. Бер\u00A0агент аларның эшен килештерә. Кагыйдәләрне кешеләр билгели, мөһим карарларны тикшерә һәм\u00A0спортчылар белән\u00A0гаиләләр алдындагы йөкләмәләр өчен\u00A0җавап\u00A0бирә.',
          'A2A (agent-to-agent) программа агентларының бер-берсе белән\u00A0аралашуын аңлата. A4Aда бу\u00A0эшнең үзәгендә спортчы тора. Технология спорт эшенә ярдәм итәргә, аның файдасы махсус техник белемсез дә\u00A0аңлашылырга тиеш.',
        ),
        section(
          'next',
          'Хәзерге эшләр',
          'A4A беренче түләүле сынау проектлары өчен\u00A0прототиплар әзерли. Адаптив спортка өстенлек бирелә. Йөкләмә буенча, киләчәктә A4Aның коммерция кеременең 4\u00A0проценты, керем алынган саен, «Үсеш өчен\u00A0парафехтование» юнәлешенә биреләчәк.',
        ),
      ],
    },
    {
      slug: 'p4p',
      title: 'Башларга да, дәвам итәргә дә\u00A0ярдәм',
      eyebrow: 'P4P · Үсеш өчен\u00A0парафехтование',
      description:
        '«Үсеш өчен\u00A0парафехтование» Bulachakның әле\u00A0әзерләнә торган коммерцияле булмаган юнәлеше. Максаты: арбада фехтование белән\u00A0шөгыльләнү өчен\u00A0җиһаз, тренер ярдәме һәм\u00A0даими терәк булдыру.',
      relatedLeg: 'P4P',
      sections: [
        section(
          'origin',
          'Даими шөгыльләнү мөмкинлеге',
          'Арбада фехтование өчен\u00A0махсус җиһаз һәм\u00A0аны куллана белүче кешеләр кирәк. Программа башланганчы клуб нәрсә алырга, аны кайдан табарга һәм\u00A0дәресләрне кем алып бара алырын ачыклый. Спортчыларга һәм\u00A0гаиләләргә ничек катнашырга икәнен аңлатырга кирәк.',
          'P4P кешенең спортны дәвам итә\u00A0алуына игътибар итә. Танышу дәресендә сынап карарга мөмкин. Әмма даими шөгыльләнү өчен\u00A0җиһазлар, тренер ярдәме һәм\u00A0алга таба да\u00A0эшли торган программа кирәк.',
        ),
        section(
          'support',
          'Спорт үсеше өчен\u00A0уртак нигез',
          'Планда җиһазларны чагыштыру һәм\u00A0табу, клубларга эшне башлап җибәрү өчен\u00A0ресурслар, тренерларга гамәли материаллар әзерләү бар. Уку-күнегү җыеннары һәм\u00A0спортчыларны үстерү дә\u00A0шуның белән\u00A0бергә алып барылырга тиеш. Ярдәмне аннан файдаланачак спортчылар, тренерлар һәм\u00A0клублар белән\u00A0бергә әзерләү мөһим.',
          'Зөбәрҗәт болын фәлсәфәсе буенча, клублар ярышларда көндәш булып, спортны үстерүдә хезмәттәшлек итә\u00A0ала. Алар файдалы белем һәм\u00A0ресурслар белән\u00A0уртаклаша. Җиһаз турында киңәшләр һәм\u00A0тренерлар өчен\u00A0материаллар берничә программага ярдәм итә\u00A0ала. Кемнең нәрсә өчен\u00A0җаваплы булуы ачык булса, уртак эш танышу чарасыннан соң да\u00A0дәвам итә\u00A0ала.',
        ),
        section(
          'next',
          'Хәзерге эшләр',
          'P4P әле\u00A0әзерләнә. Аның оештыру формасы һәм\u00A0финанслау тәртибе билгеләнә. Планлаштырылган финанслауга A4Aның киләчәктәге коммерция кеременең 4\u00A0процентын P4Pга тапшыру йөкләмәсе дә\u00A0керә.',
        ),
      ],
    },
    {
      slug: 'i4i',
      title: 'Ярдәмне башкаларга\u00a0тапшыру',
      eyebrow: 'I4I · Иммигрант иммигрант өчен',
      description:
        '«Иммигрант иммигрант өчен» иммигрантларны якынайтуга, үзара ярдәмгә һәм\u00A0мәдәниятне буыннан буынга тапшыруга багышланган Bulachak юнәлеше.',
      relatedLeg: 'I4I',
      sections: [
        section(
          'name',
          'Башка мәгънә алган исем',
          'I4I инглизчә «eye for eye», ягъни «күз өчен\u00A0күз» гыйбарәсенә охшаш яңгырый. Бу\u00A0исемдә үч кайтару урынын бер-береңә ярдәм итү ала. Кешеләр белемнәрен уртаклаша, бер-берсен таныштыра, ярдәмне киләсе буыннарга да\u00A0тапшыра ала.',
          'Иммигрантлар тәҗрибәсе спорт белән\u00A0генә чикләнми. I4I көндәлек ярдәмгә, кешеләр арасындагы бәйләнешләргә һәм\u00A0мәдәни белемгә дә\u00A0урын бирә. Максат: телне, мәдәни белемне һәм\u00A0арадагы бәйләнешләрне киләсе буыннарга тапшыру. Бизнеска ярдәм итү дә\u00A0шушы киңрәк максатның бер\u00A0өлеше.',
        ),
        section(
          'community',
          'Көндәшлек тә, хезмәттәшлек тә',
          'I4I Зөбәрҗәт болын фәлсәфәсен кешеләрнең аралашуында һәм\u00A0уртак эшендә куллана. Мөстәкыйль компанияләр көндәшлек иткән килеш тә\u00A0бер-берсен башкаларга тәкъдим итә, белем уртаклаша һәм\u00A0эшне оештыру коралларын бергә куллана ала. Мәдәнияте уртак кешеләрдән башланган хезмәттәшлек башкаларны да\u00A0берләштерә ала.',
          'Һәркемнең нәрсә тәкъдим итә\u00A0алуын алдан килешү мөһим. Белем, күнекмәләр һәм\u00A0вакыт та\u00A0уртак эшкә керткән өлеш булып санала. Алмашу гадел булырга, һәркемнең өлеше танылырга тиеш. Йөкләмәләр кешенең мөмкинлегенә туры килергә тиеш.',
        ),
        section(
          'next',
          'Хәзерге эшләр',
          'I4I әле\u00A0әзерләнә. Алдагы адым: шушы принципларга таянып, файдалы бәйләнешләр булдыру һәм\u00A0гамәли ярдәм оештыру. Катнашучыларның нәрсә белән\u00A0ярдәм итә\u00A0алуын алдан килешергә кирәк. A4A белән\u00A0хезмәттәшлек академия ачучы яки үз\u00A0бизнесын оештыручы спортчы иммигрантларга да\u00A0ярдәм итә\u00A0ала.',
        ),
      ],
    },
  ],
};
