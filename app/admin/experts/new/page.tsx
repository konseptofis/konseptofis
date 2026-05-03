import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ExpertForm from "../../components/ExpertForm";

export default function NewExpertPage() {
  return (
    <div>
      <Link
        href="/admin/experts"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Uzmanlar listesine dön
      </Link>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Yeni uzman</h1>
      <ExpertForm mode="create" />
    </div>
  );
}
