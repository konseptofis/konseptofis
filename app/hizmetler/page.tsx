import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ShieldCheckIcon,
  TrophyIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export const metadata = {
  title: "Hizmetlerimiz - Konsept Ofis",
  description:
    "Ankara Çankaya'da Konsept Ofis ayrıcalığıyla sanal ofis, toplantı ve makam odası kiralama hizmetlerimizi inceleyin. Profesyonel çözümlerle tanışın.",
};

const services: {
  id: string;
  titleWords: [string, string];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  image: string;
  description: string;
  href: string;
}[] = [
  {
    id: "sanal-ofis",
    titleWords: ["Sanal", "Ofis"],
    icon: BuildingOffice2Icon,
    image: "/ankara-sanal-ofis.webp",
    description:
      "Şirket kuruluşu için Ankara'da yasal iş adresi ve ticaret sicil kaydı temini. Stopajsız kiralama avantajı, kargo yönetimi ve prestijli şirket adresiyle maliyetlerinizi düşürün.",
    href: "/hizmetlerimiz/sanal-ofis-hizmeti",
  },
  {
    id: "makam-odasi",
    titleWords: ["Makam", "Odası"],
    icon: BuildingOffice2Icon,
    image: "/ankara-hazir-ofis.webp",
    description:
      "Ankara Çankaya'da prestijli bir iş ortamında, tam donanımlı makam odası çözümlerimizle profesyonel bir çalışma deneyimi yaşayın. Esnek kullanım ve güçlü kurumsal imaj avantajıyla işinize değer katın.",
    href: "/hizmetlerimiz/hazir-ofis-hizmeti",
  },
  {
    id: "toplanti-odasi",
    titleWords: ["Toplantı", "Odası"],
    icon: UserGroupIcon,
    image: "/ankara-toplanti-odasi-kiralama.webp",
    description:
      "Müşteri görüşmeleri ve profesyonel sunumlarınız için saatlik veya günlük kiralık toplantı salonları. Kesintisiz internet, teknik altyapı ve sürpriz maliyetsiz esnek rezervasyon imkânı.",
    href: "/hizmetlerimiz/toplanti-odasi-hizmeti",
  },
];

const features = [
  { icon: ShieldCheckIcon, line1: "Yasal ve Güvenilir", line2: "Altyapı" },
  { icon: TrophyIcon, line1: "+2 Yıllık", line2: "Kesintisiz Hizmet" },
  { icon: WalletIcon, line1: "Stopajsız Esnek", line2: "Paketler" },
  { icon: BuildingOffice2Icon, line1: "+1200 Mutlu", line2: "Girişimci" },
];

function ServiceCard({
  titleWords,
  icon: Icon,
  description,
  href,
  image,
}: {
  titleWords: [string, string];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  description: string;
  href: string;
  image?: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-md">
      <div className="relative h-[180px] w-full shrink-0 bg-[#f2f2f2] sm:h-[200px]">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-[#e8e8e8]"
              aria-hidden
            />
            <div
              className="absolute left-1/2 bottom-0 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-md"
              aria-hidden
            >
              <Icon className="h-7 w-7 text-[#0b7041]" aria-hidden />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-8 text-center">
        <h3 className="text-lg font-bold tracking-tight">
          <span className="text-[#0b7041]">{titleWords[0]} </span>
          <span className="text-black">{titleWords[1]}</span>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
        <Link
          href={href}
          className="mt-5 w-full rounded-[8px] bg-[#0b7041] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
        >
          DETAYLI İNCELE
        </Link>
      </div>
    </article>
  );
}

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Sanal Ofis",
        description:
          "Şirket kuruluşu için Ankara'da yasal iş adresi ve ticaret sicil kaydı temini.",
        provider: { "@type": "LocalBusiness", name: "Konsept Ofis" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Makam Odası",
        description:
          "Ankara Çankaya'da prestijli bir iş ortamında tam donanımlı makam odası çözümleri.",
        provider: { "@type": "LocalBusiness", name: "Konsept Ofis" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Toplantı Odası",
        description:
          "Müşteri görüşmeleri ve profesyonel sunumlarınız için saatlik veya günlük kiralık toplantı salonları.",
        provider: { "@type": "LocalBusiness", name: "Konsept Ofis" },
      },
    },
  ],
};

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <PageHeader
        title="Hizmetler"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Hizmetler" }]}
      />

      {/* Hizmetlerimiz */}
      <section
        className="px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="services-heading"
            className="mb-4 flex items-center gap-3 text-left text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
            Neler Sunuyoruz?
          </h2>
          <p className="mb-10 text-left text-gray-600">
            Ankara&apos;nın en prestijli lokasyonunda, işinize değer katacak esnek ve modern çalışma alanı çözümlerimizi keşfedin.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                titleWords={s.titleWords}
                icon={s.icon}
                description={s.description}
                href={s.href}
                image={s.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Neden Konsept Ofis */}
      <section
        className="bg-[#f9fafb] px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20"
        aria-labelledby="why-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[#0b7041] sm:text-base">
                <span className="h-6 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-7" aria-hidden />
                Neden Konsept Ofis?
              </p>
              <h2
                id="why-heading"
                className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                Ankara&apos;da Prestijli Hazır Ofis ve Yasal İş Adresi
              </h2>
              <p className="leading-relaxed text-gray-600">
                İster yeni bir şirket kuruluşu yapın, ister işinizi Ankara Çankaya&apos;nın merkezine taşıyın; stopajsız ve aidatsız kiralık çalışma alanlarımızla yanınızdayız. Girişimciler ve profesyoneller için sunduğumuz esnek sanal ofis paketleri, kargo yönetimi ve modern toplantı odası altyapımızla sermayenizi fiziki ofis giderlerine değil, doğrudan işinizi büyütmeye ayırın.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.line1}
                    className="flex items-center gap-4 rounded-lg border border-[#e5e5e5] bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                      <Icon className="h-8 w-8 text-[#0b7041]" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold leading-tight text-black">
                        {item.line1}
                      </p>
                      <p className="font-bold leading-tight text-black">
                        {item.line2}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Hemen Başlayın CTA */}
      <section
        className="bg-[#0b7041] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        aria-labelledby="hizmetler-cta-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="text-center lg:text-left">
            <h2
              id="hizmetler-cta-heading"
              className="text-2xl font-bold text-white sm:text-3xl"
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
