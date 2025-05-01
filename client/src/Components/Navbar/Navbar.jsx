import React from "react";

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // or use navigate()
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
