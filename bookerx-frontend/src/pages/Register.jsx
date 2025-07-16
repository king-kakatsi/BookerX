import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
    BACKGROUND_COLOR, 
    TEXT_PRIMARY, 
    TEXT_SECONDARY, 
    BUTTON_SECONDARY_BG, 
    BUTTON_TEXT, 
    BORDER_RADIUS_MEDIUM, 
    BORDER_RADIUS_LARGE,
    BORDER_RADIUS_SMALL 
} from '../theme/colors';

// %%%%%% REGISTER PAGE COMPONENT %%%%%%%%%%%%
/**
 * Register page component. Handles user registration with Bootstrap styling and validation.
 * Example usage: <Register />
 */
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // %%%%%% HANDLE REGISTER SUBMIT %%%%%%%%%%%%
    /**
     * Handles the registration form submission.
     * Validates fields, sends POST request to backend, handles errors and success.
     * Parameters: event (form event)
     * Returns: nothing
     * Example usage: onSubmit={handleRegister}
     */
    async function handleRegister(event) {
        event.preventDefault();
        setError('');
        setSuccess('');
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await api.post('/api/Auth/register', { email, password });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    }
    // %%%%%% END - HANDLE REGISTER SUBMIT %%%%%%%%%%%%

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: 400 }}>
                {/* Desktop/tablet: surface background, no shadow, no border */}
                <div className="card p-4 d-none d-sm-block" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_MEDIUM }}>
                    <h2 className="mb-4 text-center" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: TEXT_SECONDARY }}>Email address</label>
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
                            <label htmlFor="password" className="form-label" style={{ color: TEXT_SECONDARY }}>Password</label>
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
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label" style={{ color: TEXT_SECONDARY }}>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        {success && <div className="alert alert-success py-2">{success}</div>}
                        <button type="submit" className="w-100 mt-2" style={{ backgroundColor: BUTTON_SECONDARY_BG, color: BUTTON_TEXT, borderColor: BUTTON_SECONDARY_BG, fontWeight: 'bold', borderRadius: BORDER_RADIUS_SMALL, padding: '0.5rem 0' }}>Register</button>
                    </form>
                </div>
                {/* Mobile: surface background, no border, more rounded */}
                <div className="card p-4 d-block d-sm-none border-0" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_LARGE }}>
                    <h2 className="mb-4 text-center" style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: TEXT_SECONDARY }}>Email address</label>
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
                            <label htmlFor="password" className="form-label" style={{ color: TEXT_SECONDARY }}>Password</label>
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
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label" style={{ color: TEXT_SECONDARY }}>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        {success && <div className="alert alert-success py-2">{success}</div>}
                        <button type="submit" className="w-100 mt-2" style={{ backgroundColor: BUTTON_SECONDARY_BG, color: BUTTON_TEXT, borderColor: BUTTON_SECONDARY_BG, fontWeight: 'bold', borderRadius: BORDER_RADIUS_SMALL, padding: '0.5rem 0' }}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
// %%%%%% END - REGISTER PAGE COMPONENT %%%%%%%%%%%% 