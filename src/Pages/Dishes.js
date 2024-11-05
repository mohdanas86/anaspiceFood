import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";

const Dishes = () => {
  const [dishes, setDishes] = useState(JSON.parse(localStorage.getItem('dish')));
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch dishes from API and save them to state and local storage
  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/dishes");
      const fetchedDishes = response.data.data;
      setDishes(fetchedDishes);
      localStorage.setItem("dish", JSON.stringify(fetchedDishes)); // Store fetched data in localStorage
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Navigate to the checkout page with selected dish data
  const handleClick = (dish) => {
    navigate("/checkout", { state: { dish } });
  };

  // Add item to the cart
  const handleAddToCart = (dish) => {
    addToCart({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
  };

  return (
    <div className="w-full flex justify-center items-center px-10 py-2 relative overflow-hidden">
      {dishes && dishes.length > 0 ? (
        <div className="carousel carousel-center w-full flex overflow-x-auto snap-x snap-mandatory gap-6 py-6">
          {dishes.map((dish) => (
            <div
              key={dish._id}
              className="card bg-white w-80 md:w-96 flex-shrink-0 shadow-lg cursor-pointer snap-center"
            >
              {dish.image && (
                <figure className="h-[200px] overflow-hidden rounded-t-lg">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="object-cover w-full h-full"
                  />
                </figure>
              )}
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold">{dish.name}</h2>
                <p className="text-sm text-gray-600">
                  {dish.description.length > 50
                    ? dish.description.substring(0, 50) + "..."
                    : dish.description}
                </p>
                <div className="text-xl font-semibold text-gray-700 flex justify-between items-center mt-2">
                  <span className="flex items-center gap-3">
                    ₹{dish.price}
                    <span className="text-base text-green-600">60% Off</span>
                  </span>
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="btn btn-primary flex justify-center items-center gap-4 hover:translate-x-[-5px] duration-300"
                  >
                    <span className="text-lg font-bold flex justify-center items-center">
                      <MdOutlineShoppingBag />
                    </span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading dishes...</p>
      )}
    </div>
  );
};

export default Dishes;
