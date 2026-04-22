"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { Category } from "@/app/actions/categories";
import { deleteCategory } from "@/app/actions/categories";

type Props = { categories: Category[] };

export default function CategoryList({ categories }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz? Yazılardaki atama kaldırılmaz, sadece listeden silinir.")) return;
    try {
      await deleteCategory(id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Silinirken hata oluştu.");
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
      {categories.map((cat) => (
        <li
          key={cat.id}
          className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3"
        >
          <span className="font-medium text-gray-900">{cat.name}</span>
          <button
            type="button"
            onClick={() => handleDelete(cat.id)}
            className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
            aria-label={`${cat.name} kategorisini sil`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
