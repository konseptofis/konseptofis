import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, FileText, Banknote, Tag, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AdminLogoutButton from "./AdminLogoutButton";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex w-56 flex-col border-r border-gray-200 bg-gray-900 text-white">
        <div className="p-6">
          <p className="text-sm font-semibold text-gray-300">Konsept Ofis</p>
          <p className="mt-1 text-xs text-gray-500">Blog Yönetimi</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/posts"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <FileText className="h-5 w-5" />
            Yazılar
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <Tag className="h-5 w-5" />
            Kategoriler
          </Link>
          <Link
            href="/admin/experts"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <UserCircle className="h-5 w-5" />
            Uzmanlar
          </Link>
          <Link
            href="/admin/pricing"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <Banknote className="h-5 w-5" />
            Fiyatlar
          </Link>
        </nav>
        <div className="border-t border-gray-800 p-3">
          <AdminLogoutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 sm:p-8">{children}</main>
    </div>
  );
}
