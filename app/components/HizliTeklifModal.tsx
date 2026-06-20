"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CONTACT_SOURCE_QUICK_QUOTE,
  isValidPhone,
  QUICK_QUOTE_SERVICES,
} from "@/lib/contact-utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

const inputClass =
  "w-full rounded-[8px] border border-[#e5e5e5] bg-white px-3 py-2.5 text-[16px] text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]";

export default function HizliTeklifModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    setName("");
    setPhone("");
    setService("");
    setKvkkAccepted(false);
    setSubmitting(false);
    setError(null);
    setSuccess(false);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError("Lütfen isminizi girin.");
      return;
    }
    if (!trimmedPhone) {
      setError("Lütfen telefon numaranızı girin.");
      return;
    }
    if (!isValidPhone(trimmedPhone)) {
      setError("Geçerli bir telefon numarası girin (en az 10 rakam).");
      return;
    }
    if (!kvkkAccepted) {
      setError("Devam edebilmek için KVKK Aydınlatma Metni'ni kabul etmeniz gerekmektedir.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          service,
          message: "Hızlı teklif talebi.",
          source: CONTACT_SOURCE_QUICK_QUOTE,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Talep gönderilemedi.");

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Talep gönderilirken hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teklif-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:max-w-md sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="teklif-modal-title" className="text-xl font-semibold text-gray-900">
            Hızlı teklif al
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Kapat"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="mt-5">
            <p className="text-[16px] leading-relaxed text-gray-700">
              Talebiniz alındı, en kısa sürede arayacağız.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full cursor-pointer rounded-lg bg-[#0b7041] py-3 text-sm font-semibold text-white hover:bg-[#095530]"
            >
              Kapat
            </button>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-gray-600">
              Telefonunuzu bırakın, size en uygun paketi birlikte belirleyelim.
            </p>
            <form onSubmit={(e) => void handleSubmit(e)} className="mt-5 space-y-4">
              <div>
                <label htmlFor="teklif-name" className="mb-1 block text-sm font-medium text-gray-700">
                  İsim *
                </label>
                <input
                  id="teklif-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label htmlFor="teklif-phone" className="mb-1 block text-sm font-medium text-gray-700">
                  Telefon *
                </label>
                <input
                  id="teklif-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="0 (5xx) xxx xx xx"
                />
              </div>
              <div>
                <label htmlFor="teklif-service" className="mb-1 block text-sm font-medium text-gray-700">
                  İlgilendiğiniz hizmet
                </label>
                <select
                  id="teklif-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seçiniz (opsiyonel)</option>
                  {QUICK_QUOTE_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug text-gray-700">
                <input
                  type="checkbox"
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#e5e5e5] text-[#0b7041] focus:ring-[#0b7041]"
                />
                <span>
                  <Link
                    href="/kvkk-kapsaminda-aydinlatma-metni/"
                    className="text-[#0b7041] underline hover:no-underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    KVKK
                  </Link>{" "}
                  Aydınlatma Metni&apos;ni okudum ve kabul ediyorum. *
                </span>
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-lg bg-[#0b7041] py-3 text-sm font-semibold text-white hover:bg-[#095530] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
              >
                {submitting ? "Gönderiliyor…" : "Teklif İste"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
