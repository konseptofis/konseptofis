import { toSlug } from "./slug";

export type TocItem = { level: 2 | 3 | 4; text: string; id: string };

const HEADING_RE = /<h([234])>([\s\S]*?)<\/h\1>/gi;

function getText(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function processHeadings(html: string): { html: string; items: TocItem[] } {
  const items: TocItem[] = [];
  const countByBase: Record<string, number> = {};

  const htmlWithIds = html.replace(HEADING_RE, (_, levelStr, inner) => {
    const level = Number(levelStr) as 2 | 3 | 4;
    const text = getText(inner);
    const base = toSlug(text) || "section";
    const n = (countByBase[base] = (countByBase[base] ?? 0) + 1);
    const id = n === 1 ? base : `${base}-${n}`;
    items.push({ level, text, id });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html: htmlWithIds, items };
}
