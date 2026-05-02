import SectionHeading from "./SectionHeading";
import {
  BriefcaseIcon,
  CubeIcon,
  MapPinIcon,
  SunIcon,
  UserGroupIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

const services: {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "TAM DONANIMLI",
    description:
      "Her türlü teknik donanım ve modern ofis mobilyaları eşliğinde keyifle çalışın.",
    icon: BriefcaseIcon,
  },
  {
    title: "KARGO HİZMETİ",
    description:
      "Evraklarınız profesyonel bir ekip tarafından kabul edilsin ve size yönlendirilsin.",
    icon: CubeIcon,
  },
  {
    title: "TOPLANTI ODALARI",
    description:
      "Misafirlerinizi tam donanımlı toplantı odalarında ağırlayın ve fark yaratın.",
    icon: UserGroupIcon,
  },
  {
    title: "SINIRSIZ ÇAY & KAHVE",
    description:
      "Leziz ikramlar eşliğinde sınırsız çay & kahve servisi ile motivasyonunuzu artırın.",
    icon: SunIcon,
  },
  {
    title: "YÜKSEK HIZLI İNTERNET",
    description: "Fiber hızlı internet sayesinde kesintisiz çalışma olanağı yakalayın.",
    icon: WifiIcon,
  },
  {
    title: "KOLAY ULAŞIM",
    description:
      "Ofisiniz iş hayatının tam merkezinde, metro ve diğer toplu taşımanın yanı başında.",
    icon: MapPinIcon,
  },
];

type Props = { sectionClassName?: string };

export default function OfficeServicesSection({
  sectionClassName = "bg-white",
}: Props) {
  return (
    <section
      id="ofis-hizmetleri"
      aria-label="Hizmet Özellikleri"
      className={`${sectionClassName} px-4 py-16 font-sans sm:px-6 md:py-24 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <SectionHeading id="office-services-heading">
            Hazır Ofis ve Sanal Ofis Hizmetlerimiz Neleri Kapsıyor?
          </SectionHeading>
        </header>

        <div className="grid grid-cols-2 gap-2 md:gap-5 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                itemScope
                itemType="https://schema.org/Service"
                className="group flex flex-col items-center gap-2 rounded-[14px] border border-[#e8eaed] bg-white px-2 py-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] md:flex-row md:items-start md:gap-5 md:px-6 md:py-7 md:text-left"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0b7041]/[0.08] md:h-12 md:w-12"
                  aria-hidden
                >
                  <Icon className="h-[18px] w-[18px] shrink-0 text-[#0b7041] md:h-[22px] md:w-[22px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    itemProp="name"
                    className="mb-1 block text-[10px] font-bold uppercase leading-tight tracking-wide text-black md:mb-2 md:text-[13px] md:tracking-[1.5px]"
                  >
                    {item.title}
                  </span>
                  <span
                    itemProp="description"
                    className="m-0 block text-[10px] leading-snug text-gray-600 line-clamp-4 md:text-[14px] md:leading-[1.65] md:line-clamp-none"
                  >
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
