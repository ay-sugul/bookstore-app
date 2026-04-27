import { createContext, useContext, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client';

const AuthContext = createContext(null);

const stored = localStorage.getItem('bookstore-auth');
const initialAuth = stored ? JSON.parse(stored) : { token: '', user: null };
if (initialAuth.token) {
  setAuthToken(initialAuth.token);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(initialAuth.token);
  const [user, setUser] = useState(initialAuth.user);

  async function login(username, password) {
    const { data } = await api.post('/auth/login', { username, password });
    setToken(data.token);
    setUser(data.user);
    setAuthToken(data.token);
    localStorage.setItem('bookstore-auth', JSON.stringify({ token: data.token, user: data.user }));
  }

  function logout() {
    setToken('');
    setUser(null);
    setAuthToken('');
    localStorage.removeItem('bookstore-auth');
    localStorage.removeItem('bookstore-cart');
  }

  const value = useMemo(
    () => ({ token, user, role: user?.role, isAuthenticated: Boolean(token), login, logout }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
