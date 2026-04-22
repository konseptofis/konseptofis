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
import { PRICING_FAQ_ITEMS } from "@/app/lib/data";
import { getPricingPlans } from "@/app/actions/pricing";

// \b "ı" karakterini kelime saymadığı için Toplantı ayrı: sonrasında boşluk veya satır sonu ile eşleşsin
const GREEN_WORDS_REGEX = /\b(Makam|sanal|Sanal|hazır|Hazır)\b|(toplantı|Toplantı|Toplanti|toplanti|TOPLANTI)(?=\s|$)/gi;

const GREEN_WORDS_SET = new Set([
  "Makam", "sanal", "Sanal", "hazır", "Hazır",
  "toplantı", "Toplantı", "Toplanti", "toplanti", "TOPLANTI",
]);

function highlightGreenTitle(title: string) {
  const parts = title.split(GREEN_WORDS_REGEX);
  return parts.map((part, i) => {
    if (part === undefined) return null;
    if (GREEN_WORDS_SET.has(part)) {
      return (
        <span key={i} className="text-[#0b7041]">
          {part}
        </span>
      );
    }
    return part;
  });
}

export const metadata = {
  title: "Fiyatlar ve Paketler",
  description:
    "Ankara Çankaya sanal ofis, hazır ofis ve toplantı odası kiralama fiyatlarımızı inceleyin. Stopajsız, aidatsız ve bütçenize en uygun esnek paketler.",
};

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pricingCards.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: plan.title,
        description: `${plan.title} hizmeti için Ankara Çankaya prestijli ofis paketi.`,
        offers: {
          "@type": "Offer",
          price: plan.price.toString().replace(/[^0-9]/g, ""),
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeader
        title="Fiyatlar"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Fiyatlar" }]}
      />
      <section
        className="px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="pricing-heading" className="sr-only">
            Fiyat listesi
          </h2>
          <h2 className="mb-4 flex items-center gap-3 text-left text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
            Ankara Sanal Ofis ve Hazır Ofis Fiyatları
          </h2>
          <p className="mb-10 text-left text-base text-gray-600">
            Ankara Çankaya&apos;da yasal iş adresi, stopajsız sanal ofis ve aidatsız hazır ofis çözümleriyle sürpriz maliyetlere son verin.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {pricingCards.map((card) => (
              <article
                key={card.id}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-md sm:p-10"
              >
                <h3 className="text-center text-lg font-semibold uppercase tracking-wide text-gray-900">
                  {highlightGreenTitle(card.title)}
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
        className="bg-[#f9fafb] px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20"
        aria-labelledby="standard-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-4">
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[#0b7041] sm:text-base">
              <span className="h-6 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-7" aria-hidden />
              KONSEPT OFİS AYRICALIKLARI
            </p>
            <h2
              id="standard-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Tüm Çalışma Alanlarımızda Standart Hizmetler
            </h2>
            <p className="mt-4 text-left text-base text-gray-600">
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
                  <h3 className="mt-4 font-bold text-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular */}
      <section
        className="bg-white px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="faq-heading"
            className="mb-4 flex items-center gap-3 text-left text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
            Sıkça Sorulan Sorular
          </h2>
          <p className="mb-10 text-left text-base text-gray-600">
            Ankara Çankaya&apos;daki sanal ofis ve hazır ofis çözümlerimiz hakkında aklınıza takılan tüm detayları, şeffaf hizmet anlayışımızla sizin için yanıtladık.
          </p>
          <div>
            <PricingFAQ />
          </div>
        </div>
      </section>

      {/* Hemen Başlayın CTA */}
      <section
        className="bg-[#0b7041] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
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
