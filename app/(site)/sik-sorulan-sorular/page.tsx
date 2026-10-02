import PageHeader from "@/app/components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";
import SssFaq from "@/app/components/SssFaq";
import SikSorulanSorularJsonLd from "@/app/components/seo/SikSorulanSorularJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Sıkça Sorulan Sorular | Konsept Ofis" },
  description:
    "Sanal ofis yasal mı? Stopaj ödenir mi? Kargo ve tebligatlar nasıl teslim alınır? Sanal ofis ve yıllık abonelerimize saatlik makam odası, toplantı odası kullanımı hakkında merak ettiğiniz tüm cevaplar burada.",
  alternates: { canonical: "/sik-sorulan-sorular" },
};

export const revalidate = 300;

export default function SssPage() {
  return (
    <>
      <SikSorulanSorularJsonLd />
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
            Sanal ofis, yıllık abonelerimize saatlik makam odası ve toplantı odası kullanımı ve yasal
            iş adresi süreçleriyle ilgili en sık sorulan soruları aşağıda
            bulabilirsiniz.
          </p>

          <div className="rounded-[8px] border border-[#e5e5e5] bg-white px-5 py-2 sm:px-7">
            <SssFaq />
          </div>

          <p className="mt-8 text-center text-[16px] leading-relaxed text-gray-600">
            Sorunuz burada yok mu?{" "}
            <Link
              href="/iletisim"
              className="font-medium text-[#0b7041] underline-offset-2 hover:underline"
            >
              İletişime geçin
            </Link>
          </p>
        </div>
      </section>
    </main>
    </>
  );
}
