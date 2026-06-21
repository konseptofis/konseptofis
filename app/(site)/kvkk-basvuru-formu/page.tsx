import KvkkBasvuruClient from "./KvkkBasvuruClient";
import BreadcrumbListJsonLd from "@/app/components/seo/BreadcrumbListJsonLd";

export const metadata = {
  title: { absolute: "KVKK Başvuru Formu | Konsept Ofis" },
  description:
    "6698 sayılı KVKK kapsamında kişisel veri sahibi başvuru formu. Taleplerinizi güvenle iletin.",
  alternates: { canonical: "/kvkk-basvuru-formu" },
};

export default function KvkkBasvuruFormuPage() {
  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK Başvuru Formu" },
        ]}
        pagePath="/kvkk-basvuru-formu"
        id="ld-json-breadcrumb-kvkk-basvuru-formu"
      />
      <KvkkBasvuruClient />
    </>
  );
}
