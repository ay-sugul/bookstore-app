import { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    language_label: 'TR',
    login_title: 'Paper Harbor Bookstore',
    login_subtitle: 'Please sign in with your account credentials.',
    username_placeholder: 'Username',
    password_placeholder: 'Password',
    login_button: 'Sign in',
    invalid_credentials: 'Invalid credentials.',
    nav_books: 'Books',
    nav_cart: 'Cart',
    nav_insights: 'Insights',
    nav_admin: 'Admin',
    logout: 'Logout',
    role_customer: 'Customer',
    role_manager: 'Manager',
    role_admin: 'Admin',
    books_title: 'Discover books',
    books_subtitle: 'Search, filter, and explore up to 25 curated titles.',
    search_title: 'Search title',
    filter_author: 'Filter by author',
    min_price: 'Min price',
    max_price: 'Max price',
    in_stock_only: 'In stock only',
    added_to_cart: '{title} added to cart.',
    stock_limit: 'You already reached the stock limit for {title}.',
    out_of_stock: 'Out of stock',
    add_to_cart: 'Add to cart',
    stock_label: 'Stock: {count}',
    cart_title: 'Your cart',
    cart_subtitle: 'Review your items before checkout.',
    cart_each: '${price} each',
    cart_total: 'Total: ${total}',
    buy_now: 'Buy now',
    checkout_success: 'Purchase completed successfully. Enjoy your books.',
    checkout_fail: 'Purchase could not be completed.',
    dashboard_title: 'Store insights',
    dashboard_subtitle: 'Monthly revenue, yearly revenue, and top selling books.',
    monthly_revenue: 'Monthly revenue',
    yearly_revenue: 'Yearly revenue',
    top_selling_books: 'Top selling books',
    book: 'Book',
    units_sold: 'Units sold',
    revenue: 'Revenue',
    admin_title: 'Admin management',
    admin_subtitle: 'Maintain catalog data and reset seed data for demos.',
    books_count: 'Books ({count}/25)',
    admin_reset: 'Admin reset',
    create_book: 'Create book',
    edit_book: 'Edit book',
    save_changes: 'Save changes',
    cancel_edit: 'Cancel edit',
    delete: 'Delete',
    edit: 'Edit',
    book_created: 'Book created successfully.',
    book_updated: 'Book updated successfully.',
    book_deleted: 'Book deleted successfully.',
    book_operation_failed: 'Book operation failed.',
    delete_failed: 'Delete failed.',
    reset_failed: 'Reset failed.',
    confirm_reset: 'This will delete all current data and reseed demo data. Continue?',
    book_name: 'Book name',
    author: 'Author',
    name: 'Name',
    actions: 'Actions',
    price: 'Price',
    stock: 'Stock',
    image_url: 'Image URL (optional)',
    description: 'Description',
    funny_description: 'Short description',
    price_each: '${price} each',
    language_toggle: 'Türkçe',
    language_en: 'EN',
    language_tr: 'TR',
  },
  tr: {
    language_label: 'EN',
    login_title: 'Paper Harbor Kitabevi',
    login_subtitle: 'Lütfen hesap bilgilerinizle giriş yapın.',
    username_placeholder: 'Kullanıcı adı',
    password_placeholder: 'Şifre',
    login_button: 'Giriş yap',
    invalid_credentials: 'Geçersiz giriş bilgileri.',
    nav_books: 'Kitaplar',
    nav_cart: 'Sepet',
    nav_insights: 'İçgörüler',
    nav_admin: 'Yönetim',
    logout: 'Çıkış yap',
    role_customer: 'Müşteri',
    role_manager: 'Yönetici',
    role_admin: 'Admin',
    books_title: 'Kitapları keşfet',
    books_subtitle: '25 seçilmiş kitabı ara, filtrele ve incele.',
    search_title: 'Başlığa göre ara',
    filter_author: 'Yazara göre filtrele',
    min_price: 'En düşük fiyat',
    max_price: 'En yüksek fiyat',
    in_stock_only: 'Sadece stokta olanlar',
    added_to_cart: '{title} sepete eklendi.',
    stock_limit: '{title} için stok sınırına ulaştınız.',
    out_of_stock: 'Stokta yok',
    add_to_cart: 'Sepete ekle',
    stock_label: 'Stok: {count}',
    cart_title: 'Sepetiniz',
    cart_subtitle: 'Ödeme öncesi ürünlerinizi kontrol edin.',
    cart_each: 'Adet ${price}',
    cart_total: 'Toplam: ${total}',
    buy_now: 'Satın al',
    checkout_success: 'Satın alma başarılı. Kitaplarınızın keyfini çıkarın.',
    checkout_fail: 'Satın alma tamamlanamadı.',
    dashboard_title: 'Mağaza içgörüleri',
    dashboard_subtitle: 'Aylık gelir, yıllık gelir ve en çok satan kitaplar.',
    monthly_revenue: 'Aylık gelir',
    yearly_revenue: 'Yıllık gelir',
    top_selling_books: 'En çok satan kitaplar',
    book: 'Kitap',
    units_sold: 'Satılan adet',
    revenue: 'Gelir',
    admin_title: 'Yönetim paneli',
    admin_subtitle: 'Katalog verilerini yönetin ve demo verilerini sıfırlayın.',
    books_count: 'Kitaplar ({count}/25)',
    admin_reset: 'Sıfırla',
    create_book: 'Kitap oluştur',
    edit_book: 'Kitabı düzenle',
    save_changes: 'Değişiklikleri kaydet',
    cancel_edit: 'Düzenlemeyi iptal et',
    delete: 'Sil',
    edit: 'Düzenle',
    book_created: 'Kitap başarıyla oluşturuldu.',
    book_updated: 'Kitap başarıyla güncellendi.',
    book_deleted: 'Kitap başarıyla silindi.',
    book_operation_failed: 'Kitap işlemi başarısız oldu.',
    delete_failed: 'Silme başarısız oldu.',
    reset_failed: 'Sıfırlama başarısız oldu.',
    confirm_reset: 'Bu işlem mevcut tüm verileri silecek ve demo verileri yeniden yükleyecek. Devam edilsin mi?',
    book_name: 'Kitap adı',
    author: 'Yazar',
    name: 'Ad',
    actions: 'İşlemler',
    price: 'Fiyat',
    stock: 'Stok',
    image_url: 'Görsel URL’si (isteğe bağlı)',
    description: 'Açıklama',
    funny_description: 'Kısa açıklama',
    price_each: 'Adet ${price}',
    language_toggle: 'English',
    language_en: 'EN',
    language_tr: 'TR',
  },
};

const bookDescriptionsTr = {
  '1984': 'Büyük Birader sizi izliyor, ama en azından dili çok güçlü.',
  'The Great Gatsby': 'Şampanya, kaos ve fazlasıyla gizemli bir komşu.',
  'To Kill a Mockingbird': 'Kalbi olan bir mahkeme draması ve unutulmaz bir vicdan.',
  'Pride and Prejudice': 'Aşk, görgü ve sınıf atmış bakışlar.',
  'Moby-Dick': 'Bir kaptan, bir balina ve kesinlikle sıfır sakinlik.',
  'The Hobbit': 'Küçük bir kahraman, büyük bir macera, mükemmel atıştırmalıklar.',
  Dune: 'Kum, baharat ve üst seviye siyasi drama.',
  'The Catcher in the Rye': 'Gençlik bunalımı, ikonik bir ses ve yapmacıksız bir enerji.',
  'Brave New World': 'Verimli, parlak ve fazlasıyla ürkütücü bir gelecek.',
  'The Alchemist': 'Hayallerini izle, belki çöle de biraz konuşursun.',
  Sapiens: 'İnsanlığın hikayesi, çok sayıda tartışmalı tercih eşliğinde.',
  'Atomic Habits': 'Küçük değişimler, büyük kazançlar, daha az bahane.',
  'The Little Prince': 'Dev duygusal yükü olan küçük bir gezgin.',
  'The Book Thief': 'Sözler, savaş ve beklemediğiniz bir anlatıcı.',
  'The Kite Runner': 'Dostluk, pişmanlık ve oldukça rüzgarlı bir sembol.',
  'The Name of the Wind': 'Sihir okulu, müzik ve tehlikeli derecede özgüvenli bir anlatıcı.',
  Educated: 'Saf kararlılıkla açılan bir hatırat seviye atlaması.',
  'The Martian': 'Bilim, alaycılık ve uzayda patates.',
  Circe: 'Mitoloji, büyücülük ve oldukça güçlü bir kişisel marka.',
  'Project Hail Mary': 'Dünyayı matematik, koli bandı ve panikle kurtar.',
};

const LanguageContext = createContext(null);

function interpolate(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ''));
}

export function LanguageProvider({ children }) {
  const stored = localStorage.getItem('bookstore-language');
  const initial = stored === 'tr' ? 'tr' : 'en';
  const [lang, setLangState] = useState(initial);

  function setLang(nextLang) {
    setLangState(nextLang);
    localStorage.setItem('bookstore-language', nextLang);
  }

  function t(key, params = {}) {
    const template = translations[lang]?.[key] ?? translations.en[key] ?? key;
    return interpolate(template, params);
  }

  function bookDescription(title, fallback) {
    if (lang === 'tr') {
      return bookDescriptionsTr[title] || fallback;
    }

    return fallback;
  }

  const value = useMemo(() => ({ lang, setLang, t, bookDescription }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
