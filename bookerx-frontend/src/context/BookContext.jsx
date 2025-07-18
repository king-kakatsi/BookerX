import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAllBooks, getPurchasedBookIds } from '../controllers/book_controller';

const BookContext = createContext();

export function useBookContext() {
    return useContext(BookContext);
}

export function BookProvider({ children }) {
    const [generalBooks, setGeneralBooks] = useState([]);
    const [purchasedBookIds, setPurchasedBookIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    // Get the current user from localStorage
    const currentUser = {
        id: parseInt(localStorage.getItem('userId') || '0', 10),
        role: localStorage.getItem('role') || ''
    };

    // Refresh all lists from the backend
    const refreshAll = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const books = await fetchAllBooks(token);
            setGeneralBooks(books);
            const ids = await getPurchasedBookIds(token);
            setPurchasedBookIds(ids);
            localStorage.setItem('purchasedBookIds', JSON.stringify(ids));
        } catch (err) {
            setGeneralBooks([]);
            setPurchasedBookIds([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load on first access or refresh
    useEffect(() => {
        refreshAll();
    }, [refreshKey, refreshAll]);

    // Method to force refresh (from navbar)
    const triggerRefresh = () => setRefreshKey(k => k + 1);

    // Filtered lists
    const myBooks = generalBooks.filter(b => b.authorId === currentUser.id);
    const myHistory = generalBooks.filter(b => purchasedBookIds.includes(b.id));

    // Local search
    function searchBooks(list) {
        if (!searchValue) return list;
        return list.filter(book =>
            (book.name || '').toLowerCase().includes(searchValue.toLowerCase()) ||
            (book.category || '').toLowerCase().includes(searchValue.toLowerCase()) ||
            (book.description || '').toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    return (
        <BookContext.Provider value={{
            generalBooks,
            myBooks,
            myHistory,
            purchasedBookIds,
            loading,
            searchValue,
            setSearchValue,
            refreshAll: triggerRefresh,
            currentUser,
            searchBooks
        }}>
            {children}
        </BookContext.Provider>
    );
} 