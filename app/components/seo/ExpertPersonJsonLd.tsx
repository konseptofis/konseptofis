import type { Expert, ExpertSocialLinks } from "@/app/actions/experts";
import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

function sameAsFromExpert(expert: Expert): string[] {
  const s = (expert.social_links ?? {}) as ExpertSocialLinks;
  return [s.linkedin_url, s.twitter_url, s.instagram_url]
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter((u) => u.length > 0);
}

function descriptionForPerson(expert: Expert): string | undefined {
  const meta = expert.meta_description?.trim();
  if (meta) return meta;
  if (!expert.bio?.trim()) return undefined;
  const text = expert.bio.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length === 0) return undefined;
  return text.length <= 320 ? text : `${text.slice(0, 317)}…`;
}

type Props = { expert: Expert };

/** Uzman detay: Person JSON-LD (head). */
export default function ExpertPersonJsonLd({ expert }: Props) {
  const sameAs = sameAsFromExpert(expert);
  const desc = descriptionForPerson(expert);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: expert.name,
    url: `${ORIGIN}/uzmanlar/${expert.slug}`,
    ...(expert.job_title ? { jobTitle: expert.job_title } : {}),
    ...(desc ? { description: desc } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      id={`ld-json-expert-${expert.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
