const { resetAndReseed } = require('../db/database');

function resetDatabase() {
  resetAndReseed();
  return { success: true, message: 'Database reset and reseeded successfully.' };
}

module.exports = {
  resetDatabase,
};
