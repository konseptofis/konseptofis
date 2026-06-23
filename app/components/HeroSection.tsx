"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DocumentTextIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";
import { openHizliTeklifModal } from "@/app/lib/open-hizli-teklif-modal";

type HeroSlide = {
  id: string;
  title: string;
  isH1: boolean;
  description: string;
  /** Tanımsızsa: Hemen Teklif Al → hızlı teklif modalı. */
  primaryCta?: { label: string; href?: string; openModal?: boolean };
};

const slides: readonly HeroSlide[] = [
  {
    id: "sanal",
    title: "Ankara Sanal Ofis Hizmetleri",
    isH1: true,
    description:
      "İşinizi bir adım öteye taşıyın. Yasal iş adresi, hazır ofis ve toplantı odası çözümleriyle Ankara'da kurumsal adresiniz.",
  },
  {
    id: "makam",
    title: "Ankara Makam Odası Kiralama Çözümleri",
    isH1: false,
    description:
      "Sizi en üst düzeyde temsil edecek, stopajsız ve esnek süreli tam donanımlı makam odası.",
    primaryCta: {
      label: "İnceleyin",
      href: "/hizmetlerimiz/makam-odasi-kiralama",
    },
  },
  {
    id: "toplanti",
    title: "Ankara Toplantı Odası Kiralama Çözümleri",
    isH1: false,
    description:
      "Ankara'da müşteri ve ekip görüşmeleriniz için tam donanımlı, saatlik toplantı odası kiralama hizmeti. Sürpriz masraflardan uzak, şeffaf fiyatlandırma ile profesyonel çalışma alanınızı hemen rezerve edin.",
    primaryCta: {
      label: "İnceleyin",
      href: "/hizmetlerimiz/toplanti-odasi-kiralama",
    },
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
      className="relative -mt-20 overflow-hidden sm:-mt-28 px-3 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-[75px] lg:px-8 lg:pt-44"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 scale-[1.02] blur-[2px]">
          <Image
            src="/ankara-sanal-ofis.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
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
                  className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl"
                >
                  {slide.title}
                </h1>
              ) : (
                <p
                  className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl"
                  aria-hidden
                >
                  {slide.title}
                </p>
              )}
              <p className="mt-4 sm:mt-6 max-w-2xl text-[16px] leading-relaxed text-white/90 mx-auto px-1">
                {slide.description}
              </p>
              <div className="mt-10 flex w-full max-w-md flex-row justify-center gap-2 sm:max-w-xl sm:gap-4">
                {slide.primaryCta?.href && !slide.primaryCta.openModal ? (
                  <Link
                    href={slide.primaryCta.href}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2.5 text-center text-[13px] font-semibold text-[#0b7041] transition-colors hover:bg-[#f2f2f2] sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
                  >
                    <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    {slide.primaryCta.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={openHizliTeklifModal}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2.5 text-center text-[13px] font-semibold text-[#0b7041] transition-colors hover:bg-[#f2f2f2] sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
                  >
                    <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    {slide.primaryCta?.label ?? "Hemen Teklif Al"}
                  </button>
                )}
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/80 bg-transparent px-2 py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-white/10 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                  İletişime Geç
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
