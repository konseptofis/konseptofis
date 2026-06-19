import Link from "next/link";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { getCategories } from "@/app/actions/categories";

type Props = { className?: string };

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border-[0.5px] border-[var(--color-border-tertiary)] bg-white shadow-none"
      style={{ boxShadow: "none" }}
    >
      {children}
    </div>
  );
}

function ProductPromoCard() {
  const features = [
    "Vergi levhası ve ticaret sicili adresi",
    "Kargo ve posta kabulü",
    "Stopajsız, aidatsız, gizli maliyet yok",
  ];

  return (
    <CardShell>
      <div className="px-[22px] py-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.09em] text-[var(--color-green)]">
          Konsept Ofis
        </p>
        <h2 className="mb-1.5 mt-1 text-[15px] font-medium leading-[1.35] text-[var(--color-text-primary)]">
          Fiziksel ofis olmadan şirketinize yasal adres edinin
        </h2>
        <p className="m-0 mb-5 border-b border-[var(--color-border-tertiary)] pb-5 text-[12px] leading-[1.55] text-[var(--color-text-muted)] [border-bottom-width:0.5px]">
          Ankara Çankaya&apos;da prestijli iş adresi
        </p>

        <p className="mb-[18px] m-0 text-[13px] leading-[1.7] text-[var(--color-text-primary)]">
          Sanal ofis; kira ödemeden şirketinizi kurmanızı ve büyütmenizi sağlayan yasal iş
          adresi hizmetidir.
        </p>
        <ul className="mb-5 flex flex-col gap-[9px]">
          {features.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <CheckIcon
                className="mt-0.5 h-[13px] w-[13px] shrink-0 text-[var(--color-green)]"
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                {line}
              </span>
            </li>
          ))}
        </ul>
        <div
          className="flex items-center justify-between border-t border-[var(--color-border-tertiary)] pt-4"
          style={{ borderTopWidth: "0.5px" }}
        >
          <div>
            <p className="m-0 text-[11px] text-[var(--color-text-muted)]">
              Aylık başlangıç
            </p>
            <p className="m-0 text-[17px] font-medium text-[var(--color-text-primary)]">
              299 TL
            </p>
          </div>
          <Link
            href="/hizmetler/cankaya-sanal-ofis"
            className="inline-flex items-center gap-0.5 rounded-lg bg-[var(--color-green)] px-4 py-[10px] text-[12.5px] font-medium text-white transition-colors hover:bg-[#095530] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]"
          >
            İncele
            <ChevronRightIcon className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </CardShell>
  );
}

function CategoryListCard({
  categories,
}: {
  categories: { name: string; slug: string }[];
}) {
  return (
    <CardShell>
      <div className="px-[22px] py-5">
        <h2 className="m-0 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-text-muted)]">
          Kategoriler
        </h2>
        <ul className="mt-3 flex flex-col gap-1.5">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/kategori/${cat.slug}`}
                className="block rounded-md px-1 py-1 text-[13px] leading-snug text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-green)]"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </CardShell>
  );
}

/** Blog detay sağ sütun: sanal ofis tanıtım kartı + kategori listesi */
export default async function BlogSidebar({ className = "" }: Props) {
  let categories: { name: string; slug: string }[] = [];
  try {
    categories = await getCategories();
  } catch {
    // Supabase yoksa vb.
  }

  return (
    <div className={`flex flex-col gap-5 ${className}`.trim()}>
      <ProductPromoCard />
      {categories.length > 0 ? <CategoryListCard categories={categories} /> : null}
    </div>
  );
}
