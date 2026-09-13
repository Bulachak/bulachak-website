// @polsia:user-owned: discovery adapter for the template proxy beside src/app.
// CSP and nonce generation stay in the unmodified framework proxy.
import type { NextRequest } from 'next/server';
import { proxy as frameworkProxy } from '../proxy';

export function proxy(request: NextRequest) {
  return frameworkProxy(request);
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
