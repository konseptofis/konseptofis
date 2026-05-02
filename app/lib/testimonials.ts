/** Anasayfa müşteri yorumları — UI kartları için ortak metinler. */
export const HOMEPAGE_TESTIMONIALS = [
  {
    initials: "BÇ",
    name: "Berkan Çevre",
    role: "Serbest Avukat",
    text: "Avukat sanal ofis arayışımda en iyi lokasyon burasıydı. Baro kaydımı hemen Mahall Ankara'ya aldırdım. Tebligatlarım güvenle teslim alınıyor. Meslektaşlarıma öneririm.",
    /** ISO 8601 — Review / snippet için */
    datePublished: "2025-10-08",
  },
  {
    initials: "BB",
    name: "Berat Bozkurt",
    role: "Uzman Diyetisyen",
    text: "Online diyetisyen olarak fiziksel ofise ihtiyacım yoktu. Yasal adresimi buraya taşıdım. Yüz yüze görüşmelerim için toplantı odalarını kullanıyorum, çok prestijli bir yer.",
    datePublished: "2025-10-22",
  },
  {
    initials: "EE",
    name: "Engin Eryılmaz",
    role: "Klinik Psikolog",
    text: "Online terapi ağırlıklı çalışıyorum. Ev adresimi gizlemek için yasal adres hizmeti aldım. Nadir de olsa yüz yüze seanslar için sağladıkları toplantı odaları harika.",
    datePublished: "2025-11-14",
  },
  {
    initials: "FA",
    name: "Furkan Altay",
    role: "E-Ticaret Kurucusu",
    text: "Sürekli kargo ve resmi tebligat alıyorum. Evraklarım resepsiyonda güvenle teslim alınıp anında WhatsApp'tan bildiriliyor. E-ticaret operasyon yükümü tamamen sıfırladılar.",
    datePublished: "2025-12-03",
  },
] as const;

export type HomepageTestimonial = (typeof HOMEPAGE_TESTIMONIALS)[number];
