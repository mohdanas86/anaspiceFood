import React from 'react';
import Hero from './Hero';
import Dishes from '../Pages/Dishes';
import FeaturedItem from './FeaturedItem';
import { useCart } from '../context/CartContext';
import DishList from '../Pages/category/DishList';

const Home = () => {
  const { cartItems } = useCart();
  const dishe = localStorage.getItem("dish"); // Fetching the "dish" from localStorage
  const dishesArray = dishe ? JSON.parse(dishe) : []; // Parse it, or set as an empty array if null

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
