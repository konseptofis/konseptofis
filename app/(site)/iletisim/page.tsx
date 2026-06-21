import IletisimClient from "./IletisimClient";
import IletisimJsonLd from "@/app/components/seo/IletisimJsonLd";

export default function IletisimPage() {
  return (
    <>
      <IletisimJsonLd />
      <IletisimClient />
    </>
  );
}
