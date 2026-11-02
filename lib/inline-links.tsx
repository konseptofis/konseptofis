import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Metin içi link sözdizimi: `[görünen metin](/ic-yol)` veya `[görünen metin](https://...)`.
 * Dış linkler yeni sekmede ve `nofollow` ile açılır.
 */
const INLINE_LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g;

const INLINE_LINK_CLASSNAME =
  "font-medium text-[var(--color-green)] underline underline-offset-2 hover:no-underline";

/** SSS cevabı gibi düz metinlerdeki link kalıplarını iç yolda Next `Link`'e, dışta `<a>`'ya çevirir. */
export function renderInlineLinks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK_RE)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, label, href] = match;
    parts.push(
      href.startsWith("/") ? (
        <Link key={index} href={href} className={INLINE_LINK_CLASSNAME}>
          {label}
        </Link>
      ) : (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={INLINE_LINK_CLASSNAME}
        >
          {label}
        </a>
      ),
    );
    last = index + match[0].length;
  }
  if (parts.length === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** JSON-LD ve meta gibi düz metin alanları için link sözdizimini kaldırır. */
export function stripInlineLinks(text: string): string {
  return text.replace(INLINE_LINK_RE, "$1");
}
