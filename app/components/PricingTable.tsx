import { CheckIcon } from "@heroicons/react/24/outline";

const plans = [
  {
    name: "Sanal Ofis",
    price: "800",
    unit: "ay",
    kdv: "+ KDV",
    features: ["Yasal iş adresi", "Vergi levhası adresi", "Posta kabulü", "Aidat yok"],
  },
  {
    name: "Toplantı Odası",
    price: "300",
    unit: "saat",
    kdv: "+ KDV",
    features: ["Saatlik kiralama", "Rezervasyon", "Gizli maliyet yok", "Esnek kullanım"],
  },
];

export default function PricingTable() {
  return (
    <section
      id="fiyatlar"
      aria-labelledby="pricing-heading"
      className="bg-[#f2f2f2] px-4 py-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="pricing-heading" className="mb-2 flex items-center gap-3 text-left tracking-tight text-black">
          <span className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8" aria-hidden />
          Şeffaf Fiyatlandırma
        </h2>
        <p className="text-gray-600 mb-10">
          Gizli maliyet yok, aidat yok. Net fiyatlar ile Ankara sanal ofis ve toplantı
          odası hizmetleri.
        </p>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl border border-[#f2f2f2] bg-white p-6 shadow-sm"
            >
              <h3 className="text-[#0b7041]">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#0b7041]">{plan.price}₺</span>
                <span className="text-gray-500">/ {plan.unit}</span>
                <span className="text-gray-500 text-sm">{plan.kdv}</span>
              </div>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckIcon className="h-4 w-4 text-[#0b7041] shrink-0" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
