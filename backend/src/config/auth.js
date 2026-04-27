const jwtSecret = process.env.JWT_SECRET || 'bookstore-local-secret';

const credentials = [
  { username: 'client', password: 'client123', role: 'customer', displayName: 'client' },
  { username: 'manager', password: 'manager123', role: 'manager', displayName: 'manager' },
  { username: 'admin', password: 'admin123', role: 'admin', displayName: 'admin' },
];

module.exports = {
  jwtSecret,
  credentials,
};
