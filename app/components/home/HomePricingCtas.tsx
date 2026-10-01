"use client";

import { siteWhatsAppHref } from "@/app/lib/data";
import { BTN_PRIMARY, BTN_SECONDARY } from "@/app/lib/home-ui";
import TeklifAlButton from "@/app/components/home/TeklifAlButton";

export default function HomePricingCtas() {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <TeklifAlButton className={`${BTN_PRIMARY} w-full sm:w-auto`}>Hemen Teklif Al</TeklifAlButton>
      <a
        href={siteWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${BTN_SECONDARY} w-full sm:w-auto`}
      >
        WhatsApp&apos;tan Yaz
      </a>
    </div>
  );
}
