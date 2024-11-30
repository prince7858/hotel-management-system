import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Login user
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    const { token, user } = response.data;
    localStorage.setItem('authToken', token);  // Store token in localStorage
    return user;
};

// Signup user
export const signupUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    return response.data;
};
