import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className='max-w-xl sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-8xl mx-auto'>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;