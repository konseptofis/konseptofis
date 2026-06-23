import Link from "next/link";
import { ArrowRight, Building2, Check, MapPin } from "lucide-react";

type Props = { className?: string };

const BRAND = {
  green: "#2F6B4F",
  tint: "#EDF4EF",
  border: "#E5E9E6",
} as const;

const FEATURES = [
  "Vergi levhası ve ticaret sicili adresi",
  "Kargo ve posta kabulü",
  "Stopajsız, aidatsız, gizli maliyet yok",
] as const;

function KonseptOfisPromoCard() {
  return (
    <div
      className="w-full rounded-2xl bg-white p-5 sm:p-6"
      style={{
        border: `1px solid ${BRAND.border}`,
        boxShadow: "0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-md"
          style={{ background: BRAND.tint }}
        >
          <Building2 size={14} strokeWidth={2.2} style={{ color: BRAND.green }} aria-hidden />
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: BRAND.green }}
        >
          Konsept Ofis
        </span>
      </div>

      <h2 className="mt-3 text-[18px] font-bold leading-snug text-gray-900 xl:text-[20px]">
        Fiziksel ofis olmadan şirketinize yasal adres edinin
      </h2>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
        <MapPin size={14} strokeWidth={2} className="shrink-0" aria-hidden />
        <span>Ankara Çankaya&apos;da prestijli iş adresi</span>
      </div>

      <div className="my-5 h-px w-full" style={{ background: BRAND.border }} />

      <p className="text-[13px] leading-relaxed text-gray-600 xl:text-[13.5px]">
        Sanal ofis; kira ödemeden şirketinizi kurmanızı ve büyütmenizi sağlayan yasal iş
        adresi hizmetidir.
      </p>

      <ul className="mt-4 space-y-2.5">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
              style={{ background: BRAND.tint }}
            >
              <Check size={12} strokeWidth={2.6} style={{ color: BRAND.green }} aria-hidden />
            </span>
            <span className="text-[13px] leading-snug text-gray-700 xl:text-[13.5px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-5 rounded-xl px-4 py-3"
        style={{ background: BRAND.tint }}
      >
        <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
          Aylık başlangıç
        </div>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="text-[24px] font-bold leading-none text-gray-900 xl:text-[26px]">
            800 ₺
          </span>
          <span className="text-sm font-medium text-gray-400">/ay</span>
        </div>
      </div>

      <Link
        href="/hizmetlerimiz/cankaya-sanal-ofis"
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#2F6B4F] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#255A40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6B4F]"
      >
        İncele
        <ArrowRight size={17} strokeWidth={2.4} aria-hidden />
      </Link>
    </div>
  );
}

/** Blog detay sağ sütun: sanal ofis tanıtım kartı */
export default function BlogSidebar({ className = "" }: Props) {
  return (
    <div className={`flex w-full flex-col gap-5 ${className}`.trim()}>
      <KonseptOfisPromoCard />
    </div>
  );
}
