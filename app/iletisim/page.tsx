"use client";

import { useState, useCallback, useEffect } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowPathIcon,
  BuildingOffice2Icon,
  ComputerDesktopIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";
import PageHeader from "@/app/components/PageHeader";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function IletisimPage() {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [service, setService] = useState<"hazir" | "sanal" | "toplanti" | "">("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) return;
    if (captchaInput.toUpperCase().replace(/\s/g, "") !== captcha) {
      alert("Güvenlik kodu hatalı. Lütfen tekrar deneyin.");
      refreshCaptcha();
      return;
    }
    // TODO: API veya e-posta gönderimi
    alert("Mesajınız alındı. En kısa sürede size dönüş yapacağız.");
    setForm({ name: "", email: "", phone: "", location: "", message: "" });
    setCaptchaInput("");
    refreshCaptcha();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="İLETİŞİM"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "İletişim" }]}
      />

      {/* Ana içerik - pattern arka plan */}
      <section
        className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="contact-content-heading"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h80M40 0v80' stroke='%230b7041' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <h2 id="contact-content-heading" className="sr-only">
            İletişim bilgileri ve form
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Sol: BİZE ULAŞIN */}
            <div className="space-y-6">
              <div className="border-b-2 border-[#0b7041] pb-2">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-black">
                  Bize Ulaşın
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Hazır Ofis, Sanal Ofis ve Toplantı Odası çözümlerimiz ile ilgili
                detaylı bilgi için bizi dilediğiniz zaman arayabilirsiniz. Sizleri
                bir çay içmeye ofislerimize her zaman bekleriz.
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${SITE.phoneRaw.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-[#0b7041]"
                  >
                    <PhoneIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
                    <span>{SITE.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-[#0b7041]"
                  >
                    <EnvelopeIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
                    <span>{SITE.email}</span>
                  </a>
                </li>
              </ul>
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-[#0b7041] mt-0.5" aria-hidden />
                    <span className="text-sm leading-relaxed">
                      {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}
                    </span>
                  </div>
                  <a
                    href={SITE.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#0b7041] px-4 py-3 text-sm font-semibold text-white hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                  >
                    Google&apos;da Yol Tarifi Almak İçin Tıklayınız
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ: İLETİŞİM FORMU */}
            <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm sm:p-8">
              <div className="border-b-2 border-[#0b7041] pb-2">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-black">
                  İletişim Formu
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-700">
                    Ad Soyad
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">
                    E-Posta
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="E-Posta"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="Telefon"
                  />
                </div>
                <div>
                  <label htmlFor="contact-location" className="mb-1 block text-sm font-medium text-gray-700">
                    Lokasyon Seçimi
                  </label>
                  <select
                    id="contact-location"
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                  >
                    <option value="">Lokasyon seçin</option>
                    <option value="ankara-mahall">Ankara - Mahall Ankara, Çankaya</option>
                  </select>
                </div>
                <div>
                  <span className="mb-2 block text-xs font-medium text-gray-600">
                    İlgilendiğiniz Hizmeti Seçin
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "hazir", label: "Hazır Ofis", icon: BuildingOffice2Icon },
                      { id: "sanal", label: "Sanal Ofis", icon: ComputerDesktopIcon },
                      { id: "toplanti", label: "Toplantı Odası", icon: UserGroupIcon },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setService(service === id ? "" : (id as typeof service))}
                        className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                          service === id
                            ? "border-[#0b7041] bg-[#0b7041]/10 text-[#0b7041]"
                            : "border-[#e5e5e5] bg-white text-gray-700 hover:border-[#0b7041]/50"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" aria-hidden />
                        {label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">
                    Mesajınız
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full resize-y rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                    placeholder="MESAJINIZ"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-3">
                    <div
                      className="flex h-12 min-w-[100px] items-center justify-center rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] text-lg font-bold tracking-widest text-gray-700 select-none"
                      aria-hidden
                    >
                      {captcha || "—"}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="rounded-lg border border-[#e5e5e5] p-2 text-gray-600 hover:bg-[#f2f2f2] hover:text-[#0b7041] focus:outline-none focus:ring-2 focus:ring-[#0b7041]"
                      aria-label="Güvenlik kodunu yenile"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="contact-captcha" className="mb-1 block text-xs font-medium text-gray-600">
                      Güvenlik Kodu
                    </label>
                    <input
                      id="contact-captcha"
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                      maxLength={5}
                      className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 font-mono text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                      placeholder="Kodu girin"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#0b7041] px-6 py-3 font-semibold text-white hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                  >
                    Sizi Arayalım
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
