// Silent Launch lead capture write endpoint (`POST /api/launch-leads`).
// Appends lead rows to Google Sheets + dispatches Gmail alerts via the bound Google Apps Script Web App
// (with optional Prisma persistence when DATABASE_URL is configured).

import 'server-only';
import { NextResponse } from 'next/server';
import { escapeHtml, forwardLeadToGoogleSheets } from '@/lib/business/sheets-webhook';
import { LaunchLeadCreate, LaunchLeadItem } from '@/lib/contracts/launch-leads';
import { prisma } from '@/lib/db';
import { portfolioBrand } from '@/lib/portfolio-brand';

export const dynamic = 'force-dynamic';

const BRANCH_NAMES: Record<LaunchLeadCreate['branch'], string> = {
  A4A: 'A4A · Agents 4 Athletes',
  P4P: 'P4P · Parafencing 4 Progress',
  I4I: 'I4I · Immigrant 4 Immigrant',
  GENERAL: 'Bulachak · General & Partnerships',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LaunchLeadCreate.safeParse(body);

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
        const created = await prisma.launchLead.create({
          data: {
            name: data.name,
            email: data.email,
            branch: data.branch,
            message: data.message || null,
            locale: data.locale,
            source: data.source || 'bulachak-home',
          },
        });
        id = created.id;
        createdAt = created.createdAt.toISOString();
      } catch {
        // Resilient fallback when running purely on Google Sheets + Apps Script.
      }
    }

    const branchLabel = BRANCH_NAMES[data.branch];
    const subject = `We received your Bulachak inquiry (${branchLabel})`;
    const textBody = [
      `Hi ${data.name},`,
      '',
      `Thank you for connecting with Bulachak (${portfolioBrand.domain}) regarding ${branchLabel}.`,
      'Kamilla Gafurzianova and the Bulachak team have logged your details and will follow up directly.',
      ...(data.message ? ['', 'Your note:', data.message] : []),
      '',
      `Direct contact: ${portfolioBrand.contactEmail}`,
      `LinkedIn: ${portfolioBrand.contactHref}`,
      '',
      '— Bulachak · A future we build together',
    ].join('\n');

    const htmlBody = `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.55;color:#1d332c;background:#f6faf7;padding:24px">
<p style="font-size:16px;margin:0 0 12px 0">Hi ${escapeHtml(data.name)},</p>
<p style="font-size:16px;margin:0 0 16px 0">Thank you for connecting with <strong>Bulachak</strong> (${escapeHtml(portfolioBrand.domain)}) regarding <strong>${escapeHtml(branchLabel)}</strong>. We have logged your details and will follow up directly.</p>
${data.message ? `<p style="font-size:14px;margin:0 0 16px 0;padding:12px;background:#edf0e6;border-left:3px solid #1f684c">${escapeHtml(data.message)}</p>` : ''}
<p style="font-size:14px;color:#52665a;margin:0">Direct contact: ${escapeHtml(portfolioBrand.contactEmail)} · <a href="${escapeHtml(portfolioBrand.contactHref)}" style="color:#1f684c">LinkedIn</a></p>
<p style="font-size:14px;color:#52665a;margin:12px 0 0 0">— Bulachak · A future we build together</p>
</body></html>`;

    await forwardLeadToGoogleSheets({
      sheet: 'Silent_Launch_Leads',
      row: [
        createdAt,
        id,
        data.name,
        data.email,
        data.branch,
        data.message || '',
        data.locale,
        data.source || 'bulachak-home',
      ],
      founderAlert: {
        replyTo: data.email,
        subject: `[Bulachak Lead · ${data.branch}] ${data.name} (${data.email})`,
        body: [
          `New Silent Launch inquiry on ${portfolioBrand.domain}:`,
          '',
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Branch: ${branchLabel}`,
          `Locale: ${data.locale}`,
          `Source: ${data.source || 'bulachak-home'}`,
          `Message: ${data.message || '(none)'}`,
          `Timestamp: ${createdAt}`,
        ].join('\n'),
      },
      leadConfirmation: {
        to: data.email,
        subject,
        body: textBody,
        html: htmlBody,
      },
    });

    const params = new URLSearchParams({
      name: data.name,
      email: data.email,
      source: 'silent-launch',
    });

    const item = LaunchLeadItem.parse({
      ...data,
      id,
      createdAt,
      auditPrefillUrl: `/audit?${params.toString()}`,
    });

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
