import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import UserAvatar from '../components/UserAvatar';


const JourneyCard = ({ journey }) => {
  const {
    _id,
    origin,
    destination,
    departureDate,
    transportMode,
    creator,
    companions,
    maxCompanions,
    status
  } = journey;

  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 bg-blue-100 flex items-center justify-center">
        <i className="fas fa-map-marker-alt text-5xl text-blue-500"></i>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{destination}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-2">
          From: {origin}
        </p>
        
        <p className="text-gray-600 mb-2">
          Date: {formatDate(departureDate)}
        </p>
        
        <p className="text-gray-600 mb-4">
          Transport: {transportMode.charAt(0).toUpperCase() + transportMode.slice(1)}
        </p>
        
        <div className="flex items-center mb-4">
          <UserAvatar 
            user={creator} 
            size="sm" 
            className="mr-2" 
          />
          <div>
            <p className="text-sm font-medium">{creator.username}</p>
            <p className="text-xs text-gray-500">{creator.university}</p>
          </div>
        </div>
        
        {/* <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">
            {companions.slice(0, 3).map((companion, index) => (
              <UserAvatar 
                key={index}
                user={companion.user} 
                size="xs" 
                className="border border-white" 
              />
            ))}
            {companions.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border border-white">
                +{companions.length - 3}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600">
            {companions.length}/{maxCompanions} companions
          </span>
        </div> */}

<div className="flex items-center justify-between mb-4">
  <div className="flex -space-x-2">
    {companions.slice(0, 3).map((companion, index) => (
      <UserAvatar 
        key={index}
        user={companion.user} 
        size="xs" 
        className="border border-white" 
      />
    ))}
    {companions.length > 3 && (
      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border border-white">
        +{companions.length - 3}
      </div>
    )}
  </div>
  <span className="text-sm text-gray-600">
    {companions.length}/{maxCompanions} companions
  </span>
</div>

        
        <Link 
          to={`/journeys/${_id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
function UserProfile({ user }) {
    return (
      <div className="flex items-center">
        <UserAvatar user={user} size="lg" className="mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>
    );
  }

export default JourneyCard;
