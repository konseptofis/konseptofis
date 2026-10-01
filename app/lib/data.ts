/**
 * SSS, iletişim ve site geneli için ortak veri.
 */

export const SITE = {
  name: "Konsept Ofis",
  /** Google Business Profile'daki işletme adı (JSON-LD name ile birebir). */
  gbpName:
    "Konsept Ofis | Sanal Ofis - Hazır Ofis - Toplantı Odası Kiralama Hizmetleri",
  domain: "https://konseptofis.com",
  phone: "0 (312) 911 95 57",
  phoneRaw: "903129119557",
  phoneHref: "tel:+903129119557",
  email: "iletisim@konseptofis.com",
  address: {
    line1: "Mahall Ankara, Mustafa Kemal, Dumlupınar Blv. No:274/2",
    line2: "C2 Blok No:47",
    locality: "Çankaya",
    city: "Ankara",
    country: "TR",
    postalCode: "06570",
    streetAddress: "Mahall Ankara, Mustafa Kemal, Dumlupınar Blv. No:274/2 C2 Blok No:47",
    display:
      "Mahall Ankara, Mustafa Kemal, Dumlupınar Blv. No:274/2 C2 Blok No:47, 06570 Çankaya/Ankara",
    full: "Mahall Ankara, Mustafa Kemal, Dumlupınar Blv. No:274/2 C2 Blok No:47, 06570 Çankaya/Ankara",
  },
  /** WhatsApp numarası (ülke kodu, + yok). Tüm wa.me linkleri buradan. */
  whatsapp: "905465250563",
  hours: {
    label: "Çalışma saatleri",
    value: "Her gün 09:00–18:00",
    display: "Çalışma saatleri: Her gün 09:00–18:00",
    opens: "09:00",
    closes: "18:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] as const,
  },
  reviews: {
    rating: "5.0",
    count: 13,
  },
  social: {
    instagram: "https://www.instagram.com/konseptofis/",
    facebook: "https://www.facebook.com/profile.php?id=61572999246300",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.465236530671!2d32.75086257648828!3d39.908603686408135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad33dfbbdecf2279%3A0x873a63ff266a8b3d!2sKonsept%20Ofis%20%7C%20Sanal%20Ofis%20-%20Haz%C4%B1r%20Ofis%20-%20Toplant%C4%B1%20Odas%C4%B1%20Kiralama%20Hizmetleri!5e0!3m2!1str!2str!4v1776771148030!5m2!1str!2str",
  directionsUrl: "https://maps.app.goo.gl/Lk1V32cY8ji77A5e7",
  gbpReviewsUrl: "https://maps.app.goo.gl/Lk1V32cY8ji77A5e7",
  /** GBP / harita embed merkezi. */
  geo: {
    lat: 39.9086,
    lng: 32.7509,
  },
  sameAs: [
    "https://www.instagram.com/konseptofis/",
    "https://www.facebook.com/profile.php?id=61572999246300",
    "https://maps.app.goo.gl/Lk1V32cY8ji77A5e7",
  ],
} as const;

/** Tüm WhatsApp CTA'ları bu href'i kullanır; numara `SITE.whatsapp`. */
export function siteWhatsAppHref(): string {
  return `https://wa.me/${SITE.whatsapp}`;
}

export function siteReviewsLabel(): string {
  return `\u2605 ${SITE.reviews.rating} · ${SITE.reviews.count} Google yorumu`;
}

export type HomepageGoogleReview = {
  name: string;
  initials: string;
  text: string;
  date: string;
};

/** Anasayfa Google yorum kartları — metin/isim GBP ile güncellenecek. */
export const HOMEPAGE_GOOGLE_REVIEWS: readonly HomepageGoogleReview[] = [
  {
    initials: "BÇ",
    name: "Berkan Çevre",
    text: "Avukat sanal ofis arayışımda en iyi lokasyon burasıydı. Baro kaydımı hemen Mahall Ankara'ya aldırdım. Tebligatlarım güvenle teslim alınıyor. Meslektaşlarıma öneririm.",
    date: "",
  },
  {
    initials: "BB",
    name: "Berat Bozkurt",
    text: "Online diyetisyen olarak fiziksel ofise ihtiyacım yoktu. Yasal adresimi buraya taşıdım. Yüz yüze görüşmelerim için toplantı odalarını kullanıyorum, çok prestijli bir yer.",
    date: "",
  },
  {
    initials: "EE",
    name: "Engin Eryılmaz",
    text: "Online terapi ağırlıklı çalışıyorum. Ev adresimi gizlemek için yasal adres hizmeti aldım. Nadir de olsa yüz yüze seanslar için sağladıkları toplantı odaları harika.",
    date: "",
  },
  {
    initials: "FA",
    name: "Furkan Altay",
    text: "Sürekli kargo ve resmi tebligat alıyorum. Evraklarım resepsiyonda güvenle teslim alınıp anında WhatsApp'tan bildiriliyor. E-ticaret operasyon yükümü tamamen sıfırladılar.",
    date: "",
  },
];

/** Schema.org GeoCoordinates — tüm LocalBusiness JSON-LD'lerde ortak. */
export function siteGeoJsonLd(): {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
} {
  return {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  };
}

/** Schema.org PostalAddress — GBP NAP ile birebir. */
export function sitePostalAddressJsonLd(): {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
} {
  return {
    "@type": "PostalAddress",
    streetAddress: SITE.address.streetAddress,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.city,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  };
}

/** Schema.org OpeningHoursSpecification — LocalBusiness JSON-LD. */
export function siteOpeningHoursJsonLd(): {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: readonly string[];
  opens: string;
  closes: string;
}[] {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
  ];
}

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Sanal ofis kullanmak yasal mıdır?",
    answer:
      "Evet. Sanal ofis hizmeti, Türk Ticaret Kanunu ve ilgili mevzuata uygun şekilde sunulmaktadır. Şirketinizin yasal iş adresi olarak sanal ofis adresini kullanmanız mümkündür.",
  },
  {
    question: "Vergi levhası adresi olarak gösterilebilir mi?",
    answer:
      "Evet. Konsept Ofis sanal ofis adresi, vergi levhası ve ticaret sicil adresi olarak kullanılabilir. Adres, resmi evraklarda ve Ticaret Sicil Gazetesi ilanlarında geçerli yasal iş adresi olarak kabul edilir.",
  },
  {
    question: "Stopajsız ofis kiralama nedir?",
    answer:
      "Uygun koşullarda, sanal ofis ve hazır ofis hizmetlerimiz stopaj kesintisi olmadan faturalandırılabilir. Detaylar için bizimle iletişime geçebilirsiniz.",
  },
  {
    question: "Toplantı odası saatlik kiralanabilir mi?",
    answer:
      "Evet. Toplantı odalarımız saatlik kiralanabilir. Randevu alarak ihtiyacınız olan saat diliminde kullanım sağlayabilirsiniz.",
  },
  {
    question: "Ankara dışından da sanal ofis alabilir miyim?",
    answer:
      "Evet. Türkiye genelinden şirketler, Ankara’daki yasal iş adresi için sanal ofis hizmetimizi kullanabilir. Evrak ve kurye hizmetleri ile entegre çalışıyoruz.",
  },
  {
    question: "Şirketime gelen posta ve kargolar nasıl takip ediliyor?",
    answer:
      "Şirketiniz adına gelen tüm kargo, posta ve resmi evraklar (tebligat vb.) profesyonel resepsiyon ekibimiz tarafından güvenle teslim alınır ve muhafaza edilir. Evraklarınız ulaştığı anda size anında e-posta veya WhatsApp üzerinden bilgi verilir. Dilerseniz gelen kargolarınız belirttiğiniz farklı bir adrese de yönlendirilebilir.",
  },
  {
    question: "Sanal ofis kiralama süreci ne kadar sürer, aynı gün yasal adres gösterebilir miyim?",
    answer:
      "Evet, sözleşme sürecimiz oldukça hızlıdır. Gerekli evrakları iletmenizin ardından dakikalar içinde sözleşmeniz hazırlanır. Sözleşme onaylandığı anda Ankara Çankaya'daki prestijli adresimizi yeni şirket kuruluşunuz veya adres değişikliğiniz için anında yasal iş adresi olarak göstermeye başlayabilirsiniz.",
  },
  {
    question: "Sanal ofis fiyatları ne kadar?",
    answer: "Aylık paket bedeli fiyatlar sayfasındadır; stopaj ve aidat yok.",
  },
  {
    question: "Vergi dairesi yoklamaya geldiğinde ne olur?",
    answer:
      "İşe başlama bildiriminden sonra vergi dairesi, beyan ettiğiniz adreste işyerinin bulunduğunu tespit etmek için yoklama yapar. Yoklama memuru adrese gelir, sözleşmeyi ve tabelayı/yönlendirmeyi kontrol eder. Sanal ofiste bu süreç sözleşmeniz ve resepsiyonumuz üzerinden yürür; yoklama tamamlandığında vergi levhanız Mahall Ankara adresiyle düzenlenir.",
  },
  {
    question: "Hangi faaliyetler için sanal ofis kullanılamaz?",
    answer:
      "Fiziksel işyeri gerektiren faaliyetler sanal ofis adresiyle yürütülemez: imalat ve üretim, gıda hazırlama, depolama, perakende mağaza, işyeri açma ve çalışma ruhsatı gerektiren hizmetler ile sağlık kuruluşu gibi denetime tabi fiziksel tesisler bunlara örnektir. Danışmanlık, yazılım, e-ticaret, aracılık, eğitim, serbest meslek ve benzeri faaliyetlerde sanal ofis adresi kullanılabilir.",
  },
  {
    question: "Sanal ofis için hangi belgeler gerekir?",
    answer:
      "Yeni şirket kuracaksanız kimlik fotokopisi, ikametgâh belgesi, iletişim bilgileri ve şirket türüne göre ana sözleşme taslağı/unvan bilgisi gerekir. Mevcut şirketinizi taşıyacaksanız vergi levhası, imza sirküleri, ticaret sicil gazetesi/faaliyet belgesi ve yetkili kimlik fotokopisi gerekir.",
  },
  {
    question: "Sanal ofis kira gideri olarak gösterilebilir mi?",
    answer:
      "Faturalı hizmettir, gider olarak kaydedilir; stopaj kesintisi yoktur.",
  },
  {
    question: "Toplantı odasını nasıl rezerve ederim?",
    answer:
      "WhatsApp veya telefon ile en az 1 gün önce rezervasyon yapılır; ücret saatliktir.",
  },
  {
    question: "Şahıs şirketi sanal ofis adresi kullanabilir mi?",
    answer:
      "Evet. Şahıs şirketi işe başlama bildiriminde sanal ofis adresinizi iş adresi olarak gösterebilirsiniz. Sanal ofis sözleşmeniz adres belgesi olarak sunulur, vergi dairesi yoklamayı bu adreste yapar ve vergi levhanız Mahall Ankara adresiyle düzenlenir.",
  },
];

export type FaqItem = { question: string; answer: string };

/** SSS cevaplarındaki fiyat cümleleri panel verisine bağlanır. */
export function faqItemsWithPrices(prices: {
  sanalMonthlyLabel: string;
  hourlyLabel: string;
}): FaqItem[] {
  return FAQ_ITEMS.map((item) => {
    if (item.question === "Sanal ofis fiyatları ne kadar?" && prices.sanalMonthlyLabel) {
      const hourly = prices.hourlyLabel
        ? `; toplantı/makam odası saatlik ${prices.hourlyLabel}`
        : "";
      return {
        ...item,
        answer: `Aylık ${prices.sanalMonthlyLabel}; stopaj ve aidat yok${hourly}.`,
      };
    }
    if (item.question === "Toplantı odasını nasıl rezerve ederim?" && prices.hourlyLabel) {
      return {
        ...item,
        answer: `WhatsApp veya telefon ile en az 1 gün önce rezervasyon yapılır; ücret saatlik ${prices.hourlyLabel}.`,
      };
    }
    return item;
  });
}

export const PRICING_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Fiyatlarınıza stopaj, aidat veya gizli ekstra masraflar dâhil mi?",
    answer:
      "Konsept Ofis olarak tamamen şeffaf bir fiyatlandırma politikası izliyoruz. Sanal ofis ve hazır ofis kiralama paketlerimizde stopaj vergisi ödemezsiniz, çünkü tarafınıza KDV'li hizmet faturası kesilir. Ayrıca bina aidatı, elektrik, su, yüksek hızlı internet, temizlik veya mutfak giderleri (sınırsız çay/kahve) gibi sürpriz maliyetlerle karşılaşmazsınız; hepsi aylık/yıllık fiyata dâhildir.",
  },
  {
    question: "Sanal ofis paketinizle yeni bir şirket kurabilir miyim? Yasal adres olarak geçerli mi?",
    answer:
      "Evet, kesinlikle. Sağladığımız prestijli adres; şahıs şirketi, limited (LTD) veya anonim şirket (AŞ) kuruluşları için Ticaret Odası ve Vergi Dairesi mevzuatlarına %100 uygundur. Şirket açılış sürecindeki vergi memurlarının adres yoklaması (denetimi) sırasında profesyonel ekibimiz sizi ofiste temsil eder ve yasal sürecin sorunsuz tamamlanmasını sağlar.",
  },
  {
    question: "Şirketime gelen kargo, posta ve resmî tebligatlar nasıl yönetiliyor?",
    answer:
      "Ankara Çankaya'daki yasal iş adresinize gelen tüm kargolar, evraklar ve resmî tebligatlar (noter, SGK, vergi dairesi vb.) sekreterya ekibimiz tarafından adınıza güvenle teslim alınır. Teslimat anında size e-posta veya mesaj yoluyla anında bildirim iletilir. Evraklarınızı dilediğiniz zaman ofisimizden teslim alabilirsiniz.",
  },
  {
    question: "Sözleşme süreleri ne kadar? Uzun vadeli taahhüt vermek zorunda mıyım?",
    answer:
      "İş modelinize ve bütçenize uygun esnek sözleşme seçenekleri sunuyoruz. Yıllık veya ihtiyaca göre belirlenen dönemsel paketlerle ilerleyebilir, yıllık taahhütlerde indirimli fiyat avantajlarından yararlanabilirsiniz. Sizi uzun vadeli, bağlayıcı ve iptal edilemez taahhütler altına sokmuyoruz; işinizin büyüme hızına göre paketinizi güncelleyebilir veya sözleşme koşullarımız çerçevesinde iptal edebilirsiniz.",
  },
  {
    question: "Sadece sanal ofis kiralarsam, gerektiğinde toplantı odası veya fiziki ofis kullanabilir miyim?",
    answer:
      "Tabii ki. Sadece yasal adres (sanal ofis) abonemiz olsanız dahi, müşteri görüşmeleri, yatırımcı mülakatları veya ekip sunumları için saatlik veya günlük olarak donanımlı toplantı salonlarımızı kiralayabilirsiniz. Ayrıca iş hacminiz büyüdüğünde fiziki bir alana ihtiyaç duyarsanız, dilediğiniz an tam donanımlı hazır ofis paketlerimize geçiş yapabilirsiniz.",
  },
  {
    question: "Müşterilerim veya misafirlerim ofise geldiğinde nasıl bir karşılama yapılıyor?",
    answer:
      "Misafirleriniz veya iş ortaklarınız ofisimize geldiğinde, profesyonel karşılama ekibimiz tarafından şirketinizin adı belirtilerek güler yüzle ağırlanır. Siz gelene veya toplantı başlayana kadar misafirleriniz şık bekleme alanımızda (lounge) misafir edilir ve kendilerine sıcak/soğuk içecek ikramları yapılır. Bu sayede markanızın prestiji her zaman en üst seviyede tutulur.",
  },
];
