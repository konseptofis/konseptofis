import {
  Globe,
  HeartPulse,
  Laptop,
  Rocket,
  Scale,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import { HOME_BG_MUTED, HOME_CONTAINER, HOME_H3, HOME_SECTION_Y } from "@/app/lib/home-ui";

const AUDIENCE_CARDS: { title: string; icon: LucideIcon }[] = [
  {
    title: "Avukatlar ve Hukuk Büroları İçin Sanal Ofis",
    icon: Scale,
  },
  {
    title: "E-Ticaret İşletmeleri İçin Sanal Ofis",
    icon: ShoppingCart,
  },
  {
    title: "Yeni Girişimciler ve KOBİ'ler İçin Sanal Ofis",
    icon: Rocket,
  },
  {
    title: "Freelancer ve Danışmanlar İçin Sanal Ofis",
    icon: Laptop,
  },
  {
    title: "Psikolog, Diyetisyen ve Online Danışmanlar İçin Sanal Ofis",
    icon: HeartPulse,
  },
  {
    title: "Yurtdışı Merkezli Şirketler İçin Ankara Sanal Ofis",
    icon: Globe,
  },
];

const TABLE_ROWS = [
  AUDIENCE_CARDS.slice(0, 3),
  AUDIENCE_CARDS.slice(3, 6),
];

function AudienceCell({ item }: { item: (typeof AUDIENCE_CARDS)[number] }) {
  const Icon = item.icon;
  return (
    <div className="flex h-full min-h-[72px] items-center gap-4">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#0b7041]/[0.08]"
        aria-hidden
      >
        <Icon className="h-5 w-5 text-[#0b7041]" strokeWidth={1.75} />
      </div>
      <h3 className={`${HOME_H3} m-0 min-w-0 flex-1`}>{item.title}</h3>
    </div>
  );
}

export default function HomeAudienceSection() {
  return (
    <section
      id="sanal-ofis-kimler-icin"
      aria-labelledby="sanal-ofis-kimler-icin-heading"
      className={`${HOME_SECTION_Y} ${HOME_BG_MUTED} font-sans`}
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="sanal-ofis-kimler-icin-heading" className="mb-4">
          Kimler İçin İdeal?
        </SectionHeading>

        <p className="m-0 text-[16px] leading-[1.7] text-[#3D4743]">
          Sanal ofis, fiziksel ofise ihtiyaç duymadan yasal iş adresi isteyen herkes için uygun bir
          çözümdür. Ankara sanal ofis hizmetimizi avukatlardan e-ticaret işletmelerine, yeni
          girişimlerden yurtdışı merkezli şirketlere kadar farklı sektörlerden firmalar vergi
          levhası ve ticaret sicil adresi olarak kullanıyor.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-[#E3E8E5] bg-white">
          <table className="w-full border-collapse max-md:block">
            <caption className="sr-only">Sanal ofis hizmeti kimler için uygundur</caption>
            <tbody className="max-md:block">
              {TABLE_ROWS.map((row, rowIndex) => {
                const isLastRow = rowIndex === TABLE_ROWS.length - 1;
                return (
                  <tr key={rowIndex} className="max-md:block">
                    {row.map((item, colIndex) => {
                      const isLastCol = colIndex === row.length - 1;
                      return (
                        <td
                          key={item.title}
                          className={[
                            "h-full align-middle p-5 max-md:block",
                            "border-[#E3E8E5] max-md:border-b",
                            isLastRow && isLastCol ? "max-md:border-b-0" : "",
                            !isLastCol ? "md:border-r md:border-[#E3E8E5]" : "",
                            !isLastRow ? "md:border-b md:border-[#E3E8E5]" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <AudienceCell item={item} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
