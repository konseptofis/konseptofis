export const HIZLI_TEKLIF_MODAL_OPEN_EVENT = "konseptofis:open-hizli-teklif-modal";

export function openHizliTeklifModal(): void {
  window.dispatchEvent(new CustomEvent(HIZLI_TEKLIF_MODAL_OPEN_EVENT));
}

export function subscribeHizliTeklifModalOpen(handler: () => void): () => void {
  window.addEventListener(HIZLI_TEKLIF_MODAL_OPEN_EVENT, handler);
  return () => window.removeEventListener(HIZLI_TEKLIF_MODAL_OPEN_EVENT, handler);
}
