import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "İletişim - Konsept Ofis",
  },
  description:
    "Sanal ofis, makam odası ve toplantı odası çözümleri için Konsept Ofis ile iletişime geçin. Profesyonel çalışma alanlarımız hakkında hemen bilgi alın.",
};

export default function IletisimLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
