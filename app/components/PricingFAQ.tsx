"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const ITEMS = [
  {
    question: "Fiyatlara KDV dahil mi?",
    answer:
      "Hayır, tabloda belirtilen tüm fiyatlarımıza KDV eklenecektir.",
  },
  {
    question: "Sanal ofis kiraladığımda stopaj veya aidat ödeyecek miyim?",
    answer:
      "Hayır. Sanal ofis paketlerimizde stopaj, bina aidatı, elektrik, su gibi ekstra gizli maliyetler bulunmaz.",
  },
  {
    question: "Toplantı odalarını paket dışında kullanabilir miyim?",
    answer:
      "Evet, ihtiyaç duymanız halinde saatlik veya günlük olarak ekstra toplantı odası kiralayabilirsiniz.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-[#e5e5e5]">
      {ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <li key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 py-4 text-left"
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
