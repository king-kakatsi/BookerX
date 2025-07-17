/**
 * User controller: Handles all API calls and logic related to users (auth, registration, etc.).
 * Functions: loginUser, registerUser
 */
import api from '../api/axios';
import { PasswordHelper } from '../utils/PasswordHelper';



// %%%%%% LOGIN USER %%%%%%%%%%%%
/**
 * Log in a user with email and password.
 * Parameters:
 *   email (string): User's email
 *   password (string): User's password
 * Returns: Promise resolving to the response data (token, name, email, etc.)
 * Example usage: const data = await loginUser(email, password);
 */
export async function loginUser(email, password) {
    const response = await api.post('/api/Auth/login', { email, password });
    return response.data;
}
// %%%%%% END - LOGIN USER %%%%%%%%%%%%




// %%%%%% REGISTER USER %%%%%%%%%%%%
/**
 * Register a new user with name, email, and password.
 * Validates password strength using PasswordHelper.
 * Parameters:
 *   name (string): User's full name
 *   email (string): User's email
 *   password (string): User's password
 * Returns: Promise resolving to the response data (token, name, email, etc.)
 * Throws: Error if password is invalid
 * Example usage: const data = await registerUser(name, email, password);
 */
export async function registerUser(name, email, password) {
    const validation = PasswordHelper.validate(password);
    if (!validation.isValid) {
        throw new Error(validation.error);
    }
    const response = await api.post('/api/Auth/register', { name, email, password });
    return response.data;
}
// %%%%%% END - REGISTER USER %%%%%%%%%%%% 