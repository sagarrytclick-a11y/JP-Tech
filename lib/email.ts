import nodemailer, { type Transporter } from 'nodemailer';
import { site } from '@/lib/site';

/**
 * SMTP configuration.
 *
 * Set these in `.env.local` (or your host's environment):
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=465
 *   SMTP_SECURE=true
 *   SMTP_USER=info@jptechnology.com
 *   SMTP_PASS=your-app-password
 *   SMTP_FROM="JP Technology <info@jptechnology.com>"
 *   NOTIFICATION_EMAIL=info@jptechnology.com
 *
 * Gmail requires an App Password (not the account password) when 2FA is on.
 */
function readSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465;

  return {
    configured: Boolean(host && user && pass),
    host,
    port: Number.isFinite(port) ? port : 587,
    secure,
    user,
    pass,
  };
}

export function isEmailConfigured() {
  return readSmtpConfig().configured;
}

let transporter: Transporter | null = null;
let transporterKey = '';

function getTransporter(): Transporter {
  const config = readSmtpConfig();

  if (!config.configured) {
    throw new Error(
      'SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS to your environment.'
    );
  }

  const key = `${config.host}:${config.port}:${config.secure}:${config.user}`;
  if (transporter && transporterKey === key) return transporter;

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
  transporterKey = key;

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export type EnquiryEmailData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  industry?: string;
  budget?: string;
  message: string;
};

function buildHtml(data: EnquiryEmailData) {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Service', data.service],
  ];

  if (data.industry) rows.push(['Industry', data.industry]);
  if (data.budget) rows.push(['Budget', data.budget]);
  rows.push(['Project details', data.message]);

  return `
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
}

export async function sendEnquiryEmail(data: EnquiryEmailData) {
  const config = readSmtpConfig();

  if (!config.configured) {
    console.warn(
      '[email] Skipped enquiry notification: SMTP_HOST, SMTP_USER and SMTP_PASS are not set.'
    );
    return { sent: false as const, reason: 'not-configured' };
  }

  const recipients = (process.env.NOTIFICATION_EMAIL || site.email)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const from = process.env.SMTP_FROM?.trim() || site.emailFrom;

  const info = await getTransporter().sendMail({
    from,
    to: recipients.join(', '),
    replyTo: `${data.name} <${data.email}>`,
    subject: `New Enquiry from ${data.name} \u2014 ${data.service}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      data.industry ? `Industry: ${data.industry}` : '',
      data.budget ? `Budget: ${data.budget}` : '',
      '',
      data.message,
    ]
      .filter((line) => line !== '')
      .join('\n'),
    html: buildHtml(data),
  });

  return { sent: true as const, messageId: info.messageId };
}
