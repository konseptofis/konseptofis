import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/app/components/PageHeader";
import SectionHeading from "@/app/components/SectionHeading";
import AccordionFAQ from "@/app/components/AccordionFAQ";
import IntroImageSlider from "@/app/components/IntroImageSlider";
import MapAndContact from "@/app/components/MapAndContact";
import { getServiceDetail } from "@/app/lib/hizmet-detay-data";

type Props = { params: Promise<{ slug: string }> };

/** Anasayfa ile aynı zebra arka planları */
const ZEBRA_GREEN = "bg-[rgb(11_112_65_/_0.045)]";
const ZEBRA_WHITE = "bg-white";

const SECTION_PAD = "px-4 py-20 font-sans sm:px-6 lg:px-8";

const BODY_P =
  "text-[17px] leading-relaxed text-[var(--color-text-muted)]";

/** H2 içinde `accent` ile birebir eşleşen alt dizeyi marka yeşiliyle gösterir. */
function headingWithAccent(title: string, accent: string | undefined) {
  if (!accent) return title;
  const i = title.indexOf(accent);
  if (i === -1) return title;
  return (
    <>
      {title.slice(0, i)}
      <span className="text-[var(--color-green)]">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

export default async function HizmetDetayPage({ params }: Props) {
  const { slug } = await params;
  const data = getServiceDetail(slug);
  if (!data) notFound();

  const titleUpper = data.title.toLocaleUpperCase("tr-TR");
  /** Tüm hizmet sayfalarında Sanal Ofis ile aynı zebra sırası */
  const packageSectionBg = ZEBRA_GREEN;
  const mapSectionBg = ZEBRA_WHITE;
  const faqSectionBg = ZEBRA_GREEN;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* 1. Hero - H1 */}
      <PageHeader title={titleUpper} breadcrumbs={data.breadcrumbs} />

      {/* 2. Kapsamlı Hizmet Tanıtımı — anasayfa zebra: beyaz */}
      <section
        className={`${ZEBRA_WHITE} ${SECTION_PAD}`}
        aria-labelledby="intro-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <div className="min-w-0">
              <SectionHeading id="intro-heading" className="mb-4">
                {data.introTitle}
              </SectionHeading>
              <div className={`mt-2 space-y-4 ${BODY_P}`}>
                {data.introParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {data.introCtas && data.introCtas.length > 0 ? (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {data.introCtas.map((cta, ctaIndex, ctaArr) => (
                    <Link
                      key={cta.href + cta.label}
                      href={cta.href}
                      className={
                        ctaIndex === ctaArr.length - 1
                          ? "inline-flex items-center justify-center rounded-full bg-[var(--color-green)] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#095c37]"
                          : "inline-flex items-center justify-center rounded-full border border-[var(--color-green)] bg-white px-6 py-3 text-center text-sm font-semibold text-[var(--color-green)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_8%,#ffffff)]"
                      }
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {data.introFeatures && data.introFeatures.length > 0 ? (
              <ul
                className="flex list-none flex-col divide-y divide-[var(--color-border-tertiary)]"
                aria-label="Öne çıkan özellikler"
              >
                {data.introFeatures.map((item) => (
                  <li
                    key={item.num}
                    className="flex gap-4 py-7 first:pt-0 sm:gap-5 sm:py-8 lg:py-9"
                  >
                    <span
                      className="w-14 shrink-0 text-left text-3xl font-bold leading-none tracking-tight text-[var(--color-green)] tabular-nums sm:w-16 sm:text-4xl lg:text-5xl"
                      aria-hidden
                    >
                      {item.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium tracking-tight text-[var(--foreground)] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className={`mt-2 ${BODY_P}`}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="overflow-hidden rounded-xl">
                <div className="aspect-[4/3] w-full bg-[#f5f5f5]" aria-hidden />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Kimler İçin — anasayfa zebra: yeşilimsi */}
      <section
        className={`${ZEBRA_GREEN} ${SECTION_PAD}`}
        aria-labelledby="target-heading"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="target-heading" className="mb-4">
            {headingWithAccent(data.targetTitle, data.targetHeadingAccent)}
          </SectionHeading>
          {data.targetAudience.every((t) => t.icon) ? (
            <div className="mt-8 grid grid-cols-1 gap-6 auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
              {data.targetAudience.map((item) => {
                const Icon = item.icon!;
                return (
                  <article
                    key={item.title}
                    className="group flex h-full flex-col items-center gap-2 rounded-[14px] border border-[#e8eaed] bg-white px-2 py-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] md:flex-row md:items-start md:gap-5 md:px-6 md:py-7 md:text-left"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0b7041]/[0.08] md:h-12 md:w-12"
                      aria-hidden
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0 text-[#0b7041] md:h-[22px] md:w-[22px]" />
                    </div>
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                      <h3 className="mb-1 text-[10px] font-medium leading-tight tracking-tight text-black md:mb-2 md:text-[15px] md:tracking-tight">
                        {item.title}
                      </h3>
                      <p className="m-0 flex-1 text-[10px] leading-snug text-gray-600 line-clamp-4 md:text-[14px] md:leading-[1.65] md:line-clamp-none">
                        {item.paragraph}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {data.targetAudience.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className={`mt-4 ${BODY_P}`}>{item.paragraph}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Neden bizi seçmelisiniz / Mahall odak blok */}
      {data.mahallSpotlightBlock ? (
        <section
          className={`${ZEBRA_WHITE} ${SECTION_PAD}`}
          aria-labelledby="mahall-spotlight-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-14 lg:items-stretch">
              <div className="flex min-w-0 flex-col">
                <SectionHeading id="mahall-spotlight-heading" className="mb-4">
                  {data.mahallSpotlightBlock.leftTitle}
                </SectionHeading>
                <div className={`mt-2 space-y-4 ${BODY_P}`}>
                  {data.mahallSpotlightBlock.leftParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col lg:h-auto">
                <IntroImageSlider
                  images={data.mahallSpotlightBlock.sliderImages}
                  className="lg:flex-1"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`${ZEBRA_WHITE} ${SECTION_PAD}`}
          aria-labelledby="why-heading"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading id="why-heading" className="mb-4">
              Neden Bizi Seçmelisiniz?
            </SectionHeading>
            <div className="mt-8 grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {data.features.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                  >
                    <Icon
                      className="h-11 w-11 shrink-0 text-[var(--color-green)] sm:h-12 sm:w-12"
                      aria-hidden
                    />
                    <h3 className="mt-5 text-lg font-medium tracking-tight text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className={`mt-3 flex-1 ${BODY_P}`}>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Adım adım işleyiş — adım yoksa (ör. sanal ofis) bölüm gösterilmez */}
      {data.processSteps.length > 0 ? (
        <section
          className={`${ZEBRA_GREEN} ${SECTION_PAD}`}
          aria-labelledby="process-heading"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading id="process-heading" className="mb-4">
              {data.processTitle}
            </SectionHeading>
            <div className="mt-8 grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
              {data.processSteps.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b7041] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                  </div>
                  <p className={`mt-4 ${BODY_P}`}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 6. Paket — zebra: süreç varsa beyaz, yoksa yeşilimsi */}
      <section
        className={`${packageSectionBg} ${SECTION_PAD}`}
        aria-labelledby="package-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-stretch">
            <div className="flex min-h-0 min-w-0 max-w-xl flex-col justify-center lg:max-w-2xl">
              <SectionHeading id="package-heading" className="mb-4">
                {headingWithAccent(data.packageTitle, data.packageHeadingAccent)}
              </SectionHeading>
              <div
                className={
                  data.packageFeatureCards && data.packageFeatureCards.length > 0
                    ? `mt-2 space-y-4 leading-[1.85] ${BODY_P}`
                    : `mt-2 space-y-4 ${BODY_P}`
                }
              >
                {data.packageIntroParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {data.packageCta ? (
                <Link
                  href={data.packageCta.href}
                  className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-green)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#095c37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]"
                >
                  {data.packageCta.label}
                </Link>
              ) : null}
            </div>
            {data.packageFeatureCards && data.packageFeatureCards.length > 0 ? (
              <div className="min-w-0 rounded-3xl border border-gray-100 bg-slate-50 p-5 sm:p-6">
                <ul className="list-none divide-y divide-gray-200" role="list">
                  {data.packageFeatureCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <li
                        key={card.title}
                        className="flex gap-4 py-4 first:pt-0 last:pb-0 sm:gap-5 sm:py-5"
                      >
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700"
                          aria-hidden
                        >
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <h3 className="text-[18px] font-medium leading-snug tracking-tight text-gray-900">
                            {card.title}
                          </h3>
                          <p className="mt-1 text-[16px] leading-relaxed text-[var(--color-text-muted)]">
                            {card.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <ul className="space-y-4">
                {data.packageListItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-left text-gray-600">
                    <CheckIcon
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#0b7041]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* 7. Bize Ulaşın — anasayfa MapAndContact + zebra */}
      <MapAndContact sectionClassName={mapSectionBg} />

      {/* 8. SSS — anasayfa zebra devamı */}
      <section
        className={`${faqSectionBg} ${SECTION_PAD}`}
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="faq-heading" className="mb-4">
            Sıkça Sorulan Sorular
          </SectionHeading>
          <div className="mt-8">
            <AccordionFAQ items={data.faq} idPrefix={`service-${data.slug}-faq`} />
          </div>
        </div>
      </section>

      {/* 9. CTA — hizmetler listesi sayfası ile aynı */}
      <section
        className="bg-[#0b7041] px-4 py-[28px] sm:px-6 lg:px-8"
        aria-labelledby="service-paket-cta-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="text-center lg:text-left">
            <h2
              id="service-paket-cta-heading"
              className="text-[30px] font-bold text-white"
            >
              Hangi paketin size uygun olduğuna karar veremediniz mi?
            </h2>
            <p className="mt-3 text-white/90">
              Hizmetlerimiz hakkında detaylı bilgi için iletişime geçin.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 rounded-lg bg-white px-8 py-4 text-center font-bold text-[#0b7041] transition-colors hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b7041]"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { slug: "sanal-ofis-hizmeti" },
    { slug: "hazir-ofis-hizmeti" },
    { slug: "toplanti-odasi-hizmeti" },
  ];
}
