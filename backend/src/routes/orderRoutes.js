const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const orderService = require('../services/orderService');

const router = express.Router();

router.post('/checkout', authenticate, authorize(['customer']), (req, res, next) => {
  try {
    const result = orderService.checkout(req.user.id, req.body.items);
    res.status(201).json({
      ...result,
      message: 'Purchase completed successfully.',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
