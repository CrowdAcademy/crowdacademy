import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';


export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Wrap children in the UserProvider to provide user data context
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}
