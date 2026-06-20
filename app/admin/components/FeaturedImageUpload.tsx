"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { uploadBlogImage } from "@/lib/admin/upload-blog-image";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
};

export default function FeaturedImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const publicUrl = await uploadBlogImage(file);
      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Öne çıkan"
            className="max-h-48 rounded-lg border border-gray-200 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
            aria-label="Görseli kaldır"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-10 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          <Upload className="mb-2 h-10 w-10" />
          <span className="text-sm">
            {uploading ? "Yükleniyor…" : "Görsel yükle veya sürükle"}
          </span>
        </button>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
