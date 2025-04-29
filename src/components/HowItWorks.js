// client/src/components/HowItWorks.js
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: 'fas fa-user-circle',
      title: 'Create Profile',
      description: 'Sign up and create your profile with your university and hometown details.'
    },
    {
      icon: 'fas fa-search',
      title: 'Find Matching Travelers',
      description: 'Search for fellow students traveling to your destination on similar dates.'
    },
    {
      icon: 'fas fa-comments',
      title: 'Connect',
      description: 'Message potential travel companions and plan your journey together.'
    },
    {
      icon: 'fas fa-route',
      title: 'Travel Together',
      description: 'Meet up and enjoy a safer, more affordable journey with your new travel buddies.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Travel Buddy makes it easy to find reliable travel companions from your university 
            who are heading to the same destination.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${step.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
