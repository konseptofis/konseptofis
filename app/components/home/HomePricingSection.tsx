import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { getPricingPlans, type PricingPlan } from "@/app/lib/pricing-plans";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";
import SectionHeading from "@/app/components/SectionHeading";
import TeklifAlButton from "@/app/components/home/TeklifAlButton";
import { BTN_PRIMARY, HOME_CONTAINER } from "@/app/lib/home-ui";

const SANAL_FEATURES = [
  "Yasal iş adresi",
  "Vergi levhası ve ticaret sicil adresi",
  "Posta, kargo ve tebligat takibi",
  "Anlık bilgilendirme",
  "Stopaj ve aidat yok",
] as const;

const DETAIL_HREF: Record<"toplanti" | "makam", string> = {
  toplanti: "/hizmetlerimiz/toplanti-odasi-kiralama",
  makam: "/hizmetlerimiz/makam-odasi-kiralama",
};

type PlanKind = "sanal" | "toplanti" | "makam";

function planKind(title: string): PlanKind | null {
  const t = title.toLocaleLowerCase("tr-TR");
  if (t.includes("sanal")) return "sanal";
  // "Toplantı" → toplantı (ı); ASCII "toplanti" ile eşleşmez
  if (t.includes("toplant")) return "toplanti";
  if (t.includes("makam")) return "makam";
  return null;
}

function orderPlans(plans: PricingPlan[]): PricingPlan[] {
  const keys: PlanKind[] = ["sanal", "toplanti", "makam"];
  return keys
    .map((key) => plans.find((p) => planKind(p.title) === key))
    .filter((p): p is PricingPlan => Boolean(p));
}

function priceUnit(card: PricingPlan): string {
  return `TL / ${card.period} ${card.kdv}`.replace(/\s+/g, " ").trim();
}

function cardFeatures(card: PricingPlan, kind: PlanKind | null): string[] {
  if (kind === "sanal") return [...SANAL_FEATURES];
  return (card.features ?? []).filter(Boolean);
}

export default async function HomePricingSection() {
  const prices = await getSiteDisplayPrices();
  let plans: PricingPlan[] = [];
  try {
    plans = orderPlans(await getPricingPlans());
  } catch {
    plans = [];
  }

  return (
    <section
      id="ankara-sanal-ofis-fiyatlari"
      aria-labelledby="home-pricing-heading"
      className="bg-white py-16 font-sans lg:py-24"
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="home-pricing-heading" className="mb-4">
          Ankara Sanal Ofis Fiyatları
        </SectionHeading>
        <p className="m-0 w-full text-[16px] leading-[1.65] text-[#3D4743]">
          Sanal ofis paketimiz aylık{" "}
          <strong>{prices.sanalMonthlyLabel || "fiyatlar sayfasındaki paket bedeli"}</strong>. Bu
          fiyata yasal iş adresi, posta, kargo ve tebligat takibi, profesyonel telefon hattı ve
          Mahall Ankara&apos;daki adres prestiji dahildir. Stopaj, bina aidatı, elektrik, su veya
          internet faturası ödemezsiniz; ödediğiniz tutar faturalı ve gider olarak gösterilebilir.
          Yıllık sanal ofis abonelerimiz toplantı odası ve makam odasını saatlik{" "}
          <strong>{prices.hourlyLabel || "fiyatlar sayfasındaki paket bedeli"}</strong> ile
          kiralayabilir.
        </p>

        {plans.length > 0 ? (
          <ul className="mx-auto mt-12 grid max-w-[480px] list-none grid-cols-1 gap-6 p-0 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
            {plans.map((card) => {
              const kind = planKind(card.title);
              const featured = kind === "sanal";
              const features = cardFeatures(card, kind);
              const detailHref =
                kind === "toplanti" || kind === "makam" ? DETAIL_HREF[kind] : null;

              return (
                <li key={card.id} className="flex min-h-0">
                  <article
                    className={`relative flex w-full flex-col rounded-2xl border bg-white p-8 ${
                      featured
                        ? "border-2 border-[var(--color-green)]"
                        : "border-[#E3E8E5]"
                    }`}
                  >
                    <h3 className="m-0 text-[18px] font-semibold leading-snug text-[var(--color-text-primary)]">
                      {card.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-[44px] font-bold leading-none tracking-tight text-[var(--color-text-primary)]">
                        ₺{card.price}
                      </span>
                      <span className="text-[15px] text-[#3D4743]">{priceUnit(card)}</span>
                    </div>

                    <hr className="my-6 border-0 border-t border-[#E3E8E5]" />

                    <ul className="m-0 flex-1 space-y-2.5 p-0">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckIcon
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-green)]"
                            aria-hidden
                          />
                          <span className="text-[15px] leading-snug text-[#3D4743]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      {featured ? (
                        <TeklifAlButton className={`${BTN_PRIMARY} w-full`}>
                          Hemen Teklif Al
                        </TeklifAlButton>
                      ) : detailHref ? (
                        <Link href={detailHref} className={`${BTN_PRIMARY} w-full`}>
                          Detaylar
                        </Link>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : null}

        <p className="mt-10 text-center">
          <Link
            href="/fiyatlar"
            className="text-[15px] font-semibold text-[var(--color-green)] underline-offset-2 hover:underline"
          >
            Tüm paketleri incele
          </Link>
        </p>
      </div>
    </section>
  );
}
