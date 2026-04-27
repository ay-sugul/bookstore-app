import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      await login(username, password);
      navigate('/books');
    } catch {
      setError(t('invalid_credentials'));
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-toolbar">
          <button type="button" className="ghost-btn lang-toggle" onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}>
            {t('language_toggle')}
          </button>
        </div>
        <img src="/icons.png" alt="Paper Harbor logo" className="login-logo" style={{ width: "450px", height: "auto" }} />
        <h1>{t('login_title')}</h1>
        <p>{t('login_subtitle')}</p>
        <form onSubmit={submit} className="login-form">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('username_placeholder')} required />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password_placeholder')}
            required
          />
          <button type="submit">{t('login_button')}</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
