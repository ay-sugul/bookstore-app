const jwtSecret = process.env.JWT_SECRET || 'bookstore-local-secret';

const credentials = [
  { username: 'client', password: 'client123', role: 'customer', displayName: 'Client User' },
  { username: 'manager', password: 'manager123', role: 'manager', displayName: 'Store Manager' },
  { username: 'admin', password: 'admin123', role: 'admin', displayName: 'Admin User' },
];

module.exports = {
  jwtSecret,
  credentials,
};
