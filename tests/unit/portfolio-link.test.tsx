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

it.each([
  { homePath: '/', workPath: '/work' },
  { homePath: '/ru', workPath: '/ru/work' },
])(
  'replaces the current fragment when the $homePath wordmark is clicked, retaining localized page navigation',
  async ({ homePath, workPath }) => {
    window.history.replaceState(null, '', `${homePath}#branches`);
    await act(() => {
      root.render(<PortfolioLink href="/#portfolio-main">Bulachak</PortfolioLink>);
    });
    const wordmark = container.querySelector('a');
    if (!wordmark) throw new Error('The wordmark link is missing.');
    await act(() => wordmark.click());
    await vi.waitFor(() => expect(window.location.hash).toBe('#portfolio-main'));
    expect(window.location.pathname).toBe(homePath);
    expect(navigate).not.toHaveBeenCalled();

    await act(() => {
      root.render(<PortfolioLink href="/work">Work</PortfolioLink>);
    });
    const workLink = container.querySelector('a');
    if (!workLink) throw new Error('The work link is missing.');
    await act(() => workLink.click());
    expect(navigate).toHaveBeenCalledWith(workPath);
  },
);

it('keeps restored Tatar navigation in the Tatar edition for both editorial and action routes', async () => {
  window.history.replaceState(null, '', '/tt/a4a');
  await act(() => {
    root.render(<PortfolioLink href="/work">Work</PortfolioLink>);
  });
  const workLink = container.querySelector('a');
  if (!workLink) throw new Error('The work link is missing.');
  expect(workLink.getAttribute('href')).toBe('/tt/work');
  await act(() => workLink.click());
  expect(navigate).toHaveBeenCalledWith('/tt/work');

  await act(() => {
    root.render(<PortfolioLink href="/audit">Audit</PortfolioLink>);
  });
  const auditLink = container.querySelector('a');
  if (!auditLink) throw new Error('The audit link is missing.');
  expect(auditLink.getAttribute('href')).toBe('/tt/audit');
});
