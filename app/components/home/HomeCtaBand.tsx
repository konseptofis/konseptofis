import { SITE, siteWhatsAppHref } from "@/app/lib/data";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";
import { HOME_CONTAINER } from "@/app/lib/home-ui";

export default async function HomeCtaBand() {
  const prices = await getSiteDisplayPrices();
  const monthly = prices.sanalMonthly;

  return (
    <section aria-label="Sanal ofis teklifi" className="bg-[#085232] py-16 font-sans">
      <div
        className={`${HOME_CONTAINER} flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center`}
      >
        <div className="max-w-[640px]">
          <p className="m-0 text-[28px] font-semibold leading-snug tracking-[-0.01em] text-white">
            Şirket adresiniz bugün hazır olsun
          </p>
          <p className="mt-3 m-0 text-[16px] leading-[1.65] text-white/80">
            İletişime geçin, sözleşmeniz aynı gün düzenlensin. Aylık{" "}
            {monthly || "—"} TL + KDV.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <a
            href={siteWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-white px-6 py-3 text-center text-[15px] font-semibold text-[var(--color-green)] transition-colors hover:bg-[#f2f2f2] lg:w-auto"
          >
            WhatsApp&apos;tan Yaz
          </a>
          <a
            href={SITE.phoneHref}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-white px-6 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-white/10 lg:w-auto"
          >
            {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
