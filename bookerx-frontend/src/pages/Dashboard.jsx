import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme/colors';
import BookList from '../components/BookList';

/**
 * Dashboard page component. Displays the main dashboard/home for BookerX, including a responsive book grid.
 * Props:
 *   books: array of all books
 *   loading: boolean
 *   currentUser: user object
 *   searchBooks: function to filter books
 *   searchValue: string
 *   refreshAll: function to refresh all books
 *   username: string
 */
function Dashboard({ username, books, loading, currentUser, searchBooks }) {
    const filteredBooks = searchBooks(books);
    return (
        <div className="container py-3 mt-2">
            {username && username.trim() !== '' && (
                <div className="mb-2 text-center" style={{ fontSize: '2.2rem', fontWeight: 'bold', color: PRIMARY_COLOR }}>
                    Hi, {username}
                </div>
            )}
            <h1 className="text-center mb-4" style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Welcome to BookerX!</h1>
            {loading ? (
                <div className="text-center" style={{ color: SECONDARY_COLOR, fontWeight: 'bold', fontSize: '1.2rem' }}>Loading...</div>
            ) : (
                <BookList books={filteredBooks} currentUser={currentUser} />
            )}
        </div>
    );
}

export default Dashboard;
