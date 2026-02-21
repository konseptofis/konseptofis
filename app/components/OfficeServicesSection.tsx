import {
  BriefcaseIcon,
  CubeIcon,
  UserGroupIcon,
  SunIcon,
  SignalIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

const ACCENT = "#0b7041";

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
    description:
      "Fiber hızlı internet sayesinde kesintisiz çalışma olanağı yakalayın.",
    icon: SignalIcon,
  },
  {
    title: "KOLAY ULAŞIM",
    description:
      "Ofisiniz iş hayatının tam merkezinde, metro ve diğer toplu taşımanın yanı başında.",
    icon: MapPinIcon,
  },
  ];

export default function OfficeServicesSection() {
  return (
    <section
      id="ofis-hizmetleri"
      aria-labelledby="office-services-heading"
      className="bg-[#FFFFFF] px-4 py-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <h2
            id="office-services-heading"
            className="flex items-center gap-3 text-left tracking-tight text-black"
          >
            <span className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12" aria-hidden />
            Hazır Ofis ve Sanal Ofis Hizmetlerimiz Neleri Kapsıyor?
          </h2>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex flex-row items-start gap-3 sm:gap-4"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12"
                  aria-hidden
                >
                  <Icon
                    className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
                    style={{ color: ACCENT }}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-xs font-medium uppercase tracking-tight text-black sm:text-base">
                    {item.title}
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B5563] sm:mt-2 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
