/**
 * SSS, iletişim ve site geneli için ortak veri.
 */

export const SITE = {
  name: "Konsept Ofis",
  domain: "https://konseptofis.com",
  phone: "0 (312) 911 95 57",
  phoneRaw: "903129119557",
  email: "iletisim@konseptofis.com",
  address: {
    line1: "Mahall Ankara",
    line2: "C2 Blok No:47, Çankaya",
    city: "Ankara",
    country: "TR",
    postalCode: "06420",
    full: "Mahall Ankara, C2 Blok No:47, Çankaya, Ankara, TR",
  },
  whatsapp: "903129119557",
  // Google Maps'te "Mahall Ankara C2 Blok 47 Çankaya" arayıp Paylaş > Harita yerleştir ile alacağınız embed URL'sini buraya yapıştırın.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.465236530671!2d32.75086257648828!3d39.908603686408135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad33dfbbdecf2279%3A0x873a63ff266a8b3d!2sKonsept%20Ofis%20%7C%20Sanal%20Ofis%20-%20Haz%C4%B1r%20Ofis%20-%20Toplant%C4%B1%20Odas%C4%B1%20Kiralama%20Hizmetleri!5e0!3m2!1str!2str!4v1776771148030!5m2!1str!2str",
  directionsUrl:
    "https://www.google.com/maps/dir//Mahall+Ankara+C2+Blok+47+%C3%87ankaya+Ankara",
  /** Mahall Ankara C2 Blok 47 — schema LocalBusiness geo (Google Maps). */
  geo: {
    lat: 39.908609804242744,
    lng: 32.75344120719789,
  },
} as const;

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
];

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
