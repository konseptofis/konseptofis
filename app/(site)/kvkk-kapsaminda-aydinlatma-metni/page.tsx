import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";
import BreadcrumbListJsonLd from "@/app/components/seo/BreadcrumbListJsonLd";

export const metadata = {
  title: { absolute: "KVKK Kapsamında Aydınlatma Metni | Konsept Ofis" },
  description:
    "6698 sayılı KVKK kapsamında Konsept Ofis veri sorumlusu aydınlatma metni ve başvuru bilgileri.",
  alternates: { canonical: "/kvkk-kapsaminda-aydinlatma-metni" },
};

const linkClass = "text-[#0b7041] underline hover:no-underline";

const h2 =
  "mt-8 scroll-mt-24 text-[17px] font-semibold text-gray-900 first:mt-0 sm:mt-10";

export default function KvkkAydinlatmaMetniPage() {
  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK Aydınlatma Metni" },
        ]}
        pagePath="/kvkk-kapsaminda-aydinlatma-metni"
        id="ld-json-breadcrumb-kvkk-kapsaminda-aydinlatma-metni"
      />
      <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="KVKK Kapsamında Aydınlatma Metni"
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK Aydınlatma Metni" },
        ]}
      />

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-label="KVKK kapsamında aydınlatma metni"
      >
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4 text-[16px] leading-relaxed text-gray-600">
            <h2 className={h2}>1. Veri sorumlusu ve temsilcisi</h2>
            <p>
              Konsept Ofis Hizmetleri Ltd. Şti. (&quot;Şirket&quot;) olarak, 6698 Sayılı Kişisel
              Verilerin Korunması Hakkında Kanun (&quot;KVKK&quot;) uyarınca, Veri Sorumlusu
              sıfatıyla, müşterilerimizin kişisel verilerinin güvenliği hususuna azami özen
              göstermekteyiz. Bu bilinçle, aşağıda belirtilen amaçlar dahilinde, Şirket ile ilişkili
              tüm şahıslara ve siz müşterilerimize ait her türlü kişisel verinin, hukuk ve dürüstlük
              kurallarına uygun olacak şekilde işlenmesine, kaydedilmesine, saklanmasına ve
              sorumluluğumuzun tam idraki ile mevzuat tarafından izin verilen sınırlar çerçevesinde
              işlendikleri amaç ile sınırlı olarak 3. kişilere aktarılmasına ve/veya açıklanmasına
              asgari ölçüde dikkat etmekteyiz.
            </p>

            <h2 className={h2}>2. Kişisel verilerin toplanması, işlenmesi ve işleme amaçları</h2>
            <p>
              Şirketimiz tarafından elde edilen kişisel verileriniz, değişkenlik gösterebilmekle
              birlikte otomatik ya da otomatik olmayan yöntemlerle, ofisler, internet sitesi, sosyal
              medya mecraları, mobil uygulamalar, kameralar ve benzeri vasıtalarla sözlü, yazılı ya da
              elektronik olarak toplanabilecek ve hukuka ve ahlaka uygun süreç ve kapsam dahilinde
              işlenebilecektir.
            </p>

            <h2 className={h2}>
              3. İşlenen kişisel verilerin kimlere ve hangi amaçla aktarılabileceği
            </h2>
            <p>
              Yukarıda açıklanan amaçlar kapsamında işlenen kişisel verileriniz; KVKK&apos;nda
              öngörülen temel ilkelere uygun olarak ve KVKK&apos;nun 8. ve 9. maddelerinde belirtilen
              kişisel veri işleme şartları ve amaçları çerçevesinde, Türkiye Cumhuriyeti Yasaları ve
              İkincil mevzuatın izin verdiği kişi ve/veya kuruluşlar ile diğer 3. kişilerle ve yasal
              otoritelerle, Şirket&apos;in ana hissedarı, doğrudan/dolaylı yurtiçi/yurtdışı
              iştiraklerine; Şirket&apos;in sahip olduğu faaliyet izni tahtında faaliyetlerini
              yürütmek üzere hizmet aldığı, işbirliği yaptığı, program ortağı, ticari iş ortağı
              kuruluşları, mal ve/veya hizmeti sunan satıcı/sağlayıcıları, yurtiçi/yurtdışı tedarikçi
              ve/veya taşeron firmaları ve diğer 3. Kişilerle paylaşılabilecek ve bu doğrultuda
              işlenebilecek ve aktarılabilecektir.
            </p>

            <h2 className={h2}>4. Yurtdışına veri aktarımı</h2>
            <p>
              Şirketimiz tarafından kişisel verileriniz, KVKK&apos;nun 4(2). maddesindeki öngörülen
              ilkeler ışığında açık rıza temini suretiyle veya 5(2) ve 6(3) maddelerinde öngörülen
              durumların varlığı halinde, açık rıza temin edilmeksizin ve Kanunun 9. maddesindeki
              kurallara uymak kaydıyla, Kişisel Verileri Koruma Kurulu (&quot;Kurul&quot;) tarafından
              tespit edilecek yeterli korumaya sahip yabancı ülkeler ilan edildikten sonra, sadece bu
              ülkelerde yerleşik kişi ve kuruluşlara, yeterli korumanın bulunmadığı tespit ve ilan
              edilen ülkeler için ise, Türkiye&apos;deki ve ilgili yabancı ülkedeki veri
              sorumlularının yeterli bir korumayı yazılı olarak taahhüt ettiği ve ilgili aktarım
              açısından Kurul&apos;un izninin temin edilebildiği hallerle sınırlı olmak kaydıyla
              aktarılabilecektir.
            </p>

            <h2 className={h2}>5. Kişisel veri toplamanın yöntemi ve hukuki sebebi</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, gerçek bir
              kişinin kimliğini belirli ya da belirlenebilir bir hale getirmeye yarayan her türlü
              bilgi, yukarıda yer verilen amaçlar doğrultusunda toplanmaktadır. Bu süreçte toplanan
              kişisel verileriniz, KVKK&apos;nun 5. ve 6. maddelerinde belirtilen kişisel veri
              işleme şartları ve amaçları kapsamında, bu metnin (1) ve (2) numaralı maddelerinde
              belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.
            </p>

            <h2 className={h2}>
              6. Kişisel veri sahibi olarak KVKK&apos;nun 11. maddesinde sayılan haklarınız
            </h2>
            <p>
              Siz müşterilerimizin, kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi,
              işbu Aydınlatma Metni&apos;nde aşağıda düzenlenen yöntemlerle Şirketimize iletmeniz
              durumunda Şirketimiz talebin niteliğine göre talebi en kısa sürede ve en geç 30 (otuz)
              gün içinde ücretsiz olarak sonuçlandıracaktır. KVKK&apos;nun 11. maddesi uyarınca
              sahip olduğunuz haklar aşağıdaki gibidir:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
              <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
              <li>
                Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp
                kullanılmadığını öğrenme,
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,
              </li>
              <li>
                Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini
                isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere
                bildirilmesini isteme,
              </li>
              <li>
                KVKK&apos;nun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına
                rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin
                silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel
                verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle
                kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,
              </li>
              <li>
                Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde
                zararın giderilmesini talep etme.
              </li>
            </ul>
            <p>
              KVKK&apos;nun 13. maddesinin 1. fıkrası gereğince, yukarıda belirtilen haklarınızı
              kullanmak ile ilgili talebinizi, KVKK gereğince yazılı olarak Şirketimize iletebilirsiniz.
              Bu çerçevede yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici
              gerekli bilgiler ile KVKK&apos;nun 11. maddesinde belirtilen haklardan kullanmayı talep
              ettiğiniz hakkınıza yönelik açıklamalarınızı içeren talebinizi; web sitemizdeki{" "}
              <Link href="/kvkk-basvuru-formu" className={linkClass}>
                KVKK başvuru formunu
              </Link>{" "}
              doldurarak, formun imzalı bir nüshasını Mustafa Kemal Mah. Dumlupınar Blv. 274/2
              Mahall Ankara C2 Blok No:47 Çankaya-Ankara adresine kimliğinizi tespit edici belgeler
              ile bizzat elden iletebilir, noter kanalıyla veya KVK Kanunu&apos;nda belirtilen diğer
              yöntemler ile gönderebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
