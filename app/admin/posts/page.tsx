import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getPosts } from "@/app/actions/blog";
import DeletePostButton from "../DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Yazılar</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0b7041] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#095530]"
        >
          <Plus className="h-5 w-5" />
          Yeni Yazı
        </Link>
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
            ) : (
              posts.map((post) => (
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
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {post.title}
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
