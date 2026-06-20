import { SITE } from "@/app/lib/data";

export type BreadcrumbJsonLdItem = {
  label: string;
  href?: string;
};

const ORIGIN = SITE.domain.replace(/\/$/, "");

export function breadcrumbPageUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${ORIGIN}${normalized}`;
}

/** Hizmet detay ve diğer sayfalarda ortak BreadcrumbList düğümü. */
export function buildBreadcrumbListJsonLd(
  items: BreadcrumbJsonLdItem[],
  pageUrl: string,
): Record<string, unknown> {
  const itemListElement = items.map((crumb, index) => {
    const isLast = index === items.length - 1;
    const itemUrl = isLast
      ? pageUrl
      : crumb.href
        ? `${ORIGIN}${crumb.href}`
        : pageUrl;

    return {
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: itemUrl,
    };
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement,
  };
}
