export type ServiceOfferCard = {
  id: string;
  title: string;
  image: string;
  badge: string;
  description: string;
  href: string;
  priceLabel: string;
};

/** Anasayfa ve Hizmetlerimiz sayfası — aynı kart içerikleri ve görseller */
export const SERVICE_OFFER_CARDS: ServiceOfferCard[] = [
  {
    id: "sanal-ofis",
    title: "Sanal Ofis",
    image: "/mahall-sanal-ofis-ankara-konsept-ofis.webp",
    badge: "En popüler",
    description:
      "Ankara'da vergi levhası ve ticaret sicil adresi. NACE uyumlu, stopajsız ofis kiralama seçenekleri.",
    href: "/sanal-ofis",
    priceLabel: "299 TL / ay'dan",
  },
  {
    id: "makam-odasi",
    title: "Makam Odası",
    image: "/sanal-ofis-konsept-ofis.webp",
    badge: "Günlük & aylık",
    description:
      "Çankaya'da tam donanımlı, prestijli birimler. Kurumsal görüşmeler için profesyonel ortam.",
    href: "/makam-odasi",
    priceLabel: "Esnek kiralama",
  },
  {
    id: "toplanti-odasi",
    title: "Toplantı Odası",
    image: "/toplanti-odasi-konsept-ofis.webp",
    badge: "Saatlik rezervasyon",
    description:
      "Müşteri ve ekip toplantıları için saatlik rezervasyonlu odalar. Net fiyat, gizli maliyet yok.",
    href: "/toplanti-odasi",
    priceLabel: "150 TL / saat'ten",
  },
];
