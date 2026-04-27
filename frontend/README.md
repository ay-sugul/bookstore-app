# Frontend

Bu klasör, Paper Harbor Bookstore uygulamasının React arayüzünü içerir.

## Özellikler

- Kitapları kart görünümünde listeler.
- Kapak görselleri aynı oranı korur, kart içeriği hizalı kalır.
- Sepete ekleme, miktar sınırı ve satın alma akışı desteklenir.
- Admin ekranında kitap oluşturma ve düzenleme vardır.
- Uygulama içinde dil değiştirme yapılabilir.

## Çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Varsayılan adres: `http://localhost:5173`

## Kontroller

- API bağlantısı için backend'in çalıştığından emin olun.
- Geliştirme modunda lint kontrolü için:

```bash
npm run lint
```

## Notlar

- Bu proje Vite tabanlıdır.
- Kullanılan ana bağımlılıklar: React, React Router, Axios ve Recharts.
