// src/components/UserAvatar.js
import React from 'react';
import InitialsAvatar from './InitialsAvatar';

const UserAvatar = ({ user, size = 'md', className = '' }) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  const avatarSize = sizeClasses[size] || sizeClasses.md;
  
  if (!user?.profilePicture) {
    return <InitialsAvatar name={user?.fullName || user?.username} size={size} className={className} />;
  }
  
  return (
    <div className={`${avatarSize} rounded-full overflow-hidden ${className}`}>
      <img 
        src={user.profilePicture} 
        alt={user.username || 'User'} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;
