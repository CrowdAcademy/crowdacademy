import React from 'react';
import { useUser } from '../../context/UserContext';

export default function AccountDetails() {
    const { user, loading } = useUser();

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return user ? (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    ) : (
        <p>No user data available.</p>
    );
}
