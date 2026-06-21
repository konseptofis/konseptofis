"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageHeader from "@/app/components/PageHeader";

const inputClass =
  "w-full rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2 text-[16px] text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]";
const labelClass = "mb-1 block text-[16px] font-medium text-gray-700";

const KVKK_DOCS = [
  { href: "/kvkk-kapsaminda-aydinlatma-metni/", label: "KVKK Aydınlatma Metni" },
  { href: "/acik-riza-onayi/", label: "Açık Rıza Onayı" },
  { href: "/kullanim-kosullari/", label: "Kullanım Koşulları" },
] as const;

function todayIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type RelKey = "musteri" | "ziyaretci" | "is_ortagi" | "diger";

export default function KvkkBasvuruClient() {
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [tckn, setTckn] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [relationship, setRelationship] = useState<Record<RelKey, boolean>>({
    musteri: false,
    ziyaretci: false,
    is_ortagi: false,
    diger: false,
  });
  const [relationshipOther, setRelationshipOther] = useState("");
  const [contactedUnit, setContactedUnit] = useState("");

  const [subjectFormerEmployee, setSubjectFormerEmployee] = useState(false);
  const [subjectEmploymentYears, setSubjectEmploymentYears] = useState("");
  const [subjectOther, setSubjectOther] = useState(false);
  const [subjectOtherText, setSubjectOtherText] = useState("");
  const [subjectJobApplication, setSubjectJobApplication] = useState(false);
  const [subjectJobApplicationDate, setSubjectJobApplicationDate] = useState("");
  const [subjectThirdParty, setSubjectThirdParty] = useState(false);
  const [subjectThirdPartyDetail, setSubjectThirdPartyDetail] = useState("");

  const [requestDetail, setRequestDetail] = useState("");
  const [responseMethod, setResponseMethod] = useState<"adres" | "eposta" | "elden" | "">("");
  const [applicationDate, setApplicationDate] = useState(todayIsoDate);
  const [accuracyAccepted, setAccuracyAccepted] = useState(false);

  const relationshipTypes = useMemo(
    () => (Object.keys(relationship) as RelKey[]).filter((k) => relationship[k]),
    [relationship]
  );

  const toggleRel = (key: RelKey) => {
    setRelationship((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/kvkk-basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          tckn,
          phone,
          email,
          address,
          relationshipTypes,
          relationshipOther,
          contactedUnit,
          subjectFormerEmployee,
          subjectEmploymentYears,
          subjectOther,
          subjectOtherText,
          subjectJobApplication,
          subjectJobApplicationDate,
          subjectThirdParty,
          subjectThirdPartyDetail,
          requestDetail,
          responseMethod,
          applicationDate,
          accuracyAccepted,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Başvuru gönderilemedi.");
      setSubmitMessage(
        "Başvurunuz alındı. Talebiniz mevzuatta öngörülen süre içinde sonuçlandırılacaktır."
      );
      setFullName("");
      setTckn("");
      setPhone("");
      setEmail("");
      setAddress("");
      setRelationship({
        musteri: false,
        ziyaretci: false,
        is_ortagi: false,
        diger: false,
      });
      setRelationshipOther("");
      setContactedUnit("");
      setSubjectFormerEmployee(false);
      setSubjectEmploymentYears("");
      setSubjectOther(false);
      setSubjectOtherText("");
      setSubjectJobApplication(false);
      setSubjectJobApplicationDate("");
      setSubjectThirdParty(false);
      setSubjectThirdPartyDetail("");
      setRequestDetail("");
      setResponseMethod("");
      setApplicationDate(todayIsoDate());
      setAccuracyAccepted(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gönderim sırasında hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  const chkRow = "flex cursor-pointer items-start gap-2 text-[16px] text-gray-700";

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="KVKK Başvuru Formu"
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK Başvuru Formu" },
        ]}
      />

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="kvkk-basvuru-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="kvkk-basvuru-heading" className="sr-only">
            KVKK kişisel veri başvuru formu
          </h2>

          <p className="mb-8 text-[16px] leading-relaxed text-gray-600">
            Aşağıdaki form, kişisel verilerinizle ilgili KVKK kapsamındaki taleplerinizi Şirketimize
            iletmeniz içindir.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <fieldset className="space-y-4 border-0 p-0">
              <legend className="mb-3 text-[17px] font-semibold text-gray-900">
                A. Başvuru sahibi iletişim bilgileri
              </legend>
              <div>
                <label htmlFor="kvkk-fullname" className={labelClass}>
                  İsim ve soyisim *
                </label>
                <input
                  id="kvkk-fullname"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="kvkk-tckn" className={labelClass}>
                  T.C. kimlik numarası
                </label>
                <input
                  id="kvkk-tckn"
                  inputMode="numeric"
                  maxLength={11}
                  value={tckn}
                  onChange={(e) => setTckn(e.target.value.replace(/\D/g, ""))}
                  className={inputClass}
                  placeholder="11 hane"
                />
              </div>
              <div>
                <label htmlFor="kvkk-phone" className={labelClass}>
                  Telefon numarası *
                </label>
                <input
                  id="kvkk-phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="kvkk-email" className={labelClass}>
                  E-posta {responseMethod === "eposta" ? "*" : ""}
                </label>
                <input
                  id="kvkk-email"
                  type="email"
                  required={responseMethod === "eposta"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="kvkk-address" className={labelClass}>
                  Adres {responseMethod === "adres" ? "*" : ""}
                </label>
                <textarea
                  id="kvkk-address"
                  rows={3}
                  required={responseMethod === "adres"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                  autoComplete="street-address"
                />
              </div>
            </fieldset>

            <fieldset className="space-y-4 border-0 p-0">
              <legend className="mb-1 text-[17px] font-semibold text-gray-900">
                B. Şirketimiz ile olan ilişkiniz
              </legend>
              <p className="text-[14px] text-gray-600">
                Müşteri, iş ortağı, çalışan adayı, eski çalışan, üçüncü taraf firma çalışanı,
                hissedar vb. — uygun olanları işaretleyiniz.
              </p>
              <div className="space-y-2">
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={relationship.musteri}
                    onChange={() => toggleRel("musteri")}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Müşteri
                </label>
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={relationship.ziyaretci}
                    onChange={() => toggleRel("ziyaretci")}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Ziyaretçi
                </label>
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={relationship.is_ortagi}
                    onChange={() => toggleRel("is_ortagi")}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  İş ortağı / çözüm ortağı / danışman
                </label>
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={relationship.diger}
                    onChange={() => toggleRel("diger")}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Diğer (açıklayınız)
                </label>
                {relationship.diger && (
                  <input
                    value={relationshipOther}
                    onChange={(e) => setRelationshipOther(e.target.value)}
                    className={`${inputClass} ml-6`}
                    placeholder="Açıklama"
                  />
                )}
              </div>
              <div>
                <label htmlFor="kvkk-unit" className={labelClass}>
                  Şirket içinde iletişimde olduğunuz birim
                </label>
                <input
                  id="kvkk-unit"
                  value={contactedUnit}
                  onChange={(e) => setContactedUnit(e.target.value)}
                  className={inputClass}
                />
              </div>

              <p className="pt-2 text-[16px] font-medium text-gray-800">Konu</p>
              <div className="space-y-3 border-t border-[#eee] pt-3">
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={subjectFormerEmployee}
                    onChange={(e) => setSubjectFormerEmployee(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  <span>Eski çalışanım</span>
                </label>
                {subjectFormerEmployee && (
                  <div className="ml-6">
                    <label htmlFor="kvkk-years" className={labelClass}>
                      Çalıştığım yıllar
                    </label>
                    <input
                      id="kvkk-years"
                      value={subjectEmploymentYears}
                      onChange={(e) => setSubjectEmploymentYears(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={subjectOther}
                    onChange={(e) => setSubjectOther(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Diğer
                </label>
                {subjectOther && (
                  <input
                    value={subjectOtherText}
                    onChange={(e) => setSubjectOtherText(e.target.value)}
                    className={`${inputClass} ml-6`}
                    placeholder="Açıklayınız"
                  />
                )}
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={subjectJobApplication}
                    onChange={(e) => setSubjectJobApplication(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  İş başvurusu / özgeçmiş paylaşımı yaptım
                </label>
                {subjectJobApplication && (
                  <div className="ml-6">
                    <label htmlFor="kvkk-app-date" className={labelClass}>
                      Tarih
                    </label>
                    <input
                      id="kvkk-app-date"
                      type="date"
                      value={subjectJobApplicationDate}
                      onChange={(e) => setSubjectJobApplicationDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}
                <label className={chkRow}>
                  <input
                    type="checkbox"
                    checked={subjectThirdParty}
                    onChange={(e) => setSubjectThirdParty(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Üçüncü kişi firma çalışanıyım
                </label>
                {subjectThirdParty && (
                  <div className="ml-6">
                    <label htmlFor="kvkk-third-detail" className={labelClass}>
                      Çalıştığınız firma ve pozisyon
                    </label>
                    <textarea
                      id="kvkk-third-detail"
                      rows={2}
                      value={subjectThirdPartyDetail}
                      onChange={(e) => setSubjectThirdPartyDetail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-3 border-0 p-0">
              <legend className="mb-1 text-[17px] font-semibold text-gray-900">
                C. KVKK kapsamındaki talebiniz
              </legend>
              <label htmlFor="kvkk-detail" className={labelClass}>
                Talebinizi detaylı yazınız *
              </label>
              <textarea
                id="kvkk-detail"
                required
                rows={6}
                value={requestDetail}
                onChange={(e) => setRequestDetail(e.target.value)}
                className={inputClass}
                placeholder="Örn. işlenen verilerinize erişim, düzeltme, silme talebi vb."
              />
            </fieldset>

            <fieldset className="space-y-3 border-0 p-0">
              <legend className="mb-1 text-[17px] font-semibold text-gray-900">
                D. Yanıtın tarafınıza bildirilme yöntemi
              </legend>
              <p className="text-[14px] text-gray-600">
                E-posta yöntemini seçmeniz hâlinde size daha hızlı yanıt verebiliriz. Elden teslimde
                vekâleten başvurularda noter tasdikli vekâletname veya yetki belgesi gerekebilir.
              </p>
              <div className="space-y-2">
                <label className={chkRow}>
                  <input
                    type="radio"
                    name="responseMethod"
                    checked={responseMethod === "adres"}
                    onChange={() => setResponseMethod("adres")}
                    className="mt-1 h-4 w-4 border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Adresime gönderilmesini istiyorum
                </label>
                <label className={chkRow}>
                  <input
                    type="radio"
                    name="responseMethod"
                    checked={responseMethod === "eposta"}
                    onChange={() => setResponseMethod("eposta")}
                    className="mt-1 h-4 w-4 border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  E-posta adresime gönderilmesini istiyorum
                </label>
                <label className={chkRow}>
                  <input
                    type="radio"
                    name="responseMethod"
                    checked={responseMethod === "elden"}
                    onChange={() => setResponseMethod("elden")}
                    className="mt-1 h-4 w-4 border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                  />
                  Elden teslim almak istiyorum
                </label>
              </div>
            </fieldset>

            <div className="space-y-4 border-t border-[#e5e5e5] pt-8">
              <p className="text-[16px] leading-relaxed text-gray-600">
                İlgili metinlere hızlı erişim için bağlantıları kullanabilirsiniz.
              </p>
              <div className="flex flex-wrap gap-2">
                {KVKK_DOCS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center rounded-[8px] border-2 border-[#0b7041] bg-white px-3 py-2 text-[15px] font-medium text-[#0b7041] transition-colors hover:bg-[#0b7041]/10 sm:text-[16px]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="rounded-[8px] border border-[#e5e5e5] bg-[rgb(11_112_65_/_0.06)] p-4 text-[14px] leading-relaxed text-gray-700">
                <p>
                  İşbu başvuru formu, Şirketimiz ile olan ilişkinizi tespit ederek, varsa,
                  Şirketimiz tarafından işlenen kişisel verilerinizi eksiksiz olarak belirleyerek,
                  ilgili başvurunuza doğru ve kanuni süresinde cevap verilebilmesi için tanzim
                  edilmiştir. Hukuka aykırı ve haksız bir şekilde veri paylaşımından kaynaklanabilecek
                  hukuki risklerin bertaraf edilmesi ve özellikle kişisel verilerinizin güvenliğinin
                  sağlanması amacıyla, kimlik ve yetki tespiti için Şirketimiz ek evrak ve malumat
                  (Nüfus cüzdanı veya sürücü belgesi sureti vb.) talep etme hakkını saklı tutar.
                  Form kapsamında iletmekte olduğunuz taleplerinize ilişkin bilgilerin doğru ve güncel
                  olmaması ya da yetkisiz bir başvuru yapılması halinde Şirketimiz, söz konusu yanlış
                  bilgi ya da yetkisiz başvuru kaynaklı taleplerden dolayı mesuliyet kabul
                  etmemektedir.
                </p>
              </div>
            </div>

            <fieldset className="space-y-4 border-0 p-0">
              <legend className="mb-1 text-[17px] font-semibold text-gray-900">
                E. Başvuru sahibi (kişisel veri sahibi)
              </legend>
              <div>
                <label htmlFor="kvkk-app-date-main" className={labelClass}>
                  Başvuru tarihi
                </label>
                <input
                  id="kvkk-app-date-main"
                  type="date"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <label className={`${chkRow} leading-snug`}>
                <input
                  type="checkbox"
                  checked={accuracyAccepted}
                  onChange={(e) => setAccuracyAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                />
                <span>
                  Verdiğim bilgilerin doğru ve güncel olduğunu beyan eder; yukarıdaki uyarı metnini
                  ve yasal metin bağlantılarını incelediğimi kabul ederim. *
                </span>
              </label>
            </fieldset>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 cursor-pointer rounded-[8px] bg-[#0b7041] px-5 py-2.5 text-[16px] font-semibold text-white hover:bg-[#095530] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
              >
                {submitting ? "Gönderiliyor..." : "Başvuruyu gönder"}
              </button>
            </div>
            {submitMessage && (
              <p className="text-[16px] text-[#0b7041]" role="status">
                {submitMessage}
              </p>
            )}
            {submitError && (
              <p className="text-[16px] text-red-600" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
