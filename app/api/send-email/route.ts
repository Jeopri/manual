import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/content/site";

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit: 3 messages per IP per 10 minutes. On serverless this is
// per instance, so it slows down abuse rather than guaranteeing a hard cap.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips characters that could break out of an email header. */
function headerSafe(value: string) {
  return value.replace(/[\r\n"<>]/g, " ").trim();
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in → almost certainly a bot. Pretend success so it doesn't retry.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const subject = field(body, "subject");
  const message = field(body, "message");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  for (const [key, value] of Object.entries({ name, email, subject, message })) {
    if (value.length > LIMITS[key as keyof typeof LIMITS]) {
      return NextResponse.json({ error: `The ${key} is too long.` }, { status: 400 });
    }
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a few minutes or email me directly." },
      { status: 429 },
    );
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${headerSafe(name)}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: site.email,
      subject: headerSafe(subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`),
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#f5f3ef;padding:32px 20px">
          <div style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06)">
            <div style="background:#0d0d0d;padding:28px 32px;border-bottom:3px solid #BEFF00">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#f0ede8;letter-spacing:-0.3px">${escapeHtml(site.name.toLowerCase())}</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#BEFF00;font-weight:400">portfolio contact</p>
            </div>
            <div style="padding:28px 32px">
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:80px;font-size:13px;font-weight:600;color:#888;vertical-align:top">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222;font-weight:500">${safe.name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#888;vertical-align:top">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222">
                    <a href="mailto:${safe.email}" style="color:#4d7a1f;text-decoration:none;font-weight:500">${safe.email}</a>
                  </td>
                </tr>
                ${subject ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#888;vertical-align:top">Subject</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222;font-weight:500">${safe.subject}</td>
                </tr>` : ""}
              </table>
              <div style="margin-top:24px">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px">Message</p>
                <div style="background:#fafafa;border-radius:10px;padding:16px;border:1px solid #f0f0f0">
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#333;white-space:pre-wrap">${safe.message}</p>
                </div>
              </div>
            </div>
          </div>
          <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#aaa">Sent from ${escapeHtml(site.url.replace(/^https?:\/\//, ""))}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
