"use client";



import { useState } from "react";

import { useRouter } from "next/navigation";

import { createCategory } from "@/app/actions/categories";

import CategorySeoFields from "./CategorySeoFields";



export default function CategoryForm() {

  const router = useRouter();

  const [name, setName] = useState("");

  const [metaTitle, setMetaTitle] = useState("");

  const [metaDescription, setMetaDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);



  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) return;

    setError(null);

    setSubmitting(true);

    try {

      const result = await createCategory({

        name: trimmed,

        meta_title: metaTitle.trim() || null,

        meta_description: metaDescription.trim() || null,

      });

      if (!result.ok) {

        setError(result.error);

        return;

      }

      setName("");

      setMetaTitle("");

      setMetaDescription("");

      router.refresh();

    } catch (err) {

      const message = err instanceof Error ? err.message : "";

      if (message.includes("Server Action") && message.includes("not found")) {

        setError("Sunucu güncellendi. Sayfayı yenileyin (Ctrl+F5) ve tekrar deneyin.");

        return;

      }

      setError("Kategori eklenirken beklenmeyen bir hata oluştu.");

    } finally {

      setSubmitting(false);

    }

  }



  return (

    <form onSubmit={handleSubmit} className="mb-8 space-y-4 rounded-xl border border-gray-200 bg-white p-5">

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



      <CategorySeoFields

        metaTitle={metaTitle}

        metaDescription={metaDescription}

        onMetaTitleChange={setMetaTitle}

        onMetaDescriptionChange={setMetaDescription}

        categoryName={name.trim() || "Kategori Adı"}

        idPrefix="new-category"

      />



      <div className="flex flex-wrap items-center gap-3">

        <button

          type="submit"

          disabled={submitting}

          className="rounded-lg bg-[#0b7041] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"

        >

          {submitting ? "Ekleniyor..." : "Ekle"}

        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

      </div>

    </form>

  );

}

