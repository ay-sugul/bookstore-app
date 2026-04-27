const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const bookService = require('../services/bookService');
const adminService = require('../services/adminService');

const router = express.Router();

router.use(authenticate, authorize(['admin']));

router.post('/books', (req, res, next) => {
  try {
    const created = bookService.createBook(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put('/books/:id', (req, res, next) => {
  try {
    const updated = bookService.updateBook(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/books/:id', (req, res, next) => {
  try {
    const result = bookService.deleteBook(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/reset', (req, res, next) => {
  try {
    const result = adminService.resetDatabase();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
