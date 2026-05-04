import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ResponseMethod = "adres" | "eposta" | "elden" | "";

type KvkkPayload = {
  fullName?: string;
  tckn?: string;
  phone?: string;
  email?: string;
  address?: string;
  relationshipTypes?: string[];
  relationshipOther?: string;
  contactedUnit?: string;
  subjectFormerEmployee?: boolean;
  subjectEmploymentYears?: string;
  subjectOther?: boolean;
  subjectOtherText?: string;
  subjectJobApplication?: boolean;
  subjectJobApplicationDate?: string;
  subjectThirdParty?: boolean;
  subjectThirdPartyDetail?: string;
  requestDetail?: string;
  responseMethod?: ResponseMethod;
  applicantSignatureName?: string;
  applicationDate?: string;
  accuracyAccepted?: boolean;
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

const REL_LABEL: Record<string, string> = {
  musteri: "Müşteri",
  ziyaretci: "Ziyaretçi",
  is_ortagi: "İş Ortağı/Çözüm Ortağı/Danışman",
  diger: "Diğer",
};

function formatRelationship(types: string[] | undefined, other?: string) {
  if (!types?.length) return "-";
  const parts = types.map((t) => REL_LABEL[t] || t).filter(Boolean);
  if (types.includes("diger") && other?.trim()) parts.push(`(Açıklama: ${other.trim()})`);
  return parts.join(", ");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as KvkkPayload;

    const fullName = body.fullName?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const address = body.address?.trim() ?? "";
    const tckn = body.tckn?.trim().replace(/\s/g, "") ?? "";
    const requestDetail = body.requestDetail?.trim() ?? "";
    const responseMethod = body.responseMethod ?? ("" as ResponseMethod);
    const accuracyAccepted = Boolean(body.accuracyAccepted);
    const relationshipTypes = Array.isArray(body.relationshipTypes)
      ? body.relationshipTypes.filter(Boolean)
      : [];
    const applicantSignatureName = body.applicantSignatureName?.trim() ?? fullName;
    const applicationDate = body.applicationDate?.trim() ?? "";

    if (!fullName || !phone || !requestDetail) {
      return NextResponse.json(
        { error: "İsim soyisim, telefon ve KVKK talebi alanları zorunludur." },
        { status: 400 }
      );
    }
    if (!responseMethod) {
      return NextResponse.json(
        { error: "Yanıtın bildirilme yöntemini seçiniz." },
        { status: 400 }
      );
    }
    if (responseMethod === "eposta" && !email) {
      return NextResponse.json(
        { error: "E-posta ile yanıt seçildiğinde e-posta adresi zorunludur." },
        { status: 400 }
      );
    }
    if (responseMethod === "adres" && !address) {
      return NextResponse.json(
        { error: "Yanıtın adrese gönderilmesini seçtiğinizde adres alanını doldurunuz." },
        { status: 400 }
      );
    }
    if (!accuracyAccepted) {
      return NextResponse.json(
        { error: "Beyan ve doğruluk onayını işaretlemeniz gerekir." },
        { status: 400 }
      );
    }
    if (tckn && !/^\d{11}$/.test(tckn)) {
      return NextResponse.json(
        { error: "T.C. kimlik numarası 11 haneli olmalıdır." },
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

    const yanıtYöntemi =
      responseMethod === "adres"
        ? "Adresime gönderilmesini istiyorum"
        : responseMethod === "eposta"
          ? "E-posta adresime gönderilmesini istiyorum"
          : "Elden teslim almak istiyorum";

    const text = [
      "KVKK BAŞVURU FORMU",
      "",
      "A. Başvuru sahibi iletişim bilgileri",
      `İsim ve Soyisim: ${fullName}`,
      `T.C.K.N.: ${tckn || "-"}`,
      `Telefon: ${phone}`,
      `E-posta: ${email || "-"}`,
      `Adres: ${address || "-"}`,
      "",
      "B. Şirket ile ilişki",
      `İlişki türü: ${formatRelationship(relationshipTypes, body.relationshipOther)}`,
      `İletişimde olunan birim: ${(body.contactedUnit ?? "").trim() || "-"}`,
      `Eski çalışan: ${body.subjectFormerEmployee ? "Evet" : "Hayır"}`,
      `Çalıştığı yıllar: ${(body.subjectEmploymentYears ?? "").trim() || "-"}`,
      `Konu (diğer): ${body.subjectOther ? (body.subjectOtherText ?? "").trim() || "—" : "-"}`,
      `İş başvurusu / özgeçmiş: ${body.subjectJobApplication ? "Evet" : "Hayır"}`,
      `Tarih: ${(body.subjectJobApplicationDate ?? "").trim() || "-"}`,
      `Üçüncü kişi firma çalışanı: ${body.subjectThirdParty ? "Evet" : "Hayır"}`,
      `Firma ve pozisyon: ${(body.subjectThirdPartyDetail ?? "").trim() || "-"}`,
      "",
      "C. Talep detayı",
      requestDetail,
      "",
      "D. Yanıt bildirim yöntemi",
      yanıtYöntemi,
      "",
      "E. Başvuru sahibi (onay)",
      `Adı Soyadı: ${applicantSignatureName}`,
      `Başvuru tarihi: ${applicationDate || "-"}`,
    ].join("\n");

    const html = `
      <h2>KVKK Başvuru Formu</h2>
      <h3>A. Başvuru sahibi iletişim bilgileri</h3>
      <p><strong>İsim ve Soyisim:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>T.C.K.N.:</strong> ${escapeHtml(tckn || "-")}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(email || "-")}</p>
      <p><strong>Adres:</strong><br/>${escapeHtml(address || "-").replace(/\n/g, "<br/>")}</p>
      <h3>B. Şirket ile ilişki</h3>
      <p><strong>İlişki türü:</strong> ${escapeHtml(formatRelationship(relationshipTypes, body.relationshipOther))}</p>
      <p><strong>İletişimde olunan birim:</strong> ${escapeHtml((body.contactedUnit ?? "").trim() || "-")}</p>
      <p><strong>Konu — Eski çalışanım:</strong> ${body.subjectFormerEmployee ? "Evet" : "Hayır"}</p>
      <p><strong>Çalıştığım yıllar:</strong> ${escapeHtml((body.subjectEmploymentYears ?? "").trim() || "-")}</p>
      <p><strong>Konu — Diğer:</strong> ${body.subjectOther ? escapeHtml((body.subjectOtherText ?? "").trim() || "—") : "-"}</p>
      <p><strong>İş başvurusu / özgeçmiş:</strong> ${body.subjectJobApplication ? "Evet" : "Hayır"} — <strong>Tarih:</strong> ${escapeHtml((body.subjectJobApplicationDate ?? "").trim() || "-")}</p>
      <p><strong>Üçüncü kişi firma çalışanı:</strong> ${body.subjectThirdParty ? "Evet" : "Hayır"}</p>
      <p><strong>Firma ve pozisyon:</strong> ${escapeHtml((body.subjectThirdPartyDetail ?? "").trim() || "-")}</p>
      <h3>C. Talep detayı</h3>
      <p>${escapeHtml(requestDetail).replace(/\n/g, "<br/>")}</p>
      <h3>D. Yanıt bildirim yöntemi</h3>
      <p>${escapeHtml(yanıtYöntemi)}</p>
      <h3>E. Başvuru sahibi</h3>
      <p><strong>Adı Soyadı:</strong> ${escapeHtml(applicantSignatureName)}</p>
      <p><strong>Başvuru tarihi:</strong> ${escapeHtml(applicationDate || "-")}</p>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      replyTo: email || smtpUser,
      subject: `KVKK Başvuru Formu - ${fullName}`,
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
