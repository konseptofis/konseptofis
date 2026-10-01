"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FaqItem } from "@/app/lib/data";
import SectionHeading from "@/app/components/SectionHeading";
import { BTN_SECONDARY, HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

const LEFT_COLUMN_COUNT = 7;
const MOBILE_INITIAL_COUNT = 6;

function FaqListItem({
  item,
  index,
  hiddenOnMobile,
  isLastInColumn,
}: {
  item: FaqItem;
  index: number;
  hiddenOnMobile: boolean;
  isLastInColumn: boolean;
}) {
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <li
      className={[
        "border-b border-[#E3E8E5]",
        hiddenOnMobile ? "max-lg:hidden" : "",
        isLastInColumn ? "border-b-0" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <details className="group">
        <summary
          id={questionId}
          className="flex cursor-pointer list-none items-center justify-between gap-3 py-[18px] text-left text-[16px] font-medium text-[var(--color-text-primary)] marker:content-none [&::-webkit-details-marker]:hidden"
          aria-controls={answerId}
        >
          <span>{item.question}</span>
          <ChevronDownIcon
            className="h-5 w-5 shrink-0 text-[var(--color-green)] transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div
          id={answerId}
          role="region"
          aria-labelledby={questionId}
          className="pb-[18px] text-[15px] leading-[1.65] text-[#3D4743]"
        >
          {item.answer}
        </div>
      </details>
    </li>
  );
}

type Props = {
  items: FaqItem[];
  sectionClassName?: string;
};

export default function HomeFaqAccordion({ items, sectionClassName = "bg-white" }: Props) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const total = items.length;
  const leftItems = items.slice(0, LEFT_COLUMN_COUNT);
  const rightItems = items.slice(LEFT_COLUMN_COUNT);

  return (
    <section
      id="sss"
      aria-labelledby="faq-main-heading"
      className={`${sectionClassName} ${HOME_SECTION_Y}`}
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="faq-main-heading" className="mb-8">
          Sanal Ofis Hakkında Sık Sorulan Sorular
        </SectionHeading>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          <ul className="faq-col m-0 flex min-w-0 flex-1 list-none flex-col border-y border-[#E3E8E5] p-0">
            {leftItems.map((item, columnIndex) => {
              const index = columnIndex;
              const hiddenOnMobile = !showAllMobile && index >= MOBILE_INITIAL_COUNT;
              return (
                <FaqListItem
                  key={index}
                  item={item}
                  index={index}
                  hiddenOnMobile={hiddenOnMobile}
                  isLastInColumn={columnIndex === leftItems.length - 1}
                />
              );
            })}
          </ul>

          <ul
            className={`faq-col m-0 flex min-w-0 flex-1 list-none flex-col border-[#E3E8E5] p-0 lg:border-y ${
              showAllMobile ? "max-lg:border-b max-lg:border-t-0" : "max-lg:hidden"
            }`}
          >
            {rightItems.map((item, columnIndex) => {
              const index = columnIndex + LEFT_COLUMN_COUNT;
              return (
                <FaqListItem
                  key={index}
                  item={item}
                  index={index}
                  hiddenOnMobile={false}
                  isLastInColumn={columnIndex === rightItems.length - 1}
                />
              );
            })}
          </ul>
        </div>

        <div className="mt-6 flex justify-center lg:hidden">
          <button
            type="button"
            className={BTN_SECONDARY}
            aria-expanded={showAllMobile}
            onClick={() => setShowAllMobile((open) => !open)}
          >
            {showAllMobile ? "Daha az göster" : `Tüm soruları gör (${total})`}
          </button>
        </div>
      </div>
    </section>
  );
}
