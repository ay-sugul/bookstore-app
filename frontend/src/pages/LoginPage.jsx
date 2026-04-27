import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('client');
  const [password, setPassword] = useState('client123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      await login(username, password);
      navigate('/books');
    } catch {
      setError('Invalid credentials. Try one of the provided role accounts.');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Paper Harbor Bookstore</h1>
        <p>Sign in with one of the demo roles.</p>
        <ul className="credentials-list">
          <li>Customer: client / client123</li>
          <li>Manager: manager / manager123</li>
          <li>Admin: admin / admin123</li>
        </ul>
        <form onSubmit={submit} className="login-form">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign in</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
