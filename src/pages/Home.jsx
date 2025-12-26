import React from 'react';
import Banner from '../components/Banner';
import SocialXFeatures from '../components/SocialXFeatures';
import SocialXFeatureCard from '../components/SocialXFeatureCard';

const Home = () => {
  return (
    <div>
      <Banner />
      <SocialXFeatures />
      <SocialXFeatureCard/>
    </div>
  );
};

export default Home;