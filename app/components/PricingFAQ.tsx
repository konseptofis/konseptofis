"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PRICING_FAQ_ITEMS } from "@/app/lib/data";

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-[#e5e5e5]">
      {PRICING_FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <li key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={`pricing-faq-answer-${index}`}
              id={`pricing-faq-question-${index}`}
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              {isOpen ? (
                <ChevronUpIcon className="h-5 w-5 shrink-0 text-[#0b7041]" aria-hidden />
              ) : (
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-gray-500" aria-hidden />
              )}
            </button>
            <div
              id={`pricing-faq-answer-${index}`}
              role="region"
              aria-labelledby={`pricing-faq-question-${index}`}
              hidden={!isOpen}
              className="pb-4"
            >
              <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
