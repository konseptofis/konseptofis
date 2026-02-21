const ACCENT = "#0b7041";

export default function SolutionsEasyCalcSection() {
  return (
    <section
      id="cozumlerimiz"
      aria-labelledby="solutions-heading"
      className="bg-[#FFFFFF] px-4 py-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <h2
            id="solutions-heading"
            className="flex items-center gap-3 text-left tracking-tight text-black"
          >
            <span className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12" aria-hidden />
            <span className="flex flex-col">
              <span>Hazır Ofis ve Sanal Ofis Çözümleri;</span>
              <span className="mt-1">Tek Fatura, Kolay Hesap</span>
            </span>
          </h2>
        </header>

        <div className="mb-6" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="leading-relaxed text-gray-600">
              Genel giderlerin tek faturaya dahil olduğu Hazır Ofis ve Sanal Ofis
              paketleri sayesinde yıllık giderlerinizi kolaylıkla hesaplayabilir ve
              tüm gizli maliyetlerden kurtulabilirsiniz. Ofis maliyetlerinizi
              azaltırken, başarınızı arttırabilirsiniz. Tercihiniz Hazır Ofis mi
              yoksa Sanal Ofis mi? Size en uygun ofis seçeneğini seçip Konsept Ofis
              farkı ile yeni ofisinizde çalışmaya hemen bugün başlayabilirsiniz.
            </p>
          </div>

          <div className="relative h-[300px] w-[500px] max-w-full shrink-0 overflow-hidden rounded-xl bg-[#f2f2f2]">
            <img
              src="/assets/illustration.png"
              alt="Konsept Ofis Tek Fatura Çözümü"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
