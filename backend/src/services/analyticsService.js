const analyticsRepository = require('../repositories/analyticsRepository');

function getMonthlyRevenue(year) {
  const parsed = year !== undefined ? Number(year) : undefined;
  return analyticsRepository.monthlyRevenue(Number.isInteger(parsed) ? parsed : undefined);
}

function getYearlyRevenue() {
  return analyticsRepository.yearlyRevenue();
}

function getTopSellingBooks(limit) {
  const parsed = Number(limit);
  const safeLimit = Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, 10) : 5;
  return analyticsRepository.topSellingBooks(safeLimit);
}

module.exports = {
  getMonthlyRevenue,
  getYearlyRevenue,
  getTopSellingBooks,
};
