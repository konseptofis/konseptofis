export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: { name: string; avatar?: string };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sanal-ofis-avantajlari",
    title: "Sanal Ofis Kullanmanın Girişimcilere Sağladığı 5 Büyük Avantaj",
    excerpt:
      "Sanal ofis hizmeti, yeni iş kuran girişimciler ve KOBİ'ler için maliyetleri düşürürken kurumsal imajı güçlendiriyor. İşte en önemli 5 avantaj.",
    date: "12 Ekim 2023",
    category: "Sanal Ofis",
    readTime: "5 dk okuma",
    author: { name: "Konsept Ofis" },
  },
  {
    slug: "hazir-ofis-secerken",
    title: "Hazır Ofis Seçerken Dikkat Edilmesi Gereken 4 Kritik Nokta",
    excerpt:
      "Tam donanımlı hazır ofis kiralarken konum, esneklik, maliyet ve hizmetler gibi faktörlere dikkat etmek gerekiyor. Doğru karar için rehber.",
    date: "5 Ekim 2023",
    category: "İş Dünyası",
    readTime: "4 dk okuma",
    author: { name: "Konsept Ofis" },
  },
  {
    slug: "toplanti-odasi-rezervasyon",
    title: "Toplantı Odası Rezervasyonu: Saatlik Kiralama Avantajları",
    excerpt:
      "Müşteri görüşmeleri ve ekip toplantıları için saatlik toplantı odası kiralama, sabit maliyetleri azaltır. Nasıl rezervasyon yapılır?",
    date: "28 Eylül 2023",
    category: "Toplantı Odası",
    readTime: "3 dk okuma",
    author: { name: "Konsept Ofis" },
  },
  {
    slug: "vergi-levhasi-adresi",
    title: "Vergi Levhası Adresi Olarak Sanal Ofis Kullanımı",
    excerpt:
      "Sanal ofis adresi vergi levhası ve ticaret sicil adresi olarak kullanılabilir mi? Yasal süreçler ve dikkat edilmesi gerekenler.",
    date: "20 Eylül 2023",
    category: "Sanal Ofis",
    readTime: "6 dk okuma",
    author: { name: "Konsept Ofis" },
  },
  {
    slug: "stopajsiz-ofis-kiralama",
    title: "Stopajsız Ofis Kiralama: Ne Anlama Geliyor?",
    excerpt:
      "Uygun koşullarda sanal ofis ve hazır ofis hizmetleri stopaj kesintisi olmadan faturalandırılabilir. Detayları öğrenin.",
    date: "15 Eylül 2023",
    category: "İş Dünyası",
    readTime: "4 dk okuma",
    author: { name: "Konsept Ofis" },
  },
  {
    slug: "ankara-ofis-cozumleri",
    title: "Ankara'da Esnek Ofis Çözümleri: Merkezi Konumun Önemi",
    excerpt:
      "Mahall Ankara gibi merkezi lokasyonlarda ofis kiralama, ulaşım ve prestij açısından girişimcilere önemli faydalar sağlıyor.",
    date: "10 Eylül 2023",
    category: "İş Dünyası",
    readTime: "3 dk okuma",
    author: { name: "Konsept Ofis" },
  },
];

const DEMO_BODY = {
  intro:
    "Girişimciler için ofis maliyetleri, işe başlamanın en büyük engellerinden biri olabiliyor. Sanal ofis hizmeti ise hem yasal iş adresi ihtiyacını karşılıyor hem de sabit giderleri minimuma indiriyor. Bu yazıda, sanal ofis kullanmanın girişimcilere sağladığı 5 büyük avantajı inceliyoruz.",
  sections: [
    {
      h2: "1. Maliyetleri Minimuma İndirin",
      p: "Geleneksel ofis kiralama, depozito, mobilya, internet ve kira giderleriyle bütçeyi zorlayabiliyor. Sanal ofis ile aylık sabit maliyetlerinizi ciddi oranda düşürebilirsiniz. Ödeme yalnızca kullandığınız hizmetlere göre yapılır; toplantı odası veya hazır ofis kullanımı ihtiyaç halinde eklenebilir.",
      list: [
        "Kira ve depozito ödemezsiniz.",
        "Mobilya ve donanım maliyeti yoktur.",
        "Yalnızca ihtiyacınız olan hizmetler için ödeme yaparsınız.",
      ],
    },
    {
      h2: "2. Kurumsal Adres ve Prestij",
      p: "Sanal ofis hizmeti ile prestijli bir iş adresiniz olur. Vergi levhası ve ticaret sicil adresi olarak kullanılabilen bu adres, müşteri ve iş ortaklarınızda güven oluşturur.",
      list: [
        "Yasal iş adresi olarak kullanım.",
        "Posta ve kargo kabulü hizmeti.",
        "Merkezi ve erişilebilir konum.",
      ],
    },
  ],
  blockquote:
    "Sanal ofisler, modern girişimin en akıllı yatırımıdır.",
  conclusion:
    "Sanal ofis, girişimcilerin hem maliyetleri kontrol etmesini hem de kurumsal bir adresle çalışmasını sağlar. Ankara'da Konsept Ofis olarak sanal ofis, hazır ofis ve toplantı odası hizmetlerimizle yanınızdayız.",
};

export const BLOG_POSTS_PER_PAGE = 6;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPaginatedPosts(page: number): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
} {
  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / BLOG_POSTS_PER_PAGE));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * BLOG_POSTS_PER_PAGE;
  const posts = BLOG_POSTS.slice(start, start + BLOG_POSTS_PER_PAGE);
  return { posts, totalPages, currentPage: safePage };
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getDemoBody() {
  return DEMO_BODY;
}
