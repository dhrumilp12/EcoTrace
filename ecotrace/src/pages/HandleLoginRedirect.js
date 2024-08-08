import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HandleLoginRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Extract token from URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        
        if (token) {
            localStorage.setItem('token', token);
            navigate('/home'); // Redirect to home page or dashboard
        } else {
            navigate('/login', { replace: true });
        }
    }, [location, navigate]);

    return null; // This component does not render anything
};

export default HandleLoginRedirect;