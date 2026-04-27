import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, total, setQuantity, clearCart } = useCart();
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus('');
  }, [items.length]);

  async function checkout() {
    try {
      await api.post('/orders/checkout', {
        items: items.map((item) => ({ bookId: item.bookId, quantity: item.quantity })),
      });
      clearCart();
      setStatus('Purchase completed successfully. Enjoy your books.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Purchase could not be completed.');
    }
  }

  return (
    <section className="page cart-page">
      <div className="page-head">
        <h2>Your cart</h2>
        <p>Purchase completed successfully. Enjoy your books.</p>
      </div>

      <div className="cart-list">
        {items.map((item) => (
          <article key={item.bookId} className="cart-item">
            <div>
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)} each</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => setQuantity(item.bookId, Number(e.target.value))}
            />
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </article>
        ))}
      </div>

      <div className="checkout-panel">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button type="button" onClick={checkout} disabled={items.length === 0}>
          Buy now
        </button>
      </div>

      {status && <p className="ok-text">{status}</p>}
    </section>
  );
}
