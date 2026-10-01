import Link from "next/link";
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

  const textClass = "text-[15px] leading-snug text-[#3D4743]";

  return (
    <div className="flex items-center justify-center gap-2">
      {icon}
      <span className={textClass}>{cell.text}</span>
    </div>
  );
}

type Props = { sectionClassName?: string };

export default function SanalOfisNedirSection({
  sectionClassName = HOME_BG_MUTED,
}: Props) {
  const rows: { label: string; sanal: Cell; hazir: Cell; klasik: Cell }[] = [
    {
      label: "Yasal adres",
      sanal: { text: "Var", kind: "positive" },
      hazir: { text: "Var", kind: "positive" },
      klasik: { text: "Var", kind: "positive" },
    },
    {
      label: "Fiziksel çalışma alanı",
      sanal: { text: "Yok, toplantı odası saatlik", kind: "neutral" },
      hazir: { text: "Var, mobilyalı", kind: "positive" },
      klasik: { text: "Var, boş teslim", kind: "neutral" },
    },
    {
      label: "Stopaj",
      sanal: { text: "Yok", kind: "positive" },
      hazir: { text: "Yok", kind: "positive" },
      klasik: { text: "%20 kira stopajı", kind: "negative" },
    },
    {
      label: "Aidat, elektrik, su, internet",
      sanal: { text: "Yok", kind: "positive" },
      hazir: { text: "Fiyata dahil", kind: "positive" },
      klasik: { text: "Ayrıca ödenir", kind: "negative" },
    },
    {
      label: "Kurulum süresi",
      sanal: { text: "Aynı gün", kind: "positive" },
      hazir: { text: "Aynı gün", kind: "positive" },
      klasik: { text: "Haftalar", kind: "negative" },
    },
  ];

  const labelSticky =
    "sticky left-0 z-20 bg-[#F5F7F6] px-4 text-left text-[15px] font-medium leading-snug text-[#3D4743] shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] md:shadow-none";
  const cellPad = "px-4 py-[18px] align-middle min-h-[60px]";
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

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 bg-transparent">
            <caption className="sr-only">
              Sanal ofis, hazır ofis ve klasik ofis karşılaştırması
            </caption>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={`${labelSticky} ${cellPad} ${divider} pt-7`}>
                  <span className="sr-only">Özellik</span>
                </th>
                <th
                  scope="col"
                  className={`${cellPad} ${divider} pt-7 text-center text-[16px] font-semibold text-[#3D4743]`}
                >
                  Klasik Ofis Kiralama
                </th>
                <th
                  scope="col"
                  className={`${cellPad} ${sanalDivider} bg-white pt-7 text-center align-middle rounded-t-2xl`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="rounded-full bg-[var(--color-green)] px-2.5 py-1 text-[12px] font-semibold leading-none text-white">
                      Önerilen
                    </span>
                    <span className="text-[17px] font-semibold text-[var(--color-green)]">
                      Sanal Ofis
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className={`${cellPad} ${divider} pt-7 text-center text-[16px] font-semibold text-[#3D4743]`}
                >
                  Hazır Ofis
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
                    <th scope="row" className={`${labelSticky} ${cellPad} ${rowDiv}`}>
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
                    <td className={`${cellPad} ${rowDiv} text-center`}>
                      <ValueCell cell={row.hazir} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Link
            href="/hizmetlerimiz/hazir-ofis-kiralama"
            className="text-center text-[15px] font-semibold text-[var(--color-green)] underline-offset-2 hover:underline sm:mr-4"
          >
            Hazır ofis seçenekleri
          </Link>
          <TeklifAlButton className={BTN_PRIMARY}>Sanal ofis teklifi al</TeklifAlButton>
        </div>
      </div>
    </section>
  );
}
