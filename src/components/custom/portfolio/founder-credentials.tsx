// @polsia:user-owned: the founder's original compact portfolio footer, as requested.
'use client';
import Image from 'next/image';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';

const badges = [
  ['salesforce-administrator', 'Salesforce Certified Administrator'],
  ['salesforce-business-analyst', 'Salesforce Certified Business Analyst'],
  ['radical-product-thinking-vision-setting', 'Radical Product Thinking: Vision Setting'],
  ['google-ai-professional', 'Google AI Professional Certificate'],
  ['google-ai-data-analysis', 'Google AI for Data Analysis'],
  ['pmi-member', 'Project Management Institute Member'],
  ['product-management-basics', 'Product Management Basics'],
  ['ai-product-management', 'AI for Product Management'],
] as const;

export function FounderCredentials() {
  const { t } = usePortfolioLocale();
  return (
    <section className="founder-credentials" id="credentials" aria-labelledby="credentials-title">
      <div className="portfolio-container">
        <h2 id="credentials-title">
          {t(
            'Certified digital expertise',
            'Квалификация и\u00A0сертификаты',
            'Сертификатлар белән расланган цифрлы осталык',
          )}
        </h2>
        <div className="founder-badge-row">
          {badges.map(([file, label]) => (
            <Image
              key={file}
              src={`/assets/portfolio/badges/${file}.webp`}
              alt={label}
              width={80}
              height={80}
              sizes="80px"
            />
          ))}
        </div>
        <h3>
          {t('The discipline to scale', 'Дисциплина для\u00A0роста', 'Үсеш өчен\u00A0ихтыяр көче')}
        </h3>
        <p>
          {t('I bring an\u00A0', 'Я опираюсь на\u00A0', 'Мин\u00A0')}
          <strong>
            {t(
              'Olympic athletic background',
              'опыт олимпийского спорта',
              'Олимпия спорты тәҗрибәсенә',
            )}
          </strong>
          {t(
            ' to fuel the relentless discipline required to execute, a deep ',
            ', который даёт дисциплину для\u00A0воплощения задуманного, глубокий ',
            ' таянам: ул\u00A0башлаган эшне ахырына җиткерергә өйрәтә. ',
          )}
          <strong>
            {t('research background', 'исследовательский опыт', 'Тикшеренү тәҗрибәсе')}
          </strong>
          {t(
            ' focused on hyper-targeted strategy, and the grit of the ',
            ' для\u00A0точной стратегии и\u00A0стойкость, приобретённую благодаря ',
            ' стратегияне төгәл максатка юнәлтергә, ә\u00A0',
          )}
          <strong>{t('immigrant experience', 'опыту иммиграции', 'иммиграция тәҗрибәсе')}</strong>
          {t(
            '. I rely on hard analytics and behavioral strategy to build resilient operational systems that help businesses actually run.',
            '. Я\u00A0использую аналитику и\u00A0поведенческую стратегию, чтобы создавать надёжные операционные системы, которые помогают бизнесу работать слаженно и\u00A0без\u00A0сбоев.',
            ' кыенлыкларга бирешмәскә булыша. Аналитикага һәм\u00A0кешеләрнең үз-үзен тотышын аңлауга таянып, бизнесның көндәлек эшен җайга сала торган тотрыклы системалар төзим.',
          )}
        </p>
      </div>
    </section>
  );
}
