// client/src/components/FeaturedJourneys.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedJourneys = () => {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const { data } = await axios.get('/api/journeys?limit=4');
        setJourneys(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load featured journeys');
        setLoading(false);
      }
    };

    fetchJourneys();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p>Loading featured journeys...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Journeys</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out these popular destinations with students looking for travel companions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journeys.map((journey) => (
            <div key={journey._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-blue-100 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-5xl text-blue-500"></i>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{journey.destination}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {journey.companions.length} travelers
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">
                  From: {journey.origin}
                </p>
                
                <p className="text-gray-600 mb-4">
                  Date: {new Date(journey.departureDate).toLocaleDateString()}
                </p>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={journey.creator.profilePicture || 'https://via.placeholder.com/40'} 
                    alt={journey.creator.username} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Created by {journey.creator.username}
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
        
        <div className="text-center mt-10">
          <Link 
            to="/journeys"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            View All Journeys
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJourneys;
