import type { ComponentType, SVGProps } from "react";
import {
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

const SANAL_PACKAGE_FEATURE_CARDS: readonly PackageFeatureCard[] = [
  {
    icon: MapPinIcon,
    title: "Mahall Ankara Yasal Adres",
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
};

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

const MAHALL_SANAL_OFIS: ServiceDetailData = {
  slug: "mahall-sanal-ofis",
  title: "Mahall Sanal Ofis",
  targetHeadingAccent: "Mahall Sanal Ofis",
  packageHeadingAccent: "Mahall Sanal Ofis",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Mahall Sanal Ofis" },
  ],
  introTitle: "Ankara'da Prestijli Mahall Sanal Ofis Çözümleri",
  introParagraphs: [
    "Fiziksel bir ofis kiralamanın yüksek maliyetlerine katlanmadan, Ankara'nın en prestijli iş merkezlerinden Mahall Ankara'da yasal iş adresinize sahip olun. Girişimciler, freelancerlar ve KOBİ'ler için tasarlanan sanal ofis hizmetimiz; vergi levhası, ticaret sicil adresi ve resmi yazışma ihtiyaçlarınızı kusursuz şekilde karşılar.",
    "Sadece kullandığınız hizmetler için ödeme yaparak bina aidatı, mobilya ve stopaj vergisi gibi ekstra giderlerden kurtulun. Gelen resmi tebligatlarınız ve kargolarınız profesyonel ekibimiz tarafından titizlikle yönetilirken, siz tam zamanlı bir ofis ihtiyacı duymadan işinizi büyütmeye ve kurumsal imajınızı güçlendirmeye odaklanın.",
  ],
  introFeatures: [
    {
      num: "01",
      title: "Yasal ve Prestijli Adres",
      description:
        "Vergi levhası ve resmi yazışmalarınız için kurumsal iş adresi.",
    },
    {
      num: "02",
      title: "Kargo ve Posta Yönetimi",
      description:
        "Gelen tüm evraklarınız anında teslim alınır ve size bildirilir.",
    },
    {
      num: "03",
      title: "Stopaj ve Aidat Yok",
      description:
        "Gizli maliyetler ve faturalar olmadan, sadece kullandığınızı ödeyin.",
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
  targetTitle: "Mahall Sanal Ofis Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: ComputerDesktopIcon,
      title: "Freelancer ve Danışmanlar",
      paragraph:
        "Bağımsız çalışanlar ve yazılımcılar için düşük sabit maliyetle yüksek prestij. Vergi levhası adresinizi sabitleyin, resmi posta ve tebligatlarınız güvenle takip edilsin.",
    },
    {
      icon: RocketLaunchIcon,
      title: "Yeni Girişimciler ve KOBİ'ler",
      paragraph:
        "Yeni kurulan şirketler için nakit akışını koruyan esnek çözüm. Yüksek ofis kirası ve taahhüt altına girmeden ticaret sicil ve vergi dairesi süreçlerinizi hemen başlatın.",
    },
    {
      icon: GlobeAltIcon,
      title: "Yurtdışı Merkezli Şirketler",
      paragraph:
        "Türkiye'de faaliyet gösterecek yabancı sermayeli şirketler için yasal temsil adresi. Fiziksel ofis açmadan Ankara'nın prestijli lokasyonunda operasyonel maliyetlerinizi düşürün.",
    },
    {
      icon: ScaleIcon,
      title: "Avukatlar ve Hukuk Büroları",
      paragraph:
        "Avukat sanal ofis çözümleriyle baro kaydınız için prestijli yasal adres sağlayın. Duruşmadayken resmi tebligatlarınız güvenle teslim alınsın ve anında size bildirilsin.",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Klinik ve Uzman Psikologlar",
      paragraph:
        "Online terapi süreçlerinizde ev adresinizi gizli tutarak kurumsal bir imaj çizin. Yüz yüze seanslarınız için ihtiyaç anında tam donanımlı toplantı odalarını kullanın.",
    },
    {
      icon: HeartIcon,
      title: "Online Diyetisyenler",
      paragraph:
        "Fiziksel bir kliniğe yüksek kiralar ödemeden yasal adresinize sahip olun. Danışanlarınızla yüz yüze görüşmek istediğinizde prestijli lobi ve ofis alanlarımızda ağırlayın.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Mahall Ankara'nın Merkezinde Prestijli İş Adresi",
    leftParagraphs: [
      "Ankara'nın yeni iş merkezi Çankaya Mahall Ankara'da yer alan sanal ofisinizle, markanıza A+ bir imaj katın. Sadece bir yasal adres değil; metroya komşu, Danıştay'ın yanı başında ve prestijin zirvesinde bir çalışma ekosistemine dahil olun.",
      "Stopaj avantajı, profesyonel kargo takibi ve şık bir lobi karşılamasıyla Ankara Mahall sanal ofis çözümümüz, işletmenizin kurumsal itibarını zirveye taşırken operasyonel maliyetlerinizi sıfıra indirir.",
    ],
    sliderImages: MAHALL_OFFICE_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Mahall Sanal Ofis Paketimizin Ayrıcalıkları",
  packageIntroParagraphs: [
    "Ankara'nın en prestijli iş merkezi Çankaya Mahall Ankara'da, şirketinizin ihtiyaç duyduğu tüm yasal ve operasyonel süreçleri tek bir çatı altında topluyoruz. Mahall sanal ofis paketimiz ile sadece resmi bir yasal adres değil; markanızın kurumsal itibarını en üst seviyeye taşıyacak eksiksiz ve prestijli bir ofis ekosistemine dahil olursunuz.",
    "Geleneksel ofislerin aksine kira stopajı, bina aidatı, elektrik veya su faturası gibi gizli masraflarla asla karşılaşmazsınız. Tamamen şeffaf ve sabit fiyatlandırma politikamız sayesinde bütçenizi korurken; tebligat yönetimi, prestijli lokasyon ve profesyonel karşılama gibi tüm ayrıcalıklara aynı gün içinde sahip olabilirsiniz.",
  ],
  packageFeatureCards: SANAL_PACKAGE_FEATURE_CARDS,
  packageCta: { label: "Paket Fiyatlarını İncele", href: "/fiyatlar" },
  packageListItems: [],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: testimonialsFromIndices([0, 1, 2, 3]),
  faq: [
    {
      question: "Sanal ofis adresi vergi levhasında kullanılabilir mi?",
      answer:
        "Evet. Konsept Ofis sanal ofis adresi, vergi levhası ve ticaret sicil adresi olarak yasal iş adresi niteliğinde kullanılabilir. Adres, resmi evraklarda ve Ticaret Sicil Gazetesi ilanlarında geçerli kabul edilir. Vergi dairesi yoklamalarında bu adres iş adresi olarak beyan edilebilir. NACE kodlarına uyumlu adres tanımlaması ile şirket kuruluşu ve adres değişikliği işlemleri sorunsuz tamamlanır.",
    },
    {
      question: "Sanal ofiste stopaj veya aidat öder miyim?",
      answer:
        "Hayır. Sanal ofis paketlerimizde stopaj kesintisi uygun koşullarda uygulanmaz; bina aidatı, elektrik, su veya ortak gider payı gibi ek maliyetler bulunmaz. Ödemeniz yalnızca seçtiğiniz paket bedeli ve yasal KDV üzerinden hesaplanır. Faturalandırma şeffaf ve önceden belirlenmiş fiyatlar üzerinden yapılır; gizli kalem yoktur.",
    },
    {
      question: "Posta ve kargo nasıl takip edilir?",
      answer:
        "Gelen posta, kargo ve tebligatlar merkezimizde kabul edilir ve kayıt altına alınır. Size e-posta veya tercih ettiğiniz kanal üzerinden anında bilgilendirme yapılır. Evraklar talep ettiğiniz şekilde elden teslim, kargo ile gönderim veya dijital kopya ile size ulaştırılır. Tebligat süreleri takip edilir; zamanında yanıt vermeniz için gerekli bildirimler sağlanır.",
    },
    {
      question: "Toplantı odası veya hazır ofis ek olarak kullanılabilir mi?",
      answer:
        "Evet. Sanal ofis paketinize ek olarak ihtiyaç duyduğunuzda saatlik toplantı odası veya günlük/aylık hazır ofis kiralayabilirsiniz. Aynı adres ve binada hizmet verildiği için müşteri görüşmeleriniz veya ekip toplantılarınız tek bir lokasyonda yürütülebilir. Rezervasyon ve fiyat bilgisi için bizimle iletişime geçebilirsiniz.",
    },
  ],
};

const HAZIR_OFIS: ServiceDetailData = {
  slug: "hazir-ofis-hizmeti",
  title: "Hazır Ofis",
  targetHeadingAccent: "Hazır Ofis",
  packageHeadingAccent: "Mahall Hazır Ofis",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Hazır Ofis" },
  ],
  introTitle: "Hazır Ofis Nedir ve İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Hazır ofis, mobilya ve teknik altyapısı hazır, günlük veya aylık kiralanabilen çalışma birimleridir. Ankara Çankaya'da tam donanımlı ofislerimizle sabit kira taahhüdü olmadan profesyonel bir çalışma ortamına sahip olursunuz. İnternet, elektrik, ortak alanlar ve güvenlikli giriş dahildir.",
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
  targetTitle: "Hazır Ofis Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: RocketLaunchIcon,
      title: "Küçük Ekipler ve Startuplar",
      paragraph:
        "Küçük ekip veya startup'lar için sabit ofis kirası nakit akışını zorlar. Hazır ofis ile aylık veya günlük esnek kiralama yapılır; mobilya ve altyapı hazır olduğu için taşınır taşınmaz çalışmaya başlanır. Toplantı odası ve ortak alanlar sayesinde hem bireysel hem ekip çalışması desteklenir.",
    },
    {
      icon: BriefcaseIcon,
      title: "Proje Bazlı Çalışanlar",
      paragraph:
        "Belirli projeler için geçici ofis ihtiyacı duyan danışmanlar veya ekipler, hazır ofis ile kısa süreli profesyonel alan kiralayabilir. Proje bittiğinde sözleşme yenilenmeyebilir; böylece taahhüt riski olmadan merkezi bir adreste çalışılır.",
    },
    {
      icon: ComputerDesktopIcon,
      title: "Uzaktan ve Hibrit Çalışanlar",
      paragraph:
        "Hibrit çalışma modelinde haftanın belirli günleri ofise gelmek isteyenler, hazır ofis ile sabit masaya sahip olabilir. İnternet ve altyapı hazır olduğundan verimli çalışma ortamı sunulur; ofis dışı günlerde ek maliyet oluşmaz.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Mahall Ankara'da Hazır Ofis ile Prestij ve Konfor",
    leftParagraphs: [
      "Çankaya Mahall Ankara'da yer alan hazır ofis birimlerimizle, markanıza merkezi ve kurumsal bir adres kazandırırsınız. Metro ve ana arterlere yakın konum; müşteri ve iş ortaklarınız için kolay ulaşım sunar.",
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
  ],
};

const MAKAM_ODASI: ServiceDetailData = {
  slug: "makam-odasi-hizmeti",
  title: "Makam Odası",
  targetHeadingAccent: "Makam Odası",
  packageHeadingAccent: "Mahall Makam Odası",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Makam Odası" },
  ],
  introTitle: "Makam Odası Nedir ve İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Makam odası, üst düzey görüşmeler, müşteri sunumları ve yönetim toplantıları için tasarlanmış, mobilya ve altyapısı hazır prestijli bir çalışma alanıdır. Mahall Ankara'daki merkezimizde konforlu ve profesyonel bir ortamda kurumsal imajınızı güçlendirirsiniz; fiber internet, ikramlar ve resepsiyon hizmeti ile tek noktadan yönetilirsiniz.",
    "Hazır ofis birimlerimizden daha geniş ve ayrıcalıklı düzenlenen makam alanlarımızda, gizlilik ve konfor ön plandadır. Esnek günlük veya aylık kiralama seçenekleriyle sabit uzun süreli taahhüt olmadan ihtiyacınız olduğunda premium bir ofis deneyimi sunuyoruz.",
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
  targetTitle: "Makam Odası Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: BriefcaseIcon,
      title: "Üst Düzey Yönetici ve Danışmanlar",
      paragraph:
        "Kritik müşteri görüşmeleri ve sunumlar için prestijli bir adres arayan yöneticiler ve danışmanlar, makam odası ile kurumsal imajlarını destekler. Tüm altyapı hazır olduğundan odak sadece görüşmeye kalır.",
    },
    {
      icon: BuildingOffice2Icon,
      title: "Şirket Temsilcileri ve Ortaklar",
      paragraph:
        "Şirketinizi Mahall Ankara'da temsil ederken geniş ve konforlu bir makam alanında ağırlama yapabilirsiniz. İkram ve ortak alan kullanımı ile profesyonel bir deneyim sunulur.",
    },
    {
      icon: UserGroupIcon,
      title: "Küçük Yönetim Kurulu ve Ekip Oturumları",
      paragraph:
        "Dar çekirdek toplantılar ve strateji oturumları için sessiz, donanımlı bir alan ihtiyacı duyan ekipler makam odasını tercih edebilir. Toplantı odası kiralamadan daha uzun süreli çalışma imkânı sunar.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Mahall Ankara'da Makam Odası ile Kurumsal Prestij",
    leftParagraphs: [
      "Çankaya Mahall Ankara'da konumlanan makam odalarımız; lokasyon, lobi ve resepsiyon ayrıcalığıyla markanızın görünürlüğünü güçlendirir.",
      "Şeffaf fiyatlandırma ve esnek sürelerle bütçenizi korurken; sınırsız çay-kahve ve ortak alanlar ile tam hizmetli bir ofis deneyimi yaşarsınız.",
    ],
    sliderImages: MAHALL_OFFICE_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Mahall Makam Odası Paketimizin Ayrıcalıkları",
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
      question: "Makam odasını günlük kiralayabilir miyim?",
      answer:
        "Evet. Günlük veya aylık esnek kiralama seçeneklerimiz mevcuttur. Doluluk ve paket türüne göre size uygun tarih ve süreyi planlarız. Detaylar için iletişime geçebilirsiniz.",
    },
  ],
};

const TOPLANTI_ODASI: ServiceDetailData = {
  slug: "toplanti-odasi-hizmeti",
  title: "Toplantı Odası",
  targetHeadingAccent: "Toplantı Odası",
  packageHeadingAccent: "Mahall Toplantı Odası",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Toplantı Odası" },
  ],
  introTitle: "Toplantı Odası Kiralama ve İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Toplantı odası kiralama, müşteri görüşmeleri ve ekip toplantılarınız için saatlik veya blok saatler halinde tam donanımlı bir alan kullanmanızı sağlar. Ankara'da Mahall Ankara adresinde sunulan toplantı odalarımızda projeksiyon, internet ve ikram imkânları bulunur; gizli maliyet olmadan net fiyat sunulur.",
    "Sürekli ofis kiralamak yerine yalnızca toplantı günlerinde profesyonel bir mekân kullanmak isteyen girişimciler ve ekipler için ideal bir çözümdür. Rezervasyon önceden yapılır; ihtiyacınız olan saat diliminde odalar kullanıma hazırdır.",
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
  targetTitle: "Toplantı Odası Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      icon: BriefcaseIcon,
      title: "Satış ve Müşteri Ekipleri",
      paragraph:
        "Müşteri görüşmeleri için kurumsal bir ortam arayan satış ekipleri, saatlik toplantı odası ile sabit ofis maliyeti olmadan profesyonel buluşma alanı kullanır. Sunum ve projeksiyon imkânı ile etkileyici görüşmeler yapılabilir.",
    },
    {
      icon: ComputerDesktopIcon,
      title: "Danışmanlar ve Serbest Profesyoneller",
      paragraph:
        "Müşterileriyle yüz yüze toplantı yapan danışmanlar, merkezi konumdaki toplantı odalarımızı randevu bazlı kiralayabilir. Gizli maliyet yok; yalnızca kullanılan saat üzerinden ödeme yapılır.",
    },
    {
      icon: UserGroupIcon,
      title: "Küçük Ekipler",
      paragraph:
        "Düzenli ekip toplantıları yapan küçük şirketler, kendi ofisleri yeterli olmadığında veya tarafsız bir mekânda buluşmak istediğinde toplantı odası kiralayabilir. İnternet ve sunum altyapısı hazırdır.",
    },
  ],
  features: [],
  mahallSpotlightBlock: {
    leftTitle: "Mahall Ankara'da Profesyonel Toplantı Alanları",
    leftParagraphs: [
      "Mahall Ankara'da konumlanan toplantı odalarımız; müşteri sunumları, iş geliştirme görüşmeleri ve ekip toplantıları için sessiz, aydınlatılmış ve tam donanımlı alanlar sunar.",
      "Rezervasyon süreci hızlıdır; giriş ve yönlendirme profesyonel ekibimizce yönetilir. İkramlar ve teknik altyapı dahildir; böylece toplantınıza odaklanırsınız.",
    ],
    sliderImages: MAHALL_OFFICE_SLIDER_IMAGES,
  },
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [],
  packageTitle: "Mahall Toplantı Odası Paketimizin Ayrıcalıkları",
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
      question: "Toplantı odasını saatlik mi kiralıyorum?",
      answer:
        "Evet. Toplantı odalarımız saatlik veya blok saatler halinde kiralanabilir. Rezervasyon için önceden randevu almanız yeterlidir. Kullanım süreniz boyunca oda ve ekipmanlar size ayrılır.",
    },
    {
      question: "Fiyata KDV dahil mi?",
      answer:
        "Tabloda belirtilen fiyatlara KDV eklenmektedir. Gizli ek ücret bulunmaz; projeksiyon, internet ve ikram kullanımı dahildir.",
    },
  ],
};

export const HIZMET_DETAY_MAP: Record<string, ServiceDetailData> = {
  "mahall-sanal-ofis": MAHALL_SANAL_OFIS,
  "hazir-ofis-hizmeti": HAZIR_OFIS,
  "makam-odasi-hizmeti": MAKAM_ODASI,
  "toplanti-odasi-hizmeti": TOPLANTI_ODASI,
};

export function getServiceDetail(slug: string): ServiceDetailData | undefined {
  return HIZMET_DETAY_MAP[slug];
}
