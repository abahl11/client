// client/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    setLoading(false);
  }, []);

  // Register user
  const register = async (formData) => {
    const response = await axios.post('/api/users', formData);
    
    // Save token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
    setUser(response.data);
    
    return response.data;
  };

  // Login user
  const login = async (email, password) => {
    const response = await axios.post('/api/users/login', { email, password });
    
    // Save token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
    setUser(response.data);
    
    return response.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
    
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    const response = await axios.put('/api/users/profile', userData);
    
    // Update stored user data
    localStorage.setItem('user', JSON.stringify(response.data));
    
    setUser(response.data);
    
    return response.data;
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
