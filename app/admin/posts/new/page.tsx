import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/app/actions/categories";
import { getExperts } from "@/app/actions/experts";
import PostForm from "../../components/PostForm";

export default async function NewPostPage() {
  const [categories, experts] = await Promise.all([getCategories(), getExperts()]);
  return (
    <div>
      <Link
        href="/admin/posts"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Yazılar listesine dön
      </Link>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Yeni Yazı</h1>
      <PostForm mode="create" categories={categories} experts={experts} />
    </div>
  );
}
