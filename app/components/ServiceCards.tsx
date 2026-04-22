import Link from "next/link";
import Image from "next/image";
import {
  ChevronRightIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

// Görselleri public/images/ altına ekleyin: sanal-ofis.jpg, hazir-ofis.jpg, toplanti-odasi.jpg
const cards = [
  {
    id: "sanal-ofis",
    title: "Sanal Ofis",
    image: null as string | null,
    icon: BuildingOffice2Icon,
    description:
      "Ankara'da vergi levhası ve ticaret sicil adresi olarak kullanılabilen sanal ofis. NACE uyumlu, stopajsız ofis kiralama seçenekleri ile kurumsal adresiniz.",
    href: "#fiyatlar",
  },
  {
    id: "hazir-ofis",
    title: "Hazır Ofis",
    image: null as string | null,
    icon: BriefcaseIcon,
    description:
      "Tam donanımlı hazır ofis birimleri. Ankara Çankaya'da günlük veya aylık esnek kiralama. Profesyonel çalışma alanı ihtiyacınız için tek adres.",
    href: "#fiyatlar",
  },
  {
    id: "toplanti-odasi",
    title: "Toplantı Odası",
    image: null as string | null,
    icon: UserGroupIcon,
    description:
      "Müşteri ve ekip toplantılarınız için saatlik rezervasyonlu toplantı odaları. Gizli maliyet yok, net saatlik fiyat, merkezi konum.",
    href: "#fiyatlar",
  },
];

type Props = { sectionClassName?: string };

export default function ServiceCards({ sectionClassName = "bg-white" }: Props) {
  return (
    <section
      id="hizmetler"
      aria-labelledby="service-cards-heading"
      className={`${sectionClassName} px-4 py-[60px] sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="service-cards-heading" className="mb-10 flex items-center gap-3 text-left tracking-tight text-black">
          <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
          Hizmetlerimiz
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.id}
                className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-[#f2f2f2] bg-[#f2f2f2] shadow-sm"
              >
                <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[#f2f2f2]">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={`${card.title} - Ankara Konsept Ofis`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-[#0b7041]/60"
                      aria-hidden
                    >
                      <Icon className="h-16 w-16" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="text-[#0b7041]">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0b7041] hover:underline"
                  >
                    Devamını Gör
                    <ChevronRightIcon className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
