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
      className="max-w-sm w-full rounded-lg border border-gray-200 bg-transparent px-4 py-4"
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
        <ul className="mt-3 space-y-1.5 text-sm">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={item.level === 2 ? "" : item.level === 3 ? "pl-3" : "pl-6"}
            >
              <a
                href={`#${item.id}`}
                className="text-gray-600 hover:text-[#0b7041]"
              >
                <span className="mr-1.5 font-medium tabular-nums text-gray-500">{index + 1}.</span>
                {item.text}
              </a>
            </li>
          ))}
          {hasFaqs && (
            <li>
              <a
                href="#sikca-sorulan-sorular"
                className="text-gray-600 hover:text-[#0b7041]"
              >
                <span className="mr-1.5 font-medium tabular-nums text-gray-500">{items.length + 1}.</span>
                Sıkça Sorulan Sorular
              </a>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
