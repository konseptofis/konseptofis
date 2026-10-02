import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Building2, MapPin, Users, type LucideIcon } from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import TeklifAlButton from "@/app/components/home/TeklifAlButton";
import {
  BTN_PRIMARY,
  HOME_BG_MUTED,
  HOME_CONTAINER,
  HOME_SECTION_Y,
} from "@/app/lib/home-ui";

type CellKind = "positive" | "negative" | "neutral" | "price";

type Cell = { text: string; kind: CellKind };

const INTRO_COLUMNS: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Ne sağlar?",
    text: "Bu adresi vergi levhanızda ve ticaret sicil kaydınızda kullanırsınız; size gelen posta, kargo ve tebligatlar adreste teslim alınır ve size bildirilir.",
    icon: Building2,
  },
  {
    title: "Nasıl çalışır?",
    text: "Çalışmanızı evden, sahadan ya da başka bir şehirden sürdürürken şirketiniz Ankara'nın iş merkezinde kayıtlı görünür. Müşteri görüşmesi gerektiğinde toplantı odasını saatlik kiralarsınız.",
    icon: MapPin,
  },
  {
    title: "Kimler kullanır?",
    text: "Henüz ofis tutmak istemeyen yeni girişimler, ev adresini şirket adresi yapmak istemeyen serbest çalışanlar, e-ticaret işletmeleri ve Türkiye'de adres ihtiyacı olan yabancı şirketler.",
    icon: Users,
  },
];

function ValueCell({ cell }: { cell: Cell }) {
  const icon =
    cell.kind === "positive" ? (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F5EE]"
        aria-hidden
      >
        <CheckIcon className="h-3 w-3 text-[var(--color-green)]" strokeWidth={2.5} />
      </span>
    ) : cell.kind === "negative" ? (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FBEAE7]"
        aria-hidden
      >
        <XMarkIcon className="h-3 w-3 text-[#B4533F]" strokeWidth={2.5} />
      </span>
    ) : null;

  const textClass = "text-[13px] leading-snug text-[#3D4743] md:text-[15px]";

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 md:flex-row md:gap-2">
      {icon}
      <span className={textClass}>{cell.text}</span>
    </div>
  );
}

type Props = { sectionClassName?: string };

export default function SanalOfisNedirSection({
  sectionClassName = HOME_BG_MUTED,
}: Props) {
  const rows: { label: string; klasik: Cell; sanal: Cell }[] = [
    {
      label: "Emlakçı komisyonu",
      klasik: { text: "Var", kind: "negative" },
      sanal: { text: "Yok", kind: "positive" },
    },
    {
      label: "Depozito",
      klasik: { text: "Var", kind: "negative" },
      sanal: { text: "Yok", kind: "positive" },
    },
    {
      label: "Stopaj",
      klasik: { text: "%20 kira stopajı", kind: "negative" },
      sanal: { text: "Yok", kind: "positive" },
    },
    {
      label: "Aidat, elektrik, su, internet",
      klasik: { text: "Ek maliyet", kind: "negative" },
      sanal: { text: "Yok", kind: "positive" },
    },
    {
      label: "Kurulum süresi",
      klasik: { text: "Haftalar", kind: "negative" },
      sanal: { text: "Aynı gün", kind: "positive" },
    },
    {
      label: "Fiziksel çalışma alanı",
      klasik: { text: "Boş teslim", kind: "negative" },
      sanal: { text: "Makam odası ve toplantı odası", kind: "positive" },
    },
  ];

  const labelCol =
    "w-[34%] px-2 text-left text-[13px] font-medium leading-snug text-[#3D4743] md:px-4 md:text-[15px]";
  const cellPad = "px-2 py-3 align-middle md:min-h-[60px] md:px-4 md:py-[18px]";
  const valueCol = "w-[33%]";
  const divider = "border-b border-[#E6EBE8]";
  const sanalDivider = "border-b border-[#EEF1EF]";

  return (
    <section
      id="sanal-ofis-nedir"
      aria-labelledby="sanal-ofis-nedir-heading"
      className={`${sectionClassName} ${HOME_SECTION_Y} font-sans`}
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="sanal-ofis-nedir-heading" className="mb-4">
          Sanal Ofis Nedir?
        </SectionHeading>

        <p className="mb-10 mt-0 max-w-[760px] text-[19px] font-normal leading-[1.45] text-[#1F2A24] md:text-[24px]">
          Sanal ofis, fiziksel bir ofis kiralamadan şirketinize yasal iş adresi sağlayan bir
          hizmettir.
        </p>

        <div className="rounded-2xl bg-white shadow-none">
          <ul className="grid list-none grid-cols-1 p-0 md:grid-cols-3">
            {INTRO_COLUMNS.map((col, index) => {
              const Icon = col.icon;
              return (
                <li
                  key={col.title}
                  className={`relative p-6 md:p-8 ${
                    index > 0
                      ? "before:absolute before:left-6 before:right-6 before:top-0 before:h-px before:bg-[#E6EBE8] md:before:bottom-7 md:before:left-0 md:before:right-auto md:before:top-7 md:before:h-auto md:before:w-px"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className="h-5 w-5 shrink-0 text-[var(--color-green)]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <h3 className="m-0 text-[16px] font-semibold leading-snug text-[#1F2A24]">
                      {col.title}
                    </h3>
                  </div>
                  <p className="mb-0 mt-3 text-[15px] leading-[1.65] text-[#4A5550]">{col.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 md:mt-14">
          <table className="w-full table-fixed border-separate border-spacing-0 bg-transparent">
            <caption className="sr-only">
              Klasik ofis kiralama ve sanal ofis karşılaştırması
            </caption>
            <thead>
              <tr>
                <th scope="col" className={`${labelCol} ${cellPad} ${divider} pt-7`}>
                  <span className="sr-only">Özellik</span>
                </th>
                <th
                  scope="col"
                  className={`${valueCol} ${cellPad} ${divider} pt-7 text-center text-[13px] font-semibold leading-snug text-[#3D4743] md:text-[16px]`}
                >
                  Klasik Ofis Kiralama
                </th>
                <th
                  scope="col"
                  className={`${valueCol} ${cellPad} ${sanalDivider} bg-white pt-7 text-center align-middle rounded-t-2xl`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="rounded-full bg-[var(--color-green)] px-2 py-1 text-[11px] font-semibold leading-none text-white md:px-2.5 md:text-[12px]">
                      Önerilen
                    </span>
                    <span className="text-[14px] font-semibold text-[var(--color-green)] md:text-[17px]">
                      Sanal Ofis
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const last = i === rows.length - 1;
                const rowDiv = last ? "" : divider;
                const sanalDiv = last ? "border-b-0" : sanalDivider;
                return (
                  <tr key={row.label}>
                    <th scope="row" className={`${labelCol} ${cellPad} ${rowDiv}`}>
                      {row.label}
                    </th>
                    <td className={`${cellPad} ${rowDiv} text-center`}>
                      <ValueCell cell={row.klasik} />
                    </td>
                    <td
                      className={`${cellPad} bg-white text-center ${sanalDiv} ${last ? "rounded-b-2xl pb-7" : ""}`}
                    >
                      <ValueCell cell={row.sanal} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          <TeklifAlButton className={BTN_PRIMARY}>Sanal ofis teklifi al</TeklifAlButton>
        </div>
      </div>
    </section>
  );
}
