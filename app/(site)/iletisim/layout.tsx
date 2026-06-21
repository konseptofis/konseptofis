import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "İletişim ve Adres Bilgileri | Konsept Ofis",
  },
  description:
    "Mahall Ankara Çankaya'daki merkezimize ulaşın. Sanal ofis, hazır ofis ve toplantı odası kiralama hizmetlerimiz için bizimle hemen iletişime geçin.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
