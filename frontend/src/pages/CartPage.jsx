import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartPage() {
  const { items, total, setQuantity, clearCart } = useCart();
  const [status, setStatus] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    setStatus('');
  }, [items.length]);

  async function checkout() {
    try {
      await api.post('/orders/checkout', {
        items: items.map((item) => ({ bookId: item.bookId, quantity: item.quantity })),
      });
      clearCart();
      setStatus(t('checkout_success'));
    } catch (error) {
      setStatus(error.response?.data?.message || t('checkout_fail'));
    }
  }

  return (
    <section className="page cart-page">
      <div className="page-head">
        <h2>{t('cart_title')}</h2>
        <p>{t('cart_subtitle')}</p>
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
              max={item.stock || undefined}
              value={item.quantity}
              onChange={(e) => setQuantity(item.bookId, Number(e.target.value))}
            />
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </article>
        ))}
      </div>

      <div className="checkout-panel">
        <h3>{t('cart_total', { total: total.toFixed(2) })}</h3>
        <button type="button" onClick={checkout} disabled={items.length === 0}>
          {t('buy_now')}
        </button>
      </div>

      {status && <p className="ok-text">{status}</p>}
    </section>
  );
}
