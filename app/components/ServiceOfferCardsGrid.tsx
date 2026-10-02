import Link from "next/link";
import Image from "next/image";
import type { ServiceOfferCard } from "@/app/lib/service-offer-cards";
import { HOME_CARD, HOME_H3 } from "@/app/lib/home-ui";

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
  gridClassName?: string;
  imageHeightClass?: string;
  descriptionClassName?: string;
};

const DEFAULT_GRID =
  "grid grid-cols-1 auto-rows-fr items-stretch gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6";

export default function ServiceOfferCardsGrid({
  cards,
  gridClassName = DEFAULT_GRID,
  imageHeightClass = "h-[176px]",
  descriptionClassName = "flex-1 text-[15px] leading-[1.65] text-[#3D4743]",
}: Props) {
  return (
    <div className={gridClassName}>
      {cards.map((card) => (
        <article
          key={card.id}
          className={`relative flex h-full cursor-pointer flex-col overflow-hidden ${HOME_CARD}`}
        >
          <div
            className={`relative w-full shrink-0 overflow-hidden bg-[#F5F7F6] ${imageHeightClass}`}
          >
            <Image
              src={card.image}
              alt={card.imageAlt ?? card.title}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {card.badge ? (
              <span
                className="absolute bottom-3 right-3 z-[2] rounded-[20px] border-[0.5px] border-[rgba(255,255,255,0.25)] px-2.5 py-1 text-[10px] font-medium tracking-[0.04em] text-white"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                {card.badge}
              </span>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col px-5 pb-2 pt-5">
            <h3 className={`${HOME_H3} mb-1.5`}>
              <Link
                href={card.href}
                className="after:absolute after:inset-0 after:z-[3] after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[var(--color-green)]"
              >
                {card.title}
              </Link>
            </h3>
            <p className={descriptionClassName}>{card.description}</p>
          </div>
          <div className="flex items-center px-5 pb-5 pt-4">
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-green)]">
              Detayları gör
              <FooterChevron />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
