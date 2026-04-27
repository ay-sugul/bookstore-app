const bookRepository = require('../repositories/bookRepository');
const { httpError } = require('../utils/httpError');

function coverFromTitle(title) {
  const seed = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
  return `https://picsum.photos/seed/${seed}/300/450`;
}

function normalizeBookPayload(payload) {
  const title = String(payload.title || '').trim();
  const author = String(payload.author || '').trim();
  const imageUrl = String(payload.imageUrl || '').trim();
  const description = String(payload.description || '').trim();
  const price = Number(payload.price);
  const stock = Number(payload.stock);

  if (!title || !author || !description) {
    throw httpError(400, 'title, author and description are required.');
  }

  if (!Number.isFinite(price) || price < 0) {
    throw httpError(400, 'price must be a positive number.');
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw httpError(400, 'stock must be an integer >= 0.');
  }

  return {
    title,
    author,
    imageUrl: imageUrl || coverFromTitle(title),
    description,
    price: Number(price.toFixed(2)),
    stock,
  };
}

function parseFilters(query) {
  const minPrice = query.minPrice !== undefined ? Number(query.minPrice) : undefined;
  const maxPrice = query.maxPrice !== undefined ? Number(query.maxPrice) : undefined;

  return {
    search: query.search ? String(query.search) : '',
    author: query.author ? String(query.author) : '',
    inStockOnly: String(query.inStockOnly || '').toLowerCase() === 'true',
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    sortBy: query.sortBy,
    sortDir: query.sortDir,
  };
}

function listBooks(query) {
  return bookRepository.listBooks(parseFilters(query));
}

function getBookById(id) {
  const book = bookRepository.getBookById(Number(id));
  if (!book) {
    throw httpError(404, 'Book not found.');
  }

  return book;
}

function createBook(payload) {
  if (bookRepository.countBooks() >= 25) {
    throw httpError(400, 'Maximum 25 distinct books allowed.');
  }

  const normalized = normalizeBookPayload(payload);
  return bookRepository.createBook(normalized);
}

function updateBook(id, payload) {
  const current = bookRepository.getBookById(Number(id));
  if (!current) {
    throw httpError(404, 'Book not found.');
  }

  const merged = {
    title: payload.title ?? current.title,
    author: payload.author ?? current.author,
    imageUrl: payload.imageUrl ?? current.image_url,
    description: payload.description ?? current.description,
    price: payload.price ?? current.price,
    stock: payload.stock ?? current.stock,
  };

  const normalized = normalizeBookPayload(merged);
  return bookRepository.updateBook(Number(id), normalized);
}

function deleteBook(id) {
  const deleted = bookRepository.deleteBook(Number(id));
  if (!deleted) {
    throw httpError(404, 'Book not found.');
  }

  return { success: true };
}

module.exports = {
  listBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
