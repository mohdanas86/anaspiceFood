import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
    className="relative hero min-h-screen bg-cover bg-center"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=600)",
    }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content flex justify-center items-center relative z-10">
      <div className="lg:max-w-[60%] w-[90%] text-center">
        <h1 className="mb-5 text-3xl lg:text-5xl font-extrabold text-white">
          AnaSpice <br className="sm:hidden" />
          Adding flavor to your doorstep.
        </h1>
        <p className="mb-5 text-lg text-white">
        Get your favorite meals delivered quickly and reliably. Explore diverse menus, customize orders, and enjoy fresh, delicious food anytime, anywhere—perfect for busy days, cravings, or a cozy night in!
        </p>
        <Link to="/category">
          <button className="btn bg-[--primary-color] text-white hover:bg-[--secondary-color] border-0 lg:w-[30%] w-[45%] py-3 px-6 rounded-full transition-transform duration-300 hover:translate-x-1">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  </div>
  
  );
};

export default Hero;
