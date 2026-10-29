# JP Technology

Custom web app development company website built with Next.js, React, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create `.env.local` and fill in:

```env
ADMIN_USER=
ADMIN_PASSWORD=
JWT_SECRET=
MONGODB_URI=
NOTIFICATION_EMAIL=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
GROQ_API_KEY=
GROQ_MODEL=
```

- `ADMIN_USER` / `ADMIN_PASSWORD` — username and password for `/admin`
- `NOTIFICATION_EMAIL` — inbox (or comma-separated inboxes) that receives project enquiries and career applications
- `JWT_SECRET` — secret used to sign admin session tokens
- `MONGODB_URI` — MongoDB connection string used to store enquiries, blog posts, and career applications
- `SMTP_*` — Nodemailer SMTP settings used for enquiry and career notification emails
- `IMAGEKIT_PRIVATE_KEY` / `IMAGEKIT_URL_ENDPOINT` — required for all uploads (blog covers, career resumes, and optional enquiry attachments). Files are never stored on the server, so these must be set for uploads to work.
- `GROQ_API_KEY` / `GROQ_MODEL` — server-side Groq credentials for the AI chat widget. `GROQ_MODEL` defaults to `openai/gpt-oss-120b`.
