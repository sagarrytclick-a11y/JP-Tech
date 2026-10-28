# Slashifytech

Custom web app development company website built with Next.js, React, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create `.env.local` and fill in:

```env
ADMIN_EMAIL=
NOTIFICATION_EMAIL=
ADMIN_PASSWORD=
RESEND_API_KEY=
JWT_SECRET=
MONGODB_URI=
```

- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for `/admin`
- `NOTIFICATION_EMAIL` — inbox that receives new project enquiries
- `RESEND_API_KEY` — Resend key used to send notification emails
- `JWT_SECRET` — secret used to sign admin session tokens
- `MONGODB_URI` — MongoDB connection string used to store enquiries
