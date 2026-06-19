"use client";

import Link from "next/link";
import AccordionFAQ from "@/app/components/AccordionFAQ";

const TEXT_LINK =
  "font-medium text-[#0b7041] underline-offset-2 transition-colors hover:underline";

const SSS_FAQ_ITEMS = [
  {
    question: "Sanal ofis kullanmak yasal mıdır?",
    answer: (
      <>
        Evet.{" "}
        <Link href="/" className={TEXT_LINK}>
          Sanal ofis hizmeti
        </Link>
        , Türk Ticaret Kanunu ve ilgili mevzuata uygun şekilde sunulmaktadır. Şirketinizin yasal
        iş adresi olarak sanal ofis adresini kullanmanız mümkündür.
      </>
    ),
  },
  {
    question: "Vergi levhası adresi olarak gösterilebilir mi?",
    answer: (
      <>
        Evet. Konsept Ofis{" "}
        <Link href="/hizmetlerimiz/cankaya-sanal-ofis" className={TEXT_LINK}>
          sanal ofis adresi
        </Link>
        , vergi levhası ve ticaret sicil adresi olarak kullanılabilir. Adres, resmi evraklarda ve
        Ticaret Sicil Gazetesi ilanlarında geçerli yasal iş adresi olarak kabul edilir.
      </>
    ),
  },
  {
    question: "Stopajsız ofis kiralama nedir?",
    answer: (
      <>
        Uygun koşullarda, sanal ofis ve hazır ofis hizmetlerimiz{" "}
        <Link href="/fiyatlar" className={TEXT_LINK}>
          stopaj kesintisi olmadan faturalandırılabilir
        </Link>
        . Detaylar için bizimle iletişime geçebilirsiniz.
      </>
    ),
  },
  {
    question: "Toplantı odası saatlik kiralanabilir mi?",
    answer: (
      <>
        Evet.{" "}
        <Link href="/hizmetlerimiz/toplanti-odasi-kiralama" className={TEXT_LINK}>
          Toplantı odalarımız
        </Link>{" "}
        saatlik kiralanabilir. Randevu alarak ihtiyacınız olan saat diliminde kullanım
        sağlayabilirsiniz.
      </>
    ),
  },
  {
    question: "Ankara dışından da sanal ofis alabilir miyim?",
    answer: (
      <>
        Evet. Türkiye genelinden şirketler, Ankara&apos;daki yasal iş adresi için{" "}
        <Link href="/" className={TEXT_LINK}>
          sanal ofis hizmetimizi
        </Link>{" "}
        kullanabilir. Evrak ve kurye hizmetleri ile entegre çalışıyoruz.
      </>
    ),
  },
  {
    question: "Şirketime gelen posta ve kargolar nasıl takip ediliyor?",
    answer:
      "Şirketiniz adına gelen tüm kargo, posta ve resmi evraklar (tebligat vb.) profesyonel resepsiyon ekibimiz tarafından güvenle teslim alınır ve muhafaza edilir. Evraklarınız ulaştığı anda size anında e-posta veya WhatsApp üzerinden bilgi verilir. Dilerseniz gelen kargolarınız belirttiğiniz farklı bir adrese de yönlendirilebilir.",
  },
  {
    question: "Sanal ofis kiralama süreci ne kadar sürer, aynı gün yasal adres gösterebilir miyim?",
    answer:
      "Evet, sözleşme sürecimiz oldukça hızlıdır. Gerekli evrakları iletmenizin ardından dakikalar içinde sözleşmeniz hazırlanır. Sözleşme onaylandığı anda Ankara Çankaya'daki prestijli adresimizi yeni şirket kuruluşunuz veya adres değişikliğiniz için anında yasal iş adresi olarak göstermeye başlayabilirsiniz.",
  },
] as const;

export default function SssFaq() {
  return <AccordionFAQ items={[...SSS_FAQ_ITEMS]} idPrefix="sss-page" />;
}
