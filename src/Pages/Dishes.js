import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { MdOutlineShoppingBag } from "react-icons/md";
import SkeletonGrid from "../components/skeltons/SquareSkelton";

const Dishes = () => {
  const [dishes, setDishes] = useState(
    JSON.parse(localStorage.getItem("dish")) || []
  );
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch dishes from API and save them to state and local storage
  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/dishes`
      );
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

  // Navigate to the DishInfo page with the selected dish ID
  const handleClick = (id) => {
    navigate(`/dishes/${id}`); // Assuming your DishInfo route is set up to handle this
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
    <div className="w-full flex justify-center items-center lg:px-10 px-4 py-2 relative overflow-hidden">
      {dishes && dishes.length > 0 ? (
        <div className="carousel carousel-center w-full flex overflow-x-auto snap-x snap-mandatory lg:gap-6 gap-2 py-6">
          {dishes.map((dish) => (
            <div
              key={dish._id}
              className="bg-white rounded-lg flex-shrink-0 lg:w-[346px] w-[10rem] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer snap-center"
              onClick={() => handleClick(dish._id)}
            >
              {/* Dish Image */}
              {dish.image && (
                <figure className="h-[140px] lg:h-[200px] overflow-hidden rounded-t-lg">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              )}

              {/* Card Body */}
              <div className="p-4 flex flex-col space-y-2">
                {/* Dish Name */}
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {dish.name}
                </h2>

                {/* Dish Description */}
                {/* <p className="text-sm text-gray-600">
            {dish.description.length > 50
              ? `${dish.description.substring(0, 50)}...`
              : dish.description}
          </p> */}

                {/* Price and Discount */}
                <div className="flex justify-between items-center text-gray-800 mt-2">
                  <span className="text-base font-bold text-[--price-color]">
                    ₹{dish.price}
                  </span>
                  <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
                    60% Off
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(dish);
                  }}
                  className="mt-4 w-full bg-[--primary-color] hover:bg-[--secondary-color] text-white font-semibold py-2 rounded-lg flex justify-center items-center space-x-2 transition-transform duration-300 transform hover:-translate-y-1"
                >
                  <MdOutlineShoppingBag className="hidden lg:block text-xl" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <SkeletonGrid />
        </div>
      )}
    </div>
  );
};

export default Dishes;
