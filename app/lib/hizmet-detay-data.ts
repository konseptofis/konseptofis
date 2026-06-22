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
  PhoneIcon,
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
    title: "İndirimli Toplantı Odası",
    description: "İhtiyaç anında tam donanımlı profesyonel alanlar.",
  },
  {
    icon: PhoneIcon,
    title: "Çağrı Yönlendirme",
    description: "İsteğe bağlı profesyonel telefon hattı ve sekreterya.",
  },
];

export type IntroSliderImage = {
  src: string;
  alt: string;
};

/** Mahall bölümü ve benzeri slider’larda kullanılan ofis görselleri. */
const MAHALL_OFFICE_SLIDER_IMAGES: readonly IntroSliderImage[] = [
  {
    src: "/assets/images/mahall-slider/mahall-plaza.webp",
    alt: "Mahall Ankara plazası ve iş merkezi",
  },
  {
    src: "/assets/images/mahall-slider/ofis-ic-mekan.webp",
    alt: "Konsept Ofis modern çalışma alanı ve iç mekân",
  },
  {
    src: "/assets/images/mahall-slider/resepsiyon-lobi.webp",
    alt: "Resepsiyon ve lobi alanı",
  },
  {
    src: "/assets/images/mahall-slider/toplanti-odasi.webp",
    alt: "Tam donanımlı toplantı odası",
  },
];

/** Çankaya Sanal Ofis — Mahall spotlight slider (sayfaya özel görseller). */
const CANKAYA_SANAL_OFIS_SLIDER_IMAGES: readonly IntroSliderImage[] = [
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-1.webp",
    alt: "Mahall Ankara plazası ve Çankaya sanal ofis iş merkezi dış görünüm",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-2.webp",
    alt: "Konsept Ofis Çankaya modern ofis iç mekânı ve çalışma alanı",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-3.webp",
    alt: "Çankaya sanal ofis resepsiyon ve prestijli lobi alanı",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-4.webp",
    alt: "Mahall Ankara tam donanımlı toplantı odası",
  },
];

export type MahallSpotlightBlock = {
  leftTitle: string;
  leftParagraphs: readonly [string, string];
  sliderImages: readonly IntroSliderImage[];
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
  hazirOfis: {
    href: "/hizmetlerimiz/hazir-ofis-kiralama",
    label: "Hazır Ofis Kiralama",
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

const HAZIR_PACKAGE_FEATURE_CARDS: readonly PackageFeatureCard[] = [
  {
    icon: BuildingOffice2Icon,
    title: "Tam Donanımlı Ofis Birimi",
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
    description: "Ortak mutfak ve ikramlar günlük kullanıma dahildir.",
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
    title: "Günlük veya Aylık Esneklik",
    description: "İşinizin hızına göre kiralama süresini seçin.",
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
    title: "Saatlik veya Blok Rezervasyon",
    description: "Yalnızca kullandığınız süre için ödeme.",
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
  targetHeadingAccent: "Çankaya Sanal Ofis",
  packageHeadingAccent: "Çankaya Sanal Ofis",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Çankaya Sanal Ofis" },
  ],
  introTitle: "Çankaya'da Prestijli Sanal Ofis ve Yasal Adres",
  introParagraphs: [
    "Çankaya sanal ofis, fiziksel bir işyeri kiralamadan şirketinize Çankaya'da yasal iş adresi sağlayan esnek bir çözümdür. Ankara'nın iş ve finans merkezi Çankaya'da, Mahall Ankara'nın prestijli konumunda kurumsal adresinize kavuşun. Vergi levhası, ticaret sicil adresi ve resmi tebligat ihtiyaçlarınızı tek çatı altında karşılayın.",
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
      "Çankaya, Ankara'nın bakanlıkların, mali müşavirlerin, hukuk bürolarının ve finans kuruluşlarının yoğunlaştığı idari ve ticari merkezidir. Şirketinizin yasal adresinin Çankaya'da olması kurumsal itibarınızı güçlendirir ve resmi işlemlerinizde konum avantajı sağlar.",
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

const HAZIR_OFIS: ServiceDetailData = {
  slug: "hazir-ofis-kiralama",
  title: "Hazır Ofis",
  pageHeaderHeading: "Ankara Hazır Ofis Kiralama",
  pageHeaderLead:
    "Tam donanımlı, anahtar teslim ofis birimi. Günlük veya aylık, taahhütsüz kiralama; Çankaya Mahall Ankara'da mobilya, internet ve altyapı dahil.",
  targetHeadingAccent: "Hazır Ofis",
  packageHeadingAccent: "Mahall Hazır Ofis",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Hazır Ofis" },
  ],
  introTitle: "Hazır Ofis Nedir ve İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Ankara hazır ofis kiralama, mobilya ve teknik altyapısı hazır, günlük veya aylık kiralanabilen anahtar teslim çalışma birimi sunar. Çankaya'daki tam donanımlı ofislerimizle sabit kira taahhüdü olmadan profesyonel bir çalışma ortamına anında sahip olun; internet, elektrik, ortak alanlar ve güvenlikli giriş dahildir.",
    "Girişimciler ve küçük ekipler için hazır ofis, ofis maliyetlerini kontrol altında tutarken esnek süre seçenekleri sunar. Sınırsız çay-kahve, mutfak kullanımı ve isteğe bağlı toplantı odası erişimi ile tek bir fatura ile tüm ihtiyaçlar karşılanır.",
    "Mahall Ankara konumundaki merkezimizde farklı kapasitelerde hazır ofis birimleri bulunur. İhtiyacınıza göre kişi sayısı ve kiralama süresi belirlenir; büyüme veya daralma durumunda paket güncellenebilir.",
  ],
  introFeatures: [
    {
      num: "01",
      title: "Kullanıma Hazır Birim",
      description: "Mobilya ve altyapı hazır; taşınır taşınmaz çalışmaya başlayın.",
    },
    {
      num: "02",
      title: "Fiber İnternet ve Altyapı",
      description: "Kesintisiz bağlantı ve teknik destek pakete dahildir.",
    },
    {
      num: "03",
      title: "Esnek Günlük veya Aylık Süre",
      description: "Taahhüt riski olmadan ihtiyacınıza göre kiralama seçenekleri.",
    },
    {
      num: "04",
      title: "Toplantı ve Ortak Alanlar",
      description: "Profesyonel görüşme alanları ve günlük ikramlar.",
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
  targetTitle: "Hazır Ofis Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: RocketLaunchIcon,
      title: "Küçük Ekipler ve Startuplar",
      paragraph:
        "Sabit ekip için esnek, taşınmaz çalışma alanı; mobilya ve altyapı hazır, anında başlayın.",
    },
    {
      icon: BriefcaseIcon,
      title: "Proje Bazlı Çalışanlar",
      paragraph:
        "Belirli projeler için geçici, kısa süreli profesyonel ofis; taahhüt riski olmadan merkezi adres.",
    },
    {
      icon: ComputerDesktopIcon,
      title: "Uzaktan ve Hibrit Çalışanlar",
      paragraph:
        "Haftanın belirli günleri ofise gelenler için esnek, donanımlı masa ve birim.",
    },
    {
      icon: BuildingOffice2Icon,
      title: "Şube Açan Şirketler",
      paragraph:
        "Ankara'da fiziksel varlık için hızlı kurulumlu, yatırım gerektirmeyen hazır ofis çözümü.",
    },
    {
      icon: GlobeAltIcon,
      title: "Danışmanlar ve Serbest Meslek",
      paragraph:
        "Müşteri kabulüne uygun, kurumsal imajlı bağımsız çalışma birimi.",
    },
    {
      icon: UserGroupIcon,
      title: "Yeni Girişimciler",
      paragraph:
        "Yüksek başlangıç maliyeti olmadan, tam donanımlı ofisle işe hızlı başlangıç.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Çankaya Mahall Ankara'da Hazır Ofis ile Prestij ve Konfor",
    leftParagraphs: [
      "Çankaya hazır ofis kiralama arayanlar için Mahall Ankara'daki birimlerimizle markanıza merkezi ve kurumsal bir adres kazandırırsınız. Metro ve ana arterlere yakın konum; müşteri ve iş ortaklarınız için kolay ulaşım sunar.",
      "Şeffaf fiyatlandırma, sınırsız çay-kahve ve profesyonel ortak alanlar ile hazır ofis deneyiminiz tek paketle yönetilir; ekibiniz büyüdükçe birim veya süre güncellemesi yapabilirsiniz.",
    ],
    sliderImages: MAHALL_OFFICE_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Mahall Hazır Ofis Paketimizin Ayrıcalıkları",
  packageIntroParagraphs: [
    "Ankara Mahall Ankara'da hazır ofis paketlerimiz; tam donanımlı birim, yüksek hızlı internet ve ortak alan kullanımını tek çatı altında toplar. Kişi sayısı ve kiralama süresine göre esnek seçeneklerle bütçenizi korursunuz.",
    "Geleneksel ofis kiralarının aksine gizli aidat veya sürpriz kalemler olmadan net fiyatla ilerlersiniz. Toplantı odası erişimi, ikramlar ve güvenli giriş gibi ayrıcalıklar paket yapınıza entegre edilir.",
  ],
  packageFeatureCards: HAZIR_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([1, 3, 0]),
  faq: [
    {
      question: "Hazır ofisi günlük kiralayabilir miyim?",
      answer:
        "Evet. Günlük veya aylık esnek kiralama seçeneklerimiz mevcuttur. İhtiyacınıza göre paket oluşturabiliriz. Detaylar için iletişime geçebilirsiniz.",
    },
    {
      question: "Toplantı odası kullanımı dahil mi?",
      answer:
        "Paket türüne göre toplantı odası kullanımı dahil veya ek ücretle saatlik kullanım imkânı sunulmaktadır. Size uygun seçeneği birlikte belirleyebiliriz.",
    },
    {
      question: "Ankara'da hazır ofis kiralama maliyeti nasıl belirlenir?",
      answer:
        "Ankara'da hazır ofis kiralama maliyeti; kişi sayısı, kiralama süresi (günlük veya aylık) ve seçilen paket kapsamına göre belirlenir. Kısa süreli proje ofisi ihtiyaçlarında günlük, düzenli ekip kullanımında aylık planlar tercih edilir. Net fiyat teklifi için ekibimiz ihtiyacınıza göre paket önerir.",
    },
    {
      question: "Hazır ofis ile sanal ofis arasındaki fark nedir?",
      answer:
        "Hazır ofis, fiziksel mobilyalı bir çalışma birimi sunarken; sanal ofis yalnızca yasal iş adresi ve operasyonel destek hizmetlerini kapsar. Hazır ofiste günlük çalışma alanı, internet ve ortak alan kullanımı vardır; sanal ofiste fiziksel masa olmadan kurumsal adres ve evrak yönetimi sağlanır.",
    },
    {
      question: "Çankaya'da günlük hazır ofis kiralayabilir miyim?",
      answer:
        "Evet, Çankaya'daki Mahall Ankara'da hazır ofis birimlerimizi günlük veya aylık olarak kiralayabilirsiniz. Taahhütsüz esnek sürelerle ihtiyaç anında donanımlı ofise geçiş yapabilir; proje veya geçici ekip ihtiyaçları için ideal bir çözümdür.",
    },
    {
      question: "Hazır ofis kiralamaya neler dahildir?",
      answer:
        "Hazır ofis kiralamasına mobilyalı çalışma birimi, yüksek hızlı internet, elektrik, sınırsız çay-kahve ikramı, ortak alan kullanımı ve güvenli giriş dahildir. Teknik altyapı ve temel ofis ihtiyaçları paket bedeline yansır; sürpriz aidat veya gizli kalem bulunmaz.",
    },
  ],
};

const MAKAM_ODASI: ServiceDetailData = {
  slug: "makam-odasi-kiralama",
  title: "Makam Odası",
  pageHeaderHeading: "Ankara Prestijli Makam Odası Kiralama",
  pageHeaderLead:
    "Üst düzey görüşmeler, müvekkil kabulü ve yönetim toplantıları için tam donanımlı, prestijli makam odası. Çankaya Mahall Ankara'da günlük veya aylık kiralama.",
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
    "Hazır ofis birimlerimizden daha geniş ve ayrıcalıklı düzenlenen makam alanlarımızda gizlilik ve konfor ön plandadır. Esnek ofis kiralama ile günlük veya aylık kullanım planlayabilir; uzun süreli taahhüt olmadan ihtiyaç anında VIP görüşme alanı deneyimi yaşarsınız.",
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
      title: "Esnek Kiralama Süresi",
      description: "Günlük veya aylık kullanım; iş takviminize göre planlama.",
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
      "Şeffaf fiyatlandırma ve esnek sürelerle bütçenizi korurken; sınırsız çay-kahve ve ortak alanlar ile tam hizmetli bir ofis deneyimi yaşarsınız.",
    ],
    sliderImages: MAHALL_OFFICE_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Tam Donanımlı Makam Odası Kiralama Ayrıcalıkları",
  packageIntroParagraphs: [
    "Makam odası paketlerimiz; geniş çalışma alanı, premium mobilya, yüksek hızlı internet ve Mahall Ankara prestijini tek çatı altında sunar. Kişi sayısı ve kiralama süresine göre size uygun seçenekler oluşturulur.",
    "Gizli aidat veya sürpriz ücretler olmadan net fiyatla ilerlersiniz. İhtiyaç halinde toplantı odası ve ek hizmetler için ekibimizden bilgi alabilirsiniz.",
  ],
  packageFeatureCards: HAZIR_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([1, 0, 3]),
  faq: [
    {
      question: "Makam odası ile hazır ofis arasındaki fark nedir?",
      answer:
        "Makam odası genellikle daha geniş, prestijli düzenlenmiş ve üst düzey görüşmelere uygun birimlerdir. Hazır ofis birimleri günlük çalışma için optimize edilirken makam alanları misafir ağırlama ve yönetim odaklı toplantılar için idealdir. İhtiyacınıza göre birlikte en uygun seçeneği belirleyebiliriz.",
    },
    {
      question: "Ankara'da makam odasını günlük kiralayabilir miyim?",
      answer:
        "Evet, Konsept Ofis'te makam odalarımızı sadece aylık/yıllık değil; önemli toplantılarınız, VIP misafir ağırlamalarınız veya mülakatlarınız için günlük olarak da kiralayabilirsiniz.",
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
        "Kiralama fiyatlarımıza; lüks ofis mobilyaları, fiber internet, aidat, elektrik-su-ısıtma giderleri, temizlik hizmeti ve gün boyu sınırsız çay/kahve ikramları dahildir. Hiçbir sürpriz masraf çıkarılmaz.",
    },
    {
      question: "Makam odası müvekkil ve müşteri kabulü için uygun mu?",
      answer:
        "Evet, makam odalarımız avukatların müvekkil kabulü, danışmanlık firmalarının müşteri görüşmeleri ve üst düzey iş kabulleri için uygundur; prestijli, sessiz ve gizliliğe elverişli bir ortam sunar. Misafirleriniz prestijli lobi alanımızda profesyonel ekibimizce karşılanır ve makam odanıza yönlendirilir. Geniş çalışma masası, fiber internet ve ikram dahil donanım sayesinde müvekkil ve müşteri görüşmelerinize tam odaklanırsınız.",
    },
    {
      question: "Çankaya'da günlük makam odası kiralanabilir mi?",
      answer:
        "Evet, Çankaya'daki Mahall Ankara'da yer alan makam odalarımız günlük veya aylık olarak kiralanabilir. Müvekkil kabulü, üst düzey görüşmeler ve yönetim toplantıları için prestijli ve donanımlı bir ortam sunar.",
    },
  ],
};

const TOPLANTI_ODASI: ServiceDetailData = {
  slug: "toplanti-odasi-kiralama",
  title: "Toplantı Odası",
  pageHeaderHeading: "Ankara Toplantı Odası Kiralama",
  pageHeaderLead:
    "Saatlik veya günlük, tam donanımlı toplantı odası. Arabuluculuk, müzakere, sunum ve mülakatlar için Çankaya Mahall Ankara'da profesyonel buluşma alanı.",
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
    "Sürekli ofis kiralama maliyetine katlanmak yerine, yalnızca ihtiyacınız olan saatlerde ödeme yaparak görüşme odanıza prestij katın. Randevulu oda kiralama ile hemen rezervasyonunuzu yapın, misafirlerinizi profesyonel ekibimizle karşılayalım.",
  ],
  introFeatures: [
    {
      num: "01",
      title: "Saatlik veya Blok Kiralama",
      description: "Yalnızca ihtiyaç duyduğunuz süre için ödeme yapın.",
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
    sliderImages: MAHALL_OFFICE_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Tam Donanımlı Toplantı Odası Kiralama Ayrıcalıkları",
  packageIntroParagraphs: [
    "Toplantı odası paketlerimiz, saatlik veya blok rezervasyonla fiber internet, projeksiyon ve ikram dahil kullanım sunar. Mahall Ankara'da prestijli bir adreste, sabit ofis maliyeti olmadan profesyonel görüşmeler yaparsınız.",
    "Fiyatlar şeffaftır; KDV açıkça belirtilir. Randevu ve süre seçiminize göre oda sizin için ayrılır; olası ek ücretler için önceden bilgilendirilirsiniz.",
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
        "Evet, Konsept Ofis olarak toplantı odalarımızı saatlik, yarım günlük (blok) veya tam günlük olarak kiralayabilirsiniz. Sadece kullandığınız süre kadar ödeme yaparsınız, gizli maliyet veya sabit ofis giderleriyle karşılaşmazsınız. İhtiyacınıza en uygun saat dilimini seçerek hemen rezervasyon oluşturabilirsiniz.",
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
        "Fiyatlandırma politikamız tamamen şeffaftır. Size sunulan toplantı odası kiralama fiyatına KDV, teknik altyapı kullanımı ve temel ikramlar dahildir. Rezervasyon öncesi anlaşılan bedel dışında hiçbir sürpriz ek ücret veya aidat talep edilmez.",
    },
    {
      question: "Toplantı odası arabuluculuk görüşmeleri için uygun mu?",
      answer:
        "Evet, toplantı odalarımız zorunlu arabuluculuk ve müzakere görüşmeleri için uygundur; tarafların rahatça görüşebileceği sessiz, tarafsız ve gizliliğe elverişli bir ortam sağlar. Mahall Ankara'daki merkezi konumumuz taraflar için kolay ulaşım sunar; randevu bazlı rezervasyonla odanız toplantı öncesinde hazırlanır. Projeksiyon, fiber internet ve ikram dahil donanım sayesinde görüşmenize odaklanabilirsiniz.",
    },
    {
      question: "Çankaya'da saatlik toplantı odası kiralayabilir miyim?",
      answer:
        "Evet, Çankaya'daki Mahall Ankara'da bulunan toplantı odalarımızı saatlik veya günlük olarak kiralayabilirsiniz. Merkezi konumu, fiber internet ve sunum donanımıyla arabuluculuk, müzakere ve ekip toplantıları için uygundur.",
    },
  ],
};

export const HIZMET_DETAY_MAP: Record<string, ServiceDetailData> = {
  "cankaya-sanal-ofis": CANKAYA_SANAL_OFIS,
  "hazir-ofis-kiralama": HAZIR_OFIS,
  "makam-odasi-kiralama": MAKAM_ODASI,
  "toplanti-odasi-kiralama": TOPLANTI_ODASI,
};

export function getServicePagePath(detail: ServiceDetailData): string {
  return detail.canonicalPath ?? `/hizmetlerimiz/${detail.slug}`;
}

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "mahall-sanal-ofis": "cankaya-sanal-ofis",
  "hazir-ofis-hizmeti": "hazir-ofis-kiralama",
  "makam-odasi-hizmeti": "makam-odasi-kiralama",
  "toplanti-odasi-hizmeti": "toplanti-odasi-kiralama",
};

export function getServiceDetail(slug: string): ServiceDetailData | undefined {
  const resolved = SERVICE_SLUG_ALIASES[slug] ?? slug;
  return HIZMET_DETAY_MAP[resolved];
}
