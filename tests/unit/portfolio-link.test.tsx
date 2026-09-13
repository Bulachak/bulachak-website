// @polsia:user-owned: fragment navigation must replace the previous section in every language.
import { act, type ComponentProps } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { PortfolioLink } from '@/components/custom/portfolio/portfolio-link';

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock('next/navigation', () => ({ usePathname: () => window.location.pathname }));
vi.mock('next/link', () => ({
  default: ({ href, onClick, ...props }: ComponentProps<'a'>) => (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          event.preventDefault();
          navigate(href);
        }
      }}
    />
  ),
}));

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  navigate.mockClear();
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

it.each(['', '/ru'])(
  'replaces the current fragment when the %s wordmark is clicked, retaining localized page navigation',
  async (prefix) => {
    window.history.replaceState(null, '', `${prefix}/portfolio#branches`);
    await act(() => {
      root.render(<PortfolioLink href="/portfolio#portfolio-main">Bulachak</PortfolioLink>);
    });
    const wordmark = container.querySelector('a');
    if (!wordmark) throw new Error('The wordmark link is missing.');
    await act(() => wordmark.click());
    await vi.waitFor(() => expect(window.location.hash).toBe('#portfolio-main'));
    expect(window.location.pathname).toBe(`${prefix}/portfolio`);
    expect(navigate).not.toHaveBeenCalled();

    await act(() => {
      root.render(<PortfolioLink href="/portfolio/work">Work</PortfolioLink>);
    });
    const workLink = container.querySelector('a');
    if (!workLink) throw new Error('The work link is missing.');
    await act(() => workLink.click());
    expect(navigate).toHaveBeenCalledWith(`${prefix}/portfolio/work`);
  },
);

it('keeps restored Tatar navigation in the Tatar edition', async () => {
  window.history.replaceState(null, '', '/tt/portfolio/a4a');
  await act(() => {
    root.render(<PortfolioLink href="/portfolio/work">Work</PortfolioLink>);
  });
  const workLink = container.querySelector('a');
  if (!workLink) throw new Error('The work link is missing.');
  expect(workLink.getAttribute('href')).toBe('/tt/portfolio/work');
  await act(() => workLink.click());
  expect(navigate).toHaveBeenCalledWith('/tt/portfolio/work');
});
