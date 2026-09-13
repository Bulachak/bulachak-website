// @polsia:user-owned: project artifacts and clearly labelled editorial covers.
'use client';
import { ArrowUpRight, Layers3, Route, Workflow } from 'lucide-react';
import Image from 'next/image';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import type { CaseStudy } from '@/lib/contracts/portfolio';
import { categoryName } from '@/lib/portfolio-locale';

export const caseArtifacts: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  'sffa-brand-and-campaign-tools': {
    src: '/assets/portfolio/sffa.png',
    alt: 'San Francisco Fencing Academy website before and after the redesign',
    width: 1600,
    height: 1673,
  },
  'playla-family-resource-app': {
    src: '/assets/portfolio/playla.png',
    alt: 'PlayLA program interface alongside its structured location data',
    width: 1905,
    height: 1181,
  },
  'everest-digital-experience': {
    src: '/assets/portfolio/everest-performance.png',
    alt: 'Dated mobile performance comparison: score 46 before and 92 after the rebuild',
    width: 1484,
    height: 724,
  },
  'sports-equipment-distribution': {
    src: '/assets/portfolio/la28-storage.jpg',
    alt: 'Kamilla among the sports equipment in storage before distribution',
    width: 536,
    height: 690,
  },
};

export function CaseVisual({ item, large = false }: { item: CaseStudy; large?: boolean }) {
  const { language, t } = usePortfolioLocale();
  const artifact = caseArtifacts[item.slug];
  const Icon =
    item.category === 'Web & product'
      ? Layers3
      : item.category === 'Community & access'
        ? Route
        : Workflow;
  return (
    <div className={`case-visual ${large ? 'case-visual-large' : ''}`}>
      <div className="case-visual-top">
        <span>
          {artifact
            ? t('FROM THE PROJECT', 'ИЗ ПРОЕКТА', 'ПРОЕКТТАН')
            : t('PROJECT OVERVIEW', 'О ПРОЕКТЕ', 'ПРОЕКТ ТУРЫНДА')}
        </span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </div>
      {artifact ? (
        <div className="case-artifact-image">
          <Image
            {...artifact}
            alt={
              language === 'en'
                ? artifact.alt
                : t(
                    artifact.alt,
                    `Материал проекта: ${item.subtitle}`,
                    `Проект материалы: ${item.subtitle}`,
                  )
            }
            sizes={large ? '(max-width: 720px) 95vw, 1000px' : '(max-width: 720px) 95vw, 400px'}
          />
        </div>
      ) : (
        <div className="case-visual-diagram" aria-hidden="true">
          <Icon size={36} strokeWidth={1} />
          <p>
            {item.category === 'Community & access'
              ? t(
                  'Helping people take part.',
                  'Помочь людям участвовать.',
                  'Кешеләргә катнашырга ярдәм итү.',
                )
              : item.category === 'Strategy & storytelling'
                ? t(
                    'Finding the words. Planning the work.',
                    'Подобрать слова. Продумать работу.',
                    'Дөрес сүзләр сайлау. Эшне алдан уйлау.',
                  )
                : item.category === 'Web & product'
                  ? t(
                      'Easier to find. Easier to use.',
                      'Проще найти. Удобнее пользоваться.',
                      'Табу җиңелрәк. Куллану уңайлырак.',
                    )
                  : t('Getting the work organized.', 'Организовать работу.', 'Эшне оештыру.')}
          </p>
          <span className="case-diagram-rule" />
        </div>
      )}
      <div className="case-visual-bottom">
        <span>{categoryName(item.category, language)}</span>
        <span>{item.legs.join(' / ') || 'BULACHAK'}</span>
      </div>
    </div>
  );
}
