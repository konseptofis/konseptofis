"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Bu kadar aşağı inince buton görünür (px). */
const SHOW_AFTER_PX = 600;

/**
 * Sağ altta yuvarlak "yukarı çık" butonu.
 * Mobilde `MobileContactBar`'ın üstünde durur; md ve üstünde köşeye iner.
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Sayfanın en üstüne çık"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-[calc(6.25rem+env(safe-area-inset-bottom))] z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[var(--color-green)] text-white shadow-[0_6px_20px_rgba(11,112,65,0.35)] transition-[opacity,transform,background-color] duration-200 hover:bg-[#095c37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 md:right-6 md:bottom-6 md:h-12 md:w-12 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
