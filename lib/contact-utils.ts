export const QUICK_QUOTE_SERVICES = [
  "Sanal Ofis",
  "Toplantı Odası",
  "Makam Odası",
  "Hazır Ofis",
  "Diğer",
] as const;

export const CONTACT_SOURCE_QUICK_QUOTE = "Hızlı Teklif";
export const CONTACT_SOURCE_DEFAULT = "İletişim Formu";

export const KVKK_CONSENT_ERROR =
  "Devam edebilmek için KVKK Aydınlatma Metni'ni ve Açık Rıza Onayı'nı kabul etmeniz gerekmektedir.";

/** Basit TR telefon kontrolü: en az 10 rakam */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
