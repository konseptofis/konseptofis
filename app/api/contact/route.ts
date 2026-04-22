import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
};

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} tanımlı değil.`);
  return value;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const service = body.service?.trim() ?? "";

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "İsim, telefon ve mesaj alanları zorunludur." },
        { status: 400 }
      );
    }
    if (message.length > 150) {
      return NextResponse.json(
        { error: "Mesaj en fazla 150 karakter olabilir." },
        { status: 400 }
      );
    }

    const smtpHost = getEnv("SMTP_HOST");
    const smtpPort = Number(getEnv("SMTP_PORT"));
    const smtpUser = getEnv("SMTP_USER");
    const smtpPass = getEnv("SMTP_PASS");
    const smtpFrom = getEnv("SMTP_FROM");
    const smtpTo = getEnv("SMTP_TO");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `İletişim Formu - ${name}`;
    const text = [
      `İsim: ${name}`,
      `E-posta: ${email || "-"}`,
      `Telefon: ${phone}`,
      `Hizmet: ${service || "-"}`,
      `Mesaj: ${message || "-"}`,
    ].join("\n");

    const html = `
      <h2>Yeni İletişim Formu Mesajı</h2>
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email || "-"}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Hizmet:</strong> ${service || "-"}</p>
      <p><strong>Mesaj:</strong><br/>${(message || "-").replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      replyTo: smtpUser,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "E-posta gönderilirken hata oluştu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
