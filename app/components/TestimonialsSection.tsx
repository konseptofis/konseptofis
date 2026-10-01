import { HOMEPAGE_GOOGLE_REVIEWS, SITE } from "@/app/lib/data";
import SectionHeading from "./SectionHeading";
import TestimonialsCarousel from "./TestimonialsCarousel";
import { HOME_BG_MUTED, HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

export default function TestimonialsSection() {
  return (
    <section
      id="yorumlar"
      aria-labelledby="testimonials-heading"
      className={`${HOME_SECTION_Y} ${HOME_BG_MUTED} font-sans`}
    >
      <div className={HOME_CONTAINER}>
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="testimonials-heading">Hakkımızda Ne Diyor?</SectionHeading>
          <a
            href={SITE.gbpReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[16px] text-[#3D4743] underline-offset-2 hover:text-[#0b7041] hover:underline"
          >
            {"\u2605"} {SITE.reviews.rating} · {SITE.reviews.count} Google yorumu
          </a>
        </header>

        <TestimonialsCarousel reviews={HOMEPAGE_GOOGLE_REVIEWS} />
      </div>
    </section>
  );
}
