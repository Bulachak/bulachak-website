/**
 * Bulachak (bulachak.com) — Google Sheets + Apps Script Leads Webhook
 * Bound to the "Bulachak — Silent Launch & Intake CRM (bulachak.com)" Google Sheet.
 * Tabs:
 *   - Silent_Launch_Leads
 *   - Audit_Diagnostics
 *   - Webinar_Registrations
 *   - Athlete_Intake
 */

const ALLOWED_SHEETS = [
  'Silent_Launch_Leads',
  'Audit_Diagnostics',
  'Webinar_Registrations',
  'Athlete_Intake',
];

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      service: 'bulachak-leads-webhook',
      spreadsheetName: ss ? ss.getName() : 'bound-sheet',
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const payload = JSON.parse(raw);

    const sheetName =
      ALLOWED_SHEETS.indexOf(payload.sheet) !== -1
        ? payload.sheet
        : 'Silent_Launch_Leads';
    const row = Array.isArray(payload.row) ? payload.row : [];

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    if (row.length > 0) {
      sheet.appendRow(row);
    }

    const founderEmail = Session.getEffectiveUser().getEmail();

    if (founderEmail && payload.founderAlert && payload.founderAlert.subject) {
      try {
        MailApp.sendEmail({
          to: founderEmail,
          replyTo: payload.founderAlert.replyTo || founderEmail,
          subject: payload.founderAlert.subject,
          body: payload.founderAlert.body || '',
        });
      } catch (mailErr) {
        console.error('Founder alert email error:', mailErr);
      }
    }

    if (
      payload.leadConfirmation &&
      payload.leadConfirmation.to &&
      payload.leadConfirmation.subject
    ) {
      try {
        MailApp.sendEmail({
          to: payload.leadConfirmation.to,
          replyTo: founderEmail || undefined,
          name: 'Bulachak · Kamilla Gafurzianova',
          subject: payload.leadConfirmation.subject,
          body: payload.leadConfirmation.body || '',
          htmlBody: payload.leadConfirmation.html || undefined,
        });
      } catch (leadMailErr) {
        console.error('Lead confirmation email error:', leadMailErr);
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        ok: true,
        sheet: sheetName,
        timestamp: new Date().toISOString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        error: String(err),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
