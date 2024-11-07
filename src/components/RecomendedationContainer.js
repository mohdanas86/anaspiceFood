import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import { useCart } from "../context/CartContext"; // Assuming useCart is correctly set up

const RecomendedationContainer = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch dishes from API and save them to state and local storage
  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dishes`);
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

  const handleShowMore = () => {
    setVisibleCount((visibleCount) => visibleCount + 4);
  };

  return (
    <div className="recomendedationContainer w-[35%] py-12 pl-6 mt-3">
      <h2 className="text-2xl font-semibold mb-3">Related Dishes</h2>

      <div className="w-full flex flex-col items-center py-2">
        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {dishes.slice(0, visibleCount).map((dish) => (
              <div
                key={dish._id}
                className="card bg-white w-full h-auto shadow-lg cursor-pointer flex flex-col"
                onClick={() => handleClick(dish._id)} // Trigger the click handler to navigate
              >
                {dish.image && (
                  <figure className="h-[150px] overflow-hidden rounded-t-lg flex-shrink-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="object-cover w-full h-full"
                    />
                  </figure>
                )}
                <div className="card-body p-4 flex-1 flex flex-col justify-between">
                  <h2 className="card-title text-lg font-bold">{dish.name}</h2>
                  <p className="text-sm text-gray-600">
                    {dish.description.length > 50
                      ? dish.description.substring(0, 50) + "..."
                      : dish.description}
                  </p>
                  <div className="text-xl font-semibold text-[--price-color] flex flex-col gap-3 justify-center items-start mt-2">
                    <span className="flex items-center gap-3">
                      ₹{dish.price}
                      <span className="text-base text-[--offer-color]">60% Off</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click event from bubbling up
                        handleAddToCart(dish);
                      }}
                      className="w-full btn bg-[--primary-color] hover:bg-[--secondary-color] text-white flex justify-center items-center gap-4 hover:translate-x-[-5px] duration-300"
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

      {/* IF ITEM IS MORE THEN 4 THEN SHOW MORE ITEM BTN */}
      {visibleCount < dishes.length ? (
        <div className="flex w-full justify-center">
          <button
            onClick={handleShowMore}
            className="flex items-center gap-2 px-6 py-3 mt-6 text-lg font-semibold text-gray-700 bg-white rounded-lg shadow-lg shadow-slate-200 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span>Show more</span>
            <MdKeyboardArrowDown className="text-gray-500 text-2xl transition-transform transform group-hover:rotate-180" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecomendedationContainer;
