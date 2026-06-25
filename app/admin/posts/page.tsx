import Link from "next/link";
import { Plus } from "lucide-react";
import { getPosts } from "@/app/actions/blog";
import { getCategories } from "@/app/actions/categories";
import PostsList from "../components/PostsList";

export default async function AdminPostsPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

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
      <PostsList posts={posts} categories={categories} />
    </div>
  );
}
