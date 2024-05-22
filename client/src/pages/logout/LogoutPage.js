import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const referrerRef = useRef();

    useEffect(() => {
        referrerRef.current = document.referrer;
    }, []);

    const from = referrerRef.current || location.state?.from?.pathname || '/auth';

    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token');

            if (!token) navigate(from);

            try {
                const response = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    localStorage.removeItem('token');
                    navigate(from);
                } else {
                    console.error('Failed to log out');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logout();
    }, [navigate, from]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutPage;
