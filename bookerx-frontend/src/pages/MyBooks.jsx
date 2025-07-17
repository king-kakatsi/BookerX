import React, { useEffect, useState } from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR } from '../theme/colors';
import { searchForBook, fetchMyBooks } from '../controllers/book_controller';
import BookList from '../components/BookList';



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
        <div className="container py-5 mt-5 ">
            <h1 style={{ color: PRIMARY_COLOR, fontWeight: 'bold', textAlign: 'center' }}>Your personal book collection.</h1>
            
            <BookList books={filteredBooks} currentUser={{}} />
        </div>
    );
}

export default MyBooks;
