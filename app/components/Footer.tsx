"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t-2 border-[#d4d4d4] bg-white"
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
                  href="/hizmetler"
                  className="text-sm text-gray-600 hover:text-[#0b7041]"
                >
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link
                  href="#sss"
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
              {/* Blog yazıları buraya eklenecek */}
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

        <div className="mt-10 border-t border-[#f2f2f2] pt-6 text-center text-sm text-gray-500">
          © {currentYear} {SITE.name}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
