import { Resend } from 'resend';
import { site } from '@/lib/site';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function sendEnquiryEmail(data: {
  name: string;
  email: string;
  phone: string;
  city?: string;
  service: string;
  message?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:sans-serif;background:#f4f4f4;padding:40px">
      <div style="max-width:600px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
        <div style="background:#1e3a5a;padding:24px;text-align:center">
          <h1 style="color:#f5b85a;margin:0;font-size:22px">New Enquiry Received</h1>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;font-weight:bold;color:#555">Name</td><td style="padding:10px 0">${data.name}</td></tr>
            <tr><td style="padding:10px 0;font-weight:bold;color:#555">Email</td><td style="padding:10px 0">${data.email}</td></tr>
            <tr><td style="padding:10px 0;font-weight:bold;color:#555">Phone</td><td style="padding:10px 0">${data.phone}</td></tr>
            <tr><td style="padding:10px 0;font-weight:bold;color:#555">City</td><td style="padding:10px 0">${data.city || '—'}</td></tr>
            <tr><td style="padding:10px 0;font-weight:bold;color:#555">Service</td><td style="padding:10px 0">${data.service}</td></tr>
          </table>
          <p style="color:#999;font-size:12px;margin-top:32px;text-align:center">${site.name} — Enquiry Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: site.emailFrom,
    to: process.env.NOTIFICATION_EMAIL || site.email,
    subject: `New Enquiry from ${data.name} — ${data.service}`,
    html,
  });
}
