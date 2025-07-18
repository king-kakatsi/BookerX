import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../controllers/user_controller';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR, WHITE, SECONDARY_SURFACE } from '../theme/colors';




/**
 * Login page component. Handles user authentication form.
 * Displays a responsive Bootstrap form for email and password.
 * Example usage: <Login />
 */
function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    
    // %%%%%% HANDLE SUBMIT %%%%%%%%%%%%
    /**
     * Handles the login form submission using the user controller.
     * Prevents default, checks for empty fields, calls loginUser.
     * Parameters: event (form event)
     * Returns: nothing
     * Example usage: onSubmit={handleSubmit}
     */
    async function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            setError('Please enter both your email and password.');
            return;
        }
        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.name); // Ajouté pour stocker le nom
            if (data.id) {
                localStorage.setItem('userId', data.id);
            }
            setError('');
            if (onLoginSuccess && data.name) {
                onLoginSuccess(data.name);
            }
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError('Login failed: ' + err.response.data.message);
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        }
    }
    // %%%%%% END - HANDLE SUBMIT %%%%%%%%%%%%




    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: 400 }}>
                {/* Desktop/tablet: surface background, no shadow, no border */}
                <div className="card p-4 d-none border shadow d-sm-block" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: 10 }}>
                    <h2 className="mb-4 text-center" style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3" >
                            <label htmlFor="email" className="form-label" style={{ color: SECONDARY_COLOR }}>Email address</label>
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: SECONDARY_COLOR }}>Password</label>
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger py-2 text-center" style={{ fontWeight: 'bold', fontSize: '1rem' }}>{error}</div>}
                        <button type="submit" className="w-100 mt-2 shadow-0 border-0" style={{ backgroundColor: SECONDARY_SURFACE, color: WHITE, border: 'none', fontWeight: 'bold', borderRadius: 24, padding: '0.5rem 0' }}>Login</button>
                    </form>
                </div>
                {/* Mobile: surface background, no shadow, no border, more rounded */}
                <div className="card p-4 d-block d-sm-none border-0" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: 20 }}>
                    <h2 className="mb-4 text-center" style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email-mobile" className="form-label" style={{ color: SECONDARY_COLOR }}>Email address</label>
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="email-mobile"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-mobile" className="form-label" style={{ color: SECONDARY_COLOR }}>Password</label>
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="password-mobile"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger py-2 text-center" style={{ fontWeight: 'bold', fontSize: '1rem' }}>{error}</div>}
                        <button type="submit" className="w-100 mt-2 shadow-0 border-0" style={{ backgroundColor: SECONDARY_SURFACE, color: WHITE, border: 'none', fontWeight: 'bold', borderRadius: 24, padding: '0.5rem 0' }}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
