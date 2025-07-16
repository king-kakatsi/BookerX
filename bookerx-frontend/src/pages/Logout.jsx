import { useNavigate } from 'react-router-dom';
import React from 'react';

// %%%%%% LOGOUT PAGE COMPONENT %%%%%%%%%%%%
/**
 * Logout page component. Clears token and redirects to login.
 * Example usage: <Logout />
 */
function Logout() {
    const navigate = useNavigate();
    React.useEffect(() => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    }, [navigate]);
    return null;
}

export default Logout;
// %%%%%% END - LOGOUT PAGE COMPONENT %%%%%%%%%%%% 