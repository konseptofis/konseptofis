"use client";

import { useMemo, useRef, useState } from "react";
import { Download, Play, Square } from "lucide-react";
import type { CrawlPageResult } from "@/app/lib/seo-crawl";

type ScanResult = {
  origin: string;
  sitemap: string[];
  pages: CrawlPageResult[];
  finishedAt: string;
  complete: boolean;
};

type Edge = {
  source: string;
  target: string;
  anchor: string;
  nofollow: boolean;
  template: boolean;
};

type Tab = "hatalar" | "yonlendirmeler" | "linkler" | "anchorlar" | "sayfalar";

const STORAGE_KEY = "konseptofis-seo-tarama-v1";
const ENDPOINT = "/admin/seo-tarama/fetch";

const SPEEDS = [
  { ms: 2000, label: "Çok yavaş (2 sn arayla)" },
  { ms: 1000, label: "Yavaş (1 sn arayla)" },
  { ms: 500, label: "Normal (0,5 sn arayla)" },
] as const;

const LIMITS = [100, 300, 1000] as const;

const GENERIC_ANCHOR =
  /^(tıkla|tıklayın|tıklayınız|buraya|buraya tıklayın|devamı|devamını oku|devamını okuyun|detay|detaylar|detaylı bilgi.*|detayları gör|incele|tümünü gör|daha fazla|daha fazla bilgi|bilgi al|link|bağlantı|git|→)$/i;

const TABS: { id: Tab; label: string }[] = [
  { id: "hatalar", label: "4xx / 5xx" },
  { id: "yonlendirmeler", label: "Yönlendirmeler" },
  { id: "linkler", label: "İç link ağı" },
  { id: "anchorlar", label: "Anchor dağılımı" },
  { id: "sayfalar", label: "Sayfa kontrolleri" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isInternal(url: string, origin: string): boolean {
  try {
    const u = new URL(url);
    const o = new URL(origin);
    return u.host === o.host || u.host === `www.${o.host}`;
  } catch {
    return false;
  }
}

function shortUrl(url: string, origin: string): string {
  if (!isInternal(url, origin)) return url;
  const u = new URL(url);
  return `${u.pathname}${u.search}`;
}

function isHtmlOk(p: CrawlPageResult): boolean {
  return p.status >= 200 && p.status < 300 && Boolean(p.contentType?.includes("text/html"));
}

function statusClass(status: number): string {
  if (status >= 200 && status < 300) return "bg-green-50 text-green-700";
  if (status >= 300 && status < 400) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

function StatusBadge({ status }: { status: number }) {
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-semibold ${statusClass(status)}`}>
      {status || "hata"}
    </span>
  );
}

function analyze(result: ScanResult, excludeTemplate: boolean) {
  const { origin, pages, sitemap } = result;
  const byUrl = new Map(pages.map((p) => [p.url, p]));
  const htmlPages = pages.filter(isHtmlOk);

  const rawEdges: Omit<Edge, "template">[] = [];
  let externalLinks = 0;
  for (const p of htmlPages) {
    for (const l of p.links) {
      if (isInternal(l.href, origin)) {
        rawEdges.push({ source: p.url, target: l.href, anchor: l.anchor, nofollow: l.nofollow });
      } else {
        externalLinks += 1;
      }
    }
  }

  const pairSources = new Map<string, Set<string>>();
  for (const e of rawEdges) {
    const key = `${e.target}\u0000${e.anchor}`;
    if (!pairSources.has(key)) pairSources.set(key, new Set());
    pairSources.get(key)!.add(e.source);
  }
  const threshold = Math.max(5, Math.ceil(htmlPages.length * 0.8));
  const edges: Edge[] = rawEdges.map((e) => ({
    ...e,
    template: htmlPages.length >= 5 && pairSources.get(`${e.target}\u0000${e.anchor}`)!.size >= threshold,
  }));
  const counted = excludeTemplate ? edges.filter((e) => !e.template) : edges;

  const inboundAll = new Map<string, Edge[]>();
  for (const e of edges) {
    if (!inboundAll.has(e.target)) inboundAll.set(e.target, []);
    inboundAll.get(e.target)!.push(e);
  }

  const errors = pages
    .filter((p) => p.status === 0 || p.status >= 400)
    .map((p) => ({ page: p, inbound: inboundAll.get(p.url) ?? [] }))
    .sort((a, b) => b.inbound.length - a.inbound.length);

  const redirects = pages
    .filter((p) => p.status >= 300 && p.status < 400)
    .map((p) => ({ page: p, inbound: inboundAll.get(p.url) ?? [] }))
    .sort((a, b) => b.inbound.length - a.inbound.length);

  const sitemapSet = new Set(sitemap);
  const network = htmlPages
    .map((p) => {
      const inbound = counted.filter((e) => e.target === p.url && e.source !== p.url);
      const sources = new Set(inbound.map((e) => e.source));
      const outbound = new Set(counted.filter((e) => e.source === p.url).map((e) => e.target));
      return { page: p, inbound, sources, outbound, inSitemap: sitemapSet.has(p.url) };
    })
    .sort((a, b) => a.sources.size - b.sources.size);

  const orphans = sitemap.filter(
    (u) => !(inboundAll.get(u) ?? []).some((e) => e.source !== u),
  );

  const anchorsByTarget = new Map<string, Map<string, number>>();
  const targetsByAnchor = new Map<string, Set<string>>();
  let genericCount = 0;
  let emptyCount = 0;
  for (const e of counted) {
    if (!anchorsByTarget.has(e.target)) anchorsByTarget.set(e.target, new Map());
    const m = anchorsByTarget.get(e.target)!;
    m.set(e.anchor, (m.get(e.anchor) ?? 0) + 1);
    const key = e.anchor.toLocaleLowerCase("tr-TR");
    if (key) {
      if (!targetsByAnchor.has(key)) targetsByAnchor.set(key, new Set());
      targetsByAnchor.get(key)!.add(e.target);
    }
    if (!e.anchor || e.anchor === "[görsel, alt yok]") emptyCount += 1;
    else if (GENERIC_ANCHOR.test(e.anchor)) genericCount += 1;
  }
  const anchorTargets = [...anchorsByTarget.entries()]
    .map(([target, m]) => ({
      target,
      total: [...m.values()].reduce((a, b) => a + b, 0),
      anchors: [...m.entries()].sort((a, b) => b[1] - a[1]),
    }))
    .sort((a, b) => b.total - a.total);
  const sharedAnchors = [...targetsByAnchor.entries()]
    .filter(([anchor, targets]) => targets.size > 1 && !GENERIC_ANCHOR.test(anchor))
    .map(([anchor, targets]) => ({ anchor, targets: [...targets] }))
    .sort((a, b) => b.targets.length - a.targets.length);

  const pageChecks = htmlPages
    .map((p) => {
      const issues: string[] = [];
      if (p.noindex) issues.push("noindex");
      if (!p.title) issues.push("title yok");
      if (!p.canonical) issues.push("canonical yok");
      else if (p.canonical !== p.url) issues.push(`canonical farklı: ${shortUrl(p.canonical, origin)}`);
      return { page: p, issues };
    })
    .filter((x) => x.issues.length > 0);

  const sitemapProblems = sitemap
    .map((u) => byUrl.get(u))
    .filter((p): p is CrawlPageResult => Boolean(p) && !isHtmlOk(p!));

  const linksToRedirects = redirects.reduce((n, r) => n + r.inbound.length, 0);
  const linksToErrors = errors.reduce((n, r) => n + r.inbound.length, 0);
  const nofollowInternal = edges.filter((e) => e.nofollow).length;

  return {
    edges,
    htmlPages,
    errors,
    redirects,
    network,
    orphans,
    anchorTargets,
    sharedAnchors,
    pageChecks,
    sitemapProblems,
    stats: {
      pages: pages.length,
      html: htmlPages.length,
      internalLinks: edges.length,
      templateLinks: edges.filter((e) => e.template).length,
      externalLinks,
      linksToRedirects,
      linksToErrors,
      genericCount,
      emptyCount,
      nofollowInternal,
    },
  };
}

function loadSaved(): ScanResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScanResult) : null;
  } catch {
    return null;
  }
}

function exportCsv(result: ScanResult, edges: Edge[]) {
  const byUrl = new Map(result.pages.map((p) => [p.url, p]));
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = [
    ["kaynak", "hedef", "anchor", "hedef_durum", "nofollow", "menu_footer"].join(";"),
    ...edges.map((e) =>
      [
        esc(e.source),
        esc(e.target),
        esc(e.anchor),
        String(byUrl.get(e.target)?.status ?? ""),
        e.nofollow ? "evet" : "",
        e.template ? "evet" : "",
      ].join(";"),
    ),
  ];
  const blob = new Blob([`\uFEFF${rows.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `seo-tarama-ic-linkler-${result.finishedAt.slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function SourceList({ edges, origin }: { edges: Edge[]; origin: string }) {
  if (edges.length === 0) return <p className="text-xs text-gray-500">Bu adrese site içinden link yok.</p>;
  return (
    <ul className="mt-2 space-y-1">
      {edges.slice(0, 100).map((e, i) => (
        <li key={`${e.source}-${i}`} className="text-xs text-gray-600">
          <span className="font-medium text-gray-800">{shortUrl(e.source, origin)}</span>
          {" → "}
          <span className="italic">“{e.anchor || "anchor yok"}”</span>
          {e.template ? <span className="ml-1 text-gray-400">(menü/footer)</span> : null}
        </li>
      ))}
      {edges.length > 100 ? <li className="text-xs text-gray-400">… {edges.length - 100} link daha</li> : null}
    </ul>
  );
}

function StatCard({ label, value, tone = "default" }: { label: string; value: number | string; tone?: "default" | "warn" | "bad" }) {
  const color = tone === "bad" ? "text-red-700" : tone === "warn" ? "text-amber-700" : "text-gray-900";
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}

export default function SeoCrawler() {
  const [speed, setSpeed] = useState<number>(SPEEDS[1].ms);
  const [limit, setLimit] = useState<number>(LIMITS[1]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, queued: 0, current: "" });
  const [result, setResult] = useState<ScanResult | null>(loadSaved);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("hatalar");
  const [excludeTemplate, setExcludeTemplate] = useState(true);
  const [filter, setFilter] = useState("");
  const stopRef = useRef(false);

  const analysis = useMemo(() => (result ? analyze(result, excludeTemplate) : null), [result, excludeTemplate]);

  async function start() {
    stopRef.current = false;
    setError("");
    setRunning(true);

    const seeds = await fetch(ENDPOINT).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    if (!seeds?.origin) {
      setError("Tarama başlatılamadı. Oturumunuz kapanmış olabilir; sayfayı yenileyip tekrar deneyin.");
      setRunning(false);
      return;
    }
    const origin: string = seeds.origin;
    const sitemap: string[] = seeds.urls ?? [];
    const queue: string[] = [new URL("/", origin).toString(), ...sitemap];
    const seen = new Set<string>();
    const pages = new Map<string, CrawlPageResult>();

    const snapshot = (complete: boolean): ScanResult => ({
      origin,
      sitemap,
      pages: [...pages.values()],
      finishedAt: new Date().toISOString(),
      complete,
    });

    while (queue.length > 0 && !stopRef.current && pages.size < limit) {
      const url = queue.shift()!;
      if (seen.has(url)) continue;
      seen.add(url);
      setProgress({ done: pages.size, queued: new Set(queue.filter((u) => !seen.has(u))).size, current: shortUrl(url, origin) });

      let page: CrawlPageResult;
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (res.status === 401) {
          setError("Oturum süresi doldu; tarama durduruldu.");
          break;
        }
        page = (await res.json()) as CrawlPageResult;
      } catch (e) {
        page = { url, status: 0, noindex: false, links: [], error: String(e), ms: 0 };
      }
      page.url = url;
      pages.set(url, page);

      const next = [...(page.location ? [page.location] : []), ...page.links.map((l) => l.href)];
      for (const u of next) if (isInternal(u, origin) && !seen.has(u)) queue.push(u);

      if (pages.size % 5 === 0) setResult(snapshot(false));
      await sleep(speed);
    }

    const pending = queue.some((u) => !seen.has(u));
    const final = snapshot(!pending && !stopRef.current);
    setResult(final);
    setProgress({ done: pages.size, queued: 0, current: "" });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(final));
    } catch {
      setError("Sonuç tarayıcıda saklanamadı (çok büyük); ekranda görüntüleniyor.");
    }
    setRunning(false);
  }

  const origin = result?.origin ?? "";
  const q = filter.trim().toLocaleLowerCase("tr-TR");
  const match = (...values: (string | undefined)[]) =>
    !q || values.some((v) => v?.toLocaleLowerCase("tr-TR").includes(q));

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-end gap-4">
          <label className="text-sm text-gray-700">
            Hız
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={running}
              className="mt-1 block rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              {SPEEDS.map((s) => (
                <option key={s.ms} value={s.ms}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-gray-700">
            En fazla sayfa
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              disabled={running}
              className="mt-1 block rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              {LIMITS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          {running ? (
            <button
              type="button"
              onClick={() => {
                stopRef.current = true;
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
            >
              <Square className="h-4 w-4" />
              Durdur
            </button>
          ) : (
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0b7041] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#095530]"
            >
              <Play className="h-4 w-4" />
              Taramayı başlat
            </button>
          )}
          {result && analysis && !running ? (
            <button
              type="button"
              onClick={() => exportCsv(result, analysis.edges)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              İç linkleri CSV indir
            </button>
          ) : null}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {running
            ? `${progress.done} sayfa tarandı · kuyrukta ${progress.queued} · şu an: ${progress.current}`
            : result
              ? `Son tarama: ${new Date(result.finishedAt).toLocaleString("tr-TR")} · ${result.pages.length} adres${
                  result.complete ? "" : " (tarama tamamlanmadı: durduruldu ya da sayfa sınırına ulaşıldı)"
                }`
              : "Henüz tarama yapılmadı. Sayfalar tek tek ve aralarında beklenerek istenir; site yorulmaz."}
        </p>
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      </div>

      {result && analysis ? (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
            <StatCard label="Taranan adres" value={analysis.stats.pages} />
            <StatCard label="4xx / 5xx adres" value={analysis.errors.length} tone={analysis.errors.length ? "bad" : "default"} />
            <StatCard label="4xx/5xx'e giden iç link" value={analysis.stats.linksToErrors} tone={analysis.stats.linksToErrors ? "bad" : "default"} />
            <StatCard label="Yönlendirmeye giden iç link" value={analysis.stats.linksToRedirects} tone={analysis.stats.linksToRedirects ? "warn" : "default"} />
            <StatCard label="Yetim sayfa (sitemap)" value={analysis.orphans.length} tone={analysis.orphans.length ? "warn" : "default"} />
            <StatCard label="Genel / boş anchor" value={analysis.stats.genericCount + analysis.stats.emptyCount} tone={analysis.stats.genericCount + analysis.stats.emptyCount ? "warn" : "default"} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 p-3">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    tab === t.id ? "bg-[#0b7041] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <div className="ml-auto flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={excludeTemplate}
                    onChange={(e) => setExcludeTemplate(e.target.checked)}
                  />
                  Menü/footer linklerini sayma
                </label>
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="URL veya anchor ara"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                />
              </div>
            </div>

            <div className="p-4">
              {tab === "hatalar" ? (
                analysis.errors.length === 0 ? (
                  <p className="text-sm text-gray-600">4xx/5xx dönen site içi adres bulunmadı.</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {analysis.errors
                      .filter((r) => match(r.page.url))
                      .map((r) => (
                        <li key={r.page.url} className="py-3">
                          <details>
                            <summary className="cursor-pointer text-sm">
                              <StatusBadge status={r.page.status} />{" "}
                              <span className="font-medium text-gray-900">{shortUrl(r.page.url, origin)}</span>
                              <span className="text-gray-500"> · {r.inbound.length} iç link</span>
                              {r.page.error ? <span className="text-red-600"> · {r.page.error}</span> : null}
                            </summary>
                            <SourceList edges={r.inbound} origin={origin} />
                          </details>
                        </li>
                      ))}
                  </ul>
                )
              ) : null}

              {tab === "yonlendirmeler" ? (
                analysis.redirects.length === 0 ? (
                  <p className="text-sm text-gray-600">Yönlendirme dönen site içi adres bulunmadı.</p>
                ) : (
                  <>
                    <p className="mb-3 text-xs text-gray-500">
                      Site içi linkler doğrudan son adrese gitmeli; yönlendirmeye giden linkleri hedef adresle
                      değiştirin.
                    </p>
                    <ul className="divide-y divide-gray-100">
                      {analysis.redirects
                        .filter((r) => match(r.page.url, r.page.location))
                        .map((r) => (
                          <li key={r.page.url} className="py-3">
                            <details>
                              <summary className="cursor-pointer text-sm">
                                <StatusBadge status={r.page.status} />{" "}
                                <span className="font-medium text-gray-900">{shortUrl(r.page.url, origin)}</span>
                                {" → "}
                                <span className="text-gray-700">{r.page.location ? shortUrl(r.page.location, origin) : "?"}</span>
                                <span className="text-gray-500"> · {r.inbound.length} iç link</span>
                              </summary>
                              <SourceList edges={r.inbound} origin={origin} />
                            </details>
                          </li>
                        ))}
                    </ul>
                  </>
                )
              ) : null}

              {tab === "linkler" ? (
                <>
                  {analysis.orphans.length > 0 ? (
                    <div className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                      <p className="font-medium">Yetim sayfalar (sitemap&apos;te var, site içinden link almıyor):</p>
                      <ul className="mt-1 list-disc pl-5">
                        {analysis.orphans.map((u) => (
                          <li key={u}>{shortUrl(u, origin)}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <p className="mb-3 text-xs text-gray-500">
                    En az link alan sayfalar üstte. &quot;Gelen&quot; = bu sayfaya link veren farklı sayfa sayısı.
                    {excludeTemplate ? " Menü/footer linkleri sayılmıyor." : ""}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-gray-200 text-xs text-gray-500">
                        <tr>
                          <th className="py-2 pr-3 font-medium">Sayfa</th>
                          <th className="py-2 pr-3 font-medium">Gelen</th>
                          <th className="py-2 pr-3 font-medium">Giden (iç)</th>
                          <th className="py-2 pr-3 font-medium">Sitemap</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {analysis.network
                          .filter((n) => match(n.page.url, n.page.title))
                          .map((n) => (
                            <tr key={n.page.url} className="align-top">
                              <td className="py-2 pr-3">
                                <details>
                                  <summary className="cursor-pointer">
                                    <span className="font-medium text-gray-900">{shortUrl(n.page.url, origin)}</span>
                                    {n.page.title ? <span className="block text-xs text-gray-500">{n.page.title}</span> : null}
                                  </summary>
                                  <SourceList edges={n.inbound} origin={origin} />
                                </details>
                              </td>
                              <td className={`py-2 pr-3 font-semibold ${n.sources.size === 0 ? "text-red-700" : n.sources.size < 3 ? "text-amber-700" : "text-gray-900"}`}>
                                {n.sources.size}
                              </td>
                              <td className="py-2 pr-3 text-gray-700">{n.outbound.size}</td>
                              <td className="py-2 pr-3 text-gray-700">{n.inSitemap ? "evet" : "—"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}

              {tab === "anchorlar" ? (
                <>
                  <p className="mb-3 text-xs text-gray-500">
                    Her hedef sayfaya hangi anchor metinleriyle link verildiği. Turuncu: genel anchor
                    (&quot;detaylar&quot;, &quot;tıklayın&quot; vb.), kırmızı: boş anchor.
                  </p>
                  {analysis.sharedAnchors.length > 0 ? (
                    <details className="mb-4 rounded-lg bg-gray-50 p-3 text-sm">
                      <summary className="cursor-pointer font-medium text-gray-800">
                        Aynı anchor farklı sayfalara gidiyor ({analysis.sharedAnchors.length})
                      </summary>
                      <ul className="mt-2 space-y-1">
                        {analysis.sharedAnchors
                          .filter((s) => match(s.anchor, ...s.targets))
                          .map((s) => (
                            <li key={s.anchor} className="text-xs text-gray-700">
                              <span className="font-medium">“{s.anchor}”</span> →{" "}
                              {s.targets.map((t) => shortUrl(t, origin)).join(", ")}
                            </li>
                          ))}
                      </ul>
                    </details>
                  ) : null}
                  <ul className="divide-y divide-gray-100">
                    {analysis.anchorTargets
                      .filter((t) => match(t.target, ...t.anchors.map(([a]) => a)))
                      .map((t) => (
                        <li key={t.target} className="py-3">
                          <details>
                            <summary className="cursor-pointer text-sm">
                              <span className="font-medium text-gray-900">{shortUrl(t.target, origin)}</span>
                              <span className="text-gray-500">
                                {" "}
                                · {t.total} link · {t.anchors.length} farklı anchor
                              </span>
                            </summary>
                            <ul className="mt-2 flex flex-wrap gap-1.5">
                              {t.anchors.map(([anchor, count]) => {
                                const empty = !anchor || anchor === "[görsel, alt yok]";
                                const generic = !empty && GENERIC_ANCHOR.test(anchor);
                                return (
                                  <li
                                    key={anchor}
                                    className={`rounded px-2 py-0.5 text-xs ${
                                      empty ? "bg-red-50 text-red-700" : generic ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {anchor || "anchor yok"} <span className="font-semibold">×{count}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </details>
                        </li>
                      ))}
                  </ul>
                </>
              ) : null}

              {tab === "sayfalar" ? (
                <>
                  {analysis.sitemapProblems.length > 0 ? (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                      <p className="font-medium">Sitemap&apos;te 200 dönmeyen adresler:</p>
                      <ul className="mt-1 list-disc pl-5">
                        {analysis.sitemapProblems.map((p) => (
                          <li key={p.url}>
                            {shortUrl(p.url, origin)} — {p.status || "hata"}
                            {p.location ? ` → ${shortUrl(p.location, origin)}` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {analysis.pageChecks.length === 0 ? (
                    <p className="text-sm text-gray-600">Title, canonical ve noindex kontrollerinde sorun bulunmadı.</p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {analysis.pageChecks
                        .filter((c) => match(c.page.url, c.page.title))
                        .map((c) => (
                          <li key={c.page.url} className="py-2 text-sm">
                            <span className="font-medium text-gray-900">{shortUrl(c.page.url, origin)}</span>
                            <span className="text-amber-700"> · {c.issues.join(" · ")}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                  <p className="mt-4 text-xs text-gray-500">
                    İç link: {analysis.stats.internalLinks} (menü/footer: {analysis.stats.templateLinks}) · dış link:{" "}
                    {analysis.stats.externalLinks} · nofollow iç link: {analysis.stats.nofollowInternal}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
