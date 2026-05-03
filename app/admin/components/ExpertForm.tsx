"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createExpert, updateExpert, type Expert, type ExpertSocialLinks } from "@/app/actions/experts";
import { toSlug } from "@/lib/slug";
import RichTextEditor from "./RichTextEditor";
import FeaturedImageUpload from "./FeaturedImageUpload";

type Props = {
  mode: "create" | "edit";
  expert?: Expert | null;
};

function linksFromExpert(expert: Expert | null | undefined): ExpertSocialLinks {
  const s = (expert?.social_links ?? {}) as ExpertSocialLinks;
  return {
    linkedin_url: s.linkedin_url ?? "",
    twitter_url: s.twitter_url ?? "",
    instagram_url: s.instagram_url ?? "",
  };
}

export default function ExpertForm({ mode, expert }: Props) {
  const router = useRouter();
  const initialLinks = linksFromExpert(expert);
  const [name, setName] = useState(expert?.name ?? "");
  const [slug, setSlug] = useState(expert?.slug ?? "");
  const [jobTitle, setJobTitle] = useState(expert?.job_title ?? "");
  const [bio, setBio] = useState(expert?.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(expert?.avatar_url ?? null);
  const [linkedin, setLinkedin] = useState(initialLinks.linkedin_url ?? "");
  const [twitter, setTwitter] = useState(initialLinks.twitter_url ?? "");
  const [instagram, setInstagram] = useState(initialLinks.instagram_url ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncSlugFromName = useCallback(() => {
    if (!slugTouched && name.trim()) setSlug(toSlug(name));
  }, [name, slugTouched]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (!slugTouched) setSlug(toSlug(e.target.value));
  }

  function buildSocialLinks(): ExpertSocialLinks {
    const out: ExpertSocialLinks = {};
    if (linkedin.trim()) out.linkedin_url = linkedin.trim();
    if (twitter.trim()) out.twitter_url = twitter.trim();
    if (instagram.trim()) out.instagram_url = instagram.trim();
    return out;
  }

  return (
    <form
      className="mx-auto max-w-3xl space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
          const social = buildSocialLinks();
          if (mode === "create") {
            await createExpert({
              name: name.trim(),
              slug: slug.trim() || toSlug(name),
              job_title: jobTitle.trim() || null,
              bio: bio || null,
              avatar_url: avatarUrl,
              social_links: social,
            });
            router.push("/admin/experts");
            router.refresh();
          } else if (expert) {
            await updateExpert({
              id: expert.id,
              name: name.trim(),
              slug: slug.trim() || toSlug(name),
              job_title: jobTitle.trim() || null,
              bio: bio || null,
              avatar_url: avatarUrl,
              social_links: social,
            });
            router.refresh();
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Bir hata oluştu.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div>
        <label htmlFor="expert-name" className="mb-1.5 block text-sm font-medium text-gray-700">
          Ad Soyad
        </label>
        <input
          id="expert-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={syncSlugFromName}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
        />
      </div>

      <div>
        <label htmlFor="expert-slug" className="mb-1.5 block text-sm font-medium text-gray-700">
          Slug (URL)
        </label>
        <input
          id="expert-slug"
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          placeholder="ornek-uzman"
        />
      </div>

      <div>
        <label htmlFor="expert-title" className="mb-1.5 block text-sm font-medium text-gray-700">
          Unvan
        </label>
        <input
          id="expert-title"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Biyografi</label>
        <RichTextEditor
          key={mode === "edit" && expert ? expert.id : "create-expert"}
          content={bio}
          onChange={setBio}
          placeholder="Uzmanlık alanı ve deneyim..."
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Fotoğraf</label>
        <FeaturedImageUpload value={avatarUrl} onChange={setAvatarUrl} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-4">
        <h3 className="mb-3 text-sm font-medium text-gray-800">Sosyal medya</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="expert-li" className="mb-1 block text-xs font-medium text-gray-600">
              LinkedIn URL
            </label>
            <input
              id="expert-li"
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
              placeholder="https://"
            />
          </div>
          <div>
            <label htmlFor="expert-tw" className="mb-1 block text-xs font-medium text-gray-600">
              X (Twitter) URL
            </label>
            <input
              id="expert-tw"
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
              placeholder="https://"
            />
          </div>
          <div>
            <label htmlFor="expert-ig" className="mb-1 block text-xs font-medium text-gray-600">
              Instagram URL
            </label>
            <input
              id="expert-ig"
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
              placeholder="https://"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[#0b7041] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
        >
          {submitting ? "Kaydediliyor…" : mode === "create" ? "Kaydet" : "Güncelle"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experts")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
