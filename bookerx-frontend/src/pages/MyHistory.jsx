import React, { useState } from 'react';
import { PRIMARY_COLOR } from '../theme/colors';
import BookList from '../components/BookList';
import { updateBook, deleteBook } from '../controllers/book_controller';

/**
 * MyHistory page component. Displays the books purchased by the current user.
 * Props: books, loading, currentUser, searchBooks, searchValue, refreshAll
 */
function MyHistory({ books, loading, currentUser, searchBooks }) {

    const [editingBook, setEditingBook] = useState(null);
    const [editFields, setEditFields] = useState({ name: '', category: '', price: '', description: '', imageUrl: '', bookUrl: '' });
    const [localBooks, setLocalBooks] = useState([]);

    // Use the list passed as prop, or the local one if modified
    const displayBooks = localBooks.length > 0 ? localBooks : books;
    const filteredBooks = searchBooks(displayBooks);

    const handleEdit = (book) => {
        setEditingBook(book);
        setEditFields({
            name: book.name,
            category: book.category,
            price: book.price,
            description: book.description || '',
            imageUrl: book.imageUrl || '',
            bookUrl: book.bookUrl || ''
        });
    };


    const handleDelete = async (book) => {
        if (!window.confirm(`Delete book "${book.name}"?`)) return;
        try {
            const token = localStorage.getItem('token');
            await deleteBook(book.id, token);
            setLocalBooks(displayBooks.filter(b => b.id !== book.id));
        } catch (err) {
            alert('Delete failed.');
        }
    };


    const handleEditChange = (e) => {
        setEditFields({ ...editFields, [e.target.name]: e.target.value });
    };


    const handleEditSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await updateBook(editingBook.id, editFields, token);
            setLocalBooks(displayBooks.map(b => b.id === editingBook.id ? { ...b, ...editFields } : b));
            setEditingBook(null);
        } catch (err) {
            alert('Update failed.');
        }
    };


    const handleEditCancel = () => setEditingBook(null);

    
    return (
        <div className="container py-5 mt-5 ">
            <h1 style={{ color: PRIMARY_COLOR, fontWeight: 'bold', textAlign: 'center' }}>Books you have purchased.</h1>
            {loading ? (
                <div className="text-center" style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: '1.2rem' }}>Loading...</div>
            ) : (
                <BookList books={filteredBooks} currentUser={currentUser} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {editingBook && (
                <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Book</h5>
                                <button type="button" className="btn-close" onClick={handleEditCancel}></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control mb-2" name="name" value={editFields.name} onChange={handleEditChange} placeholder="Name" />
                                <input className="form-control mb-2" name="category" value={editFields.category} onChange={handleEditChange} placeholder="Category" />
                                <input className="form-control mb-2" name="price" value={editFields.price} onChange={handleEditChange} placeholder="Price" type="number" />
                                <textarea className="form-control mb-2" name="description" value={editFields.description} onChange={handleEditChange} placeholder="Description" />
                                <input className="form-control mb-2" name="imageUrl" value={editFields.imageUrl} onChange={handleEditChange} placeholder="Image URL" />
                                <input className="form-control mb-2" name="bookUrl" value={editFields.bookUrl} onChange={handleEditChange} placeholder="Book URL" />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleEditSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyHistory; 