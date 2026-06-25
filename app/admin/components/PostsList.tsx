"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import type { Post } from "@/app/actions/blog";
import type { Category } from "@/app/actions/categories";
import { normalizeCategoryKey } from "@/lib/category-utils";
import DeletePostButton from "../DeletePostButton";

type StatusFilter = "all" | "published" | "draft";

type Props = {
  posts: Post[];
  categories: Category[];
};

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "published", label: "Yayında" },
  { value: "draft", label: "Taslak" },
];

export default function PostsList({ posts, categories }: Props) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (statusFilter !== "all" && post.status !== statusFilter) return false;
      if (categoryFilter) {
        const postKey = normalizeCategoryKey(post.category ?? "");
        const filterKey = normalizeCategoryKey(categoryFilter);
        if (postKey !== filterKey) return false;
      }
      return true;
    });
  }, [posts, categoryFilter, statusFilter]);

  const hasActiveFilters = categoryFilter !== "" || statusFilter !== "all";

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-[180px] flex-1">
          <label htmlFor="post-category-filter" className="mb-1 block text-xs font-medium text-gray-600">
            Kategori
          </label>
          <select
            id="post-category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-1 block text-xs font-medium text-gray-600">Durum</span>
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatusFilter(opt.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  statusFilter === opt.value
                    ? "bg-white text-[#0b7041] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                aria-pressed={statusFilter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <p className="text-sm text-gray-500 sm:ml-auto sm:pb-1">
            {filteredPosts.length} yazı gösteriliyor
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Görsel</th>
              <th className="px-4 py-3 font-medium text-gray-700">Başlık</th>
              <th className="px-4 py-3 font-medium text-gray-700">Durum</th>
              <th className="px-4 py-3 font-medium text-gray-700">Tarih</th>
              <th className="px-4 py-3 font-medium text-gray-700">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  Henüz yazı yok. Yeni yazı ekleyin.
                </td>
              </tr>
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  Bu filtreye uygun yazı yok.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt=""
                        className="h-12 w-20 rounded object-cover"
                        width={80}
                        height={48}
                      />
                    ) : (
                      <div className="h-12 w-20 rounded bg-gray-200" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{post.title}</div>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.category?.trim()
                          ? "bg-[#0b7041]/10 text-[#0b7041]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {post.category?.trim() ? `Kategori: ${post.category}` : "Kategorisiz"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {post.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
