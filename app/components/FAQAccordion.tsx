"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FAQ_ITEMS, SITE } from "@/app/lib/data";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Merhaba, ben ${name.trim() || "ziyaretçi"}. Lütfen beni arayın: ${phone.trim()}`
    );
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="sss"
      aria-labelledby="faq-heading"
      className="bg-[#f2f2f2] px-4 py-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="faq-heading" className="mb-8 flex items-center gap-3 text-left tracking-tight text-black">
          <span className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12" aria-hidden />
          Sıkça Sorulan Sorular
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
        <ul className="space-y-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={index}>
                <article className={`rounded-lg overflow-hidden border transition-colors ${isOpen ? "border-[#0b7041]/40 bg-[#f8faf8] shadow-sm" : "border-[#e5e5e5] bg-white"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 py-4 px-5 text-left font-bold text-black transition-colors ${isOpen ? "bg-[#f0f5f0]" : "hover:bg-[#f5f5f5]"}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUpIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                    )}
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    hidden={!isOpen}
                    className="border-t border-[#e5e5e5] bg-white"
                  >
                    <div className="py-4 px-5 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
          </div>

          <div className="self-start rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
            <h3 className="text-black">Sorunuza Cevap Bulamadınız mı?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Adınızı ve telefon numaranızı bırakın, size en kısa sürede dönüş yapalım.
            </p>
            <form onSubmit={handleCallSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="callback-name" className="block text-sm font-medium text-gray-700">
                  Ad Soyad
                </label>
                <input
                  id="callback-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                  placeholder="Adınız soyadınız"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="callback-phone" className="block text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  id="callback-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                  placeholder="0 (5XX) XXX XX XX"
                  autoComplete="tel"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b7041] px-4 py-3 font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden />
                Sizi Arayalım
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
