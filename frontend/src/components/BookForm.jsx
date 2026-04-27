import { useEffect, useState } from 'react';

function coverFromTitle(title) {
  const seed = encodeURIComponent((title || '').toLowerCase().replace(/\s+/g, '-'));
  return `https://picsum.photos/seed/${seed}/300/450`;
}

const emptyBook = {
  title: '',
  author: '',
  price: '',
  stock: '',
  imageUrl: '',
  description: '',
};

export default function BookForm({ editingBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyBook);

  useEffect(() => {
    if (!editingBook) {
      setForm(emptyBook);
      return;
    }

    setForm({
      title: editingBook.title,
      author: editingBook.author,
      price: String(editingBook.price),
      stock: String(editingBook.stock),
      imageUrl: editingBook.image_url,
      description: editingBook.description,
    });
  }, [editingBook]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.imageUrl || coverFromTitle(form.title),
    });
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <h3>{editingBook ? 'Edit book' : 'Create book'}</h3>
      <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Book name" required />
      <input value={form.author} onChange={(e) => update('author', e.target.value)} placeholder="Author" required />
      <input
        type="number"
        step="0.01"
        min="0"
        value={form.price}
        onChange={(e) => update('price', e.target.value)}
        placeholder="Price"
        required
      />
      <input
        type="number"
        min="0"
        value={form.stock}
        onChange={(e) => update('stock', e.target.value)}
        placeholder="Stock"
        required
      />
      <input
        value={form.imageUrl}
        onChange={(e) => update('imageUrl', e.target.value)}
        placeholder="Image URL (optional)"
      />
      <textarea
        value={form.description}
        onChange={(e) => update('description', e.target.value)}
        placeholder="Funny short description"
        rows={3}
        required
      />
      <div className="form-actions">
        <button type="submit">{editingBook ? 'Save changes' : 'Create book'}</button>
        {editingBook && (
          <button type="button" className="ghost-btn" onClick={onCancel}>
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
}
