import React, { createContext, useContext, useState, useEffect } from 'react';
import journeyService from '../services/journeyService';

const JourneyContext = createContext();

export const useJourney = () => {
  return useContext(JourneyContext);
};

export const JourneyProvider = ({ children }) => {
  const [featuredJourneys, setFeaturedJourneys] = useState([]);
  const [userJourneys, setUserJourneys] = useState([]);
  const [joinedJourneys, setJoinedJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured journeys
  const fetchFeaturedJourneys = async () => {
    try {
      setLoading(true);
      const data = await journeyService.getJourneys({ limit: 4 });
      setFeaturedJourneys(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load featured journeys');
      setLoading(false);
    }
  };

  // Fetch user's created journeys
  const fetchUserJourneys = async (userId) => {
    try {
      setLoading(true);
      const data = await journeyService.getJourneys({ creator: userId });
      setUserJourneys(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load your journeys');
      setLoading(false);
    }
  };

  // Fetch journeys user has joined
  const fetchJoinedJourneys = async (userId) => {
    try {
      setLoading(true);
      const data = await journeyService.getJourneys({ companion: userId });
      setJoinedJourneys(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load joined journeys');
      setLoading(false);
    }
  };

  // Create a new journey
  const createJourney = async (journeyData) => {
    try {
      const newJourney = await journeyService.createJourney(journeyData);
      setUserJourneys(prev => [newJourney, ...prev]);
      return newJourney;
    } catch (err) {
      throw err;
    }
  };

  // Update a journey
  const updateJourney = async (id, journeyData) => {
    try {
      const updatedJourney = await journeyService.updateJourney(id, journeyData);
      
      // Update in userJourneys
      setUserJourneys(prev => 
        prev.map(journey => journey._id === id ? updatedJourney : journey)
      );
      
      // Update in featuredJourneys if present
      setFeaturedJourneys(prev => 
        prev.map(journey => journey._id === id ? updatedJourney : journey)
      );
      
      // Update in joinedJourneys if present
      setJoinedJourneys(prev => 
        prev.map(journey => journey._id === id ? updatedJourney : journey)
      );
      
      return updatedJourney;
    } catch (err) {
      throw err;
    }
  };

  // Delete a journey
  const deleteJourney = async (id) => {
    try {
      await journeyService.deleteJourney(id);
      
      // Remove from userJourneys
      setUserJourneys(prev => 
        prev.filter(journey => journey._id !== id)
      );
      
      // Remove from featuredJourneys if present
      setFeaturedJourneys(prev => 
        prev.filter(journey => journey._id !== id)
      );
      
      return true;
    } catch (err) {
      throw err;
    }
  };

  // Join a journey
  const joinJourney = async (id) => {
    try {
      const updatedJourney = await journeyService.joinJourney(id);
      
      // Update in featuredJourneys if present
      setFeaturedJourneys(prev => 
        prev.map(journey => journey._id === id ? updatedJourney : journey)
      );
      
      // Add to joinedJourneys
      const alreadyJoined = joinedJourneys.some(journey => journey._id === id);
      if (!alreadyJoined) {
        setJoinedJourneys(prev => [updatedJourney, ...prev]);
      } else {
        setJoinedJourneys(prev => 
          prev.map(journey => journey._id === id ? updatedJourney : journey)
        );
      }
      
      return updatedJourney;
    } catch (err) {
      throw err;
    }
  };

  // Respond to join request
  const respondToJoinRequest = async (journeyId, userId, status) => {
    try {
      const updatedJourney = await journeyService.respondToJoinRequest(journeyId, userId, status);
      
      // Update in userJourneys
      setUserJourneys(prev => 
        prev.map(journey => journey._id === journeyId ? updatedJourney : journey)
      );
      
      // Update in featuredJourneys if present
      setFeaturedJourneys(prev => 
        prev.map(journey => journey._id === journeyId ? updatedJourney : journey)
      );
      
      return updatedJourney;
    } catch (err) {
      throw err;
    }
  };

  // Refresh all journey data
  const refreshJourneyData = async (userId) => {
    await Promise.all([
      fetchFeaturedJourneys(),
      userId && fetchUserJourneys(userId),
      userId && fetchJoinedJourneys(userId)
    ]);
  };

  useEffect(() => {
    fetchFeaturedJourneys();
  }, []);

  const value = {
    featuredJourneys,
    userJourneys,
    joinedJourneys,
    loading,
    error,
    fetchFeaturedJourneys,
    fetchUserJourneys,
    fetchJoinedJourneys,
    createJourney,
    updateJourney,
    deleteJourney,
    joinJourney,
    respondToJoinRequest,
    refreshJourneyData
  };

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
};
