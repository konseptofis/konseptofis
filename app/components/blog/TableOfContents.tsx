import type { TocItem } from "@/lib/headings";

type FAQItem = { question: string; answer: string };

type Props = {
  items: TocItem[];
  faqs?: FAQItem[] | null;
};

export default function TableOfContents({ items, faqs }: Props) {
  const hasFaqs = faqs && faqs.length > 0;
  if (items.length === 0 && !hasFaqs) return null;

  return (
    <nav
      className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4"
      aria-label="İçindekiler"
    >
      <h2 className="mb-3 text-sm font-semibold text-gray-900">İçindekiler</h2>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 2 ? "" : item.level === 3 ? "pl-3" : "pl-6"}
          >
            <a
              href={`#${item.id}`}
              className="text-gray-600 hover:text-[#0b7041]"
            >
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
              Sıkça Sorulan Sorular
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
