import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useMyContext } from "../context/useContext";

const SignIn = () => {
  const { setServerToken } = useMyContext();

  const [showpass, setshowPass] = useState(false);
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
  });

  const allValue = (e) => {
    const { name, value } = e.target;
    setFormDate((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3001/api/login";
      const response = await axios.post(url, formData);
      console.log(response.data.token);
      const auth_token = await response.data.token;
      setServerToken(auth_token);

      setFormDate({
        username: "",
        password: "",
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container min-h-[59.5vh] mx-auto p-6 justify-center items-center flex">
      <form className="w-[30%] mx-auto grid gap-4 py-4" onSubmit={handleSubmit}>
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

        <button className="btn btn-primary bg-blue-500 rounded-full py-4 text-white border-0 mt-6">
          Sign In
        </button>

        <div className="grid text-start">
          <p className="text-slate-600 mb-4 capitalize">
            don't have an existing account{" "}
            <Link className="text-blue-600" to={"/signup"}>
              sign up
            </Link>{" "}
            here
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
