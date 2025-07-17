// %%%%%% PASSWORD HELPER CLASS %%%%%%%%%%%%
/**
 * PasswordHelper: Utility class for password validation.
 * Provides static methods to validate password strength.
 */
export class PasswordHelper {
    /**
     * Validates a password for minimum requirements.
     * - At least 8 characters
     * - At least one uppercase letter
     * - At least one lowercase letter
     * - At least one number
     * - At least one symbol
     * @param {string} password - The password to validate
     * @returns {object} { isValid: boolean, error: string|null }
     * Example: PasswordHelper.validate('Test@123')
     */
    static validate(password) {
        if (!password || password.length < 8) {
            return { isValid: false, error: 'Password must be at least 8 characters.' };
        }
        if (!/[A-Z]/.test(password)) {
            return { isValid: false, error: 'Password must contain at least one uppercase letter.' };
        }
        if (!/[a-z]/.test(password)) {
            return { isValid: false, error: 'Password must contain at least one lowercase letter.' };
        }
        if (!/[0-9]/.test(password)) {
            return { isValid: false, error: 'Password must contain at least one number.' };
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return { isValid: false, error: 'Password must contain at least one symbol.' };
        }
        return { isValid: true, error: null };
    }
}
// %%%%%% END - PASSWORD HELPER CLASS %%%%%%%%%%%% 