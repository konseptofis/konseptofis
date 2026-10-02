export type ServiceOfferCard = {
  id: string;
  title: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  description: string;
  href: string;
};

/** Anasayfa ve hizmetler listesi grid’inde gösterilen kartlar. */
export const SERVICE_OFFER_CARDS: ServiceOfferCard[] = [
  {
    id: "cankaya-sanal-ofis",
    title: "Çankaya Sanal Ofis",
    image: "/mahall-sanal-ofis-ankara-konsept-ofis.webp",
    description:
      "Çankaya'da vergi levhası ve ticaret sicil adresi. NACE uyumlu, stopajsız ofis kiralama seçenekleri.",
    href: "/hizmetlerimiz/cankaya-sanal-ofis",
  },
  {
    id: "toplanti-odasi",
    title: "Toplantı Odası",
    image: "/toplanti-odasi-konsept-ofis.webp",
    badge: "Saatlik rezervasyon",
    description:
      "Yıllık sanal ofis abonelerine saatlik rezervasyonlu toplantı odaları. Net fiyat, gizli maliyet yok.",
    href: "/hizmetlerimiz/toplanti-odasi-kiralama",
  },
  {
    id: "makam-odasi",
    title: "Makam Odası",
    image: "/assets/images/mahall-slider/ankara-hazir-ofis.webp",
    imageAlt: "Konsept Ofis makam odası – Mahall Ankara",
    badge: "Saatlik rezervasyon",
    description:
      "Yıllık sanal ofis abonelerine saatlik, prestijli makam odası. Üst düzey görüşmeler için Mahall Ankara'da kurumsal imaj.",
    href: "/hizmetlerimiz/makam-odasi-kiralama",
  },
];
