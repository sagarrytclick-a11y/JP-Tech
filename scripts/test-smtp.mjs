/**
 * SMTP credential checker + optional test email sender.
 *
 * Usage:
 *   node scripts/test-smtp.mjs          # only checks the login
 *   node scripts/test-smtp.mjs --send   # sends a real test email to
 *                                       # NOTIFICATION_EMAIL + EMAIL_CC
 *
 * It reads SMTP_* values from .env.
 */
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

function loadEnv(file) {
  const full = path.resolve(file);
  if (!fs.existsSync(full)) return {};
  const out = {};
  for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function toList(value) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const env = loadEnv(".env");
const host = env.SMTP_HOST || "smtp.gmail.com";
const port = Number(env.SMTP_PORT || 465);
const secure = env.SMTP_SECURE === "true" || port === 465;
const user = env.SMTP_USER;
const pass = env.SMTP_PASS;
const from = env.SMTP_FROM || user;
const to = toList(env.NOTIFICATION_EMAIL || user);
const cc = toList(env.EMAIL_CC);
const shouldSend = process.argv.includes("--send");

console.log("SMTP configuration");
console.log("------------------");
console.log("host     :", host);
console.log("port     :", port, secure ? "(TLS)" : "(STARTTLS)");
console.log("user     :", user || "(missing)");
console.log("from     :", from || "(missing)");
console.log("to       :", to.join(", ") || "(missing)");
console.log("cc       :", cc.join(", ") || "(none)");
console.log("password :", pass ? `${pass.length} chars` : "(missing)");
console.log("");

if (!host || !user || !pass) {
  console.error("ERROR: SMTP_HOST, SMTP_USER and SMTP_PASS must all be set in .env");
  process.exit(1);
}

if (pass.length !== 16) {
  console.warn(
    "WARNING: Gmail App Passwords are 16 characters long (no spaces)." +
      " The current password does not match that format."
  );
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

try {
  await transporter.verify();
  console.log("✅ SMTP login OK — this account/password pair is valid.");

  if (shouldSend) {
    const info = await transporter.sendMail({
      from,
      to: to.join(", "),
      ...(cc.length ? { cc: cc.join(", ") } : {}),
      subject: "JP Technology — SMTP test email",
      text: [
        "This is a test email from the JP Technology website.",
        "",
        "If you can read this, the nodemailer SMTP configuration is working.",
        `Sent at: ${new Date().toISOString()}`,
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px">
          <h2 style="color:#ff4d1f;margin:0 0 12px">JP Technology — SMTP test</h2>
          <p>This is a test email from the JP Technology website.</p>
          <p>If you can read this, the nodemailer SMTP configuration is working.</p>
          <p style="color:#888;font-size:12px">Sent at: ${new Date().toISOString()}</p>
        </div>
      `,
    });
    console.log("✅ Test email sent.");
    console.log("   messageId:", info.messageId);
    console.log("   to       :", to.join(", "));
    if (cc.length) console.log("   cc       :", cc.join(", "));
  } else {
    console.log("   (run with --send to deliver a test email to", to.join(", ") + ")");
  }

  process.exit(0);
} catch (error) {
  const code = error?.responseCode ?? error?.response?.code;
  console.error("❌ SMTP login FAILED");
  console.error("   code   :", code ?? "(none)");
  console.error("   message:", error?.message || String(error));
  if (code === 535) {
    console.error("");
    console.error("Gmail says the username/password were not accepted.");
    console.error("Fix it like this:");
    console.error("  1. Sign in to Google as:", user);
    console.error("  2. Google Account -> Security -> 2-Step Verification (must be ON)");
    console.error("  3. App passwords -> Create new -> copy the 16-char password");
    console.error("  4. .env -> SMTP_PASS=<new password>");
    console.error("  5. Restart the dev server");
    console.error("  6. node scripts/test-smtp.mjs --send");
  }
  process.exit(1);
}
