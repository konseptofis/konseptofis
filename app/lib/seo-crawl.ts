export type CrawlLink = {
  href: string;
  anchor: string;
  nofollow: boolean;
};

export type CrawlPageResult = {
  url: string;
  status: number;
  location?: string;
  contentType?: string;
  title?: string;
  canonical?: string;
  noindex: boolean;
  links: CrawlLink[];
  error?: string;
  ms: number;
};

const ENTITY_MAP: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export function decodeEntities(input: string): string {
  return input.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1]?.toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return ENTITY_MAP[code.toLowerCase()] ?? match;
  });
}

function attr(attrs: string, name: string): string | undefined {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!m) return undefined;
  return decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
}

function cleanText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function anchorText(inner: string, attrs: string): string {
  const text = cleanText(inner);
  if (text) return text;
  const aria = attr(attrs, "aria-label");
  if (aria) return aria.trim();
  const imgAlt = inner.match(/<img\b[^>]*\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
  const alt = imgAlt ? decodeEntities(imgAlt[2] ?? imgAlt[3] ?? "").trim() : "";
  if (imgAlt) return alt ? `[görsel] ${alt}` : "[görsel, alt yok]";
  return "";
}

export function parseHtml(html: string, baseUrl: string) {
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");

  const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1] ?? "") : undefined;

  let canonical: string | undefined;
  let noindex = false;
  for (const m of body.matchAll(/<(link|meta)\b([^>]*)>/gi)) {
    const attrs = m[2] ?? "";
    if (m[1]!.toLowerCase() === "link" && attr(attrs, "rel")?.toLowerCase() === "canonical") {
      const href = attr(attrs, "href");
      if (href) {
        try {
          canonical = new URL(href, baseUrl).toString();
        } catch {
          canonical = href;
        }
      }
    }
    if (m[1]!.toLowerCase() === "meta" && attr(attrs, "name")?.toLowerCase() === "robots") {
      if (/noindex/i.test(attr(attrs, "content") ?? "")) noindex = true;
    }
  }

  const links: CrawlLink[] = [];
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = m[1] ?? "";
    const raw = attr(attrs, "href")?.trim();
    if (!raw || raw.startsWith("#") || /^(mailto|tel|javascript|sms|whatsapp):/i.test(raw)) continue;
    let href: string;
    try {
      const u = new URL(raw, baseUrl);
      if (u.protocol !== "http:" && u.protocol !== "https:") continue;
      u.hash = "";
      href = u.toString();
    } catch {
      continue;
    }
    links.push({
      href,
      anchor: anchorText(m[2] ?? "", attrs),
      nofollow: /\bnofollow\b/i.test(attr(attrs, "rel") ?? ""),
    });
  }

  return { title, canonical, noindex, links };
}

export function parseSitemapUrls(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => decodeEntities(m[1] ?? ""));
}
