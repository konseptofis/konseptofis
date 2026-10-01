import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { INDEXNOW_DEFAULT_URLS, submitIndexNow } from "@/app/lib/indexnow";

export const runtime = "nodejs";

function authorizeIndexNow(request: Request): boolean {
  const expected = process.env.INDEXNOW_SECRET ?? "";
  const provided = request.headers.get("x-indexnow-secret") ?? "";
  if (!expected || !provided) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(provided);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Deploy veya içerik değişince IndexNow ping.
 * Yalnızca POST; `x-indexnow-secret` header INDEXNOW_SECRET ile eşleşmeli.
 * İsteğe bağlı JSON: { "urlList": ["https://konseptofis.com/"] }
 */
export async function POST(request: Request) {
  if (!authorizeIndexNow(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let urls: string[] = [...INDEXNOW_DEFAULT_URLS];
  try {
    const json = (await request.json()) as { urlList?: unknown };
    if (Array.isArray(json?.urlList) && json.urlList.every((u) => typeof u === "string")) {
      urls = json.urlList as string[];
    }
  } catch {
    // gövde yoksa varsayılan URL listesi
  }

  const result = await submitIndexNow(urls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
