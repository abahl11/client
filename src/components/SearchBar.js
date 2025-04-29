// // client/src/components/SearchBar.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const [destination, setDestination] = useState('');
//   const [departureDate, setDepartureDate] = useState('');
//   const [university, setUniversity] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
    
//     const queryParams = new URLSearchParams();
//     if (destination) queryParams.append('destination', destination);
//     if (departureDate) queryParams.append('departureDate', departureDate);
//     if (university) queryParams.append('university', university);
    
//     navigate(`/journeys?${queryParams.toString()}`);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 -mt-10 relative z-20 max-w-4xl mx-auto">
//       <h3 className="text-xl font-semibold mb-4 text-center">Find Travel Companions</h3>
      
//       <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
//           <input
//             type="text"
//             id="destination"
//             placeholder="Where are you going?"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />
//         </div>
        
//         <div>
//           <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
//           <input
//             type="date"
//             id="departureDate"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={departureDate}
//             onChange={(e) => setDepartureDate(e.target.value)}
//           />
//         </div>
        
//         <div>
//           <label htmlFor="university" className="block text-gray-700 mb-1">University</label>
//           <input
//             type="text"
//             id="university"
//             placeholder="Your university"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={university}
//             onChange={(e) => setUniversity(e.target.value)}
//           />
//         </div>
        
//         <div className="flex items-end">
//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;



// client/src/components/SearchBar.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LocationAutocomplete from './LocationAutocomplete';

// const SearchBar = () => {
//   const [destination, setDestination] = useState('');
//   const [destinationData, setDestinationData] = useState(null);
//   const [departureDate, setDepartureDate] = useState('');
//   const [university, setUniversity] = useState('');
//   const navigate = useNavigate();

//   const handleDestinationSelect = (place) => {
//     setDestination(place.formattedAddress || place.name);
//     setDestinationData(place);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
    
//     const queryParams = new URLSearchParams();
//     if (destination) queryParams.append('destination', destination);
//     if (destinationData?.lat && destinationData?.lng) {
//       queryParams.append('lat', destinationData.lat);
//       queryParams.append('lng', destinationData.lng);
//     }
//     if (departureDate) queryParams.append('departureDate', departureDate);
//     if (university) queryParams.append('university', university);
    
//     navigate(`/journeys?${queryParams.toString()}`);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 -mt-10 relative z-20 max-w-4xl mx-auto">
//       <h3 className="text-xl font-semibold mb-4 text-center">Find Travel Companions</h3>
      
//       <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div>
//           <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
//           <LocationAutocomplete
//             placeholder="Where are you going?"
//             onPlaceSelect={handleDestinationSelect}
//             defaultValue={destination}
//           />
//         </div>
        
//         <div>
//           <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
//           <input
//             type="date"
//             id="departureDate"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={departureDate}
//             onChange={(e) => setDepartureDate(e.target.value)}
//           />
//         </div>
        
//         <div>
//           <label htmlFor="university" className="block text-gray-700 mb-1">University</label>
//           <input
//             type="text"
//             id="university"
//             placeholder="Your university"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={university}
//             onChange={(e) => setUniversity(e.target.value)}
//           />
//         </div>
        
//         <div className="flex items-end">
//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;


// Replace the destination input in your search form
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationAutocomplete from './LocationAutocomplete';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [destinationData, setDestinationData] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [university, setUniversity] = useState('');
  const navigate = useNavigate();

  const handleDestinationSelect = (place) => {
    console.log("Selected place:", place); // Debug log
    setDestination(place.formattedAddress || place.name);
    setDestinationData(place);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    if (destination) queryParams.append('destination', destination);
    if (destinationData?.lat && destinationData?.lng) {
      queryParams.append('lat', destinationData.lat);
      queryParams.append('lng', destinationData.lng);
    }
    if (departureDate) queryParams.append('departureDate', departureDate);
    if (university) queryParams.append('university', university);
    
    navigate(`/journeys?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Find Travel Companions</h3>
      
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
            <LocationAutocomplete
              placeholder="Where are you going?"
              onPlaceSelect={handleDestinationSelect}
              defaultValue={destination}
            />
          </div>
          
          <div>
            <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="university" className="block text-gray-700 mb-1">University</label>
            <input
              type="text"
              id="university"
              placeholder="Filter by university"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Apply Filters
          </button>
          
          <button 
            type="button" 
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
            onClick={() => {
              setDestination('');
              setDestinationData(null);
              setDepartureDate('');
              setUniversity('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

