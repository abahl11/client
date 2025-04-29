import axios from 'axios';

const API_URL = '/api/journeys';

// Get all journeys with optional filters
const getJourneys = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.destination) params.append('destination', filters.destination);
  if (filters.departureDate) params.append('departureDate', filters.departureDate);
  if (filters.university) params.append('university', filters.university);
  if (filters.creator) params.append('creator', filters.creator);
  if (filters.companion) params.append('companion', filters.companion);

  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
  console.log("Fetching journeys with params:", params.toString());
  const response = await axios.get(`/api/journeys?${params.toString()}`, config);
  return response.data;
};

// Get journey by ID
const getJourneyById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create new journey
const createJourney = async (journeyData) => {
  const response = await axios.post(API_URL, journeyData);
  return response.data;
};

// Update journey
const updateJourney = async (id, journeyData) => {
  const response = await axios.put(`${API_URL}/${id}`, journeyData);
  return response.data;
};

// Delete journey
const deleteJourney = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Request to join journey
const joinJourney = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/join`);
  return response.data;
};

// Respond to join request
const respondToJoinRequest = async (journeyId, userId, status) => {
  const response = await axios.put(`${API_URL}/${journeyId}/companions/${userId}`, { status });
  return response.data;
};

const journeyService = {
  getJourneys,
  getJourneyById,
  createJourney,
  updateJourney,
  deleteJourney,
  joinJourney,
  respondToJoinRequest
};

export default journeyService;
