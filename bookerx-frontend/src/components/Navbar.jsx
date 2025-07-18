import React, { useState } from 'react';
import bookerxLogo from '../assets/bookerx_logo.png';
import menuIcon from '../assets/menu.png';
import refreshIcon from '../assets/refresh.png';
import { NavLink } from 'react-router-dom';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR } from '../theme/colors';

/**
 * Navbar component using Bootstrap's responsive collapse.
 * The search form is only visible if showSearch is true.
 * @param {boolean} showSearch - Whether to display the search form.
 * @param {function} onSearch - Callback for search input change. Receives the search value.
 * Example usage: <Navbar showSearch={true} onSearch={handleSearch} />
 */
function Navbar({ showSearch, onSearch, onRefresh }) {
    const navBg = { backgroundColor: BACKGROUND_COLOR };
    const brandStyle = { color: PRIMARY_COLOR, fontWeight: 'bold' };
    const activeLink = { color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: '1.25rem' };
    const inactiveLink = { color: SECONDARY_COLOR };

    // %%%%%% SEARCH INPUT STATE %%%%%%%%%%%%
    /**
     * State for the search input value in the navbar.
     */
    const [searchInput, setSearchInput] = useState('');
    // %%%%%% END - SEARCH INPUT STATE %%%%%%%%%%%%



    // %%%%%% HANDLE SEARCH INPUT CHANGE %%%%%%%%%%%%
    /**
     * Handles the search input change and calls onSearch immediately.
     * Parameters: event (input event)
     * Returns: nothing
     * Example usage: onChange={handleSearchInputChange}
     */
    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
        if (onSearch) {
            onSearch(value);
        }
    };
    // %%%%%% END - HANDLE SEARCH INPUT CHANGE %%%%%%%%%%%%


    
    // %%%%%% CHECK IF USER IS LOGGED IN %%%%%%%%%%%%
    /**
     * Check if user is logged in.
     * Returns true if a token exists in localStorage.
     * Example usage: if (isLoggedIn()) { ... }
     */
    function isLoggedIn() {
        const token = localStorage.getItem('token');
        return !!token && token !== 'undefined' && token !== 'null';
    }
    // %%%%%% END - CHECK IF USER IS LOGGED IN %%%%%%%%%%%%


    return (
        <nav className="navbar navbar-expand-lg" style={navBg}>
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center me-5" to="/" style={brandStyle}>
                    <img src={bookerxLogo} alt="BookerX Logo" width="42" height="42" className="me-2" />
                    <span className="fs-3">BookerX</span>
                </NavLink>

                <button
                    className="navbar-toggler border-0 p-1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ width: '32px', height: '32px' }}
                >
                    <img src={menuIcon} alt="Menu" style={{ width: 28, height: 28, display: 'block', margin: 'auto' }} />
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                                end
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        {isLoggedIn() && (
                            <>
                        <li className="nav-item">
                            <NavLink
                                to="/my-books"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                            >
                                My Books
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/my-history"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                            >
                                My History
                            </NavLink>
                        </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/book/add"
                                        style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                        className="nav-link"
                                    >
                                        Add Book
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/logout"
                                        style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                        className="nav-link"
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {!isLoggedIn() && (
                            <>
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/register"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                            >
                                Register
                            </NavLink>
                        </li>
                            </>
                        )}

                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                                end
                            >
                                About us
                            </NavLink>
                        </li>
                    </ul>
                    {showSearch && (
                        <div className="d-flex align-items-center" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                            <button
                                type="button"
                                className="border-0 ms-1 align-items-center justify-content-center"
                                style={{ borderRadius: '50%', background: PRIMARY_COLOR, width: 36, height: 36, display: 'flex' }}
                                onClick={onRefresh}
                                title="Refresh book list"
                            >
                                <img src={refreshIcon} alt="Refresh" style={{ width: 20, height: 20 }} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
