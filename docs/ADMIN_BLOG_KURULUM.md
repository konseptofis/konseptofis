# Admin Blog Paneli – Kurulum

## Gerekli npm paketleri

Aşağıdaki komutla yükleyin (PowerShell’de tek tek çalıştırabilirsiniz):

```powershell
npm install @supabase/supabase-js @supabase/ssr
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-placeholder
```

- **@supabase/supabase-js** – Supabase istemci
- **@supabase/ssr** – Next.js (SSR/App Router) için Supabase auth/cookie yardımcıları
- **@tiptap/react, @tiptap/pm, @tiptap/starter-kit** – Rich text editör
- **@tiptap/extension-link** – Link ekleme
- **@tiptap/extension-placeholder** – Placeholder metni

Not: `lucide-react` projede zaten var.

## Ortam değişkenleri

`.env.local` dosyasına ekleyin (Supabase Dashboard > Project Settings > API’den alın):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Admin kullanıcılar Supabase Dashboard > Authentication > Users üzerinden e-posta/şifre ile oluşturulur.

## Supabase SQL

`supabase/schema.sql` dosyasındaki SQL’i Supabase Dashboard > SQL Editor’de çalıştırın.

Storage bucket’ı Dashboard > Storage > New bucket ile `blog-images` adında, public seçeneği açık şekilde de oluşturabilirsiniz; policy’ler için yine `schema.sql` içindeki `storage.objects` policy’lerini kullanın.
