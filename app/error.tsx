"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section
        className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="error-heading"
      >
        <div className="mx-auto w-full max-w-lg text-center">
          <h1
            id="error-heading"
            className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
          >
            Bir şeyler ters gitti
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[var(--color-text-muted)]">
            Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-lg bg-[#0b7041] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#095530] focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
            >
              Tekrar dene
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-[#e5e5e5] bg-white px-6 py-3 text-center text-sm font-semibold text-[#0b7041] transition-colors hover:border-[#0b7041]/40 hover:bg-[#0b7041]/5 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-offset-2"
            >
              Ana sayfaya dön
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
