// client/src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import HowItWorks from '../components/HowItWorks';
import FeaturedJourneys from '../components/FeaturedJourneys';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <SearchBar />
      <HowItWorks />
      <FeaturedJourneys />
    </div>
  );
};

export default HomePage;
