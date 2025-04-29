// client/src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [myJourneys, setMyJourneys] = useState([]);
  const [joinedJourneys, setJoinedJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        // Fetch journeys created by the user
        const createdResponse = await axios.get('/api/journeys?creator=' + user._id);
        
        // Fetch journeys where the user is a companion
        const joinedResponse = await axios.get('/api/journeys?companion=' + user._id);
        
        setMyJourneys(createdResponse.data);
        setJoinedJourneys(joinedResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load journeys. Please try again.');
        setLoading(false);
      }
    };

    fetchJourneys();
  }, [user._id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="flex justify-center">
          <p>Loading your journeys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          to="/create-journey" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create New Journey
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Journeys Created Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Journeys You Created</h2>
          
          {myJourneys.length === 0 ? (
            <p className="text-gray-500">You haven't created any journeys yet.</p>
          ) : (
            <div className="space-y-4">
              {myJourneys.map(journey => (
                <div key={journey._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{journey.origin} to {journey.destination}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(journey.departureDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {journey.companions.length} companion(s)
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      journey.status === 'open' ? 'bg-green-100 text-green-800' :
                      journey.status === 'full' ? 'bg-blue-100 text-blue-800' :
                      journey.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Link 
                      to={`/journeys/${journey._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Journeys Joined Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Journeys You Joined</h2>
          
          {joinedJourneys.length === 0 ? (
            <p className="text-gray-500">You haven't joined any journeys yet.</p>
          ) : (
            <div className="space-y-4">
              {joinedJourneys.map(journey => (
                <div key={journey._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{journey.origin} to {journey.destination}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(journey.departureDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Created by: {journey.creator.username}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      journey.status === 'open' ? 'bg-green-100 text-green-800' :
                      journey.status === 'full' ? 'bg-blue-100 text-blue-800' :
                      journey.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Link 
                      to={`/journeys/${journey._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
        
        <p className="text-gray-500">No recent messages.</p>
        
        <div className="mt-4 text-center">
          <Link 
            to="/journeys" 
            className="text-blue-600 hover:underline"
          >
            Find more journeys to join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
