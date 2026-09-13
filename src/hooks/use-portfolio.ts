// @polsia:user-owned — validated, cancellable portfolio loading.
'use client';

import { useEffect, useState } from 'react';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';
import { apiFetch } from '@/lib/api-client';
import { getLocalizedCases } from '@/lib/business/portfolio-catalogue';
import { type CaseStudy, PortfolioList } from '@/lib/contracts/portfolio';

export function usePortfolio() {
  const { language } = usePortfolioLocale();
  // Bundled editorial copy is readable in initial HTML, including without JavaScript.
  // The API refresh keeps client reads on the shared, validated data boundary.
  const [items, setItems] = useState<CaseStudy[]>(() => getLocalizedCases(language));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setItems(getLocalizedCases(language));
    setLoading(attempt > 0);
    setError(false);
    apiFetch(`/api/portfolio?lang=${language}`, {
      schema: PortfolioList,
      signal: controller.signal,
      cache: attempt > 0 ? 'reload' : 'default',
    })
      .then((data) => {
        if (!controller.signal.aborted) setItems(data.items);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt, language]);

  return { items, loading, error, retry: () => setAttempt((value) => value + 1) };
}
