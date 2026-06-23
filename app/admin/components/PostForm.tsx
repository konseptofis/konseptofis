"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createPost,
  updatePost,
  markPostReviewed,
  clearPostReview,
  type Post,
  type FAQItem,
} from "@/app/actions/blog";
import type { Category } from "@/app/actions/categories";
import type { Expert } from "@/app/actions/experts";
import { toSlug } from "@/lib/slug";
import RichTextEditor from "./RichTextEditor";
import FeaturedImageUpload from "./FeaturedImageUpload";

type Props = {
  mode: "create" | "edit";
  post?: Post | null;
  categories?: Category[];
  experts?: Expert[];
};

export default function PostForm({ mode, post, categories = [], experts = [] }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [featuredImage, setFeaturedImage] = useState<string | null>(post?.featured_image ?? null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featured_image_alt ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>(
    post?.faqs && post.faqs.length > 0 ? [...post.faqs] : [{ question: "", answer: "" }]
  );
  const [submitting, setSubmitting] = useState(false);
  const [reviewerId, setReviewerId] = useState(post?.reviewer_id ?? "");
  const [reviewedAt, setReviewedAt] = useState<string | null>(post?.reviewed_at ?? null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReviewedAt(post?.reviewed_at ?? null);
    setReviewerId(post?.reviewer_id ?? "");
  }, [post?.reviewed_at, post?.reviewer_id]);

  const selectedReviewer = experts.find((ex) => ex.id === reviewerId);

  function formatReviewDate(iso: string) {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
              category: category.trim() || null,
              status,
              faqs: faqs.filter((f) => f.question.trim() || f.answer.trim()).length > 0 ? faqs : null,
              reviewer_id: reviewerId || null,
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
              featured_image_alt: featuredImageAlt.trim() || null,
              category: category.trim() || null,
              status,
              faqs: faqs.filter((f) => f.question.trim() || f.answer.trim()).length > 0 ? faqs : null,
              reviewer_id: reviewerId || null,
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
          <RichTextEditor
            key={mode === "edit" && post ? post.id : "create"}
            content={content}
            onChange={setContent}
            placeholder="İçerik yazın..."
          />
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
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-gray-700">
            Kategori
          </label>
          {categories.length > 0 ? (
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            >
              <option value="">Kategori seçin</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
              {category && !categories.some((c) => c.name === category) && (
                <option value={category}>{category}</option>
              )}
            </select>
          ) : (
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
              placeholder="Örn. Sanal Ofis"
            />
          )}
        </div>

        <div>
          <label htmlFor="reviewer" className="mb-1.5 block text-sm font-medium text-gray-700">
            İnceleyen uzman
          </label>
          <select
            id="reviewer"
            value={reviewerId}
            onChange={(e) => setReviewerId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          >
            <option value="">Seçin (yok)</option>
            {experts.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
                {ex.job_title ? ` — ${ex.job_title}` : ""}
              </option>
            ))}
          </select>
          {experts.length === 0 ? (
            <p className="mt-1.5 text-xs text-gray-500">
              Uzman listesi boşsa önce{" "}
              <a href="/admin/experts/new" className="text-[#0b7041] underline">
                uzman ekleyin
              </a>
              .
            </p>
          ) : null}
          {mode === "edit" && post ? (
            <div className="mt-3 space-y-2 rounded-lg border border-gray-200 bg-gray-50/80 p-3">
              {reviewedAt && selectedReviewer ? (
                <p className="text-sm font-medium text-[#0b7041]">
                  ✓ Denetlendi: {formatReviewDate(reviewedAt)} — {selectedReviewer.name}
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Henüz denetim kaydı yok. Uzman seçip &quot;Denetle&quot; ile işaretleyin.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!reviewerId || reviewSubmitting}
                  title={!reviewerId ? "Önce inceleyen uzman seçin" : undefined}
                  onClick={async () => {
                    if (!reviewerId || !post) return;
                    setReviewMessage(null);
                    setReviewSubmitting(true);
                    try {
                      await markPostReviewed({ id: post.id, reviewer_id: reviewerId });
                      setReviewedAt(new Date().toISOString());
                      setReviewMessage(reviewedAt ? "Denetim tarihi güncellendi." : "İçerik denetlendi olarak işaretlendi.");
                      router.refresh();
                    } catch (err) {
                      setReviewMessage(err instanceof Error ? err.message : "Denetim kaydedilemedi.");
                    } finally {
                      setReviewSubmitting(false);
                    }
                  }}
                  className="rounded-lg bg-[#0b7041] px-3 py-2 text-sm font-medium text-white hover:bg-[#095530] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {reviewSubmitting
                    ? "Kaydediliyor…"
                    : reviewedAt
                      ? "Yeniden Denetle"
                      : "Denetle"}
                </button>
                {reviewedAt ? (
                  <button
                    type="button"
                    disabled={reviewSubmitting}
                    onClick={async () => {
                      if (!post) return;
                      setReviewMessage(null);
                      setReviewSubmitting(true);
                      try {
                        await clearPostReview(post.id);
                        setReviewedAt(null);
                        setReviewMessage("Denetim kaydı kaldırıldı.");
                        router.refresh();
                      } catch (err) {
                        setReviewMessage(err instanceof Error ? err.message : "Denetim kaldırılamadı.");
                      } finally {
                        setReviewSubmitting(false);
                      }
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Denetimi Kaldır
                  </button>
                ) : null}
              </div>
              {!reviewerId ? (
                <p className="text-xs text-amber-700">Önce inceleyen uzman seçin.</p>
              ) : null}
              {reviewMessage ? <p className="text-xs text-gray-600">{reviewMessage}</p> : null}
            </div>
          ) : mode === "create" ? (
            <p className="mt-1.5 text-xs text-gray-500">
              Denetim işareti yazı kaydedildikten sonra düzenleme ekranından yapılır.
            </p>
          ) : null}
        </div>

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
