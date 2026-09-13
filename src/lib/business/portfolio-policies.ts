// @polsia:user-owned: plain-language policies for the Bulachak website.
import type { StoryPage } from '@/lib/contracts/portfolio-pages';
import type { PortfolioLanguage } from '@/lib/portfolio-locale';

export const portfolioPolicies: Record<PortfolioLanguage, StoryPage[]> = {
  en: [
    {
      slug: 'privacy',
      title: 'Privacy policy',
      eyebrow: 'UPDATED SEPTEMBER 12, 2026',
      description: 'How the Bulachak website uses information when you browse these pages.',
      sections: [
        {
          id: 'scope',
          title: 'What this policy covers',
          paragraphs: [
            'This policy covers the Bulachak website, including its philosophy, branches, founder profile, and case studies. Kamilla Gafurzianova maintains the website. These pages do not ask you to create an account, submit a form, or make a payment. Separate services and websites linked from a case study may have their own data practices.',
          ],
        },
        {
          id: 'preferences',
          title: 'Settings stored in your browser',
          paragraphs: [
            'Your browser remembers your light or dark theme. It also temporarily remembers your search and filters so you can return to the same list after reading a case study. Search terms can appear in the page address. Avoid entering private information into the search box.',
            'You can clear these preferences through your browser’s site-data controls. Clearing them does not prevent you from reading the website. Language selection is part of the page address.',
          ],
        },
        {
          id: 'hosting',
          title: 'Site requests and visitor measurement',
          paragraphs: [
            'Opening a page sends a request to the hosting service, including technical information such as an IP address and browser details. The hosting service may keep request and error logs to operate and protect the site. Its retention settings depend on the deployment.',
            'The current local preview does not enable the hosting platform’s optional visitor counter. If enabled for a public deployment, that counter stores a random visitor identifier in browser storage and sends it with a site identifier to Polsia. The privacy information must be updated to match the public deployment before that counter is enabled. This website does not contain advertising pixels.',
          ],
        },
        {
          id: 'links',
          title: 'Links and messages',
          paragraphs: [
            'Project demonstrations, professional profiles, and other external links open services operated by others. Those services receive your request and apply their own privacy policies. The badges and project images shown on these pages are served with the website.',
            'If you contact Kamilla through LinkedIn, LinkedIn handles that message under its own terms and privacy policy. Please avoid sending sensitive personal information in an initial message.',
          ],
        },
        {
          id: 'choices',
          title: 'Questions or corrections',
          paragraphs: [
            'For a privacy question or a concern about material shown in a case study, use the professional contact link below. Explain which page or information your request concerns. This policy will be updated when the website’s data practices change.',
          ],
        },
      ],
    },
    {
      slug: 'terms',
      title: 'Terms of use',
      eyebrow: 'UPDATED SEPTEMBER 12, 2026',
      description: 'A few ground rules for reading and using the Bulachak website.',
      sections: [
        {
          id: 'purpose',
          title: 'About the material',
          paragraphs: [
            'This website presents Bulachak, the Emerald Pasture philosophy, and the A4A, P4P, and I4I branches. The Work section includes earlier projects and research by founder Kamilla Gafurzianova. A case study is not an offer of services, a promise of future results, or an agreement to work together. Any paid engagement requires a separate agreement.',
          ],
        },
        {
          id: 'credit',
          title: 'Ownership and credit',
          paragraphs: [
            'Project names, trademarks, and credential badges belong to their respective owners. Their appearance here does not imply that those organizations endorse Bulachak. Research publications retain their authorship and publication credits.',
            'You are welcome to share links to these pages. Ask before reproducing substantial text, designs, photographs, or project assets, unless a separate license explicitly allows it. Any permission can cover only material for which the relevant owner has granted rights.',
          ],
        },
        {
          id: 'results',
          title: 'Project status and results',
          paragraphs: [
            'Each case describes the scope of the work and the evidence available for its results. Prototypes and research are labelled separately from completed work. Plans for A4A, P4P, and I4I describe intentions; they do not guarantee delivery dates, funding, or outcomes.',
            'Some projects change after a case study is written. External demonstrations may also change or become unavailable. Use the linked sources and the project notes when assessing a claim.',
          ],
        },
        {
          id: 'use',
          title: 'Use the site respectfully',
          paragraphs: [
            'Do not use the site to impersonate another person, misrepresent project ownership, or attempt to access private systems. Public text and discovery files are available for reading and citation. Automated readers should follow robots.txt and avoid requests that disrupt the site.',
            'These terms do not remove rights that applicable law gives you. For a question about reuse or a correction, use the professional contact link below.',
          ],
        },
      ],
    },
  ],
  ru: [
    {
      slug: 'privacy',
      title: 'Политика конфиденциальности',
      eyebrow: 'ОБНОВЛЕНО 12 СЕНТЯБРЯ 2026 ГОДА',
      description: 'Какие сведения используются при просмотре сайта Булачак.',
      sections: [
        {
          id: 'scope',
          title: 'На что распространяется политика',
          paragraphs: [
            'Эта политика относится к сайту Булачак, включая страницы о философии, направлениях работы, основательнице и кейсы. Сайт ведёт Камилла Гафурзянова. На этих страницах не нужно создавать аккаунт, заполнять форму или совершать платёж. У отдельных сервисов и сайтов, на которые ведут ссылки из кейсов, могут быть свои правила обработки данных.',
          ],
        },
        {
          id: 'preferences',
          title: 'Настройки в вашем браузере',
          paragraphs: [
            'Браузер запоминает светлую или тёмную тему. Он также временно сохраняет поиск и фильтры, чтобы после чтения кейса вы могли вернуться к тому же списку. Поисковый запрос может появиться в адресе страницы. Не вводите в поиск личную или конфиденциальную информацию.',
            'Эти настройки можно удалить через управление данными сайтов в браузере. После удаления сайт остаётся доступным. Выбранный язык определяется адресом страницы.',
          ],
        },
        {
          id: 'hosting',
          title: 'Запросы к сайту и учёт посещений',
          paragraphs: [
            'При открытии страницы хостинг получает запрос с техническими сведениями, например IP-адресом и данными браузера. Для работы и защиты сайта хостинг может вести журналы запросов и ошибок. Срок хранения зависит от настроек размещения.',
            'В текущей локальной версии дополнительный счётчик посещений платформы отключён. При его включении в публичной версии случайный идентификатор посетителя сохраняется в браузере и передаётся в Polsia вместе с идентификатором сайта. Перед включением счётчика политику нужно обновить с учётом фактических настроек публичного сайта. Рекламных пикселей на сайте нет.',
          ],
        },
        {
          id: 'links',
          title: 'Внешние ссылки и сообщения',
          paragraphs: [
            'Демонстрации проектов, профессиональные профили и другие внешние ссылки ведут на сервисы других владельцев. Эти сервисы получают ваш запрос и применяют свои политики конфиденциальности. Значки и изображения проектов на этих страницах загружаются вместе с сайтом.',
            'Если вы напишете Камилле через LinkedIn, сообщение обрабатывается по правилам LinkedIn. Пожалуйста, не отправляйте чувствительные личные сведения в первом сообщении.',
          ],
        },
        {
          id: 'choices',
          title: 'Вопросы и исправления',
          paragraphs: [
            'Для вопроса о конфиденциальности или материале в кейсе воспользуйтесь ссылкой на профессиональный профиль ниже. Укажите страницу или сведения, которых касается ваш запрос. При изменении работы с данными эта политика будет обновлена.',
          ],
        },
      ],
    },
    {
      slug: 'terms',
      title: 'Условия использования',
      eyebrow: 'ОБНОВЛЕНО 12 СЕНТЯБРЯ 2026 ГОДА',
      description: 'Основные правила чтения и использования материалов сайта Булачак.',
      sections: [
        {
          id: 'purpose',
          title: 'О материалах',
          paragraphs: [
            'Этот сайт представляет Булачак, философию Изумрудного пастбища и направления A4A, P4P и I4I. В разделе работ собраны более ранние проекты и исследования основательницы Камиллы Гафурзяновой. Кейс не является предложением услуг, обещанием будущих результатов или договорённостью о сотрудничестве. Для платной работы требуется отдельное соглашение.',
          ],
        },
        {
          id: 'credit',
          title: 'Права и указание авторства',
          paragraphs: [
            'Названия проектов, товарные знаки и значки квалификаций принадлежат соответствующим владельцам. Их размещение не означает, что эти организации поддерживают Булачак. У научных публикаций сохраняются указания авторов и сведения об издании.',
            'Вы можете делиться ссылками на эти страницы. Перед воспроизведением значительного объёма текста, дизайна, фотографий или материалов проекта запросите разрешение, если отдельная лицензия прямо не допускает такое использование. Разрешение может распространяться только на материалы, права на которые предоставлены соответствующим владельцем.',
          ],
        },
        {
          id: 'results',
          title: 'Статус проектов и результаты',
          paragraphs: [
            'Каждый кейс описывает объём работы и сведения, подтверждающие результаты. Прототипы и исследования отмечены отдельно от выполненной работы. Планы A4A, P4P и I4I описывают намерения и не гарантируют сроки, финансирование или результаты.',
            'Проекты могут меняться после публикации кейса. Внешние демонстрации тоже могут измениться или стать недоступными. При оценке утверждений учитывайте ссылки на источники и примечания к проекту.',
          ],
        },
        {
          id: 'use',
          title: 'Ответственное использование',
          paragraphs: [
            'Не используйте сайт, чтобы выдавать себя за другого человека, искажать авторство проектов или пытаться получить доступ к закрытым системам. Открытые тексты и файлы навигации доступны для чтения и цитирования. Автоматизированным читателям следует соблюдать robots.txt и не мешать работе сайта частыми запросами.',
            'Эти условия не отменяют права, предоставленные вам применимым законодательством. По вопросам повторного использования или исправлений воспользуйтесь ссылкой на профессиональный профиль ниже.',
          ],
        },
      ],
    },
  ],
  tt: [
    {
      slug: 'privacy',
      title: 'Шәхси мәгълүмат турында',
      eyebrow: '2026 ЕЛНЫҢ 12 СЕНТЯБРЕНДӘ ЯҢАРТЫЛДЫ',
      description: 'Bulachak сайты сезнең мәгълүмат белән ничек эшли.',
      sections: [
        {
          id: 'scope',
          title: 'Бу кагыйдәләр нәрсәгә кагыла',
          paragraphs: [
            'Бу кагыйдәләр Bulachak сайтына кагыла: аның фәлсәфәсе, юнәлешләре, нигез салучысы һәм проектлар турындагы битләргә. Сайтны Камилла Гафурзянова алып бара. Бу битләрне укыр өчен теркәлергә, форма тутырырга яки түләргә кирәкми. Проектлардан сылтама бирелгән башка сайтлар һәм хезмәтләр мәгълүмат белән үз кагыйдәләре буенча эшләргә мөмкин.',
          ],
        },
        {
          id: 'preferences',
          title: 'Браузер нәрсәне истә калдыра',
          paragraphs: [
            'Браузер сайлаган якты яки караңгы режимыгызны истә калдыра. Проект турында укыгач, элекке исемлеккә кайта алуыгыз өчен, эзләгән сүзләрегезне һәм фильтрларны да вакытлыча саклый. Эзләү сүзләре бит адресында күренергә мөмкин. Эзләү юлына шәхси яки яшерен мәгълүмат язмагыз.',
            'Бу көйләүләрне браузерда сайт мәгълүматын чистартып бетерергә була. Шуннан соң да сайтны укый аласыз. Сайлаган телегез бит адресында күрсәтелә.',
          ],
        },
        {
          id: 'hosting',
          title: 'Техник мәгълүмат һәм керүчеләр саны',
          paragraphs: [
            'Битне ачканда сайт урнашкан хостинг хезмәтенә сорау җибәрелә. Анда IP-адрес һәм браузер турында техник мәгълүмат була. Сайт эшләсен һәм сакланган булсын өчен, хостинг сорауларны һәм хаталарны журналга язып барырга мөмкин. Бу язмаларның күпме саклануы сайтны урнаштыру көйләүләренә бәйле.',
            'Хәзерге җирле сынау версиясендә платформаның керүчеләрне саный торган өстәмә коралы сүндерелгән. Ул ачык сайтта кабызылса, браузерда керүчене аеру өчен очраклы идентификатор саклана. Бу идентификатор сайт идентификаторы белән бергә Polsia хезмәтенә җибәрелә. Коралны кабызганчы бу кагыйдәләрне ачык сайтның чын көйләүләренә туры китереп яңартырга кирәк. Сайтта реклама пиксельләре юк.',
          ],
        },
        {
          id: 'links',
          title: 'Тышкы сылтамалар һәм хәбәрләр',
          paragraphs: [
            'Проектларның демоверсияләренә, һөнәри профильләргә һәм башка тышкы битләргә сылтамалар сезне бүтән хуҗаларның хезмәтләренә алып чыга. Алар сезнең сорауны кабул итә һәм шәхси мәгълүмат белән үз кагыйдәләре буенча эшли. Бу битләрдәге сертификат билгеләре һәм проект рәсемнәре сайт белән бергә йөкләнә.',
            'Камиллага LinkedIn аша язсагыз, хәбәрегез LinkedIn куллану шартлары һәм шәхси мәгълүмат кагыйдәләре буенча эшкәртелә. Беренче хәбәрдә сер итеп сакланырга тиешле шәхси мәгълүмат җибәрмәгез.',
          ],
        },
        {
          id: 'choices',
          title: 'Сораулар һәм төзәтмәләр',
          paragraphs: [
            'Шәхси мәгълүмат яки проект битендәге материал турында соравыгыз булса, түбәндәге һөнәри профиль аша языгыз. Сүзнең кайсы бит яки мәгълүмат турында баруын күрсәтегез. Сайтның мәгълүмат белән эшләү тәртибе үзгәрсә, бу кагыйдәләр дә яңартылачак.',
          ],
        },
      ],
    },
    {
      slug: 'terms',
      title: 'Куллану шартлары',
      eyebrow: '2026 ЕЛНЫҢ 12 СЕНТЯБРЕНДӘ ЯҢАРТЫЛДЫ',
      description: 'Bulachak сайтындагы материалларны уку һәм куллану кагыйдәләре.',
      sections: [
        {
          id: 'purpose',
          title: 'Материаллар турында',
          paragraphs: [
            'Бу сайт Bulachak, Зөбәрҗәт болын фәлсәфәсе һәм A4A, P4P, I4I юнәлешләре белән таныштыра. Проектлар бүлегендә нигез салучы Камилла Гафурзянованың элеккеге эшләре һәм тикшеренүләре тупланган. Проект тасвирламасы хезмәт тәкъдиме, киләчәк нәтиҗәләр вәгъдәсе яки хезмәттәшлек турында килешү түгел. Түләүле эш өчен аерым килешү кирәк.',
          ],
        },
        {
          id: 'credit',
          title: 'Хокуклар һәм авторлык',
          paragraphs: [
            'Проект исемнәре, товар билгеләре һәм квалификацияне раслаучы билгеләр үз хуҗаларына карый. Аларның монда булуы әлеге оешмалар Bulachakны хуплый дигән сүз түгел. Фәнни хезмәтләрнең авторлары һәм кайда басылганы күрсәтелә.',
            'Бу битләргә сылтамалар белән уртаклаша аласыз. Текстның зур өлешен, дизайнны, фотоларны яки проект материалларын күчереп кулланыр алдыннан рөхсәт сорагыз. Аерым лицензия моны рөхсәт итә икән, кабат сорарга кирәкми. Рөхсәт хокук иясе кулланырга биргән материалларга гына кагыла.',
          ],
        },
        {
          id: 'results',
          title: 'Проектларның хәле һәм нәтиҗәләре',
          paragraphs: [
            'Һәр проект тасвирламасында нәрсә эшләнгәне һәм нәтиҗәләрне нинди материаллар раславы күрсәтелә. Прототиплар һәм тикшеренүләр тәмамланган эшләрдән аерым билгеләнә. A4A, P4P һәм I4I планнары ниятләрне генә белдерә. Алар эшне тапшыру вакытын, финанслауны яки нәтиҗәләрне гарантияләми.',
            'Тасвирлама язылганнан соң проектлар үзгәрергә мөмкин. Тышкы демоверсияләр дә үзгәрергә яки ачылмый башларга мөмкин. Берәр нәтиҗәне бәяләгәндә сылтамалардагы чыганакларны һәм проект искәрмәләрен карагыз.',
          ],
        },
        {
          id: 'use',
          title: 'Сайттан дөрес файдалану',
          paragraphs: [
            'Сайтта үзегезне башка кеше итеп күрсәтмәгез, проектларның кемнеке булуын бозып күрсәтмәгез һәм ябык системаларга керергә тырышмагыз. Ачык текстларны һәм материалларны табарга ярдәм итүче файлларны укырга, алардан цитаталар китерергә була. Сайтны автоматик рәвештә укучы программалар robots.txt кагыйдәләрен үтәргә һәм сораулары белән сайт эшенә комачауламаска тиеш.',
            'Бу шартлар гамәлдәге кануннар биргән хокукларыгызны чикләми. Материалны кабат куллану яки төзәтү турында соравыгыз булса, түбәндәге һөнәри профиль аша языгыз.',
          ],
        },
      ],
    },
  ],
};
