import React from 'react';
import Banner from '../components/Banner';
import SocialXFeatures from '../components/SocialXFeatures';
import SocialXFeatureCard from '../components/SocialXFeatureCard';
import SocialMediaCreators from '../components/SocialMediaCreators';
import ServicesSection from '../components/ServicesSection';
import FinalSection from '../components/FinalSection';

const Home = () => {
  return (
    <div>
      <Banner />
      <SocialXFeatures />
      <SocialXFeatureCard />
      <SocialMediaCreators />
      <ServicesSection />
      <FinalSection/>
    </div>
  );
};

export default Home;