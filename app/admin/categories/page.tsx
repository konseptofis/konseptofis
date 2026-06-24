import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { getAdminPostsByCategoryId } from "@/app/actions/blog";
import { getCategories } from "@/app/actions/categories";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  const postsByCategoryId = await getAdminPostsByCategoryId(categories);

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Dashboard
      </Link>
      <h1 className="mb-2 flex items-center gap-2 text-2xl font-semibold text-gray-900">
        <Tag className="h-6 w-6" />
        Kategoriler
      </h1>
      <p className="mb-8 text-sm text-gray-600">
        Blog yazılarına atayabileceğiniz kategorileri buradan ekleyip silebilirsiniz.
      </p>

      <CategoryForm />
      <CategoryList categories={categories} postsByCategoryId={postsByCategoryId} />
    </div>
  );
}
