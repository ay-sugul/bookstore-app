const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const result = authService.login(username, password);

  if (!result) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json(result);
});

module.exports = router;
