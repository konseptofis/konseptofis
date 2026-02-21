/**
 * SSS, iletişim ve şema için ortak veri.
 * FAQAccordion ve layout JSON-LD aynı kaynağı kullanır.
 */

export const SITE = {
  name: "Konsept Ofis",
  domain: "https://konseptofis.com.tr",
  phone: "0 (312) 911 95 57",
  phoneRaw: "903129119557",
  email: "info@konseptofis.com.tr",
  address: {
    line1: "Mahall Ankara",
    line2: "C2 Blok No:47, Çankaya",
    city: "Ankara",
    country: "TR",
    full: "Mahall Ankara, C2 Blok No:47, Çankaya, Ankara, TR",
  },
  whatsapp: "903129119557",
  // Google Maps'te "Mahall Ankara C2 Blok 47 Çankaya" arayıp Paylaş > Harita yerleştir ile alacağınız embed URL'sini buraya yapıştırın.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.465236530671!2d32.75086257648828!3d39.908603686408135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad33dfbbdecf2279%3A0x873a63ff266a8b3d!2sKonsept%20Ofis%20%7C%20Sanal%20Ofis%20-%20Haz%C4%B1r%20Ofis%20-%20Toplant%C4%B1%20Odas%C4%B1%20Kiralama%20Hizmetleri!5e0!3m2!1str!2str!4v1771621528974!5m2!1str!2str",
} as const;

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
];
