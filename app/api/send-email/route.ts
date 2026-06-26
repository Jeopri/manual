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
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#333">New portfolio message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;color:#555">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px">${email}</td></tr>
            ${subject ? `<tr><td style="padding:8px;font-weight:bold;color:#555">Subject</td><td style="padding:8px">${subject}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="color:#333;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
