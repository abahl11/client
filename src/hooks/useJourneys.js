import { useState, useEffect, useCallback } from 'react';
import journeyService from '../services/journeyService';

const useJourneys = (initialFilters = {}) => {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchJourneys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await journeyService.getJourneys(filters);
      setJourneys(data);
    } catch (err) {
      setError('Failed to load journeys. Please try again.');
      console.error('Error fetching journeys:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJourneys();
  }, [fetchJourneys]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const refreshJourneys = () => {
    fetchJourneys();
  };

  return {
    journeys,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refreshJourneys
  };
};

export default useJourneys;
