"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import type { TocItem } from "@/lib/headings";

type FAQItem = { question: string; answer: string };

type Props = {
  items: TocItem[];
  faqs?: FAQItem[] | null;
};

export default function TableOfContents({ items, faqs }: Props) {
  const [open, setOpen] = useState(true);
  const hasFaqs = faqs && faqs.length > 0;
  if (items.length === 0 && !hasFaqs) return null;

  return (
    <nav
      className="w-fit max-w-full rounded-lg border border-gray-200 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm"
      aria-label="İçindekiler"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[18px] font-semibold text-gray-900">İçindekiler</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label={open ? "İçindekileri kapat" : "İçindekileri aç"}
        >
          {open ? (
            <EyeSlashIcon className="h-5 w-5" aria-hidden />
          ) : (
            <EyeIcon className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>
      {open && (
        <ul className="mt-3 max-w-full space-y-1.5 text-sm">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={item.level === 2 ? "" : item.level === 3 ? "pl-3" : "pl-6"}
            >
              <a
                href={`#${item.id}`}
                className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 text-gray-600 break-words hover:text-[#0b7041]"
              >
                <span className="shrink-0 font-medium tabular-nums text-gray-500">
                  {index + 1}.
                </span>
                <span>{item.text}</span>
              </a>
            </li>
          ))}
          {hasFaqs && (
            <li>
              <a
                href="#sikca-sorulan-sorular"
                className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 text-gray-600 break-words hover:text-[#0b7041]"
              >
                <span className="shrink-0 font-medium tabular-nums text-gray-500">
                  {items.length + 1}.
                </span>
                <span>Sıkça Sorulan Sorular</span>
              </a>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
