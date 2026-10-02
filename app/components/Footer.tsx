import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Facebook, Instagram } from "lucide-react";
import { SITE } from "@/app/lib/data";
import FooterMenuGroup from "@/app/components/FooterMenuGroup";

const LEGAL_LINKS = [
  { href: "/kvkk-kapsaminda-aydinlatma-metni/", label: "KVKK Aydınlatma Metni" },
  { href: "/acik-riza-onayi/", label: "Açık Rıza Onayı" },
  { href: "/kvkk-basvuru-formu/", label: "KVKK Başvuru Formu" },
  { href: "/kullanim-kosullari/", label: "Kullanım Koşulları" },
] as const;

const QUICK_LINKS = [
  { href: "/hizmetlerimiz", label: "Hizmetler" },
  { href: "/sik-sorulan-sorular", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
] as const;

const SERVICE_LINKS = [
  { href: "/hizmetlerimiz/cankaya-sanal-ofis", label: "Çankaya Sanal Ofis" },
  { href: "/hizmetlerimiz/hazir-ofis-kiralama", label: "Hazır Ofis Kiralama" },
  { href: "/hizmetlerimiz/makam-odasi-kiralama", label: "Makam Odası Kiralama" },
  { href: "/hizmetlerimiz/toplanti-odasi-kiralama", label: "Toplantı Odası Kiralama" },
] as const;

const LINK_CLASS = "text-sm text-gray-600 hover:text-[#0b7041]";

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
        <div className="grid gap-10 md:grid-cols-[1.4fr_3fr]">
          <div>
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
              Ankara sanal ofis, hazır ofis ve toplantı odası kiralama. Yasal iş
              adresi, vergi levhası adresi.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center rounded-[8px] border border-[#e5e5e5] p-2 text-gray-600 transition-colors hover:border-[#0b7041] hover:text-[#0b7041]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 items-start gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6">
            <FooterMenuGroup title="Hizmetlerimiz">
              <LinkList links={SERVICE_LINKS} />
            </FooterMenuGroup>

            <FooterMenuGroup title="Hızlı Bağlantılar">
              <LinkList links={QUICK_LINKS} />
            </FooterMenuGroup>

            <FooterMenuGroup title="Önemli Bilgiler">
              <LinkList links={LEGAL_LINKS} />
            </FooterMenuGroup>

            <FooterMenuGroup title="İletişim">
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
                  className="flex items-start gap-2 break-all text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {SITE.email}
                </a>
                <p className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span className="break-words">{SITE.address.display}</span>
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
            <p className="shrink-0 text-sm text-gray-500 sm:text-right">
              © {currentYear} Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
