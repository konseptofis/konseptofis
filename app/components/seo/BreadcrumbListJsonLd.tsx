import {
  buildBreadcrumbListJsonLd,
  breadcrumbPageUrl,
  type BreadcrumbJsonLdItem,
} from "@/app/lib/breadcrumb-jsonld";

type Props = {
  items: BreadcrumbJsonLdItem[];
  pagePath: string;
  id?: string;
};

/** Tekil BreadcrumbList JSON-LD (yasal ve kurumsal sayfalar). */
export default function BreadcrumbListJsonLd({ items, pagePath, id = "ld-json-breadcrumb" }: Props) {
  const pageUrl = breadcrumbPageUrl(pagePath);
  const jsonLd = {
    "@context": "https://schema.org",
    ...buildBreadcrumbListJsonLd(items, pageUrl),
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
