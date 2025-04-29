// // client/src/components/Header.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import UserAvatar from '../components/UserAvatar';
// import  { useState } from 'react';


// const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// const timeoutRef = useRef(null);

// const handleMouseEnter = () => {
//     clearTimeout(timeoutRef.current);
//     setIsDropdownOpen(true);
//   };
  
//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 300); // 300ms delay before closing
//   };

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="bg-primary text-blue-600">
//       <div className="container mx-auto py-4 px-6 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">Travel Buddy</Link>
        
        // <nav className="hidden md:flex space-x-6">
        //   <Link to="/" className=" text-xl hover:text-gray-200">Home</Link>
        //   <Link to="/journeys" className="text-xl hover:text-gray-200">Find Journeys</Link>
        //   <Link to="/about" className="text-xl hover:text-gray-200">About</Link>
        //   <Link to="/contact" className="text-xl hover:text-gray-200">Contact</Link>
        // </nav>
        
//         <div className="flex items-center space-x-4">
//           {user ? (
//             <>
//               <Link to="/dashboard" className="text-l hover:text-gray-200">Dashboard</Link>
//         <div 
//   className="relative"
//   onMouseEnter={handleMouseEnter}
//   onMouseLeave={handleMouseLeave}
// >
//   <button className="text-l flex items-center space-x-2 hover:text-gray-200">
//     <UserAvatar 
//       user={user} 
//       size="sm" 
//       className="w-8 h-8 rounded-full"
//     />
//     <span>{user.username}</span>
//   </button>
  
//   {isDropdownOpen && (
//     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//       <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
//       <Link to="/my-journeys" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Journeys</Link>
//       <button 
//         onClick={handleLogout} 
//         className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//       >
//         Logout
//       </button>
//     </div>
//   )}
// </div>


//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:text-gray-200">Login</Link>
//               <Link to="/register" className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-200">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserAvatar from './UserAvatar';

const Header = () => {
  // Move these hooks INSIDE the component function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay before closing
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      {/* Your header content */}
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Travel Buddy</Link>
        
        {/* Navigation links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className=" text-xl hover:text-gray-200">Home</Link>
          <Link to="/journeys" className="text-xl hover:text-gray-200">Find Journeys</Link>
          <Link to="/about" className="text-xl hover:text-gray-200">About</Link>
          <Link to="/contact" className="text-xl hover:text-gray-200">Contact</Link>
        </nav>
        
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-l hover:text-gray-200">Dashboard</Link>
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-l flex items-center space-x-2 hover:text-gray-200">
                  <UserAvatar 
                    user={user} 
                    size="sm" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.username}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <Link to="/my-journeys" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Journeys</Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
