const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const analyticsService = require('../services/analyticsService');

const router = express.Router();

router.use(authenticate, authorize(['manager', 'admin']));

router.get('/monthly-revenue', (req, res, next) => {
  try {
    const data = analyticsService.getMonthlyRevenue(req.query.year);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/yearly-revenue', (req, res, next) => {
  try {
    const data = analyticsService.getYearlyRevenue();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/top-selling-books', (req, res, next) => {
  try {
    const data = analyticsService.getTopSellingBooks(req.query.limit);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
