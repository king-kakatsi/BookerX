import api from '../api/axios';
import React, { useState } from 'react';

// %%%%%% HANDLE SUBMIT %%%%%%%%%%%%
/**
 * Handles the login form submission.
 * Prevents default, checks for empty fields, sends POST request to backend.
 * Parameters: event (form event), email, password, setError (state setter)
 * Returns: nothing
 * Example usage: onSubmit={e => handleSubmit(e, email, password, setError)}
 */
async function handleSubmit(event, email, password, setError) {
    event.preventDefault();
    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }
    try {
        const response = await api.post('/api/Auth/login', {
            email,
            password
        });
        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.token);
        setError('');
        // TODO: Redirect to dashboard or another page
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError('Login failed. Please try again.');
        }
    }
}
// %%%%%% END - HANDLE SUBMIT %%%%%%%%%%%%



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: 400 }}>
                {/* Desktop/tablet: shadow, border, rounded-4 */}
                <div className="card p-4 d-none d-sm-block shadow-lg border-0 rounded-4">
                    <h2 className="mb-4 text-center">Login</h2>
                    <form onSubmit={e => handleSubmit(e, email, password, setError)}>
                        <div className="mb-3" >
                            <label htmlFor="email" className="form-label">Email address</label>
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
                            <label htmlFor="password" className="form-label">Password</label>
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
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
                    </form>
                </div>
                {/* Mobile: no shadow, no border, more rounded */}
                <div className="card p-4 d-block d-sm-none shadow-none border-0 rounded-pill">
                    <h2 className="mb-4 text-center">Login</h2>
                    <form onSubmit={e => handleSubmit(e, email, password, setError)}>
                        <div className="mb-3">
                            <label htmlFor="email-mobile" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email-mobile"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-mobile" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-mobile"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
