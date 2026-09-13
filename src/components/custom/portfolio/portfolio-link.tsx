// @polsia:user-owned: keep portfolio navigation in the selected language.
'use client';
import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { usePortfolioLocale } from '@/hooks/use-portfolio-locale';

export function PortfolioLink(props: ComponentProps<typeof NextLink>) {
  const { href } = usePortfolioLocale();
  const onClick: ComponentProps<typeof NextLink>['onClick'] = (event) => {
    props.onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.hasAttribute('download') ||
      (event.currentTarget.target && event.currentTarget.target !== '_self')
    )
      return;

    const destination = new URL(event.currentTarget.href);
    const current = new URL(window.location.href);
    if (
      destination.origin === current.origin &&
      destination.pathname === current.pathname &&
      destination.search === current.search &&
      destination.hash
    ) {
      // Native same-page navigation replaces the fragment and scrolls to its target.
      // Avoid the router's cached canonical URL retaining the previous fragment.
      event.preventDefault();
      if (props.replace) window.location.replace(destination.href);
      else window.location.assign(destination.href);
    }
  };
  return (
    <NextLink
      {...props}
      href={typeof props.href === 'string' ? href(props.href) : props.href}
      onClick={onClick}
    />
  );
}
