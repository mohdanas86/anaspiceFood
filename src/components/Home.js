import React from 'react'
import Hero from './Hero'
import Dishes from '../Pages/Dishes'
import FeaturedItem from './FeaturedItem'
import { useCart } from '../context/CartContext'

const Home = () => {
  const { cartItems } = useCart();
  const dishe = localStorage.getItem("dish");
  return (
    <>
      <Hero />
      <Dishes />
      {dishe.length > 0 ? <FeaturedItem /> : ""}

    </>
  )
}

export default Home