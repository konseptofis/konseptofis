import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/app/components/PageHeader";
import AccordionFAQ from "@/app/components/AccordionFAQ";
import { getServiceDetail } from "@/app/lib/hizmet-detay-data";

type Props = { params: Promise<{ slug: string }> };

export default async function HizmetDetayPage({ params }: Props) {
  const { slug } = await params;
  const data = getServiceDetail(slug);
  if (!data) notFound();

  const titleUpper = data.title.toUpperCase();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* 1. Hero - H1 */}
      <PageHeader title={titleUpper} breadcrumbs={data.breadcrumbs} />

      {/* 2. Kapsamlı Hizmet Tanıtımı - H2, bg-white */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="intro-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:items-start">
            <div className="min-w-0">
              <h2
                id="intro-heading"
                className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
              >
                {data.introTitle}
              </h2>
              <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                {data.introParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl">
              <div className="aspect-[4/3] w-full bg-[#f5f5f5]" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Kimler İçin Uygundur? - H2, bg-gray-50 */}
      <section
        className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="target-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="target-heading"
            className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            {data.targetTitle}
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {data.targetAudience.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-gray-600">{item.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Neden Bizi Seçmelisiniz? - H2, bg-white */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="why-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="why-heading"
            className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            Neden Bizi Seçmelisiniz?
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {data.features.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-white p-8"
                >
                  <Icon className="h-8 w-8 text-[#0b7041]" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Adım Adım İşleyiş - H2, bg-gray-50 */}
      <section
        className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="process-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="process-heading"
            className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            {data.processTitle}
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-12 grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-12">
            {data.processSteps.map((step, i) => (
              <div key={i}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b7041] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Kapsamlı Paket İçeriği - H2, bg-white */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="package-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <div>
              <h2
                id="package-heading"
                className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
              >
                {data.packageTitle}
              </h2>
              <div className="mt-8 space-y-6 leading-relaxed text-gray-600">
                {data.packageIntroParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
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
          </div>
        </div>
      </section>

      {/* 7. Müşteri Deneyimleri - H2, bg-gray-50 */}
      <section
        className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="testimonials-heading"
            className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            {data.testimonialsTitle}
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-xl border border-gray-200 bg-white p-8"
              >
                <p className="italic leading-relaxed text-gray-700">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 text-sm font-semibold text-gray-900">
                  {t.name} — {t.title}, {t.company}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Sıkça Sorulan Sorular - bg-white */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="faq-heading"
            className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            Sıkça Sorulan Sorular
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-12">
            <AccordionFAQ items={data.faq} idPrefix={`service-${data.slug}-faq`} />
          </div>
        </div>
      </section>

      {/* 9. Kapanış CTA */}
      <section
        className="bg-[#0b7041] px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            Ofisinizi Hemen Kurmaya Hazır mısınız?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            İhtiyaçlarınıza uygun paketi birlikte belirleyelim. Uzman ekibimiz size
            dönüş yapsın, detaylı teklif alın.
          </p>
          <Link
            href="/iletisim"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#0b7041] transition-colors hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b7041]"
          >
            Hemen Teklif Al
          </Link>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { slug: "sanal-ofis" },
    { slug: "hazir-ofis" },
    { slug: "toplanti-odasi" },
  ];
}
