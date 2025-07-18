import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyBooks from './pages/MyBooks';
import Register from './pages/Register';
import Logout from './pages/Logout';
import BookForm from './pages/BookForm';
import { BookFormAction } from './utils/enums';
import React, { useState } from 'react';
import AboutUs from './pages/AboutUs';
import LandingFooter from './components/LandingFooter';
import MyHistory from './pages/MyHistory';
import { BookProvider, useBookContext } from './context/BookContext';

function AppRoutes() {
    const location = useLocation();
    const { searchValue, setSearchValue, refreshAll, generalBooks, myBooks, myHistory, currentUser, loading, searchBooks } = useBookContext();
    // Show search only on dashboard ("/" or "/dashboard") and my-books and my-history
    const showSearch = ["/", "/dashboard", "/my-books", "/my-history"].includes(location.pathname);
    // Global username state
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || '';
    });
    // Function to update username after login
    const handleLoginSuccess = (username) => {
        setUsername(username);
        localStorage.setItem('username', username);
    };
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <>
            <Navbar showSearch={showSearch} onSearch={setSearchValue} onRefresh={refreshAll} />
            <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard username={username} books={generalBooks} loading={loading} currentUser={currentUser} searchBooks={searchBooks} searchValue={searchValue} refreshAll={refreshAll} /> : <Navigate to="/about" replace />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard username={username} books={generalBooks} loading={loading} currentUser={currentUser} searchBooks={searchBooks} searchValue={searchValue} refreshAll={refreshAll} /> : <Navigate to="/about" replace />} />
                <Route path="/my-books" element={<MyBooks books={myBooks} loading={loading} currentUser={currentUser} searchBooks={searchBooks} searchValue={searchValue} refreshAll={refreshAll} />} />
                <Route path="/my-history" element={<MyHistory books={myHistory} loading={loading} currentUser={currentUser} searchBooks={searchBooks} searchValue={searchValue} refreshAll={refreshAll} />} />
                <Route path="/book/add" element={<BookForm mode={BookFormAction.ADD} />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            {location.pathname !== '/about' && <LandingFooter />}
        </>
    );
}

export default function App() {
    return (
        <BookProvider>
            <AppRoutes />
        </BookProvider>
    );
}
