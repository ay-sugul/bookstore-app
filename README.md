# Paper Harbor Bookstore

Paper Harbor, yerelde calisan bir React + Express kitap satış demo uygulamasıdır. Uygulama 3 rol üzerinden çalışır: customer, manager ve admin.

## Kısa Bakış

- Frontend: React + Vite
- Backend: Node.js + Express
- Veritabanı: SQLite (better-sqlite3)
- Grafikler: Recharts
- Kimlik doğrulama: JWT tabanlı rol kontrolü

## Özellikler

### Customer

- Kitapları listeler, arar ve filtreler.
- Sepete ekleme ve satın alma akışı vardır.
- Stok sınırı sepette korunur.
- Kitap kartları sabit görsel oranı ve hizalı buton düzeniyle gösterilir.
- Arayüz Türkçe/İngilizce arasında değiştirilebilir.

### Manager

- Kitap kataloğunu görüntüler.
- Aylık gelir, yıllık gelir ve en çok satan kitapları grafiklerde görür.

### Admin

- Kitap ekleyebilir ve düzenleyebilir.
- Admin reset ile demo kataloğu ve örnek satış verileri yeniden oluşturulur.
- Arayüzde delete aksiyonu görünmez; yönetim akışı reset ve düzenleme üzerine kuruludur.

## Demo Kullanıcılar

- Customer: `client` / `client123`
- Manager: `manager` / `manager123`
- Admin: `admin` / `admin123`

## Çalıştırma

### Backend

```bash
cd backend
npm install
npm run start
```

Backend varsayılan adresi: `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend varsayılan adresi: `http://localhost:5173`

## API

Base URL: `http://localhost:4000/api`

- `POST /auth/login`
- `GET /books`
- `GET /books/:id`
- `POST /orders/checkout`
- `GET /analytics/monthly-revenue`
- `GET /analytics/yearly-revenue`
- `GET /analytics/top-selling-books`
- `POST /admin/books`
- `PUT /admin/books/:id`
- `DELETE /admin/books/:id`
- `POST /admin/reset`

## Seed ve Reset

- İlk açılışta demo kullanıcılar, 25 kitaplık katalog ve örnek siparişler oluşturulur.
- Admin reset çalıştırıldığında veritabanı temizlenir ve demo veri yeniden yüklenir.
- Reset sonrası grafikleri dolduracak satış geçmişi tekrar eklenir.

## Notlar

- Uygulama local-first demo olarak tasarlanmıştır.
- Ödeme entegrasyonu yoktur.
- Silme işlemi backend tarafında desteklenir; ancak admin arayüzünde görünür bir delete butonu yoktur.
