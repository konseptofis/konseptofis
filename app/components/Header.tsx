"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

const SCROLL_DOWN = 100;
const SCROLL_UP = 40;

const navLinks = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#fiyatlar", label: "Fiyatlar" },
  { href: "#sss", label: "SSS" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Header() {
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLightRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y >= SCROLL_DOWN) isLightRef.current = true;
      else if (y <= SCROLL_UP) isLightRef.current = false;
      setIsLight(isLightRef.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showLightHeader = isLight || menuOpen;
  const linkClass = showLightHeader ? "text-black hover:opacity-80" : "text-white/90 hover:text-white";

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        showLightHeader ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`${showLightHeader ? "border-b border-[#e8e8e8]" : "border-b border-white/20"} hidden sm:block`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-2 text-xs sm:gap-x-6 sm:text-sm sm:justify-center ${
              isLight ? "text-black" : "text-white/90"
            }`}
          >
            <a
              href={`tel:${SITE.phoneRaw.replace(/\s/g, "")}`}
              className={`inline-flex items-center gap-1.5 font-medium ${
                isLight ? "hover:opacity-80" : "hover:text-white"
              }`}
            >
              <PhoneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
              <span>{SITE.phone}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className={`inline-flex items-center gap-1.5 font-medium truncate max-w-[180px] sm:max-w-none ${
                isLight ? "hover:opacity-80" : "hover:text-white"
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
            className={`text-base font-semibold sm:text-lg ${
              showLightHeader ? "text-black hover:opacity-80" : "text-white hover:text-white/90"
            }`}
          >
            Konsept Ofis
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-medium">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
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
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-3.5 px-3 text-[#0b7041] font-semibold rounded-lg hover:bg-[#f0f5f0] active:bg-[#e8efe8]"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
