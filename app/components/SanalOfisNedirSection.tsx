import Link from "next/link";
import SectionHeading from "./SectionHeading";
import {
  Globe,
  HeartPulse,
  Laptop,
  Rocket,
  Scale,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

const BODY_P =
  "text-[16px] leading-relaxed text-[var(--color-text-muted)]";

const AUDIENCE_CARDS: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Freelancer ve Danışmanlar",
    description:
      "Düşük sabit maliyetle prestijli yasal adres; resmi posta ve tebligatlarınız güvenle takip edilir.",
    icon: Laptop,
  },
  {
    title: "Yeni Girişimciler ve KOBİ'ler",
    description:
      "Yüksek kira taahhüdü olmadan ticaret sicil ve vergi dairesi süreçlerinizi hemen başlatın.",
    icon: Rocket,
  },
  {
    title: "E-Ticaret İşletmeleri",
    description:
      "Depo veya ev adresi yerine kurumsal iş adresi; yoğun kargo ve evrak trafiğiniz profesyonelce yönetilir.",
    icon: ShoppingCart,
  },
  {
    title: "Avukat ve Hukuk Büroları",
    description:
      "Baro kaydınız için prestijli yasal adres; duruşmadayken tebligatlarınız güvenle teslim alınır.",
    icon: Scale,
  },
  {
    title: "Klinik ve Online Danışmanlar",
    description:
      "Ev adresinizi gizli tutarak kurumsal imaj; yüz yüze görüşmeler için toplantı odası kullanımı.",
    icon: HeartPulse,
  },
  {
    title: "Yurtdışı Merkezli Şirketler",
    description:
      "Türkiye'de faaliyet için yasal temsil adresi; fiziksel ofis açmadan Ankara'da operasyonel varlık.",
    icon: Globe,
  },
];

type Props = { sectionClassName?: string };

export default function SanalOfisNedirSection({
  sectionClassName = "bg-white",
}: Props) {
  return (
    <section
      id="sanal-ofis-nedir"
      aria-labelledby="sanal-ofis-nedir-heading"
      className={`${sectionClassName} px-4 py-[60px] font-sans sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="sanal-ofis-nedir-heading" className="mb-4">
          Sanal Ofis Nedir?
        </SectionHeading>
        <p className={BODY_P}>
          Sanal ofis, fiziksel bir ofis kiralamadan şirketinize yasal iş adresi sağlayan
          esnek bir çözümdür. Vergi levhası ve ticaret sicil adresi olarak kullanılan bu
          hizmet; kargo ve tebligat yönetimi, çağrı yönlendirme ve ihtiyaç anında toplantı
          odası imkânı sunar. Yüksek ofis kirası, aidat ve stopaj gibi sabit giderler
          olmadan kurumsal bir kimlik kazanırsınız. Çankaya&apos;da detaylı bilgi için{" "}
          <Link
            href="/hizmetler/cankaya-sanal-ofis"
            className="font-medium text-[var(--color-green)] underline-offset-2 hover:underline"
          >
            Çankaya Sanal Ofis
          </Link>{" "}
          sayfamıza göz atın.
        </p>

        <h3
          id="sanal-ofis-kimler-icin-heading"
          className="mb-6 mt-10 text-[var(--color-text-primary)]"
        >
          Kimler İçin İdeal?
        </h3>

        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          aria-labelledby="sanal-ofis-kimler-icin-heading"
        >
          {AUDIENCE_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group flex flex-col items-center gap-2 rounded-[14px] border border-[#e8eaed] bg-white px-2 py-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] md:flex-row md:items-start md:gap-5 md:px-6 md:py-7 md:text-left"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0b7041]/[0.08] md:h-12 md:w-12"
                  aria-hidden
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0 text-[#0b7041] md:h-[22px] md:w-[22px]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 block text-[17px] font-bold leading-tight text-[var(--color-text-primary)] md:mb-2">
                    {item.title}
                  </h4>
                  <p className="m-0 block text-[14px] leading-[1.65] text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
