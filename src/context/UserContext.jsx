import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { getBasePathForRole } from '../utils/helper';

// 1. Create the context
const UserContext = createContext();

// 2. Create the Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [basePath, setBasePath] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    // If a token exists, fetch the user's profile
                    const response = await apiClient.get('/api/profile/me');
                    const data = response.data.data;
                    setUser(data);
                    setIsAuthenticated(true);
                    setBasePath(getBasePathForRole(data?.role))
                } catch (error) {
                    // If the token is invalid, log the user out
                    console.error("Invalid token, logging out.", error);
                    localStorage.removeItem('authToken');
                    setIsAuthenticated(false);
                    setUser(null);
                    setBasePath('');
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (token) => {
        localStorage.setItem('authToken', token);
        try {
            const response = await apiClient.get('/api/profile/me');
            const userData = response.data.data;

            setUser(userData);
            setIsAuthenticated(true);

            return userData;
        } catch (error) {
            console.error("Failed to fetch user after login", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    const value = { user, isAuthenticated, loading, basePath, login, logout, setUser, setIsAuthenticated };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
};

// 3. Create a custom hook for easy access
export const useUser = () => {
    return useContext(UserContext);
};