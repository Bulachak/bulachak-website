// API route handler for October Webinar Registration & .ics Generation (`POST /api/webinar/register`).
// Appends registrations to Google Sheets + dispatches Gmail confirmation via Google Apps Script.

import 'server-only';
import { NextResponse } from 'next/server';
import { escapeHtml, forwardLeadToGoogleSheets } from '@/lib/business/sheets-webhook';
import { WebinarRegistration, WebinarResponse } from '@/lib/contracts/webinar';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function generateIcsContent({
  title,
  description,
  zoomLink,
}: {
  title: string;
  description: string;
  zoomLink: string;
}): string {
  // Target: Thursday, October 15, 2026, 11:00 AM PDT (18:00 UTC) - 12:00 PM PDT (19:00 UTC)
  const dtStart = '20261015T180000Z';
  const dtEnd = '20261015T190000Z';
  const now = `${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bulachak A4A//Masterclass October 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:a4a-oct-2026-${crypto.randomUUID()}@bulachak.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${zoomLink}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Webinar starting in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = WebinarRegistration.safeParse(body);

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

    const attendee = parsed.data;
    const eventTitle =
      'Операционный порядок без раздутого штата: как малому бизнесу и спортивным академиям убрать рутину';
    const eventDate = 'Thursday, October 15, 2026';
    const eventTime = '11:00 AM PDT / 2:00 PM EDT / 9:00 PM MSK';
    const zoomLink = 'https://zoom.us/j/a4a-masterclass-2026';

    let id: string = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    if (process.env.DATABASE_URL) {
      try {
        const created = await prisma.webinarAttendee.create({
          data: {
            name: attendee.name,
            email: attendee.email,
            whatsappOrTelegram: attendee.whatsappOrTelegram || null,
            role: attendee.role,
            organization: attendee.organization || null,
            biggestChallenge: attendee.biggestChallenge || null,
            source: attendee.source || 'webinar-page',
          },
        });
        id = created.id;
      } catch {
        // Resilient fallback when running purely on Google Sheets + Apps Script.
      }
    }

    const icsContent = generateIcsContent({
      title: eventTitle,
      description: `60-минутный мастер-класс для малого бизнеса и спортивных академий.\nСпикеры: Анвар Туйкин (IT-процессы и трансформация) и Камилла Гафурзянова, OLY (A4A / AI-native бэк-офис).\nСсылка для подключения: ${zoomLink}`,
      zoomLink,
    });

    await forwardLeadToGoogleSheets({
      sheet: 'Webinar_Registrations',
      row: [
        createdAt,
        id,
        attendee.name,
        attendee.email,
        attendee.whatsappOrTelegram || '',
        attendee.role,
        attendee.organization || '',
        attendee.biggestChallenge || '',
        attendee.source || 'webinar-page',
      ],
      founderAlert: {
        replyTo: attendee.email,
        subject: `[Webinar Registration] ${attendee.name} (${attendee.organization || attendee.role})`,
        body: [
          'New October Masterclass registration on bulachak.com:',
          '',
          `Name: ${attendee.name}`,
          `Email: ${attendee.email}`,
          `WhatsApp / Telegram: ${attendee.whatsappOrTelegram || '(none)'}`,
          `Role: ${attendee.role}`,
          `Organization: ${attendee.organization || '(none)'}`,
          `Biggest Challenge: ${attendee.biggestChallenge || '(none)'}`,
          `Source: ${attendee.source || 'webinar-page'}`,
        ].join('\n'),
      },
      leadConfirmation: {
        to: attendee.email,
        subject: 'Регистрация подтверждена: Мастер-класс A4A · Bulachak (15 октября)',
        body: [
          `Здравствуйте, ${attendee.name}!`,
          '',
          `Ваше место на мастер-классе «${eventTitle}» подтверждено.`,
          `Дата: ${eventDate}`,
          `Время: ${eventTime}`,
          `Ссылка Zoom: ${zoomLink}`,
          '',
          '— A4A · Agents 4 Athletes (Bulachak)',
        ].join('\n'),
        html: `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.55;color:#1d332c;background:#f6faf7;padding:24px">
<p style="font-size:16px;margin:0 0 12px 0">Здравствуйте, ${escapeHtml(attendee.name)}!</p>
<p style="font-size:16px;margin:0 0 16px 0">Ваше место на мастер-классе <strong>«${escapeHtml(eventTitle)}»</strong> подтверждено.</p>
<p style="font-size:14px;margin:0 0 16px 0"><strong>Дата:</strong> ${escapeHtml(eventDate)}<br><strong>Время:</strong> ${escapeHtml(eventTime)}<br><strong>Zoom:</strong> <a href="${escapeHtml(zoomLink)}" style="color:#1f684c">${escapeHtml(zoomLink)}</a></p>
<p style="font-size:14px;color:#52665a;margin:12px 0 0 0">— A4A · Agents 4 Athletes (Bulachak)</p>
</body></html>`,
      },
    });

    const response = WebinarResponse.parse({
      id,
      name: attendee.name,
      email: attendee.email,
      confirmed: true,
      eventTitle,
      eventDate,
      eventTime,
      zoomLink,
      icsContent,
      icsFileName: 'a4a-october-masterclass.ics',
      message: 'Registration confirmed. Your calendar invitation is ready below.',
    });

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
