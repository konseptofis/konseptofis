"use client";

import dynamic from "next/dynamic";

const SeoCrawler = dynamic(() => import("./SeoCrawler"), {
  ssr: false,
  loading: () => <p className="text-sm text-gray-500">Yükleniyor…</p>,
});

export default SeoCrawler;
