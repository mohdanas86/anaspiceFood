import React from 'react';
import Hero from './Hero';
import Dishes from '../Pages/Dishes';
import FeaturedItem from './FeaturedItem';
import DishList from '../Pages/category/DishList';

const Home = () => {
  return (
    <>
      <Hero />
      <Dishes />
      <FeaturedItem /> 
      <DishList />
    </>
  );
}

export default Home;
