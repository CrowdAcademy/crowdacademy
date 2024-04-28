import React from 'react';
import { useUser } from '../../context/UserContext';

export default function AccountDetails() {
    const user = useUser();

    return user ? (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    ) : (
        <p>Loading user data...</p>
    );
}
