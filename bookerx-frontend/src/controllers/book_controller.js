/**
 * Book controller: Handles all API calls and logic related to books.
 * Functions: fetchAllBooks, fetchMyBooks, createBook, updateBook, deleteBook, searchForBook
*/

import api from '../api/axios';
import { logoutUser } from './user_controller';



// %%%%%% FETCH ALL BOOKS %%%%%%%%%%%%
/**
 * Fetch all books from the backend API.
 * No parameters.
 * Returns: Promise resolving to an array of book objects.
 * Example usage: const books = await fetchAllBooks(token);
 */
export async function fetchAllBooks(token) {
    try {
        const response = await api.get('/api/Book'); // No auth header
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            logoutUser();
        }
        throw err;
    }
}
// %%%%%% END - FETCH ALL BOOKS %%%%%%%%%%%%




// %%%%%% FETCH MY BOOKS %%%%%%%%%%%%
/**
 * Fetch books belonging to the current user from the backend API.
 * Parameters: token (string) - JWT token for authentication
 * Returns: Promise resolving to an array of book objects.
 * Example usage: const books = await fetchMyBooks(token);
 */
export async function fetchMyBooks(token) {
    try {
        const response = await api.get('/api/Book/mine', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            logoutUser();
        }
        throw err;
    }
}
// %%%%%% END - FETCH MY BOOKS %%%%%%%%%%%%




// %%%%%% CREATE BOOK %%%%%%%%%%%%
/**
 * Create a new book in the backend.
 * Parameters: book (object) - book data, token (string) - JWT token
 * Returns: Promise resolving to the created book object.
 * Example usage: const newBook = await createBook(book, token);
 */
export async function createBook(book, token) {
    try {
        const response = await api.post('/api/Book', book, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            logoutUser();
        }
        throw err;
    }
}
// %%%%%% END - CREATE BOOK %%%%%%%%%%%%




// %%%%%% UPDATE BOOK %%%%%%%%%%%%
/**
 * Update an existing book in the backend.
 * Parameters: id (number), book (object), token (string)
 * Returns: Promise resolving to the updated book object.
 * Example usage: const updated = await updateBook(id, book, token);
 */
export async function updateBook(id, book, token) {
    try {
        const response = await api.put(`/api/Book/${id}`, book, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            logoutUser();
        }
        throw err;
    }
}
// %%%%%% END - UPDATE BOOK %%%%%%%%%%%%




// %%%%%% DELETE BOOK %%%%%%%%%%%%
/**
 * Delete a book by ID in the backend.
 * Parameters: id (number), token (string)
 * Returns: Promise resolving to the backend response.
 * Example usage: await deleteBook(id, token);
 */
export async function deleteBook(id, token) {
    try {
        const response = await api.delete(`/api/Book/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            logoutUser();
        }
        throw err;
    }
}
// %%%%%% END - DELETE BOOK %%%%%%%%%%%%




// %%%%%% SEARCH FOR BOOK %%%%%%%%%%%%
/**
 * Search for books by a search value using the SearchHelper property.
 * @param {Array} books - Array of book objects (must have searchHelper)
 * @param {string} searchValue - The search string to filter by
 * @returns {Array} Filtered array of books
 * Example: searchForBook(books, "harry potter")
 */
export function searchForBook(books, searchValue) {
    if (!searchValue) return books;
    return books.filter(book =>
        book.searchHelper?.toLowerCase().includes(searchValue.toLowerCase())
    );
}
// %%%%%% END - SEARCH FOR BOOK %%%%%%%%%%%% 