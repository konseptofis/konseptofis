"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AccordionFAQ from "@/app/components/AccordionFAQ";
import BlogSidebar from "@/app/components/blog/BlogSidebar";
import TableOfContents from "@/app/components/blog/TableOfContents";
import { processHeadings } from "@/lib/headings";
import { enhanceContentHtml } from "@/lib/enhance-content-html";
import {
  POST_PREVIEW_STORAGE_KEY,
  BLOG_ARTICLE_PROSE_CLASSNAME,
  type PostPreviewData,
} from "@/app/lib/post-preview";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function PreviewBanner() {
  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-2 bg-[#0b7041] px-4 py-2 text-center text-sm font-medium text-white">
      <span>👁️ Önizleme modu — bu içerik henüz kaydedilmedi, yalnızca sizin görebileceğiniz bir taslaktır.</span>
      <button
        type="button"
        onClick={() => window.close()}
        className="rounded bg-white/15 px-2.5 py-0.5 text-xs font-semibold hover:bg-white/25"
      >
        Sekmeyi kapat
      </button>
    </div>
  );
}

export default function PostPreview() {
  const [data, setData] = useState<PostPreviewData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POST_PREVIEW_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as PostPreviewData);
    } catch {
      setData(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  const processed = useMemo(() => {
    if (!data?.content) return { html: "", items: [] as ReturnType<typeof processHeadings>["items"] };
    const { html, items } = processHeadings(data.content);
    return { html: enhanceContentHtml(html), items };
  }, [data?.content]);

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-500">
        Önizleme yükleniyor…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-lg font-semibold text-gray-900">Önizlenecek içerik bulunamadı</p>
        <p className="text-sm text-gray-600">
          Bu sayfa, yazı düzenleme ekranındaki <strong>&quot;Önizle&quot;</strong> butonuyla açılır.
          Lütfen admin panelde yazınızı açıp Önizle&apos;ye tıklayın.
        </p>
      </div>
    );
  }

  const title = data.title.trim() || "Başlıksız yazı";
  const showToc = processed.items.length > 0 || (data.faqs && data.faqs.length > 0);

  return (
    <>
      <PreviewBanner />
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:gap-12 lg:items-start">
            <div className="min-w-0 text-left">
              <header className="pb-6">
                <nav
                  aria-label="Breadcrumb"
                  className="mb-6 flex flex-wrap items-center justify-start gap-1 text-sm text-gray-500"
                >
                  <Link href="/" className="hover:text-[#0b7041]">
                    Anasayfa
                  </Link>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
                  <Link href="/blog" className="hover:text-[#0b7041]">
                    Blog
                  </Link>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
                  <span className="min-w-0 text-left" title={title}>
                    {title}
                  </span>
                </nav>
                <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-[2.5rem] md:leading-tight">
                  {title}
                </h1>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-left text-sm text-gray-600">
                  {data.category?.trim() ? (
                    <>
                      <span>{data.category.trim()}</span>
                      <span className="text-gray-400" aria-hidden>
                        |
                      </span>
                    </>
                  ) : null}
                  <time dateTime={data.created_at}>{formatDate(data.created_at)}</time>
                  {data.reviewer?.name && !data.reviewed_at ? (
                    <>
                      <span className="text-gray-400" aria-hidden>
                        |
                      </span>
                      <span className="font-medium text-[#0b7041]">
                        {data.reviewer.name}
                        {data.reviewer.job_title ? `, ${data.reviewer.job_title}` : ""}
                      </span>
                    </>
                  ) : null}
                </p>
                {data.reviewed_at && data.reviewer?.name ? (
                  <p className="mt-2 text-sm text-gray-600">
                    Bu içerik{" "}
                    <time dateTime={data.reviewed_at} className="font-medium text-gray-700">
                      {formatDate(data.reviewed_at)}
                    </time>{" "}
                    tarihinde{" "}
                    <span className="font-medium text-[#0b7041]">{data.reviewer.name}</span>{" "}
                    tarafından incelenmiştir.
                  </p>
                ) : null}
                {data.featured_image ? (
                  <div className="mt-8 overflow-hidden rounded-lg shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.featured_image}
                      alt={data.featured_image_alt || title}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ) : null}
              </header>

              {showToc ? (
                <div className="mb-8 mt-8">
                  <TableOfContents items={processed.items} faqs={data.faqs ?? undefined} />
                </div>
              ) : null}

              {data.content ? (
                <article
                  className={BLOG_ARTICLE_PROSE_CLASSNAME}
                  dangerouslySetInnerHTML={{ __html: processed.html }}
                  style={{ fontSize: "16px", textAlign: "justify" }}
                />
              ) : (
                <article className="space-y-6 text-left text-justify leading-relaxed text-gray-700">
                  <p>Bu yazının içeriği henüz eklenmemiş.</p>
                </article>
              )}

              {data.faqs && data.faqs.length > 0 ? (
                <section className="mt-10 text-left" aria-labelledby="onizleme-sss">
                  <h2
                    id="onizleme-sss"
                    className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
                  >
                    Sıkça Sorulan Sorular
                  </h2>
                  <div className="mt-6">
                    <AccordionFAQ items={data.faqs} idPrefix="onizleme-faq" />
                  </div>
                </section>
              ) : null}
            </div>

            <aside
              className="mt-10 min-w-0 shrink-0 self-start lg:mt-12 lg:sticky lg:top-20"
              aria-label="Sanal ofis tanıtımı"
            >
              <BlogSidebar />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
