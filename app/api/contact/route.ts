import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  CONTACT_SOURCE_DEFAULT,
  CONTACT_SOURCE_QUICK_QUOTE,
  isValidPhone,
} from "@/lib/contact-utils";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  source?: string;
};

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} tanımlı değil.`);
  return value;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const service = body.service?.trim() ?? "";
    const source = body.source?.trim() || CONTACT_SOURCE_DEFAULT;
    const isQuickQuote = source === CONTACT_SOURCE_QUICK_QUOTE;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "İsim ve telefon alanları zorunludur." },
        { status: 400 }
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Geçerli bir telefon numarası girin (en az 10 rakam)." },
        { status: 400 }
      );
    }
    if (!isQuickQuote && !message) {
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

    const subject = `${source} - ${name}`;
    const displayMessage = message || (isQuickQuote ? "Hızlı teklif talebi." : "-");
    const text = [
      `Kaynak: ${source}`,
      `İsim: ${name}`,
      `E-posta: ${email || "-"}`,
      `Telefon: ${phone}`,
      `Hizmet: ${service || "-"}`,
      `Mesaj: ${displayMessage}`,
    ].join("\n");

    const html = `
      <h2>Yeni ${escapeHtml(source)} Mesajı</h2>
      <p><strong>Kaynak:</strong> ${escapeHtml(source)}</p>
      <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(email || "-")}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Hizmet:</strong> ${escapeHtml(service || "-")}</p>
      <p><strong>Mesaj:</strong><br/>${escapeHtml(displayMessage).replace(/\n/g, "<br/>")}</p>
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
