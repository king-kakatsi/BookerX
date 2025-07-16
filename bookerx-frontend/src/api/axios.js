
/**
 * Axios instance for API calls to BookerX backend.
 * Configures baseURL and default headers.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5170', // Backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
