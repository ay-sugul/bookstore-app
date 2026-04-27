import { useEffect, useState } from 'react';
import { api } from '../api/client';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    author: '',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
  });
  const [message, setMessage] = useState('');
  const { role } = useAuth();
  const { addToCart, items } = useCart();
  const { t } = useLanguage();

  async function loadBooks() {
    const params = {
      search: filters.search || undefined,
      author: filters.author || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      inStockOnly: filters.inStockOnly || undefined,
    };

    const { data } = await api.get('/books', { params });
    setBooks(data);
  }

  useEffect(() => {
    loadBooks();
  }, [filters.search, filters.author, filters.minPrice, filters.maxPrice, filters.inStockOnly]);

  function update(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function onAdd(book) {
    const added = addToCart(book);
    setMessage(added ? t('added_to_cart', { title: book.title }) : t('stock_limit', { title: book.title }));
    setTimeout(() => setMessage(''), 1300);
  }

  const cartCounts = items.reduce((acc, item) => {
    acc[item.bookId] = item.quantity;
    return acc;
  }, {});

  const canBuy = role === 'customer';

  return (
    <section className="page books-page">
      <div className="page-head">
        <h2>{t('books_title')}</h2>
        <p>{t('books_subtitle')}</p>
      </div>

      <div className="filters">
        <input
          placeholder={t('search_title')}
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />
        <input
          placeholder={t('filter_author')}
          value={filters.author}
          onChange={(e) => update('author', e.target.value)}
        />
        <input
          placeholder={t('min_price')}
          type="number"
          min="0"
          step="0.01"
          value={filters.minPrice}
          onChange={(e) => update('minPrice', e.target.value)}
        />
        <input
          placeholder={t('max_price')}
          type="number"
          min="0"
          step="0.01"
          value={filters.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
        />
        <label className="inline-check">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => update('inStockOnly', e.target.checked)}
          />
          {t('in_stock_only')}
        </label>
      </div>

      {message && <p className="ok-text">{message}</p>}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} canBuy={canBuy} onAdd={onAdd} cartQuantity={cartCounts[book.id] || 0} />
        ))}
      </div>
    </section>
  );
}
