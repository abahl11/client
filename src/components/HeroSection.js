// client/src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-blue-600 text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: "url('/images/hero-bg.jpg')",
        opacity: 0.4
      }}></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Way Home Together
          </h1>
          <p className="text-xl mb-8">
            Connect with fellow students traveling to the same destination. 
            Travel safer, save money, and make new friends along the way.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold text-center hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/journeys" 
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold text-center hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Find Journeys
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
