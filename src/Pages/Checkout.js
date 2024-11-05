import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // Import the CartContext
import { AiOutlineDelete } from "react-icons/ai";

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart(); // Access cartItems and totalPrice from the context

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const order = {
        userId: user._id, // Unique user identifier
        name: shippingInfo.name, // Customer's name from input
        shippingInfo: {
          address: shippingInfo.address, // Customer's address from input
          paymentMethod: shippingInfo.paymentMethod, // Payment method from input
        },
        dishes: cartItems.map((item) => ({
          dishId: item.id, // Include dishId from cart item
          quantity: item.quantity, // Quantity of each dish from cart item
        })),
        totalAmount: totalPrice, // Total order amount calculated from cart
        status: "pending", // Order status
      };

      const response = await fetch("http://localhost:3001/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (response.ok) {
        // Order placed successfully, clear the cart items
        setCartItems([]); // Clear cart items in the context
        localStorage.setItem("cartItems", JSON.stringify([])); // Clear cart in local storage
        setSuccessMessage("Order placed successfully!");
      } else {
        throw new Error(data.message || "Failed to place the order. Please try again.");
      }
    } catch (err) {
      setError("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: any side effect for updating cart items can be added here.
  }, [cartItems]);

  return (
    <div className="container min-h-[59.5vh] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="relative mb-6 w-full overflow-x-auto">
            <div className="carousel carousel-center flex gap-6 snap-x snap-mandatory w-full p-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center border border-gray-200 rounded-lg shadow-lg p-4 bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex-shrink-0 cursor-pointer snap-center w-[80vw] sm:w-[40vw] lg:w-[27.5vw]"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border border-gray-200 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full p-4">
                    <h3 className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200 tracking-wide truncate">
                      {item.name}
                    </h3>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{item.price}
                      </span>

                      <div className="flex items-center gap-4">
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
          </div>

          <div className="w-[70%] px-[10%] mx-auto p-6 bg-[#d4e7ff1d] rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="paymentMethod">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={shippingInfo.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <h3 className="text-lg font-semibold mt-12">Order Summary</h3>

              <div className="overflow-x-auto border rounded-lg shadow-lg">
                <table className="min-w-full bg-white text-gray-800">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left">
                      <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                        Dish
                      </th>
                      <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((dish, index) => (
                      <tr key={index} className="hover:bg-gray-100 border-t">
                        <td className="py-4 px-5 text-sm font-medium">
                          {dish.name || "Unknown Dish"}
                        </td>
                        <td className="py-4 px-5 text-sm font-medium">
                          <span className="px-2 py-1 text-center shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200">
                            {dish.quantity}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-sm font-medium">
                          ₹{(dish.price * dish.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 font-semibold">
                <span>Total: </span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-12 py-3 rounded-full duration-300 hover:bg-blue-400 "
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

              {error && <p className="text-red-600 mt-2">{error}</p>}
              {successMessage && (
                <p className="text-green-600 mt-2">{successMessage}</p>
              )}
            </form>
          </div>
        </>
      ) : (
        <h2>Add items to proceed</h2>
      )}
    </div>
  );
};

export default Checkout;
