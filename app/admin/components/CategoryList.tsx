"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Pencil, Trash2, X } from "lucide-react";
import type { Category } from "@/app/actions/categories";
import type { AdminPostRef } from "@/app/actions/blog";
import { deleteCategory, updateCategory } from "@/app/actions/categories";
import CategorySeoFields from "./CategorySeoFields";

const POST_PREVIEW_COUNT = 5;

type Props = {
  categories: Category[];
  postsByCategoryId: Record<string, AdminPostRef[]>;
};

function CategoryEditPanel({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const router = useRouter();
  const [metaTitle, setMetaTitle] = useState(category.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(category.meta_description ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await updateCategory({
        id: category.id,
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onClose();
      router.refresh();
    } catch {
      setError("Kategori güncellenirken beklenmeyen bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="mt-3 space-y-4 border-t border-gray-100 pt-4">
      <CategorySeoFields
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        onMetaTitleChange={setMetaTitle}
        onMetaDescriptionChange={setMetaDescription}
        categoryName={category.name}
        idPrefix={`edit-${category.id}`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[#0b7041] px-4 py-2 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
        >
          {submitting ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <X className="h-4 w-4" aria-hidden />
          İptal
        </button>
      </div>
    </form>
  );
}

function CategoryPosts({ posts }: { posts: AdminPostRef[] }) {
  const [expanded, setExpanded] = useState(false);

  if (posts.length === 0) {
    return <p className="mt-2 text-xs text-gray-400">Henüz yazı yok</p>;
  }

  const hasMore = posts.length > POST_PREVIEW_COUNT;
  const visible = expanded ? posts : posts.slice(0, POST_PREVIEW_COUNT);
  const hiddenCount = posts.length - POST_PREVIEW_COUNT;

  return (
    <div className="mt-2 border-t border-gray-100 pt-2">
      <ul className="space-y-1">
        {visible.map((post) => (
          <li key={post.id}>
            <Link
              href={`/admin/posts/${post.id}`}
              className="text-sm text-gray-600 hover:text-[#0b7041] hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#0b7041] hover:underline"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" aria-hidden />
              Daha az göster
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              ve {hiddenCount} tane daha
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function CategoryList({ categories, postsByCategoryId }: Props) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (
      !confirm(
        "Bu kategoriyi silmek istediğinize emin misiniz? Yazılardaki atama kaldırılmaz, sadece listeden silinir."
      )
    ) {
      return;
    }
    try {
      const result = await deleteCategory(id);
      if (!result.ok) {
        alert(result.error);
        return;
      }
      if (editingId === id) setEditingId(null);
      router.refresh();
    } catch {
      alert("Kategori silinirken beklenmeyen bir hata oluştu.");
    }
  }

  if (categories.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 py-8 text-center text-sm text-gray-500">
        Henüz kategori yok. Yukarıdan ekleyebilirsiniz.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {categories.map((cat) => {
        const isEditing = editingId === cat.id;
        const posts = postsByCategoryId[cat.id] ?? [];
        const postCountLabel = posts.length === 1 ? "1 yazı" : `${posts.length} yazı`;

        return (
          <li key={cat.id} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-medium text-gray-900">{cat.name}</span>
                  <span className="text-xs text-gray-500">({postCountLabel})</span>
                </div>
                {(cat.meta_title || cat.meta_description) && !isEditing ? (
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {cat.meta_title || cat.meta_description}
                  </p>
                ) : null}
                {!isEditing ? <CategoryPosts posts={posts} /> : null}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingId(isEditing ? null : cat.id)}
                  className="rounded p-2 text-gray-400 hover:bg-[#0b7041]/10 hover:text-[#0b7041]"
                  aria-label={`${cat.name} kategorisini düzenle`}
                  aria-expanded={isEditing}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id)}
                  className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`${cat.name} kategorisini sil`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {isEditing ? (
              <CategoryEditPanel category={cat} onClose={() => setEditingId(null)} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
