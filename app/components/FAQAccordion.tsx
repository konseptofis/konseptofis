"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { FAQ_ITEMS } from "@/app/lib/data";
import SectionHeading from "./SectionHeading";

type Props = { sectionClassName?: string };

export default function FAQAccordion({ sectionClassName = "bg-white" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqImageSrc = openIndex === null ? "/faq1.webp" : "/faq2.webp";

  return (
    <section
      id="sss"
      aria-labelledby="faq-main-heading"
      className={`${sectionClassName} px-4 pt-10 pb-12 sm:px-6 sm:pt-11 sm:pb-14 lg:px-8 lg:pt-12 lg:pb-16`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Sol: başlık + akordiyon */}
          <div className="min-w-0 flex-1 lg:max-w-[min(100%,640px)]">
            <div className="mb-6 sm:mb-7">
              <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-green)]">
                Sıkça Sorulan Sorular
              </p>
              <SectionHeading id="faq-main-heading" className="mt-2">
                Aklınıza takılanlar?
              </SectionHeading>
            </div>

            <ul className="space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={index}>
                    <article
                      className={`overflow-hidden rounded-[10px] border transition-colors ${
                        isOpen
                          ? "border-[#0b7041]/35 bg-[#f8faf8] shadow-sm"
                          : "border-[#e8e8e8] bg-white"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left text-[17px] font-semibold text-gray-900 transition-colors sm:px-5 sm:py-[18px] ${
                          isOpen ? "bg-[#f2f7f3]" : "hover:bg-[#fafafa]"
                        }`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        id={`faq-question-${index}`}
                      >
                        <span>{item.question}</span>
                        {isOpen ? (
                          <ChevronUpIcon
                            className="h-5 w-5 shrink-0 text-[#0b7041]"
                            aria-hidden
                          />
                        ) : (
                          <ChevronDownIcon
                            className="h-5 w-5 shrink-0 text-[#0b7041]/70"
                            aria-hidden
                          />
                        )}
                      </button>
                      <div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        hidden={!isOpen}
                        className="border-t border-[#e8e8e8] bg-white"
                      >
                        <div className="px-4 py-4 text-[16px] leading-relaxed text-gray-600 sm:px-5 sm:py-[18px]">
                          {item.answer}
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sağ: yuvarlak köşeli kart + görsel (absolute img akışta genişlik vermez; sütun genişliği şart) */}
          <div className="hidden w-full max-w-[576px] shrink-0 justify-center lg:ml-auto lg:flex lg:justify-end">
            <div className="relative aspect-[576/648] w-full overflow-hidden rounded-[32px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
              <Image
                id="faqImage"
                src={faqImageSrc}
                alt="Sıkça sorulan sorular görseli"
                width={576}
                height={648}
                className="absolute inset-0 h-full w-full object-cover object-top scale-[1.12] translate-y-[7%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
