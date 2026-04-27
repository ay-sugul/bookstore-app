const { db } = require('../db/database');

function listBooks(filters) {
  const where = [];
  const params = [];

  if (filters.search) {
    where.push('LOWER(title) LIKE ?');
    const query = `%${filters.search.toLowerCase()}%`;
    params.push(query);
  }

  if (filters.author) {
    where.push('LOWER(author) LIKE ?');
    params.push(`%${filters.author.toLowerCase()}%`);
  }

  if (filters.minPrice !== undefined) {
    where.push('price >= ?');
    params.push(filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    where.push('price <= ?');
    params.push(filters.maxPrice);
  }

  if (filters.inStockOnly) {
    where.push('stock > 0');
  }

  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const sortField = filters.sortBy === 'price' ? 'price' : 'title';
  const sortDirection = filters.sortDir === 'desc' ? 'DESC' : 'ASC';

  return db
    .prepare(`SELECT * FROM books ${whereClause} ORDER BY ${sortField} ${sortDirection}`)
    .all(...params);
}

function getBookById(id) {
  return db.prepare('SELECT * FROM books WHERE id = ?').get(id);
}

function countBooks() {
  return db.prepare('SELECT COUNT(*) AS count FROM books').get().count;
}

function createBook(book) {
  const result = db
    .prepare(
      `INSERT INTO books (title, author, price, image_url, description, stock)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(book.title, book.author, book.price, book.imageUrl, book.description, book.stock);

  return getBookById(result.lastInsertRowid);
}

function updateBook(id, updates) {
  const existing = getBookById(id);
  if (!existing) {
    return null;
  }

  const next = {
    title: updates.title ?? existing.title,
    author: updates.author ?? existing.author,
    price: updates.price ?? existing.price,
    imageUrl: updates.imageUrl ?? existing.image_url,
    description: updates.description ?? existing.description,
    stock: updates.stock ?? existing.stock,
  };

  db.prepare(
    `UPDATE books
     SET title = ?, author = ?, price = ?, image_url = ?, description = ?, stock = ?
     WHERE id = ?`,
  ).run(next.title, next.author, next.price, next.imageUrl, next.description, next.stock, id);

  return getBookById(id);
}

function deleteBook(id) {
  const trx = db.transaction(() => {
    db.prepare('DELETE FROM order_items WHERE book_id = ?').run(id);
    const result = db.prepare('DELETE FROM books WHERE id = ?').run(id);
    return result.changes > 0;
  });

  return trx();
}

module.exports = {
  listBooks,
  getBookById,
  countBooks,
  createBook,
  updateBook,
  deleteBook,
};
