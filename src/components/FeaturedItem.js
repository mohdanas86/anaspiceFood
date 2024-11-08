import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedItem = () => {
  const [dish, setDish] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dishes`);
      setDish(response.data.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="mx-auto lg:px-10 px-4">
      <h2 className="text-2xl font-bold mb-2">Featured Items</h2>
      <div className="grid lg:grid-cols-2 gap-4 lg:py-8 py-4">
        {dish.slice(3, 5).map((item, index) => (
          <div key={index} className="card card-side bg-base-100 shadow-md lg:h-52 h-40">
            <figure className="lg:w-1/2 w-[200px]">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="lg:card-body lg:p-4 w-full flex flex-col justify-start p-2">
              <h2 className="card-title text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-700 hidden lg:inline-block">
                {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
              </p>

              <p className="text-sm text-gray-700 lg:hidden inline-block">
                {item.description.length > 30 ? `${item.description.slice(0, 60)}...` : item.description}
              </p>


              <Link to={`/dishes/${item._id}`} className="w-full">
                <button className="btn bg-[--primary-color] hover:bg-[--secondary-color] text-white flex justify-center items-center gap-2 hover:translate-x-[-2px] duration-300 rounded-full capitalize px-6 py-2 w-full mt-2">
                  more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedItem;
