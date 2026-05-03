import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostById } from "@/app/actions/blog";
import { getCategories } from "@/app/actions/categories";
import { getExperts } from "@/app/actions/experts";
import PostForm from "@/app/admin/components/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, categories, experts] = await Promise.all([
    getPostById(id),
    getCategories(),
    getExperts(),
  ]);
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/posts"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Yazılar listesine dön
      </Link>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Yazıyı Düzenle</h1>
      <PostForm mode="edit" post={post} categories={categories} experts={experts} />
    </div>
  );
}
