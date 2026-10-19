// @polsia:user-owned: standalone bespoke Link-in-Bio route at https://bulachak.com/anastasiablodgett.
import 'server-only';
import { renderAnastasiaBlodgettHtml } from '@/lib/bio-pages/anastasiablodgett-html';

export function GET(request: Request): Response {
  const nonce = request.headers.get('x-nonce') ?? '';
  return new Response(renderAnastasiaBlodgettHtml(nonce), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
