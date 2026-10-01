import { SITE } from "@/app/lib/data";

export const INDEXNOW_KEY = "a8c3e7f1b94d2c6e0f5a1b8d3e7c9a24";

const ORIGIN = SITE.domain.replace(/\/$/, "");

export const INDEXNOW_DEFAULT_URLS = [
  `${ORIGIN}/`,
  `${ORIGIN}/hizmetlerimiz/cankaya-sanal-ofis`,
  `${ORIGIN}/fiyatlar`,
  `${ORIGIN}/sik-sorulan-sorular`,
  `${ORIGIN}/iletisim`,
] as const;

export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; status: number; body: string }> {
  const host = new URL(ORIGIN).host;
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}
