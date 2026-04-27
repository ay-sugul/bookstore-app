import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

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

  async function submit(event) {
    event.preventDefault();
    await onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.imageUrl || coverFromTitle(form.title),
    });

    if (!editingBook) {
      setForm(emptyBook);
    }
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <h3>{editingBook ? t('edit_book') : t('create_book')}</h3>
      <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder={t('book_name')} required />
      <input value={form.author} onChange={(e) => update('author', e.target.value)} placeholder={t('author')} required />
      <input
        type="number"
        step="0.01"
        min="0"
        value={form.price}
        onChange={(e) => update('price', e.target.value)}
        placeholder={t('price')}
        required
      />
      <input
        type="number"
        min="0"
        value={form.stock}
        onChange={(e) => update('stock', e.target.value)}
        placeholder={t('stock')}
        required
      />
      <input
        value={form.imageUrl}
        onChange={(e) => update('imageUrl', e.target.value)}
        placeholder={t('image_url')}
      />
      <textarea
        value={form.description}
        onChange={(e) => update('description', e.target.value)}
        placeholder={t('funny_description')}
        rows={3}
        required
      />
      <div className="form-actions">
        <button type="submit">{editingBook ? t('save_changes') : t('create_book')}</button>
        {editingBook && (
          <button type="button" className="ghost-btn" onClick={onCancel}>
            {t('cancel_edit')}
          </button>
        )}
      </div>
    </form>
  );
}
