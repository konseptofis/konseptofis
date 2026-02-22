"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePricingPlan, type PricingPlan } from "@/app/actions/pricing";

type Props = { plan: PricingPlan };

export default function PricingPlanForm({ plan }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(plan.title);
  const [price, setPrice] = useState(plan.price);
  const [period, setPeriod] = useState(plan.period);
  const [kdv, setKdv] = useState(plan.kdv);
  const [features, setFeatures] = useState<string[]>(
    plan.features.length > 0 ? [...plan.features] : [""]
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="max-w-2xl space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
          await updatePricingPlan({
            id: plan.id,
            title: title.trim(),
            price: price.trim(),
            period: period.trim(),
            kdv: kdv.trim(),
            features: features.map((f) => f.trim()).filter(Boolean),
          });
          router.refresh();
          router.push("/admin/pricing");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Bir hata oluştu.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700">
          Başlık
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
          placeholder="Örn: Sanal Ofis"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-gray-700">
            Fiyat (₺)
          </label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="800"
            required
          />
        </div>
        <div>
          <label htmlFor="period" className="mb-1.5 block text-sm font-medium text-gray-700">
            Dönem
          </label>
          <input
            id="period"
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="aylık / saatlik"
          />
        </div>
        <div>
          <label htmlFor="kdv" className="mb-1.5 block text-sm font-medium text-gray-700">
            KDV metni
          </label>
          <input
            id="kdv"
            type="text"
            value={kdv}
            onChange={(e) => setKdv(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
            placeholder="+ KDV"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Özellikler (maddeler)</h3>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  setFeatures((prev) =>
                    prev.map((f, i) => (i === index ? e.target.value : f))
                  )
                }
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0b7041] focus:ring-1 focus:ring-[#0b7041]"
                placeholder="Madde metni"
              />
              <button
                type="button"
                onClick={() => setFeatures((prev) => prev.filter((_, i) => i !== index))}
                className="rounded-lg border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50"
              >
                Sil
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFeatures((prev) => [...prev, ""])}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Madde ekle
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[#0b7041] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
        >
          {submitting ? "Kaydediliyor…" : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/pricing")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
