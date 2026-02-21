import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

export default function MapAndContact() {
  return (
    <section
      id="iletisim"
      aria-labelledby="contact-heading"
      className="bg-white px-4 py-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="contact-heading" className="mb-8 flex items-center gap-3 text-left tracking-tight text-black">
          <span className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12" aria-hidden />
          İletişim & Adres
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="space-y-6">
            <p className="text-gray-600">
              Ankara sanal ofis ve hazır ofis hizmetlerimiz için Mahall Ankara adresindeki
              merkezimize bekliyoruz. Yerel SEO ve erişilebilirlik için adres bilgilerimiz
              aşağıdadır.
            </p>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 shrink-0 text-[#0b7041]/70 mt-0.5" aria-hidden />
                <div>
                  <span className="font-medium text-[#0b7041]">Adres</span>
                  <p className="text-gray-600 mt-1 break-words">
                    {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city},{" "}
                    {SITE.address.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0 text-[#0b7041]/70" aria-hidden />
                <a
                  href={`tel:${SITE.phoneRaw.replace(/\s/g, "")}`}
                  className="text-[#0b7041] hover:opacity-80 font-medium"
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 shrink-0 text-[#0b7041]/70" aria-hidden />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[#0b7041] hover:opacity-80 font-medium"
                >
                  {SITE.email}
                </a>
              </div>
            </address>
          </div>
          <div className="min-h-[300px] h-full rounded-xl overflow-hidden border border-[#f2f2f2] bg-[#f2f2f2]">
            <iframe
              title="Konsept Ofis - Mahall Ankara, Çankaya harita konumu"
              src={SITE.mapEmbedUrl}
              width="100%"
              height="100%"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
