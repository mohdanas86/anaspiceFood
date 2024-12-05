import React, { useEffect, useState, useCallback } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // React Icon for close button
import { useCart } from "../context/CartContext";
import { useMyContext } from "../context/useContext";

const Header = () => {
  const { logoutUser, isLoggedIn, menu, setMenu, isAdmin } = useMyContext();
  const { cartItems } = useCart();

  // Toggle menu function
  const toggleMenu = (e) => {
    setMenu((prevMenu) => !prevMenu);
  };

  // To stop propagation when clicking inside the menu
  const toggleMenuCon = (e) => {
    e.stopPropagation();
  };

  // Use effect to handle background scroll lock
  useEffect(() => {
    if (!menu) {
      // Lock background scroll when the menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scroll when the menu is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup the scroll lock when the component is unmounted or when menu state changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);


  return (
    <>
      <header className="shadow-md font-sans tracking-wide relative z-50">
        <section className="py-2 bg-[--primary-color] text-white lg:text-right lg:px-10 px-4 lg:block hidden">
        <CountdownTimer />


          {/* Uncomment this if needed */}
          {/* <p className="text-sm capitalize">
    Enjoy 40% off plus free shipping on your first order!
  </p> */}
        </section>


        <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[70px]">
          <Link to="/" className="font-semibold">
            AnaSpice
          </Link>

          <div
            id="collapseMenu"
            className="hidden lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/"
                  className="hover:text-[--primary-color] text-[--primary-color] block font-bold text-[15px]"
                >
                  Home
                </Link>
              </li>

              {isLoggedIn ? (
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link
                    to="/orders"
                    className="hover:text-[--primary-color] text-[#333] block font-bold text-[15px]"
                  >
                    Orders
                  </Link>
                </li>
              ) : (
                ""
              )}

              {isAdmin ? (
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link
                    to="/newdish"
                    className="hover:text-[--primary-color] text-[#333] block font-bold text-[15px]"
                  >
                    New Dish
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/catogery"
                  className="hover:text-[--primary-color] text-[#333] block font-bold text-[15px]"
                >
                  Catogery
                </Link>
              </li>

              {isLoggedIn && (<li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/profile"
                  className="hover:text-[--primary-color] text-[#333] block font-bold text-[15px]"
                >
                  Setting
                </Link>
              </li>)}

              <li className="max-lg:border-b max-lg:py-3 px-3">
                {isLoggedIn ? (
                  <button
                    onClick={logoutUser}
                    className="hover:text-[--primary-color] text-[#333] block font-bold text-[15px]"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="hover:text-[--primary-color] text-[#333] block font-bold text-[15px]"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <Link to="/cart" className={`hidden lg:block`}>
            <div className="indicator relative">
              {cartItems.length > 0 && (
                <span className="indicator-item badge bg-[--primary-color] text-white absolute top-1 right-[-8px] rounded-full px-2 py-1 text-xs font-semibold">
                  {cartItems.length}
                </span>
              )}
              <button className="text-3xl text-gray-700">
                <CiShoppingCart />
              </button>
            </div>
          </Link>

          <div
            className="flex max-lg:ml-auto lg:hidden"
            onClick={(e) => setMenu((e) => !e)}
          >
            <button id="toggleOpen" className="lg:hidden">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${menu ? "hidden" : ""
            } fixed w-full h-screen bg-black bg-opacity-50 top-0 left-0 z-40`}
          onClick={toggleMenu}
        >
          {/* Sidebar Container */}
          <div
            className={`transform ${menu ? "translate-x-[-100%]" : "translate-x-0"
              } transition-transform duration-300 ease-in-out fixed w-[70%] h-screen bg-white left-0 py-10 px-6 z-50`}
            onClick={toggleMenuCon}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="text-xl font-semibold text-gray-800" onClick={toggleMenu}>
                AnaSpice
              </Link>
              <button
                className="text-gray-800 p-2 rounded-full hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>

            {/* phone Navigation Links */}
            <div className="flex justify-between items-start flex-col h-[95%]">
              <ul className="space-y-4">
                <li onClick={toggleMenu}>
                  <Link
                    to="/"
                    className="text-lg font-semibold text-gray-800 hover:text-[--primary-color]"
                  >
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <li onClick={toggleMenu}>
                    <Link
                      to="/orders"
                      className="text-lg font-semibold text-gray-800 hover:text-[--primary-color]"
                    >
                      Orders
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li onClick={toggleMenu}>
                    <Link
                      to="/newdish"
                      className="text-lg font-semibold text-gray-800 hover:text-[--primary-color]"
                    >
                      New Dish
                    </Link>
                  </li>
                )}
                <li onClick={toggleMenu}>
                  <Link
                    to="/catogery"
                    className="text-lg font-semibold text-gray-800 hover:text-[--primary-color]"
                  >
                    Category
                  </Link>
                </li>

                {isLoggedIn && (<li onClick={toggleMenu}>
                  <Link
                    to="/profile"
                    className="text-lg font-semibold text-gray-800 hover:text-[--primary-color]"
                  >
                    Setting
                  </Link>
                </li>)}
              </ul>

              {/* Cart Icon */}
              <div className="flex w-full justify-between items-center">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logoutUser();
                      toggleMenu();
                    }}

                    className="text-lg font-semibold bg-[--primary-color] hover:bg-[--secondary-color] text-white rounded-xl border-0 px-5 py-2"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    onClick={toggleMenu}
                    to="/signin"
                    className="text-lg font-semibold text-gray-800 hover:text-[--primary-color]"
                  >
                    Sign In
                  </Link>
                )}

                <Link to="/cart" className="pr-4">
                  <div className="indicator relative">
                    {cartItems.length > 0 && (
                      <span className="indicator-item badge bg-[--primary-color] text-white absolute top-1 right-[-8px] rounded-full px-2 py-1 text-xs font-semibold">
                        {cartItems.length}
                      </span>
                    )}
                    <button className="text-3xl text-gray-700" onClick={toggleMenu}>
                      <CiShoppingCart />
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};


// import React, { useState, useEffect } from "react";

export const CountdownTimer = () => {
  // Set initial duration to 10 hours in milliseconds
  const duration = 10 * 60 * 60 * 1000;

    // Function to calculate time left
    const calculateTimeLeft = useCallback((endTime) => {
      const now = Date.now();
      const difference = endTime - now;
  
      if (difference <= 0) {
        // Restart timer by setting a new end time
        setEndTime(now + duration);
        return calculateTimeLeft(now + duration);
      }
  
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }, [duration]);

  // State for the end time and the time left
  const [endTime, setEndTime] = useState(Date.now() + duration);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  // Update time left every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, calculateTimeLeft]);

  return (
    <div className="flex items-center justify-end w-full py-2">
      <h2 className="text-xl font-semibold">40% Off Grab The Deal Now, Offer valid Till </h2>
      {/* Timer Section */}
      <div className="flex items-center space-x-4 text-white">
        <span> </span>
        {/* Hours */}
        <span className="text-center flex gap-2">
          <div className="text-2xl font-extrabold">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <span className="mt-2 text-sm uppercase tracking-wider">Hours</span>
        </span>

        <div className="text-2xl font-extrabold">:</div>

        {/* Minutes */}
        <span className="text-center flex gap-2">
          <div className="text-2xl font-extrabold">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <span className="mt-2 text-sm uppercase tracking-wider">Minutes</span>
        </span>

        <div className="text-2xl font-extrabold">:</div>

        {/* Seconds */}
        <span className="text-center flex gap-2">
          <div className="text-2xl font-extrabold">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <span className="mt-2 text-sm uppercase tracking-wider">Seconds</span>
        </span>
      </div>
    </div>
  );
};




export default Header;
