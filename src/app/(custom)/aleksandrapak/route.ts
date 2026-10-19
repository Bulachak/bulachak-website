// @polsia:user-owned: standalone bespoke Link-in-Bio route at https://bulachak.com/aleksandrapak.
import 'server-only';
import { renderAleksandraPakHtml } from '@/lib/bio-pages/aleksandrapak-html';

export function GET(request: Request): Response {
  const nonce = request.headers.get('x-nonce') ?? '';
  return new Response(renderAleksandraPakHtml(nonce), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
