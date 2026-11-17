"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GOOGLE_ADS_ID, trackConversion } from "@/app/lib/ads";

/**
 * Google Ads dönüşüm ölçümü — ÇEREZSİZ mod.
 * Consent Mode her zaman "denied": tarayıcıya hiçbir reklam/analitik çerezi yazılmaz.
 * Reklam tıklaması, URL'deki gclid parametresiyle (url_passthrough) eşleştirilir.
 * WhatsApp ve telefon bağlantılarına yapılan tıklamalar otomatik olarak dönüşüm sayılır.
 */
export default function GoogleAds() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (!href) return;
      if (href.startsWith("tel:")) trackConversion("phone");
      else if (/wa\.me|whatsapp\.com/i.test(href)) trackConversion("whatsapp");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied'
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
