export type ServiceOfferCard = {
  id: string;
  title: string;
  image: string;
  badge: string;
  description: string;
  href: string;
};

/** Anasayfa ve hizmetler listesi grid’inde gösterilen kartlar. */
export const SERVICE_OFFER_CARDS: ServiceOfferCard[] = [
  {
    id: "cankaya-sanal-ofis",
    title: "Çankaya Sanal Ofis",
    image: "/mahall-sanal-ofis-ankara-konsept-ofis.webp",
    badge: "En popüler",
    description:
      "Ankara'da vergi levhası ve ticaret sicil adresi. NACE uyumlu, stopajsız ofis kiralama seçenekleri.",
    href: "/hizmetlerimiz/cankaya-sanal-ofis",
  },
  {
    id: "toplanti-odasi",
    title: "Toplantı Odası",
    image: "/toplanti-odasi-konsept-ofis.webp",
    badge: "Saatlik rezervasyon",
    description:
      "Müşteri ve ekip toplantıları için saatlik rezervasyonlu odalar. Net fiyat, gizli maliyet yok.",
    href: "/hizmetlerimiz/toplanti-odasi-kiralama",
  },
  {
    id: "makam-odasi",
    title: "Makam Odası",
    image: "/cankaya-sanal-ofis-kapak.png",
    badge: "Prestijli alan",
    description:
      "Üst düzey görüşmeler ve müşteri sunumları için ferah, konforlu makam birimleri. Mahall Ankara'da kurumsal imaj.",
    href: "/hizmetlerimiz/makam-odasi-kiralama",
  },
  {
    id: "hazir-ofis",
    title: "Hazır Ofis",
    image: "/ankara-hazir-ofis-kapak.png",
    badge: "Günlük & aylık",
    description:
      "Mobilya ve altyapı hazır çalışma birimleri. Çankaya'da esnek günlük veya aylık kiralama; net fiyat, gizli maliyet yok.",
    href: "/hizmetlerimiz/hazir-ofis-kiralama",
  },
];

/** Fiyatlar JSON-LD ve hazır ofis detay şema yedek görseli için (grid kartıyla aynı). */
export const HAZIR_OFIS_PLAN_CARD: ServiceOfferCard = SERVICE_OFFER_CARDS[3]!;
