import {
  SCHEMA_BASE_URL,
  SCHEMA_LOCAL_BUSINESS_ID,
} from "@/app/lib/data";
import { localBusinessNode } from "@/app/lib/schema-nodes";

/** İletişim sayfası: ContactPage + tam LocalBusiness (harita, posta kodu, müşteri hattı) */
export default function ContactPageStructuredData() {
  const contactPage = {
    "@type": "ContactPage",
    "@id": `${SCHEMA_BASE_URL}/iletisim#webpage`,
    url: `${SCHEMA_BASE_URL}/iletisim`,
    name: "İletişim — Konsept Ofis",
    description:
      "Konsept Ofis iletişim: Mahall Ankara Çankaya adresi, telefon, e-posta ve iletişim formu.",
    about: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
    mainEntity: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
  };

  const graph = [contactPage, localBusinessNode()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
