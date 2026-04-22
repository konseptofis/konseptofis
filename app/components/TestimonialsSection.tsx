"use client";

import { SITE } from "@/app/lib/data";

type Props = { sectionClassName?: string };

const REVIEWS = [
  {
    initials: "AY",
    name: "Ahmet Yılmaz",
    role: "Sanal ofis kullanıcısı",
    text: "Konsept Ofis ile sanal ofis adresimizi bir günde aktive ettik. Kargolar için anlık bildirim alıyorum, toplantı odasını saatlik kullanıyorum. Şeffaf fiyat ve ilgili ekip için teşekkürler.",
  },
  {
    initials: "MD",
    name: "Mehmet Demir",
    role: "Yasal adres & sanal ofis",
    text: "Vergi levhası adresi olarak Konsept Ofis'i kullanıyoruz. Tebligat ve posta düzenli iletiliyor, adres doğrulamalarında ekip her zaman yanımızda oldu.",
  },
  {
    initials: "ZÖ",
    name: "Zeynep Özkan",
    role: "Toplantı odası kullanıcısı",
    text: "Toplantı odasını saatlik kiraladım: temiz, sessiz, projeksiyon hazırdı. Metro yakın, fiyat net. Kesinlikle tekrar tercih ederim.",
  },
  {
    initials: "SY",
    name: "Selin Yıldız",
    role: "Karma paket kullanıcısı",
    text: "Hem sanal ofis hem toplantı odası kullanıyorum. Fiyatlar net, resepsiyon hızlı dönüş yapıyor. Ankara'da ofis arayanlara gönül rahatlığıyla öneririm.",
  },
] as const;

const BORDER = "#e5e5e5";

function UserBlock({
  initials,
  name,
  role,
  layout,
}: {
  initials: string;
  name: string;
  role: string;
  layout: "card" | "card-wide";
}) {
  const rowClass =
    layout === "card-wide"
      ? "mt-5 flex border-t pt-4 md:mt-0 md:flex-row md:items-center md:border-t-0 md:border-l md:pl-5 md:pt-0"
      : "mt-5 flex border-t pt-4";

  return (
    <div className={rowClass} style={{ borderColor: BORDER }}>
      <div
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0b7041]/15 text-[13px] font-bold text-[#0b7041]"
        aria-hidden
      >
        {initials}
      </div>
      <div className="ml-2.5 min-w-0">
        <span itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name" className="text-[13px] font-bold text-gray-900">
            {name}
          </span>
        </span>
        <p className="mt-0.5 text-[11px] text-gray-500">{role}</p>
      </div>
    </div>
  );
}

function ReviewCardBody({ text, dense }: { text: string; dense?: boolean }) {
  return (
    <>
      <p
        className={`font-normal text-[#0b7041] ${dense ? "mb-1 text-base leading-none" : "mb-[14px] text-lg leading-none"}`}
        aria-hidden
      >
        {"❝"}
      </p>
      <p
        className={`text-[14px] font-normal italic leading-[1.7] text-gray-700 ${dense ? "line-clamp-2" : "line-clamp-4"}`}
      >
        {text}
      </p>
    </>
  );
}

export default function TestimonialsSection({
  sectionClassName = "bg-white",
}: Props) {
  const count = REVIEWS.length;

  return (
    <section
      id="yorumlar"
      aria-label="Müşteri Yorumları"
      className={`${sectionClassName} py-[60px] px-5 font-sans md:py-20 md:px-12`}
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-left">
            <span
              className="block text-[11px] font-semibold uppercase text-[#0b7041]"
              style={{ letterSpacing: "4px" }}
            >
              MÜŞTERİ YORUMLARI
            </span>
            <h2 className="mt-2 flex items-center gap-3 text-[32px] font-semibold tracking-tight text-black md:text-[36px]">
              <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
              Hakkımızda Ne Diyor?
            </h2>
          </div>
          <p className="shrink-0 text-[13px] text-gray-500 md:self-end">
            {"\u2605"} 5.0&nbsp;&nbsp;·&nbsp;&nbsp;{count} Değerlendirme
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((item, index) => {
            const isWide = index === 3;
            return (
              <article
                key={`${item.name}-${index}`}
                itemScope
                itemType="https://schema.org/Review"
                className={`group relative rounded-xl bg-white pt-7 pr-7 pb-6 pl-6 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 ease-out hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_28px_rgba(0,0,0,0.08)] ${isWide ? "md:col-span-3 md:mx-auto md:grid md:h-[150px] md:w-[min(100%,1199.98px)] md:grid-cols-[1fr_280px] md:items-center md:gap-5 md:overflow-hidden md:py-2 md:pr-5 md:pl-5" : ""}`}
              >
                <meta itemProp="reviewBody" content={item.text} />
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="sr-only">
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                </div>
                <div
                  itemProp="itemReviewed"
                  itemScope
                  itemType="https://schema.org/LocalBusiness"
                  className="sr-only"
                >
                  <meta itemProp="name" content={SITE.name} />
                  <meta itemProp="url" content={SITE.domain} />
                </div>

                {isWide ? (
                  <>
                    <div className="min-w-0 md:self-center">
                      <ReviewCardBody text={item.text} dense />
                    </div>
                    <div className="min-w-0 md:self-center">
                      <UserBlock initials={item.initials} name={item.name} role={item.role} layout="card-wide" />
                    </div>
                  </>
                ) : (
                  <>
                    <ReviewCardBody text={item.text} />
                    <UserBlock initials={item.initials} name={item.name} role={item.role} layout="card" />
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
