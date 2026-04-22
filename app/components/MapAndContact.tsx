import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/app/lib/data";

type Props = { sectionClassName?: string };

/** İkon ve metinler için nötr antrasit */
const ANTHRACITE = "#383838";

const addressDisplay = `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}`;
const telHref = `tel:+${SITE.phoneRaw}`;

function IconBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4f4f5]"
      style={{ color: ANTHRACITE }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
  isLast,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-4 py-[18px] ${isLast ? "" : "border-b border-[#e5e5e5]"}`}
    >
      <IconBox>{icon}</IconBox>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[2px] text-gray-500">
          {label}
        </p>
        <div className="text-[14px] font-semibold text-gray-900">{children}</div>
      </div>
    </div>
  );
}

export default function MapAndContact({ sectionClassName = "bg-white" }: Props) {
  const iconProps = {
    size: 16,
    strokeWidth: 1.75,
    className: "shrink-0",
    "aria-hidden": true as const,
  };

  return (
    <section
      id="iletisim"
      aria-label="İletişim ve Adres Bilgileri"
      className={`${sectionClassName} px-6 py-16 font-sans md:px-12 md:py-20`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid min-h-[480px] grid-cols-1 overflow-hidden rounded-lg border border-[#e5e5e5] bg-white md:grid-cols-2">
          {/* Sol panel */}
          <div className="flex min-h-0 flex-col border-b border-[#e5e5e5] bg-white px-6 py-9 md:border-b-0 md:border-r md:px-12 md:py-14">
            <span
              className="mb-3 block text-[11px] font-semibold uppercase text-[#0b7041]"
              style={{ letterSpacing: "4px" }}
            >
              İLETİŞİM & ADRES
            </span>
            <h2
              id="contact-heading"
              className="flex items-center gap-3 text-[28px] font-semibold tracking-tight text-black md:text-[32px]"
            >
              <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
              Bize Ulaşın
            </h2>
            <p className="mt-3 max-w-[340px] text-[14px] leading-[1.7] text-gray-500">
              Ankara Çankaya&apos;daki merkezimize bekliyoruz. Sanal ofis, hazır ofis ve toplantı
              odası hizmetlerimiz için iletişime geçin.
            </p>

            <address className="mt-10 not-italic">
              <ContactRow icon={<MapPin {...iconProps} />} label="ADRES">
                <span className="text-gray-900">{addressDisplay}</span>
              </ContactRow>
              <ContactRow icon={<Phone {...iconProps} />} label="TELEFON">
                <a
                  href={telHref}
                  className="text-inherit no-underline transition-colors duration-200 hover:text-[#0b7041]"
                  aria-label={`Telefon: ${SITE.phone}`}
                >
                  {SITE.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail {...iconProps} />} label="E-POSTA" isLast>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-inherit no-underline transition-colors duration-200 hover:text-[#0b7041]"
                  aria-label={`E-posta: ${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </ContactRow>
            </address>
          </div>

          {/* Sağ panel — harita */}
          <div className="relative min-h-[280px] w-full md:min-h-[480px]">
            <iframe
              title="Konsept Ofis Konum Haritası"
              src={SITE.mapEmbedUrl}
              width="100%"
              height="100%"
              className="absolute inset-0 block h-full min-h-[280px] w-full border-0 md:min-h-[480px]"
              style={{ filter: "grayscale(15%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={SITE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-lg border border-[#e5e5e5] bg-white px-3.5 py-2 text-xs font-semibold text-gray-900 transition-colors duration-200 hover:border-[#0b7041] hover:bg-[#0b7041] hover:text-white"
            >
              Haritada Aç
              <span className="text-xs leading-none" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
