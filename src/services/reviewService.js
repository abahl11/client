// client/src/services/reviewService.js
import axios from 'axios';

const API_URL = '/api/reviews';

// Create a new review
const createReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};

// Get reviews for a user
const getUserReviews = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

// Get reviews by a user
const getReviewsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/by-user/${userId}`);
  return response.data;
};

// Get reviews for a journey
const getJourneyReviews = async (journeyId) => {
  const response = await axios.get(`${API_URL}/journey/${journeyId}`);
  return response.data;
};

// Delete a review
const deleteReview = async (reviewId) => {
  const response = await axios.delete(`${API_URL}/${reviewId}`);
  return response.data;
};

const reviewService = {
  createReview,
  getUserReviews,
  getReviewsByUser,
  getJourneyReviews,
  deleteReview
};

export default reviewService;
