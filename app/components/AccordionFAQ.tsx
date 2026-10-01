import type { ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FAQItem = { question: string; answer: string | ReactNode };
type AccordionFAQProps = {
  items: FAQItem[];
  idPrefix?: string;
};

/** Cevaplar her zaman HTML'de; aç/kapa native `<details>` ile. */
export default function AccordionFAQ({ items, idPrefix = "faq" }: AccordionFAQProps) {
  return (
    <ul className="divide-y divide-[#e5e5e5]">
      {items.map((item, index) => {
        const questionId = `${idPrefix}-question-${index}`;
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <li key={index}>
            <details className="group">
              <summary
                id={questionId}
                className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-base font-semibold text-gray-900 marker:content-none [&::-webkit-details-marker]:hidden"
                aria-controls={answerId}
              >
                <span>{item.question}</span>
                <ChevronDownIcon
                  className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180 group-open:text-[#0b7041]"
                  aria-hidden
                />
              </summary>
              <div id={answerId} className="pb-4" role="region" aria-labelledby={questionId}>
                <div className="text-sm leading-relaxed text-gray-600">{item.answer}</div>
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
