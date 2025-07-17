import React, { useEffect, useState } from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR } from '../theme/colors';
import { searchForBook, fetchAllBooks } from '../controllers/book_controller';
import refreshIcon from '../assets/refresh.png';
import BookList from '../components/BookList';


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
                <div className="mb-2" style={{ fontSize: '2.2rem', fontWeight: 'bold', color: PRIMARY_COLOR }}>
                    Hi, {username}
                </div>
            )}
            <h1 className="text-center mb-4" style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Welcome to BookerX!</h1>
            {loading ? (
                <div className="text-center" style={{ color: SECONDARY_COLOR, fontWeight: 'bold', fontSize: '1.2rem' }}>Loading...</div>
            ) : (
                <BookList books={filteredBooks} currentUser={{}} />
            )}
        </div>
    );
}

export default Dashboard;
