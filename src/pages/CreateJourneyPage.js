// // client/src/pages/CreateJourneyPage.js
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const CreateJourneyPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     origin: '',
//     destination: '',
//     departureDate: '',
//     returnDate: '',
//     transportMode: 'bus',
//     estimatedCost: '',
//     maxCompanions: 4,
//     description: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await axios.post('/api/journeys', formData);
      
//       setLoading(false);
//       navigate(`/journeys/${response.data._id}`);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create journey');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <div className="mb-6">
//         <Link to="/dashboard" className="text-blue-600 hover:underline">
//           &larr; Back to Dashboard
//         </Link>
//       </div>
      
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-blue-600 text-white py-4 px-6">
//           <h1 className="text-2xl font-bold">Create a New Journey</h1>
//           <p className="text-blue-100">Find travel companions for your trip</p>
//         </div>
        
//         <div className="p-6">
//           {error && (
//             <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label htmlFor="origin" className="block text-gray-700 mb-1">Origin</label>
//                 <input
//                   type="text"
//                   id="origin"
//                   name="origin"
//                   value={formData.origin}
//                   onChange={handleChange}
//                   placeholder="City or location"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
//                 <input
//                   type="text"
//                   id="destination"
//                   name="destination"
//                   value={formData.destination}
//                   onChange={handleChange}
//                   placeholder="City or location"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
//                 <input
//                   type="date"
//                   id="departureDate"
//                   name="departureDate"
//                   value={formData.departureDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="returnDate" className="block text-gray-700 mb-1">Return Date (Optional)</label>
//                 <input
//                   type="date"
//                   id="returnDate"
//                   name="returnDate"
//                   value={formData.returnDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="transportMode" className="block text-gray-700 mb-1">Mode of Transport</label>
//                 <select
//                   id="transportMode"
//                   name="transportMode"
//                   value={formData.transportMode}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="bus">Bus</option>
//                   <option value="train">Train</option>
//                   <option value="flight">Flight</option>
//                   <option value="car">Car</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label htmlFor="estimatedCost" className="block text-gray-700 mb-1">Estimated Cost (₹)</label>
//                 <input
//                   type="number"
//                   id="estimatedCost"
//                   name="estimatedCost"
//                   value={formData.estimatedCost}
//                   onChange={handleChange}
//                   placeholder="Approximate cost in rupees"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="maxCompanions" className="block text-gray-700 mb-1">Maximum Companions</label>
//                 <input
//                   type="number"
//                   id="maxCompanions"
//                   name="maxCompanions"
//                   value={formData.maxCompanions}
//                   onChange={handleChange}
//                   min="1"
//                   max="10"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <label htmlFor="description" className="block text-gray-700 mb-1">Description (Optional)</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Add details about your journey, preferences for companions, etc."
//                 rows="4"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>
            
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
//               disabled={loading}
//             >
//               {loading ? 'Creating Journey...' : 'Create Journey'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateJourneyPage;






  // client/src/pages/CreateJourneyPage.js
  // import React, { useState } from 'react';
  // import { useNavigate, Link } from 'react-router-dom';
  // import axios from 'axios';
  // import LocationAutocomplete from '../components/LocationAutocomplete';

  // const CreateJourneyPage = () => {
  //   const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     origin: '',
  //     originCoords: null,
  //     destination: '',
  //     destinationCoords: null,
  //     departureDate: '',
  //     returnDate: '',
  //     transportMode: 'bus',
  //     estimatedCost: '',
  //     maxCompanions: 4,
  //     description: ''
  //   });
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
      
  //     setFormData({
  //       ...formData,
  //       [name]: value
  //     });
  //   };

  //   const handleOriginSelect = (place) => {
  //     setFormData({
  //       ...formData,
  //       origin: place.formattedAddress || place.name,
  //       originCoords: {
  //         lat: place.lat,
  //         lng: place.lng
  //       }
  //     });
  //   };

  //   const handleDestinationSelect = (place) => {
  //     setFormData({
  //       ...formData,
  //       destination: place.formattedAddress || place.name,
  //       destinationCoords: {
  //         lat: place.lat,
  //         lng: place.lng
  //       }
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
      
  //     if (!formData.originCoords || !formData.destinationCoords) {
  //       setError('Please select valid locations from the suggestions');
  //       return;
  //     }
      
  //     try {
  //       setLoading(true);
  //       setError(null);
        
  //       const journeyData = {
  //         origin: formData.origin,
  //         originCoords: formData.originCoords,
  //         destination: formData.destination,
  //         destinationCoords: formData.destinationCoords,
  //         departureDate: formData.departureDate,
  //         returnDate: formData.returnDate || null,
  //         transportMode: formData.transportMode,
  //         estimatedCost: formData.estimatedCost || null,
  //         maxCompanions: formData.maxCompanions,
  //         description: formData.description || ''
  //       };
        
  //       const response = await axios.post('/api/journeys', journeyData);
        
  //       setLoading(false);
  //       navigate(`/journeys/${response.data._id}`);
  //     } catch (err) {
  //       setError(err.response?.data?.message || 'Failed to create journey');
  //       setLoading(false);
  //     }
  //   };

  //   return (
  //     <div className="container mx-auto px-6 py-8">
  //       <div className="mb-6">
  //         <Link to="/dashboard" className="text-blue-600 hover:underline">
  //           &larr; Back to Dashboard
  //         </Link>
  //       </div>
        
  //       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
  //         <div className="bg-blue-600 text-white py-4 px-6">
  //           <h1 className="text-2xl font-bold">Create a New Journey</h1>
  //           <p className="text-blue-100">Find travel companions for your trip</p>
  //         </div>
          
  //         <div className="p-6">
  //           {error && (
  //             <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
  //               {error}
  //             </div>
  //           )}
            
  //           <form onSubmit={handleSubmit}>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  //               <div>
  //                 <label htmlFor="origin" className="block text-gray-700 mb-1">Origin</label>
  //                 <LocationAutocomplete
  //                   placeholder="Enter your starting point"
  //                   onPlaceSelect={handleOriginSelect}
  //                   defaultValue={formData.origin}
  //                 />
  //               </div>
                
  //               <div>
  //                 <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
  //                 <LocationAutocomplete
  //                   placeholder="Enter your destination"
  //                   onPlaceSelect={handleDestinationSelect}
  //                   defaultValue={formData.destination}
  //                 />
  //               </div>
                
  //               {/* Rest of the form fields remain the same */}
  //               <div>
  //                 <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
  //                 <input
  //                   type="date"
  //                   id="departureDate"
  //                   name="departureDate"
  //                   value={formData.departureDate}
  //                   onChange={handleChange}
  //                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                   required
  //                 />
  //               </div>
                
  //               {/* Include the rest of your form fields here */}
  //             </div>
              
  //             <button
  //               type="submit"
  //               className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
  //               disabled={loading}
  //             >
  //               {loading ? 'Creating Journey...' : 'Create Journey'}
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default CreateJourneyPage;




// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import LocationAutocomplete from '../components/LocationAutocomplete';

// const CreateJourneyPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     origin: '',
//     originCoords: null,
//     destination: '',
//     destinationCoords: null,
//     waypoints: [], // For storing waypoints
//     departureDate: '',
//     returnDate: '',
//     transportMode: 'bus',
//     estimatedCost: '',
//     maxCompanions: 4,
//     description: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleOriginSelect = (place) => {
//     setFormData({
//       ...formData,
//       origin: place.formattedAddress || place.name,
//       originCoords: {
//         lat: place.lat,
//         lng: place.lng
//       }
//     });
//   };

//   const handleDestinationSelect = (place) => {
//     setFormData({
//       ...formData,
//       destination: place.formattedAddress || place.name,
//       destinationCoords: {
//         lat: place.lat,
//         lng: place.lng
//       }
//     });
//   };

//   // Function to add a new waypoint
//   const handleAddWaypoint = () => {
//     setFormData({
//       ...formData,
//       waypoints: [...formData.waypoints, { name: '', coordinates: null }]
//     });
//   };

//   // Function to remove a waypoint at specific index
//   const handleRemoveWaypoint = (index) => {
//     const updatedWaypoints = [...formData.waypoints];
//     updatedWaypoints.splice(index, 1);
//     setFormData({
//       ...formData,
//       waypoints: updatedWaypoints
//     });
//   };

//   // Function to update waypoint data when a location is selected
//   const handleWaypointSelect = (place, index) => {
//     const updatedWaypoints = [...formData.waypoints];
//     updatedWaypoints[index] = {
//       name: place.formattedAddress || place.name,
//       coordinates: {
//         lat: place.lat,
//         lng: place.lng
//       }
//     };
//     setFormData({
//       ...formData,
//       waypoints: updatedWaypoints
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.originCoords || !formData.destinationCoords) {
//       setError('Please select valid locations from the suggestions');
//       return;
//     }
    
//     // Validate waypoints if any exist
//     if (formData.waypoints.length > 0) {
//       const invalidWaypoints = formData.waypoints.some(wp => !wp.coordinates);
//       if (invalidWaypoints) {
//         setError('Please select valid locations for all waypoints');
//         return;
//       }
//     }
    
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await axios.post('/api/journeys', formData);
      
//       setLoading(false);
//       navigate(`/journeys/${response.data._id}`);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create journey');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <div className="mb-6">
//         <Link to="/dashboard" className="text-blue-600 hover:underline">
//           &larr; Back to Dashboard
//         </Link>
//       </div>
      
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-blue-600 text-white py-4 px-6">
//           <h1 className="text-2xl font-bold">Create a New Journey</h1>
//           <p className="text-blue-100">Find travel companions for your trip</p>
//         </div>
        
//         <div className="p-6">
//           {error && (
//             <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label htmlFor="origin" className="block text-gray-700 mb-1">Origin</label>
//                 <LocationAutocomplete
//                   placeholder="Enter your starting point"
//                   onPlaceSelect={handleOriginSelect}
//                   defaultValue={formData.origin}
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
//                 <LocationAutocomplete
//                   placeholder="Enter your destination"
//                   onPlaceSelect={handleDestinationSelect}
//                   defaultValue={formData.destination}
//                 />
//               </div>
              
//               {/* Waypoints section */}
//               <div className="md:col-span-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <label className="block text-gray-700">Waypoints (Optional)</label>
//                   <button
//                     type="button"
//                     onClick={handleAddWaypoint}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     + Add Waypoint
//                   </button>
//                 </div>
                
//                 {formData.waypoints.map((waypoint, index) => (
//                   <div key={index} className="flex items-center mb-2">
//                     <div className="flex-grow mr-2">
//                       <LocationAutocomplete
//                         placeholder={`Waypoint ${index + 1}`}
//                         onPlaceSelect={(place) => handleWaypointSelect(place, index)}
//                         defaultValue={waypoint.name}
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveWaypoint(index)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
              
//               <div>
//                 <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
//                 <input
//                   type="date"
//                   id="departureDate"
//                   name="departureDate"
//                   value={formData.departureDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="returnDate" className="block text-gray-700 mb-1">Return Date (Optional)</label>
//                 <input
//                   type="date"
//                   id="returnDate"
//                   name="returnDate"
//                   value={formData.returnDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="transportMode" className="block text-gray-700 mb-1">Transport Mode</label>
//                 <select
//                   id="transportMode"
//                   name="transportMode"
//                   value={formData.transportMode}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="bus">Bus</option>
//                   <option value="train">Train</option>
//                   <option value="flight">Flight</option>
//                   <option value="car">Car</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label htmlFor="estimatedCost" className="block text-gray-700 mb-1">Estimated Cost (₹)</label>
//                 <input
//                   type="number"
//                   id="estimatedCost"
//                   name="estimatedCost"
//                   value={formData.estimatedCost}
//                   onChange={handleChange}
//                   placeholder="Enter estimated cost"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="maxCompanions" className="block text-gray-700 mb-1">Maximum Companions</label>
//                 <input
//                   type="number"
//                   id="maxCompanions"
//                   name="maxCompanions"
//                   value={formData.maxCompanions}
//                   onChange={handleChange}
//                   min="1"
//                   max="10"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//               <div className="md:col-span-2">
//                 <label htmlFor="description" className="block text-gray-700 mb-1">Description (Optional)</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="4"
//                   placeholder="Add details about your journey"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
//               disabled={loading}
//             >
//               {loading ? 'Creating Journey...' : 'Create Journey'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateJourneyPage;



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import LocationAutocomplete from '../components/LocationAutocomplete';

// const CreateJourneyPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     origin: '',
//     originCoords: null,
//     destination: '',
//     destinationCoords: null,
//     waypoints: [], // Only this waypoints!
//     departureDate: '',
//     returnDate: '',
//     transportMode: 'bus',
//     estimatedCost: '',
//     maxCompanions: 4,
//     description: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleOriginSelect = (place) => {
//     setFormData({
//       ...formData,
//       origin: place.formattedAddress || place.name,
//       originCoords: {
//         lat: place.lat,
//         lng: place.lng
//       }
//     });
//   };

//   const handleDestinationSelect = (place) => {
//     setFormData({
//       ...formData,
//       destination: place.formattedAddress || place.name,
//       destinationCoords: {
//         lat: place.lat,
//         lng: place.lng
//       }
//     });
//   };

//   // Add a new waypoint
//   const handleAddWaypoint = () => {
//     setFormData({
//       ...formData,
//       waypoints: [...formData.waypoints, { name: '', coordinates: null }]
//     });
//   };

//   // Remove a waypoint
//   const handleRemoveWaypoint = (index) => {
//     const updatedWaypoints = [...formData.waypoints];
//     updatedWaypoints.splice(index, 1);
//     setFormData({
//       ...formData,
//       waypoints: updatedWaypoints
//     });
//   };

//   // Update a waypoint's location
//   const handleWaypointSelect = (place, index) => {
//     const updatedWaypoints = [...formData.waypoints];
//     updatedWaypoints[index] = {
//       name: place.formattedAddress || place.name,
//       coordinates: {
//         lat: place.lat,
//         lng: place.lng
//       }
//     };
//     setFormData({
//       ...formData,
//       waypoints: updatedWaypoints
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.originCoords || !formData.destinationCoords) {
//       setError('Please select valid locations from the suggestions');
//       return;
//     }
//     // Validate waypoints if any exist
//     if (formData.waypoints.length > 0) {
//       const invalidWaypoints = formData.waypoints.some(wp => !wp.coordinates);
//       if (invalidWaypoints) {
//         setError('Please select valid locations for all waypoints');
//         return;
//       }
//     }
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.post('/api/journeys', formData);
//       setLoading(false);
//       navigate(`/journeys/${response.data._id}`);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create journey');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <div className="mb-6">
//         <Link to="/dashboard" className="text-blue-600 hover:underline">
//           &larr; Back to Dashboard
//         </Link>
//       </div>
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-blue-600 text-white py-4 px-6">
//           <h1 className="text-2xl font-bold">Create a New Journey</h1>
//           <p className="text-blue-100">Find travel companions for your trip</p>
//         </div>
//         <div className="p-6">
//           {error && (
//             <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
//               {error}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label htmlFor="origin" className="block text-gray-700 mb-1">Origin</label>
//                 <LocationAutocomplete
//                   placeholder="Enter your starting point"
//                   onPlaceSelect={handleOriginSelect}
//                   defaultValue={formData.origin}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
//                 <LocationAutocomplete
//                   placeholder="Enter your destination"
//                   onPlaceSelect={handleDestinationSelect}
//                   defaultValue={formData.destination}
//                 />
//               </div>
//               {/* Waypoints section */}
//               <div className="md:col-span-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <label className="block text-gray-700">Waypoints (Optional)</label>
//                   <button
//                     type="button"
//                     onClick={handleAddWaypoint}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     + Add Waypoint
//                   </button>
//                 </div>
//                 {formData.waypoints.map((waypoint, index) => (
//                   <div key={index} className="flex items-center mb-2">
//                     <div className="flex-grow mr-2">
//                       <LocationAutocomplete
//                         placeholder={`Waypoint ${index + 1}`}
//                         onPlaceSelect={(place) => handleWaypointSelect(place, index)}
//                         defaultValue={waypoint.name}
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveWaypoint(index)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
//                 <input
//                   type="date"
//                   id="departureDate"
//                   name="departureDate"
//                   value={formData.departureDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="returnDate" className="block text-gray-700 mb-1">Return Date (Optional)</label>
//                 <input
//                   type="date"
//                   id="returnDate"
//                   name="returnDate"
//                   value={formData.returnDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="transportMode" className="block text-gray-700 mb-1">Transport Mode</label>
//                 <select
//                   id="transportMode"
//                   name="transportMode"
//                   value={formData.transportMode}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="bus">Bus</option>
//                   <option value="train">Train</option>
//                   <option value="flight">Flight</option>
//                   <option value="car">Car</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="estimatedCost" className="block text-gray-700 mb-1">Estimated Cost (₹)</label>
//                 <input
//                   type="number"
//                   id="estimatedCost"
//                   name="estimatedCost"
//                   value={formData.estimatedCost}
//                   onChange={handleChange}
//                   placeholder="Enter estimated cost"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="maxCompanions" className="block text-gray-700 mb-1">Maximum Companions</label>
//                 <input
//                   type="number"
//                   id="maxCompanions"
//                   name="maxCompanions"
//                   value={formData.maxCompanions}
//                   onChange={handleChange}
//                   min="1"
//                   max="10"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label htmlFor="description" className="block text-gray-700 mb-1">Description (Optional)</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="4"
//                   placeholder="Add details about your journey"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
//               disabled={loading}
//             >
//               {loading ? 'Creating Journey...' : 'Create Journey'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateJourneyPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LocationAutocomplete from '../components/LocationAutocomplete';

const CreateJourneyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: '',
    originCoords: null,
    destination: '',
    destinationCoords: null,
    departureDate: '',
    returnDate: '',
    transportMode: 'bus',
    estimatedCost: '',
    maxCompanions: 4,
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOriginSelect = (place) => {
    setFormData({
      ...formData,
      origin: place.formattedAddress || place.name,
      originCoords: {
        lat: place.lat,
        lng: place.lng
      }
    });
  };

  const handleDestinationSelect = (place) => {
    setFormData({
      ...formData,
      destination: place.formattedAddress || place.name,
      destinationCoords: {
        lat: place.lat,
        lng: place.lng
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.originCoords || !formData.destinationCoords) {
      setError('Please select valid locations from the suggestions');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/journeys', formData);
      setLoading(false);
      navigate(`/journeys/${response.data._id}`);
    }
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Failed to create journey');
    //   setLoading(false);
    // }
    catch (err) {
      // Log the error for debugging
      console.log('Axios error:', err);
    
      // Show more helpful error messages
      if (err.response) {
        // Server responded with a status code outside 2xx
        setError(err.response.data?.message || 'Server error');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Is your backend running?');
      } else {
        // Something else happened
        setError('Error: ' + err.message);
      }
      setLoading(false);
    }
    
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Create a New Journey</h1>
          <p className="text-blue-100">Find travel companions for your trip</p>
        </div>
        <div className="p-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="origin" className="block text-gray-700 mb-1">Origin</label>
                <LocationAutocomplete
                  placeholder="Enter your starting point"
                  onPlaceSelect={handleOriginSelect}
                  defaultValue={formData.origin}
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-gray-700 mb-1">Destination</label>
                <LocationAutocomplete
                  placeholder="Enter your destination"
                  onPlaceSelect={handleDestinationSelect}
                  defaultValue={formData.destination}
                />
              </div>
              <div>
                <label htmlFor="departureDate" className="block text-gray-700 mb-1">Departure Date</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="returnDate" className="block text-gray-700 mb-1">Return Date (Optional)</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="transportMode" className="block text-gray-700 mb-1">Transport Mode</label>
                <select
                  id="transportMode"
                  name="transportMode"
                  value={formData.transportMode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="flight">Flight</option>
                  <option value="car">Car</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="estimatedCost" className="block text-gray-700 mb-1">Estimated Cost (₹)</label>
                <input
                  type="number"
                  id="estimatedCost"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleChange}
                  placeholder="Enter estimated cost"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="maxCompanions" className="block text-gray-700 mb-1">Maximum Companions</label>
                <input
                  type="number"
                  id="maxCompanions"
                  name="maxCompanions"
                  value={formData.maxCompanions}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add details about your journey"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? 'Creating Journey...' : 'Create Journey'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJourneyPage;
