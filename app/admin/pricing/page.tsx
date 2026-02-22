import Link from "next/link";
import { Pencil } from "lucide-react";
import { getPricingPlans } from "@/app/actions/pricing";

export default async function AdminPricingPage() {
  const plans = await getPricingPlans();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Fiyat Kartları</h1>
      <p className="mb-6 text-sm text-gray-600">
        Aşağıdaki kartlar /fiyatlar sayfasında görünür. Düzenlemek için ilgili karta tıklayın.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.length === 0 ? (
          <p className="text-gray-500">Henüz fiyat planı yok. Supabase&apos;de pricing_plans tablosunu oluşturup seed verisini ekleyin.</p>
        ) : (
          plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/admin/pricing/${plan.id}`}
              className="flex cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900">{plan.title}</h2>
                <span className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <Pencil className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">₺{plan.price}</p>
              <p className="text-sm text-gray-500">/{plan.period} {plan.kdv}</p>
              <p className="mt-4 text-xs text-gray-400">{plan.features.length} madde</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
