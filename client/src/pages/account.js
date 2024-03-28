import React, { useEffect, useState } from 'react';

export default function AccountPage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve user data from the server using the stored JWT token
                const token = localStorage.getItem('token');
                const response = await fetch('/users/account', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while fetching user data.');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Welcome, {userData.username}!</h2>
            <p>Email: {userData.email}</p>
            {/* Other user information can be displayed here */}
        </div>
    );
}
