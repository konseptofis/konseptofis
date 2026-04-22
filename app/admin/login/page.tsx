"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Admin Girişi
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          E-posta ve şifre ile giriş yapın
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
              placeholder="admin@ornek.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-11 text-gray-900 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" aria-hidden />
                ) : (
                  <EyeIcon className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0b7041] py-3 font-medium text-white transition-colors hover:bg-[#095530] disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
