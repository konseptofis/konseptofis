import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Mahall Sanal Ofis",
        url: `${ORIGIN}/hizmetler/mahall-sanal-ofis`,
        description:
          "Ankara'da vergi levhası ve ticaret sicil adresi. NACE uyumlu, stopajsız sanal ofis kiralama seçenekleri.",
        provider: {
          "@type": "Organization",
          name: SITE.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Toplantı Odası",
        url: `${ORIGIN}/hizmetler/toplanti-odasi-hizmeti`,
        description:
          "Müşteri ve ekip toplantıları için saatlik rezervasyonlu, tam donanımlı toplantı odaları.",
        provider: {
          "@type": "Organization",
          name: SITE.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Makam Odası",
        url: `${ORIGIN}/hizmetler/makam-odasi-hizmeti`,
        description:
          "Üst düzey görüşmeler ve müşteri sunumları için prestijli, donanımlı makam odası kiralama; Mahall Ankara.",
        provider: {
          "@type": "Organization",
          name: SITE.name,
        },
      },
    },
  ],
};

/** Hizmetler genel liste (`/hizmetlerimiz`): ItemList + Service öğeleri. */
export default function HizmetlerimizItemListJsonLd() {
  return (
    <script
      id="ld-json-hizmetlerimiz-itemlist"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
    />
  );
}
