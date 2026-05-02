"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

const SCROLL_DOWN = 100;
const SCROLL_UP = 40;

function isHizmetlerPath(path: string): boolean {
  return (
    path === "/hizmetler" ||
    path.startsWith("/hizmetler/") ||
    path === "/hizmetlerimiz" ||
    path.startsWith("/hizmetlerimiz/")
  );
}

function isKurumsalPath(path: string): boolean {
  return (
    path === "/hakkimizda" ||
    path.startsWith("/hakkimizda/") ||
    path === "/sik-sorulan-sorular" ||
    path.startsWith("/sik-sorulan-sorular/")
  );
}

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/hizmetlerimiz") return isHizmetlerPath(pathname);
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Aktif menü işareti: kısa dikey çubuk, 6px köşe yuvarlak */
function NavActiveMark({ active }: { active: boolean }) {
  return (
    <span
      className={`h-3 w-[3px] shrink-0 rounded-[6px] ${
        active ? "bg-[var(--color-green)]" : "bg-transparent"
      }`}
      aria-hidden
    />
  );
}

type NavLinkItem =
  | { href: string; label: string }
  | { label: string; children: { href: string; label: string }[] };

const navLinks: NavLinkItem[] = [
  { href: "/hizmetlerimiz", label: "Hizmetler" },
  { href: "/fiyatlar", label: "Fiyatlar" },
  {
    label: "Kurumsal",
    children: [
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/sik-sorulan-sorular", label: "SSS" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [kurumsalOpen, setKurumsalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [teklifModalOpen, setTeklifModalOpen] = useState(false);
  const isLightRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDropdownCloseTimer = () => {
    if (dropdownCloseTimerRef.current) {
      clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHomePage || isAdminPath) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y >= SCROLL_DOWN) isLightRef.current = true;
      else if (y <= SCROLL_UP) isLightRef.current = false;
      setIsLight(isLightRef.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage, isAdminPath]);


  const showLightHeader = !isHomePage || isLight || menuOpen;
  const linkClass = showLightHeader ? "text-black hover:opacity-80" : "text-white/90 hover:text-white";
  const headerPositionClass = isHomePage ? "fixed left-0 top-0" : "relative";

  if (isAdminPath) return null;

  return (
    <header
      className={`${headerPositionClass} z-50 w-full ${
        showLightHeader ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`${showLightHeader ? "border-b border-[#e8e8e8] bg-white" : "border-b border-white/20 bg-transparent"} hidden sm:block`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-2 text-xs sm:gap-x-6 sm:text-sm sm:justify-center ${
              showLightHeader ? "text-black" : "text-white/90"
            }`}
          >
            <a
              href={`tel:${SITE.phoneRaw.replace(/\s/g, "")}`}
              className={`inline-flex items-center gap-1.5 font-medium ${
                showLightHeader ? "hover:opacity-80" : "hover:text-white"
              }`}
            >
              <PhoneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
              <span>{SITE.phone}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className={`inline-flex items-center gap-1.5 font-medium truncate max-w-[180px] sm:max-w-none ${
                showLightHeader ? "hover:opacity-80" : "hover:text-white"
              }`}
            >
              <EnvelopeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
              <span className="truncate">{SITE.email}</span>
            </a>
            <span className="inline-flex items-center gap-1.5 shrink-0">
              <MapPinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
              Mahall Ankara
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between py-3 sm:py-4"
          aria-label="Ana menü"
        >
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Konsept Ofis Anasayfa"
          >
            <Image
              src={showLightHeader ? "/ankara-sanal-ofis-logo.webp?v=2" : "/ankara-sanal-ofis-logo-2.png"}
              alt="Konsept Ofis"
              width={207}
              height={46}
              className="h-[41px] w-auto sm:h-[46px]"
              priority
              unoptimized
            />
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-medium">
            {navLinks.map((item) =>
              "href" in item ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 ${linkClass}`}
                  aria-current={isPathActive(pathname, item.href) ? "page" : undefined}
                >
                  <NavActiveMark active={isPathActive(pathname, item.href)} />
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.label}
                  className="relative cursor-pointer"
                  ref={dropdownRef}
                  onMouseEnter={() => {
                    clearDropdownCloseTimer();
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownCloseTimerRef.current = setTimeout(() => setDropdownOpen(false), 180);
                  }}
                >
                  <button
                    type="button"
                    className={`inline-flex cursor-pointer items-center gap-2 ${linkClass}`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    aria-current={isKurumsalPath(pathname) ? "page" : undefined}
                  >
                    <NavActiveMark active={isKurumsalPath(pathname)} />
                    {item.label}
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full z-50 pt-1">
                      <div className="min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      {item.children.map(({ href, label }) => {
                        const childActive = isPathActive(pathname, href);
                        return (
                        <Link
                          key={href}
                          href={href}
                          className={`flex items-center gap-2 py-2.5 pl-2 pr-4 text-sm ${
                            childActive
                              ? "bg-[#f6faf8] font-medium text-[#0b7041]"
                              : "text-gray-700 hover:bg-gray-50 hover:text-[#0b7041]"
                          }`}
                          aria-current={childActive ? "page" : undefined}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <NavActiveMark active={childActive} />
                          {label}
                        </Link>
                        );
                      })}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
            <button
              type="button"
              onClick={() => setTeklifModalOpen(true)}
              className="ml-2 cursor-pointer rounded-lg bg-[#0b7041] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
            >
              Hızlı teklif al
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2 ${showLightHeader ? "text-black hover:bg-[#f2f2f2]" : "text-white hover:bg-white/10"}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" aria-hidden /> : <Bars3Icon className="h-6 w-6" aria-hidden />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full mt-0 rounded-b-xl border border-t-0 border-[#e5e5e5] bg-white px-4 py-3 shadow-xl">
            <nav className="flex flex-col gap-0.5" aria-label="Mobil menü">
              {navLinks.map((item) =>
                "href" in item ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 py-3.5 font-semibold text-[#0b7041] rounded-lg hover:bg-[#f0f5f0] active:bg-[#e8efe8]`}
                    aria-current={isPathActive(pathname, item.href) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <NavActiveMark active={isPathActive(pathname, item.href)} />
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setKurumsalOpen((o) => !o)}
                      className="flex w-full cursor-pointer items-center justify-between gap-2 py-3.5 font-semibold text-[#0b7041] rounded-lg hover:bg-[#f0f5f0]"
                      aria-expanded={kurumsalOpen}
                      aria-current={isKurumsalPath(pathname) ? "page" : undefined}
                    >
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <NavActiveMark active={isKurumsalPath(pathname)} />
                        {item.label}
                      </span>
                      <ChevronDownIcon className={`h-5 w-5 shrink-0 transition-transform ${kurumsalOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    {kurumsalOpen && (
                      <div className="pl-3 pb-2">
                        {item.children.map(({ href, label }) => {
                          const childActive = isPathActive(pathname, href);
                          return (
                          <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-2 py-2.5 pl-1 text-sm font-medium ${
                              childActive
                                ? "text-[#0b7041]"
                                : "text-gray-700 hover:text-[#0b7041]"
                            }`}
                            aria-current={childActive ? "page" : undefined}
                            onClick={() => setMenuOpen(false)}
                          >
                            <NavActiveMark active={childActive} />
                            {label}
                          </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )
              )}
              <button
                type="button"
                onClick={() => { setTeklifModalOpen(true); setMenuOpen(false); }}
                className="mt-2 w-full cursor-pointer rounded-lg bg-[#0b7041] py-3.5 text-center font-semibold text-white hover:bg-[#095530]"
              >
                Hızlı teklif al
              </button>
            </nav>
          </div>
        )}
      </div>

      {teklifModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teklif-modal-title"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 id="teklif-modal-title" className="text-xl font-semibold text-gray-900">
                Hızlı teklif al
              </h2>
              <button
                type="button"
                onClick={() => setTeklifModalOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Kapat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Bu bölüm düzenlenecek. Hızlı teklif formu burada yer alacak.
            </p>
            <button
              type="button"
              onClick={() => setTeklifModalOpen(false)}
              className="mt-6 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
