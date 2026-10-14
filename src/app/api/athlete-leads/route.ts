// Athlete intake write endpoint (`POST /api/athlete-leads`).
// Appends intake rows to Google Sheets + dispatches Gmail confirmation via Google Apps Script
// (with optional Prisma persistence when DATABASE_URL is configured).

import 'server-only';
import { NextResponse } from 'next/server';
import { escapeHtml, forwardLeadToGoogleSheets } from '@/lib/business/sheets-webhook';
import { AthleteLeadCreate, AthleteLeadItem } from '@/lib/contracts/athlete-leads';
import { prisma } from '@/lib/db';
import { portfolioBrand } from '@/lib/portfolio-brand';

export const dynamic = 'force-dynamic';

function buildConfirmationBody(input: {
  name: string;
  sport: string;
  transitionStage: string;
  targetVenture: string;
}): { subject: string; body: string; html: string } {
  const subject = 'We received your A4A athlete intake';
  const body = [
    `Hi ${input.name},`,
    '',
    'Your athlete solopreneur intake was logged. Kamilla Gafurzianova and the A4A team will reply within',
    'two working days with a 20-minute intake slot.',
    '',
    `Sport: ${input.sport}`,
    `Transition stage: ${input.transitionStage.replace(/_/g, ' ')}`,
    'Target venture:',
    input.targetVenture,
    '',
    `Direct contact: ${portfolioBrand.contactEmail}`,
    '',
    '— A4A · Agents 4 Athletes (Bulachak)',
  ].join('\n');
  const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, '<br>');
  const html = `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.55;color:#13110d;background:#f7f1e7;padding:24px">
<p style="font-size:16px;margin:0 0 12px 0">Hi ${escapeHtml(input.name)},</p>
<p style="font-size:16px;margin:0 0 16px 0">Your athlete solopreneur intake was logged. Kamilla Gafurzianova and the A4A team will reply within two working days with a 20-minute intake slot.</p>
<dl style="margin:0 0 16px 0;padding:0">
<dt style="font-weight:600">Sport</dt><dd style="margin:0 0 8px 0">${escapeHtml(input.sport)}</dd>
<dt style="font-weight:600">Transition stage</dt><dd style="margin:0 0 8px 0">${escapeHtml(input.transitionStage.replace(/_/g, ' '))}</dd>
<dt style="font-weight:600">Target venture</dt><dd style="margin:0">${nl2br(input.targetVenture)}</dd>
</dl>
<p style="font-size:14px;color:#5b554b;margin:0">Direct contact: ${escapeHtml(portfolioBrand.contactEmail)}</p>
<p style="font-size:14px;color:#5b554b;margin:12px 0 0 0">— A4A · Agents 4 Athletes (Bulachak)</p>
</body></html>`;
  return { subject, body, html };
}

export async function POST(req: Request) {
  try {
    const parsed = AthleteLeadCreate.safeParse(await req.json());
    if (!parsed.success) {
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
    let id: string = crypto.randomUUID();
    let createdAt = new Date().toISOString();

    if (process.env.DATABASE_URL) {
      try {
        const created = await prisma.athleteLead.create({
          data: {
            name: data.name,
            email: data.email,
            sport: data.sport,
            transitionStage: data.transitionStage,
            targetVenture: data.targetVenture,
          },
        });
        id = created.id;
        createdAt = created.createdAt.toISOString();
      } catch {
        // Resilient fallback when running purely on Google Sheets + Apps Script.
      }
    }

    const confirmation = buildConfirmationBody(data);

    await forwardLeadToGoogleSheets({
      sheet: 'Athlete_Intake',
      row: [
        createdAt,
        id,
        data.name,
        data.email,
        data.sport,
        data.transitionStage,
        data.targetVenture,
      ],
      founderAlert: {
        replyTo: data.email,
        subject: `[A4A Athlete Intake] ${data.name} (${data.sport})`,
        body: [
          'New Athlete Solopreneur Intake on bulachak.com:',
          '',
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Sport: ${data.sport}`,
          `Transition Stage: ${data.transitionStage}`,
          `Target Venture: ${data.targetVenture}`,
          `Timestamp: ${createdAt}`,
        ].join('\n'),
      },
      leadConfirmation: {
        to: data.email,
        subject: confirmation.subject,
        body: confirmation.body,
        html: confirmation.html,
      },
    });

    const item = AthleteLeadItem.parse({
      id,
      name: data.name,
      email: data.email,
      sport: data.sport,
      transitionStage: data.transitionStage,
      targetVenture: data.targetVenture,
      createdAt,
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
