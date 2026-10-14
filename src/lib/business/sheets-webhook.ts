// Bulachak (bulachak.com) — Google Sheets + Apps Script Webhook Client
// Forwards lead rows and email notification payloads to the bound Google Apps Script Web App.

import 'server-only';

const WEBHOOK_TIMEOUT_MS = 6_000;

export type SheetsTabName =
  | 'Silent_Launch_Leads'
  | 'Audit_Diagnostics'
  | 'Webinar_Registrations'
  | 'Athlete_Intake';

export type SheetsWebhookPayload = {
  sheet: SheetsTabName;
  row: Array<string | number>;
  founderAlert?: {
    replyTo?: string;
    subject: string;
    body: string;
  };
  leadConfirmation?: {
    to: string;
    subject: string;
    body: string;
    html?: string;
  };
};

async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function forwardLeadToGoogleSheets(payload: SheetsWebhookPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return false;

  try {
    const response = await fetchWithTimeout(
      webhookUrl,
      {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
      WEBHOOK_TIMEOUT_MS,
    );
    return response.ok;
  } catch {
    // Best-effort delivery — never block the user-facing response if the webhook times out.
    return false;
  }
}
