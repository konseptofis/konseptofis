import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${ORIGIN}/blog/#blog`,
  url: `${ORIGIN}/blog`,
  name: "Blog | Konsept Ofis",
  description:
    "Şirket kuruluş maliyetleri, sanal ofis avantajları, e-ticaret vergi rehberi ve girişimcilik ekosistemi hakkında uzman onaylı en güncel makaleler.",
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
