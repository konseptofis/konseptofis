import { getPricingPlans, type PricingPlan } from "@/app/actions/pricing";
import { PRICING_FAQ_ITEMS, SITE } from "@/app/lib/data";
import { toOfferPriceString } from "@/app/lib/hizmet-detay-jsonld";
import { SERVICE_OFFER_CARDS } from "@/app/lib/service-offer-cards";

const ORIGIN = SITE.domain.replace(/\/$/, "");

function matchServiceCard(planTitle: string) {
  const t = planTitle.toLowerCase();
  if (t.includes("sanal")) return SERVICE_OFFER_CARDS[0];
  if (t.includes("toplantı") || t.includes("toplanti")) return SERVICE_OFFER_CARDS[2];
  if (t.includes("makam") || t.includes("hazır") || t.includes("hazir"))
    return SERVICE_OFFER_CARDS[1];
  return undefined;
}

function productLandingUrl(planTitle: string): string {
  const t = planTitle.toLowerCase();
  if (t.includes("sanal")) return `${ORIGIN}/sanal-ofis`;
  if (t.includes("toplantı") || t.includes("toplanti")) return `${ORIGIN}/toplanti-odasi`;
  if (t.includes("makam") || t.includes("hazır") || t.includes("hazir"))
    return `${ORIGIN}/makam-odasi`;
  return `${ORIGIN}/fiyatlar`;
}

function productDescription(card: PricingPlan): string {
  const matched = matchServiceCard(card.title);
  if (matched?.description) return matched.description;
  const joined = (card.features ?? []).join(" ");
  return joined.length > 0 ? joined.slice(0, 500) : `${card.title} — ${card.period}`;
}

function productImage(planTitle: string): string {
  const matched = matchServiceCard(planTitle);
  const path = matched?.image ?? "/ankara-sanal-ofis.webp";
  return path.startsWith("http") ? path : `${ORIGIN}${path}`;
}

function plansToProductGraph(plans: PricingPlan[]) {
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

  return plans.map((card) => {
    const offerUrl = productLandingUrl(card.title);
    return {
      "@type": "Product" as const,
      "@id": `${ORIGIN}/fiyatlar#product-${card.id}`,
      name: card.title,
      description: productDescription(card),
      image: productImage(card.title),
      sku: card.id,
      brand: {
        "@type": "Brand" as const,
        name: SITE.name,
      },
      offers: {
        "@type": "Offer" as const,
        url: offerUrl,
        priceCurrency: "TRY",
        price: toOfferPriceString(card.price),
        priceValidUntil,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization" as const,
          name: SITE.name,
          url: `${ORIGIN}/`,
        },
      },
    };
  });
}

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/**
 * /fiyatlar: (1) Supabase fiyat planlarından Product + Offer, (2) sayfadaki SSS ile aynı PRICING_FAQ_ITEMS → FAQPage.
 */
export default async function FiyatlarJsonLd() {
  const plans = await getPricingPlans();
  const productGraph =
    plans.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": plansToProductGraph(plans),
        }
      : null;

  return (
    <>
      {productGraph ? (
        <script
          id="ld-json-fiyatlar-products"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productGraph) }}
        />
      ) : null}
      <script
        id="ld-json-fiyatlar-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
    </>
  );
}
