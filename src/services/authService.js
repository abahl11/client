import axios from 'axios';

const API_URL = '/api/users';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }
  
  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  
  // Remove axios default header
  delete axios.defaults.headers.common['Authorization'];
};

// Get user profile
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

// Update user profile
const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData);
  
  if (response.data) {
    // Update stored user data
    const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...response.data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile
};

export default authService;
