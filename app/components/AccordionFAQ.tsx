"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

type FAQItem = { question: string; answer: string | ReactNode };
type AccordionFAQProps = {
  items: FAQItem[];
  idPrefix?: string;
};

export default function AccordionFAQ({ items, idPrefix = "faq" }: AccordionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-[#e5e5e5]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <li key={index}>
            <h3 className="text-base font-semibold">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left font-semibold text-gray-900"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-answer-${index}`}
                id={`${idPrefix}-question-${index}`}
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <ChevronUpIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                )}
              </button>
            </h3>
            <div
              id={`${idPrefix}-answer-${index}`}
              role="region"
              aria-labelledby={`${idPrefix}-question-${index}`}
              hidden={!isOpen}
              className="pb-4"
            >
              <div className="text-sm leading-relaxed text-gray-600">{item.answer}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
