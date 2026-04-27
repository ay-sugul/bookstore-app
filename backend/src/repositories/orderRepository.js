const { db } = require('../db/database');
const { httpError } = require('../utils/httpError');

function createOrder(userId, items) {
  const insertOrder = db.prepare('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)');
  const insertOrderItem = db.prepare(
    'INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
  );
  const updateOrderTotal = db.prepare('UPDATE orders SET total_amount = ? WHERE id = ?');
  const getBook = db.prepare('SELECT id, title, stock, price FROM books WHERE id = ?');
  const decrementStock = db.prepare('UPDATE books SET stock = stock - ? WHERE id = ?');

  const trx = db.transaction(() => {
    const normalized = items.map((item) => ({
      bookId: Number(item.bookId),
      quantity: Number(item.quantity),
    }));

    normalized.forEach((item) => {
      if (!Number.isInteger(item.bookId) || !Number.isInteger(item.quantity) || item.quantity < 1) {
        throw httpError(400, 'Each checkout item must have valid bookId and quantity.');
      }
    });

    let total = 0;
    const detailedItems = normalized.map((item) => {
      const book = getBook.get(item.bookId);
      if (!book) {
        throw httpError(404, `Book ${item.bookId} not found.`);
      }
      if (book.stock < item.quantity) {
        throw httpError(400, `Not enough stock for ${book.title}.`);
      }

      const lineTotal = item.quantity * book.price;
      total += lineTotal;

      return {
        bookId: item.bookId,
        quantity: item.quantity,
        unitPrice: book.price,
      };
    });

    const orderId = insertOrder.run(userId, Number(total.toFixed(2))).lastInsertRowid;

    detailedItems.forEach((item) => {
      insertOrderItem.run(orderId, item.bookId, item.quantity, item.unitPrice);
      decrementStock.run(item.quantity, item.bookId);
    });

    updateOrderTotal.run(Number(total.toFixed(2)), orderId);

    return {
      orderId,
      totalAmount: Number(total.toFixed(2)),
    };
  });

  return trx();
}

module.exports = {
  createOrder,
};
