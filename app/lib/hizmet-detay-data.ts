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
        "Evet, Çankaya sanal ofis adresi vergi levhası ve ticaret sicil adresi olarak yasal iş adresi niteliğinde kullanılabilir. Adres, resmi evraklarda ve Ticaret Sicil Gazetesi ilanlarında geçerli kabul edilir. Vergi dairesi yoklamalarında bu adres iş adresi olarak beyan edilebilir. NACE kodlarına uyumlu adres tanımlaması ile şirket kuruluşu ve adres değişikliği işlemleri sorunsuz tamamlanır.",
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

export const HIZMET_DETAY_MAP: Record<string, ServiceDetailData> = {
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
