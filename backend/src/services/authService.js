const jwt = require('jsonwebtoken');
const { db } = require('../db/database');
const { jwtSecret } = require('../config/auth');

function login(username, password) {
  const user = db
    .prepare('SELECT id, username, password, role, display_name FROM users WHERE username = ?')
    .get(username);

  if (!user || user.password !== password) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      displayName: user.display_name,
    },
    jwtSecret,
    { expiresIn: '8h' },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      displayName: user.display_name,
    },
  };
}

module.exports = {
  login,
};
