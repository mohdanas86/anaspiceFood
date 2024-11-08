import React, { useState } from "react";
import axios from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/useContext";

const SignUp = () => {
    const { setServerToken } = useMyContext();
    const Navigate = useNavigate();

    const [showpass, setshowPass] = useState(false);
    const [formData, setFormDate] = useState({
        username: "",
        email: "",
        password: "",
    });

    const allValue = (e) => {
        const { name, value } = e.target;
        setFormDate((data) => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
            const response = await axios.post(url, formData);
            console.log(response.data);
            const auth_token = await response.data.token;
            setServerToken(auth_token);

            setFormDate({
                username: "",
                email: "",
                password: "",
            })
            Navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container min-h-[59.5vh] mx-auto p-6 justify-center items-center flex">
            <form className="lg:w-[30%] w-full mx-auto grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Register</h2>
                    <p className="text-slate-600 mb-4">
                        Craete an new account
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
                    {/* Email */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="email"
                            className="grow"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
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

                <button className="btn bg-[--primary-color] hover:bg-[--secondary-color] rounded-full py-4 text-white border-0 mt-6">
                    Sign In
                </button>

                <div className="grid text-start">
                    <p className="text-slate-600 mb-4 capitalize">
                        don't have an existing account{" "}
                        <Link className="text-[--primary-color]" to={"/signin"}>
                            sign in
                        </Link>{" "}
                        here
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
