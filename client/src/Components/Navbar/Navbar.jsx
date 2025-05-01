import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold tracking-wide">
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-md shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
