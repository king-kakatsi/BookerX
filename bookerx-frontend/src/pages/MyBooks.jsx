import React, { useEffect, useState } from 'react';
import { BACKGROUND_COLOR, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_RADIUS_MEDIUM, BORDER_RADIUS_LARGE } from '../theme/colors';
import { searchForBook, fetchMyBooks } from '../controllers/book_controller';

/**
 * My Books page component. Displays the user's personal book collection as a responsive card grid.
 * Props:
 *   searchValue (string): The current search value to filter books (optional).
 * Example usage: <MyBooks searchValue={searchValue} />
 */
function MyBooks({ searchValue = '' }) {
    /**
     * List of user's books fetched from the backend.
     */
    const [books, setBooks] = useState([]);
    
    /**
     * Fetches user's books from the backend API on mount using the book controller.
     * No parameters.
     * Returns nothing.
     * Example usage: useEffect(fetchBooks, [])
     */
    useEffect(() => {
        async function fetchBooks() {
            try {
                const token = localStorage.getItem('token');
                const data = await fetchMyBooks(token);
                setBooks(data);
            } catch (err) {
                setBooks([]);
            }
        }
        fetchBooks();
    }, []);
    
    /**
     * Filters books by search value using the searchForBook utility.
     * Returns filtered array of books.
     */
    const filteredBooks = searchForBook(books, searchValue);
    
    return (
        <div className="container py-5 mt-5">
            <h1 style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>My Books</h1>
            <p style={{ color: TEXT_SECONDARY }}>Your personal book collection.</p>
            {/* Responsive book card grid */}
            <div className="row g-4 justify-content-center mt-3">
                {filteredBooks.length === 0 ? (
                    <div className="text-center" style={{ color: TEXT_SECONDARY, fontWeight: 'bold', fontSize: '1.2rem' }}>No books found.</div>
                ) : (
                    filteredBooks.map(book => (
                        <div key={book.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                            <div className="card shadow-sm w-100 h-100" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_LARGE, minHeight: 220 }}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title mb-2" style={{ color: TEXT_PRIMARY, fontWeight: 'bold', fontSize: '1.3rem' }}>{book.name}</h5>
                                        <div className="mb-1" style={{ color: TEXT_SECONDARY, fontWeight: 'bold', fontSize: '1.1rem' }}>{book.category}</div>
                                        <div className="mb-2" style={{ color: TEXT_PRIMARY, fontWeight: 'bold', fontSize: '1.1rem' }}>${book.price}</div>
                                        <div className="mb-2" style={{ color: TEXT_SECONDARY, fontSize: '1rem', minHeight: 48, overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyBooks;
// %%%%%% END - MY BOOKS PAGE COMPONENT %%%%%%%%%%%% 