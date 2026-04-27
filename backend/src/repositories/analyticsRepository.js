const { db } = require('../db/database');

function monthlyRevenue(year) {
  const condition = Number.isInteger(year)
    ? 'WHERE strftime(\'%Y\', created_at) = ?'
    : '';
  const args = Number.isInteger(year) ? [String(year)] : [];

  return db
    .prepare(
      `SELECT
         strftime('%Y', created_at) AS year,
         strftime('%m', created_at) AS month,
         ROUND(SUM(total_amount), 2) AS revenue
       FROM orders
       ${condition}
       GROUP BY strftime('%Y', created_at), strftime('%m', created_at)
       ORDER BY year, month`,
    )
    .all(...args);
}

function yearlyRevenue() {
  return db
    .prepare(
      `SELECT
         strftime('%Y', created_at) AS year,
         ROUND(SUM(total_amount), 2) AS revenue
       FROM orders
       GROUP BY strftime('%Y', created_at)
       ORDER BY year`,
    )
    .all();
}

function topSellingBooks(limit) {
  return db
    .prepare(
      `SELECT
         b.id,
         b.title,
         b.author,
         SUM(oi.quantity) AS unitsSold,
         ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
       FROM order_items oi
       JOIN books b ON b.id = oi.book_id
       GROUP BY b.id, b.title, b.author
       ORDER BY unitsSold DESC
       LIMIT ?`,
    )
    .all(limit);
}

module.exports = {
  monthlyRevenue,
  yearlyRevenue,
  topSellingBooks,
};
