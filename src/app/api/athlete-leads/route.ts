// @polsia:user-owned — athlete intake write endpoint. POST-only. Writes one
// row to athlete_leads, fires a best-effort confirmation email + contact
// registration against the Polsia email proxy. Returns the persisted row.
//
// Hard rule: a successful POST ALWAYS returns 201 with the persisted
// AthleteLeadItem, regardless of whether the email was delivered. The row is
// authoritative; the email is a courtesy.

import 'server-only';
import { NextResponse } from 'next/server';
import { AthleteLeadCreate, AthleteLeadItem } from '@/lib/contracts/athlete-leads';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const PROXY_BASE = 'https://polsia.com/api/proxy/email';
const PROXY_TIMEOUT_MS = 5_000;

function buildConfirmationBody(input: {
  name: string;
  sport: string;
  transitionStage: string;
  targetVenture: string;
}): { subject: string; body: string; html: string } {
  const subject = 'We received your A4A athlete intake';
  // Plain text — applicant-facing, minimal, no marketing copy.
  const body = [
    `Hi ${input.name},`,
    '',
    'Your athlete solopreneur intake was logged. A strategist will reply within',
    'two working days with a 20-minute intake slot.',
    '',
    `Sport: ${input.sport}`,
    `Transition stage: ${input.transitionStage.replace(/_/g, ' ')}`,
    'Target venture:',
    input.targetVenture,
    '',
    'This inbox is not monitored. Please do not reply to this message; your',
    'strategist will reach out from a working A4A address.',
    '',
    '— A4A · Agents 4 Athletes',
  ].join('\n');
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, '<br>');
  const html = `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.55;color:#13110d;background:#f7f1e7;padding:24px">
<p style="font-size:16px;margin:0 0 12px 0">Hi ${escapeHtml(input.name)},</p>
<p style="font-size:16px;margin:0 0 16px 0">Your athlete solopreneur intake was logged. A strategist will reply within two working days with a 20-minute intake slot.</p>
<dl style="margin:0 0 16px 0;padding:0">
<dt style="font-weight:600">Sport</dt><dd style="margin:0 0 8px 0">${escapeHtml(input.sport)}</dd>
<dt style="font-weight:600">Transition stage</dt><dd style="margin:0 0 8px 0">${escapeHtml(input.transitionStage.replace(/_/g, ' '))}</dd>
<dt style="font-weight:600">Target venture</dt><dd style="margin:0">${nl2br(input.targetVenture)}</dd>
</dl>
<p style="font-size:14px;color:#5b554b;margin:0">This inbox is not monitored. Please do not reply to this message; your strategist will reach out from a working A4A address.</p>
<p style="font-size:14px;color:#5b554b;margin:12px 0 0 0">— A4A · Agents 4 Athletes</p>
</body></html>`;
  return { subject, body, html };
}

async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  try {
    const parsed = AthleteLeadCreate.safeParse(await req.json());
    if (!parsed.success) {
      // 400 body shape consumed by applyServerErrors on the client:
      // { errors: { <field>: <message> } }
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};
      for (const [field, messages] of Object.entries(fieldErrors)) {
        const message = messages?.[0];
        if (message) {
          errors[field] = message;
        }
      }
      return NextResponse.json({ errors }, { status: 400 });
    }

    const data = parsed.data;

    const created = await prisma.athleteLead.create({
      data: {
        name: data.name,
        email: data.email,
        sport: data.sport,
        transitionStage: data.transitionStage,
        targetVenture: data.targetVenture,
      },
    });

    const apiKey = process.env.POLSIA_API_KEY;
    if (apiKey) {
      const authHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      } as const;

      // Best-effort: register the applicant as a known contact so the
      // confirmation below isn't rate-limited on the agent path.
      try {
        await fetchWithTimeout(
          `${PROXY_BASE}/contacts`,
          {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
              email: data.email,
              name: data.name,
              source: 'contact_form',
            }),
          },
          PROXY_TIMEOUT_MS,
        );
      } catch {
        // Swallow — registration failure must not block confirmation or 201.
      }

      // Best-effort: confirmation email to the applicant.
      try {
        const { subject, body, html } = buildConfirmationBody({
          name: data.name,
          sport: data.sport,
          transitionStage: data.transitionStage,
          targetVenture: data.targetVenture,
        });
        await fetchWithTimeout(
          `${PROXY_BASE}/send`,
          {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
              to: data.email,
              subject,
              body,
              html,
            }),
          },
          PROXY_TIMEOUT_MS,
        );
      } catch {
        // Swallow — email failure must not undo a persisted row.
      }
    }

    return NextResponse.json(AthleteLeadItem.parse(created), { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
