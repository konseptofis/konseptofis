"use client";

type Props = {
  metaTitle: string;
  metaDescription: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  categoryName?: string;
  idPrefix?: string;
};

function CharCount({ length, limit }: { length: number; limit: number }) {
  return (
    <p
      className={`mt-1 text-xs ${length > limit ? "font-medium text-amber-600" : "text-gray-500"}`}
      aria-live="polite"
    >
      {length}/{limit}
    </p>
  );
}

export default function CategorySeoFields({
  metaTitle,
  metaDescription,
  onMetaTitleChange,
  onMetaDescriptionChange,
  categoryName = "Kategori Adı",
  idPrefix = "category",
}: Props) {
  const titleId = `${idPrefix}-meta-title`;
  const descId = `${idPrefix}-meta-description`;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50/80 p-4">
      <div>
        <label htmlFor={titleId} className="mb-1.5 block text-sm font-medium text-gray-700">
          Meta Başlık (SEO)
        </label>
        <input
          id={titleId}
          type="text"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          placeholder="Arama sonuçlarında görünecek başlık"
        />
        <p className="mt-1 text-xs text-gray-500">
          Boş bırakılırsa otomatik: &apos;{categoryName} - Konsept Ofis Blog&apos;. Önerilen: 50-60
          karakter.
        </p>
        <CharCount length={metaTitle.length} limit={60} />
      </div>
      <div>
        <label htmlFor={descId} className="mb-1.5 block text-sm font-medium text-gray-700">
          Meta Açıklama (SEO)
        </label>
        <textarea
          id={descId}
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          placeholder="Arama sonuçlarında görünecek kısa açıklama"
        />
        <p className="mt-1 text-xs text-gray-500">
          Arama sonuçlarında görünür. Önerilen: 150-160 karakter.
        </p>
        <CharCount length={metaDescription.length} limit={160} />
      </div>
    </div>
  );
}
