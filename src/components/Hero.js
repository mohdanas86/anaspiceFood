import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content lg:text-center text-start">
        <div className="lg:max-w-[60%] w-[90%]">
          <h1 className="mb-5 lg:text-5xl text-3xl font-bold">
            AnaSpice <br className="sm:hidden" /> Adding flavor to your
            doorstep.
          </h1>
          <p className="mb-5">
            brings your favorite meals straight to your door with quick,
            reliable, and convenient delivery. Browse through diverse menus,
            customize your orders, and enjoy fresh,
            <br />
            delicious food anytime, anywhere. Perfect for busy schedules,
            last-minute cravings, or a cozy night in!
          </p>
          <Link to="/catogery">
            <button className="btn btn-primary bg-[--primary-color] hover:bg-[--secondary-color] border-0 lg:w-[30%] w-[45%] duration-300 hover:translate-x-1 rounded-full">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
