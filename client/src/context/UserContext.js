import React, { createContext, useContext, useState, useEffect } from 'react';
import avatarDefault from '../assets/avatar-default.svg';

const UserContext = createContext({ user: null, loading: true });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                console.log('Token found:', token);
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
                        // Set default avatar if user does not have a bio or avatar
                        if (!data.profile) {
                            data.profile = { avatar: avatarDefault };
                        } else if (!data.profile.avatar) {
                            data.profile.avatar = avatarDefault;
                        }

                        setUser(data);
                    } else {
                        console.error('Failed to fetch user:', data);
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
            } else {
                console.log('No token found');
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};
