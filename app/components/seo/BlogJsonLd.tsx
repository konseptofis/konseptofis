import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${ORIGIN}/blog/#blog`,
  url: `${ORIGIN}/blog`,
  name: "Konsept Ofis Blog | Sanal Ofis ve Girişimcilik Rehberi",
  description:
    "Şirket kuruluşu, sanal ofis avantajları, stopaj muafiyeti, yasal adres ve e-ticaret hakkında en güncel bilgiler, ipuçları ve rehberler.",
  publisher: {
    "@type": "Organization",
    "@id": `${ORIGIN}/#organization`,
    name: SITE.name,
    logo: {
      "@type": "ImageObject",
      url: `${ORIGIN}/ankara-sanal-ofis-logo.webp`,
    },
  },
  inLanguage: "tr-TR",
};

/** Blog liste sayfası (`/blog`): Blog şeması. */
export default function BlogJsonLd() {
  return (
    <script
      id="ld-json-blog-index"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
    />
  );
}
