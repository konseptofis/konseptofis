import PageHeader from "@/app/components/PageHeader";
import BreadcrumbListJsonLd from "@/app/components/seo/BreadcrumbListJsonLd";

export const metadata = {
  title: { absolute: "Kullanım Koşulları | Konsept Ofis" },
  description: "Konsept Ofis web sitesi kullanım koşulları ve ilgili yasal metinler.",
  alternates: { canonical: "/kullanim-kosullari" },
};

const sectionTitleClass =
  "mt-8 scroll-mt-24 text-[17px] font-semibold text-gray-900 sm:mt-10";

export default function KullanimKosullariPage() {
  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Kullanım Koşulları" },
        ]}
        pagePath="/kullanim-kosullari"
        id="ld-json-breadcrumb-kullanim-kosullari"
      />
      <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="Kullanım Koşulları"
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "Kullanım Koşulları" },
        ]}
      />

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-label="Kullanım koşulları metni"
      >
        <div className="mx-auto max-w-3xl">
          <div className="legal-doc space-y-4 text-[16px] leading-relaxed text-gray-600">
            <p>
              Siteye erişiminizden veya siteyi kullanımınızdan önce lütfen bu sözleşmeyi dikkatle
              okuyunuz. Siteye erişmekle veya siteyi kullanmakla, aşağıda belirtilen şartlar ve
              hükümlerle bağlı olmayı kabul etmektesiniz. Eğer bu şartlar ve hükümlerle bağlı olmak
              istemezseniz, siteye erişmeyebilir veya siteyi kullanmayabilirsiniz ve böyle bir
              kullanıma başladıysanız kullanımı derhal durdurmalısınız. &quot;konseptofis.com&quot; bu
              sözleşmede her zaman değişiklik yapabilir ve bu değişiklikler değiştirilmiş sözleşmenin
              siteye konulmasıyla derhal yürürlük kazanır. Siz bu değişikliklerden haberdar olmak
              amacıyla periyodik olarak sözleşmeyi gözden geçirmeyi kabul etmektesiniz ve siteye devam
              eden erişiminiz veya devam eden siteyi kullanımınız değiştirilmiş sözleşmeyi kesin
              olarak kabul ettiğiniz anlamına gelecektir.
            </p>

            <h2 className={sectionTitleClass}>
              Ticari markalar, fikri mülkiyet, telif hakları
            </h2>
            <p>
              konseptofis.com sitesinin tüm hakları Konsept Ofis Hizmetleri Şirketine aittir. Bu web
              sayfalarında yayımlanan içerikler (örneğin yazılım, ürünler, logolar, v.s. gibi ticari
              markalar, bilgiler, raporlar, resimler ve grafikler), ulusal ve uluslararası kanunlar ve
              uluslararası sözleşmeler ile korunmaktadır.
            </p>
            <p>
              Kullanıcı Website dahilinde bulunan ürünleri, bilgileri, her türlü veri tabanını,
              resimleri, metinleri, ikonları, görsel ve işitsel vesair imgeleri, video klipleri,
              dosyaları, web sitesi, software-codeların html kodu ve diğer kodlar vs. ile,
              tasarımları, katalogları ve listeleri kısmen ya da tamamen çoğaltamayacağı,
              kopyalamayacağı, dağıtmayacağı, işlemeyeceğini, online ya da diğer bir yöntem
              kullanılmak suretiyle göndermeyeceğini, gerek bu eylemleri ile gerekse de başka
              yollarla, Konsept Ofis ile doğrudan ve/veya dolaylı olarak rekabete girmeyeceğini kabul
              ve taahhüt etmektedir.
            </p>

            <p className="font-medium text-gray-800">Sitede yer alan her türlü bilgi ve materyal:</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                Sitenin tamamı ya da bir bölümü revize edilerek, ekleme yapılarak ya da bir kısmı
                değiştirilerek farklı bir biçimde kullanılamaz.
              </li>
              <li>
                Siteden alınabilecek her türlü bilgi (yazılı ya da görsel) rahatlıkla
                görülebilecek büyüklükte &quot;© 2025, konseptofis.com, Tüm Hakları Saklıdır&quot;
                ifadesi eklenmeden kullanılamaz.
              </li>
              <li>
                Sitede yer alan ifadeler içerisindeki 3. kişi ya da kurumlara ait tescilli marka,
                hizmet, logo vb. uyarılar ve ayraçlar, siteden alıntı yapıldığında kaldırılamaz.
              </li>
            </ul>

            <h2 className={sectionTitleClass}>Kullanım koşullarının değiştirilmesi</h2>
            <p>
              konseptofis.com&apos;un herhangi bir sebep göstermeksizin ve önce veya sonra ihbarda
              bulunmaksızın bu kullanım koşullarını değiştirme, ilavede bulunma veya yenileme hakkı
              saklıdır. Bu sayfalarda, mevcut ve güncellenmiş versiyon bulunmaktadır. Bu web
              sayfalarının kullanılması ile kullanıcı, mevcut versiyon ile sınırlandırılmış olduğunu
              kabul eder.
            </p>

            <h2 className={sectionTitleClass}>
              Üçüncü parti sitelere verilen bağlantılara (linklere) dair
            </h2>
            <p>
              konseptofis.com sitesinde direkt ya da dolaylı yoldan diğer sitelere bağlantı (link)
              verilebilir. Bu bağlantıların amacı bilgi vermek ya da reklamdır. Kullanıcı, site
              üzerindeki linklerin kaynakları üzerinde konseptofis.com&apos;un hiçbir kontrolü
              olmadığı için, konseptofis.com&apos;un linklerinin gösterdiği web sitelerinin veya
              kaynakların ulaşabilirliğinden sorumlu olmadığını ve bu web siteleri ve kaynaklar
              üzerinde bulunan veya bunlardan elde edilebilen hiçbir içerik, reklam, ürün veya diğer
              materyalden sorumlu olmadığını kabul eder. Kullanıcı ayrıca konseptofis.com&apos;un
              böyle herhangi bir web sitesi veya kaynak üzerinde veya bunlar yoluyla elde edilebilen
              herhangi bir içerik, mal veya hizmete güvenerek veya bunlar tarafından veya bunların
              kullanımı ile bağlantılı olarak neden olunan ya da neden olunduğu iddia edilen herhangi
              bir zarar veya kayıptan doğrudan veya dolaylı olarak sorumlu olmadığını kabul eder.
            </p>

            <h2 className={sectionTitleClass}>Kullanıcı bilgileri hakkında</h2>
            <p>
              konseptofis.com sitesinde; kullanıcıların dolduracakları talep ve rezervasyon
              formlarının yer aldığı bölümler yer almaktadır. Bu bölümlerin doldurulması esnasında
              kullanıcıların küfür, tehdit, tahrik, rahatsız edici sözleri ve kanuna aykırı içerikler
              kullanma ve başkalarının kanuni ve kişisel haklarına zarar verme hakları yoktur. Ayrıca bu
              formların kopyalanarak kullanılmaları veya yeniden üretilmek amacıyla örnek olarak
              kullanılmaları yasaktır. Kullanıcılarının bu sayfaları kullanarak bir ürün ya da hizmet
              satma, ticari amaçlı reklam yapma ve benzeri ticari davranışlarda bulunma hakları yoktur.
            </p>

            <h2 className={sectionTitleClass}>Hak ve sorumluluklar</h2>
            <p>
              konseptofis.com sitesine bulunan içerikler sürekli kontrol edilmekte ve
              güncellenmektedir. Ancak, konseptofis.com ve sahibi Konsept Ofis Hizmetleri site
              içeriğindeki bilgi ve fiyat hatalarından sorumlu tutulamaz, sayfalarında her türlü
              değişiklik ve yeniliği istediği anda yapabilir. Bu değişikliklerden dolayı doğabilecek
              hiçbir bilgi hatasından dolayı konseptofis.com sitesi ve sahibi Konsept Ofis
              Hizmetlerine sorumluluk yüklenemez.
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
