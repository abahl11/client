// client/src/components/LocationAutocomplete.js
import React, { useRef, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const LocationAutocomplete = ({ onPlaceSelect, placeholder, defaultValue = '' }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  
  const [inputValue, setInputValue] = useState(defaultValue);
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;
    
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ['(cities)'] }
    );

    const pacContainers = document.querySelectorAll('.pac-container');
    pacContainers.forEach(container => {
      container.style.zIndex = "1500"; // Set a high z-index value
    });

    autoCompleteRef.current.addListener('place_changed', () => {
      const place = autoCompleteRef.current.getPlace();
      
      if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      const locationData = {
        name: place.name,
        formattedAddress: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id
      };
      
      onPlaceSelect(locationData);
    });
    
    return () => {
      if (autoCompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, [isLoaded, onPlaceSelect]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default LocationAutocomplete;
