// client/src/pages/JourneysPage.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const JourneysPage = () => {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    destination: '',
    departureDate: '',
    university: ''
  });
  
  const location = useLocation();
  
  useEffect(() => {
    // Extract query params from URL
    const queryParams = new URLSearchParams(location.search);
    const destination = queryParams.get('destination') || '';
    const departureDate = queryParams.get('departureDate') || '';
    const university = queryParams.get('university') || '';
    
    setFilters({
      destination,
      departureDate,
      university
    });
    console.log("Search filters:", { destination, departureDate, university });
    const fetchJourneys = async () => {
      try {
        const params = new URLSearchParams();
        if (destination) params.append('destination', destination);
        if (departureDate) params.append('departureDate', departureDate);
        if (university) params.append('university', university);
        
        const { data } = await axios.get(`/api/journeys?${params.toString()}`);
        console.log("Journeys received:", data);
        setJourneys(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching journeys:", err);
        setError('Failed to load journeys');
        setLoading(false);
      }
    };
    
    fetchJourneys();
  }, [location.search]);
  
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  
//   const applyFilters = (e) => {
//     e.preventDefault();
    
//     const params = new URLSearchParams();
//     if (filters.destination) params.append('destination', filters.destination);
//     if (filters.departureDate) params.append('departureDate', filters.departureDate);
//     if (filters.university) params.append('university', filters.university);
    
//     window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    
//     // Re-fetch journeys with new filters
//     const fetchJourneys = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`/api/journeys?${params.toString()}`);
//         setJourneys(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load journeys');
//         setLoading(false);
//       }
//     };
    
//     fetchJourneys();
//   };
  // client/src/pages/JourneysPage.js
// Update the applyFilters function

const applyFilters = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (filters.destination) params.append('destination', filters.destination);
    if (filters.departureDate) params.append('departureDate', filters.departureDate);
    if (filters.university) params.append('university', filters.university);
    
    // Don't filter by creator unless explicitly viewing "My Journeys"
    // params.append('creator', user._id); // Remove or comment this line if it exists
    
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    
    // Re-fetch journeys with new filters
    const fetchJourneys = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`/api/journeys?${params.toString()}`);
        console.log("Fetched journeys:", data); // Add for debugging
        setJourneys(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching journeys:", err);
        setError('Failed to load journeys');
        setLoading(false);
      }
    };
    
    fetchJourneys();
  };
  
  const clearFilters = () => {
    setFilters({
      destination: '',
      departureDate: '',
      university: ''
    });
    
    window.history.pushState({}, '', location.pathname);
    
    // Re-fetch all journeys
    const fetchJourneys = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/journeys');
        setJourneys(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load journeys');
        setLoading(false);
      }
    };
    
    fetchJourneys();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Travel Companions</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={applyFilters}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="Where are you going?"
                value={filters.destination}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={filters.departureDate}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="university" className="block text-gray-700 mb-1">University</label>
              <input
                type="text"
                id="university"
                name="university"
                placeholder="Filter by university"
                value={filters.university}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Apply Filters
            </button>
            
            <button
              type="button"
              onClick={clearFilters}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p>Loading journeys...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : journeys.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No journeys found matching your criteria.</p>
          <Link 
            to="/create-journey"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create a Journey
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeys.map(journey => (
            <div key={journey._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-blue-100 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-5xl text-blue-500"></i>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{journey.destination}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    journey.status === 'open' ? 'bg-green-100 text-green-800' :
                    journey.status === 'full' ? 'bg-blue-100 text-blue-800' :
                    journey.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">
                  From: {journey.origin}
                </p>
                
                <p className="text-gray-600 mb-2">
                  Date: {new Date(journey.departureDate).toLocaleDateString()}
                </p>
                
                <p className="text-gray-600 mb-4">
                  Transport: {journey.transportMode.charAt(0).toUpperCase() + journey.transportMode.slice(1)}
                </p>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={journey.creator.profilePicture || 'https://via.placeholder.com/40'} 
                    alt={journey.creator.username} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-medium">{journey.creator.username}</p>
                    <p className="text-xs text-gray-500">{journey.creator.university}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex -space-x-2">
                    {journey.companions.slice(0, 3).map((companion, index) => (
                      <img 
                        key={index}
                        src={companion.user.profilePicture || 'https://via.placeholder.com/30'} 
                        alt={companion.user.username} 
                        className="w-6 h-6 rounded-full border border-white"
                      />
                    ))}
                    {journey.companions.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border border-white">
                        +{journey.companions.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {journey.companions.length}/{journey.maxCompanions} companions
                  </span>
                </div>
                
                <Link 
                  to={`/journeys/${journey._id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JourneysPage;
