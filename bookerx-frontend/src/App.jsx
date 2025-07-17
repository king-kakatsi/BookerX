import { Routes, Route, useLocation } from 'react-router-dom';
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

export default function App() {
    const location = useLocation();
    // Show search only on dashboard ("/" or "/dashboard") and my-books
    const showSearch = ["/", "/dashboard", "/my-books"].includes(location.pathname);

    // Global username state
    const [username, setUsername] = useState(() => {
        // Try to get from localStorage (persist after refresh)
        return localStorage.getItem('username') || '';
    });

    // %%%%%% SEARCH VALUE STATE %%%%%%%%%%%%
    const [searchValue, setSearchValue] = useState('');
    // %%%%%% END - SEARCH VALUE STATE %%%%%%%%%%%%

    // %%%%%% REFRESH TRIGGER STATE %%%%%%%%%%%%
    /**
     * State to trigger a refresh in Dashboard (and optionally MyBooks).
     */
    const [refreshKey, setRefreshKey] = useState(0);
    // %%%%%% END - REFRESH TRIGGER STATE %%%%%%%%%%%%

    // %%%%%% HANDLE REFRESH %%%%%%%%%%%%
    /**
     * Triggers a refresh by updating the refreshKey.
     */
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };
    // %%%%%% END - HANDLE REFRESH %%%%%%%%%%%%

    // %%%%%% HANDLE SEARCH CHANGE %%%%%%%%%%%%
    const handleSearchChange = (value) => {
        setSearchValue(value);
    };
    // %%%%%% END - HANDLE SEARCH CHANGE %%%%%%%%%%%%

    // Function to update username after login
    const handleLoginSuccess = (username) => {
        setUsername(username);
        localStorage.setItem('username', username);
    };

    return (
        <>
            <Navbar showSearch={showSearch} onSearch={handleSearchChange} onRefresh={handleRefresh} />
            <Routes>
                <Route path="/" element={<Dashboard username={username} searchValue={searchValue} refreshKey={refreshKey} />} />
                <Route path="/dashboard" element={<Dashboard username={username} searchValue={searchValue} refreshKey={refreshKey} />} />
                <Route path="/my-books" element={<MyBooks searchValue={searchValue} />} />
                <Route path="/book/add" element={<BookForm mode={BookFormAction.ADD} />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
}
