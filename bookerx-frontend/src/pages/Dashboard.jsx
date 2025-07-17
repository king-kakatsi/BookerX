import React, { useEffect, useState } from 'react';
import { BACKGROUND_COLOR, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_RADIUS_MEDIUM, BORDER_RADIUS_LARGE } from '../theme/colors';
import { searchForBook, fetchAllBooks } from '../controllers/book_controller';
import refreshIcon from '../assets/refresh.png';

// %%%%%% DASHBOARD PAGE COMPONENT %%%%%%%%%%%%
/**
 * Dashboard page component. Displays the main dashboard/home for BookerX, including a responsive book grid.
 * Props:
 *   username (string): The username to display in the welcome message.
 *   searchValue (string): The current search value to filter books (optional).
 * Example usage: <Dashboard username="JohnDoe" searchValue={searchValue} />
 */
function Dashboard({ username, searchValue = '', refreshKey }) {
    /**
     * List of all books fetched from the backend.
     */
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * Fetches all books from the backend API using the book controller.
     * No parameters.
     * Returns nothing.
     * Example usage: useEffect(fetchBooks, [])
     */
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const data = await fetchAllBooks(token);
            setBooks(data);
        } catch (err) {
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [refreshKey]);

    /**
     * Filters books by search value using the searchForBook utility.
     * Returns filtered array of books.
     */
    const filteredBooks = searchForBook(books, searchValue);

    return (
        <div className="container py-5 mt-5">
            {/* Welcome message, no background */}
            {username && (
                <div className="mb-2" style={{ fontSize: '2.2rem', fontWeight: 'bold', color: TEXT_PRIMARY }}>
                    Hi, {username}
                </div>
            )}
            <h1 className="text-center mb-4" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>Welcome to BookerX!</h1>
            {/* Responsive book card grid */}
            <div className="row g-4 justify-content-center">
                {loading ? (
                    <div className="text-center" style={{ color: TEXT_SECONDARY, fontWeight: 'bold', fontSize: '1.2rem' }}>Loading...</div>
                ) : filteredBooks.length === 0 ? (
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

export default Dashboard;
// %%%%%% END - DASHBOARD PAGE COMPONENT %%%%%%%%%%%% 