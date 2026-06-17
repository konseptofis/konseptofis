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
    title: "Tam Donanımlı",
    description:
      "Her türlü teknik donanım ve modern ofis mobilyaları eşliğinde keyifle çalışın.",
    icon: BriefcaseIcon,
  },
  {
    title: "Kargo Hizmeti",
    description:
      "Evraklarınız profesyonel bir ekip tarafından kabul edilsin ve size yönlendirilsin.",
    icon: CubeIcon,
  },
  {
    title: "Toplantı ve Makam Odaları",
    description:
      "Misafirlerinizi tam donanımlı toplantı odalarımızda ve prestijli makam alanlarımızda ağırlayın; kurumsal sunumlarda ve üst düzey görüşmelerde fark yaratın.",
    icon: UserGroupIcon,
  },
  {
    title: "Sınırsız Sıcak İkram",
    description:
      "Gün boyu sınırsız sıcak ikram seçeneklerimizle çay ve kahveye sürekli erişimin tadını çıkarın; motive ve enerjik çalışın.",
    icon: SunIcon,
  },
  {
    title: "Yüksek Hızlı İnternet",
    description: "Fiber hızlı internet sayesinde kesintisiz çalışma olanağı yakalayın.",
    icon: WifiIcon,
  },
  {
    title: "Kolay Ulaşım",
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
                className="group flex flex-col items-center gap-2 rounded-[14px] border border-[#e8eaed] bg-white px-2 py-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] md:flex-row md:items-start md:gap-5 md:px-6 md:py-7 md:text-left"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0b7041]/[0.08] md:h-12 md:w-12"
                  aria-hidden
                >
                  <Icon className="h-[18px] w-[18px] shrink-0 text-[#0b7041] md:h-[22px] md:w-[22px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="mb-1 block text-[17px] font-bold leading-tight text-black md:mb-2">
                    {item.title}
                  </span>
                  <span className="m-0 block text-[14px] leading-[1.65] text-gray-600 line-clamp-4 md:line-clamp-none">
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
