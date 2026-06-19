import KvkkBasvuruClient from "./KvkkBasvuruClient";

export const metadata = {
  title: "KVKK Başvuru Formu - Konsept Ofis",
  description:
    "6698 sayılı KVKK kapsamında kişisel veri sahibi başvuru formu. Taleplerinizi güvenle iletin.",
  alternates: { canonical: "/kvkk-basvuru-formu" },
};

export default function KvkkBasvuruFormuPage() {
  return <KvkkBasvuruClient />;
}
