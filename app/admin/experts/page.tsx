import Link from "next/link";
import { ArrowLeft, Plus, Pencil, ExternalLink } from "lucide-react";
import { getExperts } from "@/app/actions/experts";
import DeleteExpertButton from "../DeleteExpertButton";

export default async function AdminExpertsPage() {
  const experts = await getExperts();

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Dashboard
      </Link>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Uzmanlar</h1>
          <p className="mt-1 text-sm text-gray-600">
            Blog yazılarında “İnceleyen uzman” olarak seçebileceğiniz kişileri buradan yönetin.
          </p>
        </div>
        <Link
          href="/admin/experts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0b7041] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#095530]"
        >
          <Plus className="h-5 w-5" />
          Yeni uzman
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Fotoğraf</th>
              <th className="px-4 py-3 font-medium text-gray-700">Ad</th>
              <th className="px-4 py-3 font-medium text-gray-700">Unvan</th>
              <th className="px-4 py-3 font-medium text-gray-700">Slug</th>
              <th className="px-4 py-3 font-medium text-gray-700">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {experts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  Henüz uzman yok. Yeni uzman ekleyin.
                </td>
              </tr>
            ) : (
              experts.map((expert) => (
                <tr key={expert.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {expert.avatar_url ? (
                      <img
                        src={expert.avatar_url}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{expert.name}</td>
                  <td className="px-4 py-3 text-gray-600">{expert.job_title || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">{expert.slug}</code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/uzmanlar/${expert.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Sitede görüntüle"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Link
                        href={`/admin/experts/${expert.id}`}
                        className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteExpertButton expertId={expert.id} expertName={expert.name} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
