// @polsia:user-owned — pricing FAQ island composing the shipped Accordion
// primitive. Imports only `@/components/ui/accordion` so server-only modules
// never leak through this client island.

'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface PricingFaqItem {
  readonly value: string;
  readonly question: string;
  readonly answer: string;
}

export function PricingFaq({ items }: { items: readonly PricingFaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-body text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
