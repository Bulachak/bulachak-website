// API route handler for the 15-Minute Operational Leak Audit (`POST /api/audit`).
// Appends diagnostic rows to Google Sheets + dispatches Gmail alerts via Google Apps Script.

import 'server-only';
import { NextResponse } from 'next/server';
import { escapeHtml, forwardLeadToGoogleSheets } from '@/lib/business/sheets-webhook';
import { AuditResult, AuditSubmission } from '@/lib/contracts/audit';
import { prisma } from '@/lib/db';
import { portfolioBrand } from '@/lib/portfolio-brand';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AuditSubmission.safeParse(body);

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

    // Calculate Friction Score (0-100)
    let score = 20;
    if (data.weeklyAdminHours >= 20) score += 40;
    else if (data.weeklyAdminHours >= 15) score += 30;
    else if (data.weeklyAdminHours >= 10) score += 20;
    else score += 10;

    // Add bottleneck weight (10 points per selected bottleneck, capped)
    score += Math.min(40, data.primaryBottlenecks.length * 10);

    // Athlete scale factor
    if (data.athleteCount === '100+') score += 10;
    else if (data.athleteCount === '51-100') score += 5;

    const frictionScore = Math.min(100, Math.max(10, score));

    // Friction Level
    let frictionLevel: 'Low' | 'Moderate' | 'Severe' | 'Critical' = 'Moderate';
    if (frictionScore >= 80) frictionLevel = 'Critical';
    else if (frictionScore >= 60) frictionLevel = 'Severe';
    else if (frictionScore < 40) frictionLevel = 'Low';

    // Recoverable hours and drag cost
    const estimatedWeeklyHoursWasted = Math.max(6, Math.round(data.weeklyAdminHours * 0.7));
    const hourlyValue = 40;
    const estimatedAnnualCostOfDrag = estimatedWeeklyHoursWasted * hourlyValue * 48;

    // Tailored prescriptions based on bottlenecks
    const prescriptions: string[] = [];
    if (data.primaryBottlenecks.includes('inquiry-leak')) {
      prescriptions.push(
        'Deploy an AI Concierge on your front door to deflect 70% of repetitive parent questions within 5 seconds.',
      );
    }
    if (data.primaryBottlenecks.includes('manual-billing')) {
      prescriptions.push(
        'Automate tuition and camp fee collections via direct Stripe/ACH routing to eliminate manual check chasing.',
      );
    }
    if (data.primaryBottlenecks.includes('paper-waivers')) {
      prescriptions.push(
        'Transition to 100% digital liability waivers embedded directly into the athlete intake flow.',
      );
    }
    if (data.primaryBottlenecks.includes('scheduling-friction')) {
      prescriptions.push(
        'Sync coach availability and roster caps with automated calendar bookings, eliminating SMS back-and-forth.',
      );
    }
    if (data.primaryBottlenecks.includes('software-fatigue')) {
      prescriptions.push(
        'Consolidate disjointed apps into one plain-language agent-run back office owned outright with zero monthly SaaS fees.',
      );
    }

    if (prescriptions.length === 0) {
      prescriptions.push(
        'Streamline inquiry-to-intake pipeline with automated parent follow-up sequences.',
      );
    }

    // Recommended pillar
    let recommendedPillar = 'Turnkey Sport Ops Sprint ($2,800–$3,000)';
    if (data.athleteCount === '100+' || data.sportOrNiche.toLowerCase().includes('federation')) {
      recommendedPillar = 'Sponsored Cohort Accelerator or Institutional Package';
    } else if (
      data.notes?.toLowerCase().includes('camp') ||
      data.notes?.toLowerCase().includes('summer')
    ) {
      recommendedPillar = 'Seasonal Camp Value-Share ($1,000 + 8%)';
    }

    let id: string = crypto.randomUUID();
    let createdAt = new Date().toISOString();

    if (process.env.DATABASE_URL) {
      try {
        const created = await prisma.auditDiagnostic.create({
          data: {
            organizationName: data.organizationName,
            contactName: data.contactName,
            email: data.email,
            phone: data.phone || null,
            sportOrNiche: data.sportOrNiche,
            athleteCount: data.athleteCount,
            weeklyAdminHours: data.weeklyAdminHours,
            primaryBottlenecks: data.primaryBottlenecks,
            notes: data.notes || null,
            frictionScore,
            frictionLevel,
            estimatedWeeklyHoursWasted,
            estimatedAnnualCostOfDrag,
            recommendedPillar,
            source: data.source || 'audit-page',
          },
        });
        id = created.id;
        createdAt = created.createdAt.toISOString();
      } catch {
        // Resilient fallback when running purely on Google Sheets + Apps Script.
      }
    }

    const bookingSubject = encodeURIComponent(
      `15-Min Ops Diagnostic: ${data.organizationName} (${data.contactName})`,
    );
    const bookingBody = encodeURIComponent(
      `Hi Kamilla,\n\nI completed the Operational Leak Audit for ${data.organizationName}.\nFriction Score: ${frictionScore}/100 (${frictionLevel}).\nEstimated weekly hours wasted: ${estimatedWeeklyHoursWasted} hrs/week.\n\nI would like to schedule our 15-minute diagnostic call.\n\nBest,\n${data.contactName}\n${data.phone ? `Phone: ${data.phone}` : ''}`,
    );
    const bookingUrl = `mailto:${portfolioBrand.contactEmail}?subject=${bookingSubject}&body=${bookingBody}`;

    await forwardLeadToGoogleSheets({
      sheet: 'Audit_Diagnostics',
      row: [
        createdAt,
        id,
        data.organizationName,
        data.contactName,
        data.email,
        data.phone || '',
        data.sportOrNiche,
        data.athleteCount,
        data.weeklyAdminHours,
        data.primaryBottlenecks.join(', '),
        frictionScore,
        frictionLevel,
        estimatedWeeklyHoursWasted,
        estimatedAnnualCostOfDrag,
        recommendedPillar,
        data.source || 'audit-page',
        data.notes || '',
      ],
      founderAlert: {
        replyTo: data.email,
        subject: `[A4A Audit · ${frictionScore}/100 ${frictionLevel}] ${data.organizationName} (${data.contactName})`,
        body: [
          `New 15-Minute Operational Leak Audit on ${portfolioBrand.domain}:`,
          '',
          `Organization: ${data.organizationName}`,
          `Contact: ${data.contactName} (${data.email})`,
          `Phone: ${data.phone || '(none)'}`,
          `Sport / Niche: ${data.sportOrNiche}`,
          `Athletes: ${data.athleteCount}`,
          `Weekly Admin Hours: ${data.weeklyAdminHours} hrs/wk`,
          `Bottlenecks: ${data.primaryBottlenecks.join(', ')}`,
          `Friction Score: ${frictionScore}/100 (${frictionLevel})`,
          `Recoverable Hours: ~${estimatedWeeklyHoursWasted} hrs/wk`,
          `Annual Drag Cost: $${estimatedAnnualCostOfDrag.toLocaleString()}`,
          `Recommended Pillar: ${recommendedPillar}`,
          `Source: ${data.source || 'audit-page'}`,
          `Notes: ${data.notes || '(none)'}`,
        ].join('\n'),
      },
      leadConfirmation: {
        to: data.email,
        subject: `Your A4A Operational Diagnostic (${data.organizationName})`,
        body: [
          `Hi ${data.contactName},`,
          '',
          `Here is your A4A 15-Minute Operational Leak Audit summary for ${data.organizationName}:`,
          `- Friction Score: ${frictionScore}/100 (${frictionLevel})`,
          `- Recoverable Hours: ~${estimatedWeeklyHoursWasted} hrs/week`,
          `- Estimated Annual Drag Cost: $${estimatedAnnualCostOfDrag.toLocaleString()}`,
          `- Recommended Pillar: ${recommendedPillar}`,
          '',
          `Direct contact: ${portfolioBrand.contactEmail}`,
          '— A4A · Agents 4 Athletes (Bulachak)',
        ].join('\n'),
        html: `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.55;color:#1d332c;background:#f6faf7;padding:24px">
<p style="font-size:16px;margin:0 0 12px 0">Hi ${escapeHtml(data.contactName)},</p>
<p style="font-size:16px;margin:0 0 16px 0">Here is your <strong>A4A Operational Diagnostic</strong> for <strong>${escapeHtml(data.organizationName)}</strong>:</p>
<ul style="margin:0 0 16px 0;padding-left:20px">
<li><strong>Friction Score:</strong> ${frictionScore}/100 (${escapeHtml(frictionLevel)})</li>
<li><strong>Recoverable Hours:</strong> ~${estimatedWeeklyHoursWasted} hrs/week</li>
<li><strong>Estimated Annual Drag:</strong> $${estimatedAnnualCostOfDrag.toLocaleString()}</li>
<li><strong>Recommended Framework:</strong> ${escapeHtml(recommendedPillar)}</li>
</ul>
<p style="font-size:14px;color:#52665a;margin:0">Reply or write directly to ${escapeHtml(portfolioBrand.contactEmail)} to schedule your 15-minute walkthrough.</p>
<p style="font-size:14px;color:#52665a;margin:12px 0 0 0">— A4A · Agents 4 Athletes (Bulachak)</p>
</body></html>`,
      },
    });

    const result = AuditResult.parse({
      id,
      organizationName: data.organizationName,
      contactName: data.contactName,
      frictionScore,
      frictionLevel,
      estimatedWeeklyHoursWasted,
      estimatedAnnualCostOfDrag,
      recommendedPillar,
      priorityPrescriptions: prescriptions,
      bookingUrl,
      createdAt,
    });

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
