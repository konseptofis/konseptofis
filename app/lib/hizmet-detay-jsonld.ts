import type { PricingPlan } from "@/app/actions/pricing";
import { buildBreadcrumbListJsonLd } from "@/app/lib/breadcrumb-jsonld";
import type { ServiceDetailData } from "@/app/lib/hizmet-detay-data";
import { getServicePagePath } from "@/app/lib/hizmet-detay-data";
import { HAZIR_OFIS_PLAN_CARD, SERVICE_OFFER_CARDS } from "@/app/lib/service-offer-cards";
import { SITE, siteGeoJsonLd } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

/** TRY liste fiyatını şema için ondalık dizeye çevirir (fiyatlar sayfası ile aynı mantık) */
export function toOfferPriceString(price: string): string {
  const s = price.trim().replace(/\s/g, "").replace(/₺/g, "");
  let num: number;
  if (/,\d{1,2}$/.test(s)) {
    num = parseFloat(s.replace(/\./g, "").replace(",", "."));
  } else {
    num = parseFloat(s.replace(/\./g, ""));
  }
  if (!Number.isFinite(num)) return "0.00";
  return num.toFixed(2);
}

/** Supabase fiyat kartını hizmet detayına göre eşleştirir */
export function matchPricingPlanForService(
  detail: ServiceDetailData,
  plans: PricingPlan[],
): PricingPlan | null {
  if (plans.length === 0) return null;
  const slug = detail.slug.toLowerCase();
  const title = (t: string) => t.toLowerCase();

  if (slug.includes("sanal")) {
    return plans.find((p) => title(p.title).includes("sanal")) ?? null;
  }
  if (slug.includes("hazir") || slug.includes("makam")) {
    return (
      plans.find(
        (p) =>
          title(p.title).includes("makam") ||
          title(p.title).includes("hazır") ||
          title(p.title).includes("hazir"),
      ) ?? null
    );
  }
  if (slug.includes("toplanti")) {
    return (
      plans.find(
        (p) =>
          title(p.title).includes("toplantı") || title(p.title).includes("toplanti"),
      ) ?? null
    );
  }
  return null;
}

export function serviceJsonLdDescription(detail: ServiceDetailData): string {
  const text = detail.introParagraphs.join(" ").replace(/\s+/g, " ").trim();
  if (text.length > 0) {
    return text.length <= 320 ? text : `${text.slice(0, 317)}…`;
  }
  return `${detail.title} — ${SITE.name}, Mahall Ankara.`;
}

export function serviceJsonLdImage(detail: ServiceDetailData): string {
  const sliderFirst = detail.mahallSpotlightBlock?.sliderImages[0]?.src?.trim();
  if (sliderFirst) {
    if (sliderFirst.startsWith("http://") || sliderFirst.startsWith("https://")) {
      return sliderFirst;
    }
    return sliderFirst.startsWith("/")
      ? `${ORIGIN}${sliderFirst}`
      : `${ORIGIN}/${sliderFirst}`;
  }

  const slug = detail.slug.toLowerCase();
  let path: string | undefined;
  if (slug.includes("sanal")) {
    path = SERVICE_OFFER_CARDS.find((c) => c.id === "cankaya-sanal-ofis")?.image;
  } else if (slug.includes("makam")) {
    path = SERVICE_OFFER_CARDS.find((c) => c.id === "makam-odasi")?.image;
  } else if (slug.includes("hazir")) {
    path = HAZIR_OFIS_PLAN_CARD.image;
  } else if (slug.includes("toplanti")) {
    path = SERVICE_OFFER_CARDS.find((c) => c.id === "toplanti-odasi")?.image;
  }

  if (path) {
    return path.startsWith("/") ? `${ORIGIN}${path}` : `${ORIGIN}/${path}`;
  }
  return `${ORIGIN}/ankara-sanal-ofis.webp`;
}

function serviceAreaServed(detail: ServiceDetailData): string | Record<string, unknown> {
  if (detail.slug === "cankaya-sanal-ofis") {
    return { "@type": "Place", name: "Çankaya, Ankara" };
  }
  return "Ankara";
}

function buildLocalBusinessNode(): Record<string, unknown> {
  return {
    "@type": "LocalBusiness",
    "@id": `${ORIGIN}/#localbusiness`,
    name: SITE.name,
    url: `${ORIGIN}/`,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${ORIGIN}/ankara-sanal-ofis.webp`,
    hasMap: SITE.directionsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: siteGeoJsonLd(),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export function buildHizmetDetailGraphJsonLd(
  detail: ServiceDetailData,
  pricingPlan: PricingPlan | null,
): Record<string, unknown> {
  const pageUrl = `${ORIGIN}${getServicePagePath(detail)}`;
  const serviceName = detail.pageHeaderHeading ?? detail.title;

  const serviceNode: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: serviceName,
    description: serviceJsonLdDescription(detail),
    image: serviceJsonLdImage(detail),
    url: pageUrl,
    areaServed: serviceAreaServed(detail),
    provider: {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: SITE.name,
      url: `${ORIGIN}/`,
    },
  };

  if (pricingPlan) {
    const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
    serviceNode.offers = {
      "@type": "Offer",
      url: `${ORIGIN}/fiyatlar`,
      priceCurrency: "TRY",
      price: toOfferPriceString(pricingPlan.price),
      priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE.name,
        url: `${ORIGIN}/`,
      },
    };
  }

  const graph: Record<string, unknown>[] = [
    serviceNode,
    buildLocalBusinessNode(),
    buildBreadcrumbListJsonLd(detail.breadcrumbs, pageUrl),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: detail.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** @deprecated buildHizmetDetailGraphJsonLd kullanın */
export function buildHizmetProductJsonLd(
  detail: ServiceDetailData,
  pricingPlan: PricingPlan | null,
): Record<string, unknown> {
  return buildHizmetDetailGraphJsonLd(detail, pricingPlan);
}

export function buildHizmetFaqPageJsonLd(detail: ServiceDetailData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
