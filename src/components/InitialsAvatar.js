// src/components/InitialsAvatar.js
import React from 'react';

const getInitials = (name) => {
  if (!name) return '?';
  
  // Split the name and get the first character of each part
  const parts = name.split(' ');
  if (parts.length === 1) {
    return name.charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const getRandomColor = (name) => {
  // Generate a consistent color based on the name
  if (!name) return '#6c757d'; // Default gray
  
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#F97316', // orange
  ];
  
  // Simple hash function to get a consistent index
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const InitialsAvatar = ({ name, size = 'md', className = '' }) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(name);
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };
  
  const avatarSize = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div 
      className={`${avatarSize} rounded-full flex items-center justify-center font-semibold text-white ${className}`}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar;
