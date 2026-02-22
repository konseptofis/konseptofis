import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPricingPlanById } from "@/app/actions/pricing";
import PricingPlanForm from "../../components/PricingPlanForm";

export default async function EditPricingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = await getPricingPlanById(id);
  if (!plan) notFound();

  return (
    <div>
      <Link
        href="/admin/pricing"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Fiyatlar listesine dön
      </Link>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Fiyat Kartını Düzenle</h1>
      <PricingPlanForm plan={plan} />
    </div>
  );
}
