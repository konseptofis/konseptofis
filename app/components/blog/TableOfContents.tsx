"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import type { TocItem } from "@/lib/headings";

type FAQItem = { question: string; answer: string };

type Props = {
  items: TocItem[];
  faqs?: FAQItem[] | null;
};

type TocNode = {
  item: TocItem;
  number: string;
  children: TocNode[];
};

/** H2 → 1, H3 → 1.1, H4 → 1.1.1 (denemesite rehber TOC ile aynı hiyerarşi). */
function buildTocTree(items: TocItem[]): TocNode[] {
  const tree: TocNode[] = [];
  let h2Count = 0;
  let lastH2: TocNode | null = null;
  let lastH3: TocNode | null = null;

  for (const item of items) {
    if (item.level === 2) {
      h2Count += 1;
      lastH3 = null;
      const node: TocNode = { item, number: String(h2Count), children: [] };
      tree.push(node);
      lastH2 = node;
      continue;
    }

    if (item.level === 3) {
      if (lastH2) {
        const h3Idx = lastH2.children.length + 1;
        const node: TocNode = { item, number: `${lastH2.number}.${h3Idx}`, children: [] };
        lastH2.children.push(node);
        lastH3 = node;
      } else {
        h2Count += 1;
        const node: TocNode = { item, number: String(h2Count), children: [] };
        tree.push(node);
        lastH2 = node;
        lastH3 = null;
      }
      continue;
    }

    if (lastH3) {
      const h4Idx = lastH3.children.length + 1;
      lastH3.children.push({ item, number: `${lastH3.number}.${h4Idx}`, children: [] });
    } else if (lastH2) {
      const idx = lastH2.children.length + 1;
      lastH2.children.push({ item, number: `${lastH2.number}.${idx}`, children: [] });
    } else {
      h2Count += 1;
      const node: TocNode = { item, number: String(h2Count), children: [] };
      tree.push(node);
      lastH2 = node;
    }
  }

  return tree;
}

function TocLink({ node }: { node: TocNode }) {
  return (
    <li>
      <a
        href={`#${node.item.id}`}
        className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 text-gray-600 break-words hover:text-[#0b7041]"
      >
        <span className="shrink-0 font-medium tabular-nums text-gray-500">{node.number}.</span>
        <span>{node.item.text}</span>
      </a>
      {node.children.length > 0 ? (
        <ul className="mt-1.5 space-y-1.5 pl-4">
          {node.children.map((child) => (
            <TocLink key={child.item.id} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function TableOfContents({ items, faqs }: Props) {
  const [open, setOpen] = useState(true);
  const hasFaqs = faqs && faqs.length > 0;
  if (items.length === 0 && !hasFaqs) return null;

  const tree = buildTocTree(items);
  const nextTopNumber = tree.length + 1;

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
          {tree.map((node) => (
            <TocLink key={node.item.id} node={node} />
          ))}
          {hasFaqs && (
            <li>
              <a
                href="#sikca-sorulan-sorular"
                className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 text-gray-600 break-words hover:text-[#0b7041]"
              >
                <span className="shrink-0 font-medium tabular-nums text-gray-500">{nextTopNumber}.</span>
                <span>Sıkça Sorulan Sorular</span>
              </a>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
