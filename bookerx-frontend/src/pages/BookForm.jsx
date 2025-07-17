import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook, updateBook } from '../controllers/book_controller';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR, WHITE, SECONDARY_SURFACE } from '../theme/colors';
import { BookFormAction } from '../utils/enums';




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
    // Restore handler
    function handleRestore(e) {
        e.preventDefault();
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
    }
    // %%%%%% END - HANDLE SUBMIT %%%%%%%%%%%%



    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="w-100 mt-5" style={{ maxWidth: 440 }}>
                <div className="card p-4 border shadow" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: 10 }}>
                    <h2 className="mb-4 text-center" style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>{mode === BookFormAction.EDIT ? 'Edit Book' : 'Add Book'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ color: SECONDARY_COLOR }}>Name</label>
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
                            <label htmlFor="category" className="form-label" style={{ color: SECONDARY_COLOR }}>Category</label>
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
                            <label htmlFor="price" className="form-label" style={{ color: SECONDARY_COLOR }}>Price</label>
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
                            <label htmlFor="description" className="form-label" style={{ color: SECONDARY_COLOR }}>Description</label>
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
                        <div className="d-flex gap-2 mt-2">
                            <button
                                type="button"
                                className="flex-fill shadow-0 border-0"
                                style={{ backgroundColor: '#eee', color: SECONDARY_COLOR, fontWeight: 'bold', borderRadius: 24, padding: '0.5rem 0' }}
                                onClick={handleRestore}
                            >
                                Restore
                            </button>
                            <button
                                type="submit"
                                className="flex-fill shadow-0 border-0"
                                style={{ backgroundColor: SECONDARY_SURFACE, color: WHITE, fontWeight: 'bold', borderRadius: 24, padding: '0.5rem 0' }}
                            >
                                {mode === BookFormAction.EDIT ? 'Update Book' : 'Add Book'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookForm;
