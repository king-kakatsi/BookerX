import bookerxLogo from '../assets/bookerx_logo.png';
import { NavLink } from 'react-router-dom';
import { 
    NAVBAR_BG, 
    NAVBAR_BRAND, 
    NAVBAR_LINK_ACTIVE, 
    NAVBAR_LINK_INACTIVE, 
    SEARCH_BUTTON_BG 
} from '../theme/colors';

/**
 * Navbar component using Bootstrap's responsive collapse.
 * The search form is only visible if showSearch is true.
 * @param {boolean} showSearch - Whether to display the search form.
 * Example usage: <Navbar showSearch={true} />
 */
function Navbar({ showSearch }) {
    const navBg = { backgroundColor: NAVBAR_BG };
    const brandStyle = { color: NAVBAR_BRAND, fontWeight: 'bold' };
    const activeLink = { color: NAVBAR_LINK_ACTIVE, fontWeight: 'bold', fontSize: '1.25rem' };
    const inactiveLink = { color: NAVBAR_LINK_INACTIVE };
    const searchBtn = { backgroundColor: SEARCH_BUTTON_BG, borderColor: SEARCH_BUTTON_BG, color: '#fff' };
    return (
        <nav className="navbar navbar-expand-lg" style={navBg}>
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center" to="/" style={brandStyle}>
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
                    <span className="navbar-toggler-icon"></span>
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
                                Home
                            </NavLink>
                        </li>
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
                        <li className="nav-item">
                            <NavLink
                                to="/logout"
                                style={({ isActive }) => isActive ? activeLink : inactiveLink}
                                className="nav-link"
                            >
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                    {showSearch && (
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" type="submit" style={searchBtn}>Search</button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
