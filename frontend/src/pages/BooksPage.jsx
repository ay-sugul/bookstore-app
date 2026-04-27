import { useEffect, useState } from 'react';
import { api } from '../api/client';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

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
  const { addToCart } = useCart();

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
    addToCart(book);
    setMessage(`${book.title} added to cart.`);
    setTimeout(() => setMessage(''), 1300);
  }

  const canBuy = role === 'customer';

  return (
    <section className="page books-page">
      <div className="page-head">
        <h2>Discover books</h2>
        <p>Search, filter, and explore up to 25 curated titles.</p>
      </div>

      <div className="filters">
        <input
          placeholder="Search title, author, description"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />
        <input
          placeholder="Filter by author"
          value={filters.author}
          onChange={(e) => update('author', e.target.value)}
        />
        <input
          placeholder="Min price"
          type="number"
          min="0"
          step="0.01"
          value={filters.minPrice}
          onChange={(e) => update('minPrice', e.target.value)}
        />
        <input
          placeholder="Max price"
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
          In stock only
        </label>
      </div>

      {message && <p className="ok-text">{message}</p>}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} canBuy={canBuy} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
