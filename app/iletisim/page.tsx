import BreadcrumbSchema from "@/app/components/seo/BreadcrumbSchema";
import ContactPageStructuredData from "@/app/components/seo/ContactPageStructuredData";
import IletisimClient from "./IletisimClient";

export default function IletisimPage() {
  return (
    <>
      <ContactPageStructuredData />
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ]}
      />
      <IletisimClient />
    </>
  );
}
