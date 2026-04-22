import { SITE } from "@/app/lib/data";

export type BreadcrumbSchemaItem = {
  name: string;
  /** Yoksa veya son öğe ise mevcut sayfa kabul edilir; yine de url verilebilir. */
  path?: string;
};

type Props = { items: BreadcrumbSchemaItem[] };

export default function BreadcrumbSchema({ items }: Props) {
  if (!items.length) return null;

  const itemListElement = items.map((item, index) => {
    const position = index + 1;
    const url = item.path != null ? `${SITE.domain}${item.path}` : undefined;
    const base: { "@type": "ListItem"; position: number; name: string; item?: string } = {
      "@type": "ListItem",
      position,
      name: item.name,
    };
    if (url) base.item = url;
    return base;
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
