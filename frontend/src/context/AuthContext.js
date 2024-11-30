// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom hook to access authentication data
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component that will wrap the whole app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Will store user data
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));  // Get token from localStorage

    useEffect(() => {
        // You can fetch the user info from the backend here if the token exists
        if (authToken) {
            // Example: Call an API to get user details using the authToken
            // fetchUserData(authToken).then((data) => setUser(data));
        }
    }, [authToken]);

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('authToken');  // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, setUser, authToken, setAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
