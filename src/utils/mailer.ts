import nodemailer from "nodemailer";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

export interface LeadEmailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface LeadEmailPayload {
  form: string;
  region?: string;
  data: Record<string, unknown>;
  pageUrl?: string;
  replyTo?: string;
  attachments?: LeadEmailAttachment[];
}

export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function stripHeaderInjection(val: string): string {
  return val.replace(/[\r\n]/g, "");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getSmtpConfig(): SmtpConfig {
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  const host = (process.env.SMTP_HOST || "").trim();

  let port = 465;
  if (process.env.SMTP_PORT) {
    const parsed = parseInt(process.env.SMTP_PORT, 10);
    if (!Number.isNaN(parsed)) {
      port = parsed;
    }
  }

  const secure = port === 465;

  return { host, port, secure, user, pass };
}

export function createTransporter() {
  const missing: string[] = [];
  if (!process.env.SMTP_HOST?.trim()) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER?.trim()) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASS?.trim()) missing.push("SMTP_PASS");

  if (missing.length > 0) {
    console.error(`[Mailer] Missing required SMTP configuration: ${missing.join(", ")}`);
    return null;
  }

  const config = getSmtpConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<boolean> {
  const region = (payload.region || "au").toUpperCase();
  const formName = payload.form;

  const missing: string[] = [];
  if (!process.env.SMTP_HOST?.trim()) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER?.trim()) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASS?.trim()) missing.push("SMTP_PASS");
  if (!process.env.ADMIN_EMAIL?.trim()) missing.push("ADMIN_EMAIL");

  if (missing.length > 0) {
    console.error(
      `[Mailer] Cannot send lead email for ${formName} (${region}): missing required environment variable(s): ${missing.join(", ")}`
    );
    return false;
  }

  const adminEmail = process.env.ADMIN_EMAIL!.trim();
  const config = getSmtpConfig();
  const transporter = createTransporter();
  if (!transporter) {
    console.error(`[Mailer] Failed to create SMTP transporter for ${formName} (${region})`);
    return false;
  }

  const timestamp = new Date().toISOString();
  const pageUrl =
    payload.pageUrl ||
    `https://www.tutorexel.com/${region === "AU" ? "" : region.toLowerCase()}`;

  const rawFromName = process.env.EMAIL_FROM_NAME || "TutorExel";
  const fromName = stripHeaderInjection(rawFromName).trim() || "TutorExel";
  const fromAddress = `${fromName} <${config.user}>`;

  const rawSubject = `New lead: ${formName} (${region})`;
  const cleanSubject = stripHeaderInjection(rawSubject).trim();

  let cleanReplyTo: string | undefined = undefined;
  const rawReplyTo =
    payload.replyTo ||
    (typeof payload.data.email === "string" ? payload.data.email : undefined);
  if (rawReplyTo) {
    const stripped = stripHeaderInjection(rawReplyTo).trim();
    if (EMAIL_REGEX.test(stripped)) {
      cleanReplyTo = stripped;
    } else {
      console.warn(`[Mailer] Dropping invalid replyTo email: "${rawReplyTo}"`);
    }
  }

  const rows = Object.entries(payload.data)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;color:#374151;">${escapeHtml(
          String(k)
        )}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#111827;">${escapeHtml(
          String(v)
        )}</td></tr>`
    )
    .join("");

  const textLines = [
    `New lead: ${formName} (${region})`,
    `Form: ${formName}`,
    `Region: ${region}`,
    `Page URL: ${pageUrl}`,
    `Timestamp: ${timestamp}`,
    "",
    "Submission details:",
    ...Object.entries(payload.data)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(([k, v]) => `- ${k}: ${String(v)}`),
  ];

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#1a2e3b;padding:24px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:#ffffff;font-size:20px;margin:0;">TutorExel</h1>
    <p style="color:rgba(255,255,255,.7);font-size:13px;margin:4px 0 0;">New Lead: ${escapeHtml(formName)} (${escapeHtml(region)})</p>
  </div>
  <div style="background:#ffffff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
    <p style="font-size:14px;color:#374151;margin:0 0 16px;"><strong>Region:</strong> ${escapeHtml(region)} | <strong>Page:</strong> ${escapeHtml(pageUrl)} | <strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">${rows}</table>
  </div>
</div>`;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: adminEmail,
      replyTo: cleanReplyTo,
      subject: cleanSubject,
      text: textLines.join("\n"),
      html,
      attachments: payload.attachments,
    });
    console.log(`[Mailer] Lead email sent for ${formName} (${region}) to ${adminEmail}`);
    return true;
  } catch (err) {
    console.error(
      `[Mailer] Failed to send lead email for ${formName} (${region}):`,
      err instanceof Error ? err.message : err
    );
    return false;
  }
}
