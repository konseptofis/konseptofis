"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MOBILE_BREAKPOINT = 768;

const testimonials = [
  {
    id: 1,
    name: "Ahmet",
    surname: "Yılmaz",
    image: null as string | null,
    comment:
      "Sanal ofis hizmeti sayesinde şirket adresimizi prestijli bir lokasyona taşıdık. Posta ve kargo kabulü, müşteri toplantıları için toplantı odası imkânı çok işimize yarıyor. Kesinlikle tavsiye ederim.",
  },
  {
    id: 2,
    name: "Elif",
    surname: "Kaya",
    image: null as string | null,
    comment:
      "Hazır ofis kiralama sürecinde Konsept Ofis ekibi çok ilgiliydi. Merkezi konum, hızlı internet ve sınırsız çay-kahve ile günlük çalışma ortamı ihtiyacımı karşılıyorum.",
  },
  {
    id: 3,
    name: "Mehmet",
    surname: "Demir",
    image: null as string | null,
    comment:
      "Vergi levhası adresi olarak kullandığımız sanal ofis hizmeti yasal süreçlerde hiç sorun çıkarmadı. Güvenilir ve profesyonel bir ekip. Ankara'da ofis arayanlara öneririm.",
  },
  {
    id: 4,
    name: "Zeynep",
    surname: "Özkan",
    image: null as string | null,
    comment:
      "Toplantı odasını saatlik kiraladım; temiz, sessiz ve donanımlıydı. Fiyatlar şeffaf, gizli maliyet yok. İş ortaklarımla görüşmek için artık hep bu adresi kullanıyorum.",
  },
  {
    id: 5,
    name: "Can",
    surname: "Arslan",
    image: null as string | null,
    comment:
      "Yeni kurduğum şirket için yasal adres ve posta hizmeti aldım. Süreç hızlı, iletişim net. Mahall Ankara konumu da ulaşım açısından çok iyi. Teşekkürler Konsept Ofis.",
  },
  {
    id: 6,
    name: "Selin",
    surname: "Yıldız",
    image: null as string | null,
    comment:
      "Hem sanal ofis hem toplantı odası kullanıyorum. Fiyatlar net, ekstra ücret yok. Ekip ilgili ve profesyonel. Ankara'da ofis çözümü arayan herkese öneriyorum.",
  },
];


function TestimonialCard({
  t,
}: {
  t: (typeof testimonials)[0];
}) {
  return (
    <article className="flex h-[280px] w-[280px] min-w-[260px] max-w-full shrink-0 flex-col rounded-xl border border-[#f2f2f2] bg-[#f2f2f2] p-4 shadow-sm sm:h-[300px] sm:w-[300px] sm:p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#f2f2f2] sm:h-14 sm:w-14">
          {t.image ? (
            <Image
              src={t.image}
              alt={`${t.name} ${t.surname}`}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-lg font-semibold text-[#0b7041]/70"
              aria-hidden
            >
              {t.name[0]}
              {t.surname[0]}
            </span>
          )}
        </div>
        <p className="truncate text-sm font-semibold text-[#0b7041] sm:text-base">
          {t.name} {t.surname}
        </p>
      </div>
      <p className="mt-3 flex-1 overflow-y-auto text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base">
        &ldquo;{t.comment}&rdquo;
      </p>
    </article>
  );
}

export default function TestimonialsSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const update = () => setCardsPerSlide(window.innerWidth < MOBILE_BREAKPOINT ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slideCount = Math.ceil(testimonials.length / cardsPerSlide);
  const safeSlideIndex = Math.min(slideIndex, Math.max(0, slideCount - 1));

  useEffect(() => {
    if (slideIndex > safeSlideIndex) setSlideIndex(safeSlideIndex);
  }, [slideCount, slideIndex, safeSlideIndex]);

  const prev = useCallback(() => {
    setSlideIndex((i) => (i === 0 ? slideCount - 1 : i - 1));
  }, [slideCount]);

  const next = useCallback(() => {
    setSlideIndex((i) => (i === slideCount - 1 ? 0 : i + 1));
  }, [slideCount]);

  return (
    <section
      id="yorumlar"
      aria-labelledby="testimonials-heading"
      className="bg-white px-4 py-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="testimonials-heading"
          className="flex items-center gap-3 text-left tracking-tight text-black"
        >
          <span className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12" aria-hidden />
          Üyelerimiz Hakkımızda Ne Diyor?
        </h2>

        <div className="relative mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Önceki yorumlar"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#f2f2f2] bg-white text-[#0b7041] shadow-md transition-colors hover:bg-[#f2f2f2] hover:border-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2 sm:h-12 sm:w-12"
          >
            <ChevronLeftIcon className="h-6 w-6" aria-hidden />
          </button>

          <div className="relative h-[300px] w-full max-w-[948px] overflow-hidden">
            {Array.from({ length: slideCount }).map((_, slideIdx) => {
              const start = slideIdx * cardsPerSlide;
              const cards = testimonials.slice(start, start + cardsPerSlide);
              return (
                <div
                  key={slideIdx}
                  role="tabpanel"
                  id={`testimonial-slide-${slideIdx}`}
                  aria-hidden={slideIdx !== safeSlideIndex}
                  className={`absolute inset-0 flex items-center justify-center gap-4 sm:gap-6 transition-opacity duration-300 ${slideIdx === safeSlideIndex ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"}`}
                >
                  {cards.map((t) => (
                    <TestimonialCard key={t.id} t={t} />
                  ))}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Sonraki yorumlar"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#f2f2f2] bg-white text-[#0b7041] shadow-md transition-colors hover:bg-[#f2f2f2] hover:border-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2 sm:h-12 sm:w-12"
          >
            <ChevronRightIcon className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div
          className="mt-6 flex justify-center gap-2"
          role="tablist"
          aria-label="Yorum slaytları"
        >
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === safeSlideIndex}
              aria-controls={`testimonial-slide-${i}`}
              onClick={() => setSlideIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2 ${
                i === safeSlideIndex ? "bg-[#0b7041] scale-125" : "bg-[#f2f2f2] hover:opacity-80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
