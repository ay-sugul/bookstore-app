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
    const stock = Number(book.stock) || 0;
    const existing = items.find((item) => item.bookId === book.id);
    if (existing) {
      if (existing.quantity >= stock) {
        return false;
      }

      const updated = items.map((item) =>
        item.bookId === book.id ? { ...item, quantity: Math.min(item.quantity + 1, stock) } : item,
      );
      persist(updated);
      return true;
    }

    if (stock <= 0) {
      return false;
    }

    persist([
      ...items,
      {
        bookId: book.id,
        title: book.title,
        price: book.price,
        stock,
        quantity: 1,
      },
    ]);
    return true;
  }

  function setQuantity(bookId, quantity) {
    if (quantity < 1) {
      persist(items.filter((item) => item.bookId !== bookId));
      return;
    }

    persist(
      items.map((item) => {
        if (item.bookId !== bookId) {
          return item;
        }

        const stock = Number(item.stock);
        const cappedQuantity = Number.isFinite(stock) && stock > 0 ? Math.min(quantity, stock) : quantity;
        return { ...item, quantity: cappedQuantity };
      }),
    );
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
