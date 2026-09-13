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
            'Подтверждённая цифровая экспертиза',
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
        <h3>{t('The discipline to scale', 'Дисциплина для роста', 'Үсеш өчен ихтыяр көче')}</h3>
        <p>
          {t('I bring an ', 'Я опираюсь на ', 'Мин ')}
          <strong>
            {t(
              'Olympic athletic background',
              'опыт олимпийского спорта',
              'Олимпия спорты тәҗрибәсенә',
            )}
          </strong>
          {t(
            ' to fuel the relentless discipline required to execute, a deep ',
            ', который даёт дисциплину для воплощения задуманного, глубокий ',
            ' таянам: ул башлаган эшне ахырына җиткерергә өйрәтә. ',
          )}
          <strong>
            {t('research background', 'исследовательский опыт', 'Тикшеренү тәҗрибәсе')}
          </strong>
          {t(
            ' focused on hyper-targeted strategy, and the grit of the ',
            ' для точной стратегии и стойкость, приобретённую благодаря ',
            ' стратегияне төгәл максатка юнәлтергә, ә ',
          )}
          <strong>{t('immigrant experience', 'опыту иммиграции', 'иммиграция тәҗрибәсе')}</strong>
          {t(
            '. I rely on hard analytics and behavioral strategy to build resilient operational systems that help businesses actually run.',
            '. Я использую аналитику и поведенческую стратегию, чтобы создавать устойчивые рабочие системы, которые действительно помогают бизнесу работать.',
            ' кыенлыкларга бирешмәскә булыша. Аналитикага һәм кешеләрнең үз-үзен тотышын аңлауга таянып, бизнесның көндәлек эшен җайга сала торган тотрыклы системалар төзим.',
          )}
        </p>
      </div>
    </section>
  );
}
