import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import PageNav from "../components/PageNav";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container min-h-screen mx-auto lg:py-6 lg:px-12 p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2> */}
      <div className="flex lg:pb-8 pb-4">
        <PageNav title={"Shopping Cart"} />
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-3 px-5 text-sm font-semibold text-gray-700">Product</th>
                  <th className="py-3 px-5 text-sm font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-5 text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="py-3 px-5 text-sm font-semibold text-gray-700">Total</th>
                  <th className="py-3 px-5 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    {/* Product Image */}
                    <td className="flex items-center py-4 px-5">
                      <div className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                      <span className="ml-4 font-semibold text-gray-800 truncate">
                        {item.name}
                      </span>
                    </td>

                    {/* Product Price */}
                    <td className="py-4 px-5 text-gray-900">₹{item.price}</td>

                    {/* Product Quantity */}
                    <td className="py-4 px-5">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                        className="border border-gray-300 rounded-lg w-20 text-center font-medium py-1.5 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 transition-all duration-200 ease-in-out"
                      />
                    </td>

                    {/* Total Price */}
                    <td className="py-4 px-5 text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white font-semibold px-3 py-1 rounded-md shadow-sm hover:bg-red-600 transition-transform transform duration-200 hover:scale-105 active:scale-95"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Price and Checkout */}
          <div className="mt-6 flex flex-col lg:flex-row justify-between lg:items-center">
            <h3 className="text-xl font-semibold">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              className="uppercase mt-4 sm:mt-0 bg-[--primary-color] text-white px-4 py-3 rounded-full hover:bg-[--secondary-color] transition duration-200 lg:w-[40%] w-[100%]"
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
