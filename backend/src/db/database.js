const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { credentials } = require('../config/auth');
const { seededBooks, seededOrderDates } = require('./seedData');

const dbPath = path.join(__dirname, '../../data/bookstore.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

function createSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('customer', 'manager', 'admin')),
      display_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      image_url TEXT NOT NULL,
      description TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL CHECK(total_amount >= 0),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      book_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK(quantity > 0),
      unit_price REAL NOT NULL CHECK(unit_price >= 0),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books(id)
    );

    CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
    CREATE INDEX IF NOT EXISTS idx_order_items_book_id ON order_items(book_id);
    CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
    CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
  `);
}

function seedUsers() {
  const insertUser = db.prepare(`
    INSERT INTO users (username, password, role, display_name)
    VALUES (@username, @password, @role, @displayName)
  `);

  const trx = db.transaction(() => {
    credentials.forEach((user) => {
      insertUser.run(user);
    });
  });

  trx();
}

function seedBooks() {
  const limitedBooks = seededBooks.slice(0, 25);
  const insertBook = db.prepare(`
    INSERT INTO books (title, author, price, image_url, description, stock)
    VALUES (@title, @author, @price, @imageUrl, @description, @stock)
  `);

  const trx = db.transaction(() => {
    limitedBooks.forEach((book) => {
      insertBook.run(book);
    });
  });

  trx();
}

function seedOrders() {
  const customer = db.prepare('SELECT id FROM users WHERE username = ?').get('client');
  const books = db.prepare('SELECT id, price FROM books').all();

  if (!customer || books.length === 0) {
    return;
  }

  const insertOrder = db.prepare(
    'INSERT INTO orders (user_id, total_amount, created_at) VALUES (?, ?, ?)',
  );
  const insertOrderItem = db.prepare(
    'INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
  );
  const updateOrderTotal = db.prepare('UPDATE orders SET total_amount = ? WHERE id = ?');

  const dates = seededOrderDates(130);
  const trx = db.transaction(() => {
    dates.forEach((date) => {
      const itemCount = 1 + Math.floor(Math.random() * 3);
      let total = 0;

      const orderId = insertOrder.run(customer.id, 0, date.toISOString()).lastInsertRowid;

      for (let i = 0; i < itemCount; i += 1) {
        const picked = books[Math.floor(Math.random() * books.length)];
        const quantity = 1 + Math.floor(Math.random() * 2);
        insertOrderItem.run(orderId, picked.id, quantity, picked.price);
        total += quantity * picked.price;
      }

      updateOrderTotal.run(Number(total.toFixed(2)), orderId);
    });
  });

  trx();
}

function clearDatabase() {
  db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM books;
    DELETE FROM users;
    DELETE FROM sqlite_sequence WHERE name IN ('users', 'books', 'orders', 'order_items');
  `);
}

function seedDatabase() {
  seedUsers();
  seedBooks();
  seedOrders();
}

function initializeDatabase() {
  createSchema();
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  if (userCount === 0) {
    seedDatabase();
  }
}

function resetAndReseed() {
  clearDatabase();
  seedDatabase();
}

module.exports = {
  db,
  initializeDatabase,
  resetAndReseed,
};
