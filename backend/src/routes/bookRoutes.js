const express = require('express');
const bookService = require('../services/bookService');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    const books = bookService.listBooks(req.query);
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const book = bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
