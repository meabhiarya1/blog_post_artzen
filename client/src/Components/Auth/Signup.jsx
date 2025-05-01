import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Something went wrong during signup.";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <div
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        className="bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-md"
      >
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Create Account
          </h2>
          <p className="mt-4 text-center text-gray-400">
            Sign up to get started
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <input
                  placeholder="Name"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-700 text-center">
          <span className="text-gray-400">Already have an account?</span>
          <span
            className="font-medium text-indigo-500 hover:text-indigo-400 cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
