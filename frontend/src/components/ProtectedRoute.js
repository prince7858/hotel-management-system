// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate to handle redirection
import { useAuth } from '../context/AuthContext'; // Import the AuthContext to access the user state

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Access the 'user' from the AuthContext

    if (!user) {
        // If user is not logged in, redirect them to the login page
        return <Navigate to="/login" />;
    }

    // If user is logged in, render the requested page (children)
    return children;
};

export default ProtectedRoute;
