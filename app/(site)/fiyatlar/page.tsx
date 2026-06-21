import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckIcon,
  SunIcon,
  SignalIcon,
  SparklesIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import PageHeader from "@/app/components/PageHeader";
import PricingFAQ from "@/app/components/PricingFAQ";
import SectionHeading from "@/app/components/SectionHeading";
import { PRICING_FAQ_ITEMS } from "@/app/lib/data";
import { getPricingPlans } from "@/app/actions/pricing";
import FiyatlarJsonLd from "@/app/components/seo/FiyatlarJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Sanal Ofis ve Hazır Ofis Fiyatları 2026 | Konsept Ofis" },
  description:
    "Ankara sanal ofis, makam odası ve toplantı odası kiralama fiyatlarımızı inceleyin. Sürpriz fatura, aidat ve stopaj olmadan esnek ofis paketleri.",
  alternates: { canonical: "/fiyatlar" },
};

export const revalidate = 300;

const ZEBRA_GREEN = "bg-[rgb(11_112_65_/_0.045)]";
const ZEBRA_WHITE = "bg-white";

/** Fiyat kartı başlığına göre ilgili hizmet detay sayfası */
function getPricingDetailHref(title: string): string | null {
  const normalized = title.toUpperCase();
  if (normalized.includes("SANAL")) return "/hizmetlerimiz/cankaya-sanal-ofis";
  if (normalized.includes("MAKAM")) return "/hizmetlerimiz/makam-odasi-kiralama";
  if (normalized.includes("TOPLANTI")) return "/hizmetlerimiz/toplanti-odasi-kiralama";
  return null;
}

const STANDARD_ITEMS = [
  {
    icon: SunIcon,
    title: "Sınırsız Çay & Kahve",
    description:
      "Gün boyu taze demlenmiş çay, kahve ve sıcak ikramlarımızla enerjinizi hep yüksek tutun.",
  },
  {
    icon: SignalIcon,
    title: "Yüksek Hızlı Fiber İnternet",
    description:
      "Kesintisiz ve güvenli fiber altyapımızla işlerinizi hız kesmeden, verimli bir şekilde sürdürün.",
  },
  {
    icon: SparklesIcon,
    title: "Düzenli Ofis Temizliği",
    description:
      "Hijyenik, ferah ve her zaman profesyonel görünen bir çalışma ortamı için periyodik günlük temizlik.",
  },
  {
    icon: HandRaisedIcon,
    title: "Profesyonel Misafir Karşılama",
    description:
      "Misafirleriniz, müşterileriniz ve kargolarınız güler yüzlü ekibimiz tarafından adınıza özenle karşılanır.",
  },
];

export default async function FiyatlarPage() {
  const pricingCards = await getPricingPlans();

  return (
    <>
      <FiyatlarJsonLd />
      <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="Fiyatlar"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Fiyatlar" }]}
      />
      <section
        className={`${ZEBRA_WHITE} px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12`}
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="pricing-heading" className="mb-4">
            Ankara Sanal Ofis ve Hazır Ofis Fiyatları
          </SectionHeading>
          <p className="mb-10 text-left text-[16px] leading-relaxed text-gray-600">
            Ankara Çankaya&apos;da yasal iş adresi, stopajsız sanal ofis ve aidatsız hazır ofis çözümleriyle sürpriz maliyetlere son verin.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {pricingCards.map((card) => {
              const detailHref = getPricingDetailHref(card.title);
              return (
              <article
                key={card.id}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-md sm:p-10"
              >
                <h3 className="text-center text-[17px] font-semibold uppercase tracking-wide text-gray-900">
                  {card.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-baseline justify-center gap-1.5">
                  <span className="text-4xl font-bold text-gray-900">
                    ₺{card.price}
                  </span>
                  <span className="text-sm text-gray-500">/{card.period}</span>
                  <span className="text-sm text-gray-500">{card.kdv}</span>
                </div>
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
                      <span className="text-[14px] leading-snug text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="/iletisim"
                    className="block w-full rounded-lg bg-[#0b7041] py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                  >
                    İletişime Geç
                  </Link>
                  {detailHref && (
                    <Link
                      href={detailHref}
                      className="text-center text-sm font-medium text-[#0b7041] transition-colors hover:underline"
                    >
                      Detaylı bilgi →
                    </Link>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tüm Paketlerde Standart — zebra: yeşilimsi */}
      <section
        className={`${ZEBRA_GREEN} px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20`}
        aria-labelledby="standard-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-4">
            <p className="mb-1 text-[11px] font-medium tracking-[0.1em] text-[var(--color-green)]">
              KONSEPT OFİS AYRICALIKLARI
            </p>
            <SectionHeading id="standard-heading" className="mt-2">
              Tüm Çalışma Alanlarımızda Standart Hizmetler
            </SectionHeading>
            <p className="mt-4 text-left text-[16px] leading-relaxed text-gray-600">
              Hangi ofis paketini seçerseniz seçin; işinize değer katan ve gününüzü kolaylaştıran bu ayrıcalıklara hiçbir ek ücret ödemeden sahip olursunuz.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {STANDARD_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-lg border border-[#e5e5e5] bg-white p-6 text-center shadow-sm"
                >
                  <Icon className="h-12 w-12 shrink-0 text-[#0b7041]" aria-hidden />
                  <h3 className="mt-4 text-[17px] font-medium text-black">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular — zebra: beyaz */}
      <section
        className={`${ZEBRA_WHITE} px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20`}
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="faq-heading" className="mb-4">
            Sıkça Sorulan Sorular
          </SectionHeading>
          <p className="mb-10 text-left text-[16px] leading-relaxed text-gray-600">
            Ankara Çankaya&apos;daki sanal ofis ve hazır ofis çözümlerimiz hakkında aklınıza takılan tüm detayları, şeffaf hizmet anlayışımızla sizin için yanıtladık.
          </p>
          <div>
            <PricingFAQ />
          </div>
        </div>
      </section>

      {/* Hemen Başlayın CTA */}
      <section
        className="bg-[#0b7041] px-4 py-[28px] sm:px-6 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="text-center lg:text-left">
            <h2
              id="cta-heading"
              className="text-[30px] font-bold text-white"
            >
              Hangi paketin size uygun olduğuna karar veremediniz mi?
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-white/90">
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
    </>
  );
}
