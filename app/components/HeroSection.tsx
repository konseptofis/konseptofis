"use client";

import Image from "next/image";
import { DocumentTextIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { siteWhatsAppHref } from "@/app/lib/data";
import { openHizliTeklifModal } from "@/app/lib/open-hizli-teklif-modal";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-20 flex flex-col justify-start overflow-hidden pb-12 pt-[172px] sm:-mt-28 sm:pb-14 sm:pt-[208px] md:h-[560px] md:justify-end md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 scale-[1.02] blur-[2px]">
          <Image
            src="/ankara-sanal-ofis.webp"
            alt="Mahall Ankara – Konsept Ofis sanal ofis adresi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-[#051a12]/75" aria-hidden />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center md:px-6">
        <h1
          id="hero-heading"
          className="text-[34px] font-bold leading-[1.15] tracking-tight text-white sm:text-[38px] md:text-3xl lg:text-4xl"
        >
          Ankara Sanal Ofis
        </h1>
        <p className="mt-4 max-w-2xl px-1 text-[17px] font-medium leading-[1.5] text-white sm:mt-6 md:text-[20px]">
          Sanal ofis ile şirketinizin yasal adresi Mahall Ankara&apos;da, siz işinizi istediğiniz
          yerden yürütün.
        </p>
        <p className="mt-3 max-w-2xl px-1 text-[15px] leading-[1.6] text-white/85 md:text-[16px] md:leading-[1.65]">
          Vergi levhası ve ticaret sicil adresi, kargo ve tebligat takibi tek pakette; stopaj ve
          aidat yok.
        </p>
        <div className="mt-8 flex w-full max-w-md flex-row justify-center gap-2 sm:max-w-xl sm:gap-4">
          <button
            type="button"
            onClick={openHizliTeklifModal}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2.5 text-center text-[13px] font-semibold text-[#0b7041] transition-colors hover:bg-[#f2f2f2] sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
          >
            <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            Hemen Teklif Al
          </button>
          <a
            href={siteWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/80 bg-transparent px-2 py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-white/10 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            WhatsApp&apos;tan Yaz
          </a>
        </div>
      </div>
    </section>
  );
}
