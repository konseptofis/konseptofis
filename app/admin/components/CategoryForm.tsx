"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/app/actions/categories";

export default function CategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setError(null);
    setSubmitting(true);
    try {
      const result = await createCategory(trimmed);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setName("");
      router.refresh();
    } catch {
      setError("Kategori eklenirken beklenmeyen bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap items-end gap-3">
      <div className="min-w-[200px]">
        <label htmlFor="category-name" className="mb-1 block text-sm font-medium text-gray-700">
          Yeni kategori
        </label>
        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          placeholder="Ornek: Sanal Ofis"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-[#0b7041] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
      >
        {submitting ? "Ekleniyor..." : "Ekle"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
