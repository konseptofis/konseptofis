import type { ComponentType, SVGProps } from "react";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  DocumentTextIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TruckIcon,
  BriefcaseIcon,
  UserGroupIcon,
  WifiIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export type ServiceFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export type TargetAudience = {
  title: string;
  paragraph: string;
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

export type ServiceDetailData = {
  slug: string;
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  introTitle: string;
  introParagraphs: string[];
  targetTitle: string;
  targetAudience: TargetAudience[];
  features: ServiceFeature[];
  processTitle: string;
  processSteps: ProcessStep[];
  packageTitle: string;
  packageIntroParagraphs: string[];
  packageListItems: string[];
  testimonialsTitle: string;
  testimonials: Testimonial[];
  faq: { question: string; answer: string }[];
};

const SANAL_OFIS: ServiceDetailData = {
  slug: "sanal-ofis-hizmeti",
  title: "Sanal Ofis",
  breadcrumbs: [
    { label: "Anasayfa", href: "/" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Sanal Ofis" },
  ],
  introTitle: "Sanal Ofis Nedir ve İşinize Nasıl Değer Katar?",
  introParagraphs: [
    "Sanal ofis, fiziksel bir ofis kiralamadan kurumsal bir iş adresi kullanmanızı sağlayan bir hizmet modelidir. Özellikle girişimciler, freelancerlar ve KOBİ'ler için maliyetleri düşürürken vergi levhası, ticaret sicil adresi ve resmi yazışma adresi ihtiyaçlarını karşılar. Ankara gibi iş merkezlerinde prestijli bir adrese sahip olmak, müşteri ve iş ortakları nezdinde güven oluşturur; sanal ofis bu imkânı sabit kira ödemeden sunar.",
    "Konsept Ofis sanal ofis paketlerinde posta ve kargo kabulü, tebligat takibi ve isteğe bağlı profesyonel telefon hattı gibi hizmetler yer alır. Tüm süreçler şeffaf bir şekilde yönetilir; gelen evraklarınız kayıt altına alınır ve size hızlıca iletilir veya talep ettiğiniz şekilde yönlendirilir. Böylece hem yasal zorunlulukları yerine getirir hem de kurumsal imajınızı güçlendirirsiniz.",
    "Sanal ofis hizmeti, ofis maliyetlerini minimize ederek bütçenizi asıl işinize yönlendirmenize olanak tanır. Bina aidatı, elektrik, su, doğalgaz veya mobilya gideri olmadan yalnızca kullandığınız hizmetler için ödeme yaparsınız. Uygun koşullarda stopajsız faturalandırma seçeneği de sunulur; böylece hem yasal hem mali açıdan avantajlı bir çözüm elde edersiniz.",
    "Mahall Ankara gibi merkezi ve erişilebilir bir lokasyonda konumlanan adresimiz, toplantı veya müşteri görüşmeleri gerektiğinde saatlik toplantı odası veya hazır ofis kullanımı ile desteklenebilir. Böylece tam zamanlı ofis ihtiyacı duymadan, ihtiyaç anında fiziksel alan kullanma esnekliğine sahip olursunuz.",
  ],
  targetTitle: "Sanal Ofis Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      title: "Freelancer ve Danışmanlar",
      paragraph:
        "Bağımsız çalışan danışmanlar, yazılımcılar ve serbest profesyoneller, vergi levhası ve ticaret sicil adresi için sabit ofis kiralamak istemez. Sanal ofis ile resmi iş adresi ihtiyacı karşılanır; posta ve tebligatlar güvenle takip edilir. Müşteri görüşmeleri gerektiğinde saatlik toplantı odası kullanımı ile kurumsal bir imaj sunulur. Böylece düşük sabit maliyetle yüksek profesyonellik sağlanır.",
    },
    {
      title: "Yeni Girişimciler",
      paragraph:
        "Yeni kurulan şirketler için ilk aylarda nakit akışı kritiktir. Sanal ofis, yüksek kira ve taahhüt olmadan yasal adres ihtiyacını karşılar. Şirket büyüdükçe hazır ofis veya kendi ofisine geçiş yapılabilir; bu süreçte sanal ofis esnek ve ölçeklenebilir bir başlangıç çözümü sunar. Ticaret Sicil Gazetesi ilanları ve vergi dairesi yazışmaları için tek bir merkezi adres kullanılır.",
    },
    {
      title: "Yurtdışı Merkezli Şirketler",
      paragraph:
        "Türkiye'de faaliyet göstermek isteyen yabancı sermayeli veya yurtdışı merkezli şirketler, yerel bir iş adresi zorunluluğu ile karşılaşır. Sanal ofis, bu adresi Ankara gibi prestijli bir lokasyonda, posta kabulü ve tebligat takibi dahil şekilde sunar. Böylece fiziksel ofis açmadan yasal temsil ve adres gereksinimleri karşılanır; operasyonel maliyetler kontrol altında tutulur.",
    },
  ],
  features: [
    {
      icon: MapPinIcon,
      title: "Yasal Adres Temini",
      description:
        "Sanal ofis adresimiz, vergi levhası ve ticaret sicil adresi olarak yasal iş adresi niteliğinde kullanılabilir. Vergi dairesi yoklamaları, Ticaret Sicil Gazetesi ilanları ve resmi evraklarda bu adres geçerli kabul edilir. NACE kodlarına uyumlu adres tanımlaması ile şirket kuruluşu ve adres değişikliği süreçlerinde sorunsuz ilerleme sağlanır. Kargo ve posta teslimatları da aynı adrese yapılır; teslim alım ve takip hizmetimizle süreç yönetilir.",
    },
    {
      icon: DocumentTextIcon,
      title: "Posta ve Tebligat",
      description:
        "Gelen posta, kargo ve tebligatlar profesyonel ekibimiz tarafından kabul edilir ve kayıt altına alınır. Size anında bilgilendirme yapılır; evraklar talep ettiğiniz şekilde (elden teslim, kargo ile gönderim veya dijital kopya) size ulaştırılır. Tebligat süreleri takip edilir; zamanında yanıt ve işlem yapmanız için gerekli bildirimler sağlanır. Böylece resmi yazışmalarınızı tek bir merkezden takip edebilirsiniz.",
    },
    {
      icon: PhoneIcon,
      title: "Profesyonel Telefon Hattı",
      description:
        "İsteğe bağlı olarak sanal ofis paketinize dahil edebileceğiniz profesyonel telefon hattı ile kurumsal iletişim imkânı sunuyoruz. Arayanlar Ankara’daki merkez numaranızdan ulaşır; çağrılar sizin belirlediğiniz yönlendirme kurallarına göre iletilir. Böylece sabit hat maliyeti ve tesisat olmadan kurumsal bir iletişim kanalına sahip olursunuz. Çağrı kayıtları ve raporlama seçenekleri ile iletişim süreçlerinizi takip edebilirsiniz.",
    },
    {
      icon: BuildingOffice2Icon,
      title: "Prestijli Lokasyon",
      description:
        "Adresimiz Mahall Ankara, Çankaya’da yer alır; ulaşım ve erişim açısından merkezi bir konumdadır. Müşteri veya iş ortaklarıyla yüz yüze görüşmek istediğinizde aynı binada toplantı odası veya hazır ofis kiralayarak aynı adresi kullanmaya devam edebilirsiniz. Lokasyonun prestiji, ticari görüşmelerde ve resmi yazışmalarda güven artırıcı bir rol oynar.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Stopajsız Faturalandırma",
      description:
        "Uygun koşullarda sanal ofis hizmetimiz stopaj kesintisi olmadan faturalandırılabilir. Böylece ödediğiniz tutar net olarak hizmet bedelini yansıtır; gizli kesinti veya ek vergi yükü oluşmaz. Faturalandırma dönemleri ve ödeme koşulları şeffaf bir şekilde sözleşmede belirtilir. Aidat, elektrik, su veya ortak gider payı gibi ek kalemler bulunmaz.",
    },
    {
      icon: TruckIcon,
      title: "Kargo Kabulü",
      description:
        "Evrak, numune veya ticari kargolarınız adresimize gönderilebilir; kabul ve teslim alma işlemi profesyonel ekibimizce yapılır. Kargo takip bilgileri size iletilir; teslim sonrası isterseniz sizin belirleyeceğiniz adrese yeniden kargolama veya elden teslim seçenekleri sunulur. Böylece adresinizi hem yasal hem operasyonel anlamda aktif olarak kullanırsınız.",
    },
  ],
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [
    {
      title: "1. İhtiyaç Analizi",
      description:
        "Sanal ofis hizmeti talebinizde öncelikle ihtiyaçlarınızı birlikte değerlendiriyoruz. Vergi levhası ve ticaret sicil adresi kullanımı, posta-kargo takibi, telefon hattı ihtiyacı ve olası toplantı odası kullanımı gibi konular netleştirilir. Size uygun paket ve ek hizmetler belirlenir; fiyatlandırma şeffaf bir şekilde sunulur.",
    },
    {
      title: "2. Sözleşme",
      description:
        "Seçtiğiniz paket ve hizmetler için sözleşme düzenlenir. Sözleşmede adres kullanım koşulları, hizmet kapsamı, ödeme dönemleri ve tarafların yükümlülükleri yer alır. İmza ve gerekli belgeler tamamlandıktan sonra süreç resmiyet kazanır ve adres tahsisine geçilir.",
    },
    {
      title: "3. Adres Tahsisi",
      description:
        "Sözleşme onayı sonrası size özel adres bilgisi ve kullanım talimatları iletılir. Vergi dairesi veya ticaret sicil işlemlerinizde kullanacağınız tam adres, posta kodu ve iletişim bilgileri paylaşılır. İsteğe bağlı telefon hattı aktif edilmişse yönlendirme ayarları birlikte yapılır.",
    },
    {
      title: "4. Hizmet Kullanımı",
      description:
        "Adres tahsisinden itibaren posta, kargo ve tebligatlarınız adresimizde kabul edilir ve size bilgilendirme yapılır. Süreç boyunca destek ekibimiz sorularınız ve talepleriniz için yanınızdadır. İhtiyaç duyduğunuzda toplantı odası veya hazır ofis rezervasyonu da aynı adres üzerinden yapılabilir.",
    },
  ],
  packageTitle: "Paketimize Neler Dahil?",
  packageIntroParagraphs: [
    "Sanal ofis paketlerimiz, yasal adres ihtiyacınızı tek bir çatı altında karşılayacak şekilde tasarlanmıştır. Paket içeriği sabit ve şeffaftır; ekstra kullanımlar (örneğin toplantı odası veya ek telefon hattı) isteğe bağlı olarak eklenebilir. Böylece yalnızca ihtiyacınız olan hizmetler için ödeme yaparsınız.",
    "Tüm paketlerde posta ve kargo kabulü, tebligat takibi ve prestijli Mahall Ankara adresi standart olarak yer alır. Stopajsız faturalandırma imkânı ve aidat/ek gider olmaması sayesinde bütçeniz öngörülebilir kalır. Aşağıdaki listede paket içeriğinin detaylarını bulabilirsiniz.",
  ],
  packageListItems: [
    "Yasal iş adresi olarak vergi levhası ve ticaret sicil adresi kullanımı.",
    "Posta, kargo ve tebligatların kabulü ve size bilgilendirme ile takibi.",
    "İsteğe bağlı profesyonel telefon hattı ve yönlendirme hizmeti.",
    "Mahall Ankara, Çankaya lokasyonunda prestijli adres imkânı.",
    "Uygun koşullarda stopaj ödemesiz, şeffaf faturalandırma.",
    "Bina aidatı, elektrik, su veya ortak gider payı ödemesi yok.",
    "Fatura ve ek maliyet kalemi olmadan net paket fiyatı.",
    "İhtiyaç halinde saatlik toplantı odası ve hazır ofis kullanım seçeneği.",
    "Müşteri hizmetleri ve adres kullanımına dair sürekli destek.",
  ],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: [
    {
      quote:
        "Sanal ofis hizmeti sayesinde şirket adresimizi prestijli bir lokasyona taşıdık. Posta ve kargo kabulü, müşteri toplantıları için toplantı odası imkânı çok işimize yarıyor. Vergi levhası ve ticaret sicil işlemlerimiz sorunsuz ilerliyor. Kesinlikle tavsiye ederim.",
      name: "Ahmet Yılmaz",
      title: "Kurucu",
      company: "TechStart Danışmanlık",
    },
    {
      quote:
        "Yeni kurduğum şirket için yasal adres ve posta hizmeti aldım. Süreç hızlı, iletişim net. Mahall Ankara konumu da ulaşım açısından çok iyi. Stopajsız faturalandırma ve gizli maliyet olmaması bütçemizi rahatlattı. Teşekkürler Konsept Ofis.",
      name: "Can Arslan",
      title: "Genel Müdür",
      company: "Arslan Dış Ticaret",
    },
    {
      quote:
        "Hem sanal ofis hem toplantı odası kullanıyorum. Fiyatlar net, ekstra ücret yok. Ekip ilgili ve profesyonel. Ankara'da ofis çözümü arayan herkese öneriyorum.",
      name: "Selin Yıldız",
      title: "Serbest Muhasebeci",
      company: "Yıldız Mali Müşavirlik",
    },
  ],
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
  ...SANAL_OFIS,
  slug: "hazir-ofis-hizmeti",
  title: "Hazır Ofis",
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
  targetTitle: "Hazır Ofis Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    {
      title: "Küçük Ekipler ve Startuplar",
      paragraph:
        "Küçük ekip veya startup'lar için sabit ofis kirası nakit akışını zorlar. Hazır ofis ile aylık veya günlük esnek kiralama yapılır; mobilya ve altyapı hazır olduğu için taşınır taşınmaz çalışmaya başlanır. Toplantı odası ve ortak alanlar sayesinde hem bireysel hem ekip çalışması desteklenir.",
    },
    {
      title: "Proje Bazlı Çalışanlar",
      paragraph:
        "Belirli projeler için geçici ofis ihtiyacı duyan danışmanlar veya ekipler, hazır ofis ile kısa süreli profesyonel alan kiralayabilir. Proje bittiğinde sözleşme yenilenmeyebilir; böylece taahhüt riski olmadan merkezi bir adreste çalışılır.",
    },
    {
      title: "Uzaktan ve Hibrit Çalışanlar",
      paragraph:
        "Hibrit çalışma modelinde haftanın belirli günleri ofise gelmek isteyenler, hazır ofis ile sabit masaya sahip olabilir. İnternet ve altyapı hazır olduğundan verimli çalışma ortamı sunulur; ofis dışı günlerde ek maliyet oluşmaz.",
    },
  ],
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [
    { title: "1. İhtiyaç Analizi", description: "Kişi sayısı, çalışma düzeni ve süre ihtiyacınız belirlenir; uygun birim önerilir." },
    { title: "2. Sözleşme", description: "Seçilen paket için sözleşme imzalanır; ödeme ve kullanım koşulları netleştirilir." },
    { title: "3. Birim Tahsisi", description: "Size ayrılan ofis birimi ve giriş bilgileri iletılır; taşınma tarihi planlanır." },
    { title: "4. Hizmet Kullanımı", description: "İlk günden itibaren internet, ortak alanlar ve destek hizmetlerinden yararlanırsınız." },
  ],
  packageTitle: "Paketimize Neler Dahil?",
  packageIntroParagraphs: [
    "Hazır ofis paketlerimiz tam donanımlı birim, internet ve ortak alan kullanımını kapsar. Süre ve kişi sayısına göre esnek seçenekler sunulur.",
    "Aşağıda paket içeriğinin detaylı listesini bulabilirsiniz.",
  ],
  packageListItems: [
    "Tam donanımlı ofis birimi ve çalışma masaları.",
    "Yüksek hızlı fiber internet ve teknik altyapı.",
    "Sınırsız çay ve kahve ile ortak mutfak kullanımı.",
    "Yazıcı ve temel ofis ekipmanlarına erişim.",
    "Güvenlikli bina girişi ve 7/24 erişim seçenekleri.",
    "Günlük profesyonel temizlik hizmeti.",
    "İsteğe bağlı toplantı odası kullanımı.",
    "Müşteri hizmetleri ve operasyonel destek.",
  ],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: [
    { quote: "Hazır ofis kiralama sürecinde Konsept Ofis ekibi çok ilgiliydi. Merkezi konum, hızlı internet ve sınırsız çay-kahve ile günlük çalışma ortamı ihtiyacımı karşılıyorum.", name: "Elif Kaya", title: "Kurucu", company: "Kaya Dijital" },
    { quote: "Tam donanımlı ofis birimleri ve esnek sözleşme koşulları sayesinde büyüme dönemimizi sorunsuz yönettik. Toplantı odası kullanımı da işimize çok yarıyor.", name: "Mehmet Demir", title: "Genel Müdür", company: "Demir Yazılım" },
  ],
  faq: [
    { question: "Hazır ofisi günlük kiralayabilir miyim?", answer: "Evet. Günlük veya aylık esnek kiralama seçeneklerimiz mevcuttur. İhtiyacınıza göre paket oluşturabiliriz. Detaylar için iletişime geçebilirsiniz." },
    { question: "Toplantı odası kullanımı dahil mi?", answer: "Paket türüne göre toplantı odası kullanımı dahil veya ek ücretle saatlik kullanım imkânı sunulmaktadır. Size uygun seçeneği birlikte belirleyebiliriz." },
  ],
};

const TOPLANTI_ODASI: ServiceDetailData = {
  ...SANAL_OFIS,
  slug: "toplanti-odasi-hizmeti",
  title: "Toplantı Odası",
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
  targetTitle: "Toplantı Odası Çözümleri Kimler İçin İdealdir?",
  targetAudience: [
    { title: "Satış ve Müşteri Ekipleri", paragraph: "Müşteri görüşmeleri için kurumsal bir ortam arayan satış ekipleri, saatlik toplantı odası ile sabit ofis maliyeti olmadan profesyonel buluşma alanı kullanır. Sunum ve projeksiyon imkânı ile etkileyici görüşmeler yapılabilir." },
    { title: "Danışmanlar ve Serbest Profesyoneller", paragraph: "Müşterileriyle yüz yüze toplantı yapan danışmanlar, merkezi konumdaki toplantı odalarımızı randevu bazlı kiralayabilir. Gizli maliyet yok; yalnızca kullanılan saat üzerinden ödeme yapılır." },
    { title: "Küçük Ekipler", paragraph: "Düzenli ekip toplantıları yapan küçük şirketler, kendi ofisleri yeterli olmadığında veya tarafsız bir mekânda buluşmak istediğinde toplantı odası kiralayabilir. İnternet ve sunum altyapısı hazırdır." },
  ],
  processTitle: "Sürecimiz Nasıl İşliyor?",
  processSteps: [
    { title: "1. Rezervasyon Talebi", description: "İhtiyacınız olan tarih ve saat dilimini bildirirsiniz; uygun oda kontrol edilir." },
    { title: "2. Onay ve Ödeme", description: "Rezervasyon onaylanır; saatlik veya blok ücreti netleştirilir ve ödeme alınır." },
    { title: "3. Kullanım Bilgisi", description: "Giriş ve oda kullanım talimatları size iletılır." },
    { title: "4. Toplantı Günü", description: "Belirlenen saatte toplantı odası kullanıma hazırdır; ikram ve ekipmanlar dahildir." },
  ],
  packageTitle: "Paketimize Neler Dahil?",
  packageIntroParagraphs: [
    "Toplantı odası kiralama paketlerimiz saatlik veya blok saatler halinde sunulur. Kullanım süresince tüm ekipman ve ikramlar dahildir.",
    "Aşağıda paket içeriğinin listesini bulabilirsiniz.",
  ],
  packageListItems: [
    "Birinci sınıf toplantı masası ve koltuklar.",
    "Yüksek hızlı fiber internet erişimi.",
    "Projeksiyon ve ekran ile sunum imkânı.",
    "Mutfak kullanımı ve çay-kahve ikramı.",
    "Yazıcı ve temel ofis ekipmanları.",
    "Misafir karşılama ve yönlendirme.",
    "Güvenlikli bina girişi.",
  ],
  testimonialsTitle: "Müşterilerimiz Ne Diyor?",
  testimonials: [
    { quote: "Toplantı odasını saatlik kiraladım; temiz, sessiz ve donanımlıydı. Fiyatlar şeffaf, gizli maliyet yok. İş ortaklarımla görüşmek için artık hep bu adresi kullanıyorum.", name: "Zeynep Özkan", title: "Kurucu", company: "Özkan İletişim" },
  ],
  faq: [
    { question: "Toplantı odasını saatlik mi kiralıyorum?", answer: "Evet. Toplantı odalarımız saatlik veya blok saatler halinde kiralanabilir. Rezervasyon için önceden randevu almanız yeterlidir. Kullanım süreniz boyunca oda ve ekipmanlar size ayrılır." },
    { question: "Fiyata KDV dahil mi?", answer: "Tabloda belirtilen fiyatlara KDV eklenmektedir. Gizli ek ücret bulunmaz; projeksiyon, internet ve ikram kullanımı dahildir." },
  ],
};

export const HIZMET_DETAY_MAP: Record<string, ServiceDetailData> = {
  "sanal-ofis-hizmeti": SANAL_OFIS,
  "hazir-ofis-hizmeti": HAZIR_OFIS,
  "toplanti-odasi-hizmeti": TOPLANTI_ODASI,
};

export function getServiceDetail(slug: string): ServiceDetailData | undefined {
  return HIZMET_DETAY_MAP[slug];
}
