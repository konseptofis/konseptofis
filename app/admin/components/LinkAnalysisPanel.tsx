"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { analyzeLinksFromHtml } from "@/app/lib/admin/link-analysis";

type Props = {
  html: string;
};

function LinkRow({
  anchor,
  target,
  badge,
  tone,
}: {
  anchor: string;
  target: string;
  badge?: string;
  tone: "internal" | "external";
}) {
  const anchorClass =
    tone === "internal" ? "text-[#0b7041]" : "text-gray-800";
  const targetClass = tone === "internal" ? "text-[#0b7041]/80" : "text-gray-500";

  return (
    <li className="text-sm leading-snug">
      <span className={`font-medium ${anchorClass}`}>{anchor}</span>
      <span className="text-gray-400"> → </span>
      <span className={`break-all ${targetClass}`}>{target}</span>
      {badge ? (
        <span className="ml-1.5 inline-flex rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-medium text-gray-600">
          {badge}
        </span>
      ) : null}
    </li>
  );
}

export default function LinkAnalysisPanel({ html }: Props) {
  const [open, setOpen] = useState(true);
  const analysis = useMemo(() => analyzeLinksFromHtml(html), [html]);

  const total = analysis.internal.length + analysis.external.length;

  return (
    <div className="mt-2 overflow-hidden rounded-[8px] border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50"
        aria-expanded={open}
      >
        <div>
          <p className="text-sm font-semibold text-gray-900">Link Analizi</p>
          <p className="mt-0.5 text-sm text-gray-600">
            🔗 {analysis.internal.length} iç link · {analysis.external.length} dış link ·{" "}
            {total} toplam
          </p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" aria-hidden />
        )}
      </button>

      {open ? (
        <div className="max-h-64 overflow-y-auto border-t border-gray-100 px-4 py-3">
          <section className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0b7041]">
              İç linkler ({analysis.internal.length})
            </h4>
            {analysis.internal.length === 0 ? (
              <p className="text-sm text-gray-500">İç link yok.</p>
            ) : (
              <ul className="space-y-1.5">
                {analysis.internal.map((link) => (
                  <LinkRow
                    key={link.id}
                    tone="internal"
                    anchor={link.anchor}
                    target={link.displayTarget}
                  />
                ))}
              </ul>
            )}
          </section>

          <section className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Dış linkler ({analysis.external.length})
            </h4>
            {analysis.external.length === 0 ? (
              <p className="text-sm text-gray-500">Dış link yok.</p>
            ) : (
              <ul className="space-y-1.5">
                {analysis.external.map((link) => (
                  <LinkRow
                    key={link.id}
                    tone="external"
                    anchor={link.anchor}
                    target={link.displayTarget}
                    badge={link.hasNofollow ? "nofollow" : "follow"}
                  />
                ))}
              </ul>
            )}
          </section>

          {analysis.warnings.length > 0 ? (
            <section className="space-y-2 border-t border-gray-100 pt-3">
              {analysis.warnings.map((warning, index) => (
                <p
                  key={`${warning.kind}-${index}`}
                  className={`text-sm leading-snug ${
                    warning.severity === "warning"
                      ? "rounded-md bg-amber-50 px-2.5 py-2 text-amber-900"
                      : "rounded-md bg-sky-50 px-2.5 py-2 text-sky-900"
                  }`}
                >
                  {warning.severity === "warning" ? "⚠️ " : "ℹ️ "}
                  {warning.message}
                </p>
              ))}
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
