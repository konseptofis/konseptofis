import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getExpertById } from "@/app/actions/experts";
import ExpertForm from "../../components/ExpertForm";

export default async function EditExpertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expert = await getExpertById(id);
  if (!expert) notFound();

  return (
    <div>
      <Link
        href="/admin/experts"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Uzmanlar listesine dön
      </Link>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Uzmanı düzenle</h1>
      <ExpertForm mode="edit" expert={expert} />
    </div>
  );
}
