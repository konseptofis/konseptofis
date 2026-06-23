import { SITE } from "@/app/lib/data";

export type AnalyzedLink = {
  id: string;
  anchor: string;
  href: string;
  displayTarget: string;
  isInternal: boolean;
  hasNofollow: boolean;
};

export type LinkAnalysisWarning = {
  kind: "no-internal" | "duplicate" | "external-no-nofollow" | "generic-anchor";
  message: string;
  severity: "warning" | "info";
};

export type LinkAnalysisResult = {
  internal: AnalyzedLink[];
  external: AnalyzedLink[];
  warnings: LinkAnalysisWarning[];
};

const SITE_HOST = new URL(SITE.domain).hostname.replace(/^www\./i, "");

const GENERIC_ANCHORS = new Set([
  "buraya tıkla",
  "tıkla",
  "tıklayın",
  "tıklayin",
  "devamı",
  "devami",
  "daha fazla",
  "link",
  "burası",
  "burasi",
  "here",
  "click here",
  "read more",
  "more",
]);

const SKIP_PREFIXES = ["mailto:", "tel:", "javascript:"];

function hasNofollow(rel: string | null): boolean {
  if (!rel) return false;
  return rel.toLowerCase().split(/\s+/).includes("nofollow");
}

function isGenericAnchor(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return GENERIC_ANCHORS.has(trimmed.toLocaleLowerCase("tr-TR"));
}

export function isInternalHref(href: string): boolean {
  const raw = href.trim();
  if (!raw) return false;
  if (SKIP_PREFIXES.some((p) => raw.toLowerCase().startsWith(p))) return false;
  if (raw.startsWith("#")) return true;
  if (raw.startsWith("/") && !raw.startsWith("//")) return true;

  try {
    const url = new URL(raw, SITE.domain);
    const host = url.hostname.replace(/^www\./i, "");
    return host === SITE_HOST;
  } catch {
    return false;
  }
}

export function normalizeLinkTarget(href: string): string {
  const raw = href.trim();
  if (!raw) return raw;
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    const path = raw.split("#")[0]?.split("?")[0] ?? raw;
    return path || "/";
  }
  try {
    const url = new URL(raw, SITE.domain);
    const host = url.hostname.replace(/^www\./i, "");
    if (host === SITE_HOST) {
      return url.pathname || "/";
    }
    return url.href;
  } catch {
    return raw;
  }
}

function displayTarget(href: string, internal: boolean): string {
  const raw = href.trim();
  if (internal) {
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw.split("#")[0]?.split("?")[0] || raw;
    try {
      const url = new URL(raw, SITE.domain);
      return url.pathname + url.search + url.hash;
    } catch {
      return raw;
    }
  }
  return raw;
}

export function analyzeLinksFromHtml(html: string): LinkAnalysisResult {
  if (typeof document === "undefined") {
    return { internal: [], external: [], warnings: [] };
  }

  const doc = new DOMParser().parseFromString(html || "", "text/html");
  const anchors = Array.from(doc.querySelectorAll("a[href]"));

  const internal: AnalyzedLink[] = [];
  const external: AnalyzedLink[] = [];
  const targetCounts = new Map<string, number>();
  const genericAnchors: string[] = [];
  let externalWithoutNofollow = 0;

  anchors.forEach((node, index) => {
    const href = node.getAttribute("href")?.trim() ?? "";
    if (!href || SKIP_PREFIXES.some((p) => href.toLowerCase().startsWith(p))) return;

    const anchor = (node.textContent ?? "").replace(/\s+/g, " ").trim();
    const rel = node.getAttribute("rel");
    const internalLink = isInternalHref(href);
    const normalized = normalizeLinkTarget(href);
    const item: AnalyzedLink = {
      id: `${index}-${href}`,
      anchor: anchor || "(boş)",
      href,
      displayTarget: displayTarget(href, internalLink),
      isInternal: internalLink,
      hasNofollow: hasNofollow(rel),
    };

    if (internalLink) {
      internal.push(item);
    } else {
      external.push(item);
      if (!item.hasNofollow) externalWithoutNofollow += 1;
    }

    targetCounts.set(normalized, (targetCounts.get(normalized) ?? 0) + 1);

    if (isGenericAnchor(anchor)) {
      genericAnchors.push(anchor || "(boş)");
    }
  });

  const warnings: LinkAnalysisWarning[] = [];
  const hasText = (doc.body.textContent ?? "").trim().length > 0;
  const totalLinks = internal.length + external.length;

  if (internal.length === 0 && (totalLinks > 0 || hasText)) {
    warnings.push({
      kind: "no-internal",
      severity: "warning",
      message:
        "Bu yazıda hiç iç link yok. SEO için kendi sayfalarınıza link vermeniz önerilir.",
    });
  }

  for (const [target, count] of targetCounts) {
    if (count >= 2) {
      warnings.push({
        kind: "duplicate",
        severity: "warning",
        message: `${target} sayfasına ${count} kez link verilmiş`,
      });
    }
  }

  if (externalWithoutNofollow > 0) {
    warnings.push({
      kind: "external-no-nofollow",
      severity: "info",
      message: `${externalWithoutNofollow} dış link nofollow değil`,
    });
  }

  const uniqueGeneric = [...new Set(genericAnchors)];
  for (const text of uniqueGeneric) {
    warnings.push({
      kind: "generic-anchor",
      severity: "info",
      message: `Açıklayıcı olmayan anchor metni: '${text}'`,
    });
  }

  return { internal, external, warnings };
}
