"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/app/actions/categories";

export default function AdminCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setError(null);
        setSubmitting(true);
        try {
          await createCategory({
            name: name.trim(),
            meta_title: null,
            meta_description: null,
          });
          setName("");
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Hata oluştu.");
        } finally {
          setSubmitting(false);
        }
      }}
      className="space-y-3"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Kategori adı"
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-[#0b7041] py-2.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
      >
        {submitting ? "Ekleniyor…" : "Ekle"}
      </button>
    </form>
  );
}
