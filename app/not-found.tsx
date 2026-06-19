import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Sayfa Bulunamadı - Konsept Ofis" },
  robots: { index: false, follow: true },
};

const PRIMARY_CTAS = [
  { href: "/", label: "Ana Sayfaya Dön" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { href: "/blog", label: "Blog" },
] as const;

const QUICK_LINKS = [
  { href: "/hizmetlerimiz/cankaya-sanal-ofis", label: "Çankaya Sanal Ofis" },
  { href: "/hizmetlerimiz/toplanti-odasi-kiralama", label: "Toplantı Odası" },
  { href: "/hizmetlerimiz/makam-odasi-kiralama", label: "Makam Odası" },
  { href: "/hizmetlerimiz/hazir-ofis-kiralama", label: "Hazır Ofis" },
] as const;

export default function NotFound() {
  const telHref = `tel:+${SITE.phoneRaw}`;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section
        className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="not-found-heading"
      >
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mb-6">
            <p
              className="text-[clamp(3.5rem,14vw,6.5rem)] font-bold leading-none tracking-tight text-[#0b7041]/15"
              aria-hidden
            >
              404
            </p>
            <h1
              id="not-found-heading"
              className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
            >
              Sayfa Bulunamadı
            </h1>
          </div>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[var(--color-text-muted)]">
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {PRIMARY_CTAS.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                className={
                  index === 0
                    ? "inline-flex items-center justify-center rounded-lg bg-[#0b7041] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                    : "inline-flex items-center justify-center rounded-lg border border-[#e5e5e5] bg-white px-6 py-3 text-center text-sm font-semibold text-[#0b7041] transition-colors hover:border-[#0b7041]/40 hover:bg-[#0b7041]/5 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
                }
              >
                {label}
              </Link>
            ))}
          </div>

          <nav
            className="mt-12 rounded-2xl border border-[var(--color-border-tertiary)] bg-white px-5 py-6 sm:px-8 sm:py-7"
            aria-label="Popüler sayfalar"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-green)]">
              Popüler sayfalar
            </h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center rounded-full border border-[var(--color-border-tertiary)] bg-[color-mix(in_srgb,var(--color-green)_4%,#ffffff)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_10%,#ffffff)] hover:text-[#0b7041]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 border-t border-[var(--color-border-tertiary)] pt-8">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Yardıma mı ihtiyacınız var?
            </p>
            <div className="mt-3 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
              <a
                href={telHref}
                className="inline-flex items-center gap-2 text-[15px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[#0b7041]"
              >
                <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden />
                {SITE.phone}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[#0b7041]"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
