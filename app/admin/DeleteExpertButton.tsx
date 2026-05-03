"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteExpert } from "@/app/actions/experts";

type Props = { expertId: string; expertName: string };

export default function DeleteExpertButton({ expertId, expertName }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    await deleteExpert(expertId);
    setConfirming(false);
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs">
        <span className="text-red-700">Silmek istediğinize emin misiniz?</span>
        <button
          type="button"
          onClick={handleDelete}
          className="font-medium text-red-700 hover:underline"
        >
          Evet
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-gray-600 hover:underline"
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
      aria-label={`${expertName} uzmanını sil`}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
