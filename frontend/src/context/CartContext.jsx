import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

const storedCart = localStorage.getItem('bookstore-cart');
const initialItems = storedCart ? JSON.parse(storedCart) : [];

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialItems);

  function persist(nextItems) {
    setItems(nextItems);
    localStorage.setItem('bookstore-cart', JSON.stringify(nextItems));
  }

  function addToCart(book) {
    const existing = items.find((item) => item.bookId === book.id);
    if (existing) {
      const updated = items.map((item) =>
        item.bookId === book.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      persist(updated);
      return;
    }

    persist([
      ...items,
      {
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      },
    ]);
  }

  function setQuantity(bookId, quantity) {
    if (quantity < 1) {
      persist(items.filter((item) => item.bookId !== bookId));
      return;
    }

    persist(items.map((item) => (item.bookId === bookId ? { ...item, quantity } : item)));
  }

  function clearCart() {
    persist([]);
  }

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, total, addToCart, setQuantity, clearCart }),
    [items, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
