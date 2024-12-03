import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext"; // Import the CartContext
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

import { FaUser, FaCity, FaAddressCard, FaLock, FaCcVisa, FaCcPaypal } from "react-icons/fa";
import PageNav from "../../components/PageNav";

const Checkout = () => {
  const userMail = JSON.parse(localStorage.getItem("user"));
  const [accountInfo, setAccountInfo] = useState({ email: userMail.email });
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "Credit Card",
  });

  const indianStates = [
    { state: "Select State", code: "NULL" },
    { state: "Andhra Pradesh", code: "AP" },
    { state: "Arunachal Pradesh", code: "AR" },
    { state: "Assam", code: "AS" },
    { state: "Bihar", code: "BR" },
    { state: "Chhattisgarh", code: "CG" },
    { state: "Goa", code: "GA" },
    { state: "Gujarat", code: "GJ" },
    { state: "Haryana", code: "HR" },
    { state: "Himachal Pradesh", code: "HP" },
    { state: "Jammu and Kashmir", code: "JK" },
    { state: "Jharkhand", code: "JH" },
    { state: "Karnataka", code: "KA" },
    { state: "Kerala", code: "KL" },
    { state: "Madhya Pradesh", code: "MP" },
    { state: "Maharashtra", code: "MH" },
    { state: "Manipur", code: "MN" },
    { state: "Meghalaya", code: "ML" },
    { state: "Mizoram", code: "MZ" },
    { state: "Nagaland", code: "NL" },
    { state: "Odisha", code: "OD" },
    { state: "Punjab", code: "PB" },
    { state: "Rajasthan", code: "RJ" },
    { state: "Sikkim", code: "SK" },
    { state: "Tamil Nadu", code: "TN" },
    { state: "Telangana", code: "TS" },
    { state: "Tripura", code: "TR" },
    { state: "Uttar Pradesh", code: "UP" },
    { state: "Uttarakhand", code: "UK" },
    { state: "West Bengal", code: "WB" },
    { state: "Andaman and Nicobar Islands", code: "AN" },
    { state: "Chandigarh", code: "CH" },
    { state: "Dadra and Nagar Haveli and Daman and Diu", code: "DN" },
    { state: "Delhi", code: "DL" },
    { state: "Lakshadweep", code: "LD" },
    { state: "Puducherry", code: "PY" }
  ];

  const handleAccountChange = (e) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart(); // Access cartItems and totalPrice from the context


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
        userId: user._id,
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        shippingInfo: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          paymentMethod: shippingInfo.paymentMethod,
        },
        dishes: cartItems.map((item) => ({
          dishId: item.id,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
        status: "pending",
      };


      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("order to placed.");
        // Order placed successfully, clear the cart items
        setCartItems([]); // Clear cart items in the context
        localStorage.setItem("cartItems", JSON.stringify([])); // Clear cart in local storage
        setSuccessMessage("Order placed successfully!");
      } else {
        throw new Error(data.message || "Failed to place the order. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to place the order. Please try again.");
      setError("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: any side effect for updating cart items can be added here.
  }, [cartItems]);

  return (
    <div className="container min-h-screen mx-auto">
{loading && <Loader />}
      {/* <h2 className="text-2xl font-bold mb-4">Checkout</h2> */}


      {cartItems.length > 0 ? (
        <>

          <div className="container mx-auto">
            <div className="flex lg:py-6 lg:px-14 pt-4 px-4">
              <PageNav title={"Checkout"} />
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              {/* Checkout Form */}

              {/* Checkout Form */}
              <div className="p-8 w-full max-w-lg mx-auto py-12">
                {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">Checkout</h2> */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Section */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-800">
                      <FaUser className="mr-2 text-[--primary-color]" /> Account Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Account Email"
                      value={accountInfo.email}
                      onChange={handleAccountChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                    />
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                      />
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-800">
                      <FaAddressCard className="mr-2 text-[--primary-color]" /> Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        Apartment/Suite
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        placeholder="Apt/Suite"
                        value={shippingInfo.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <FaCity className="mr-2 text-[--primary-color]" /> City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                      />
                    </div>
                  </div>

                  {/* State and Zip Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        State
                      </label>
                      <select
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                      >
                        {indianStates && indianStates.map((v, i) => {
                          return <option value={v.code} key={i}>{v.state}</option>;
                        })}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-800">
                      Payment Method
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <FaCcVisa className="mr-1 text-[--primary-color]" />
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Credit Card"
                          checked={shippingInfo.paymentMethod === "Credit Card"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Credit Card
                      </label>
                      <label className="flex items-center">
                        <FaCcPaypal className="mr-1 text-[--primary-color]" />
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="PayPal"
                          checked={shippingInfo.paymentMethod === "PayPal"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        PayPal
                      </label>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-4 flex items-center text-gray-600 text-sm">
                    <FaLock className="mr-2 text-green-500" />
                    <span>All transactions are secure and encrypted.</span>
                  </div>

                  {/* Error and Success Messages */}
                  {error && <p className="text-red-600 mt-2">{error}</p>}
                  {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
                </form>
              </div>


              {/* Dish Items Table with Order Summary and Checkout Button */}
              <div className="relative w-full overflow-x-auto bg-gray-50">
                <div className="overflow-x-auto p-4 lg:w-[80%] w-full mx-auto mt-8">

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white text-gray-800">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left">
                        <th className="py-3 px-5 text-sm font-semibold text-gray-700">Image</th>
                        <th className="py-3 px-5 text-sm font-semibold text-gray-700">Dish</th>
                        <th className="py-3 px-5 text-sm font-semibold text-gray-700">Price</th>
                        <th className="py-3 px-5 text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="py-3 px-5 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100 border-b">
                          <td className="py-4 px-5">
                            <div className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-5 text-sm font-medium">{item.name}</td>
                          <td className="py-4 px-5 text-gray-900">₹{item.price}</td>
                          <td className="py-4 px-5">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              min="1"
                              className="border border-gray-300 rounded-lg w-20 text-center font-medium py-1.5 shadow-sm focus:border-blue-400 focus:ring focus:ring-[--outline-color] transition-all duration-200 ease-in-out"
                            />
                          </td>
                          <td className="py-4 px-5">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-red-600 hover:shadow-lg transition-transform transform duration-200 hover:scale-105 active:scale-95"
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>

                  {/* Order Summary and Place Order Button */}
                  <div className="p-4 mt-6 border-t text-gray-800 font-semibold flex flex-col space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between">
                      <span>Subtotal • {cartItems.length} items</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Free shipping</span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="mt-4 w-full bg-[--primary-color] text-white px-12 py-3 rounded-full duration-300 hover:bg-[--secondary-color]"
                      disabled={loading}
                    >
                      Checkout
                    </button>
                  </div>


                  {error && <p className="text-red-600 mt-2">{error}</p>}
                  {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
                </div>
              </div>
              
            </div>
          </div>

        </>
      ) : (
        <h2 className="text-center text-xl font-semibold mt-10">Add items to proceed</h2>
      )}


    </div>
  );
};

export default Checkout;
