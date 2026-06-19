/**
 * Sohbet botu seçenek ağacı — metinleri ve linkleri buradan düzenleyebilirsiniz.
 */

export const CHATBOT_WELCOME_MESSAGE =
  "Konsept Ofis'e hoş geldiniz! 👋 Size en hızlı şekilde yardımcı olabilmem için lütfen ilgilendiğiniz konuyu seçin:";

/** Tüm cevap kartları sonunda gösterilen WhatsApp yönlendirmesi */
export const CHATBOT_WHATSAPP_SUPPORT_HREF = "https://wa.me/903129119557";

/**
 * public/ altındaki yüzen sohbet FAB ikon dosyası (adı değiştiyse burayı güncelleyin).
 * Aynı isimle dosya değiştiyse önbelleği kırmak için CHATBOT_FAB_ICON_CACHE_REVISION değerini 1 artırın.
 * Keskin görünüm (Retina): PNG’yi 152×152 export edip CHATBOT_FAB_ICON_INTRINSIC_PX = 152 yapın; ekranda yine 76px gösterilir.
 */
export const CHATBOT_FAB_ICON_PATH = "/chat-bot-icon.png";
export const CHATBOT_FAB_ICON_CACHE_REVISION = 2;
/** Kaynak PNG’nin gerçek piksel boyutu (kare). Dosya 152×152 ise 152, 76×76 ise 76 olmalı. */
export const CHATBOT_FAB_ICON_INTRINSIC_PX = 76;

export type ChatSubOption = {
  label: string;
  answer: string;
  linkLabel: string;
  href: string;
};

export type ChatTopic = {
  id: string;
  topicLabel: string;
  followUpQuestion: string;
  subOptions: readonly [ChatSubOption, ChatSubOption, ChatSubOption];
};

export const CHATBOT_TOPICS = [
  {
    id: "sanal-hazir",
    topicLabel: "Sanal & Hazır Ofis",
    followUpQuestion:
      "Sanal ve hazır ofis tarafında hangi konuda bilgi almak istersiniz?",
    subOptions: [
      {
        label: "Sanal ofis paketleri neleri kapsar?",
        answer:
          "Yasal iş adresi, profesyonel kargo/tebligat yönetimi ve çağrı karşılama hizmetlerini kapsar. Stopaj ödemeden prestijli bir adrese sahip olursunuz.",
        linkLabel: "Paketleri İncele",
        href: "/fiyatlar",
      },
      {
        label: "Hazır ofis kiralama şartları neler?",
        answer:
          "Aidat, elektrik, su ve internet faturası derdi olmadan; tam donanımlı ofisinize sadece bilgisayarınızı alıp hemen taşınabilirsiniz.",
        linkLabel: "Hazır Ofis Detayları",
        href: "/hizmetlerimiz/hazir-ofis-kiralama",
      },
      {
        label: "Yasal iş adresi (Vergi Levhası) süreci",
        answer:
          "Şirket kuruluşunuz veya adres değişikliğiniz için Mahall Ankara adresimizi 1 gün içinde vergi levhanızda yasal adres olarak gösterebilirsiniz.",
        linkLabel: "Hemen Teklif Al",
        href: "/iletisim",
      },
    ],
  },
  {
    id: "toplanti-makam",
    topicLabel: "Toplantı & Makam Odası",
    followUpQuestion:
      "Toplantı veya makam odası için neyi merak ediyorsunuz?",
    subOptions: [
      {
        label: "Saatlik veya günlük kiralama var mı?",
        answer:
          "Evet! İhtiyacınız olan gün ve saatte, tam donanımlı toplantı ve makam odalarımızı kiralayabilirsiniz. Misafirleriniz profesyonel ekibimiz tarafından karşılanır.",
        linkLabel: "Odaları İncele",
        href: "/hizmetlerimiz/toplanti-odasi-kiralama",
      },
      {
        label: "Sınırsız ikram ve donanım dahil mi?",
        answer:
          "Toplantı süresince yüksek hızlı internet, sunum tahtası/projeksiyon ve sınırsız sıcak/soğuk içecek ikramımız fiyatlara dahildir.",
        linkLabel: "Görsellere Göz At",
        href: "/hizmetlerimiz/toplanti-odasi-kiralama",
      },
      {
        label: "Misafirlerim nasıl karşılanıyor?",
        answer:
          "Sizin adınıza misafirlerinizi prestijli lobi alanımızda karşılıyor ve toplantı odanıza yönlendiriyoruz. Profesyonel imajınızı güçlendiriyoruz.",
        linkLabel: "Bize Ulaşın",
        href: "/iletisim",
      },
    ],
  },
  {
    id: "fiyat-sozlesme",
    topicLabel: "Fiyatlar & Sözleşme",
    followUpQuestion: "Fiyat veya sözleşme konusunda neye odaklanalım?",
    subOptions: [
      {
        label: "Fiyatlara her şey dahil mi? (Gizli masraf?)",
        answer:
          "Fiyatlarımız tamamen şeffaftır. Stopaj vergisi, bina aidatı, faturalar veya temizlik masrafı gibi sürpriz ekstra maliyetlerle asla karşılaşmazsınız.",
        linkLabel: "Fiyat Listesi",
        href: "/fiyatlar",
      },
      {
        label: "Sözleşme süreci ne kadar sürüyor?",
        answer:
          "Evraklarınızı dijital olarak iletmeniz yeterlidir. Dakikalar içinde sözleşmeniz hazırlanır ve aynı gün adresimizi kullanmaya başlayabilirsiniz.",
        linkLabel: "Hızlı Başvuru Yap",
        href: "/iletisim",
      },
      {
        label: "Fatura avantajı nedir? (KDV)",
        answer:
          "Stopaj vergisi ödemezsiniz. Ayrıca ofis kiranız için %20 KDV dahil fatura kesildiği için bu tutarı şirketinizde gider olarak gösterebilirsiniz.",
        linkLabel: "Temsilcimizden Bilgi Al",
        href: "/iletisim",
      },
    ],
  },
  {
    id: "lokasyon-kargo",
    topicLabel: "Lokasyon & Kargo Yönetimi",
    followUpQuestion:
      "Lokasyon veya kargo yönetimi için hangi başlığı seçersiniz?",
    subOptions: [
      {
        label: "Ofisiniz tam olarak nerede?",
        answer:
          "Ankara Çankaya'da, iş dünyasının merkezi olan Mahall Ankara C2 Blok'tayız. Danıştay Metro durağının hemen yanındayız.",
        linkLabel: "Haritada Aç",
        href: "/iletisim",
      },
      {
        label: "Şirketime gelen kargolar ne oluyor?",
        answer:
          "Şirketiniz adına gelen tüm kargo, posta ve tebligatlar (resmi evraklar) resepsiyonumuz tarafından güvenle teslim alınır ve size anında WhatsApp/E-posta ile bilgi verilir.",
        linkLabel: "Sanal Ofis Özellikleri",
        href: "/hizmetlerimiz/cankaya-sanal-ofis",
      },
      {
        label: "💬 Aradığım cevabı bulamadım",
        answer:
          "Müşteri danışmanlarımız size özel çözümler sunmak ve sorularınızı yanıtlamak için hazır. Lütfen WhatsApp üzerinden bizimle iletişime geçin.",
        linkLabel: "WhatsApp'tan Bağlan",
        href: "https://wa.me/903129119557",
      },
    ],
  },
] as const satisfies readonly ChatTopic[];
