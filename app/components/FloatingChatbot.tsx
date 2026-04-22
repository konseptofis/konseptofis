"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

type StepKey = "start" | "sanal" | "hazir" | "toplanti" | "iletisim" | "fiyat";

type Step = {
  mesaj: string;
  secenekler?: { etiket: string; sonraki: StepKey }[];
};

const ADIMLAR: Record<StepKey, Step> = {
  start: {
    mesaj: "Merhaba! Konsept Ofis hakkında ne öğrenmek istersiniz?",
    secenekler: [
      { etiket: "Sanal ofis nedir?", sonraki: "sanal" },
      { etiket: "Hazır / paylaşımlı ofis", sonraki: "hazir" },
      { etiket: "Toplantı odası", sonraki: "toplanti" },
      { etiket: "Adres ve iletişim", sonraki: "iletisim" },
      { etiket: "Fiyatlar hakkında", sonraki: "fiyat" },
    ],
  },
  sanal: {
    mesaj:
      "Sanal ofis; şirketinizin yasal iş adresi olarak kullanılabilen, posta ve tebligat kabulü sunan bir hizmettir. Ankara Çankaya’daki adresimizle vergi levhası ve ticaret sicilinde gösterebilirsiniz.",
    secenekler: [{ etiket: "Baştan başla", sonraki: "start" }],
  },
  hazir: {
    mesaj:
      "Hazır ofis; donanımlı birimlerde günlük veya aylık çalışma alanıdır. İnternet, ortak alanlar ve toplantı odası kullanımı paketlere göre değişir.",
    secenekler: [{ etiket: "Baştan başla", sonraki: "start" }],
  },
  toplanti: {
    mesaj:
      "Toplantı odalarımızı saatlik kiralayabilirsiniz. Projeksiyon ve sessiz ortam için randevu önerilir.",
    secenekler: [{ etiket: "Baştan başla", sonraki: "start" }],
  },
  iletisim: {
    mesaj:
      "Mahall Ankara, C2 Blok No:47, Çankaya, Ankara. Telefon: 0 (312) 911 95 57. Detaylı iletişim için sitemizdeki İletişim sayfasına bakabilirsiniz.",
    secenekler: [{ etiket: "Baştan başla", sonraki: "start" }],
  },
  fiyat: {
    mesaj:
      "Güncel paket ve fiyatlar için sitemizdeki Fiyatlar bölümüne göz atın veya bizi arayın; ihtiyacınıza göre net teklif verelim.",
    secenekler: [{ etiket: "Baştan başla", sonraki: "start" }],
  },
};

export default function FloatingChatbot() {
  const pathname = usePathname();
  const [acik, setAcik] = useState(false);
  const [adim, setAdim] = useState<StepKey>("start");

  const kapat = useCallback(() => setAcik(false), []);

  if (pathname?.startsWith("/admin")) return null;

  const mevcut = ADIMLAR[adim];

  return (
    <aside className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" aria-label="Yardım sohbeti">
      {acik && (
        <div className="flex w-[min(100vw-2rem,20rem)] flex-col overflow-hidden rounded-lg border border-[#e5e5e5] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[#e5e5e5] bg-[#0b7041] px-3 py-2 text-white">
            <span className="text-sm font-semibold">Hızlı bilgi</span>
            <button
              type="button"
              onClick={kapat}
              className="rounded p-1 hover:bg-white/15"
              aria-label="Kapat"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto p-3">
            <p className="text-sm leading-relaxed text-gray-800">{mevcut.mesaj}</p>
            {mevcut.secenekler && mevcut.secenekler.length > 0 && (
              <ul className="mt-3 flex flex-col gap-2">
                {mevcut.secenekler.map((s) => (
                  <li key={s.etiket + s.sonraki}>
                    <button
                      type="button"
                      onClick={() => setAdim(s.sonraki)}
                      className="w-full rounded-md border border-[#e5e5e5] bg-[#fafafa] px-3 py-2 text-left text-sm text-gray-900 transition hover:border-[#0b7041] hover:bg-[#0b7041]/5"
                    >
                      {s.etiket}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setAcik((v) => {
            if (!v) setAdim("start");
            return !v;
          });
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b7041] text-white shadow-lg transition hover:bg-[#095c37] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
        aria-expanded={acik}
        aria-label={acik ? "Sohbeti kapat" : "Sohbeti aç"}
      >
        {acik ? <XMarkIcon className="h-7 w-7" aria-hidden /> : <ChatBubbleLeftRightIcon className="h-7 w-7" aria-hidden />}
      </button>
    </aside>
  );
}
