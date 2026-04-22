"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { DocumentTextIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

const slides = [
  {
    id: "sanal",
    title: "Ankara Sanal Ofis Hizmetleri",
    isH1: true,
    description:
      "İşinizi bir adım öteye taşıyın. Yasal iş adresi, hazır ofis ve toplantı odası çözümleriyle Ankara'da kurumsal adresiniz.",
  },
  {
    id: "hazir",
    title: "Hazır Ofis ile Profesyonel Çalışma Alanı",
    isH1: false,
    description:
      "Tam donanımlı ofis birimleri. Günlük veya aylık kiralama, Ankara Çankaya'da esnek çözümler.",
  },
  {
    id: "toplanti",
    title: "Toplantı Odası Kiralama",
    isH1: false,
    description:
      "Müşteri ve ekip toplantılarınız için saatlik rezervasyon. Gizli maliyet yok, net fiyat.",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-20 sm:-mt-28 px-3 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-[75px] lg:px-8 lg:pt-44"
      style={{
        backgroundImage: "url(/konsept-ofis-ankara-sanal-ofis.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#051a12]/75" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Slider içerik */}
        <div className="relative min-h-[320px] text-center sm:min-h-[360px] lg:min-h-[400px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="tabpanel"
              id={`hero-slide-${index}`}
              aria-labelledby={`hero-tab-${index}`}
              aria-hidden={index !== activeIndex}
              className={`absolute inset-0 flex flex-col items-center justify-center pt-14 pb-14 sm:pt-16 sm:pb-16 transition-opacity duration-300 ${
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.isH1 ? (
                <h1
                  id="hero-heading"
                  className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  {slide.title}
                </h1>
              ) : (
                <p
                  className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
                  aria-hidden
                >
                  {slide.title}
                </p>
              )}
              <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/90 mx-auto px-1">
                {slide.description}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#fiyatlar"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-[#0b7041] hover:bg-[#f2f2f2] transition-colors"
                >
                  <DocumentTextIcon className="h-5 w-5" aria-hidden />
                  Hemen Teklif Al
                </Link>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/80 bg-transparent px-6 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden />
                  WhatsApp&apos;tan Ulaşın
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Nokta göstergeleri */}
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Hero slaytları"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              id={`hero-tab-${index}`}
              aria-selected={index === activeIndex}
              aria-controls={`hero-slide-${index}`}
              onClick={() => goTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b7041] ${
                index === activeIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
