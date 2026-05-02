"use client";

import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  ComputerDesktopIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { SITE } from "@/app/lib/data";
import PageHeader from "@/app/components/PageHeader";
import SectionHeading from "@/app/components/SectionHeading";

export default function IletisimClient() {
  const [service, setService] = useState<"sanal" | "makam" | "toplanti" | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkkAccepted) {
      alert("Devam edebilmek için KVKK Aydınlatma Metni'ni kabul etmeniz gerekmektedir.");
      return;
    }
    try {
      setSubmitMessage(null);
      setSubmitError(null);
      setSubmitting(true);
      const serviceLabelMap = {
        sanal: "Sanal Ofis",
        makam: "Makam Odası",
        toplanti: "Toplantı Odası",
      } as const;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          service: service ? serviceLabelMap[service] : "",
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Mesaj gönderilemedi.");

      setSubmitMessage("Mesajınız alındı. En kısa sürede size dönüş yapacağız.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setService("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Mesaj gönderilirken hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="İletişim"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "İletişim" }]}
      />

      <section
        className="relative px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12"
        aria-labelledby="contact-content-heading contact-form-heading"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h80M40 0v80' stroke='%230b7041' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 lg:pt-8">
              <SectionHeading id="contact-content-heading" className="mb-4">
                Bize ulaşın
              </SectionHeading>
              <p className="text-gray-600 leading-relaxed">
                Sanal ofis, Makam odası ve Toplantı odası çözümlerimiz ile ilgili detaylı bilgi için
                bizi dilediğiniz zaman arayabilirsiniz. Sizleri bir çay içmeye ofislerimize her zaman
                bekleriz.
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${SITE.phoneRaw.replace(/\s/g, "")}`}
                    className="flex cursor-pointer items-center gap-3 text-gray-700 hover:text-[#0b7041]"
                  >
                    <PhoneIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
                    <span>{SITE.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex cursor-pointer items-center gap-3 text-gray-700 hover:text-[#0b7041]"
                  >
                    <EnvelopeIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
                    <span>{SITE.email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-[#0b7041] mt-0.5" aria-hidden />
                    <span className="text-[16px] leading-relaxed">
                      {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}
                    </span>
                  </div>
                </li>
              </ul>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61574808733053"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex cursor-pointer items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/KonseptOfis"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="X"
                  className="inline-flex cursor-pointer items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@KonseptOfis"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex cursor-pointer items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/konseptofis/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex cursor-pointer items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/konseptofis/?viewAsMember=true"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex cursor-pointer items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <div className="min-h-[280px] w-full rounded-xl overflow-hidden border border-[#e5e5e5] bg-[#f5f5f5] mt-4">
                <iframe
                  title="Konsept Ofis - Mahall Ankara, Çankaya harita konumu"
                  src={SITE.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="h-[280px] w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="rounded-[8px] border border-[#e5e5e5] bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading id="contact-form-heading" className="mb-6">
                İletişim formu
              </SectionHeading>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-700">
                    İsim *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="İsim"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-gray-700">
                    Telefon *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="Telefon"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">
                    E-posta (Opsiyonel)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="ornek@mail.com"
                  />
                </div>
                <div>
                  <span className="mb-2 block text-xs font-medium text-gray-600">
                    İlgilendiğiniz Hizmeti Seçin
                  </span>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { id: "sanal", label: "Sanal Ofis", icon: ComputerDesktopIcon },
                      { id: "makam", label: "Makam Odası", icon: BuildingOffice2Icon },
                      { id: "toplanti", label: "Toplantı Odası", icon: UserGroupIcon },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setService(service === id ? "" : (id as typeof service))}
                        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border-2 px-2 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-3 sm:text-sm ${
                          service === id
                            ? "border-[#0b7041] bg-[#0b7041]/10 text-[#0b7041]"
                            : "border-[#e5e5e5] bg-white text-gray-700 hover:border-[#0b7041]/50"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                        <span className="truncate">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">
                    Mesajınız *
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute right-3 top-2 text-xs font-medium text-gray-500">
                      {form.message.length}/150
                    </span>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      maxLength={150}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full resize-y rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2 pt-7 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                      placeholder="Mesajınız"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="shrink-0 cursor-pointer rounded-[8px] bg-[#0b7041] px-4 py-2 text-sm font-semibold text-white hover:bg-[#095530] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                  >
                    {submitting ? "Gönderiliyor..." : "Gönder"}
                  </button>
                  <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={kvkkAccepted}
                      onChange={(e) => setKvkkAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                    />
                    <span>
                      <a
                        href="/kvkk-kapsaminda-aydinlatma-metni/"
                        className="cursor-pointer text-[#0b7041] underline hover:no-underline"
                      >
                        KVKK
                      </a>{" "}
                      Aydınlatma Metni&apos;ni okudum ve kabul ediyorum. *
                    </span>
                  </label>
                </div>
                {submitMessage && <p className="text-sm text-[#0b7041]">{submitMessage}</p>}
                {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
