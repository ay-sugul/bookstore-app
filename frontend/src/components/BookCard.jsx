export default function BookCard({ book, canBuy, onAdd }) {
  const isOut = book.stock === 0;

  return (
    <article className={isOut ? 'book-card out' : 'book-card'}>
      <div className="cover-wrap">
        <img src={book.image_url} alt={book.title} className="cover" />
        {isOut && <span className="badge">Out of stock</span>}
      </div>
      <div className="book-content">
        <h3>{book.title}</h3>
        <p className="meta">{book.author}</p>
        <p className="desc">{book.description}</p>
        <div className="card-footer">
          <strong>${book.price.toFixed(2)}</strong>
          <span>Stock: {book.stock}</span>
        </div>
        {canBuy && (
          <button type="button" onClick={() => onAdd(book)} disabled={isOut}>
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
