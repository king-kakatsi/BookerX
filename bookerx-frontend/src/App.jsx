import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyBooks from './pages/MyBooks';
import Register from './pages/Register';
import Logout from './pages/Logout';
import React from 'react';

export default function App() {
    const location = useLocation();
    // Show search only on dashboard ("/" or "/dashboard") and my-books
    const showSearch = ["/", "/dashboard", "/my-books"].includes(location.pathname);
    return (
        <>
            <Navbar showSearch={showSearch} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-books" element={<MyBooks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
}
