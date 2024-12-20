import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useMyContext } from "../context/useContext";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader"

const SignIn = () => {
  const { setServerToken } = useMyContext();
  const Navigate = useNavigate();

  const [showpass, setshowPass] = useState(false);
  const [loading, setLoading] = useState(false); // For loader state
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
  });

  const allFieldsFilled = formData.username && formData.password;

  const allValue = (e) => {
    const { name, value } = e.target;
    setFormDate((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loader
    setLoading(true);

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/login`;
      const response = await axios.post(url, formData);

      // Extract token from response
      const auth_token = await response.data.token;
      setServerToken(auth_token);

      // Success toast
      toast.success("Successfully logged in!");

      // Reset form and redirect
      setFormDate({
        username: "",
        password: "",
      });
      Navigate("/");
    } catch (err) {
      // Error toast
      toast.error("Invalid username or password. Please try again.");
      console.error(err);
    } finally {
      // Hide loader
      setLoading(false);
    }
  };


  return (
    <>
      {loading ? (<Loader />) : ("")}

      <div className="container min-h-screen relative mx-auto p-6 justify-center items-center flex">
        <form className="lg:w-[30%] w-full mx-auto grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid text-center">
            <h2 className="text-2xl font-bold text-slate-800">Log In</h2>
            <p className="text-slate-600 mb-4">
              please sign in your existing account
            </p>
          </div>

          <div className="grid gap-4">
            {/* Username */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={allValue}
              />
            </label>
            {/* password */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showpass ? "password" : "text"}
                className="grow"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={allValue}
              />

              <span className="text-xl" onClick={(e) => setshowPass((e) => !e)}>
                {showpass ? <BsEye /> : <BsEyeSlash />}
              </span>
            </label>
          </div>

          <button
                    type="submit"
                    disabled={!allFieldsFilled || loading}
                    className={`btn bg-[--primary-color] hover:bg-[--secondary-color] rounded-full py-4 text-white border-0 mt-6 ${
                        !allFieldsFilled || loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

          <div className="grid text-start">
            <p className="text-slate-600 mb-4 capitalize">
              don't have an existing account{" "}
              <Link className="text-[--primary-color]" to={"/signup"}>
                sign up
              </Link>{" "}
              here
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
