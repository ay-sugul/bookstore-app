const orderRepository = require('../repositories/orderRepository');
const { httpError } = require('../utils/httpError');

function checkout(userId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw httpError(400, 'Cart cannot be empty.');
  }

  return orderRepository.createOrder(userId, items);
}

module.exports = {
  checkout,
};
