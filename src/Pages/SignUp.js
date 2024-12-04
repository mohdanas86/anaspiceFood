import React, { useState } from "react";
import axios from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/useContext";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const SignUp = () => {
    const { setServerToken } = useMyContext();
    const navigate = useNavigate();

    const [showpass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const allFieldsFilled = formData.username && formData.email && formData.password;

    const [loading, setLoading] = useState(false);

    const allValue = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required");
            return; // Avoid starting the loader for invalid submission
        }

        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
            const response = await axios.post(url, formData);

            const authToken = response.data.token;
            setServerToken(authToken);

            setFormData({ username: "", email: "", password: "" });
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            console.error("Error during registration: ", err);
            if (err.response?.data?.message === "User already exists") {
                toast.error("User already exists");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container min-h-screen mx-auto p-6 justify-center items-center flex">
            {loading && <Loader />}

            <form className="lg:w-[30%] w-full mx-auto grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Register</h2>
                    <p className="text-slate-600 mb-4">Create a new account</p>
                </div>

                <div className="grid gap-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
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

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
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

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input
                            type={showpass ? "text" : "password"}
                            className="grow"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={allValue}
                        />
                        <span className="text-xl" onClick={() => setShowPass(!showpass)}>
                            {showpass ? <BsEye /> : <BsEyeSlash />}
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={!allFieldsFilled || loading}
                    className={`btn bg-[--primary-color] hover:bg-[--secondary-color] rounded-full py-4 text-white border-0 mt-6 ${!allFieldsFilled || loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <div className="grid text-start">
                    <p className="text-slate-600 mb-4 capitalize">
                        Don't have an existing account?{" "}
                        <Link className="text-[--primary-color]" to={"/signin"}>
                            Sign in
                        </Link>{" "}
                        here
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
