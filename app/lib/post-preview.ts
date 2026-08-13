/** Admin "Önizle" ile blog detay önizlemesi arasında taşınan veri (sessionStorage). */
export const POST_PREVIEW_STORAGE_KEY = "konsept_post_preview";

export type PostPreviewData = {
  title: string;
  content: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  category: string | null;
  faqs: { question: string; answer: string }[];
  reviewer: { name: string; slug: string; job_title: string | null } | null;
  reviewed_at: string | null;
  created_at: string;
};

/** `/[slug]` blog detay içerik kabı ile birebir aynı prose sınıfları (tek kaynak). */
export const BLOG_ARTICLE_PROSE_CLASSNAME =
  "prose prose-gray max-w-none break-words text-justify leading-relaxed prose-headings:text-left prose-headings:font-semibold prose-p:text-justify prose-blockquote:text-justify prose-td:text-justify prose-li:text-left prose-a:text-[#0b7041] prose-img:rounded-lg [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_.tableWrapper]:my-6 [&_.tableWrapper]:w-full [&_.tableWrapper]:overflow-x-auto [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:align-top [&_th]:min-w-[6rem] [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2 [&_td]:align-top [&_td]:min-w-[6rem] [&_pre]:overflow-x-auto [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:list-item [&_li]:my-0.5 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:mt-5 [&_h4]:mb-2.5 [&>:first-child]:mt-0";
