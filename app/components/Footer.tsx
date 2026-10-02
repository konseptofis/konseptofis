import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { SITE } from "@/app/lib/data";
import FooterMenuGroup from "@/app/components/FooterMenuGroup";

const LEGAL_LINKS = [
  { href: "/kvkk-kapsaminda-aydinlatma-metni/", label: "KVKK Aydınlatma Metni" },
  { href: "/acik-riza-onayi/", label: "Açık Rıza Onayı" },
  { href: "/kvkk-basvuru-formu/", label: "KVKK Başvuru Formu" },
  { href: "/kullanim-kosullari/", label: "Kullanım Koşulları" },
] as const;

const QUICK_LINKS = [
  { href: "/fiyatlar", label: "Fiyatlar" },
  { href: "/blog", label: "Blog" },
  { href: "/sik-sorulan-sorular", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
] as const;

const SERVICE_LINKS = [
  { href: "/", label: "Ankara Sanal Ofis" },
  { href: "/hizmetlerimiz/cankaya-sanal-ofis", label: "Çankaya Sanal Ofis" },
  { href: "/hizmetlerimiz/makam-odasi-kiralama", label: "Makam Odası Kiralama" },
  { href: "/hizmetlerimiz/toplanti-odasi-kiralama", label: "Toplantı Odası Kiralama" },
] as const;

const SOCIAL_LINKS = [
  { href: SITE.social.facebook, label: "Facebook", Icon: Facebook },
  { href: SITE.social.x, label: "X", Icon: Twitter },
  { href: SITE.social.youtube, label: "YouTube", Icon: Youtube },
  { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin },
] as const;

const LINK_CLASS = "text-sm text-gray-600 hover:text-[#0b7041]";

/** "A, B, C, D" → ["A, B,", "C,", "D"] */
function addressLines(display: string): string[] {
  const parts = display.split(", ");
  if (parts.length < 4) return [display];
  return [
    `${parts.slice(0, parts.length - 2).join(", ")},`,
    `${parts[parts.length - 2]},`,
    parts[parts.length - 1]!,
  ];
}

function LinkList({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <ul className="m-0 list-none space-y-2 p-0">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className={LINK_CLASS}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white shadow-[0_-2px_20px_rgba(0,0,0,0.05)]"
      aria-label="Site alt bilgisi"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:grid-cols-[34fr_20fr_16fr_30fr] lg:gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center hover:opacity-80"
              aria-label="Konsept Ofis Anasayfa"
            >
              <Image
                src="/ankara-sanal-ofis-logo.webp?v=2"
                alt="Konsept Ofis"
                width={207}
                height={46}
                className="h-[38px] w-auto sm:h-[42px]"
                unoptimized
              />
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Ankara sanal ofis kiralama. Yasal iş adresi, vergi levhası adresi;
              yıllık abonelerimize saatlik makam odası ve toplantı odası.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterMenuGroup title="Hizmetlerimiz">
            <LinkList links={SERVICE_LINKS} />
          </FooterMenuGroup>

          <FooterMenuGroup title="Hızlı Bağlantılar">
            <LinkList links={QUICK_LINKS} />
          </FooterMenuGroup>

          <div className="col-span-2 md:col-span-1">
            <FooterMenuGroup title="İletişim" buttonClassName="w-[calc(50%-0.5rem)] md:w-full">
              <address className="space-y-3 not-italic">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  <EnvelopeIcon className="h-4 w-4 shrink-0" aria-hidden />
                  {SITE.email}
                </a>
                <p className="m-0 flex items-start gap-2 text-sm leading-[1.6] text-gray-600">
                  <MapPinIcon className="mt-[3px] h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    {addressLines(SITE.address.display).map((line, i) => (
                      <span key={line}>
                        {i > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="m-0 flex items-start gap-2 text-sm leading-[1.6] text-gray-600">
                  <ClockIcon className="mt-[3px] h-4 w-4 shrink-0" aria-hidden />
                  {SITE.hours.value}
                </p>
              </address>
            </FooterMenuGroup>
          </div>
        </div>

        <div className="mt-8 border-t border-[#f2f2f2] pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <nav
              className="flex flex-wrap items-center"
              aria-label="Yasal metinler ve KVKK"
            >
              {LEGAL_LINKS.map(({ href, label }, index) => (
                <span key={href} className="inline-flex items-center">
                  {index > 0 ? (
                    <span className="mx-2 text-gray-300 select-none" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <Link href={href} className={LINK_CLASS}>
                    {label}
                  </Link>
                </span>
              ))}
            </nav>
            <p className="m-0 inline-flex shrink-0 items-center gap-2 text-sm text-gray-500">
              © {currentYear} Tüm hakları saklıdır.
              <span className="h-3.5 w-[2px] rounded-full bg-gray-300" aria-hidden />
              {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
