import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container min-h-[59.5vh] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center border border-gray-200 rounded-lg shadow-lg p-4 bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 border border-gray-200 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between w-full p-4">
                  <h3 className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200 tracking-wide truncate">
                    {item.name}
                  </h3>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.price}
                    </span>

                    <div className="flex justify-center items-center gap-4 space-x-4">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        min="1"
                        className="border border-gray-300 rounded-lg w-20 text-center font-medium py-1.5 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 transition-all duration-200 ease-in-out"
                      />

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-red-600 hover:shadow-lg transition-transform transform duration-200 hover:scale-105 active:scale-95"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price and Checkout */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              className="uppercase mt-4 sm:mt-0 bg-blue-500 text-white px-[20%] py-4 rounded-full hover:bg-blue-400 transition duration-200"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
