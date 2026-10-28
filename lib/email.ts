import { Resend } from 'resend';
import { site } from '@/lib/site';

const resend = new Resend(process.env.RESEND_API_KEY || '');

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendEnquiryEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  industry: string;
  budget: string;
  message: string;
}) {
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Service', data.service],
    ['Industry', data.industry],
    ['Budget', data.budget],
    ['Project details', data.message],
  ];

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:sans-serif;background:#f4f4f4;padding:40px">
      <div style="max-width:600px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
        <div style="background:#111111;padding:24px;text-align:center">
          <h1 style="color:#ff4d1f;margin:0;font-size:22px">New Project Enquiry</h1>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:10px 12px 10px 0;font-weight:bold;color:#555;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:10px 0;color:#222">${escapeHtml(
                    value || '\u2014'
                  )}</td></tr>`
              )
              .join('')}
          </table>
          <p style="color:#999;font-size:12px;margin-top:32px;text-align:center">${site.name} \u2014 Enquiry Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: site.emailFrom,
    to: process.env.NOTIFICATION_EMAIL || site.email,
    subject: `New Enquiry from ${data.name} \u2014 ${data.service}`,
    html,
  });
}
