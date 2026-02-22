import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";
import {
  BuildingOffice2Icon,
  BriefcaseIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  TrophyIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

const services = [
  {
    id: "hazir-ofis",
    titleWords: ["HAZIR", "OFİS"],
    icon: BriefcaseIcon,
    description:
      "Tam donanımlı hazır ofis birimleri. Ankara Çankaya'da günlük veya aylık esnek kiralama.",
    href: "/hizmetler/hazir-ofis",
  },
  {
    id: "sanal-ofis",
    titleWords: ["SANAL", "OFİS"],
    icon: BuildingOffice2Icon,
    description:
      "Ankara'da vergi levhası ve ticaret sicil adresi. NACE uyumlu, stopajsız ofis kiralama seçenekleri.",
    href: "/hizmetler/sanal-ofis",
  },
  {
    id: "toplanti-odasi",
    titleWords: ["TOPLANTI", "ODASI"],
    icon: UserGroupIcon,
    description:
      "Saatlik rezervasyonlu toplantı odaları. Gizli maliyet yok, net fiyat, merkezi konum.",
    href: "/hizmetler/toplanti-odasi",
  },
];

const features = [
  { icon: ShieldCheckIcon, line1: "Güven Veren", line2: "Kaliteli Hizmet" },
  { icon: TrophyIcon, line1: "+2", line2: "Yıllık Deneyim" },
  { icon: WalletIcon, line1: "Her Bütçeye", line2: "Uygun Fiyatlar" },
  { icon: BuildingOffice2Icon, line1: "+4800 Mutlu", line2: "Firma" },
];

function ServiceCard({
  titleWords,
  icon: Icon,
  description,
  href,
}: {
  titleWords: [string, string];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  description: string;
  href: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-md">
      <div className="relative h-[180px] w-full shrink-0 bg-[#f2f2f2] sm:h-[200px]">
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
          className="mt-5 w-full rounded-full bg-[#0b7041] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
        >
          DETAYLI İNCELE
        </Link>
      </div>
    </article>
  );
}

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="HİZMETLER"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Hizmetler" }]}
      />

      {/* Hizmetlerimiz */}
      <section
        className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="services-heading"
            className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            HİZMETLERİMİZ
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                titleWords={s.titleWords}
                icon={s.icon}
                description={s.description}
                href={s.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Neden Konsept Ofis */}
      <section
        className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="why-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="why-heading"
            className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            HAZIR OFİS VE SANAL OFİS MERKEZİ
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-lg font-bold text-black">
                Neden Konsept Ofis?
              </h3>
              <p className="mt-4 leading-relaxed text-gray-700">
                Yabancı ve yerli girişimcilerin{" "}
                <span className="font-medium text-[#0b7041]">hazır ofis</span> ve{" "}
                <span className="font-medium text-[#0b7041]">sanal ofis</span>{" "}
                imkânlarından yararlanmaları için kurulduk. Esnek hizmet
                çözümlerimiz ile üyelerimizin sermayelerini ofislerine değil,
                işlerine yatırmasına destek oluyoruz.
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
    </main>
  );
}
