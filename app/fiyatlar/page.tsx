import Link from "next/link";
import {
  CheckIcon,
  SunIcon,
  SignalIcon,
  SparklesIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import PageHeader from "@/app/components/PageHeader";
import PricingFAQ from "@/app/components/PricingFAQ";
import { getPricingPlans } from "@/app/actions/pricing";

const STANDARD_ITEMS = [
  { icon: SunIcon, title: "Sınırsız Çay & Kahve" },
  { icon: SignalIcon, title: "Yüksek Hızlı İnternet" },
  { icon: SparklesIcon, title: "Günlük Temizlik" },
  { icon: HandRaisedIcon, title: "Profesyonel Karşılama" },
];

export default async function FiyatlarPage() {
  const pricingCards = await getPricingPlans();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="FİYATLAR"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Fiyatlar" }]}
      />
      <section
        className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2 id="pricing-heading" className="sr-only">
            Fiyat listesi
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {pricingCards.map((card) => (
              <article
                key={card.id}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-md sm:p-10"
              >
                <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
                  {card.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-gray-900">
                    ₺{card.price}
                  </span>
                  <span className="text-sm text-gray-500">/{card.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">{card.kdv}</p>
                <div className="my-6 border-b border-gray-100" aria-hidden />
                <ul className="flex-1 space-y-4">
                  {(card.features ?? []).map((feature, idx) => (
                    <li
                      key={`${card.id}-${idx}`}
                      className="flex items-start gap-3 text-left"
                    >
                      <CheckIcon
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#0b7041]"
                        aria-hidden
                      />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/iletisim"
                  className="mt-8 block w-full rounded-lg bg-[#0b7041] py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                >
                  İletişime Geç
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tüm Paketlerde Standart */}
      <section
        className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="standard-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="standard-heading"
            className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            TÜM PAKETLERİMİZDE STANDART
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {STANDARD_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-lg border border-[#e5e5e5] bg-white p-6 text-center shadow-sm"
                >
                  <Icon className="h-12 w-12 text-[#0b7041]" aria-hidden />
                  <h3 className="mt-4 font-bold text-black">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="faq-heading"
            className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            SIKÇA SORULAN SORULAR
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-10">
            <PricingFAQ />
          </div>
        </div>
      </section>

      {/* Hemen Başlayın CTA */}
      <section
        className="bg-[#0b7041] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="text-center lg:text-left">
            <h2
              id="cta-heading"
              className="text-2xl font-bold text-white sm:text-3xl"
            >
              Hangi paketin size uygun olduğuna karar veremediniz mi?
            </h2>
            <p className="mt-3 text-white/90">
              İhtiyaçlarınıza en uygun çözümü bulmak için uzman ekibimizle hemen görüşün.
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
