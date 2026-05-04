import PageHeader from "@/app/components/PageHeader";
import type { Metadata } from "next";
import AccordionFAQ from "@/app/components/AccordionFAQ";
import { FAQ_ITEMS } from "@/app/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Sıkça Sorulan Sorular | Konsept Ofis" },
  description:
    "Sanal ofis yasal mı? Stopaj ödenir mi? Kargo ve tebligatlar nasıl teslim alınır? Sanal ve hazır ofisler hakkında merak ettiğiniz tüm cevaplar burada.",
  alternates: { canonical: "/sik-sorulan-sorular" },
};

export default function SssPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="Sık Sorulan Sorular"
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "Sık Sorulan Sorular" },
        ]}
      />

      <section
        className="bg-white px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12"
        aria-labelledby="sss-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="sss-heading"
            className="mb-4 flex items-center gap-3 text-left text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            <span
              className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8"
              aria-hidden
            />
            Merak Edilenler
          </h2>
          <p className="mb-8 max-w-3xl text-left leading-relaxed text-gray-600">
            Sanal ofis, hazır ofis, toplantı odası kiralama ve yasal iş adresi
            süreçleriyle ilgili en sık sorulan soruları aşağıda
            bulabilirsiniz.
          </p>

          <div className="rounded-[8px] border border-[#e5e5e5] bg-white px-5 py-2 sm:px-7">
            <AccordionFAQ items={FAQ_ITEMS} idPrefix="sss-page" />
          </div>
        </div>
      </section>
    </main>
  );
}
