import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/app/lib/data";
import SectionHeading from "./SectionHeading";
import { HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

type Props = { sectionClassName?: string; heading?: string };

const ANTHRACITE = "#383838";

const addressDisplay = SITE.address.display;
const telHref = SITE.phoneHref;

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
    <div className={`flex items-start gap-4 py-[18px] ${isLast ? "" : "border-b border-[#E3E8E5]"}`}>
      <IconBox>{icon}</IconBox>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[13px] font-normal text-[#3D4743]">{label}</p>
        <div className="text-[16px] font-semibold text-[var(--color-text-primary)]">{children}</div>
      </div>
    </div>
  );
}

export default function MapAndContact({
  sectionClassName = "bg-white",
  heading = "Bize Ulaşın",
}: Props) {
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
      className={`${sectionClassName} ${HOME_SECTION_Y} font-sans`}
    >
      <div className={HOME_CONTAINER}>
        <div className="grid min-h-[480px] grid-cols-1 overflow-hidden rounded-xl border border-[#E3E8E5] bg-white md:grid-cols-2">
          <div className="flex min-h-0 flex-col border-b border-[#E3E8E5] bg-white px-6 py-9 md:border-b-0 md:border-r md:px-10 md:py-12">
            <SectionHeading id="contact-heading">{heading}</SectionHeading>
            <p className="mt-3 max-w-[340px] text-[16px] leading-[1.65] text-[#3D4743]">
              Çankaya&apos;daki merkezimize bekliyoruz. Sanal ofis hizmetimiz ve yıllık abonelerimizin
              saatlik ücretle kullanabildiği makam odası ile toplantı odası için iletişime geçin.
            </p>

            <address className="mt-10 not-italic">
              <ContactRow icon={<MapPin {...iconProps} />} label="Adres">
                <span>{addressDisplay}</span>
              </ContactRow>
              <ContactRow icon={<Clock {...iconProps} />} label="Çalışma saatleri">
                <span>{SITE.hours.value}</span>
              </ContactRow>
              <ContactRow icon={<Phone {...iconProps} />} label="Telefon">
                <a
                  href={telHref}
                  className="text-inherit no-underline transition-colors duration-200 hover:text-[#0b7041]"
                  aria-label={`Telefon: ${SITE.phone}`}
                >
                  {SITE.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail {...iconProps} />} label="E-posta" isLast>
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

          <div className="relative min-h-[280px] w-full md:min-h-[480px]">
            <iframe
              title="Konsept Ofis - Mahall Ankara, Çankaya harita konumu"
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
              className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-lg border border-[#E3E8E5] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[#0b7041] hover:text-[#0b7041]"
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
