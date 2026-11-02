import type { ComponentType, SVGProps } from "react";
import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeModernIcon,
  MapPinIcon,
  RocketLaunchIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SunIcon,
  UserGroupIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { HOMEPAGE_TESTIMONIALS } from "./testimonials";

export type ServiceFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export type TargetAudience = {
  title: string;
  paragraph: string;
  /** Tanımlıysa hedef kitle bölümünde anasayfa ofis kartlarıyla aynı kart düzeni kullanılır. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

export type IntroHeroFeature = {
  num: string;
  title: string;
  description: string;
};

export type IntroCta = {
  label: string;
  href: string;
};

export type PackageFeatureCard = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

const CANKAYA_SANAL_PACKAGE_FEATURE_CARDS: readonly PackageFeatureCard[] = [
  {
    icon: MapPinIcon,
    title: "Çankaya Yasal Adres",
    description: "Vergi levhası ve Ticaret Sicil için prestijli merkez.",
  },
  {
    icon: ArchiveBoxIcon,
    title: "Kargo ve Posta Yönetimi",
    description: "Evraklarınızın anında kabulü ve dijital bildirimi.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Stopaj ve Aidat Yok",
    description: "Ekstra bina giderleri ve vergi yükü olmadan net fiyat.",
  },
  {
    icon: DocumentTextIcon,
    title: "Şeffaf Faturalandırma",
    description: "Sürpriz maliyetler olmadan şirketiniz için gider gösterin.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Toplantı Odası",
    description: "İhtiyaç anında tam donanımlı profesyonel alanlar.",
  },
  {
    icon: BuildingOffice2Icon,
    title: "Makam Odası",
    description: "Tam donanımlı profesyonel oda.",
  },
];

export type IntroSliderImage = {
  src: string;
  alt: string;
  /** object-cover odak noktası; örn. "center 60%" */
  objectPosition?: string;
  /** Görsel kutusu için ek sınıflar (örn. max-width). */
  containerClassName?: string;
};

/** Çankaya Sanal Ofis — Mahall spotlight slider (sayfaya özel görseller). */
const CANKAYA_SANAL_OFIS_SLIDER_IMAGES: readonly IntroSliderImage[] = [
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-4.webp",
    alt: "Çankaya sanal ofis — tam donanımlı toplantı ve görüşme odası",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-3.webp",
    alt: "Çankaya sanal ofis — resepsiyon ve prestijli lobi alanı",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-2.webp",
    alt: "Çankaya sanal ofis — modern ofis iç mekânı ve çalışma alanı",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-1.webp?v=2",
    alt: "Çankaya sanal ofis — Mahall Ankara plazası ve yasal iş adresi dış görünüm",
  },
];

export type MahallSpotlightBlock = {
  leftTitle: string;
  leftParagraphs: readonly [string, string];
  sliderImages?: readonly IntroSliderImage[];
  /** Tanımlıysa slider yerine tek görsel (1280×900). */
  spotlightImage?: IntroSliderImage;
};

export type ServiceDetailData = {
  slug: string;
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  introTitle: string;
  introParagraphs: string[];
  /** Doluysa intro sağ kolonda gri görsel yerine numaralı özellik listesi gösterilir. */
  introFeatures?: IntroHeroFeature[];
  /** Intro sol kolon altında isteğe bağlı CTA düğmeleri. */
  introCtas?: IntroCta[];
  /** Intro paragraflarından sonra çerçeveli bilgi notu (ör. "vergi dairesi değiliz" uyarısı). */
  introNotice?: { title: string; text: string };
  targetTitle: string;
  targetAudience: TargetAudience[];
  /** Sanal ofis: “Neden bizi seçmelisiniz” yerine Mahall odaklı blok (sol metin, sağ görsel slider). Tanımlıysa `features` bu sayfada gösterilmez. */
  mahallSpotlightBlock?: MahallSpotlightBlock;
  features: ServiceFeature[];
  processTitle: string;
  processSteps: ProcessStep[];
  packageTitle: string;
  packageIntroParagraphs: string[];
  /** Tanımlıysa paket bölümünde sağda kart grid’i; yoksa `packageListItems` tik listesi. */
  packageFeatureCards?: readonly PackageFeatureCard[];
  /** Paket sol kolonunda, metnin altında tek CTA. */
  packageCta?: IntroCta;
  packageListItems: string[];
  testimonialsTitle: string;
  testimonials: Testimonial[];
  faq: { question: string; answer: string }[];
  /** Hedef kitle H2 içinde yeşile boyanacak tam alt dize (örn. "Sanal Ofis") */
  targetHeadingAccent?: string;
  /** Paket H2 içinde yeşile boyanacak tam alt dize (örn. "Mahall Sanal Ofis") */
  packageHeadingAccent?: string;
  /** MapAndContact bölümü H2; yoksa "Bize Ulaşın". */
  mapContactHeading?: string;
  /** FAQ bölümü H2; yoksa "Sıkça Sorulan Sorular". */
  faqHeading?: string;
  /** Hero H1 metni (SEO cümle başlığı); yoksa `title` tam sayfa başlığı olarak büyük harfe çevrilir. */
  pageHeaderHeading?: string;
  /** Hero H1 altında kısa tanıtım (p). Genelde `pageHeaderHeading` ile birlikte kullanılır. */
  pageHeaderLead?: string;
  /** SEO canonical yolu; yoksa `/hizmetlerimiz/{slug}`. */
  canonicalPath?: string;
  /** Sayfa içi çapraz linkler (SEO). */
  internalLinks?: readonly { href: string; label: string }[];
  /** Hero arka plan görseli; yoksa PageHeader varsayılanı. */
  pageHeaderBackgroundImage?: string;
  pageHeaderImageAlt?: string;
};

/** İlgili hizmetler pill anchor metinleri — tüm hizmet sayfalarında tutarlı. */
export const SERVICE_INTERNAL_LINK = {
  ankaraSanalOfis: { href: "/", label: "Ankara Sanal Ofis" },
  cankayaSanalOfis: {
    href: "/hizmetlerimiz/cankaya-sanal-ofis",
    label: "Çankaya Sanal Ofis",
  },
  maltepeVergiDairesi: {
    href: "/ankara-maltepe-vergi-dairesi-sanal-ofis",
    label: "Maltepe Vergi Dairesi'ne Bağlı Adres",
  },
  toplantiOdasi: {
    href: "/hizmetlerimiz/toplanti-odasi-kiralama",
    label: "Toplantı Odası Kiralama",
  },
  makamOdasi: {
    href: "/hizmetlerimiz/makam-odasi-kiralama",
    label: "Makam Odası Kiralama",
  },
} as const;

function testimonialsFromIndices(indices: readonly number[]): Testimonial[] {
  return indices.map((i) => {
    const t = HOMEPAGE_TESTIMONIALS[i];
    if (!t) throw new Error(`Invalid testimonial index ${i}`);
    return {
      quote: t.text,
      name: t.name,
      title: t.role,
      company: "Mahall Ankara",
    };
  });
}

const MAKAM_PACKAGE_FEATURE_CARDS: readonly PackageFeatureCard[] = [
  {
    icon: BuildingOffice2Icon,
    title: "Tam Donanımlı Makam Odası",
    description: "Mobilya, aydınlatma ve çalışma alanı kullanıma hazır.",
  },
  {
    icon: WifiIcon,
    title: "Yüksek Hızlı Fiber İnternet",
    description: "Kesintisiz bağlantı ve teknik altyapı tek pakette.",
  },
  {
    icon: SunIcon,
    title: "Sınırsız Çay ve Kahve",
    description: "Ortak mutfak ve ikramlar kullanım süresince dahildir.",
  },
  {
    icon: UserGroupIcon,
    title: "Toplantı Odası Erişimi",
    description: "İhtiyaç anında profesyonel görüşme alanları.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Stopaj ve Gizli Masraf Yok",
    description: "Şeffaf fiyat; aidat ve sürpriz kalemler olmadan net ödeme.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Saatlik Rezervasyon",
    description: "Yıllık sanal ofis abonelerine; yalnızca kullandığınız saat için ödeme.",
  },
];

const TOPLANTI_PACKAGE_FEATURE_CARDS: readonly PackageFeatureCard[] = [
  {
    icon: UserGroupIcon,
    title: "Profesyonel Toplantı Alanı",
    description: "Müşteri ve ekip görüşmeleri için hazır düzen.",
  },
  {
    icon: WifiIcon,
    title: "Fiber İnternet ve Sunum",
    description: "Projeksiyon ve bağlantı altyapısı kullanıma hazır.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Saatlik Rezervasyon",
    description: "Yıllık sanal ofis abonelerine; yalnızca kullandığınız saat için ödeme.",
  },
  {
    icon: SunIcon,
    title: "İkram ve Ortak Alan",
    description: "Çay-kahve ve konforlu bekleme alanı.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Net Fiyat, Gizli Ücret Yok",
    description: "Rezervasyon bedeli önceden belli; sürpriz ek yok.",
  },
  {
    icon: MapPinIcon,
    title: "Mahall Ankara Konumu",
    description: "Merkezi adres; kolay ulaşım ve prestijli lokasyon.",
  },
];

const CANKAYA_SANAL_OFIS: ServiceDetailData = {
  slug: "cankaya-sanal-ofis",
  title: "Çankaya Sanal Ofis",
  canonicalPath: "/hizmetlerimiz/cankaya-sanal-ofis",
  pageHeaderHeading: "Çankaya Sanal Ofis",
  pageHeaderLead:
    "Çankaya'da yasal iş adresi, vergi levhası adresi ve esnek sanal ofis çözümleri. Mahall Ankara'nın prestijli merkezinde.",
  pageHeaderBackgroundImage: "/assets/images/mahall-slider/mahall-plaza.webp",
  pageHeaderImageAlt: "Mahall Ankara C2 Blok – Çankaya sanal ofis adresi",
  targetHeadingAccent: "Çankaya Sanal Ofis",
  packageHeadingAccent: "Çankaya Sanal Ofis",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Çankaya Sanal Ofis" },
  ],
  introTitle: "Çankaya'da Prestijli Sanal Ofis ve Yasal Adres",
  introParagraphs: [
    "Çankaya sanal ofis, fiziksel bir işyeri kiralamadan şirketinize Çankaya'da yasal iş adresi sağlayan esnek bir çözümdür. Çankaya'nın iş ve finans merkezinde, Mahall Ankara'nın prestijli konumunda kurumsal adresinize kavuşun. Vergi levhası, ticaret sicil adresi ve resmi tebligat ihtiyaçlarınızı tek çatı altında karşılayın.",
    "Yüksek kira, aidat ve stopaj gibi sabit giderler olmadan; gelen evrak ve tebligatlarınız profesyonel ekibimizce yönetilirken siz işinizi büyütmeye odaklanın. Tam zamanlı bir ofise ihtiyaç duymadan tüzel kişilik adresinizi Çankaya'nın merkezine taşıyın.",
  ],
  introFeatures: [
    {
      num: "01",
      title: "Yasal ve Prestijli Adres",
      description:
        "Vergi levhası ve ticaret sicil için Çankaya'da kurumsal iş adresi.",
    },
    {
      num: "02",
      title: "Kargo ve Tebligat Yönetimi",
      description:
        "Gelen evrak ve tebligatlarınız teslim alınır, anında bildirilir.",
    },
    {
      num: "03",
      title: "Stopaj ve Aidat Yok",
      description:
        "Gizli maliyet olmadan, sadece kullandığınız hizmete net ödeme.",
    },
    {
      num: "04",
      title: "Toplantı Odası İmkanı",
      description:
        "Müşteri görüşmeleriniz için tam donanımlı profesyonel alanlar.",
    },
  ],
  introCtas: [
    { label: "Paketleri İncele", href: "/fiyatlar" },
    { label: "Hemen Teklif Al", href: "/iletisim" },
  ],
  internalLinks: [
    SERVICE_INTERNAL_LINK.ankaraSanalOfis,
    SERVICE_INTERNAL_LINK.maltepeVergiDairesi,
    SERVICE_INTERNAL_LINK.toplantiOdasi,
    SERVICE_INTERNAL_LINK.makamOdasi,
  ],
  targetTitle: "Çankaya Sanal Ofis Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: ComputerDesktopIcon,
      title: "Freelancer ve Danışmanlar",
      paragraph:
        "Düşük sabit maliyetle Çankaya'da prestijli yasal adres; resmi posta ve tebligatlarınız güvenle takip edilir.",
    },
    {
      icon: RocketLaunchIcon,
      title: "Yeni Girişimciler ve KOBİ'ler",
      paragraph:
        "Yüksek kira taahhüdü olmadan ticaret sicil ve vergi dairesi süreçlerinizi Çankaya merkezli başlatın.",
    },
    {
      icon: GlobeAltIcon,
      title: "Yurtdışı Merkezli Şirketler",
      paragraph:
        "Türkiye'de faaliyet için yasal temsil adresi; fiziksel ofis açmadan Çankaya'da operasyonel varlık.",
    },
    {
      icon: ScaleIcon,
      title: "Avukat ve Hukuk Büroları",
      paragraph:
        "Baro kaydınız için Çankaya'da prestijli yasal adres; duruşmadayken tebligatlarınız güvenle teslim alınır.",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Klinik ve Uzman Psikologlar",
      paragraph:
        "Ev adresinizi gizli tutarak kurumsal imaj; yüz yüze görüşmeler için toplantı odası kullanımı.",
    },
    {
      icon: HeartIcon,
      title: "Online Diyetisyenler",
      paragraph:
        "Fiziksel klinik kirası olmadan yasal adres; danışan görüşmeleri için prestijli ofis ve lobi imkanı.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Çankaya'nın Merkezinde Prestijli İş Adresi",
    leftParagraphs: [
      "Çankaya; bakanlıkların, mali müşavirlerin, hukuk bürolarının ve finans kuruluşlarının yoğunlaştığı idari ve ticari merkezdir. Şirketinizin yasal adresinin Çankaya'da olması kurumsal itibarınızı güçlendirir ve resmi işlemlerinizde konum avantajı sağlar.",
      "Ofisimiz Çankaya'nın yeni iş merkezi Mahall Ankara'da yer alır. Metroya komşu, ana ulaşım hatlarına yürüme mesafesindeki A+ standartlardaki binamız, modern mimarisi ve prestijli lobisiyle markanıza güçlü bir ilk izlenim kazandırır.",
    ],
    sliderImages: CANKAYA_SANAL_OFIS_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Çankaya Sanal Ofis Paketimizin Ayrıcalıkları",
  packageIntroParagraphs: [
    "Çankaya'daki Mahall Ankara'da, şirketinizin ihtiyaç duyduğu tüm yasal ve operasyonel süreçleri tek çatı altında topluyoruz. Çankaya sanal ofis paketimiz ile sadece resmi bir yasal adres değil; markanızın kurumsal itibarını en üst seviyeye taşıyacak eksiksiz bir ofis ekosistemine dahil olursunuz.",
    "Geleneksel ofislerin aksine kira stopajı, bina aidatı, elektrik veya su faturası gibi gizli masraflarla karşılaşmazsınız. Tamamen şeffaf ve sabit fiyatlandırma politikamız sayesinde bütçenizi korurken; tebligat yönetimi, prestijli lokasyon ve profesyonel karşılama gibi tüm ayrıcalıklara aynı gün içinde sahip olabilirsiniz.",
  ],
  packageFeatureCards: CANKAYA_SANAL_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([0, 1, 2, 3]),
  faq: [
    {
      question: "Çankaya sanal ofis adresi vergi levhasında kullanılabilir mi?",
      answer:
        "Evet, Çankaya sanal ofis adresi vergi levhası ve ticaret sicil adresi olarak yasal iş adresi niteliğinde kullanılabilir. Adres, resmi evraklarda ve Ticaret Sicil Gazetesi ilanlarında geçerli kabul edilir; mükellefiyetiniz [Ankara Maltepe Vergi Dairesi'ne bağlı](/ankara-maltepe-vergi-dairesi-sanal-ofis) olarak açılır. Vergi dairesi yoklamalarında bu adres iş adresi olarak beyan edilebilir. NACE kodlarına uyumlu adres tanımlaması ile şirket kuruluşu ve adres değişikliği işlemleri sorunsuz tamamlanır.",
    },
    {
      question: "Çankaya sanal ofiste stopaj veya aidat öder miyim?",
      answer:
        "Hayır, Çankaya sanal ofis paketlerimizde stopaj kesintisi uygun koşullarda uygulanmaz; bina aidatı, elektrik, su veya ortak gider payı gibi ek maliyetler bulunmaz. Ödemeniz yalnızca seçtiğiniz paket bedeli ve yasal KDV üzerinden hesaplanır. Faturalandırma şeffaf ve önceden belirlenmiş fiyatlar üzerinden yapılır; gizli kalem yoktur.",
    },
    {
      question: "Çankaya dışından da bu sanal ofis adresini alabilir miyim?",
      answer:
        "Evet, Çankaya dışından veya Türkiye'nin farklı illerinden bu sanal ofis adresini alabilirsiniz. Şirket kuruluşu, vergi levhası ve ticaret sicil işlemleriniz için Çankaya'da yasal iş adresiniz uzaktan tanımlanır; evrak ve tebligat yönetimi dijital bildirimlerle takip edilir. Yüz yüze görüşme gerektiğinde toplantı odası rezervasyonu yapabilirsiniz.",
    },
    {
      question: "Sanal ofis adresim aynı gün hazır olur mu?",
      answer:
        "Evet, evraklarınız tamamlandığında Çankaya sanal ofis yasal adresiniz aynı gün kullanıma hazır olabilir. Gerekli belgelerin iletilmesinin ardından sözleşme süreci hızla tamamlanır; vergi levhası ve ticaret sicil adresi olarak göstermeye başlayabilirsiniz. Ekibimiz kurulum adımlarında size rehberlik eder.",
    },
  ],
};

const MAKAM_ODASI: ServiceDetailData = {
  slug: "makam-odasi-kiralama",
  title: "Makam Odası",
  pageHeaderHeading: "Ankara Prestijli Makam Odası Kiralama",
  pageHeaderLead:
    "Üst düzey görüşmeler, müvekkil kabulü ve yönetim toplantıları için tam donanımlı, prestijli makam odası. Çankaya Mahall Ankara'da yıllık sanal ofis abonelerine saatlik kullanım.",
  mapContactHeading: "Makam Odası Rezervasyonu İçin Bize Ulaşın",
  faqHeading: "Makam Odası Kiralama Hakkında Sıkça Sorulan Sorular",
  targetHeadingAccent: "Prestijli Makam Odası",
  packageHeadingAccent: "Makam Odası Kiralama",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Makam Odası" },
  ],
  introTitle: "Ankara Makam Odası Kiralama İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Ankara makam odası kiralama hizmeti, üst düzey görüşmeler ve kurumsal temsil için tasarlanmış, mobilya ve altyapısı hazır prestijli bir çalışma alanı sunar. Çankaya'nın prestijli noktası Mahall Ankara'da konumlanan makam odalarımız; müvekkil kabulü, yönetici görüşmeleri, müşteri sunumları ve yönetim toplantıları için konforlu ve etkileyici bir ortam sağlar. Çankaya makam odası kiralama arayan profesyoneller için Mahall Ankara'daki prestijli konumumuz, kurumsal temsil ihtiyacınızı karşılar.",
    "Makam odamızı yıllık sanal ofis abonelerimiz saatlik ücretle kullanabilir. Gizlilik ve konforun ön planda olduğu bu alanı ihtiyaç duyduğunuz saatlerde rezerve eder, VIP görüşme alanı deneyimi yaşarsınız.",
  ],
  introFeatures: [
    {
      num: "01",
      title: "Prestijli ve Konforlu Mekân",
      description: "Önemli görüşmeler için özel düzenlenmiş, ferah makam birimi.",
    },
    {
      num: "02",
      title: "Tam Donanım ve Fiber İnternet",
      description: "Sunum ve video görüşmeleri için hazır altyapı ve teknik destek.",
    },
    {
      num: "03",
      title: "Profesyonel Karşılama",
      description: "Misafirleriniz resepsiyon ve lobi hizmetimizle ağırlanır.",
    },
    {
      num: "04",
      title: "Saatlik Kullanım",
      description: "Yıllık sanal ofis abonelerine saatlik ücretle; ihtiyaç duyduğunuz saatte rezervasyon.",
    },
  ],
  introCtas: [
    { label: "Paketleri İncele", href: "/fiyatlar" },
    { label: "Hemen Teklif Al", href: "/iletisim" },
  ],
  internalLinks: [
    SERVICE_INTERNAL_LINK.ankaraSanalOfis,
    SERVICE_INTERNAL_LINK.cankayaSanalOfis,
    SERVICE_INTERNAL_LINK.toplantiOdasi,
  ],
  targetTitle: "Prestijli Makam Odası Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: ScaleIcon,
      title: "Avukatlar ve Hukuk Büroları",
      paragraph:
        "Müvekkil kabulü ve önemli görüşmeler için prestijli, gizliliğe uygun makam odası ortamı.",
    },
    {
      icon: BriefcaseIcon,
      title: "Üst Düzey Yöneticiler ve Danışmanlar",
      paragraph:
        "Kritik müşteri görüşmeleri ve sunumlar için kurumsal imajı güçlendiren prestijli alan.",
    },
    {
      icon: BuildingOffice2Icon,
      title: "Danışmanlık Firmaları",
      paragraph:
        "Kurumsal müşteri kabulü ve strateji görüşmeleri için tam donanımlı, profesyonel temsil ofisi.",
    },
    {
      icon: GlobeAltIcon,
      title: "Şirket Temsilcileri ve Ortaklar",
      paragraph:
        "İş ortağı ve yatırımcı görüşmelerinde markanızı en üst düzeyde temsil eden ferah ortam.",
    },
    {
      icon: DocumentTextIcon,
      title: "Mali Müşavirler ve Serbest Meslek",
      paragraph:
        "Müşteri görüşmeleri ve resmi kabuller için Çankaya merkezli prestijli çalışma alanı.",
    },
    {
      icon: UserGroupIcon,
      title: "Küçük Yönetim Kurulu ve Ekipler",
      paragraph:
        "Yönetim toplantıları ve strateji oturumları için konforlu, donanımlı makam odası.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Çankaya Mahall Ankara'da Makam Odası ile Kurumsal Prestij",
    leftParagraphs: [
      "Çankaya Mahall Ankara'da konumlanan makam odalarımız; müvekkil kabulü, danışmanlık görüşmeleri ve üst düzey iş toplantıları için lokasyon, lobi ve resepsiyon ayrıcalığıyla markanızın görünürlüğünü güçlendirir.",
      "Yalnızca kullandığınız saat kadar ödeme yaparak bütçenizi korurken; sınırsız çay-kahve ve ortak alanlar ile tam hizmetli bir ofis deneyimi yaşarsınız.",
    ],
    spotlightImage: {
      src: CANKAYA_SANAL_OFIS_SLIDER_IMAGES[0]!.src,
      alt: "Ankara makam odası kiralama — Mahall Ankara prestijli iş merkezi dış görünüm",
      objectPosition: "center top",
    },
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Tam Donanımlı Makam Odası Kiralama Ayrıcalıkları",
  packageIntroParagraphs: [
    "Makam odası paketlerimiz; geniş çalışma alanı, premium mobilya, yüksek hızlı internet ve Mahall Ankara prestijini tek çatı altında sunar. Yıllık sanal ofis abonelerimiz makam odasını ihtiyaç duydukları saatlerde, saatlik ücretle kullanır.",
    "Gizli aidat veya sürpriz ücretler olmadan net fiyatla ilerlersiniz. İhtiyaç halinde toplantı odası ve ek hizmetler için ekibimizden bilgi alabilirsiniz.",
  ],
  packageFeatureCards: MAKAM_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([1, 0, 3]),
  faq: [
    {
      question: "Makam odasını kimler kullanabilir?",
      answer:
        "Makam odamızı yıllık sanal ofis abonelerimiz saatlik ücretle kullanabilir. Müvekkil kabulü, yönetici görüşmeleri ve müşteri sunumları için ihtiyaç duyduğunuz saatlerde rezervasyon yapmanız yeterlidir.",
    },
    {
      question: "Makam odası günlük veya aylık kiralanabilir mi?",
      answer:
        "Hayır. Makam odamız günlük veya aylık olarak kiralanmaz. Yıllık sanal ofis abonelerimiz önemli toplantıları, VIP misafir ağırlamaları veya mülakatları için makam odasını saatlik ücretle kullanabilir.",
    },
    {
      question: "Makam odası kiraladığımda stopaj ödeyecek miyim?",
      answer:
        "Hayır. Konsept Ofis'ten alacağınız makam odası kiralama hizmeti faturalı bir hizmettir. Bu nedenle kira stopajı ödemezsiniz ve faturanızı şirket gideri olarak gösterebilirsiniz.",
    },
    {
      question: "Misafirlerim için sekreterya ve karşılama hizmeti var mı?",
      answer:
        "Kesinlikle. Sizi ziyarete gelen üst düzey konuklarınız, prestijli Mahall Ankara lobimizde profesyonel ekibimiz tarafından karşılanır ve doğrudan makam odanıza yönlendirilir.",
    },
    {
      question: "Makam odası kiralama fiyatlarına neler dahildir?",
      answer:
        "Saatlik ücrete; lüks ofis mobilyaları, fiber internet, temizlik ve sınırsız çay/kahve ikramı dahildir. Aidat, elektrik veya su gibi ek bir masraf çıkarılmaz.",
    },
    {
      question: "Makam odası müvekkil ve müşteri kabulü için uygun mu?",
      answer:
        "Evet, makam odalarımız avukatların müvekkil kabulü, danışmanlık firmalarının müşteri görüşmeleri ve üst düzey iş kabulleri için uygundur; prestijli, sessiz ve gizliliğe elverişli bir ortam sunar. Misafirleriniz prestijli lobi alanımızda profesyonel ekibimizce karşılanır ve makam odanıza yönlendirilir. Geniş çalışma masası, fiber internet ve ikram dahil donanım sayesinde müvekkil ve müşteri görüşmelerinize tam odaklanırsınız.",
    },
    {
      question: "Çankaya'da saatlik makam odası kiralanabilir mi?",
      answer:
        "Evet, Çankaya'daki Mahall Ankara'da yer alan makam odamızı yıllık sanal ofis abonelerimiz saatlik ücretle kullanabilir. Müvekkil kabulü, üst düzey görüşmeler ve yönetim toplantıları için prestijli ve donanımlı bir ortam sunar.",
    },
  ],
};

const TOPLANTI_ODASI: ServiceDetailData = {
  slug: "toplanti-odasi-kiralama",
  title: "Toplantı Odası",
  pageHeaderHeading: "Ankara Toplantı Odası Kiralama",
  pageHeaderLead:
    "Yıllık sanal ofis abonelerine saatlik, tam donanımlı toplantı odası. Arabuluculuk, müzakere, sunum ve mülakatlar için Çankaya Mahall Ankara'da profesyonel buluşma alanı.",
  mapContactHeading: "Toplantı Odası Rezervasyonu İçin Bize Ulaşın",
  targetHeadingAccent: "Toplantı Odası",
  packageHeadingAccent: "Toplantı Odası Kiralama",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Toplantı Odası" },
  ],
  introTitle: "Saatlik Toplantı Odası Kiralamak İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Ankara toplantı odası kiralama hizmeti, sabit ofis maliyetine katlanmadan ihtiyaç duyduğunuz anda profesyonel bir buluşma alanı sağlar. Çankaya'nın prestijli noktası Mahall Ankara'da konumlanan odalarımız; arabuluculuk görüşmeleri, müşteri sunumları, eğitimler ve ekip toplantıları için tam donanımlı, tarafsız ve şık bir ortam sunar. Çankaya toplantı odası kiralama arayanlar için Mahall Ankara'daki merkezi konumumuz, kolay ulaşım ve prestijli ortam sunar.",
    "Yıllık sanal ofis abonelerimiz toplantı odalarımızı saatlik ücretle kullanabilir. Sürekli ofis kiralama maliyetine katlanmak yerine, yalnızca ihtiyacınız olan saatlerde ödeme yaparak görüşme odanıza prestij katın. Randevulu oda kiralama ile hemen rezervasyonunuzu yapın, misafirlerinizi profesyonel ekibimizle karşılayalım.",
  ],
  introFeatures: [
    {
      num: "01",
      title: "Saatlik Kiralama",
      description: "Yıllık sanal ofis abonelerine; yalnızca kullandığınız saat için ödeme.",
    },
    {
      num: "02",
      title: "Sunum ve Fiber İnternet",
      description: "Projeksiyon ve bağlantı ekipmanları kullanıma hazır.",
    },
    {
      num: "03",
      title: "Merkezi Mahall Konumu",
      description: "Prestijli adres; kolay ulaşım ve profesyonel karşılama.",
    },
    {
      num: "04",
      title: "Net Fiyatlandırma",
      description: "Gizli ücret olmadan önceden belli rezervasyon bedeli.",
    },
  ],
  introCtas: [
    { label: "Paketleri İncele", href: "/fiyatlar" },
    { label: "Rezervasyon Talebi", href: "/iletisim" },
  ],
  internalLinks: [
    SERVICE_INTERNAL_LINK.ankaraSanalOfis,
    SERVICE_INTERNAL_LINK.cankayaSanalOfis,
    SERVICE_INTERNAL_LINK.makamOdasi,
  ],
  targetTitle: "Ankara Toplantı Odası Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: ScaleIcon,
      title: "Avukatlar ve Arabulucular",
      paragraph:
        "Zorunlu arabuluculuk ve müzakere görüşmeleri için tarafsız, prestijli ve gizliliğe uygun toplantı odası.",
    },
    {
      icon: BriefcaseIcon,
      title: "Satış ve Müşteri Ekipleri",
      paragraph:
        "Kurumsal sunum ve müşteri görüşmeleri için projeksiyonlu, profesyonel buluşma alanı.",
    },
    {
      icon: ComputerDesktopIcon,
      title: "Danışmanlar ve Serbest Profesyoneller",
      paragraph:
        "Merkezi konumda, randevu bazlı, gizli maliyet olmadan saatlik oda kiralama.",
    },
    {
      icon: UserGroupIcon,
      title: "İK ve Mülakat Yapan Şirketler",
      paragraph:
        "Aday görüşmeleri ve mülakatlar için sessiz, kurumsal imajı güçlü görüşme odası.",
    },
    {
      icon: AcademicCapIcon,
      title: "Eğitim ve Seminer Verenler",
      paragraph:
        "Küçük grup eğitimleri ve atölyeler için fiber internet ve sunum altyapılı salon.",
    },
    {
      icon: GlobeAltIcon,
      title: "Küçük Ekipler ve Uzaktan Çalışanlar",
      paragraph:
        "Ofisi olmayan ekipler için ihtiyaç anında buluşma ve toplantı alanı.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Çankaya Mahall Ankara'da Profesyonel Toplantı Alanları",
    leftParagraphs: [
      "Mahall Ankara'da konumlanan toplantı odalarımız; arabuluculuk oturumları, iş geliştirme görüşmeleri, mülakatlar ve müşteri sunumları için sessiz, şık ve tam donanımlı alanlar sunar. Metroya ve ana arterlere yakın konumu sayesinde misafirleriniz ulaşım ve otopark sorunu yaşamaz.",
      "Rezervasyon süreci hızlı ve pratiktir; toplantı günü misafirleriniz profesyonel lobi ekibimizce karşılanır ve odanıza yönlendirilir. Teknik altyapı ve ikram servisi bize ait, siz sadece işinize odaklanın.",
    ],
    spotlightImage: {
      src: "/assets/images/mahall-slider/ankara-toplanti-odasi-1.webp",
      alt: "Ankara toplantı odası kiralama — Mahall Ankara profesyonel görüşme alanı",
      objectPosition: "center bottom",
    },
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Tam Donanımlı Toplantı Odası Kiralama Ayrıcalıkları",
  packageIntroParagraphs: [
    "Yıllık sanal ofis abonelerimiz toplantı odalarımızı saatlik rezervasyonla; fiber internet, projeksiyon ve ikram dahil kullanır. Mahall Ankara'da prestijli bir adreste, sabit ofis maliyeti olmadan profesyonel görüşmeler yaparsınız.",
    "Fiyatlar şeffaftır; KDV açıkça belirtilir. Randevu saatinize göre oda sizin için ayrılır; olası ek ücretler için önceden bilgilendirilirsiniz.",
  ],
  packageFeatureCards: TOPLANTI_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([0, 1, 2]),
  faq: [
    {
      question: "Ankara'da toplantı odasını saatlik kiralayabilir miyim?",
      answer:
        "Evet, yıllık sanal ofis abonelerimiz toplantı odalarımızı saatlik ücretle kiralayabilir. Günlük veya aylık kiralama yapılmaz; yalnızca kullandığınız saat kadar ödeme yaparsınız. İhtiyacınıza en uygun saat dilimini seçerek rezervasyon oluşturabilirsiniz.",
    },
    {
      question: "Toplantı odası kiralama hizmetine hangi donanımlar dahildir?",
      answer:
        "Kiraladığınız toplantı odasında; yüksek hızlı fiber internet, profesyonel sunumlar için büyük ekran (projeksiyon/akıllı TV), beyaz tahta (flipchart) ve ergonomik ofis mobilyaları kullanıma hazırdır. Sadece bilgisayarınızı alıp gelmeniz yeterlidir, tüm teknik altyapı tarafımızca sağlanır.",
    },
    {
      question: "Kiralık toplantı odalarının kapasitesi kaç kişiliktir?",
      answer:
        "Mahall Ankara'daki toplantı odalarımız; ikili müşteri görüşmelerinden, 6 ile 10 kişilik ekip toplantılarına ve sunumlara kadar uygun esnek bir yapıya sahiptir. Toplantıdan önce katılımcı sayınızı belirtmeniz halinde, oda düzeni ekibiniz için en konforlu şekilde hazırlanır.",
    },
    {
      question: "Toplantıya katılan misafirlerimiz için ikram ve karşılama hizmeti var mı?",
      answer:
        "Kesinlikle. Misafirleriniz prestijli lobi alanımızda profesyonel ekibimiz tarafından karşılanır ve toplantı odasına yönlendirilir. Ayrıca toplantı süreniz boyunca sizin ve misafirlerinizin çay, kahve ve su gibi temel ikram ihtiyaçları hizmetimize dahildir.",
    },
    {
      question: "Toplantı odası fiyatlarına KDV dahil mi, ek ücret çıkar mı?",
      answer:
        "Fiyatlandırma politikamız tamamen şeffaftır. Saatlik ücret KDV hariç belirtilir; teknik altyapı kullanımı ve temel ikramlar ücrete dahildir. Rezervasyon öncesi anlaşılan bedel dışında hiçbir sürpriz ek ücret veya aidat talep edilmez.",
    },
    {
      question: "Toplantı odası arabuluculuk görüşmeleri için uygun mu?",
      answer:
        "Evet, toplantı odalarımız zorunlu arabuluculuk ve müzakere görüşmeleri için uygundur; tarafların rahatça görüşebileceği sessiz, tarafsız ve gizliliğe elverişli bir ortam sağlar. Mahall Ankara'daki merkezi konumumuz taraflar için kolay ulaşım sunar; randevu bazlı rezervasyonla odanız toplantı öncesinde hazırlanır. Projeksiyon, fiber internet ve ikram dahil donanım sayesinde görüşmenize odaklanabilirsiniz.",
    },
    {
      question: "Çankaya'da saatlik toplantı odası kiralayabilir miyim?",
      answer:
        "Evet, Çankaya'daki Mahall Ankara'da bulunan toplantı odalarımızı yıllık sanal ofis abonelerimiz saatlik ücretle kiralayabilir. Merkezi konumu, fiber internet ve sunum donanımıyla arabuluculuk, müzakere ve ekip toplantıları için uygundur.",
    },
  ],
};

/** Maltepe VD sayfası — Mahall bloğu; anasayfa galerisindeki görseller, sayfaya özel alt metinlerle. */
const MALTEPE_VD_SLIDER_IMAGES: readonly IntroSliderImage[] = [
  {
    src: "/ilk-gorsel.webp",
    alt: "Mahall Ankara C2 Blok — Mustafa Kemal Mahallesi'ndeki yasal iş adresi",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-3.webp",
    alt: "Konsept Ofis resepsiyonu — yoklama memurunun karşılandığı nokta",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-4.webp",
    alt: "Mali müşavir görüşmeleri için toplantı odası — Mahall Ankara",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-2.webp",
    alt: "Konsept Ofis ortak çalışma alanı — Dumlupınar Bulvarı, Çankaya",
  },
  {
    src: "/anasayfa-sag-en-alt.JPEG",
    alt: "Konsept Ofis iç mekânı — vergi dairesi yazışmalarının teslim alındığı ofis",
  },
];

const MALTEPE_VD_PACKAGE_FEATURE_CARDS: readonly PackageFeatureCard[] = [
  {
    icon: DocumentTextIcon,
    title: "Maltepe VD Vergi Levhası",
    description: "Levhanızda bağlı daire olarak Maltepe yazar.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Yoklamaya Hazır Adres",
    description: "Resepsiyon, sözleşme ve yönlendirme yoklama günü hazır.",
  },
  {
    icon: ArchiveBoxIcon,
    title: "Tebligat ve Kargo Kabulü",
    description: "Vergi dairesi yazışmaları teslim alınır, aynı gün bildirilir.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Muhasebeci Görüşme Odası",
    description: "Beyanname dönemi ve müşteri görüşmeleri için saatlik oda.",
  },
];

const ANKARA_MALTEPE_VD_SANAL_OFIS: ServiceDetailData = {
  slug: "ankara-maltepe-vergi-dairesi-sanal-ofis",
  title: "Ankara Maltepe Vergi Dairesi'ne Bağlı Sanal Ofis",
  canonicalPath: "/ankara-maltepe-vergi-dairesi-sanal-ofis",
  pageHeaderHeading: "Ankara Maltepe Vergi Dairesi'ne Bağlı Sanal Ofis Adresi",
  pageHeaderLead:
    "Mustafa Kemal Mahallesi'ndeki Mahall Ankara adresiyle mükellefiyetiniz Maltepe'de açılır; yoklama ve tebligat bizde.",
  pageHeaderBackgroundImage: "/assets/images/mahall-slider/mahall-plaza.webp",
  pageHeaderImageAlt: "Mahall Ankara — Ankara Maltepe Vergi Dairesi'ne bağlı sanal ofis adresi",
  targetHeadingAccent: "Maltepe Vergi Dairesi",
  packageHeadingAccent: "Adres Paketinde",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Maltepe Vergi Dairesi Sanal Ofis" },
  ],
  introTitle: "Mahall Ankara Adresi Hangi Vergi Dairesine Bağlı?",
  introParagraphs: [
    "Mahall Ankara (Mustafa Kemal Mahallesi, Dumlupınar Bulvarı No:274/2, Çankaya) adresi Ankara Maltepe Vergi Dairesi'nin yetki alanındadır. Konsept Ofis'in bu adresini iş adresi olarak gösterdiğinizde mükellefiyetiniz Maltepe Vergi Dairesi'nde açılır, yoklamayı bu daire yapar ve vergi levhanız Maltepe Vergi Dairesi adıyla düzenlenir.",
    "Vergi dairesini mükellef ya da sanal ofis firması seçmez; Gelir İdaresi, iş adresinin bulunduğu mahalleye göre belirler. Bu nedenle Maltepe'ye bağlı kalmak ya da bu daireye geçmek istiyorsanız, belirleyici olan şey adresinizin bu yetki alanında olmasıdır. Mahall Ankara tam olarak böyle bir adrestir.",
  ],
  introNotice: {
    title: "Konsept Ofis vergi dairesi değildir",
    text: "Bu sayfa, bu daireye bağlı yasal iş adresi arayanlar için hazırlanmış bir sanal ofis hizmet sayfasıdır. Beyanname, borç sorgulama ve vergi dairesi işlemleriniz için Gelir İdaresi'nin [VİMER 189](https://istanbul.gib.gov.tr/iletisim/vimer-189-vergi-iletisim-merkezi/kisaca-vimer) hattını arayın. Tek adresimiz Mahall Ankara, Çankaya'dır; İstanbul Maltepe'de veya başka bir şehirde adres hizmetimiz yoktur.",
  },
  introFeatures: [
    {
      num: "01",
      title: "Vergi Levhasında Maltepe",
      description:
        "Şahıs şirketi, limited veya anonim şirket; mükellefiyetiniz bu adresle Maltepe'de açılır.",
    },
    {
      num: "02",
      title: "Dosya Nakli Olmadan Adres Taşıma",
      description:
        "Zaten Maltepe mükellefiyseniz adresinizi taşıdığınızda vergi daireniz değişmez.",
    },
    {
      num: "03",
      title: "Yoklamaya Hazır Fiziki Adres",
      description:
        "Yoklama memuru Mahall Ankara C2 Blok'ta resepsiyonumuz ve sözleşmenizle karşılanır.",
    },
    {
      num: "04",
      title: "Tebligatlarınız Güvende",
      description:
        "Vergi dairesinden gelen yazı ve tebligatlar teslim alınır, size aynı gün bildirilir.",
    },
  ],
  introCtas: [
    { label: "Paketleri İncele", href: "/fiyatlar" },
    { label: "Sanal Ofis Teklifi Al", href: "/iletisim" },
  ],
  internalLinks: [
    SERVICE_INTERNAL_LINK.ankaraSanalOfis,
    SERVICE_INTERNAL_LINK.cankayaSanalOfis,
    SERVICE_INTERNAL_LINK.toplantiOdasi,
  ],
  targetTitle: "Kimler Maltepe Vergi Dairesi'ne Bağlı Adres Arar?",
  targetAudience: [
    {
      icon: DocumentTextIcon,
      title: "Maltepe VD Mükellefleri",
      paragraph:
        "Ofisinden çıkan ya da adres taşıyan mükellefler; aynı yetki alanında kaldıkları için vergi daireleri değişmez, dosya nakli beklemezler.",
    },
    {
      icon: BriefcaseIcon,
      title: "Mali Müşaviri Bu Daireyle Çalışanlar",
      paragraph:
        "Muhasebecisinin yoğun çalıştığı daireye bağlı olmak isteyen şirketler; tüm müşteri dosyaları tek vergi dairesinde toplanır.",
    },
    {
      icon: RocketLaunchIcon,
      title: "Yeni Şirket Kuranlar",
      paragraph:
        "Şahıs şirketi, limited veya anonim şirketini Çankaya'da kurup vergi levhasını Maltepe'den almak isteyenler.",
    },
    {
      icon: ScaleIcon,
      title: "Avukat ve Serbest Meslek Erbabı",
      paragraph:
        "Serbest meslek kazancı mükellefiyetini Çankaya'da, kurumsal bir iş adresiyle açmak isteyenler.",
    },
    {
      icon: HomeModernIcon,
      title: "Ev Adresini Kullanmak İstemeyenler",
      paragraph:
        "Ev adresi farklı vergi dairesine bağlı olduğu için iş adresini Maltepe yetki alanındaki kurumsal bir adrese taşıyanlar.",
    },
    {
      icon: GlobeAltIcon,
      title: "Ankara Dışında Yaşayanlar",
      paragraph:
        "Farklı şehirde yaşayıp şirketi Ankara'da tutmak isteyenler; adres ve vergi dairesi Ankara'dadır, tebligatlar dijital bildirilir.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Mustafa Kemal Mahallesi'nde Prestijli İş Adresi",
    leftParagraphs: [
      "Mustafa Kemal Mahallesi, Dumlupınar Bulvarı (Eskişehir Yolu) üzerinde iş merkezlerinin ve kamu kurumlarının yoğunlaştığı bir bölgedir. Mahall Ankara C2 Blok'taki ofisimiz bu bölgede tek bir adreste üç işi görür: levhanızdaki iş adresi, vergi dairesi yazışmalarının geldiği tebligat adresi ve yoklama memurunun karşılandığı fiziki ofis.",
      "Mükellefiyetinizle ilgili bir yazı geldiğinde zarfın üzerindeki tarih ve gönderen bilgisiyle size haber veririz; süreli tebligatlarda vakit kaybetmezsiniz. Beyanname dönemlerinde muhasebecinizle yüz yüze çalışmanız gerekirse aynı binada saatlik toplantı odası ayırtabilirsiniz.",
    ],
    sliderImages: MALTEPE_VD_SLIDER_IMAGES,
  },
  processTitle: "Maltepe Vergi Dairesi'ne Bağlı Adres Nasıl Alınır?",
  processSteps: [
    {
      title: "Sanal ofis sözleşmesini imzalayın",
      description:
        "Paketinizi seçin, kimlik ve şirket bilgilerinizi iletin. Sözleşmeniz Mahall Ankara C2 Blok adresiyle aynı gün hazırlanır; bu sözleşme vergi dairesine sunacağınız adres belgesidir.",
    },
    {
      title: "Adresi bildirin",
      description:
        "Yeni şirkette işe başlama bildiriminde, mevcut şirkette adres değişikliği bildiriminde bu adresi gösterin. Adres değişikliği, değişiklikten itibaren bir ay içinde vergi dairesine bildirilmelidir; şirketlerde ticaret sicil tescili de yapılır.",
    },
    {
      title: "Vergi dairesi yoklamaya gelir",
      description:
        "Yoklama memuru adreste işyerinin varlığını tespit eder. Resepsiyonumuz memuru karşılar, sözleşmeniz ve firma yönlendirmeniz hazır bulunur.",
    },
    {
      title: "Vergi levhanız düzenlenir",
      description:
        "Olumlu yoklama raporunun ardından levhanızda iş adresi olarak Mahall Ankara C2 Blok, bağlı daire olarak Maltepe yazar. Levhayı e-Devlet veya İnteraktif Vergi Dairesi'nden indirebilirsiniz.",
    },
  ],
  packageTitle: "Sanal Ofis Adres Paketinde Neler Var?",
  packageIntroParagraphs: [
    "Paketimiz yalnızca bir adres değil; mükellefiyetinizi sorunsuz yürütmeniz için gereken her şeyi kapsar. Yoklama günü karşılama, vergi dairesi yazışmalarının teslim alınması ve toplantı odası kullanımı tek sözleşmededir.",
    "Kira stopajı, aidat ve ortak gider payı yoktur. Fiyatlar şeffaftır; hangi paketin size uygun olduğunu fiyatlar sayfasında karşılaştırabilirsiniz.",
  ],
  packageFeatureCards: MALTEPE_VD_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([0, 1, 2, 3]),
  mapContactHeading: "Mahall Ankara Ofisimize Ulaşın",
  faqHeading: "Vergi Dairesi ve Adres Hakkında Sık Sorulan Sorular",
  faq: [
    {
      question: "Konsept Ofis adresi hangi vergi dairesine bağlı?",
      answer:
        "Konsept Ofis'in Mahall Ankara (Mustafa Kemal Mahallesi, Dumlupınar Bulvarı No:274/2 C2 Blok No:47, Çankaya) adresi Ankara Maltepe Vergi Dairesi'nin yetki alanındadır. Bu adresi iş adresi olarak gösteren mükelleflerin vergi levhası Maltepe Vergi Dairesi'nden düzenlenir.",
    },
    {
      question: "Ankara Mustafa Kemal Mahallesi hangi vergi dairesine bağlı?",
      answer:
        "Çankaya'daki Mustafa Kemal Mahallesi'nde bulunan Mahall Ankara iş merkezi, Ankara Maltepe Vergi Dairesi'nin yetki alanındadır. Mahalledeki başka bir adres için kesin bilgiyi vergi levhanızdan, İnteraktif Vergi Dairesi'nden veya VİMER 189'dan teyit edebilirsiniz.",
    },
    {
      question: "Konsept Ofis, Maltepe Vergi Dairesi mi?",
      answer:
        "Hayır. Konsept Ofis bir sanal ofis ve yasal iş adresi firmasıdır; vergi dairesi değildir. Beyanname, borç, ödeme ve diğer vergi dairesi işlemleriniz için Gelir İdaresi'nin VİMER 189 hattını arayabilir veya İnteraktif Vergi Dairesi'ni kullanabilirsiniz.",
    },
    {
      question: "İstanbul Maltepe'de de adres hizmetiniz var mı?",
      answer:
        "Hayır. Tek adresimiz Mahall Ankara, Çankaya'dadır. Bu sayfada sözü edilen daire Ankara'daki Maltepe Vergi Dairesi'dir; İstanbul'daki aynı adlı daireyle bir ilgimiz yoktur.",
    },
    {
      question: "Şahıs şirketi ve limited şirket aynı vergi dairesine mi bağlanır?",
      answer:
        "Evet. Mahall Ankara adresini iş adresi olarak gösteren şahıs şirketleri, serbest meslek erbapları, limited ve anonim şirketler aynı daireye, Maltepe'ye bağlanır. Vergi dairesini Gelir İdaresi iş adresinin bulunduğu yere göre belirler.",
    },
    {
      question: "Zaten Maltepe Vergi Dairesi mükellefiyim; adresimi taşırsam ne olur?",
      answer:
        "Yeni adresiniz de aynı yetki alanında olduğu için vergi daireniz değişmez ve dosyanız başka bir daireye nakledilmez. Adres değişikliğini bir ay içinde vergi dairesine bildirmeniz, şirketseniz ticaret sicile tescil ettirmeniz yeterlidir; daire yeni adreste yoklama yapar.",
    },
    {
      question: "Ankara Maltepe Vergi Dairesi'nin kodu nedir?",
      answer:
        "Gelir İdaresi'nin vergi daireleri listesinde Ankara Maltepe Vergi Dairesi Müdürlüğü'nün kodu 06254'tür. Fatura ve resmi formlarda vergi dairesi adı olarak \"Maltepe\" yazılır. Güncel iletişim bilgileri için Gelir İdaresi'nin resmi sitesini kullanın.",
    },
    {
      question: "Hangi vergi dairesine bağlı olduğumu nasıl öğrenirim?",
      answer:
        "Vergi levhanızda bağlı olduğunuz vergi dairesi yazar. Levhanız yanınızda değilse e-Devlet veya İnteraktif Vergi Dairesi'nden vergi levhanızı görüntüleyebilir ya da VİMER 189'u arayabilirsiniz.",
    },
    {
      question: "Yoklamada ofiste bulunmam gerekir mi?",
      answer:
        "Yoklama memuru adreste işyerinin varlığını tespit eder. Resepsiyonumuz memuru karşılar ve sanal ofis sözleşmenizi gösterir. Ekibimiz yoklama tarihini öğrendiğinde sizi bilgilendirir; özel bir durum varsa önceden hazırlık yapılır.",
    },
  ],
};

export const HIZMET_DETAY_MAP: Record<string, ServiceDetailData> = {
  "ankara-maltepe-vergi-dairesi-sanal-ofis": ANKARA_MALTEPE_VD_SANAL_OFIS,
  "cankaya-sanal-ofis": CANKAYA_SANAL_OFIS,
  "makam-odasi-kiralama": MAKAM_ODASI,
  "toplanti-odasi-kiralama": TOPLANTI_ODASI,
};

export function getServicePagePath(detail: ServiceDetailData): string {
  return detail.canonicalPath ?? `/hizmetlerimiz/${detail.slug}`;
}

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "mahall-sanal-ofis": "cankaya-sanal-ofis",
  "makam-odasi-hizmeti": "makam-odasi-kiralama",
  "toplanti-odasi-hizmeti": "toplanti-odasi-kiralama",
};

export function getServiceDetail(slug: string): ServiceDetailData | undefined {
  const resolved = SERVICE_SLUG_ALIASES[slug] ?? slug;
  return HIZMET_DETAY_MAP[resolved];
}
