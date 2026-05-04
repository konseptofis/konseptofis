"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

const LEGAL_LINKS = [
  { href: "/kvkk-kapsaminda-aydinlatma-metni/", label: "KVKK Aydınlatma Metni" },
  { href: "/acik-riza-onayi/", label: "Açık Rıza Onayı" },
  { href: "/kvkk-basvuru-formu/", label: "KVKK Başvuru Formu" },
  { href: "/kullanim-kosullari/", label: "Kullanım Koşulları" },
] as const;

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white shadow-[0_-2px_20px_rgba(0,0,0,0.05)]"
      aria-label="Site alt bilgisi"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold text-[#0b7041] hover:opacity-80"
            >
              {SITE.name}
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Ankara sanal ofis, hazır ofis ve toplantı odası kiralama. Yasal iş
              adresi, vergi levhası adresi.
            </p>
          </div>

          <div>
            <h3 className="subheading-sm tracking-wide text-black" style={{ fontSize: 16 }}>
              Hızlı Bağlantılar
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/hizmetlerimiz"
                  className="text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link
                  href="/sik-sorulan-sorular"
                  className="text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  SSS
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="subheading-sm tracking-wide text-black" style={{ fontSize: 16 }}>
              Önemli Bilgiler
            </h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 hover:text-[#0b7041]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="subheading-sm tracking-wide text-black" style={{ fontSize: 16 }}>
              İletişim
            </h3>
            <address className="mt-4 space-y-3 not-italic">
              <a
                href={`tel:${SITE.phoneRaw.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0b7041]"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0b7041]"
              >
                <EnvelopeIcon className="h-4 w-4 shrink-0" aria-hidden />
                {SITE.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-gray-600">
                <MapPinIcon className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                <span className="break-words">
                  {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}
                </span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-6 border-t border-[#f2f2f2] pt-4">
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
                  <Link href={href} className="text-sm text-gray-600 hover:text-[#0b7041]">
                    {label}
                  </Link>
                </span>
              ))}
            </nav>
            <p className="shrink-0 text-sm text-gray-500 sm:text-right">
              © {currentYear} {SITE.name}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
