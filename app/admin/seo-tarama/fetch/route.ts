import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/app/lib/data";
import { parseHtml, parseSitemapUrls, type CrawlPageResult } from "@/app/lib/seo-crawl";

export const dynamic = "force-dynamic";

const ORIGIN = new URL(SITE.domain);
const ALLOWED_HOSTS = new Set([ORIGIN.host, `www.${ORIGIN.host}`]);
const USER_AGENT = "KonseptOfis-SEO-Tarayici/1.0 (+admin)";
const TIMEOUT_MS = 15_000;
const MAX_HTML_BYTES = 3_000_000;

function allowedUrl(raw: unknown): URL | null {
  if (typeof raw !== "string") return null;
  try {
    const u = new URL(raw, ORIGIN);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return ALLOWED_HOSTS.has(u.host) ? u : null;
  } catch {
    return null;
  }
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function GET() {
  if (!(await requireUser())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const sitemapUrl = new URL("/sitemap.xml", ORIGIN).toString();
  try {
    const res = await fetch(sitemapUrl, {
      headers: { "user-agent": USER_AGENT },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return NextResponse.json({ origin: ORIGIN.origin, urls: [], error: `sitemap ${res.status}` });
    const urls = parseSitemapUrls(await res.text()).filter((u) => allowedUrl(u));
    return NextResponse.json({ origin: ORIGIN.origin, urls });
  } catch (e) {
    return NextResponse.json({ origin: ORIGIN.origin, urls: [], error: String(e) });
  }
}

export async function POST(request: Request) {
  if (!(await requireUser())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { url?: unknown };
  const target = allowedUrl(body.url);
  if (!target) return NextResponse.json({ error: "Yalnızca site içi adresler taranabilir" }, { status: 400 });

  const started = Date.now();
  const result: CrawlPageResult = { url: target.toString(), status: 0, noindex: false, links: [], ms: 0 };

  try {
    const res = await fetch(target, {
      redirect: "manual",
      headers: { "user-agent": USER_AGENT, accept: "text/html,*/*;q=0.8" },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    result.status = res.status;
    result.contentType = res.headers.get("content-type") ?? undefined;

    const location = res.headers.get("location");
    if (location) result.location = new URL(location, target).toString();

    if (res.status >= 200 && res.status < 300 && result.contentType?.includes("text/html")) {
      const html = (await res.text()).slice(0, MAX_HTML_BYTES);
      Object.assign(result, parseHtml(html, target.toString()));
    } else {
      await res.body?.cancel();
    }
  } catch (e) {
    result.error = e instanceof Error ? e.message : String(e);
  }

  result.ms = Date.now() - started;
  return NextResponse.json(result);
}
