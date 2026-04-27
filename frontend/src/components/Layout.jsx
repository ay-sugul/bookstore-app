import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function roleLinks(role) {
  const links = [{ to: '/books', label: 'Books' }];

  if (role === 'customer') {
    links.push({ to: '/cart', label: 'Cart' });
  }

  if (role === 'manager' || role === 'admin') {
    links.push({ to: '/dashboard', label: 'Insights' });
  }

  if (role === 'admin') {
    links.push({ to: '/admin', label: 'Admin' });
  }

  return links;
}

export default function Layout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="shell">
      <header className="app-header">
        <Link to="/books" className="brand">
          Paper Harbor
        </Link>
        <nav className="nav-links">
          {roleLinks(role).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="user-pill">
          <span>{user?.displayName}</span>
          <span className="role-tag">{role}</span>
          <button type="button" className="ghost-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
