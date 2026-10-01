import { HOMEPAGE_GOOGLE_REVIEWS } from "./data";

const LEGACY_ROLES = [
  "Serbest Avukat",
  "Uzman Diyetisyen",
  "Klinik Psikolog",
  "E-Ticaret Kurucusu",
] as const;

export const HOMEPAGE_TESTIMONIALS = HOMEPAGE_GOOGLE_REVIEWS.map((review, index) => ({
  initials: review.initials,
  name: review.name,
  text: review.text,
  role: LEGACY_ROLES[index] ?? "",
  datePublished: review.date || "",
}));

export type HomepageTestimonial = (typeof HOMEPAGE_TESTIMONIALS)[number];
