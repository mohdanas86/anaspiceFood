import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineStar } from "react-icons/ai";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import RecomendedationContainer from "./RecomendedationContainer";
import RateDish from "./RateDish";

const DishInfo = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Assuming useCart is correctly set up

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/dishes/${id}`
        );
        setDish(response.data.data);
      } catch (error) {
        setError("Error fetching dish");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  const handleAddToCart = (dish) => {
    addToCart({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
  };

  return (
    <div className="w-full flex justify-start items-start px-12 ">
      {/* PRODUCT INFO */}
      <div className="w-[65%] mx-auto py-6 pr-6 ">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-md text-center">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        ) : dish ? (
          <div className="py-6 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 text-start">
              {dish.name}
            </h1>
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-72 object-cover rounded-md shadow-lg"
            />
            <p className="text-gray-700 text-lg text-start">
              {dish.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">Price:</p>
                <p className="text-2xl text-[--price-color] font-bold">
                  ₹{dish.price}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">Category:</p>
                <p className="text-gray-800">{dish.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">Preparation Time:</p>
                <p className="text-gray-800">{dish.preparation_time}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">Allergens:</p>
                <p className="text-gray-800">{dish.allergens.join(", ")}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">Tags:</p>
                <p className="text-gray-800">{dish.tags.join(", ")}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold">Rating:</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 flex">
                    {Array.from(
                      { length: Math.floor(dish.rating) },
                      (_, index) => (
                        // <AiOutlineStar key={index} className="text-yellow-500" />
                        <span key={index}>★</span>
                      )
                    )}
                  </span>
                  <span className="text-gray-800 ml-2">
                    {dish.rating.toFixed(1)} ({dish.ratingsCount} ratings)
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-[--primary-color] hover:bg-[--secondary-color] text-white font-semibold py-3 rounded-md transition flex items-center justify-center space-x-2 mt-4"
              onClick={() => handleAddToCart(dish)} // Add onClick event here to call the addToCart function
            >
              <FaCartPlus />
              <span>Add to Cart</span>
            </button>

            {/* Rating */}
            <div className="w-full flex flex-col items-start space-y-8 mt-12 px-6">
              {/* Customer Reviews Section */}
              <div className="w-full mt-8">
                <h2 className="text-4xl font-semibold mb-8 text-start">
                  Customer Reviews
                </h2>

                {/* Check if there are any reviews */}
                {dish.reviews && dish.reviews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {dish.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        {/* Review Header: Rating */}
                        <div className="flex items-center mb-4">
                          {/* Star Rating */}
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-6 h-6 ${review.rating >= star
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Reviewer Information */}
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="font-semibold text-gray-700">
                            {review.user}
                          </div>
                          {/* <div>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div> */}
                        </div>

                        {/* Review Text */}
                        <div className="text-gray-800">
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-100 p-4 rounded-md text-center">
            <p className="text-red-600 font-semibold">No dish found.</p>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <RecomendedationContainer />
    </div>
  );
};

export default DishInfo;
