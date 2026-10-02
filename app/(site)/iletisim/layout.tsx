import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "İletişim ve Adres Bilgileri | Konsept Ofis",
  },
  description:
    "Mahall Ankara Çankaya'daki merkezimize ulaşın. Sanal ofis hizmetimiz ve yıllık abonelerimize saatlik makam odası, toplantı odası kullanımı için bizimle hemen iletişime geçin.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
