# Konsept Ofis – Proje Dosya Yapısı

```
konseptofis/
├── app/
│   ├── layout.tsx              # Kök layout, metadata, JSON-LD şemaları
│   ├── page.tsx                # Ana sayfa (Server Component)
│   ├── globals.css             # Global Tailwind ve tema
│   └── components/
│       ├── Header.tsx          # Sticky menü, NAP (telefon, e-posta, adres)
│       ├── HeroSection.tsx     # H1, alt metin, CTA butonları
│       ├── ServiceFeatures.tsx # Hizmet grid, H2/H3, NACE / yasal metinler
│       ├── PricingTable.tsx    # Şeffaf fiyatlandırma tablosu
│       ├── FAQAccordion.tsx    # SSS (client accordion + SEO içerik)
│       ├── MapAndContact.tsx   # Adres metni + Google Maps iframe
│       └── FloatingWhatsApp.tsx# Sabit WhatsApp butonu
├── app/lib/
│   └── data.ts                 # SSS metinleri, iletişim sabitleri, şema verileri
├── public/                     # Görseller (next/image ile kullanılacak)
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

## Semantik bölümler (sayfa hiyerarşisi)

- `<header>`: Header bileşeni
- `<main>`: İçerik (Hero, Hizmetler, Fiyat, SSS, İletişim)
- `<section>`: Her bileşen kendi section’ında (aria-labelledby ile)
- `<footer>`: İsteğe bağlı footer (şimdilik MapAndContact’a yakın konumda)
- H1: Sadece HeroSection’da bir adet
- H2/H3/H4: Sıralı, seviye atlanmadan
