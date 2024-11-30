// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth to update context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setAuthToken } = useAuth(); // Use the context to set user and token
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Make an API call to login (replace this with actual API logic)
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage and set context
                localStorage.setItem('authToken', data.token);
                setAuthToken(data.token); // Set token in context
                setUser(data.user); // Set user in context

                // Redirect to the home page or dashboard
                navigate('/home');
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
