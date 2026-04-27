import { useEffect, useState } from 'react';
import { api } from '../api/client';
import BookForm from '../components/BookForm';
import { useLanguage } from '../context/LanguageContext';

export default function AdminPage() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState('');
  const { t } = useLanguage();

  async function loadBooks() {
    const { data } = await api.get('/books');
    setBooks(data);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function submitBook(payload) {
    try {
      if (editing) {
        await api.put(`/admin/books/${editing.id}`, payload);
        setStatus(t('book_updated'));
      } else {
        await api.post('/admin/books', payload);
        setStatus(t('book_created'));
      }

      setEditing(null);
      await loadBooks();
    } catch (error) {
      setStatus(error.response?.data?.message || t('book_operation_failed'));
    }
  }

  async function removeBook(id) {
    try {
      await api.delete(`/admin/books/${id}`);
      setStatus(t('book_deleted'));
      if (editing?.id === id) {
        setEditing(null);
      }
      await loadBooks();
    } catch (error) {
      setStatus(error.response?.data?.message || t('delete_failed'));
    }
  }

  async function resetDatabase() {
    const confirmed = window.confirm(t('confirm_reset'));
    if (!confirmed) {
      return;
    }

    try {
      const { data } = await api.post('/admin/reset');
      setStatus(data.message);
      setEditing(null);
      await loadBooks();
    } catch (error) {
      setStatus(error.response?.data?.message || t('reset_failed'));
    }
  }

  return (
    <section className="page admin-page">
      <div className="page-head">
        <h2>{t('admin_title')}</h2>
        <p>{t('admin_subtitle')}</p>
      </div>

      <div className="admin-grid">
        <BookForm editingBook={editing} onSubmit={submitBook} onCancel={() => setEditing(null)} />

        <div className="admin-panel">
          <div className="panel-head">
            <h3>{t('books_count', { count: books.length })}</h3>
            <button type="button" className="danger-btn" onClick={resetDatabase}>
              {t('admin_reset')}
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t('name')}</th>
                  <th>{t('author')}</th>
                  <th>{t('price')}</th>
                  <th>{t('stock')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>${Number(book.price).toFixed(2)}</td>
                    <td>{book.stock}</td>
                    <td className="actions">
                      <button type="button" onClick={() => setEditing(book)}>
                        {t('edit')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {status && <p className="ok-text">{status}</p>}
    </section>
  );
}
