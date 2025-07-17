import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook, updateBook } from '../controllers/book_controller';
import { BACKGROUND_COLOR, TEXT_PRIMARY, TEXT_SECONDARY, BUTTON_SECONDARY_BG, BUTTON_TEXT, BORDER_RADIUS_MEDIUM, BORDER_RADIUS_LARGE, BORDER_RADIUS_SMALL } from '../theme/colors';
import { BookFormAction } from '../utils/enums';

// %%%%%% BOOK FORM PAGE COMPONENT %%%%%%%%%%%%
/**
 * BookForm page component. Handles both adding and editing a book.
 * Props:
 *   mode: BookFormAction.ADD | BookFormAction.EDIT (determines form mode)
 *   book: book object (for edit mode, optional)
 * Example usage: <BookForm mode={BookFormAction.ADD} /> or <BookForm mode={BookFormAction.EDIT} book={book} />
 */
function BookForm({ mode = BookFormAction.ADD, book = null }) {
    // Form state
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Pre-fill fields if editing
    useEffect(() => {
        if (mode === BookFormAction.EDIT && book) {
            setName(book.name || '');
            setCategory(book.category || '');
            setPrice(book.price !== undefined ? book.price : '');
            setDescription(book.description || '');
        } else {
            setName('');
            setCategory('');
            setPrice('');
            setDescription('');
        }
    }, [mode, book]);

    // %%%%%% HANDLE SUBMIT %%%%%%%%%%%%
    /**
     * Handles form submission for add or edit.
     * Calls createBook or updateBook from controller.
     * Shows error/success and redirects after success.
     */
    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSuccess('');
        if (!name || !category || !price) {
            setError('Please fill in all required fields.');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            if (mode === BookFormAction.EDIT && book) {
                await updateBook(book.id, { name, category, price, description }, token);
                setSuccess('Book updated successfully!');
            } else {
                await createBook({ name, category, price, description }, token);
                setSuccess('Book added successfully!');
            }
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('You must be logged in to add or edit a book. Please log in and try again.');
            } else {
                setError(err.message || 'Operation failed. Please try again.');
            }
        }
    }
    // %%%%%% END - HANDLE SUBMIT %%%%%%%%%%%%

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="w-100 mt-5" style={{ maxWidth: 440 }}>
                <div className="card p-4 border shadow" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_MEDIUM }}>
                    <h2 className="mb-4 text-center" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>{mode === BookFormAction.EDIT ? 'Edit Book' : 'Add Book'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ color: TEXT_SECONDARY }}>Name</label>
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Book name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label" style={{ color: TEXT_SECONDARY }}>Category</label>
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                placeholder="Book category"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label" style={{ color: TEXT_SECONDARY }}>Price</label>
                            <input
                                type="number"
                                className="form-control rounded-3"
                                id="price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Book price"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label" style={{ color: TEXT_SECONDARY }}>Description</label>
                            <textarea
                                className="form-control rounded-3"
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Book description"
                                rows={3}
                            />
                        </div>
                        {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
                        {success && <div className="alert alert-success py-2 text-center">{success}</div>}
                        <button type="submit" className="w-100 mt-2 shadow-0 border-0" style={{ backgroundColor: BUTTON_SECONDARY_BG, color: BUTTON_TEXT, borderColor: BUTTON_SECONDARY_BG, fontWeight: 'bold', borderRadius: BORDER_RADIUS_SMALL, padding: '0.5rem 0' }}>{mode === BookFormAction.EDIT ? 'Update Book' : 'Add Book'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookForm;
// %%%%%% END - BOOK FORM PAGE COMPONENT %%%%%%%%%%%% 