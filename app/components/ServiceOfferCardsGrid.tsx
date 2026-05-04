import Link from "next/link";
import Image from "next/image";
import type { ServiceOfferCard } from "@/app/lib/service-offer-cards";

function FooterChevron() {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-[var(--color-green)]"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 5 7 7-7 7"
      />
    </svg>
  );
}

type Props = {
  cards: ServiceOfferCard[];
  /** Örn. anasayfa: gap-4 md:grid-cols-3 — sayfa grid'ine göre override */
  gridClassName?: string;
};

const DEFAULT_GRID =
  "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4";

export default function ServiceOfferCardsGrid({
  cards,
  gridClassName = DEFAULT_GRID,
}: Props) {
  return (
    <div className={gridClassName}>
      {cards.map((card) => (
        <Link
          key={card.id}
          href={card.href}
          className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-[0.5px] border-[var(--color-border-tertiary)] bg-[var(--color-white)] transition-[border-color] duration-150 ease-out hover:border-[var(--color-green)]"
        >
          <div className="relative h-[176px] w-full shrink-0 overflow-hidden bg-[var(--color-silver)]">
            <Image
              src={card.image}
              alt={`${card.title} - Ankara Konsept Ofis`}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 33vw"
            />
            <span
              className="absolute bottom-3 right-3 rounded-[20px] border-[0.5px] border-[rgba(255,255,255,0.25)] px-2.5 py-1 text-[10px] font-medium tracking-[0.04em] text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              {card.badge}
            </span>
          </div>
          <div className="flex flex-1 flex-col px-5 pb-2 pt-5">
            <h3 className="mb-1.5 text-[17px] font-medium leading-snug text-[var(--color-text-primary)]">
              {card.title}
            </h3>
            <p className="flex-1 text-[14px] leading-[1.65] text-[var(--color-text-muted)]">
              {card.description}
            </p>
          </div>
          <div className="flex items-center justify-between px-5 pb-5 pt-4">
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-green)]">
              Detayları gör
              <FooterChevron />
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)]">
              {card.priceLabel}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
