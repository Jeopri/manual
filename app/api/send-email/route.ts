import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: "jeffreysedoro5@gmail.com",
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#f5f5f5;padding:32px 20px">
          <div style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06)">
            <div style="background:linear-gradient(135deg,#3b82f6,#6366f1);padding:28px 32px">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">jeffrey sedoro</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);font-weight:400">portfolio contact</p>
            </div>
            <div style="padding:28px 32px">
              <div style="margin-bottom:24px">
                <div style="display:inline-block;background:#eef2ff;border-radius:999px;padding:4px 14px;font-size:12px;font-weight:600;color:#4f46e5;letter-spacing:0.3px;text-transform:uppercase">New Message</div>
              </div>
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:80px;font-size:13px;font-weight:600;color:#888;vertical-align:top">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222;font-weight:500">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#888;vertical-align:top">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222">
                    <a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;font-weight:500">${email}</a>
                  </td>
                </tr>
                ${subject ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#888;vertical-align:top">Subject</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222;font-weight:500">${subject}</td>
                </tr>` : ""}
              </table>
              <div style="margin-top:24px">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px">Message</p>
                <div style="background:#fafafa;border-radius:10px;padding:16px;border:1px solid #f0f0f0">
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#333;white-space:pre-wrap">${message}</p>
                </div>
              </div>
            </div>
          </div>
          <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#aaa">Sent from jeffreysedoro.vercel.app</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
