import { useLanguage } from '../context/LanguageContext';

export default function BookCard({ book, canBuy, onAdd, cartQuantity }) {
  const { t, bookDescription } = useLanguage();
  const isOut = book.stock <= 0;
  const atLimit = cartQuantity >= book.stock;

  return (
    <article className={isOut ? 'book-card out' : 'book-card'}>
      <div className="cover-wrap">
        <img src={book.image_url} alt={book.title} className="cover" />
        {isOut && <span className="badge">{t('out_of_stock')}</span>}
      </div>
      <div className="book-content">
        <h3>{book.title}</h3>
        <p className="meta">{book.author}</p>
        <p className="desc">{bookDescription(book.title, book.description)}</p>
        <div className="card-footer">
          <strong>${book.price.toFixed(2)}</strong>
          <span>{t('stock_label', { count: book.stock })}</span>
        </div>
        {canBuy && (
          <button type="button" onClick={() => onAdd(book)} disabled={isOut || atLimit}>
            {t('add_to_cart')}
          </button>
        )}
      </div>
    </article>
  );
}
