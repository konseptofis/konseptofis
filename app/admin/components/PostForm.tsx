"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost, type Post, type FAQItem } from "@/app/actions/blog";
import { toSlug } from "@/lib/slug";
import RichTextEditor from "./RichTextEditor";
import FeaturedImageUpload from "./FeaturedImageUpload";

type Props = {
  mode: "create" | "edit";
  post?: Post | null;
};

export default function PostForm({ mode, post }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [featuredImage, setFeaturedImage] = useState<string | null>(post?.featured_image ?? null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featured_image_alt ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>(
    post?.faqs && post.faqs.length > 0 ? [...post.faqs] : [{ question: "", answer: "" }]
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSlugFromTitle = useCallback(() => {
    if (!slugTouched && title.trim()) setSlug(toSlug(title));
  }, [title, slugTouched]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (!slugTouched) setSlug(toSlug(e.target.value));
  }

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_340px]"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
          if (mode === "create") {
            await createPost({
              title: title.trim(),
              slug: slug.trim() || toSlug(title),
              content: content || null,
              meta_title: metaTitle.trim() || null,
              meta_description: metaDescription.trim() || null,
              featured_image: featuredImage,
              featured_image_alt: featuredImageAlt.trim() || null,
              status,
              faqs: faqs.filter((f) => f.question.trim() || f.answer.trim()).length > 0 ? faqs : null,
            });
            router.push("/admin/posts");
            router.refresh();
          } else if (post) {
            await updatePost({
              id: post.id,
              title: title.trim(),
              slug: slug.trim() || toSlug(title),
              content: content || null,
              meta_title: metaTitle.trim() || null,
              meta_description: metaDescription.trim() || null,
              featured_image: featuredImage,
              status,
              faqs: faqs.filter((f) => f.question.trim() || f.answer.trim()).length > 0 ? faqs : null,
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
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700">
            Başlık
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={updateSlugFromTitle}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="Yazı başlığı"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">İçerik</label>
          <RichTextEditor content={content} onChange={setContent} placeholder="İçerik yazın..." />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Sıkça Sorulan Sorular</h3>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-gray-500">Soru {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => setFaqs((prev) => prev.filter((_, i) => i !== index))}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Kaldır
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) =>
                    setFaqs((prev) =>
                      prev.map((f, i) => (i === index ? { ...f, question: e.target.value } : f))
                    )
                  }
                  className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Soru"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    setFaqs((prev) =>
                      prev.map((f, i) => (i === index ? { ...f, answer: e.target.value } : f))
                    )
                  }
                  rows={2}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Cevap"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFaqs((prev) => [...prev, { question: "", answer: "" }])}
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Soru ekle
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-gray-700">
            Durum
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          >
            <option value="draft">Taslak olarak kaydet</option>
            <option value="published">Yayına Al</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Öne Çıkan Görsel</label>
          <FeaturedImageUpload value={featuredImage} onChange={setFeaturedImage} />
          <label htmlFor="featured_image_alt" className="mt-2 mb-1.5 block text-sm font-medium text-gray-700">
            Görsel Alt Metni (SEO)
          </label>
          <input
            id="featured_image_alt"
            type="text"
            value={featuredImageAlt}
            onChange={(e) => setFeaturedImageAlt(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="Görseli betimleyen kısa metin"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-gray-700">
            Slug (Kalıcı bağlantı)
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="url-dostu-baslik"
          />
        </div>

        <div>
          <label htmlFor="meta_title" className="mb-1.5 block text-sm font-medium text-gray-700">
            Meta Başlık (SEO)
          </label>
          <input
            id="meta_title"
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="Arama sonuçlarında görünecek başlık"
          />
        </div>

        <div>
          <label htmlFor="meta_description" className="mb-1.5 block text-sm font-medium text-gray-700">
            Meta Açıklama (SEO)
          </label>
          <textarea
            id="meta_description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="Arama sonuçlarında görünecek kısa açıklama"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#0b7041] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
          >
            {submitting ? "Kaydediliyor…" : mode === "create" ? "Yayına Al / Taslak Kaydet" : "Güncelle"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/posts")}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
        </div>
      </div>
    </form>
  );
}
