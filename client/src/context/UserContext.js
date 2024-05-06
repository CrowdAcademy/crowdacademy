import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    console.log(`Token from local storage: ${token}`);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await fetch('/account/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUser(data);
                    } else {
                        console.error('Failed to fetch user:', data);
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
            }
        };

        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
