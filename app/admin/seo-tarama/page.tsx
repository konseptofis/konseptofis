import SeoCrawler from "./SeoCrawlerClient";

export default function AdminSeoTaramaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">SEO Tarama</h1>
        <p className="mt-1 text-sm text-gray-600">
          Siteyi sayfa sayfa, aralarında bekleyerek tarar: iç link ağı, anchor dağılımı, 4xx/5xx
          hataları ve yönlendirmeler. Sonuçlar yalnızca bu tarayıcıda saklanır.
        </p>
      </div>
      <SeoCrawler />
    </div>
  );
}
