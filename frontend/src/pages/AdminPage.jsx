import { useEffect, useState } from 'react';
import { api } from '../api/client';
import BookForm from '../components/BookForm';

export default function AdminPage() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState('');

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
        setStatus('Book updated successfully.');
      } else {
        await api.post('/admin/books', payload);
        setStatus('Book created successfully.');
      }

      setEditing(null);
      await loadBooks();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Book operation failed.');
    }
  }

  async function removeBook(id) {
    try {
      await api.delete(`/admin/books/${id}`);
      setStatus('Book deleted successfully.');
      if (editing?.id === id) {
        setEditing(null);
      }
      await loadBooks();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Delete failed.');
    }
  }

  async function resetDatabase() {
    const confirmed = window.confirm('This will delete all current data and reseed demo data. Continue?');
    if (!confirmed) {
      return;
    }

    try {
      const { data } = await api.post('/admin/reset');
      setStatus(data.message);
      setEditing(null);
      await loadBooks();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Reset failed.');
    }
  }

  return (
    <section className="page admin-page">
      <div className="page-head">
        <h2>Admin management</h2>
        <p>Maintain catalog data and reset seed data for demos.</p>
      </div>

      <div className="admin-grid">
        <BookForm editingBook={editing} onSubmit={submitBook} onCancel={() => setEditing(null)} />

        <div className="admin-panel">
          <div className="panel-head">
            <h3>Books ({books.length}/25)</h3>
            <button type="button" className="danger-btn" onClick={resetDatabase}>
              Admin reset
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
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
                        Edit
                      </button>
                      <button type="button" className="ghost-btn" onClick={() => removeBook(book.id)}>
                        Delete
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
