import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';
import AdminPage from './pages/AdminPage';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/books" replace />;
  }

  return children;
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/books' : '/login'} replace />}
      />

      <Route
        element={(
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        )}
      >
        <Route path="/books" element={<BooksPage />} />
        <Route
          path="/cart"
          element={(
            <ProtectedRoute roles={['customer']}>
              <CartPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute roles={['manager', 'admin']}>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute roles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          )}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
