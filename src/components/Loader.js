import React from 'react';

const Loader = ({ size = 'md', color = 'blue', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };
  
  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white'
  };
  
  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.blue;
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className={`${spinnerSize} rounded-full border-t-transparent ${spinnerColor} animate-spin`}></div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${spinnerSize} rounded-full border-t-transparent ${spinnerColor} animate-spin`}></div>
    </div>
  );
};

export default Loader;
