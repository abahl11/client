// client/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import ReviewList from '../components/ReviewList';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    university: '',
    hometown: '',
    bio: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || '',
        university: user.university || '',
        hometown: user.hometown || '',
        bio: user.bio || '',
        contactNumber: user.contactNumber || '',
        password: '',
        confirmPassword: ''
      });
    }
    
    // Fetch user reviews
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/user/${user._id}`);
        setReviews(response.data.reviews);
        setLoadingReviews(false);
      } catch (err) {
        console.error('Failed to fetch reviews', err);
        setLoadingReviews(false);
      }
    };
    
    fetchReviews();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords if provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      // Only include password if it's provided
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      delete updateData.confirmPassword;
      
      await updateProfile(updateData);
      setSuccess('Profile updated successfully');
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactNumber" className="block text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="university" className="block text-gray-700 mb-1">University</label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="hometown" className="block text-gray-700 mb-1">Hometown</label>
                  <input
                    type="text"
                    id="hometown"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="bio" className="block text-gray-700 mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                <p className="text-gray-600 text-sm mb-4">Leave blank to keep your current password</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center mb-4">
              <img 
                src={user?.profilePicture || 'https://via.placeholder.com/150'} 
                alt={user?.username} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold">{user?.fullName}</h2>
              <p className="text-gray-600">@{user?.username}</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="mb-2">
                <span className="font-semibold">University:</span> {user?.university}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Hometown:</span> {user?.hometown}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Member Since:</span> {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            
            {loadingReviews ? (
              <p className="text-center text-gray-600">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-center text-gray-600">No reviews yet</p>
            ) : (
              <div className="space-y-4">
                {Array.isArray(reviews) && reviews.map(review => (
                  <div key={review._id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <img 
                        src={review.reviewer.profilePicture || 'https://via.placeholder.com/40'} 
                        alt={review.reviewer.username} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium">{review.reviewer.username}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < review.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Journey: {review.journey.origin} to {review.journey.destination}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
