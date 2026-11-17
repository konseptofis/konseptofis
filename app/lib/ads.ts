/**
 * Google Ads dönüşüm ölçümü.
 * Google etiketi (gtag.js) app/components/GoogleAds.tsx içinde yüklenir.
 */
export const GOOGLE_ADS_ID = "AW-18106376285";

export const ADS_CONVERSIONS = {
  whatsapp: `${GOOGLE_ADS_ID}/6IS5CLXs5LcdEN3A5blD`, // WhatsApp tıklaması
  phone: `${GOOGLE_ADS_ID}/GLKKCLjs5LcdEN3A5blD`, // Telefon tıklaması
  form: `${GOOGLE_ADS_ID}/RnFpCLvs5LcdEN3A5blD`, // Form gönderimi
} as const;

export type AdsConversion = keyof typeof ADS_CONVERSIONS;

type Gtag = (...args: unknown[]) => void;

/** Dönüşümü Google Ads'e bildirir. Etiket yüklenmemişse sessizce geçer. */
export function trackConversion(kind: AdsConversion): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "conversion", {
    send_to: ADS_CONVERSIONS[kind],
    value: 1.0,
    currency: "TRY",
  });
}
