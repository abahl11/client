import React from 'react';

const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;
  
  return (
    <div className={`bg-red-100 text-red-700 p-4 rounded-md ${className}`}>
      {typeof error === 'string' ? error : 'An error occurred. Please try again.'}
    </div>
  );
};

export default ErrorMessage;
